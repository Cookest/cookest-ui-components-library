import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "./DropdownMenu";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button style={{ padding: "8px 16px", background: "var(--ck-surface)", border: "1px solid var(--ck-border)", borderRadius: 6, cursor: "pointer", color: "var(--ck-text)" }}>
          Options ▾
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Recipe Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit <DropdownMenuShortcut>⌘E</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuItem>Duplicate <DropdownMenuShortcut>⌘D</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Delete <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithCheckboxes: Story = {
  render: () => {
    const [showCalories, setShowCalories] = React.useState(true);
    const [showProtein, setShowProtein] = React.useState(false);
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button style={{ padding: "8px 16px", background: "var(--ck-surface)", border: "1px solid var(--ck-border)", borderRadius: 6, cursor: "pointer", color: "var(--ck-text)" }}>
            Display ▾
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Show Columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked={showCalories} onCheckedChange={setShowCalories}>Calories</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showProtein} onCheckedChange={setShowProtein}>Protein</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const WithRadioGroup: Story = {
  render: () => {
    const [sort, setSort] = React.useState("newest");
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button style={{ padding: "8px 16px", background: "var(--ck-surface)", border: "1px solid var(--ck-border)", borderRadius: 6, cursor: "pointer", color: "var(--ck-text)" }}>
            Sort ▾
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
            <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="popular">Most Popular</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="rating">Highest Rated</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};
