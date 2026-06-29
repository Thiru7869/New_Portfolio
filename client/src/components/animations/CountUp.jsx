import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * CountUp — animates a number from `from` to `to` when it enters the viewport.
 * Triggers once. Respects prefers-reduced-motion.
 *
 * Usage:
 *   <CountUp to={500} suffix="+" duration={1.4} />
 *   <CountUp to={95} suffix="%" prefix="~" />
 *
 * @param {number} to          - target value
 * @param {number} from        - starting value (default 0)
 * @param {number} duration    - animation duration in seconds (default 1.4)
 * @param {string} prefix      - text before the number (default '')
 * @param {string} suffix      - text after the number (default '')
 * @param {Function} formatter - custom number formatter (default Math.round)
 */
export function CountUp({
  to,
  from = 0,
  duration = 1.4,
  prefix = '',
  suffix = '',
  formatter = Math.round,
  className,
  ...props
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [value, setValue] = useState(from);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!inView) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to);
      return;
    }

    const startTime = performance.now();
    const durationMs = duration * 1000;
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      setValue(formatter(from + (to - from) * easeOut(progress)));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [inView, to, from, duration, formatter]);

  return (
    <span ref={ref} className={cn(className)} aria-label={`${prefix}${to}${suffix}`} {...props}>
      {prefix}{value}{suffix}
    </span>
  );
}
