import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("applies the correct variant class", () => {
    const { container } = render(<Button variant="danger">Delete</Button>);
    const btn = container.querySelector("button");
    expect(btn?.className).toContain("bg-[var(--ck-error)]");
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Press</Button>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>Press</Button>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("does not call onClick when loading", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} loading>Press</Button>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("shows loading spinner and sets aria-busy", () => {
    render(<Button loading>Saving</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-busy", "true");
    expect(btn.querySelector("svg.animate-spin")).toBeInTheDocument();
  });

  it("renders iconLeft and iconRight", () => {
    render(
      <Button
        iconLeft={<span data-testid="icon-left">←</span>}
        iconRight={<span data-testid="icon-right">→</span>}
      >
        Nav
      </Button>,
    );
    expect(screen.getByTestId("icon-left")).toBeInTheDocument();
    expect(screen.getByTestId("icon-right")).toBeInTheDocument();
  });

  it("applies fullWidth class", () => {
    const { container } = render(<Button fullWidth>Wide</Button>);
    expect(container.querySelector("button")?.className).toContain("w-full");
  });

  it("applies size classes correctly", () => {
    const { container } = render(<Button size="lg">Large</Button>);
    expect(container.querySelector("button")?.className).toContain("px-7");
  });
});
