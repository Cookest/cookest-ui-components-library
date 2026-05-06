import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Skeleton, SkeletonCard } from "./Skeleton";

describe("Skeleton", () => {
  it("renders with status role", () => {
    render(<Skeleton />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders multiple lines", () => {
    render(<Skeleton lines={3} />);
    const statuses = screen.getAllByRole("status");
    expect(statuses).toHaveLength(3);
  });

  it("applies circular variant", () => {
    render(<Skeleton variant="circular" />);
    expect(screen.getByRole("status")).toHaveClass("rounded-full");
  });
});

describe("SkeletonCard", () => {
  it("renders composite skeleton", () => {
    const { container } = render(<SkeletonCard />);
    const skeletons = container.querySelectorAll('[role="status"]');
    expect(skeletons.length).toBeGreaterThanOrEqual(3);
  });
});
