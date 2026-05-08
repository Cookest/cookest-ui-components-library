import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = { args: { variant: "info", title: "Tip", children: "You can customize your meal plan from the settings page." } };
export const Success: Story = { args: { variant: "success", title: "Saved", children: "Your recipe has been added to the collection." } };
export const Warning: Story = { args: { variant: "warning", title: "Expiring soon", children: "3 items in your pantry expire this week." } };
export const Error: Story = { args: { variant: "error", title: "Error", children: "Failed to save meal plan. Please try again." } };
export const Dismissible: Story = { args: { variant: "info", title: "Notice", children: "This alert can be dismissed.", dismissible: true } };
export const Small: Story = { args: { variant: "success", size: "sm", title: "Saved", children: "Compact size alert." } };
export const Large: Story = { args: { variant: "warning", size: "lg", title: "Warning", children: "Large size alert with more breathing room." } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 500 }}>
      <Alert variant="info" title="Info">Informational message about your meal plan.</Alert>
      <Alert variant="success" title="Success">Recipe saved to your collection.</Alert>
      <Alert variant="warning" title="Warning">3 pantry items expire this week.</Alert>
      <Alert variant="error" title="Error">Failed to sync. Check your connection.</Alert>
    </div>
  ),
};
