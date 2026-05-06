/**
 * Cookest design system typography tokens.
 *
 * Playfair Display for headings (serif), Inter for body (sans-serif).
 * Matches the font stack used across web/ and mobile design.
 */

export const fontFamily = {
  serif: "'Playfair Display', Georgia, 'Times New Roman', serif",
  sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace",
} as const;

export const fontSize = {
  xs: ["0.75rem", { lineHeight: "1rem" }],        // 12px
  sm: ["0.875rem", { lineHeight: "1.25rem" }],     // 14px
  base: ["1rem", { lineHeight: "1.5rem" }],        // 16px
  lg: ["1.125rem", { lineHeight: "1.75rem" }],     // 18px
  xl: ["1.25rem", { lineHeight: "1.75rem" }],      // 20px
  "2xl": ["1.5rem", { lineHeight: "2rem" }],       // 24px
  "3xl": ["1.875rem", { lineHeight: "2.25rem" }],  // 30px
  "4xl": ["2.25rem", { lineHeight: "2.5rem" }],    // 36px
  "5xl": ["3rem", { lineHeight: "1" }],            // 48px
} as const;

export const fontWeight = {
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
} as const;

export type FontFamilyToken = typeof fontFamily;
export type FontSizeToken = typeof fontSize;
export type FontWeightToken = typeof fontWeight;
