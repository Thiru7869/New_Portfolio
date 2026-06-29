import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE_OUT, VIEWPORT } from '@/lib/animation';

/**
 * AnimatedDivider — a horizontal divider that draws itself into view.
 * The line expands from the center outward, with a center dot that pops in.
 * Used between major sections for rhythm without heavy visual weight.
 *
 * Usage:
 *   <AnimatedDivider />
 *   <AnimatedDivider label="2024 – Present" />
 *
 * @param {string} label  - optional center label text instead of dot
 * @param {string} align  - 'center' | 'left' | 'right' (default 'center')
 */
export function AnimatedDivider({ label, align = 'center', className, ...props }) {
  const hasLabel = Boolean(label);

  return (
    <div
      className={cn('flex items-center gap-4 py-1', className)}
      role="separator"
      aria-hidden="true"
      {...props}
    >
      {/* Left line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        style={{ originX: align === 'right' ? 1 : 0 }}
        className={cn('h-px bg-border', hasLabel || align === 'center' ? 'flex-1' : 'w-12')}
      />

      {/* Center element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.3, delay: 0.35, ease: EASE_OUT }}
      >
        {hasLabel ? (
          <span className="text-xs font-mono text-foreground-muted tracking-widest uppercase">
            {label}
          </span>
        ) : (
          <div className="h-1 w-1 rounded-full bg-border" />
        )}
      </motion.div>

      {/* Right line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.7, delay: 0.06, ease: EASE_OUT }}
        style={{ originX: align === 'left' ? 0 : 1 }}
        className={cn('h-px bg-border', hasLabel || align === 'center' ? 'flex-1' : 'w-12')}
      />
    </div>
  );
}

/**
 * GradientDivider — a fade-out horizontal line.
 * Softer than AnimatedDivider, good for subtle section breaks.
 */
export function GradientDivider({ className }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      aria-hidden="true"
      className={cn('h-px w-full', className)}
      style={{
        background: 'linear-gradient(to right, transparent, var(--border) 30%, var(--border) 70%, transparent)',
      }}
    />
  );
}
