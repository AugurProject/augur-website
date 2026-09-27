import "./empty-state.css";
import type { ComponentProps, ReactNode } from "react";
import type { HeadingLevel } from "@/components/page-header";
import { cx } from "@/lib/utils";

export type EmptyStateProps = ComponentProps<"div">;

/** Empty-state region. Plain `div`, centered column, no landmark role. */
export function EmptyState({ className, ...props }: EmptyStateProps) {
  return <div {...props} className={cx("aug-empty-state", className)} />;
}

export type EmptyStateIconProps = ComponentProps<"div">;

/** Decorative icon/glyph slot. Pass `aria-hidden` on the glyph itself. */
export function EmptyStateIcon({ className, ...props }: EmptyStateIconProps) {
  return <div {...props} className={cx("aug-empty-state-icon", className)} />;
}

export type EmptyStateTitleProps = Omit<ComponentProps<"h2">, "children"> & {
  /** Document outline level; default `2` sits under the page title. */
  headingLevel?: HeadingLevel;
  children?: ReactNode;
};

/** Empty-state title. Real heading semantics; consumers own the outline. */
export function EmptyStateTitle({
  headingLevel = 2,
  className,
  children,
  ...props
}: EmptyStateTitleProps) {
  const Tag = `h${headingLevel}` as const;
  return (
    <Tag {...props} className={cx("aug-empty-state-title", "augur-type-heading-2", className)}>
      {children}
    </Tag>
  );
}

export type EmptyStateDescriptionProps = ComponentProps<"p">;

/** Supporting line in the body voice with the muted pairing. */
export function EmptyStateDescription({ className, children, ...props }: EmptyStateDescriptionProps) {
  return (
    <p
      {...props}
      className={cx("aug-empty-state-description", "augur-type-body", className)}
    >
      {children}
    </p>
  );
}

export type EmptyStateActionsProps = ComponentProps<"div">;

/**
 * Actions slot. Layout only: one primary Button (the one green signal)
 * and at most a quiet secondary action.
 */
export function EmptyStateActions({ className, ...props }: EmptyStateActionsProps) {
  return <div {...props} className={cx("aug-empty-state-actions", className)} />;
}
