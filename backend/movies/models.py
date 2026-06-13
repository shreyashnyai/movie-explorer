from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Genre(models.Model):
    """Movie genre (e.g. Action, Drama)."""

    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name


class Director(models.Model):
    """Film director."""

    name = models.CharField(max_length=200)
    bio = models.TextField(blank=True)

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name


class Actor(models.Model):
    """Film actor."""

    name = models.CharField(max_length=200)
    bio = models.TextField(blank=True)
    birth_year = models.PositiveIntegerField(null=True, blank=True)

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name


class Movie(models.Model):
    """Movie with director, cast, genres, rating, and optional review."""

    title = models.CharField(max_length=300)
    release_year = models.PositiveIntegerField()
    director = models.ForeignKey(
        Director,
        on_delete=models.CASCADE,
        related_name="movies",
    )
    actors = models.ManyToManyField(Actor, related_name="movies", blank=True)
    genres = models.ManyToManyField(Genre, related_name="movies", blank=True)
    rating = models.DecimalField(
        max_digits=3,
        decimal_places=1,
        validators=[MinValueValidator(0), MaxValueValidator(10)],
        null=True,
        blank=True,
    )
    review = models.TextField(blank=True)

    class Meta:
        ordering = ["-release_year", "title"]

    def __str__(self) -> str:
        return f"{self.title} ({self.release_year})"
