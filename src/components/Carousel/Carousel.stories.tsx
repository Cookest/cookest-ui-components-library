import type { Meta, StoryObj } from "@storybook/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./Carousel";

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 400, margin: "0 auto" }}>
      <Carousel>
        <CarouselContent>
          {[1, 2, 3].map((n) => (
            <CarouselItem key={n}>
              <div style={{ background: "var(--ck-bg-card)", border: "1px solid var(--ck-border)", borderRadius: 8, height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "var(--ck-heading)", fontSize: 32, fontWeight: 700 }}>Slide {n}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ width: 400, margin: "0 auto" }}>
      <Carousel orientation="vertical">
        <CarouselContent style={{ height: 240 }}>
          {[1, 2, 3].map((n) => (
            <CarouselItem key={n}>
              <div style={{ background: "var(--ck-bg-card)", border: "1px solid var(--ck-border)", borderRadius: 8, height: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "var(--ck-heading)", fontSize: 24, fontWeight: 700 }}>Slide {n}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};
