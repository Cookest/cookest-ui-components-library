import type { Meta, StoryObj } from "@storybook/react";
import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
} from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Toast open>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <ToastTitle>Recipe Saved</ToastTitle>
          <ToastDescription>Your recipe has been saved successfully.</ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};

export const Destructive: Story = {
  render: () => (
    <ToastProvider>
      <Toast open variant="destructive">
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <ToastTitle>Error</ToastTitle>
          <ToastDescription>Failed to save your recipe. Please try again.</ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};

export const WithAction: Story = {
  render: () => (
    <ToastProvider>
      <Toast open>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <ToastTitle>Recipe Deleted</ToastTitle>
          <ToastDescription>The recipe has been removed from your collection.</ToastDescription>
        </div>
        <ToastAction altText="Undo deletion">Undo</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};
