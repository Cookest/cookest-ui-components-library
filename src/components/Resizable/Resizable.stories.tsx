import type { Meta, StoryObj } from "@storybook/react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./Resizable";

const meta: Meta<typeof ResizablePanelGroup> = {
  title: "Components/Resizable",
  component: ResizablePanelGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ResizablePanelGroup>;

export const Default: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" style={{ height: 240, border: "1px solid var(--ck-border)", borderRadius: 8 }}>
      <ResizablePanel defaultSize={25}>
        <div style={{ padding: 16, height: "100%", background: "var(--ck-bg-card)" }}>
          <p style={{ color: "var(--ck-text-muted)", fontSize: 13 }}>Sidebar</p>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75}>
        <div style={{ padding: 16, height: "100%" }}>
          <p style={{ color: "var(--ck-text)" }}>Main Content</p>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup direction="vertical" style={{ height: 320, border: "1px solid var(--ck-border)", borderRadius: 8 }}>
      <ResizablePanel defaultSize={30}>
        <div style={{ padding: 16, background: "var(--ck-bg-card)", height: "100%" }}>
          <p style={{ color: "var(--ck-text-muted)", fontSize: 13 }}>Header</p>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>
        <div style={{ padding: 16, height: "100%" }}>
          <p style={{ color: "var(--ck-text)" }}>Body</p>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const ThreePanel: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" style={{ height: 240, border: "1px solid var(--ck-border)", borderRadius: 8 }}>
      <ResizablePanel defaultSize={20}>
        <div style={{ padding: 16, height: "100%", background: "var(--ck-bg-card)" }}>
          <p style={{ color: "var(--ck-text-muted)", fontSize: 13 }}>Nav</p>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={60}>
        <div style={{ padding: 16, height: "100%" }}>
          <p style={{ color: "var(--ck-text)" }}>Content</p>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={20}>
        <div style={{ padding: 16, height: "100%", background: "var(--ck-bg-card)" }}>
          <p style={{ color: "var(--ck-text-muted)", fontSize: 13 }}>Details</p>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
