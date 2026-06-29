import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * ParallaxSection — children scroll at a different rate than the page.
 * Use for background elements, decorative text, or subtle depth effects.
 *
 * Usage:
 *   <ParallaxSection speed={0.25}>
 *     <img src="..." />
 *   </ParallaxSection>
 *
 * @param {number} speed  - 0 = no parallax, 1 = full inverse parallax (default 0.25)
 *                          Positive values move slower (background feel).
 *                          Negative values move faster (foreground feel).
 * @param {boolean} smooth - add spring damping (default true)
 */
export function ParallaxSection({ children, speed = 0.25, smooth = true, className, ...props }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const range = speed * 120;
  const rawY = useTransform(scrollYProgress, [0, 1], [`${range}px`, `-${range}px`]);
  const springY = useSpring(rawY, { stiffness: 80, damping: 20 });
  const y = smooth ? springY : rawY;

  return (
    <div ref={ref} className={cn('overflow-hidden', className)} {...props}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

/**
 * ParallaxText — a single line of text that shifts horizontally on scroll.
 * Used for decorative large-text elements (e.g., background watermark).
 *
 * @param {number} speed - negative = move right, positive = move left
 */
export function ParallaxText({ children, speed = 0.15, className, ...props }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const range = speed * 200;
  const x = useTransform(scrollYProgress, [0, 1], [`${-range}px`, `${range}px`]);

  return (
    <div ref={ref} className={cn('overflow-hidden', className)} {...props}>
      <motion.div style={{ x }}>
        {children}
      </motion.div>
    </div>
  );
}
