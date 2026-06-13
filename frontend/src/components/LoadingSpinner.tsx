export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16" role="status" aria-label="Loading">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
    </div>
  );
}
