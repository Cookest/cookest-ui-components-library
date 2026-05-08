import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["underline", "pills", "boxed"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    fullWidth: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const sampleItems = [
  {
    id: "overview",
    label: "Overview",
    content: (
      <p style={{ color: "var(--ck-text)" }}>
        This is the overview tab content. It shows a summary of the recipe including key details.
      </p>
    ),
  },
  {
    id: "ingredients",
    label: "Ingredients",
    badge: 12,
    content: (
      <ul style={{ color: "var(--ck-text)", paddingLeft: 16 }}>
        <li>2 cups flour</li>
        <li>1 cup sugar</li>
        <li>3 eggs</li>
      </ul>
    ),
  },
  {
    id: "steps",
    label: "Steps",
    content: (
      <ol style={{ color: "var(--ck-text)", paddingLeft: 16 }}>
        <li>Preheat oven to 180°C</li>
        <li>Mix dry ingredients</li>
        <li>Add wet ingredients and stir</li>
      </ol>
    ),
  },
  {
    id: "notes",
    label: "Notes",
    disabled: true,
    content: <p>Disabled tab</p>,
  },
];

export const Default: Story = {
  args: { items: sampleItems, variant: "underline", size: "md" },
};

export const Pills: Story = {
  args: { items: sampleItems, variant: "pills", size: "md" },
};

export const Boxed: Story = {
  args: { items: sampleItems, variant: "boxed", size: "md" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 40, maxWidth: 600 }}>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600, color: "var(--ck-heading)" }}>Underline</p>
        <Tabs items={sampleItems} variant="underline" />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600, color: "var(--ck-heading)" }}>Pills</p>
        <Tabs items={sampleItems} variant="pills" />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600, color: "var(--ck-heading)" }}>Boxed</p>
        <Tabs items={sampleItems} variant="boxed" />
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 600 }}>
      {(["sm", "md", "lg"] as const).map((s) => (
        <div key={s}>
          <p style={{ marginBottom: 8, fontWeight: 600, color: "var(--ck-heading)" }}>
            Size: {s}
          </p>
          <Tabs items={sampleItems.slice(0, 3)} variant="underline" size={s} />
        </div>
      ))}
    </div>
  ),
};

export const FullWidth: Story = {
  args: { items: sampleItems.slice(0, 3), variant: "pills", fullWidth: true },
};

export const WithIcons: Story = {
  args: {
    variant: "underline",
    items: [
      {
        id: "home",
        label: "Home",
        icon: (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1L1 8h2v6h4v-4h2v4h4V8h2L8 1z" />
          </svg>
        ),
        content: <p style={{ color: "var(--ck-text)" }}>Home content</p>,
      },
      {
        id: "settings",
        label: "Settings",
        icon: (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 10a2 2 0 100-4 2 2 0 000 4z" />
            <path d="M13.3 8c0-.2 0-.4-.1-.6l1.4-1.1-1.4-2.4-1.7.7c-.3-.2-.7-.4-1-.5L10.2 2H7.8l-.3 2.1c-.4.1-.7.3-1 .5l-1.7-.7-1.4 2.4L4.8 7.4c0 .2-.1.4-.1.6s0 .4.1.6L3.4 9.7l1.4 2.4 1.7-.7c.3.2.7.4 1 .5l.3 2.1h2.4l.3-2.1c.4-.1.7-.3 1-.5l1.7.7 1.4-2.4-1.4-1.1c.1-.2.1-.4.1-.6z" />
          </svg>
        ),
        content: <p style={{ color: "var(--ck-text)" }}>Settings content</p>,
      },
    ],
  },
};
