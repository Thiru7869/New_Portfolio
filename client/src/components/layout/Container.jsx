import { cn } from '@/lib/utils';

/**
 * Container — consistent horizontal max-width and padding.
 * All sections use this for rhythm and edge alignment.
 *
 * Sizes:
 *   sm      → max-w-3xl  (prose, contact)
 *   default → max-w-6xl  (standard sections)
 *   lg      → max-w-7xl  (wide feature sections)
 *   full    → unconstrained (edge-to-edge)
 */
const SIZES = {
  sm:      'max-w-3xl',
  default: 'max-w-6xl',
  lg:      'max-w-7xl',
  full:    'max-w-none',
};

export function Container({ children, size = 'default', className, ...props }) {
  return (
    <div
      className={cn('mx-auto w-full px-6 lg:px-8', SIZES[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}
