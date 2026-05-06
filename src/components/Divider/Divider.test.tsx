import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Divider } from "./Divider";

describe("Divider", () => {
  it("renders horizontal separator", () => {
    render(<Divider />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Divider label="or" />);
    expect(screen.getByText("or")).toBeInTheDocument();
  });

  it("renders vertical separator", () => {
    render(<Divider orientation="vertical" />);
    const sep = screen.getByRole("separator");
    expect(sep).toHaveAttribute("aria-orientation", "vertical");
  });
});
