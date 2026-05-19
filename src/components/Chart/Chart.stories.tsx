import type { Meta, StoryObj } from "@storybook/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "./Chart";

const chartConfig: ChartConfig = {
  calories: { label: "Calories", color: "var(--ck-primary)" },
  protein: { label: "Protein (g)", color: "var(--ck-text-muted)" },
};

const data = [
  { month: "Jan", calories: 420, protein: 28 },
  { month: "Feb", calories: 380, protein: 32 },
  { month: "Mar", calories: 510, protein: 41 },
  { month: "Apr", calories: 460, protein: 36 },
];

const meta: Meta<typeof ChartContainer> = {
  title: "Components/Chart",
  component: ChartContainer,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChartContainer>;

export const Default: Story = {
  render: () => (
    <ChartContainer config={chartConfig} style={{ height: 300, width: "100%" }}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="calories" fill="var(--ck-primary)" radius={4} />
        <Bar dataKey="protein" fill="var(--ck-text-muted)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
};
