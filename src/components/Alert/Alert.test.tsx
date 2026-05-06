import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders with title and message", () => {
    render(<Alert title="Error" variant="error">Something failed</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("Something failed")).toBeInTheDocument();
  });

  it("renders dismiss button and calls onDismiss", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Alert dismissible onDismiss={onDismiss}>Dismissible</Alert>);
    await user.click(screen.getByLabelText("Dismiss"));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("is hidden when visible is false", () => {
    render(<Alert visible={false}>Hidden</Alert>);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("applies variant classes", () => {
    render(<Alert variant="success">OK</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert.className).toContain("bg-emerald-50");
  });
});
