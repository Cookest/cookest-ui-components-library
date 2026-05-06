/**
 * Cookest design system color tokens.
 *
 * Light and dark mode palettes derived from the brand sage green (#7A9A65).
 * CSS custom properties are used at runtime; these constants enable
 * type-safe access to the same values in TypeScript.
 */

export const colors = {
  primary: {
    DEFAULT: "#7A9A65",
    light: "#B4CC9E",
    dark: "#4E7A3A",
    50: "#F0F5EC",
    100: "#E1EBDA",
    200: "#C3D7B5",
    300: "#A5C390",
    400: "#8FB07A",
    500: "#7A9A65",
    600: "#628050",
    700: "#4E7A3A",
    800: "#3A5C2C",
    900: "#263D1D",
    950: "#1A2B14",
  },

  background: {
    light: "#F5F5F0",
    dark: "#0E1512",
  },

  card: {
    light: "#FAFAF6",
    dark: "#172019",
  },

  heading: {
    light: "#1C3A2A",
    dark: "#E0EDE4",
  },

  text: {
    light: "#3D5040",
    dark: "#B0C8B5",
  },

  muted: {
    light: "#7A8E74",
    dark: "#6A8A70",
  },

  border: {
    light: "#E4EBE0",
    dark: "#253D2E",
  },

  surface: {
    light: "#FFFFFF",
    dark: "#1A261E",
  },

  surfaceMuted: {
    light: "rgba(245, 245, 240, 0.95)",
    dark: "rgba(14, 21, 18, 0.95)",
  },

  sectionDark: {
    light: "#1C3A2A",
    dark: "#0F1A14",
  },

  status: {
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#F44336",
    info: "#2196F3",
  },

  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",
} as const;

export type ColorToken = typeof colors;
