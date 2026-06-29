import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * MagneticButton — wraps any element and makes it gently follow the cursor.
 *
 * Usage:
 *   <MagneticButton strength={0.35}>
 *     <Button variant="primary">Hire Me</Button>
 *   </MagneticButton>
 *
 * @param {number} strength  - 0–1, how far the element follows the cursor (default 0.35)
 * @param {number} distance  - px radius outside the element that still activates the effect (default 40)
 */
export function MagneticButton({
  children,
  strength = 0.35,
  distance = 40,
  className,
  ...props
}) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.8 });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }, [strength, x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('inline-flex', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
