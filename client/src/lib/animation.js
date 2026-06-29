/**
 * Shared animation constants — all motion components pull from here
 * so timing, easing, and spring config stay consistent across the portfolio.
 */

/** Custom ease-out curve: fast start → gentle deceleration */
export const EASE_OUT = [0.22, 1, 0.36, 1];

/** Smooth ease-in-out for transitions */
export const EASE_IN_OUT = [0.4, 0, 0.2, 1];

/** Durations in seconds */
export const DURATION = {
  fast:    0.25,
  default: 0.5,
  slow:    0.7,
  xslow:   1.0,
};

/** Stagger delays between children in seconds */
export const STAGGER = {
  fast:    0.04,
  default: 0.08,
  slow:    0.12,
};

/** Default viewport config for whileInView */
export const VIEWPORT = { once: true, margin: '-60px' };

/** Tight spring — snappy, used for magnetic effects */
export const SPRING_SNAPPY = { type: 'spring', stiffness: 300, damping: 25 };

/** Gentle spring — used for parallax and smooth following */
export const SPRING_GENTLE = { type: 'spring', stiffness: 100, damping: 20 };

/** Default fade-up variant pair (for manual use with variants prop) */
export const FADE_UP_VARIANTS = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.default, ease: EASE_OUT } },
};

/** Stagger container variant — use with FADE_UP_VARIANTS on children */
export const STAGGER_CONTAINER_VARIANTS = (stagger = STAGGER.default, delay = 0) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});
