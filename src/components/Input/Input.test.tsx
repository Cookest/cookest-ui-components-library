import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("renders with label", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("renders placeholder text", () => {
    render(<Input placeholder="Enter email" />);
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
  });

  it("shows error message with aria-invalid", () => {
    render(<Input label="Email" error="Invalid email" />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid email");
  });

  it("shows helper text when no error", () => {
    render(<Input label="Password" helperText="Min 8 chars" />);
    expect(screen.getByText("Min 8 chars")).toBeInTheDocument();
  });

  it("hides helper text when error is present", () => {
    render(<Input label="Password" helperText="Min 8 chars" error="Too short" />);
    expect(screen.queryByText("Min 8 chars")).not.toBeInTheDocument();
    expect(screen.getByText("Too short")).toBeInTheDocument();
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Input label="Name" />);
    const input = screen.getByLabelText("Name");
    await user.type(input, "John");
    expect(input).toHaveValue("John");
  });

  it("is disabled when disabled prop is set", () => {
    render(<Input label="Name" disabled />);
    expect(screen.getByLabelText("Name")).toBeDisabled();
  });

  it("renders icon slots", () => {
    render(
      <Input
        iconLeft={<span data-testid="left">L</span>}
        iconRight={<span data-testid="right">R</span>}
      />,
    );
    expect(screen.getByTestId("left")).toBeInTheDocument();
    expect(screen.getByTestId("right")).toBeInTheDocument();
  });
});
