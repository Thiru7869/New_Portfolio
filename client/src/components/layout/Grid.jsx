import { cn } from '@/lib/utils';

/**
 * Grid — responsive CSS grid with semantic column presets.
 * Breakpoint behaviour mirrors the portfolio's responsive design:
 *   cols=1 → always 1 column
 *   cols=2 → 1 on mobile, 2 on sm+
 *   cols=3 → 1 on mobile, 2 on sm, 3 on lg
 *   cols=4 → 1 on mobile, 2 on sm, 4 on lg
 *   cols=auto → auto-fill with minmax(280px, 1fr)
 *
 * Usage:
 *   <Grid cols={3} gap={6}>
 *     <Card />
 *     <Card />
 *   </Grid>
 */
const COLS = {
  1:    'grid-cols-1',
  2:    'grid-cols-1 sm:grid-cols-2',
  3:    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4:    'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  auto: 'grid-cols-[repeat(auto-fill,minmax(280px,1fr))]',
};

export function Grid({ children, cols = 3, gap = 6, className, ...props }) {
  return (
    <div
      className={cn('grid', COLS[cols] ?? `grid-cols-${cols}`, `gap-${gap}`, className)}
      {...props}
    >
      {children}
    </div>
  );
}
