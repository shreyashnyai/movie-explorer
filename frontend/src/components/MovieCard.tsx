import { Link } from "react-router-dom";
import type { MovieBrief } from "../types";

interface MovieCardProps {
  movie: MovieBrief;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-lg transition hover:border-indigo-500/50 hover:shadow-indigo-500/10">
      <Link to={`/movies/${movie.id}`} className="block text-left no-underline">
        <h2 className="text-lg font-semibold text-white hover:text-indigo-300">
          {movie.title}
        </h2>
        <p className="mt-1 text-sm text-slate-400">{movie.release_year}</p>
      </Link>
      <p className="mt-2 text-sm">
        Director:{" "}
        <Link to={`/directors/${movie.director.id}`} className="font-medium">
          {movie.director.name}
        </Link>
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {movie.genres.map((genre) => (
          <span
            key={genre.id}
            className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs text-indigo-300"
          >
            {genre.name}
          </span>
        ))}
      </div>
      {movie.rating && (
        <p className="mt-3 text-sm font-medium text-amber-400">Rating: {movie.rating}/10</p>
      )}
    </article>
  );
}
