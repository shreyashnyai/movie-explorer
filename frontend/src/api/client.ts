const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/** Fetch JSON from the backend API with consistent error handling. */
export async function apiFetch<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      }
    });
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new ApiError(`Request failed: ${response.statusText}`, response.status);
  }

  return response.json() as Promise<T>;
}
