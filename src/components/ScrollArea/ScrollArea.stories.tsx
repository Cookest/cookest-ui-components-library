import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea, ScrollBar } from "./ScrollArea";

const meta: Meta<typeof ScrollArea> = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

const recipes = [
  "Pasta Carbonara", "Chicken Tikka Masala", "Avocado Toast", "Beef Tacos",
  "Veggie Stir Fry", "Salmon Teriyaki", "Greek Salad", "Margherita Pizza",
  "Banana Bread", "French Omelette", "Tom Yum Soup", "Shakshuka",
  "Beef Bourguignon", "Poke Bowl", "Tiramisu", "Caesar Salad",
  "Sushi Rolls", "Lamb Kebabs", "Mango Sorbet", "Croissants",
];

export const Default: Story = {
  render: () => (
    <ScrollArea style={{ height: 280, width: 280, border: "1px solid var(--ck-border)", borderRadius: 8 }}>
      <div style={{ padding: 12 }}>
        {recipes.map((recipe) => (
          <div key={recipe} style={{ padding: "8px 12px", borderBottom: "1px solid var(--ck-border)", color: "var(--ck-text)", fontSize: 14 }}>{recipe}</div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea style={{ width: 320, border: "1px solid var(--ck-border)", borderRadius: 8 }}>
      <div style={{ display: "flex", gap: 12, padding: 12, width: "max-content" }}>
        {recipes.slice(0, 10).map((recipe) => (
          <div key={recipe} style={{ minWidth: 140, padding: "12px 16px", background: "var(--ck-bg-card)", border: "1px solid var(--ck-border)", borderRadius: 6, color: "var(--ck-text)", fontSize: 13, whiteSpace: "nowrap" }}>{recipe}</div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};
