import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE_OUT, DURATION, VIEWPORT } from '@/lib/animation';

/**
 * RevealMask — reveals content via an animated clip-path sweep.
 * Creates a premium "curtain lifts" entrance effect used by agencies
 * like Linear and Stripe for hero text and key statements.
 *
 * Direction controls which edge the mask sweeps from.
 *
 * Usage:
 *   <RevealMask direction="bottom" delay={0.2}>
 *     <h2>Hello world</h2>
 *   </RevealMask>
 *
 * @param {'top'|'bottom'|'left'|'right'} direction
 * @param {number} duration
 * @param {number} delay
 */

const CLIP_PATHS = {
  top:    { hidden: 'inset(0 0 100% 0)', visible: 'inset(0 0 0% 0)' },
  bottom: { hidden: 'inset(100% 0 0 0)', visible: 'inset(0% 0 0 0)' },
  left:   { hidden: 'inset(0 100% 0 0)', visible: 'inset(0 0% 0 0)' },
  right:  { hidden: 'inset(0 0 0 100%)', visible: 'inset(0 0 0 0%)' },
};

export function RevealMask({
  children,
  direction = 'bottom',
  duration = DURATION.slow,
  delay = 0,
  once = true,
  className,
  ...props
}) {
  const { hidden, visible } = CLIP_PATHS[direction] ?? CLIP_PATHS.bottom;

  return (
    <motion.div
      initial={{ clipPath: hidden }}
      whileInView={{ clipPath: visible }}
      viewport={{ ...VIEWPORT, once }}
      transition={{ duration, delay, ease: EASE_OUT }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * RevealText — convenience wrapper that pairs RevealMask with
 * an inner opacity fade for a polished two-layer reveal.
 */
export function RevealText({ children, direction = 'bottom', delay = 0, className, ...props }) {
  return (
    <div className={cn('overflow-hidden', className)} {...props}>
      <RevealMask direction={direction} delay={delay}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: DURATION.default, delay: delay + 0.1, ease: EASE_OUT }}
        >
          {children}
        </motion.div>
      </RevealMask>
    </div>
  );
}
