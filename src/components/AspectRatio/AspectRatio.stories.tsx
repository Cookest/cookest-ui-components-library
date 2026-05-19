import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "./AspectRatio";

const meta: Meta<typeof AspectRatio> = {
  title: "Components/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <AspectRatio ratio={16 / 9}>
        <div style={{ width: "100%", height: "100%", background: "var(--ck-bg-card)", border: "1px solid var(--ck-border)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "var(--ck-text-muted)" }}>16 / 9</span>
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <AspectRatio ratio={1}>
        <div style={{ width: "100%", height: "100%", background: "var(--ck-bg-card)", border: "1px solid var(--ck-border)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "var(--ck-text-muted)" }}>1 / 1</span>
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Portrait: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <AspectRatio ratio={3 / 4}>
        <div style={{ width: "100%", height: "100%", background: "var(--ck-bg-card)", border: "1px solid var(--ck-border)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "var(--ck-text-muted)" }}>3 / 4</span>
        </div>
      </AspectRatio>
    </div>
  ),
};
