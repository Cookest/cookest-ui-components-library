import type { Meta, StoryObj } from "@storybook/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from "./Popover";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button style={{ padding: "8px 16px", background: "var(--ck-surface)", border: "1px solid var(--ck-border)", borderRadius: 6, cursor: "pointer", color: "var(--ck-text)" }}>
          Open Popover
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div style={{ color: "var(--ck-text)" }}>
          <p style={{ fontWeight: 600, color: "var(--ck-heading)", marginBottom: 4 }}>Nutritional Info</p>
          <p style={{ fontSize: 13, color: "var(--ck-text-muted)" }}>Calories: 420 · Protein: 28g · Carbs: 52g · Fat: 14g</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Form: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button style={{ padding: "8px 16px", background: "var(--ck-surface)", border: "1px solid var(--ck-border)", borderRadius: 6, cursor: "pointer", color: "var(--ck-text)" }}>
          Set Servings
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label style={{ color: "var(--ck-text)", fontSize: 13, fontWeight: 600 }}>Number of servings</label>
          <input type="number" defaultValue={2} min={1} max={20} style={{ padding: "6px 10px", border: "1px solid var(--ck-border)", borderRadius: 6, background: "var(--ck-surface)", color: "var(--ck-text)", width: "100%" }} />
          <button style={{ padding: "6px 12px", background: "var(--ck-primary)", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>Apply</button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
