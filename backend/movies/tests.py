from decimal import Decimal

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from movies.models import Actor, Director, Genre, Movie


class MovieAPITestCase(TestCase):
    """API tests for movies, actors, directors, and genres."""

    def setUp(self):
        self.client = APIClient()
        self.genre_action = Genre.objects.create(name="Action")
        self.genre_drama = Genre.objects.create(name="Drama")
        self.genre_empty = Genre.objects.create(name="Documentary")

        self.director = Director.objects.create(name="Test Director", bio="Test bio")
        self.other_director = Director.objects.create(name="Other Director")

        self.actor = Actor.objects.create(name="Test Actor", birth_year=1980)
        self.other_actor = Actor.objects.create(name="Other Actor")

        self.movie = Movie.objects.create(
            title="Test Movie",
            release_year=2020,
            director=self.director,
            rating=Decimal("8.5"),
            review="A great test movie.",
        )
        self.movie.actors.set([self.actor])
        self.movie.genres.set([self.genre_action, self.genre_drama])

        self.other_movie = Movie.objects.create(
            title="Other Movie",
            release_year=2019,
            director=self.other_director,
            rating=Decimal("7.0"),
        )
        self.other_movie.actors.set([self.other_actor])
        self.other_movie.genres.set([self.genre_drama])

    def test_list_movies_returns_200(self):
        response = self.client.get("/api/movies/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 2)

    def test_filter_movies_by_genre(self):
        response = self.client.get("/api/movies/", {"genre": "Action"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        titles = [m["title"] for m in response.data["results"]]
        self.assertEqual(titles, ["Test Movie"])

    def test_filter_movies_by_director(self):
        response = self.client.get("/api/movies/", {"director": self.director.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)
        self.assertEqual(response.data["results"][0]["title"], "Test Movie")

    def test_filter_movies_by_invalid_director_returns_empty(self):
        response = self.client.get("/api/movies/", {"director": 99999})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 0)

    def test_filter_movies_by_actor(self):
        response = self.client.get("/api/movies/", {"actor": self.actor.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)

    def test_filter_movies_by_release_year(self):
        response = self.client.get("/api/movies/", {"release_year": 2020})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)

    def test_movie_detail_returns_full_data(self):
        response = self.client.get(f"/api/movies/{self.movie.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "Test Movie")
        self.assertEqual(len(response.data["actors"]), 1)
        self.assertEqual(response.data["review"], "A great test movie.")

    def test_movie_detail_404_for_invalid_id(self):
        response = self.client.get("/api/movies/99999/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_filter_actors_by_genre(self):
        response = self.client.get("/api/actors/", {"genre": "Action"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        names = [a["name"] for a in response.data["results"]]
        self.assertIn("Test Actor", names)
        self.assertNotIn("Other Actor", names)

    def test_filter_actors_by_movie(self):
        response = self.client.get("/api/actors/", {"movie": self.movie.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)

    def test_director_detail_includes_movies(self):
        response = self.client.get(f"/api/directors/{self.director.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["movies"]), 1)

    def test_list_genres_includes_empty_genre(self):
        response = self.client.get("/api/genres/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        names = [g["name"] for g in response.data["results"]]
        self.assertIn("Documentary", names)

    def test_filter_movies_by_empty_genre_returns_no_results(self):
        response = self.client.get("/api/movies/", {"genre": "Documentary"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 0)
