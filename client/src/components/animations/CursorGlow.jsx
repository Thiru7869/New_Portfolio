import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CursorGlow — a large, faint radial gradient that follows the cursor.
 * Creates ambient depth without glassmorphism or heavy effects.
 * Does not render on touch devices or when reduced-motion is preferred.
 *
 * Mount once at the root level.
 *
 * Usage (in App.jsx or layout):
 *   <CursorGlow />
 *
 * @param {number} size     - diameter of the glow in px (default 600)
 * @param {number} opacity  - max opacity (default 0.05)
 * @param {string} color    - RGB values, space-separated (default '37 99 235')
 */
export function CursorGlow({ size = 600, opacity = 0.05, color = '37 99 235' }) {
  const isTouch  = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const mouseX = useMotionValue(-size);
  const mouseY = useMotionValue(-size);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (isTouch || isReduced) return;
    const handler = (e) => {
      mouseX.set(e.clientX - size / 2);
      mouseY.set(e.clientY - size / 2);
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, [isTouch, isReduced, mouseX, mouseY, size]);

  if (isTouch || isReduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ overflow: 'hidden' }}
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
          width: size,
          height: size,
          background: `radial-gradient(circle, rgb(${color} / ${opacity}) 0%, transparent 65%)`,
        }}
        className="absolute rounded-full"
      />
    </motion.div>
  );
}
