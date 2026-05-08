import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "bordered", "separated"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    multiple: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const faqItems = [
  {
    id: "q1",
    title: "What ingredients are gluten-free?",
    subtitle: "Dietary information",
    content: (
      <p>
        Rice flour, almond flour, tapioca starch, and arrowroot are all naturally gluten-free
        alternatives that work well in our recipes.
      </p>
    ),
  },
  {
    id: "q2",
    title: "How long does prep take?",
    content: (
      <p>
        Most of our recipes take between 15–30 minutes of prep time. The recipe card always shows
        the estimated time at the top.
      </p>
    ),
  },
  {
    id: "q3",
    title: "Can I substitute dairy?",
    subtitle: "Vegan options",
    content: (
      <p>
        Yes! You can use oat milk, almond milk, or coconut cream in place of dairy. Results may
        vary slightly in texture.
      </p>
    ),
  },
  {
    id: "q4",
    title: "Is this feature available?",
    disabled: true,
    content: <p>This item is disabled.</p>,
  },
];

export const Default: Story = {
  args: { items: faqItems, variant: "default" },
};

export const Bordered: Story = {
  args: { items: faqItems, variant: "bordered" },
};

export const Separated: Story = {
  args: { items: faqItems, variant: "separated" },
};

export const MultipleOpen: Story = {
  args: { items: faqItems, variant: "default", multiple: true, defaultOpen: ["q1", "q2"] },
};

export const WithIcons: Story = {
  args: {
    variant: "separated",
    items: faqItems.slice(0, 3).map((item) => ({
      ...item,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a1 1 0 110 2 1 1 0 010-2zm1 7H7v-4h2v4z" />
        </svg>
      ),
    })),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 40, maxWidth: 600 }}>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600, color: "var(--ck-heading)" }}>Default</p>
        <Accordion items={faqItems.slice(0, 3)} variant="default" defaultOpen="q1" />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600, color: "var(--ck-heading)" }}>Bordered</p>
        <Accordion items={faqItems.slice(0, 3)} variant="bordered" defaultOpen="q1" />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontWeight: 600, color: "var(--ck-heading)" }}>Separated</p>
        <Accordion items={faqItems.slice(0, 3)} variant="separated" defaultOpen="q1" />
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
          <Accordion items={faqItems.slice(0, 2)} variant="bordered" size={s} defaultOpen="q1" />
        </div>
      ))}
    </div>
  ),
};
