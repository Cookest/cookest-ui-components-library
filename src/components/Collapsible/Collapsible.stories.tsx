import type { Meta, StoryObj } from "@storybook/react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./Collapsible";

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <Collapsible style={{ width: 360 }}>
      <CollapsibleTrigger asChild>
        <button style={{ width: "100%", padding: "8px 12px", background: "var(--ck-bg-card)", border: "1px solid var(--ck-border)", borderRadius: 6, cursor: "pointer", color: "var(--ck-text)", textAlign: "left" }}>
          Show ingredients ▾
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul style={{ padding: "12px 16px", color: "var(--ck-text)", background: "var(--ck-surface)", borderRadius: "0 0 6px 6px", border: "1px solid var(--ck-border)", borderTop: "none" }}>
          <li>2 cups flour</li>
          <li>1 cup sugar</li>
          <li>3 eggs</li>
        </ul>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Open: Story = {
  render: () => (
    <Collapsible defaultOpen style={{ width: 360 }}>
      <CollapsibleTrigger asChild>
        <button style={{ width: "100%", padding: "8px 12px", background: "var(--ck-bg-card)", border: "1px solid var(--ck-border)", borderRadius: 6, cursor: "pointer", color: "var(--ck-text)", textAlign: "left" }}>
          Hide ingredients ▴
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul style={{ padding: "12px 16px", color: "var(--ck-text)", background: "var(--ck-surface)", borderRadius: "0 0 6px 6px", border: "1px solid var(--ck-border)", borderTop: "none" }}>
          <li>2 cups flour</li>
          <li>1 cup sugar</li>
          <li>3 eggs</li>
        </ul>
      </CollapsibleContent>
    </Collapsible>
  ),
};
