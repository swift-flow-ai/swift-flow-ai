/**
 * Design System
 *
 * Centralized design system exports.
 * Import components and tokens from here for consistency.
 */

// Design Tokens
export * from "./tokens";

// Design System Components
export * from "./components";

// Re-export common components for convenience
export { default as Button } from "../components/common/Button";
export { default as Card } from "../components/common/Card";
export { Badge } from "../components/common/Badge";
export { Avatar } from "../components/common/Avatar";
export { default as Input } from "../components/common/Input";
export { LoadingSpinner } from "../components/common/LoadingSpinner";
// Note: EmptyState is exported from design-system/components, not common
