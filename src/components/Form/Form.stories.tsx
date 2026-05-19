import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./Form";
import { Input } from "../Input";

const meta: Meta = {
  title: "Components/Form",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const form = useForm({ defaultValues: { email: "", password: "" } });
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormDescription>We'll never share your email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button type="submit" style={{ padding: "10px 16px", background: "var(--ck-primary)", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
            Sign In
          </button>
        </form>
      </Form>
    );
  },
};
