import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card, CardHeader, CardBody, CardFooter } from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders with sections", () => {
    render(
      <Card padding="none">
        <CardHeader>Title</CardHeader>
        <CardBody>Body text</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Body text")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    const { container } = render(<Card variant="outlined">Outlined</Card>);
    expect(container.firstChild).toHaveClass("bg-transparent");
  });

  it("applies padding classes", () => {
    const { container } = render(<Card padding="lg">Padded</Card>);
    expect(container.firstChild).toHaveClass("p-7");
  });
});
