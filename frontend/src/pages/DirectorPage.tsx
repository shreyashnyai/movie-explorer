import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDirector } from "../api/movies";
import { ApiError } from "../api/client";
import { ErrorBanner } from "../components/ErrorBanner";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { MovieCard } from "../components/MovieCard";
import type { DirectorDetail } from "../types";

export function DirectorPage() {
  const { id } = useParams<{ id: string }>();
  const [director, setDirector] = useState<DirectorDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getDirector(Number(id))
      .then(setDirector)
      .catch((err: unknown) => {
        if (err instanceof ApiError && err.status === 404) {
          setError("Director not found.");
        } else {
          setError("Failed to load director profile.");
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorBanner message={error} />;
  if (!director) return null;

  return (
    <article className="space-y-6">
      <Link to="/" className="text-sm text-slate-400 hover:text-indigo-400">
        &larr; Back to movies
      </Link>

      <header>
        <h1 className="text-4xl font-bold text-white">{director.name}</h1>
        {director.bio && (
          <p className="mt-4 max-w-2xl leading-relaxed text-slate-300">{director.bio}</p>
        )}
      </header>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-white">Directed Movies</h2>
        {director.movies.length === 0 ? (
          <p className="text-slate-400">No movies on record.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {director.movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </article>
  );
}
