import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE_OUT } from '@/lib/animation';

/**
 * AnimatedGridBackground — a subtle dot-grid backdrop that fades in on mount.
 * Use inside a `relative` container as a sibling to section content.
 *
 * Inspired by Linear's background texture — minimal, non-distracting.
 * The grid reveals itself with a centre-out opacity animation.
 *
 * Usage:
 *   <section className="relative">
 *     <AnimatedGridBackground />
 *     <div>Section content</div>
 *   </section>
 *
 * @param {number}  dotOpacity  - opacity of the grid dots (default 0.04)
 * @param {number}  gridSize    - spacing between dots in px (default 28)
 * @param {boolean} mask        - apply radial fade at edges (default true)
 */
export function AnimatedGridBackground({
  dotOpacity = 0.04,
  gridSize = 28,
  mask = true,
  className,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: EASE_OUT }}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 -z-10', className)}
      style={{
        backgroundImage: `radial-gradient(circle, rgb(255 255 255 / ${dotOpacity}) 1px, transparent 1px)`,
        backgroundSize: `${gridSize}px ${gridSize}px`,
        maskImage: mask
          ? 'radial-gradient(ellipse at center, black 20%, transparent 75%)'
          : undefined,
        WebkitMaskImage: mask
          ? 'radial-gradient(ellipse at center, black 20%, transparent 75%)'
          : undefined,
      }}
      {...props}
    />
  );
}

/**
 * AnimatedLineGrid — alternative to dot grid: intersecting lines.
 * Slightly more structured, good for technical/engineering feel.
 *
 * @param {number} lineOpacity - opacity of the grid lines (default 0.04)
 * @param {number} gridSize    - cell size in px (default 40)
 */
export function AnimatedLineGrid({ lineOpacity = 0.04, gridSize = 40, className, ...props }) {
  const lineColor = `rgb(255 255 255 / ${lineOpacity})`;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: EASE_OUT }}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 -z-10', className)}
      style={{
        backgroundImage: `linear-gradient(${lineColor} 1px, transparent 1px),
                          linear-gradient(to right, ${lineColor} 1px, transparent 1px)`,
        backgroundSize: `${gridSize}px ${gridSize}px`,
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
      }}
      {...props}
    />
  );
}
