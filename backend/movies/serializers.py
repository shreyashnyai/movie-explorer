from rest_framework import serializers

from .models import Actor, Director, Genre, Movie


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ["id", "name"]


class DirectorListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = ["id", "name"]


class DirectorDetailSerializer(serializers.ModelSerializer):
    movies = serializers.SerializerMethodField()

    class Meta:
        model = Director
        fields = ["id", "name", "bio", "movies"]

    def get_movies(self, obj: Director) -> list[dict]:
        movies = obj.movies.prefetch_related("genres").all()
        return MovieBriefSerializer(movies, many=True).data


class ActorListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ["id", "name", "birth_year"]


class ActorDetailSerializer(serializers.ModelSerializer):
    movies = serializers.SerializerMethodField()

    class Meta:
        model = Actor
        fields = ["id", "name", "bio", "birth_year", "movies"]

    def get_movies(self, obj: Actor) -> list[dict]:
        movies = obj.movies.select_related("director").prefetch_related("genres").all()
        return MovieBriefSerializer(movies, many=True).data


class MovieBriefSerializer(serializers.ModelSerializer):
    """Compact movie representation for nested lists."""

    director = DirectorListSerializer(read_only=True)
    genres = GenreSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = ["id", "title", "release_year", "director", "genres", "rating"]


class MovieListSerializer(serializers.ModelSerializer):
    director = DirectorListSerializer(read_only=True)
    genres = GenreSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = ["id", "title", "release_year", "director", "genres", "rating"]


class MovieDetailSerializer(serializers.ModelSerializer):
    director = DirectorListSerializer(read_only=True)
    actors = ActorListSerializer(many=True, read_only=True)
    genres = GenreSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = [
            "id",
            "title",
            "release_year",
            "director",
            "actors",
            "genres",
            "rating",
            "review",
        ]
