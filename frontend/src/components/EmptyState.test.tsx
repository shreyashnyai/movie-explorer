import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders default message", () => {
    render(<EmptyState />);
    expect(screen.getByText("No movies match your filters.")).toBeInTheDocument();
  });

  it("renders custom message", () => {
    render(<EmptyState message="No movies available." />);
    expect(screen.getByText("No movies available.")).toBeInTheDocument();
  });
});
