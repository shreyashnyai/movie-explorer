from django.db.models import Prefetch
from rest_framework import viewsets

from .filters import ActorFilter, MovieFilter
from .models import Actor, Director, Genre, Movie
from .serializers import (
    ActorDetailSerializer,
    ActorListSerializer,
    DirectorDetailSerializer,
    DirectorListSerializer,
    GenreSerializer,
    MovieDetailSerializer,
    MovieListSerializer,
)


class MovieViewSet(viewsets.ReadOnlyModelViewSet):
    """List and retrieve movies with backend filtering."""

    queryset = Movie.objects.select_related("director").prefetch_related("actors", "genres")
    filterset_class = MovieFilter

    def get_serializer_class(self):
        if self.action == "retrieve":
            return MovieDetailSerializer
        return MovieListSerializer


class ActorViewSet(viewsets.ReadOnlyModelViewSet):
    """List and retrieve actors with backend filtering."""

    queryset = Actor.objects.all()
    filterset_class = ActorFilter

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ActorDetailSerializer
        return ActorListSerializer


class DirectorViewSet(viewsets.ReadOnlyModelViewSet):
    """List and retrieve directors."""

    queryset = Director.objects.prefetch_related(
        Prefetch("movies", queryset=Movie.objects.prefetch_related("genres"))
    )

    def get_serializer_class(self):
        if self.action == "retrieve":
            return DirectorDetailSerializer
        return DirectorListSerializer


class GenreViewSet(viewsets.ReadOnlyModelViewSet):
    """List genres for filter dropdowns."""

    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
