import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Container } from '@/components/layout';
import { FadeIn, RevealMask, TiltCard, MagneticButton } from '@/components/animations';
import { cn } from '@/lib/utils';
import { FEATURED_PROJECTS } from './projects-data';
import { ProjectPreviewFrame } from './ProjectPreview';
import { EASE_OUT } from '@/lib/animation';

/* ─── Featured badge ─────────────────────────────────────────────────────── */

function FloatingBadge({ children, className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 6 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay, ease: EASE_OUT }}
      className={cn(
        'absolute z-10 flex items-center gap-1.5 whitespace-nowrap',
        'rounded-full border border-border/60 bg-surface/90 px-3 py-1.5 shadow-lg backdrop-blur-md',
        'text-[10px] font-semibold text-foreground-secondary',
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
      {children}
    </motion.div>
  );
}

/* ─── Project visual (preview frame + badges) ────────────────────────────── */

function ProjectVisual({ project, reversed }) {
  const [badge1, badge2] = project.highlights;

  return (
    <FadeIn
      x={reversed ? -40 : 40}
      y={0}
      delay={0.05}
      duration={0.7}
      className={cn('relative', reversed ? 'lg:order-1' : '')}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 scale-90 rounded-3xl opacity-25 blur-3xl"
        style={{ background: `radial-gradient(ellipse, rgba(${project.glowRgba},0.6) 0%, transparent 70%)` }}
      />

      <TiltCard maxTilt={5} className="relative" style={{ isolation: 'isolate' }}>
        <ProjectPreviewFrame
          projectId={project.id}
          className="aspect-[16/10] w-full"
        />
      </TiltCard>

      {/* Floating feature badges */}
      <FloatingBadge
        delay={0.5}
        className={reversed ? '-top-3 -right-4 hidden sm:flex' : '-top-3 -left-4 hidden sm:flex'}
      >
        {badge1}
      </FloatingBadge>
      <FloatingBadge
        delay={0.65}
        className={reversed ? '-bottom-3 -left-4 hidden sm:flex' : '-bottom-3 -right-4 hidden sm:flex'}
      >
        {badge2}
      </FloatingBadge>
    </FadeIn>
  );
}

/* ─── Project content ────────────────────────────────────────────────────── */

function ProjectContent({ project, reversed }) {
  return (
    <div className={cn('flex flex-col', reversed ? 'lg:order-2' : '')}>
      {/* Faint project number — visual anchor */}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="mb-1 select-none font-mono text-7xl font-bold leading-none text-foreground/[0.04] sm:text-8xl"
        aria-hidden="true"
      >
        {project.number}
      </motion.span>

      {/* Category badge */}
      <FadeIn delay={0.08} y={8}>
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider',
            project.colorText,
            project.colorBg,
            project.colorBorder,
          )}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: `rgb(${project.glowRgba})` }}
          />
          {project.categoryLabel}
        </span>
      </FadeIn>

      {/* Title */}
      <div className="mt-4 overflow-hidden">
        <RevealMask direction="bottom" delay={0.15} duration={0.65}>
          <h3 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl" style={{ letterSpacing: '-0.02em' }}>
            {project.title}
          </h3>
        </RevealMask>
      </div>

      {/* Tagline */}
      <FadeIn delay={0.25} y={10}>
        <p className={cn('mt-2 text-base font-medium', project.colorText)}>
          {project.tagline}
        </p>
      </FadeIn>

      {/* Problem */}
      <FadeIn delay={0.33} y={10}>
        <div className="mt-5">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-foreground-secondary/60">
            Problem
          </p>
          <p className="text-sm leading-relaxed text-foreground-secondary">
            {project.problem}
          </p>
        </div>
      </FadeIn>

      {/* Solution */}
      <FadeIn delay={0.41} y={10}>
        <div className="mt-4">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-foreground-secondary/60">
            Solution
          </p>
          <p className="text-sm leading-relaxed text-foreground-secondary">
            {project.solution}
          </p>
        </div>
      </FadeIn>

      {/* Tech chips */}
      <FadeIn delay={0.50} y={8}>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className={cn(
                'rounded-md border px-2.5 py-1 text-[11px] font-medium',
                project.colorBg,
                project.colorBorder,
                project.colorText,
              )}
            >
              {t}
            </span>
          ))}
        </div>
      </FadeIn>

      {/* CTA */}
      <FadeIn delay={0.60} y={8} className="mt-6">
        <MagneticButton strength={0.25}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'group inline-flex items-center gap-2 rounded-xl border px-5 py-2.5',
              'text-sm font-semibold transition-all duration-200',
              project.colorText,
              project.colorBg,
              project.colorBorder,
              'hover:brightness-110',
            )}
          >
            View on GitHub
            <ExternalLink
              size={13}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </MagneticButton>
      </FadeIn>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────────────────── */

export function ProjectsFeatured() {
  return (
    <div className="pt-12">
      {FEATURED_PROJECTS.map((project, i) => {
        const isReversed = i % 2 === 1;
        return (
          <div key={project.id}>
            <div className="py-16 md:py-20">
              <Container>
                <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
                  {/* Mobile: content always first. Desktop: alternate via lg:order-X */}
                  <ProjectContent project={project} reversed={isReversed} />
                  <ProjectVisual  project={project} reversed={isReversed} />
                </div>
              </Container>
            </div>

            {/* Separator */}
            {i < FEATURED_PROJECTS.length - 1 && (
              <Container>
                <div className="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
              </Container>
            )}
          </div>
        );
      })}
    </div>
  );
}
