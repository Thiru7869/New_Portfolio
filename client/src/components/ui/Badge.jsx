import { cn } from '@/lib/utils';

/**
 * Variants: default | accent | success | warning | danger | outline
 * Sizes:    sm | md
 */
const variantClasses = {
  default:
    'bg-surface text-foreground-secondary border border-border',
  accent:
    'bg-accent-bg text-accent border border-[rgba(37,99,235,0.2)]',
  success:
    'bg-[rgba(34,197,94,0.08)] text-success border border-[rgba(34,197,94,0.2)]',
  warning:
    'bg-[rgba(245,158,11,0.08)] text-warning border border-[rgba(245,158,11,0.2)]',
  danger:
    'bg-[rgba(239,68,68,0.08)] text-danger border border-[rgba(239,68,68,0.2)]',
  outline:
    'bg-transparent text-foreground border border-border hover:border-foreground-muted',
};

const sizeClasses = {
  sm: 'h-5 px-2 text-[10px] tracking-wide',
  md: 'h-6 px-2.5 text-xs',
};

export function Badge({ variant = 'default', size = 'md', className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
