import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = { title: "Components/Divider", component: Divider, tags: ["autodocs"] };
export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {};
export const WithLabel: Story = { args: { label: "or" } };
export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", height: 40, gap: 8 }}>
      <span>Left</span>
      <Divider orientation="vertical" />
      <span>Right</span>
    </div>
  ),
};
