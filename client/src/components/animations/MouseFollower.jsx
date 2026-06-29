import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * MouseFollower — a minimal accent dot that follows the cursor.
 * Adds premium feel without obscuring the native cursor.
 * Does not render on touch devices or when reduced-motion is preferred.
 *
 * Mount once at the root level. Sits above all other content (z-[9999]).
 *
 * Usage (in App.jsx):
 *   <MouseFollower />
 *
 * @param {number} size     - dot size in px (default 8)
 * @param {number} opacity  - dot opacity (default 0.65)
 */
export function MouseFollower({ size = 8, opacity = 0.65 }) {
  const [visible, setVisible] = useState(false);
  const [pressing, setPressing] = useState(false);

  const isTouch   = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 400, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 30 });

  const onMove = useCallback((e) => {
    mouseX.set(e.clientX - size / 2);
    mouseY.set(e.clientY - size / 2);
    setVisible(true);
  }, [mouseX, mouseY, size]);

  useEffect(() => {
    if (isTouch || isReduced) return;

    const onDown  = () => setPressing(true);
    const onUp    = () => setPressing(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener('mousemove',   onMove,  { passive: true });
    document.addEventListener('mousedown',   onDown);
    document.addEventListener('mouseup',     onUp);
    document.addEventListener('mouseleave',  onLeave);
    document.addEventListener('mouseenter',  onEnter);

    return () => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [isTouch, isReduced, onMove]);

  if (isTouch || isReduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-[9999] rounded-full"
      style={{
        x: springX,
        y: springY,
        width:  pressing ? size * 0.7 : size,
        height: pressing ? size * 0.7 : size,
        backgroundColor: 'var(--accent)',
        opacity: visible ? opacity : 0,
        transition: 'width 0.1s ease, height 0.1s ease, opacity 0.25s ease',
        willChange: 'transform',
      }}
    />
  );
}
