import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./Table";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table>;

const rows = [
  { name: "Pasta Carbonara", cuisine: "Italian", time: "30 min", kcal: 520 },
  { name: "Chicken Tikka", cuisine: "Indian", time: "45 min", kcal: 380 },
  { name: "Avocado Toast", cuisine: "Modern", time: "10 min", kcal: 280 },
  { name: "Greek Salad", cuisine: "Greek", time: "15 min", kcal: 220 },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Recent Recipes</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Recipe</TableHead>
          <TableHead>Cuisine</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Calories</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.name}>
            <TableCell style={{ color: "var(--ck-text)" }}>{row.name}</TableCell>
            <TableCell style={{ color: "var(--ck-text-muted)" }}>{row.cuisine}</TableCell>
            <TableCell style={{ color: "var(--ck-text-muted)" }}>{row.time}</TableCell>
            <TableCell style={{ color: "var(--ck-text-muted)" }}>{row.kcal}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Recipe</TableHead>
          <TableHead>Cuisine</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Calories</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.name}>
            <TableCell style={{ color: "var(--ck-text)" }}>{row.name}</TableCell>
            <TableCell style={{ color: "var(--ck-text-muted)" }}>{row.cuisine}</TableCell>
            <TableCell style={{ color: "var(--ck-text-muted)" }}>{row.time}</TableCell>
            <TableCell style={{ color: "var(--ck-text-muted)" }}>{row.kcal}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} style={{ fontWeight: 600, color: "var(--ck-heading)" }}>Total</TableCell>
          <TableCell style={{ fontWeight: 600, color: "var(--ck-heading)" }}>{rows.reduce((s, r) => s + r.kcal, 0)} kcal</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const Striped: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Recipe</TableHead>
          <TableHead>Cuisine</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Calories</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow key={row.name} style={{ background: i % 2 === 0 ? "var(--ck-bg-card)" : "transparent" }}>
            <TableCell style={{ color: "var(--ck-text)" }}>{row.name}</TableCell>
            <TableCell style={{ color: "var(--ck-text-muted)" }}>{row.cuisine}</TableCell>
            <TableCell style={{ color: "var(--ck-text-muted)" }}>{row.time}</TableCell>
            <TableCell style={{ color: "var(--ck-text-muted)" }}>{row.kcal}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
