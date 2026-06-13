export interface Genre {
  id: number;
  name: string;
}

export interface DirectorBrief {
  id: number;
  name: string;
}

export interface DirectorDetail extends DirectorBrief {
  bio: string;
  movies: MovieBrief[];
}

export interface ActorBrief {
  id: number;
  name: string;
  birth_year?: number | null;
}

export interface ActorDetail extends ActorBrief {
  bio: string;
  movies: MovieBrief[];
}

export interface MovieBrief {
  id: number;
  title: string;
  release_year: number;
  director: DirectorBrief;
  genres: Genre[];
  rating?: string | null;
}

export interface MovieDetail extends MovieBrief {
  actors: ActorBrief[];
  review: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface MovieFilters {
  genre?: string;
  director?: string;
  actor?: string;
  release_year?: string;
}
