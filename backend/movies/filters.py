import django_filters

from .models import Actor, Movie


class MovieFilter(django_filters.FilterSet):
    """Backend filters for movies — exposed as query params on /api/movies/."""

    genre = django_filters.CharFilter(field_name="genres__name", lookup_expr="iexact")
    director = django_filters.NumberFilter(field_name="director_id")
    actor = django_filters.NumberFilter(field_name="actors__id")
    release_year = django_filters.NumberFilter(field_name="release_year")

    class Meta:
        model = Movie
        fields = ["genre", "director", "actor", "release_year"]


class ActorFilter(django_filters.FilterSet):
    """Backend filters for actors — movie and genre they acted in."""

    movie = django_filters.NumberFilter(field_name="movies__id")
    genre = django_filters.CharFilter(field_name="movies__genres__name", lookup_expr="iexact")

    class Meta:
        model = Actor
        fields = ["movie", "genre"]
