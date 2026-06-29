import { AnimatedGridBackground } from '@/components/animations';
import { Container } from '@/components/layout';
import { FadeIn } from '@/components/animations';
import { ProjectsFeatured } from './ProjectsFeatured';
import { ProjectsGrid }    from './ProjectsGrid';

export function Projects() {
  return (
    <section
      id="projects"
      aria-label="Featured Projects"
      className="relative overflow-hidden"
    >
      {/* Shared ambient background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <AnimatedGridBackground dotOpacity={0.018} />
        {/* Top-left accent orb */}
        <div
          className="absolute -left-64 top-20 h-[800px] w-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 65%)' }}
        />
        {/* Middle-right orb */}
        <div
          className="absolute -right-48 top-[45%] h-[600px] w-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 70%)' }}
        />
        {/* Bottom-left orb */}
        <div
          className="absolute -left-48 bottom-32 h-[500px] w-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.03) 0%, transparent 70%)' }}
        />
      </div>

      {/* Section header */}
      <div className="pt-24 md:pt-32">
        <Container>
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              04 — Projects
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2
              className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
              style={{ letterSpacing: '-0.02em' }}
            >
              Selected Work
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground-secondary">
              End-to-end applications built with real-world constraints — each one a complete
              solution with deployed backend, persistent data, and production-ready architecture.
            </p>
          </FadeIn>
        </Container>
      </div>

      {/* Featured editorial projects */}
      <ProjectsFeatured />

      {/* Grid — all projects, filterable */}
      <div className="mt-12 border-t border-border/30 pt-16">
        <ProjectsGrid />
      </div>
    </section>
  );
}
