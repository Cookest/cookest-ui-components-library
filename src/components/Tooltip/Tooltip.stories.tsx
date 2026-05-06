import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button/Button";

const meta: Meta<typeof Tooltip> = { title: "Components/Tooltip", component: Tooltip, tags: ["autodocs"] };
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {
  render: () => <Tooltip content="Add to favorites"><Button variant="secondary">Hover me</Button></Tooltip>,
};

export const Bottom: Story = {
  render: () => <Tooltip content="Share recipe" position="bottom"><Button variant="ghost">Bottom</Button></Tooltip>,
};

export const Left: Story = {
  render: () => (
    <div style={{ paddingLeft: 120 }}>
      <Tooltip content="Go back" position="left"><Button variant="ghost">Left</Button></Tooltip>
    </div>
  ),
};

export const Right: Story = {
  render: () => <Tooltip content="Next step" position="right"><Button variant="ghost">Right</Button></Tooltip>,
};
