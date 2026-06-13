"""Seed the database with sample movies, actors, directors, and genres."""

from decimal import Decimal

from django.core.management.base import BaseCommand

from movies.models import Actor, Director, Genre, Movie


class Command(BaseCommand):
    help = "Populate the database with sample movie data for development and demos."

    def handle(self, *args, **options):
        if Movie.objects.exists():
            self.stdout.write(self.style.WARNING("Database already seeded. Skipping."))
            return

        genres = {
            name: Genre.objects.create(name=name)
            for name in [
                "Action",
                "Drama",
                "Sci-Fi",
                "Comedy",
                "Thriller",
                "Western",
                "Documentary",
            ]
        }

        directors = {
            "Christopher Nolan": Director.objects.create(
                name="Christopher Nolan",
                bio="British-American filmmaker known for complex narratives.",
            ),
            "Steven Spielberg": Director.objects.create(
                name="Steven Spielberg",
                bio="Legendary director of blockbuster and dramatic films.",
            ),
            "Greta Gerwig": Director.objects.create(
                name="Greta Gerwig",
                bio="American director and actress.",
            ),
            "Denis Villeneuve": Director.objects.create(
                name="Denis Villeneuve",
                bio="Canadian filmmaker specializing in sci-fi and drama.",
            ),
            "Quentin Tarantino": Director.objects.create(
                name="Quentin Tarantino",
                bio="American director known for stylized violence and dialogue.",
            ),
        }

        actors = {
            "Leonardo DiCaprio": Actor.objects.create(
                name="Leonardo DiCaprio",
                birth_year=1974,
                bio="Oscar-winning actor.",
            ),
            "Tom Hanks": Actor.objects.create(
                name="Tom Hanks",
                birth_year=1956,
                bio="Two-time Oscar winner.",
            ),
            "Margot Robbie": Actor.objects.create(
                name="Margot Robbie",
                birth_year=1990,
                bio="Australian actress and producer.",
            ),
            "Timothée Chalamet": Actor.objects.create(
                name="Timothée Chalamet",
                birth_year=1995,
                bio="French-American actor.",
            ),
            "Ryan Gosling": Actor.objects.create(
                name="Ryan Gosling",
                birth_year=1980,
                bio="Canadian actor and musician.",
            ),
            "Emma Stone": Actor.objects.create(
                name="Emma Stone",
                birth_year=1988,
                bio="Oscar-winning actress.",
            ),
            "Matthew McConaughey": Actor.objects.create(
                name="Matthew McConaughey",
                birth_year=1969,
                bio="Oscar-winning actor.",
            ),
            "Brad Pitt": Actor.objects.create(
                name="Brad Pitt",
                birth_year=1963,
                bio="Actor and producer.",
            ),
        }

        movies_data = [
            {
                "title": "Inception",
                "release_year": 2010,
                "director": directors["Christopher Nolan"],
                "actors": ["Leonardo DiCaprio", "Tom Hanks"],
                "genres": ["Action", "Sci-Fi", "Thriller"],
                "rating": Decimal("8.8"),
                "review": "A mind-bending heist through dreams.",
            },
            {
                "title": "Interstellar",
                "release_year": 2014,
                "director": directors["Christopher Nolan"],
                "actors": ["Matthew McConaughey", "Emma Stone"],
                "genres": ["Sci-Fi", "Drama"],
                "rating": Decimal("8.6"),
                "review": "Humanity searches for a new home among the stars.",
            },
            {
                "title": "The Dark Knight",
                "release_year": 2008,
                "director": directors["Christopher Nolan"],
                "actors": ["Leonardo DiCaprio", "Brad Pitt"],
                "genres": ["Action", "Drama", "Thriller"],
                "rating": Decimal("9.0"),
                "review": "Batman faces the Joker in Gotham City.",
            },
            {
                "title": "Jurassic Park",
                "release_year": 1993,
                "director": directors["Steven Spielberg"],
                "actors": ["Tom Hanks", "Brad Pitt"],
                "genres": ["Action", "Sci-Fi"],
                "rating": Decimal("8.2"),
                "review": "Dinosaurs roam a theme park gone wrong.",
            },
            {
                "title": "Saving Private Ryan",
                "release_year": 1998,
                "director": directors["Steven Spielberg"],
                "actors": ["Tom Hanks", "Brad Pitt"],
                "genres": ["Drama", "Action"],
                "rating": Decimal("8.6"),
                "review": "WWII soldiers search for one man behind enemy lines.",
            },
            {
                "title": "Barbie",
                "release_year": 2023,
                "director": directors["Greta Gerwig"],
                "actors": ["Margot Robbie", "Ryan Gosling"],
                "genres": ["Comedy", "Drama"],
                "rating": Decimal("7.0"),
                "review": "Barbie discovers the real world.",
            },
            {
                "title": "Little Women",
                "release_year": 2019,
                "director": directors["Greta Gerwig"],
                "actors": ["Emma Stone", "Timothée Chalamet"],
                "genres": ["Drama"],
                "rating": Decimal("7.8"),
                "review": "The March sisters grow up in Civil War-era America.",
            },
            {
                "title": "Dune",
                "release_year": 2021,
                "director": directors["Denis Villeneuve"],
                "actors": ["Timothée Chalamet", "Margot Robbie"],
                "genres": ["Sci-Fi", "Action", "Drama"],
                "rating": Decimal("8.0"),
                "review": "Paul Atreides arrives on the desert planet Arrakis.",
            },
            {
                "title": "Blade Runner 2049",
                "release_year": 2017,
                "director": directors["Denis Villeneuve"],
                "actors": ["Ryan Gosling", "Emma Stone"],
                "genres": ["Sci-Fi", "Thriller"],
                "rating": Decimal("8.0"),
                "review": "A new blade runner uncovers a long-buried secret.",
            },
            {
                "title": "Pulp Fiction",
                "release_year": 1994,
                "director": directors["Quentin Tarantino"],
                "actors": ["Brad Pitt", "Leonardo DiCaprio"],
                "genres": ["Drama", "Thriller"],
                "rating": Decimal("8.9"),
                "review": "Interconnected stories of crime in Los Angeles.",
            },
            {
                "title": "Once Upon a Time in Hollywood",
                "release_year": 2019,
                "director": directors["Quentin Tarantino"],
                "actors": ["Leonardo DiCaprio", "Brad Pitt", "Margot Robbie"],
                "genres": ["Drama", "Comedy"],
                "rating": Decimal("7.6"),
                "review": "A fading actor and his stunt double in 1969 LA.",
            },
            {
                "title": "La La Land",
                "release_year": 2016,
                "director": directors["Greta Gerwig"],
                "actors": ["Ryan Gosling", "Emma Stone"],
                "genres": ["Drama", "Comedy"],
                "rating": Decimal("8.0"),
                "review": "Musicians fall in love while chasing dreams in LA.",
            },
            {
                "title": "The Matrix",
                "release_year": 1999,
                "director": directors["Christopher Nolan"],
                "actors": ["Leonardo DiCaprio", "Tom Hanks"],
                "genres": ["Action", "Sci-Fi"],
                "rating": Decimal("8.7"),
                "review": "A hacker learns the truth about reality.",
            },
            {
                "title": "Forrest Gump",
                "release_year": 1994,
                "director": directors["Steven Spielberg"],
                "actors": ["Tom Hanks"],
                "genres": ["Drama", "Comedy"],
                "rating": Decimal("8.8"),
                "review": "The life story of an extraordinary man.",
            },
            {
                "title": "Arrival",
                "release_year": 2016,
                "director": directors["Denis Villeneuve"],
                "actors": ["Emma Stone", "Timothée Chalamet"],
                "genres": ["Sci-Fi", "Drama"],
                "rating": Decimal("7.9"),
                "review": "A linguist communicates with alien visitors.",
            },
            {
                "title": "Silent Echo",
                "release_year": 2020,
                "director": directors["Greta Gerwig"],
                "actors": ["Margot Robbie"],
                "genres": ["Drama"],
                "rating": None,
                "review": "",
            },
            {
                "title": "Midnight Run",
                "release_year": 2018,
                "director": directors["Quentin Tarantino"],
                "actors": ["Brad Pitt", "Matthew McConaughey"],
                "genres": ["Thriller", "Action"],
                "rating": Decimal("7.2"),
                "review": "A high-stakes chase through the city at night.",
            },
            {
                "title": "Ocean's Eleven",
                "release_year": 2001,
                "director": directors["Steven Spielberg"],
                "actors": ["Brad Pitt", "Leonardo DiCaprio"],
                "genres": ["Comedy", "Action"],
                "rating": Decimal("7.7"),
                "review": "A crew plans an elaborate casino heist.",
            },
        ]

        for data in movies_data:
            movie = Movie.objects.create(
                title=data["title"],
                release_year=data["release_year"],
                director=data["director"],
                rating=data["rating"],
                review=data["review"],
            )
            movie.actors.set([actors[name] for name in data["actors"]])
            movie.genres.set([genres[name] for name in data["genres"]])

        self.stdout.write(
            self.style.SUCCESS(
                f"Seeded {Movie.objects.count()} movies, "
                f"{Actor.objects.count()} actors, "
                f"{Director.objects.count()} directors, "
                f"{Genre.objects.count()} genres."
            )
        )
        self.stdout.write(
            self.style.NOTICE(
                "Note: 'Documentary' genre has no movies (for empty-filter testing)."
            )
        )
