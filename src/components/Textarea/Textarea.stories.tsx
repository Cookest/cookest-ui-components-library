import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    inputSize: { control: "select", options: ["sm", "md", "lg"] },
    resize: { control: "select", options: ["none", "vertical", "horizontal", "both"] },
    fullWidth: { control: "boolean" },
    autoResize: { control: "boolean" },
    showCount: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: { label: "Recipe notes", placeholder: "Add any extra notes about this recipe…" },
};

export const WithHelperText: Story = {
  args: {
    label: "Description",
    placeholder: "Describe your recipe...",
    helperText: "A good description helps others discover your recipe.",
  },
};

export const WithError: Story = {
  args: {
    label: "Instructions",
    value: "Too short",
    error: "Instructions must be at least 50 characters.",
  },
};

export const WithCharacterCount: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself...",
    showCount: true,
    maxLength: 200,
  },
};

export const ControlledWithCount: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return (
      <Textarea
        label="Recipe description"
        placeholder="Write a short description..."
        value={val}
        onChange={(e) => setVal(e.target.value)}
        showCount
        maxLength={150}
        inputSize="md"
        style={{ width: 360 }}
      />
    );
  },
};

export const AutoResize: Story = {
  args: {
    label: "Auto-growing notes",
    placeholder: "Start typing — the textarea will grow with your content...",
    autoResize: true,
    resize: "none",
  },
};

export const NoResize: Story = {
  args: {
    label: "Fixed size",
    placeholder: "This textarea cannot be resized.",
    resize: "none",
  },
};

export const Disabled: Story = {
  args: {
    label: "Locked content",
    value: "This content is read only and cannot be edited.",
    disabled: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 360 }}>
      <Textarea label="Small" inputSize="sm" placeholder="Small textarea" />
      <Textarea label="Medium" inputSize="md" placeholder="Medium textarea" />
      <Textarea label="Large" inputSize="lg" placeholder="Large textarea" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <Textarea label="Default" placeholder="Default textarea..." />
      <Textarea
        label="With helper"
        placeholder="Describe your recipe..."
        helperText="Be as descriptive as possible."
      />
      <Textarea
        label="With error"
        value="Bad input"
        error="This field is required."
      />
      <Textarea
        label="With character count"
        placeholder="Up to 100 characters..."
        showCount
        maxLength={100}
      />
      <Textarea
        label="Auto resize"
        placeholder="Grows as you type..."
        autoResize
        resize="none"
      />
    </div>
  ),
};
