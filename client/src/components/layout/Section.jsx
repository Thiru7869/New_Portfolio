import { cn } from '@/lib/utils';

/**
 * Section — consistent vertical rhythm and container for every portfolio section.
 * Handles: id, aria-label, padding, max-width container.
 */
export function Section({ id, label, className, children, tight = false, ...props }) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn(
        'relative w-full',
        tight ? 'py-16 md:py-20' : 'py-24 md:py-32',
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">{children}</div>
    </section>
  );
}

/**
 * SectionLabel — small eyebrow text above section headings.
 * e.g. "Featured Work" above "Projects"
 */
export function SectionLabel({ children, className }) {
  return (
    <p
      className={cn(
        'mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent',
        className
      )}
    >
      {children}
    </p>
  );
}

/**
 * SectionHeading — the primary h2 for a section.
 */
export function SectionHeading({ children, className }) {
  return (
    <h2
      className={cn(
        'text-3xl font-semibold tracking-tight text-foreground sm:text-4xl',
        className
      )}
    >
      {children}
    </h2>
  );
}

/**
 * SectionSubheading — optional supporting text under the heading.
 */
export function SectionSubheading({ children, className }) {
  return (
    <p className={cn('mt-4 max-w-2xl text-base text-foreground-secondary', className)}>
      {children}
    </p>
  );
}
