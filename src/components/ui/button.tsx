import "./button.css";
import type { ComponentProps } from "react";
import { Slot } from "radix-ui";
import type { ButtonSize, ButtonVariant } from "./button-variants";
import { buttonVariants } from "./button-variants";
import { cx } from "@/lib/utils";

export { buttonVariants } from "./button-variants";

type ButtonStyleProps = {
  /** Visual intent. The default variant is the view's one green signal. */
  variant?: ButtonVariant;
  /** Control size. Default "md". */
  size?: ButtonSize;
};

/** Native `<button>` rendering. */
export type ButtonElementProps = ComponentProps<"button"> &
  ButtonStyleProps & {
    asChild?: false;
    /** Pending state: non-interactive, width-preserving, aria-busy. */
    loading?: boolean;
  };

/** Slot rendering: the button classes are merged onto the single child
 * element (typically an `<a>`), which keeps its own semantics. */
export type ButtonAsChildProps = Omit<ComponentProps<"button">, "type" | "disabled"> &
  ButtonStyleProps & {
    asChild: true;
    loading?: never;
  };

export type ButtonProps = ButtonElementProps | ButtonAsChildProps;

export function Button(props: ButtonProps) {
  if (props.asChild) {
    const { asChild: _asChild, variant, size, className, ...rest } = props;
    return <Slot.Root {...rest} className={cx(buttonVariants({ variant, size }), className)} />;
  }
  const {
    asChild: _asChild,
    variant,
    size,
    loading = false,
    disabled = false,
    type,
    className,
    children,
    ...rest
  } = props;
  return (
    <button
      {...rest}
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
