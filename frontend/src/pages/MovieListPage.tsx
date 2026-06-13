import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getActors, getDirectors, getGenres, getMovies } from "../api/movies";
import { EmptyState } from "../components/EmptyState";
import { ErrorBanner } from "../components/ErrorBanner";
import { FilterBar, type FilterValues } from "../components/FilterBar";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { MovieCard } from "../components/MovieCard";
import type { ActorBrief, DirectorBrief, Genre, MovieBrief } from "../types";

function filtersFromParams(params: URLSearchParams): FilterValues {
  return {
    genre: params.get("genre") ?? "",
    director: params.get("director") ?? "",
    actor: params.get("actor") ?? "",
    release_year: params.get("release_year") ?? "",
  };
}

export function MovieListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<MovieBrief[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [directors, setDirectors] = useState<DirectorBrief[]>([]);
  const [actors, setActors] = useState<ActorBrief[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filters = filtersFromParams(searchParams);
  const filterKey = searchParams.toString();

  useEffect(() => {
    Promise.all([getGenres(), getDirectors(), getActors()])
      .then(([genreRes, directorRes, actorRes]) => {
        setGenres(genreRes.results);
        setDirectors(directorRes.results);
        setActors(actorRes.results);
      })
      .catch(() => setError("Failed to load filter options."));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const currentFilters = filtersFromParams(new URLSearchParams(filterKey));
    const apiFilters: Record<string, string> = {};
    if (currentFilters.genre) apiFilters.genre = currentFilters.genre;
    if (currentFilters.director) apiFilters.director = currentFilters.director;
    if (currentFilters.actor) apiFilters.actor = currentFilters.actor;
    if (currentFilters.release_year) apiFilters.release_year = currentFilters.release_year;

    getMovies(apiFilters)
      .then((data) => setMovies(data.results))
      .catch(() => setError("Failed to load movies. Is the backend running?"))
      .finally(() => setLoading(false));
  }, [filterKey]);

  const handleFilterChange = (values: FilterValues) => {
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Movies</h1>
        <p className="mt-1 text-slate-400">Explore our catalog — filters are applied on the server.</p>
      </div>

      <FilterBar
        genres={genres}
        directors={directors}
        actors={actors}
        values={filters}
        onChange={handleFilterChange}
      />

      {error && <ErrorBanner message={error} />}
      {loading && <LoadingSpinner />}
      {!loading && !error && movies.length === 0 && <EmptyState />}
      {!loading && !error && movies.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
