import type { Meta, StoryObj } from "@storybook/react";
import { toast } from "sonner";
import { Toaster } from "./Sonner";

const meta: Meta<typeof Toaster> = {
  title: "Components/Sonner",
  component: Toaster,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => (
    <div>
      <Toaster />
      <button
        onClick={() => toast("Recipe saved successfully!")}
        style={{ padding: "8px 16px", background: "var(--ck-primary)", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}
      >
        Show Toast
      </button>
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Toaster />
      <button onClick={() => toast.success("Recipe saved!")} style={{ padding: "8px 16px", background: "#22c55e", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>Success</button>
      <button onClick={() => toast.error("Failed to save recipe.")} style={{ padding: "8px 16px", background: "#ef4444", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>Error</button>
      <button onClick={() => toast.info("Syncing your recipes...")} style={{ padding: "8px 16px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>Info</button>
    </div>
  ),
};
