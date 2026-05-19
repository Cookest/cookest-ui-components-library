import type { Meta, StoryObj } from "@storybook/react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from "./NavigationMenu";

const meta: Meta<typeof NavigationMenu> = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Recipes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8, minWidth: 200 }}>
              <li><NavigationMenuLink href="#" style={{ color: "var(--ck-text)", display: "block", padding: "6px 8px", borderRadius: 4 }}>Browse All</NavigationMenuLink></li>
              <li><NavigationMenuLink href="#" style={{ color: "var(--ck-text)", display: "block", padding: "6px 8px", borderRadius: 4 }}>Quick & Easy</NavigationMenuLink></li>
              <li><NavigationMenuLink href="#" style={{ color: "var(--ck-text)", display: "block", padding: "6px 8px", borderRadius: 4 }}>Vegetarian</NavigationMenuLink></li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" style={{ padding: "8px 12px", color: "var(--ck-text)", display: "block" }}>About</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuIndicator />
      </NavigationMenuList>
      <NavigationMenuViewport />
    </NavigationMenu>
  ),
};

export const Simple: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        {["Home", "Recipes", "Planner"].map((item) => (
          <NavigationMenuItem key={item}>
            <NavigationMenuLink href="#" style={{ padding: "8px 12px", color: "var(--ck-text)", display: "block" }}>{item}</NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  ),
};
