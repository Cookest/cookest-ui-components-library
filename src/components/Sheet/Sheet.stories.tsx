import type { Meta, StoryObj } from "@storybook/react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "./Sheet";

const meta: Meta<typeof Sheet> = {
  title: "Components/Sheet",
  component: Sheet,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <button style={{ padding: "8px 16px", background: "var(--ck-primary)", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
          Open Sheet
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Recipe Filters</SheetTitle>
          <SheetDescription>Refine your recipe search.</SheetDescription>
        </SheetHeader>
        <div style={{ padding: "16px 0", color: "var(--ck-text)" }}>
          <p>Filter options go here.</p>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <button style={{ padding: "8px 16px", border: "1px solid var(--ck-border)", borderRadius: 6, cursor: "pointer", background: "var(--ck-surface)", color: "var(--ck-text)" }}>Close</button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <button style={{ padding: "8px 16px", background: "var(--ck-surface)", border: "1px solid var(--ck-border)", borderRadius: 6, cursor: "pointer", color: "var(--ck-text)" }}>
          Open Left
        </button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>App navigation links.</SheetDescription>
        </SheetHeader>
        <nav style={{ padding: "16px 0", display: "flex", flexDirection: "column", gap: 8 }}>
          {["Home", "Recipes", "Planner", "Settings"].map((item) => (
            <a key={item} href="#" style={{ color: "var(--ck-text)", padding: "8px 12px", borderRadius: 6, textDecoration: "none" }}>{item}</a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <button style={{ padding: "8px 16px", background: "var(--ck-surface)", border: "1px solid var(--ck-border)", borderRadius: 6, cursor: "pointer", color: "var(--ck-text)" }}>
          Open Bottom
        </button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Share Recipe</SheetTitle>
          <SheetDescription>Share this recipe with your friends.</SheetDescription>
        </SheetHeader>
        <div style={{ padding: "16px 0", color: "var(--ck-text)" }}>
          <p>Share options...</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const Top: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <button style={{ padding: "8px 16px", background: "var(--ck-surface)", border: "1px solid var(--ck-border)", borderRadius: 6, cursor: "pointer", color: "var(--ck-text)" }}>
          Open Top
        </button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Notification</SheetTitle>
          <SheetDescription>Your meal plan for today is ready.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};
