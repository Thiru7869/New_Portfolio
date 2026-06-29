import { motion } from 'framer-motion';
import { Container } from '@/components/layout';
import { FadeIn, FadeInScale, CountUp } from '@/components/animations';
import { cn } from '@/lib/utils';
import { ACHIEVEMENT_STATS, NOTABLE_ACHIEVEMENTS } from './certifications-data';
import { EASE_OUT } from '@/lib/animation';

/* ─── Stat card ──────────────────────────────────────────────────────────── */

function StatCard({ stat, index }) {
  return (
    <motion.div
      className="group flex flex-col items-center justify-center py-6 text-center"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: 0.05 + index * 0.07, ease: EASE_OUT }}
    >
      <span
        className="text-2xl font-bold tabular-nums text-foreground sm:text-3xl lg:text-4xl"
        aria-hidden="true"
      >
        <CountUp to={stat.to} suffix={stat.suffix} duration={1.6} />
      </span>
      <p className="sr-only">{stat.to}{stat.suffix} {stat.label}</p>
      <p className="mt-1 text-xs font-semibold text-foreground-secondary">{stat.label}</p>
      <p className="mt-0.5 text-[10px] text-foreground-muted">{stat.sub}</p>
    </motion.div>
  );
}

/* ─── Notable achievement card ───────────────────────────────────────────── */

function AchievementCard({ item, index }) {
  return (
    <FadeInScale delay={0.08 + index * 0.07}>
      <article
        className={cn(
          'group relative overflow-hidden rounded-2xl border bg-surface/60 p-5',
          'transition-all duration-300 hover:-translate-y-1 hover:shadow-md',
          item.colorBorder,
        )}
      >
        {/* Left accent — uses static colorBar/colorBarHover strings from data to satisfy Tailwind scanner */}
        <div
          className={cn(
            'absolute inset-y-0 left-0 w-0.5 rounded-l-2xl transition-colors duration-300',
            item.colorBar,
            item.colorBarHover,
          )}
        />

        {/* Hover glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(37,99,235,0.05) 0%, transparent 65%)' }}
          aria-hidden="true"
        />

        <div className="pl-3">
          {/* Icon + category */}
          <div className="mb-3 flex items-center gap-2.5">
            <span
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg text-lg',
                item.colorBg,
              )}
              role="img"
              aria-label={item.title}
            >
              {item.icon}
            </span>
            <span
              className={cn(
                'rounded-full border px-2.5 py-0.5 text-[10px] font-semibold',
                item.colorBg,
                item.colorBorder,
                item.colorText,
              )}
            >
              {item.category}
            </span>
          </div>

          <h4 className="mb-1.5 text-sm font-semibold leading-snug text-foreground">
            {item.title}
          </h4>
          <p className="text-xs leading-relaxed text-foreground-secondary">
            {item.description}
          </p>
        </div>
      </article>
    </FadeInScale>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export function AchievementHighlights() {
  return (
    <div className="py-16">
      <Container>
        {/* Sub-heading */}
        <div className="mb-10">
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              By the Numbers
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h3
              className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
              style={{ letterSpacing: '-0.02em' }}
            >
              Achievements
            </h3>
          </FadeIn>
        </div>

        {/* Stats strip */}
        <FadeIn>
          <div
            className={cn(
              'mb-12 rounded-2xl border border-border/40 bg-surface/40',
              'grid grid-cols-2 divide-x divide-y divide-border/30 sm:grid-cols-4 sm:divide-y-0',
            )}
            role="list"
            aria-label="Career statistics"
          >
            {ACHIEVEMENT_STATS.map((stat, i) => (
              <div key={stat.label} role="listitem">
                <StatCard stat={stat} index={i} />
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Notable achievements 2×2 grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {NOTABLE_ACHIEVEMENTS.map((item, i) => (
            <AchievementCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </Container>
    </div>
  );
}
