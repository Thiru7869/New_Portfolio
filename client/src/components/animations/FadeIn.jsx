import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE_OUT } from '@/lib/animation';

/**
 * FadeIn — fades + slides element into view when it enters the viewport.
 * Used for individual elements that need entrance animation.
 *
 * @param {number} delay    - seconds before animation starts
 * @param {number} duration - animation duration in seconds
 * @param {number} y        - vertical offset to slide from (px)
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  y = 20,
  x = 0,
  className,
  once = true,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration, delay, ease: EASE_OUT }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeInScale — fades + scales slightly on entrance.
 * Good for cards and feature items.
 */
export function FadeInScale({
  children,
  delay = 0,
  duration = 0.4,
  className,
  once = true,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration, delay, ease: EASE_OUT }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
