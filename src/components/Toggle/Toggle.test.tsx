import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("renders with label", () => {
    render(<Toggle label="Dark mode" />);
    expect(screen.getByText("Dark mode")).toBeInTheDocument();
  });

  it("renders as switch role", () => {
    render(<Toggle label="Test" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("calls onChange when toggled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Toggle label="Test" onChange={onChange} />);
    await user.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledOnce();
  });

  it("is disabled when disabled prop set", () => {
    render(<Toggle label="Test" disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("renders description text", () => {
    render(<Toggle label="Emails" description="Weekly digest" />);
    expect(screen.getByText("Weekly digest")).toBeInTheDocument();
  });
});
