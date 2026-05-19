import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: { children: "Recipe Name" },
};

export const WithInput: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <Label htmlFor="recipe-name">Recipe Name</Label>
      <input id="recipe-name" placeholder="e.g. Pasta Carbonara" style={{ padding: "8px 12px", border: "1px solid var(--ck-border)", borderRadius: 6, background: "var(--ck-surface)", color: "var(--ck-text)" }} />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <Label htmlFor="disabled-field" className="peer-disabled:opacity-50">Disabled Field</Label>
      <input id="disabled-field" disabled placeholder="Disabled" style={{ padding: "8px 12px", border: "1px solid var(--ck-border)", borderRadius: 6, background: "var(--ck-surface)", color: "var(--ck-text-muted)", opacity: 0.5 }} />
    </div>
  ),
};
