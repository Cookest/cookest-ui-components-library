import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Select } from "./Select";

const cuisineOptions = [
  { value: "portuguese", label: "Portuguese" },
  { value: "italian", label: "Italian" },
  { value: "japanese", label: "Japanese" },
  { value: "mexican", label: "Mexican" },
  { value: "indian", label: "Indian" },
  { value: "french", label: "French" },
];

const meta: Meta<typeof Select> = { title: "Components/Select", component: Select, tags: ["autodocs"] };
export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>();
    return <Select label="Cuisine" options={cuisineOptions} value={value} onChange={setValue} className="w-64" />;
  },
};

export const Searchable: Story = {
  render: () => {
    const [value, setValue] = useState<string>();
    return <Select label="Search Cuisine" options={cuisineOptions} value={value} onChange={setValue} searchable className="w-64" />;
  },
};

export const WithError: Story = {
  render: () => <Select label="Category" options={cuisineOptions} error="Please select a cuisine" className="w-64" />,
};

export const Disabled: Story = {
  render: () => <Select label="Locked" options={cuisineOptions} value="portuguese" disabled className="w-64" />,
};
