import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: "md",
    color: "primary",
    label: "Loading…",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <Spinner color="primary" size="lg" label="Primary" />
      <span
        style={{
          display: "inline-flex",
          background: "var(--ck-primary)",
          padding: 8,
          borderRadius: 8,
        }}
      >
        <Spinner color="white" size="lg" label="White" />
      </span>
      <span style={{ color: "#f59e0b" }}>
        <Spinner color="current" size="lg" label="Current color" />
      </span>
    </div>
  ),
};

export const InButton: Story = {
  render: () => (
    <button
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "var(--ck-primary)",
        color: "#fff",
        border: "none",
        borderRadius: 10,
        padding: "10px 20px",
        fontWeight: 600,
        cursor: "not-allowed",
        opacity: 0.85,
      }}
      disabled
    >
      <Spinner size="sm" color="white" label="Saving" />
      Saving…
    </button>
  ),
};

export const CustomLabel: Story = {
  args: {
    size: "lg",
    color: "primary",
    label: "Fetching recipes…",
  },
};
