import type { Meta, StoryObj } from "@storybook/react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "./Drawer";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <button style={{ padding: "8px 16px", background: "var(--ck-primary)", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
          Open Drawer
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Recipe Details</DrawerTitle>
          <DrawerDescription>View the full details of this recipe.</DrawerDescription>
        </DrawerHeader>
        <div style={{ padding: "16px 24px", color: "var(--ck-text)" }}>
          <p>Pasta Carbonara is a traditional Italian pasta dish from Rome.</p>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <button style={{ padding: "8px 16px", border: "1px solid var(--ck-border)", borderRadius: 6, cursor: "pointer", background: "var(--ck-surface)", color: "var(--ck-text)" }}>
              Close
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <button style={{ padding: "8px 16px", background: "var(--ck-surface)", color: "var(--ck-text)", border: "1px solid var(--ck-border)", borderRadius: 6, cursor: "pointer" }}>
          Open with Actions
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add to Meal Plan</DrawerTitle>
          <DrawerDescription>Select a day to add this recipe to your meal plan.</DrawerDescription>
        </DrawerHeader>
        <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 8 }}>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
            <div key={day} style={{ padding: "10px 14px", border: "1px solid var(--ck-border)", borderRadius: 6, color: "var(--ck-text)", cursor: "pointer" }}>{day}</div>
          ))}
        </div>
        <DrawerFooter>
          <button style={{ padding: "10px 16px", background: "var(--ck-primary)", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
            Confirm
          </button>
          <DrawerClose asChild>
            <button style={{ padding: "10px 16px", border: "1px solid var(--ck-border)", borderRadius: 6, cursor: "pointer", background: "var(--ck-surface)", color: "var(--ck-text)" }}>
              Cancel
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
