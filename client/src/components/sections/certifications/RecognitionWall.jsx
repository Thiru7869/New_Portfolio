import { motion } from 'framer-motion';
import { Container } from '@/components/layout';
import { FadeIn } from '@/components/animations';
import { cn } from '@/lib/utils';
import { RECOGNITION_BADGES } from './certifications-data';

/* ─── Category color map — full static strings for Tailwind scanner ─────── */

const CATEGORY_COLORS = {
  'Professional':   'text-accent border-accent/20 bg-accent/5',
  'Cloud':          'text-cyan-400 border-cyan-400/20 bg-cyan-400/5',
  'Security':       'text-rose-400 border-rose-400/20 bg-rose-400/5',
  'Backend':        'text-orange-400 border-orange-400/20 bg-orange-400/5',
  'Full Stack':     'text-blue-400 border-blue-400/20 bg-blue-400/5',
  'Frontend':       'text-violet-400 border-violet-400/20 bg-violet-400/5',
  'Communication':  'text-emerald-400 border-emerald-400/20 bg-emerald-400/5',
  'Competition':    'text-yellow-400 border-yellow-400/20 bg-yellow-400/5',
  'Leadership':     'text-accent border-accent/20 bg-accent/5',
  'Academic':       'text-blue-400 border-blue-400/20 bg-blue-400/5',
  'Career':         'text-violet-400 border-violet-400/20 bg-violet-400/5',
};

/* ─── Single badge ───────────────────────────────────────────────────────── */

function RecognitionBadge({ badge, index }) {
  const colors = CATEGORY_COLORS[badge.category] ?? 'text-foreground border-border bg-surface';

  return (
    <motion.div
      className={cn(
        'group inline-flex cursor-default items-center gap-2 rounded-full border px-4 py-2.5',
        'select-none transition-all duration-250',
        'hover:-translate-y-0.5 hover:shadow-md',
        colors,
      )}
      initial={{ opacity: 0, scale: 0.88, y: 8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        type: 'spring',
        stiffness: 320,
        damping: 24,
        delay: 0.03 + index * 0.04,
      }}
    >
      {/* Icon with scale on hover */}
      <motion.span
        className="text-sm leading-none"
        role="img"
        aria-label={badge.label}
        whileHover={{ scale: 1.25 }}
        transition={{ type: 'spring', stiffness: 500, damping: 18 }}
      >
        {badge.icon}
      </motion.span>

      <div className="flex flex-col leading-none">
        <span className="text-xs font-semibold">{badge.label}</span>
        <span className="mt-0.5 text-[9px] font-medium opacity-60">{badge.category}</span>
      </div>
    </motion.div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export function RecognitionWall() {
  return (
    <div className="py-16">
      <Container>
        {/* Sub-heading */}
        <div className="mb-10">
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              Credential Wall
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h3
              className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
              style={{ letterSpacing: '-0.02em' }}
            >
              Every Badge Earned
            </h3>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground-secondary">
              A complete picture — from cloud infrastructure to leadership, cybersecurity to
              communication. Each badge represents real work, not a checkbox.
            </p>
          </FadeIn>
        </div>

        {/* Badge wall — flex-wrap, organic layout */}
        <div
          className="flex flex-wrap gap-3"
          role="list"
          aria-label="Recognition badges and credentials"
        >
          {RECOGNITION_BADGES.map((badge, i) => (
            <div key={badge.id} role="listitem">
              <RecognitionBadge badge={badge} index={i} />
            </div>
          ))}
        </div>

        {/* Decorative note */}
        <FadeIn delay={0.5} y={6}>
          <p className="mt-8 text-[11px] leading-relaxed text-foreground-muted">
            All credentials are verified and linked above — click any card in the certification section to view the original document.
          </p>
        </FadeIn>
      </Container>
    </div>
  );
}
