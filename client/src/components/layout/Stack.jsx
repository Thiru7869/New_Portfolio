import { cn } from '@/lib/utils';

/**
 * Stack — flexbox layout with direction and gap presets.
 *
 * Usage:
 *   <Stack gap={4}>              ← vertical stack, gap-4
 *   <Stack direction="row" gap={3}>  ← horizontal row, gap-3
 *   <Stack direction="row" align="center" justify="between">
 */
export function Stack({
  children,
  direction = 'col',
  gap = 4,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className,
  ...props
}) {
  const ALIGN = {
    start:   'items-start',
    center:  'items-center',
    end:     'items-end',
    stretch: 'items-stretch',
    baseline:'items-baseline',
  };
  const JUSTIFY = {
    start:   'justify-start',
    center:  'justify-center',
    end:     'justify-end',
    between: 'justify-between',
    around:  'justify-around',
    evenly:  'justify-evenly',
  };

  return (
    <div
      className={cn(
        'flex',
        direction === 'row' ? 'flex-row' : 'flex-col',
        wrap && 'flex-wrap',
        `gap-${gap}`,
        ALIGN[align]   ?? '',
        JUSTIFY[justify] ?? '',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/** Inline — a horizontal flex row (common shorthand) */
export function Inline({ children, gap = 3, align = 'center', className, ...props }) {
  return (
    <Stack direction="row" gap={gap} align={align} wrap className={cn(className)} {...props}>
      {children}
    </Stack>
  );
}
