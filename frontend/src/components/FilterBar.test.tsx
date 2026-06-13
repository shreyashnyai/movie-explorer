import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FilterBar } from "./FilterBar";

const genres = [{ id: 1, name: "Action" }];
const directors = [{ id: 1, name: "Test Director" }];
const actors = [{ id: 1, name: "Test Actor" }];

describe("FilterBar", () => {
  it("calls onChange when genre is selected", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <FilterBar
        genres={genres}
        directors={directors}
        actors={actors}
        values={{ genre: "", director: "", actor: "", release_year: "" }}
        onChange={onChange}
      />,
    );

    await user.selectOptions(screen.getByDisplayValue("All genres"), "Action");

    expect(onChange).toHaveBeenCalledWith({
      genre: "Action",
      director: "",
      actor: "",
      release_year: "",
    });
  });
});
