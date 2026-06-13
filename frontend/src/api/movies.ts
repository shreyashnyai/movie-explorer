import { apiFetch } from "./client";
import type {
  ActorBrief,
  ActorDetail,
  DirectorBrief,
  DirectorDetail,
  Genre,
  MovieDetail,
  MovieFilters,
  MovieBrief,
  PaginatedResponse,
} from "../types";

export function getMovies(filters: MovieFilters = {}): Promise<PaginatedResponse<MovieBrief>> {
  return apiFetch<PaginatedResponse<MovieBrief>>("/api/movies/", filters as Record<string, string>);
}

export function getMovie(id: number): Promise<MovieDetail> {
  return apiFetch<MovieDetail>(`/api/movies/${id}/`);
}

export function getActors(params: Record<string, string> = {}): Promise<PaginatedResponse<ActorBrief>> {
  return apiFetch<PaginatedResponse<ActorBrief>>("/api/actors/", params);
}

export function getActor(id: number): Promise<ActorDetail> {
  return apiFetch<ActorDetail>(`/api/actors/${id}/`);
}

export function getDirectors(): Promise<PaginatedResponse<DirectorBrief>> {
  return apiFetch<PaginatedResponse<DirectorBrief>>("/api/directors/");
}

export function getDirector(id: number): Promise<DirectorDetail> {
  return apiFetch<DirectorDetail>(`/api/directors/${id}/`);
}

export function getGenres(): Promise<PaginatedResponse<Genre>> {
  return apiFetch<PaginatedResponse<Genre>>("/api/genres/");
}
