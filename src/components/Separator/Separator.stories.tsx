import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./Separator";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <div style={{ color: "var(--ck-heading)", fontWeight: 600 }}>Ingredients</div>
      <Separator style={{ margin: "12px 0" }} />
      <div style={{ color: "var(--ck-text)" }}>2 cups flour, 1 cup sugar, 3 eggs</div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ color: "var(--ck-text)" }}>30 min</span>
      <Separator orientation="vertical" style={{ height: 20 }} />
      <span style={{ color: "var(--ck-text)" }}>4 servings</span>
      <Separator orientation="vertical" style={{ height: 20 }} />
      <span style={{ color: "var(--ck-text)" }}>420 kcal</span>
    </div>
  ),
};

export const InContent: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <p style={{ color: "var(--ck-text)" }}>Preheat the oven to 180°C and prepare your baking dish.</p>
      <Separator style={{ margin: "16px 0" }} />
      <p style={{ color: "var(--ck-text)" }}>Mix all dry ingredients together in a large bowl before adding the wet ingredients.</p>
      <Separator style={{ margin: "16px 0" }} />
      <p style={{ color: "var(--ck-text)" }}>Bake for 25 minutes until golden brown.</p>
    </div>
  ),
};
