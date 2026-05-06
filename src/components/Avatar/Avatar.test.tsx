import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Avatar, AvatarGroup } from "./Avatar";

describe("Avatar", () => {
  it("renders initials from alt text", () => {
    render(<Avatar alt="Maria Santos" />);
    expect(screen.getByLabelText("Maria Santos")).toHaveTextContent("MS");
  });

  it("renders image when src provided", () => {
    render(<Avatar src="/avatar.jpg" alt="User" />);
    expect(screen.getByAltText("User")).toBeInTheDocument();
  });

  it("applies size classes", () => {
    render(<Avatar alt="Big User" size="xl" />);
    expect(screen.getByLabelText("Big User")).toHaveClass("h-16", "w-16");
  });

  it("uses custom initials", () => {
    render(<Avatar alt="User" initials="CK" />);
    expect(screen.getByLabelText("User")).toHaveTextContent("CK");
  });
});

describe("AvatarGroup", () => {
  it("shows overflow count when max exceeded", () => {
    render(
      <AvatarGroup max={2}>
        <Avatar alt="A" />
        <Avatar alt="B" />
        <Avatar alt="C" />
        <Avatar alt="D" />
      </AvatarGroup>,
    );
    expect(screen.getByText("+2")).toBeInTheDocument();
  });
});
