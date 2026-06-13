interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = "No movies match your filters." }: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/40 py-16 text-center">
      <p className="text-lg text-slate-400">{message}</p>
      <p className="mt-2 text-sm text-slate-500">Try adjusting or clearing your filters.</p>
    </div>
  );
}
