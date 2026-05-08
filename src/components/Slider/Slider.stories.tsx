import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(40);
    return (
      <div style={{ width: 320 }}>
        <Slider label="Volume" value={value} onChange={setValue} />
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Slider label="Brightness" defaultValue={60} />
    </div>
  ),
};

export const NoValueBadge: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Slider label="Opacity" defaultValue={75} showValue={false} />
    </div>
  ),
};

export const WithMarks: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <div style={{ width: 360 }}>
        <Slider
          label="Temperature"
          value={value}
          onChange={setValue}
          marks={[
            { value: 0, label: "0°" },
            { value: 25, label: "25°" },
            { value: 50, label: "50°" },
            { value: 75, label: "75°" },
            { value: 100, label: "100°" },
          ]}
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 24 }}>
      <Slider label="Small" defaultValue={30} size="sm" />
      <Slider label="Medium" defaultValue={55} size="md" />
      <Slider label="Large" defaultValue={70} size="lg" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 24 }}>
      <Slider label="Primary" defaultValue={40} color="primary" />
      <Slider label="Success" defaultValue={60} color="success" />
      <Slider label="Warning" defaultValue={70} color="warning" />
      <Slider label="Error" defaultValue={80} color="error" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Slider label="Disabled" value={45} disabled />
    </div>
  ),
};

export const CustomRange: Story = {
  render: () => {
    const [value, setValue] = useState(500);
    return (
      <div style={{ width: 320 }}>
        <Slider
          label="Price range"
          value={value}
          onChange={setValue}
          min={100}
          max={1000}
          step={50}
          marks={[
            { value: 100, label: "$100" },
            { value: 550, label: "$550" },
            { value: 1000, label: "$1000" },
          ]}
        />
      </div>
    );
  },
};
