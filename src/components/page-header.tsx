import "./page-header.css";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "@/lib/utils";

/** Outline level emitted by the heading parts. */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type PageHeaderProps = ComponentProps<"header">;

/** Page-title area. Renders a real `header` element — no landmark ARIA. */
export function PageHeader({ className, ...props }: PageHeaderProps) {
  return <header {...props} className={cx("aug-page-header", className)} />;
}

export type PageHeaderBreadcrumbProps = Omit<ComponentProps<"nav">, "aria-label"> & {
  /**
   * Required accessible name for the nav landmark (e.g. "Breadcrumb").
   * Naming the wayfinding region is the consumer's product decision.
   */
  "aria-label": string;
};

/**
 * Wayfinding slot (breadcrumbs). Wrap the consumer-rendered list; a
 * single back affordance does not need this nav — place a quiet Button
 * directly inside `PageHeader` instead.
 */
export function PageHeaderBreadcrumb({ className, ...props }: PageHeaderBreadcrumbProps) {
  return (
    <nav
      {...props}
      className={cx("aug-page-header-breadcrumb", "augur-type-ui", className)}
    />
  );
}

export type PageHeaderContentProps = ComponentProps<"div">;

/** Title area row: titles and description in the first column, actions on the right. */
export function PageHeaderContent({ className, ...props }: PageHeaderContentProps) {
  return <div {...props} className={cx("aug-page-header-content", className)} />;
}

export type PageHeaderTitleProps = Omit<ComponentProps<"h1">, "children"> & {
  /**
   * Document outline level. The default, `1`, is correct when the header
   * titles the page; pass the level the surrounding outline requires.
   */
  headingLevel?: HeadingLevel;
  children?: ReactNode;
};

/** Page title. Real heading semantics; consumers own the document outline. */
export function PageHeaderTitle({
  headingLevel = 1,
  className,
  children,
  ...props
}: PageHeaderTitleProps) {
  const Tag = `h${headingLevel}` as const;
  return (
    <Tag {...props} className={cx("aug-page-header-title", "augur-type-heading-1", className)}>
      {children}
    </Tag>
  );
}

export type PageHeaderDescriptionProps = ComponentProps<"p">;

/** Supporting line under the title, in the body voice with the muted pairing. */
export function PageHeaderDescription({ className, children, ...props }: PageHeaderDescriptionProps) {
  return (
    <p
      {...props}
      className={cx("aug-page-header-description", "augur-type-body", className)}
    >
      {children}
    </p>
  );
}

export type PageHeaderActionsProps = ComponentProps<"div">;

/**
 * Actions slot. Layout only: place Buttons inside — one primary action
 * (the default variant, the view's one green signal), quiet variants for
 * the rest.
 */
export function PageHeaderActions({ className, ...props }: PageHeaderActionsProps) {
  return <div {...props} className={cx("aug-page-header-actions", className)} />;
}
