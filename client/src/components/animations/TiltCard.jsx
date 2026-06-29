import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * TiltCard — 3D perspective tilt on mouse hover.
 * Clean and professional: no glow, no reflection — pure geometry.
 *
 * Usage:
 *   <TiltCard maxTilt={8}>
 *     <Card>...</Card>
 *   </TiltCard>
 *
 * @param {number} maxTilt        - maximum rotation in degrees (default 8)
 * @param {number} perspective    - CSS perspective in px (default 1000)
 */
export function TiltCard({
  children,
  maxTilt = 8,
  perspective = 1000,
  className,
  ...props
}) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 22 });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 → 0.5
    const ny = (e.clientY - rect.top)  / rect.height - 0.5;
    rotateX.set(-ny * maxTilt * 2);
    rotateY.set(nx  * maxTilt * 2);
  }, [maxTilt, rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: perspective }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('transform-gpu', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
