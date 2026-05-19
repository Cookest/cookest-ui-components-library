import type { Meta, StoryObj } from "@storybook/react";
import { Toaster } from "./Toaster";
import { useToast } from "./use-toast";

const meta: Meta<typeof Toaster> = {
  title: "Components/Toaster",
  component: Toaster,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => {
    const { toast } = useToast();
    return (
      <div>
        <Toaster />
        <button
          onClick={() => toast({ title: "Recipe Saved", description: "Your recipe has been saved successfully." })}
          style={{ padding: "8px 16px", background: "var(--ck-primary)", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}
        >
          Show Toast
        </button>
      </div>
    );
  },
};
