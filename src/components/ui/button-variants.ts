import "./button.css";

/** Visual intent of the button. shadcn-compatible set, Augur-owned. */
export type ButtonVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "link";

/** Control size. */
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonVariantsProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  default: "aug-button--default",
  secondary: "aug-button--secondary",
  destructive: "aug-button--destructive",
  outline: "aug-button--outline",
  ghost: "aug-button--ghost",
  link: "aug-button--link",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "aug-button--sm",
  md: "aug-button--md",
  lg: "aug-button--lg",
};

/** Full class string for the given variant and size (defaults: md). */
export function buttonVariants(props: ButtonVariantsProps = {}): string {
  const variant = props.variant ?? "default";
  const size = props.size ?? "md";
  return `aug-button augur-type-control ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]}`;
}
