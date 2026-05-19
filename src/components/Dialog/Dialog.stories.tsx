import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./Dialog";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <button style={{ padding: "8px 16px", background: "var(--ck-primary)", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
          Edit Profile
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your display name and bio.</DialogDescription>
        </DialogHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "16px 0" }}>
          <input placeholder="Display name" style={{ padding: "8px 12px", border: "1px solid var(--ck-border)", borderRadius: 6, background: "var(--ck-surface)", color: "var(--ck-text)" }} />
          <textarea placeholder="Bio" rows={3} style={{ padding: "8px 12px", border: "1px solid var(--ck-border)", borderRadius: 6, background: "var(--ck-surface)", color: "var(--ck-text)", resize: "none" }} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <button style={{ padding: "8px 16px", border: "1px solid var(--ck-border)", borderRadius: 6, cursor: "pointer", background: "var(--ck-surface)", color: "var(--ck-text)" }}>Cancel</button>
          </DialogClose>
          <button style={{ padding: "8px 16px", background: "var(--ck-primary)", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>Save</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Alert: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <button style={{ padding: "8px 16px", background: "var(--ck-surface)", color: "var(--ck-text)", border: "1px solid var(--ck-border)", borderRadius: 6, cursor: "pointer" }}>
          Show Message
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Recipe Saved</DialogTitle>
          <DialogDescription>Your recipe has been saved successfully.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <button style={{ padding: "8px 16px", background: "var(--ck-primary)", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>OK</button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
