import { motion } from 'framer-motion';
import { EASE_OUT } from '@/lib/animation';

/**
 * HeroScrollHint — minimal vertical scroll indicator, bottom-left.
 *
 * Technique: a blue "ink stroke" that draws down through a track then
 * fades out. A pulsing dot below anchors the eye. Both sync to the same
 * 2.4s period so they feel rhythmically connected, not independent.
 */
export function HeroScrollHint() {
  const period = 2.4;
  const gap    = 1.0; // rest time between strokes

  return (
    <motion.div
      className="absolute bottom-8 left-8 hidden flex-col items-center gap-2.5 md:flex"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.6, ease: EASE_OUT }}
    >
      {/* "Scroll" label */}
      <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-foreground-muted">
        Scroll
      </span>

      {/* Animated track */}
      <div className="relative h-12 w-px overflow-hidden rounded-full bg-border/50">
        {/* Ink stroke: clips in from top, slides off the bottom */}
        <motion.div
          className="absolute inset-x-0 top-0 h-full rounded-full bg-accent"
          animate={{
            clipPath: [
              'inset(100% 0% 0% 0%)',  // hidden (below)
              'inset(0% 0% 0% 0%)',    // fully visible
              'inset(0% 0% 100% 0%)',  // wiped from top (slides off)
              'inset(100% 0% 0% 0%)',  // reset for next stroke
            ],
          }}
          style={{ willChange: 'clip-path' }}
          transition={{
            duration: period,
            repeat: Infinity,
            repeatDelay: gap,
            ease: [0.4, 0, 0.2, 1],
            times: [0, 0.35, 0.75, 1],
          }}
        />
      </div>

      {/* Pulsing dot — synced to the same period */}
      <motion.div
        className="h-1 w-1 rounded-full bg-accent"
        animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.6, 1] }}
        transition={{
          duration: period,
          repeat: Infinity,
          repeatDelay: gap,
          ease: 'easeInOut',
          times: [0, 0.35, 1],
        }}
      />
    </motion.div>
  );
}
