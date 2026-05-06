import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarGroup } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithInitials: Story = { args: { alt: "Maria Santos", size: "lg" } };
export const Small: Story = { args: { alt: "João", size: "sm" } };
export const ExtraLarge: Story = { args: { alt: "Chef Cook", size: "xl" } };

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar alt="Ana B" size="xs" />
      <Avatar alt="Ana B" size="sm" />
      <Avatar alt="Ana B" size="md" />
      <Avatar alt="Ana B" size="lg" />
      <Avatar alt="Ana B" size="xl" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup max={3}>
      <Avatar alt="Maria" />
      <Avatar alt="João" />
      <Avatar alt="Ana" />
      <Avatar alt="Pedro" />
      <Avatar alt="Sara" />
    </AvatarGroup>
  ),
};
