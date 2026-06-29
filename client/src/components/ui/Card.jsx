import { cn } from '@/lib/utils';

/**
 * Card — clean bordered container
 * Variants: default | raised | ghost
 * Use CardHeader, CardBody, CardFooter for structured content.
 */
const variantClasses = {
  default:
    'bg-card border border-border rounded-xl',
  raised:
    'bg-surface border border-border rounded-xl shadow-md',
  ghost:
    'bg-transparent border border-border-subtle rounded-xl',
  interactive:
    'bg-card border border-border rounded-xl cursor-pointer ' +
    'hover:border-[var(--foreground-muted)] hover:bg-surface ' +
    'transition-[border-color,background-color] duration-150',
};

export function Card({ variant = 'default', className, children, ...props }) {
  return (
    <div className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn('px-6 pt-6 pb-0', className)} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ className, children, ...props }) {
  return (
    <div className={cn('px-6 py-6', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'px-6 pt-0 pb-6 flex items-center gap-3 border-t border-border mt-0',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
