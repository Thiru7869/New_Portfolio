import { motion } from 'framer-motion';
import { AnimatedGridBackground } from '@/components/animations';
import { EASE_OUT } from '@/lib/animation';

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">

      {/* Layer 1 — fine dot grid: barely perceptible, fills empty space */}
      <AnimatedGridBackground dotOpacity={0.03} gridSize={30} />

      {/* Layer 2 — primary accent orb, top-right: slow breathe so it feels alive */}
      <motion.div
        className="absolute -right-48 -top-48 h-[800px] w-[800px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, rgba(37,99,235,0.08) 0%, rgba(37,99,235,0.03) 45%, transparent 70%)',
          willChange: 'opacity, transform',
        }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: [0, 1, 0.85, 1], scale: 1 }}
        transition={{
          opacity: {
            duration: 6,
            times: [0, 0.25, 0.6, 1],
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 4,
          },
          scale: { duration: 1.8, ease: EASE_OUT },
        }}
      />

      {/* Layer 3 — secondary orb, bottom-left: counterpoint to top-right */}
      <motion.div
        className="absolute -bottom-56 -left-56 h-[700px] w-[700px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, rgba(37,99,235,0.05) 0%, rgba(37,99,235,0.015) 50%, transparent 70%)',
          willChange: 'opacity',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2, delay: 0.4, ease: EASE_OUT }}
      />

      {/* Layer 4 — bottom separator: fades out at edges so it disappears rather than stops */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--border) 25%, var(--border) 75%, transparent 100%)',
          opacity: 0.6,
        }}
      />
    </div>
  );
}
