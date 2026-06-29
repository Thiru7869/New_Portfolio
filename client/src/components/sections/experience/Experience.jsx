import { ExternalLink } from 'lucide-react';
import { AnimatedGridBackground, FadeIn, MagneticButton, AnimatedDivider } from '@/components/animations';
import { Container } from '@/components/layout';
import { cn } from '@/lib/utils';
import { ExperienceSpotlight } from './ExperienceSpotlight';
import { ExperienceTimeline }  from './ExperienceTimeline';
import { RESUME_URL } from './experience-data';

export function Experience() {
  return (
    <section
      id="experience"
      aria-label="Professional Experience"
      className="relative overflow-hidden"
    >
      {/* Shared background — matches the portfolio visual language */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <AnimatedGridBackground dotOpacity={0.018} />
        {/* Top-right orb */}
        <div
          className="absolute -right-56 top-12 h-[700px] w-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 65%)' }}
        />
        {/* Bottom-left orb */}
        <div
          className="absolute -left-48 bottom-24 h-[600px] w-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Section header ── */}
      <div className="pt-24 md:pt-32">
        <Container>
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              05 — Experience
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2
              className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
              style={{ letterSpacing: '-0.02em' }}
            >
              Professional Journey
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground-secondary">
              From first code commit to global-platform expert — 8 organizations across cloud,
              full-stack, data, and security, culminating in an ongoing role that spans 3+ years.
            </p>
          </FadeIn>
        </Container>
      </div>

      {/* ── Professional role — Chegg spotlight ── */}
      <ExperienceSpotlight />

      {/* ── Divider ── */}
      <Container>
        <AnimatedDivider className="my-8" />
      </Container>

      {/* ── Internship journey timeline ── */}
      <ExperienceTimeline />

      {/* ── CTA ── */}
      <div className="pb-24 md:pb-32">
        <Container>
          <FadeIn className="flex flex-col items-center gap-5 rounded-2xl border border-border/40 bg-surface/40 py-10 text-center">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                Want the full picture?
              </p>
              <h3
                className="text-2xl font-semibold text-foreground sm:text-3xl"
                style={{ letterSpacing: '-0.02em' }}
              >
                View My Resume
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground-secondary">
                Full work history, certifications, education, and contact — one document.
              </p>
            </div>

            <MagneticButton strength={0.3}>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'group inline-flex items-center gap-2 rounded-xl',
                  'bg-accent px-7 py-3 text-sm font-semibold text-white shadow-sm shadow-accent/25',
                  'transition-all duration-200 hover:brightness-110 hover:shadow-accent/30 hover:shadow-md',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                )}
              >
                Open Resume
                <ExternalLink
                  size={13}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </MagneticButton>
          </FadeIn>
        </Container>
      </div>
    </section>
  );
}
