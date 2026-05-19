import type { Meta, StoryObj } from "@storybook/react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarRail,
} from "./Sidebar";

const meta: Meta = {
  title: "Components/Sidebar",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <div style={{ display: "flex", height: 400, width: "100%", border: "1px solid var(--ck-border)", borderRadius: 8, overflow: "hidden" }}>
        <Sidebar>
          <SidebarHeader>
            <div style={{ padding: "12px 16px", fontWeight: 700, color: "var(--ck-heading)" }}>Cookest</div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {["Home", "Recipes", "Meal Planner", "Pantry", "Shopping List"].map((item) => (
                <SidebarMenuItem key={item}>
                  <SidebarMenuButton>{item}</SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div style={{ padding: "12px 16px", fontSize: 13, color: "var(--ck-text-muted)" }}>v1.0.0</div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <div style={{ flex: 1, padding: 24 }}>
          <SidebarTrigger />
          <p style={{ marginTop: 12, color: "var(--ck-text)" }}>Main content area</p>
        </div>
      </div>
    </SidebarProvider>
  ),
};
