import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getActor } from "../api/movies";
import { ApiError } from "../api/client";
import { ErrorBanner } from "../components/ErrorBanner";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { MovieCard } from "../components/MovieCard";
import type { ActorDetail } from "../types";

export function ActorPage() {
  const { id } = useParams<{ id: string }>();
  const [actor, setActor] = useState<ActorDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getActor(Number(id))
      .then(setActor)
      .catch((err: unknown) => {
        if (err instanceof ApiError && err.status === 404) {
          setError("Actor not found.");
        } else {
          setError("Failed to load actor profile.");
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorBanner message={error} />;
  if (!actor) return null;

  return (
    <article className="space-y-6">
      <Link to="/" className="text-sm text-slate-400 hover:text-indigo-400">
        &larr; Back to movies
      </Link>

      <header>
        <h1 className="text-4xl font-bold text-white">{actor.name}</h1>
        {actor.birth_year && (
          <p className="mt-2 text-slate-400">Born {actor.birth_year}</p>
        )}
        {actor.bio && <p className="mt-4 max-w-2xl leading-relaxed text-slate-300">{actor.bio}</p>}
      </header>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-white">Filmography</h2>
        {actor.movies.length === 0 ? (
          <p className="text-slate-400">No movies on record.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {actor.movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </article>
  );
}
