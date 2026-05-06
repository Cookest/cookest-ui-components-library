import type { Preview } from "@storybook/react";
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#F5F5F0" },
        { name: "dark", value: "#0E1512" },
        { name: "white", value: "#FFFFFF" },
      ],
    },
    layout: "centered",
  },
  decorators: [
    (Story, context) => {
      const bg = context.globals.backgrounds?.value;
      const isDark = bg === "#0E1512";
      return (
        <div className={isDark ? "dark" : ""}>
          <div
            style={{
              padding: "2rem",
              background: isDark ? "#0E1512" : "#F5F5F0",
              minHeight: "100vh",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <Story />
          </div>
        </div>
      );
    },
  ],
};

export default preview;
