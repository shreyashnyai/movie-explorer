import type { ActorBrief, DirectorBrief, Genre } from "../types";

export interface FilterValues {
  genre: string;
  director: string;
  actor: string;
  release_year: string;
}

interface FilterBarProps {
  genres: Genre[];
  directors: DirectorBrief[];
  actors: ActorBrief[];
  values: FilterValues;
  onChange: (values: FilterValues) => void;
}

const selectClass =
  "w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";

export function FilterBar({ genres, directors, actors, values, onChange }: FilterBarProps) {
  const update = (field: keyof FilterValues, value: string) => {
    onChange({ ...values, [field]: value });
  };

  const clearFilters = () => {
    onChange({ genre: "", director: "", actor: "", release_year: "" });
  };

  const hasFilters = Object.values(values).some(Boolean);

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Filter Movies
        </h2>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm text-indigo-400 hover:text-indigo-300"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <span className="mb-1 block text-xs text-slate-400">Genre</span>
          <select
            className={selectClass}
            value={values.genre}
            onChange={(e) => update("genre", e.target.value)}
          >
            <option value="">All genres</option>
            {genres.map((g) => (
              <option key={g.id} value={g.name}>
                {g.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-slate-400">Director</span>
          <select
            className={selectClass}
            value={values.director}
            onChange={(e) => update("director", e.target.value)}
          >
            <option value="">All directors</option>
            {directors.map((d) => (
              <option key={d.id} value={String(d.id)}>
                {d.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-slate-400">Actor</span>
          <select
            className={selectClass}
            value={values.actor}
            onChange={(e) => update("actor", e.target.value)}
          >
            <option value="">All actors</option>
            {actors.map((a) => (
              <option key={a.id} value={String(a.id)}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-slate-400">Release Year</span>
          <input
            type="number"
            className={selectClass}
            placeholder="e.g. 2010"
            value={values.release_year}
            onChange={(e) => update("release_year", e.target.value)}
          />
        </label>
      </div>
    </section>
  );
}
