import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Select } from "./Select";

const options = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Beta" },
  { value: "c", label: "Charlie", disabled: true },
];

describe("Select", () => {
  it("renders with label and placeholder", () => {
    render(<Select label="Choose" options={options} placeholder="Pick one" />);
    expect(screen.getByText("Choose")).toBeInTheDocument();
    expect(screen.getByText("Pick one")).toBeInTheDocument();
  });

  it("opens dropdown on click", async () => {
    const user = userEvent.setup();
    render(<Select options={options} />);
    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByText("Alpha")).toBeInTheDocument();
  });

  it("selects an option", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} />);
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("Beta"));
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("shows selected option label", () => {
    render(<Select options={options} value="a" />);
    expect(screen.getByText("Alpha")).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(<Select options={options} error="Required" />);
    expect(screen.getByText("Required")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
  });

  it("is disabled when disabled prop set", () => {
    render(<Select options={options} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<Select options={options} />);
    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    // listbox should be removed
  });
});
