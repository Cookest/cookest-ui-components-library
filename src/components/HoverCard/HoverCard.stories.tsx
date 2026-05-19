import type { Meta, StoryObj } from "@storybook/react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "./HoverCard";

const meta: Meta<typeof HoverCard> = {
  title: "Components/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a href="#" style={{ color: "var(--ck-primary)", textDecoration: "underline", cursor: "pointer" }}>@chef_mario</a>
      </HoverCardTrigger>
      <HoverCardContent>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontWeight: 700, color: "var(--ck-heading)" }}>Chef Mario</div>
          <div style={{ fontSize: 13, color: "var(--ck-text-muted)" }}>Italian cuisine specialist · 142 recipes</div>
          <div style={{ fontSize: 13, color: "var(--ck-text)" }}>Bringing authentic Italian flavours to your kitchen since 2018.</div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const Wide: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a href="#" style={{ color: "var(--ck-primary)", textDecoration: "underline", cursor: "pointer" }}>Pasta Carbonara</a>
      </HoverCardTrigger>
      <HoverCardContent style={{ width: 320 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontWeight: 700, color: "var(--ck-heading)" }}>Pasta Carbonara</div>
          <div style={{ fontSize: 13, color: "var(--ck-text-muted)" }}>Italian · 30 min · 520 kcal</div>
          <div style={{ fontSize: 13, color: "var(--ck-text)" }}>A classic Roman pasta dish made with eggs, Pecorino Romano, guanciale, and black pepper.</div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};
