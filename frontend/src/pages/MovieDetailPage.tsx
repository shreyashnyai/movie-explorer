import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovie } from "../api/movies";
import { ApiError } from "../api/client";
import { ErrorBanner } from "../components/ErrorBanner";
import { LoadingSpinner } from "../components/LoadingSpinner";
import type { MovieDetail } from "../types";

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getMovie(Number(id))
      .then(setMovie)
      .catch((err: unknown) => {
        if (err instanceof ApiError && err.status === 404) {
          setError("Movie not found.");
        } else {
          setError("Failed to load movie details.");
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorBanner message={error} />;
  if (!movie) return null;

  return (
    <article className="space-y-6">
      <Link to="/" className="text-sm text-slate-400 hover:text-indigo-400">
        &larr; Back to movies
      </Link>

      <header>
        <h1 className="text-4xl font-bold text-white">{movie.title}</h1>
        <p className="mt-2 text-lg text-slate-400">{movie.release_year}</p>
        {movie.rating && (
          <p className="mt-2 text-amber-400">Rating: {movie.rating}/10</p>
        )}
      </header>

      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Director</h2>
        <Link to={`/directors/${movie.director.id}`} className="mt-2 inline-block text-lg font-medium">
          {movie.director.name}
        </Link>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Genres</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {movie.genres.map((genre) => (
            <span
              key={genre.id}
              className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm text-indigo-300"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Cast</h2>
        <ul className="mt-3 space-y-2">
          {movie.actors.map((actor) => (
            <li key={actor.id}>
              <Link to={`/actors/${actor.id}`}>{actor.name}</Link>
            </li>
          ))}
        </ul>
      </section>

      {movie.review && (
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Review</h2>
          <p className="mt-3 leading-relaxed text-slate-300">{movie.review}</p>
        </section>
      )}
    </article>
  );
}
