import "./button.css";
import type { ComponentProps } from "react";
import type { ButtonSize, ButtonVariant } from "./button-variants";
import { buttonVariants } from "./button-variants";
import { cx } from "@/lib/utils";

export { buttonVariants } from "./button-variants";

export type ButtonProps = ComponentProps<"button"> & {
  /** Visual intent. The default variant is the view's one green signal. */
  variant?: ButtonVariant;
  /** Control size. Default "md". */
  size?: ButtonSize;
  /** Pending state: non-interactive, width-preserving, aria-busy. */
  loading?: boolean;
};

export function Button({
  variant,
  size,
  loading = false,
  disabled = false,
  type,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type ?? "button"}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(buttonVariants({ variant, size }), className)}
    >
      <span className="aug-button-label" aria-hidden={loading || undefined}>
        {children}
      </span>
      {loading ? (
        <span className="aug-button-spinner" aria-hidden="true">
          <svg
            className="aug-button-spinner-icon"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <circle
              cx="8"
              cy="8"
              r="6.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="29 12"
            />
          </svg>
        </span>
      ) : null}
      {loading ? <span className="aug-button-visually-hidden">Loading</span> : null}
    </button>
  );
}
