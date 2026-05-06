import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Toggle label="Dark mode" checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
};

export const WithDescription: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <Toggle
        label="Email notifications"
        description="Receive weekly meal plan summaries"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};

export const Disabled: Story = {
  args: { label: "Premium feature", disabled: true, checked: false },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Toggle label="Small" toggleSize="sm" checked />
      <Toggle label="Medium" toggleSize="md" checked />
      <Toggle label="Large" toggleSize="lg" checked />
    </div>
  ),
};
