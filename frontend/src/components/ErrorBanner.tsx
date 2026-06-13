interface ErrorBannerProps {
  message: string;
}

export function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-300" role="alert">
      {message}
    </div>
  );
}
