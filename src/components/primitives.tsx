import * as React from "react";
import { Link } from "react-router-dom";
import { Mail, Calendar, ListChecks, StickyNote, type LucideIcon } from "lucide-react";
import { Button, EmptyState as DsEmptyState, buttonVariants, buttonSizes } from "@jofrom/design-system/ui";
import { cn } from "@/lib/utils";

/** Shared global tools row — Email · Calendar · Tasks · Notes — rendered
 *  inside every PageHeader so it sits with the page title. Label at lg+,
 *  icon-only below lg. */
function HeadingTools() {
  const items = [
    { label: "Email", Icon: Mail },
    { label: "Calendar", Icon: Calendar },
    { label: "Tasks", Icon: ListChecks },
    { label: "Notes", Icon: StickyNote },
  ] as const;
  return (
    <div className="mt-3 flex flex-wrap items-center gap-1">
      {items.map(({ label, Icon }) => (
        <Button key={label} variant="ghost" size="sm" aria-label={label} title={label}>
          <Icon className="size-4 lg:hidden" />
          <span className="hidden lg:inline">{label}</span>
        </Button>
      ))}
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h1>
          {description && (
            <p className="mt-1 max-w-2xl text-theme-sm text-gray-500 dark:text-gray-400">{description}</p>
          )}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
      <HeadingTools />
    </div>
  );
}

export function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-theme-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

/** Wraps the DS EmptyState but keeps the prototype's `icon: LucideIcon` API. */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <DsEmptyState
      icon={<Icon className="h-8 w-8" aria-hidden />}
      title={title}
      description={description}
      action={action}
    />
  );
}

/** A react-router Link styled as a DS Button (DS Button has no `asChild`). */
export function ButtonLink({
  to,
  variant = "default",
  size = "md",
  className,
  children,
}: {
  to: string;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/15",
        buttonVariants[variant],
        variant !== "link" && buttonSizes[size],
        className
      )}
    >
      {children}
    </Link>
  );
}
