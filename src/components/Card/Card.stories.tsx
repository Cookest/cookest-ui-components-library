import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardBody, CardFooter } from "./Card";
import { Button } from "../Button/Button";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "interactive", "outlined"] },
    padding: { control: "select", options: ["none", "sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: { children: "A simple card with default padding." },
};

export const Interactive: Story = {
  args: { variant: "interactive", children: "Hover me — I lift on hover!" },
};

export const WithSections: Story = {
  render: () => (
    <Card padding="none" style={{ width: 360 }}>
      <CardHeader>Recipe Details</CardHeader>
      <CardBody>A delicious sage-infused risotto with seasonal vegetables.</CardBody>
      <CardFooter>
        <Button size="sm">View Recipe</Button>
      </CardFooter>
    </Card>
  ),
};

export const Outlined: Story = {
  args: { variant: "outlined", children: "Outlined card — no shadow, just border." },
};
