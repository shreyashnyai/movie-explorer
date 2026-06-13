from django.contrib import admin

from .models import Actor, Director, Genre, Movie


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    search_fields = ["name"]


@admin.register(Director)
class DirectorAdmin(admin.ModelAdmin):
    search_fields = ["name"]


@admin.register(Actor)
class ActorAdmin(admin.ModelAdmin):
    search_fields = ["name"]
    list_display = ["name", "birth_year"]


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ["title", "release_year", "director", "rating"]
    list_filter = ["release_year", "genres"]
    search_fields = ["title"]
    filter_horizontal = ["actors", "genres"]
