/**
 * Cookest design system spacing scale.
 *
 * Based on a 4px grid with semantic aliases for common use cases.
 */

export const spacing = {
  px: "1px",
  0: "0",
  0.5: "0.125rem",  // 2px
  1: "0.25rem",     // 4px
  1.5: "0.375rem",  // 6px
  2: "0.5rem",      // 8px
  2.5: "0.625rem",  // 10px
  3: "0.75rem",     // 12px
  3.5: "0.875rem",  // 14px
  4: "1rem",        // 16px
  5: "1.25rem",     // 20px
  6: "1.5rem",      // 24px
  7: "1.75rem",     // 28px
  8: "2rem",        // 32px
  9: "2.25rem",     // 36px
  10: "2.5rem",     // 40px
  11: "2.75rem",    // 44px
  12: "3rem",       // 48px
  14: "3.5rem",     // 56px
  16: "4rem",       // 64px
  20: "5rem",       // 80px
  24: "6rem",       // 96px
  28: "7rem",       // 112px
  32: "8rem",       // 128px
} as const;

/** Semantic spacing aliases for consistent component padding/margins. */
export const componentSpacing = {
  xs: spacing[1],     // 4px  — tight elements (badge padding)
  sm: spacing[2],     // 8px  — compact inputs, small gaps
  md: spacing[3],     // 12px — default component padding
  lg: spacing[4],     // 16px — spacious padding
  xl: spacing[6],     // 24px — card padding, section gaps
  "2xl": spacing[8],  // 32px — large section spacing
  "3xl": spacing[12], // 48px — page-level spacing
} as const;

export type SpacingToken = typeof spacing;
export type ComponentSpacingToken = typeof componentSpacing;
