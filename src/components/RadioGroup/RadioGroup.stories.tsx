import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";
import { Label } from "../Label";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="medium">
      <RadioGroupItem value="small" />
      <RadioGroupItem value="medium" />
      <RadioGroupItem value="large" />
    </RadioGroup>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <RadioGroup defaultValue="medium" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {["Small", "Medium", "Large"].map((size) => (
        <div key={size} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <RadioGroupItem value={size.toLowerCase()} id={`size-${size.toLowerCase()}`} />
          <Label htmlFor={`size-${size.toLowerCase()}`}>{size}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="medium" disabled style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {["Small", "Medium", "Large"].map((size) => (
        <div key={size} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <RadioGroupItem value={size.toLowerCase()} id={`disabled-${size.toLowerCase()}`} />
          <Label htmlFor={`disabled-${size.toLowerCase()}`}>{size}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};
