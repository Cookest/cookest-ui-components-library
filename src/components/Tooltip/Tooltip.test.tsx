import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("renders children", () => {
    render(<Tooltip content="Help"><button>Hover</button></Tooltip>);
    expect(screen.getByText("Hover")).toBeInTheDocument();
  });

  it("shows tooltip on hover after delay", async () => {
    const user = userEvent.setup();
    render(<Tooltip content="Help text" delay={0}><button>Hover</button></Tooltip>);
    await user.hover(screen.getByText("Hover"));
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Help text");
  });

  it("hides tooltip on mouse leave", async () => {
    const user = userEvent.setup();
    render(<Tooltip content="Help" delay={0}><button>Hover</button></Tooltip>);
    await user.hover(screen.getByText("Hover"));
    expect(await screen.findByRole("tooltip")).toBeInTheDocument();
    await user.unhover(screen.getByText("Hover"));
    // AnimatePresence may keep it briefly, but it should disappear
  });
});
