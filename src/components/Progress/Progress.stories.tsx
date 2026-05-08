import type { Meta, StoryObj } from "@storybook/react";
import { useState, useEffect } from "react";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Progress label="Upload progress" value={65} showValue />
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Progress label="Loading…" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ width: 360, display: "flex", flexDirection: "column", gap: 20 }}>
      <Progress label="Extra small" value={40} size="xs" />
      <Progress label="Small" value={55} size="sm" />
      <Progress label="Medium" value={65} size="md" />
      <Progress label="Large" value={80} size="lg" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ width: 360, display: "flex", flexDirection: "column", gap: 20 }}>
      <Progress label="Primary" value={60} color="primary" showValue />
      <Progress label="Success" value={75} color="success" showValue />
      <Progress label="Warning" value={50} color="warning" showValue />
      <Progress label="Error" value={30} color="error" showValue />
    </div>
  ),
};

export const Striped: Story = {
  render: () => (
    <div style={{ width: 360, display: "flex", flexDirection: "column", gap: 20 }}>
      <Progress label="Striped primary" value={70} striped />
      <Progress label="Striped success" value={50} color="success" striped />
    </div>
  ),
};

export const AnimatedGlow: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Progress label="Syncing" value={45} animated color="primary" />
    </div>
  ),
};

export const StripedAndAnimated: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Progress label="Processing" value={60} striped animated color="success" size="lg" />
    </div>
  ),
};

export const LiveProgress: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setValue((v) => (v >= 100 ? 0 : v + 5));
      }, 300);
      return () => clearInterval(interval);
    }, []);
    return (
      <div style={{ width: 360 }}>
        <Progress label="Uploading file…" value={value} showValue color="primary" size="md" />
      </div>
    );
  },
};

export const NotRounded: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Progress label="Square ends" value={55} rounded={false} size="lg" />
    </div>
  ),
};
