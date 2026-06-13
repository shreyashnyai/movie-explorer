import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { MovieCard } from "../components/MovieCard";
import type { MovieBrief } from "../types";

const sampleMovie: MovieBrief = {
  id: 1,
  title: "Inception",
  release_year: 2010,
  director: { id: 1, name: "Christopher Nolan" },
  genres: [{ id: 1, name: "Sci-Fi" }],
  rating: "8.8",
};

describe("MovieCard", () => {
  it("renders title and release year", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={sampleMovie} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("2010")).toBeInTheDocument();
    expect(screen.getByText("Christopher Nolan")).toBeInTheDocument();
  });
});
