import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { children: "Default" } };
export const Success: Story = { args: { variant: "success", children: "Active" } };
export const Warning: Story = { args: { variant: "warning", children: "Expiring" } };
export const Error: Story = { args: { variant: "error", children: "Expired" } };
export const Info: Story = { args: { variant: "info", children: "New" } };
export const WithDot: Story = { args: { variant: "success", dot: true, children: "Online" } };
export const Removable: Story = { args: { removable: true, children: "Gluten-free" } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Badge>Default</Badge>
      <Badge variant="success" dot>Active</Badge>
      <Badge variant="warning" dot>Expiring</Badge>
      <Badge variant="error" dot>Expired</Badge>
      <Badge variant="info" dot>New</Badge>
      <Badge removable>Removable</Badge>
    </div>
  ),
};
