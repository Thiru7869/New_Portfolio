import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * FloatingElement — wraps a child with a continuous gentle vertical float.
 * Used for decorative elements, profile photo, icons, etc.
 *
 * Usage:
 *   <FloatingElement amplitude={12} duration={5} delay={0.5}>
 *     <img src="avatar.jpg" />
 *   </FloatingElement>
 *
 * @param {number} amplitude - vertical travel in px (default 10)
 * @param {number} duration  - one full cycle in seconds (default 4)
 * @param {number} delay     - start delay to stagger multiple elements (default 0)
 */
export function FloatingElement({
  children,
  amplitude = 10,
  duration = 4,
  delay = 0,
  className,
  ...props
}) {
  return (
    <motion.div
      animate={{ y: [0, -amplitude, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * FloatingBadge — a small, floating, slightly rotated decorative chip.
 * Good for scattered tech-stack labels or achievement chips.
 *
 * @param {number} rotation - initial rotation in degrees (default 0)
 */
export function FloatingBadge({
  children,
  rotation = 0,
  amplitude = 8,
  duration = 3.5,
  delay = 0,
  className,
  ...props
}) {
  return (
    <FloatingElement amplitude={amplitude} duration={duration} delay={delay}>
      <div
        className={cn(
          'inline-flex items-center gap-1.5 rounded-lg border border-border',
          'bg-card px-3 py-1.5 text-xs font-medium text-foreground-secondary shadow-sm',
          className
        )}
        style={{ transform: `rotate(${rotation}deg)` }}
        {...props}
      >
        {children}
      </div>
    </FloatingElement>
  );
}

/**
 * FloatingGroup — lays out multiple children with staggered float timing.
 * Wrap several FloatingElements to avoid synchronized bob.
 */
export function FloatingGroup({ children, baseDelay = 0, stagger = 0.6, className, ...props }) {
  return (
    <div className={cn('relative', className)} {...props}>
      {Array.isArray(children)
        ? children.map((child, i) =>
            child
              ? <FloatingElement key={i} delay={baseDelay + i * stagger}>{child}</FloatingElement>
              : null
          )
        : children}
    </div>
  );
}
