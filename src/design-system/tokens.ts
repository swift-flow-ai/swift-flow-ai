/**
 * Design System Tokens
 *
 * Centralized design tokens for consistent styling across the application.
 * All spacing, colors, typography, and other design values should reference these tokens.
 */

// Spacing Scale (based on 4px base unit)
export const spacing = {
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "0.75rem", // 12px
  base: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "2.5rem", // 40px
  "3xl": "3rem", // 48px
  "4xl": "4rem", // 64px
} as const;

// Border Radius
export const borderRadius = {
  none: "0",
  sm: "0.25rem", // 4px
  md: "0.375rem", // 6px
  base: "0.5rem", // 8px
  lg: "0.75rem", // 12px
  xl: "1rem", // 16px
  "2xl": "1.5rem", // 24px
  full: "9999px",
} as const;

// Typography Scale
export const typography = {
  fontFamily: {
    sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
    mono: ["Monaco", "Menlo", "monospace"],
  },
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeight: {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.75",
  },
} as const;

// Shadows
export const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  none: "none",
} as const;

// Transitions
export const transitions = {
  fast: "150ms",
  base: "200ms",
  slow: "300ms",
  slower: "500ms",
} as const;

// Z-Index Scale
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

// Component-specific sizes
export const componentSizes = {
  button: {
    sm: { px: spacing.sm, py: spacing.xs, text: typography.fontSize.sm },
    md: { px: spacing.base, py: spacing.sm, text: typography.fontSize.base },
    lg: { px: spacing.lg, py: spacing.md, text: typography.fontSize.lg },
  },
  input: {
    sm: { px: spacing.sm, py: spacing.xs, text: typography.fontSize.sm },
    md: { px: spacing.base, py: spacing.sm, text: typography.fontSize.base },
    lg: { px: spacing.lg, py: spacing.md, text: typography.fontSize.lg },
  },
  avatar: {
    xs: "1rem", // 16px
    sm: "2rem", // 32px
    md: "2.5rem", // 40px
    lg: "3rem", // 48px
    xl: "4rem", // 64px
  },
  icon: {
    xs: "0.75rem", // 12px
    sm: "1rem", // 16px
    md: "1.25rem", // 20px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
  },
} as const;

// Breakpoints (for reference - use Tailwind's responsive classes)
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;
