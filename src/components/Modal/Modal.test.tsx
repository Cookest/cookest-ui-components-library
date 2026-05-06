import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("renders when open", () => {
    render(<Modal open onClose={() => {}}>Content</Modal>);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(<Modal open={false} onClose={() => {}}>Hidden</Modal>);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders title in header", () => {
    render(<Modal open onClose={() => {}} title="My Modal">Body</Modal>);
    expect(screen.getByText("My Modal")).toBeInTheDocument();
  });

  it("closes on Escape key", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal open onClose={onClose}>Content</Modal>);
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("closes on close button click", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="Test">Content</Modal>);
    await user.click(screen.getByLabelText("Close"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("renders footer content", () => {
    render(
      <Modal open onClose={() => {}} footer={<button>Confirm</button>}>
        Body
      </Modal>,
    );
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("has aria-modal attribute", () => {
    render(<Modal open onClose={() => {}}>Content</Modal>);
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });
});
