from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ActorViewSet, DirectorViewSet, GenreViewSet, MovieViewSet

router = DefaultRouter()
router.register("movies", MovieViewSet, basename="movie")
router.register("actors", ActorViewSet, basename="actor")
router.register("directors", DirectorViewSet, basename="director")
router.register("genres", GenreViewSet, basename="genre")

urlpatterns = [
    path("", include(router.urls)),
]
