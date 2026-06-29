import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Container } from '@/components/layout';
import { FadeIn, RevealMask, CountUp, MagneticButton } from '@/components/animations';
import { cn } from '@/lib/utils';
import { PROFESSIONAL_ROLE, RESUME_URL } from './experience-data';
import { EASE_OUT } from '@/lib/animation';

/* ─── Responsibility item with spring-in check mark ─────────────────────── */

function Responsibility({ text, index }) {
  return (
    <motion.li
      className="flex items-start gap-3"
      initial={{ opacity: 0, x: -14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: 0.1 + index * 0.07, ease: EASE_OUT }}
    >
      {/* Check badge — spring scales in after text slides */}
      <motion.span
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/8"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 420, damping: 16, delay: 0.16 + index * 0.07 }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-2.5 w-2.5 text-accent">
          <polyline points="1.5 6 4.5 9 10.5 3" />
        </svg>
      </motion.span>
      <span className="text-sm leading-relaxed text-foreground-secondary">{text}</span>
    </motion.li>
  );
}

/* ─── Achievement stat card ──────────────────────────────────────────────── */

function StatCard({ to, suffix, label, delay }) {
  return (
    <FadeIn delay={delay} y={12}>
      <div className="flex flex-col items-center text-center">
        <span className="text-2xl font-bold tabular-nums text-foreground sm:text-3xl">
          <CountUp to={to} suffix={suffix} duration={1.6} />
        </span>
        <span className="mt-1 text-[11px] font-medium text-foreground-secondary">{label}</span>
      </div>
    </FadeIn>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export function ExperienceSpotlight() {
  const r = PROFESSIONAL_ROLE;

  return (
    <div className="pt-12 pb-4">
      <Container>
        <FadeIn>
          <article
            className={cn(
              'group relative overflow-hidden rounded-2xl border border-border/60 bg-surface/50',
              'transition-shadow duration-300 hover:shadow-[0_0_60px_rgba(37,99,235,0.07)]',
            )}
            aria-label={`${r.role} at ${r.company}`}
          >
            {/* Left accent bar — thicker for the hero role */}
            <div className="absolute inset-y-0 left-0 w-0.5 rounded-l-2xl bg-accent/20 transition-colors duration-300 group-hover:bg-accent/60" />

            {/* Ambient glow top-right */}
            <div
              className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full opacity-50"
              style={{ background: 'radial-gradient(circle at 100% 0%, rgba(37,99,235,0.08) 0%, transparent 70%)' }}
              aria-hidden="true"
            />

            {/* ── Header ── */}
            <div className="flex flex-col gap-4 border-b border-border/40 px-6 py-6 sm:flex-row sm:items-start sm:justify-between sm:gap-6 md:px-8">
              <div className="flex items-start gap-4">
                {/* Monogram */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/8">
                  <span className="text-lg font-bold text-accent">{r.monogram}</span>
                </div>

                <div>
                  <div className="overflow-hidden">
                    <RevealMask direction="bottom" delay={0.05} duration={0.5}>
                      <h3 className="text-xl font-semibold text-foreground">{r.role}</h3>
                    </RevealMask>
                  </div>
                  <p className="mt-0.5 text-sm font-medium text-foreground-secondary">{r.company}</p>
                </div>
              </div>

              {/* Meta badges */}
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-accent/20 bg-accent/8 px-3 py-1 text-[11px] font-semibold text-accent">
                  {r.duration}
                </span>
                <span className="rounded-full border border-border/60 bg-surface px-3 py-1 text-[11px] font-medium text-foreground-secondary">
                  {r.type}
                </span>
                <span className="rounded-full border border-border/60 bg-surface px-3 py-1 text-[11px] font-medium text-foreground-secondary">
                  {r.domain}
                </span>
              </div>
            </div>

            {/* ── Body ── */}
            <div className="grid gap-8 px-6 py-8 md:grid-cols-[1fr_auto] md:gap-12 md:px-8">
              {/* Left: description + responsibilities */}
              <div>
                <FadeIn delay={0.08} y={8}>
                  <p className="mb-6 text-sm leading-[1.78] text-foreground-secondary">{r.description}</p>
                </FadeIn>

                <FadeIn delay={0.12} y={6}>
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.12em] text-foreground-secondary/60">
                    Responsibilities
                  </p>
                </FadeIn>

                <ul className="space-y-3" role="list">
                  {r.responsibilities.map((resp, i) => (
                    <Responsibility key={i} text={resp} index={i} />
                  ))}
                </ul>
              </div>

              {/* Right: resume CTA */}
              <div className="flex flex-col items-start gap-4 md:items-end md:pt-1">
                <FadeIn delay={0.3} y={6}>
                  <MagneticButton strength={0.25}>
                    <a
                      href={RESUME_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'group/btn inline-flex items-center gap-2 rounded-xl border border-accent/25',
                        'bg-accent/8 px-5 py-2.5 text-sm font-semibold text-accent',
                        'transition-all duration-200 hover:bg-accent/12 hover:brightness-110',
                      )}
                    >
                      View Full Resume
                      <ExternalLink
                        size={13}
                        className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                      />
                    </a>
                  </MagneticButton>
                </FadeIn>
              </div>
            </div>

            {/* ── Stats row ── */}
            <div className="border-t border-border/40">
              <div
                className="grid grid-cols-2 divide-x divide-border/30 sm:grid-cols-4"
                role="list"
                aria-label="Career statistics"
              >
                {r.stats.map((stat, i) => (
                  <div key={stat.label} className="px-6 py-5 sm:py-6" role="listitem">
                    <StatCard to={stat.to} suffix={stat.suffix} label={stat.label} delay={0.2 + i * 0.06} />
                  </div>
                ))}
              </div>
            </div>

            {/* ── Tech stack ── */}
            <div className="border-t border-border/40 px-6 py-5 md:px-8">
              <FadeIn delay={0.15} y={6} className="flex flex-wrap gap-2">
                {r.tech.map((t, i) => (
                  <motion.span
                    key={t}
                    className="rounded-md border border-border/50 bg-surface px-2.5 py-1 text-[11px] font-medium text-foreground-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:text-foreground hover:shadow-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.15 + i * 0.04, ease: EASE_OUT }}
                  >
                    {t}
                  </motion.span>
                ))}
              </FadeIn>
            </div>
          </article>
        </FadeIn>
      </Container>
    </div>
  );
}
