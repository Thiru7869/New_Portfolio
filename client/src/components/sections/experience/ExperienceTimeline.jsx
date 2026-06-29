import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Container } from '@/components/layout';
import { FadeIn, TiltCard } from '@/components/animations';
import { cn } from '@/lib/utils';
import { INTERNSHIPS } from './experience-data';

/* ─── Timeline node (dot + pulse ring) ──────────────────────────────────── */

function TimelineNode({ index }) {
  return (
    <div
      className={cn(
        // Mobile: 14px from left edge (within the 40px card indent)
        'absolute left-[14px] z-10',
        // Desktop: center of container
        'lg:left-1/2 lg:-translate-x-1/2',
      )}
      style={{ top: '20px' }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ type: 'spring', stiffness: 380, damping: 22, delay: 0.05 + index * 0.035 }}
      >
        {/* Outer pulse ring */}
        <motion.div
          className="absolute h-5 w-5 -translate-x-[3px] -translate-y-[3px] rounded-full border border-accent/30"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + index * 0.035, duration: 0.3 }}
        />
        {/* Core dot */}
        <div className="relative h-2.5 w-2.5 rounded-full border-2 border-accent bg-background" />
      </motion.div>
    </div>
  );
}

/* ─── Individual internship card ─────────────────────────────────────────── */

function InternCard({ item }) {
  return (
    <TiltCard maxTilt={4} className="h-full">
      <div
        className={cn(
          'group relative h-full overflow-hidden rounded-xl border border-border/50 bg-surface/60 p-5',
          'transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-md',
        )}
        style={{
          '--glow-color': item.colorGlow,
        }}
      >
        {/* Left accent bar */}
        <div
          className={cn(
            'absolute inset-y-0 left-0 w-0.5 rounded-l-xl transition-colors duration-300',
            'bg-accent/10 group-hover:bg-accent/50',
          )}
        />

        {/* Hover glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `radial-gradient(ellipse at 0% 50%, ${item.colorGlow} 0%, transparent 65%)` }}
          aria-hidden="true"
        />

        <div className="pl-3">
          {/* Company + icon */}
          <div className="mb-2 flex items-center gap-2">
            <span className="text-base leading-none" role="img" aria-label={item.company}>{item.icon}</span>
            <span className={cn('text-[10px] font-bold uppercase tracking-wider', item.colorText)}>
              {item.company}
            </span>
          </div>

          {/* Role */}
          <h4 className="mb-2 text-sm font-semibold leading-snug text-foreground">{item.role}</h4>

          {/* Preview / contribution */}
          <p className="mb-3.5 text-xs leading-relaxed text-foreground-secondary line-clamp-2">
            {item.contribution ?? item.preview}
          </p>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-1">
            {item.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className={cn(
                  'rounded-md border px-2 py-0.5 text-[9px] font-medium transition-all duration-150',
                  'hover:-translate-y-0.5',
                  item.colorBg,
                  item.colorBorder,
                  item.colorText,
                )}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

/* ─── Single timeline item (mobile + desktop) ────────────────────────────── */

function TimelineItem({ item, index }) {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative mb-10 last:mb-0">
      {/* Node dot */}
      <TimelineNode index={index} />

      {/* Mobile card — always full width, indented past the line */}
      <div className="pl-10 lg:hidden">
        <FadeIn x={-16} y={0} delay={0.06 + index * 0.04}>
          <InternCard item={item} />
        </FadeIn>
      </div>

      {/* Desktop card — alternates sides via padding */}
      <div
        className={cn(
          'hidden lg:block',
          isLeft
            ? 'pr-[calc(50%+28px)]'   // Left half: card on left, push right via padding
            : 'pl-[calc(50%+28px)]',   // Right half: card on right, push left via padding
        )}
      >
        <FadeIn x={isLeft ? 24 : -24} y={0} delay={0.06 + index * 0.04}>
          <InternCard item={item} />
        </FadeIn>
      </div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export function ExperienceTimeline() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });

  const lineScaleY = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div className="py-16 md:py-20">
      <Container>
        {/* Sub-heading */}
        <div className="mb-12">
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              Training & Internships
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h3
              className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
              style={{ letterSpacing: '-0.02em' }}
            >
              8 Organizations. One Direction.
            </h3>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground-secondary">
              Cloud infrastructure, full-stack Java, Python backends, cybersecurity, MERN development —
              each internship added a new layer to the engineering foundation.
            </p>
          </FadeIn>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Vertical line track */}
          <div
            className={cn(
              // Mobile: left-aligned
              'absolute bottom-4 left-[17px] top-4 w-px bg-border/25',
              // Desktop: centered
              'lg:left-1/2 lg:-translate-x-px',
            )}
            aria-hidden="true"
          >
            <motion.div
              className="absolute inset-0 origin-top bg-accent/50"
              style={{ scaleY: lineScaleY, willChange: 'transform' }}
            />
          </div>

          {/* Items */}
          <div>
            {INTERNSHIPS.map((item, i) => (
              <TimelineItem key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
