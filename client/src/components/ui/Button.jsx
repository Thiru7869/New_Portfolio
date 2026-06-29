import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Variants: primary | secondary | ghost | outline | link
 * Sizes:    sm | md | lg
 */
const variantClasses = {
  primary:
    'bg-accent text-white hover:bg-accent-hover border border-transparent ' +
    'shadow-[0_1px_3px_rgb(0,0,0,0.5)] hover:shadow-glow active:scale-[0.98]',
  secondary:
    'bg-card text-foreground border border-border ' +
    'hover:border-[var(--foreground-muted)] hover:bg-surface active:scale-[0.98]',
  ghost:
    'bg-transparent text-foreground-secondary border border-transparent ' +
    'hover:bg-surface hover:text-foreground active:scale-[0.98]',
  outline:
    'bg-transparent text-foreground border border-border ' +
    'hover:border-accent hover:text-accent active:scale-[0.98]',
  link:
    'bg-transparent text-accent border border-transparent underline-offset-4 ' +
    'hover:underline p-0 h-auto',
};

const sizeClasses = {
  sm:  'h-8 px-3 text-xs gap-1.5 rounded-md',
  md:  'h-9 px-4 text-sm gap-2 rounded-md',
  lg:  'h-11 px-6 text-sm gap-2.5 rounded-lg',
  xl:  'h-13 px-8 text-base gap-3 rounded-lg',
};

const Button = forwardRef(function Button(
  {
    variant = 'secondary',
    size = 'md',
    className,
    children,
    disabled,
    loading,
    leftIcon,
    rightIcon,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center font-medium',
        'transition-all duration-150 ease-out',
        'select-none whitespace-nowrap',
        'disabled:opacity-50 disabled:pointer-events-none',
        'focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
        variantClasses[variant],
        sizeClasses[size],
        variant !== 'link' && 'cursor-pointer',
        className
      )}
      {...props}
    >
      {loading ? (
        <Spinner size={size} />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
});

function Spinner({ size }) {
  const s = size === 'sm' ? 12 : size === 'lg' ? 16 : 14;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export { Button };
