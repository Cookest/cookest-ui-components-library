import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders dot indicator", () => {
    const { container } = render(<Badge dot>Online</Badge>);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it("renders remove button and calls onRemove", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<Badge removable onRemove={onRemove}>Tag</Badge>);
    await user.click(screen.getByLabelText("Remove"));
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it("applies variant classes", () => {
    const { container } = render(<Badge variant="error">Error</Badge>);
    expect(container.firstChild).toHaveClass("bg-red-100");
  });
});
