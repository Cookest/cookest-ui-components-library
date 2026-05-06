import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    inputSize: { control: "select", options: ["sm", "md", "lg"] },
    fullWidth: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { label: "Email", placeholder: "you@example.com", type: "email" },
};

export const WithHelperText: Story = {
  args: { label: "Password", type: "password", helperText: "Must be at least 8 characters" },
};

export const WithError: Story = {
  args: { label: "Email", value: "invalid", error: "Please enter a valid email address" },
};

export const WithIcons: Story = {
  args: {
    label: "Search",
    placeholder: "Search recipes...",
    iconLeft: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
      </svg>
    ),
  },
};

export const Disabled: Story = {
  args: { label: "Name", value: "Read only", disabled: true },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
      <Input label="Small" inputSize="sm" placeholder="Small input" />
      <Input label="Medium" inputSize="md" placeholder="Medium input" />
      <Input label="Large" inputSize="lg" placeholder="Large input" />
    </div>
  ),
};
