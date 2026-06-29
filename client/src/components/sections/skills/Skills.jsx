import { AnimatedGridBackground } from '@/components/animations';
import { Container } from '@/components/layout';
import { FadeIn } from '@/components/animations';
import { SkillsExpertise }  from './SkillsExpertise';
import { SkillsCategories } from './SkillsCategories';
import { SkillsLearning }   from './SkillsLearning';
import { SkillsWorkflow }   from './SkillsWorkflow';
import { SkillsCTA }        from './SkillsCTA';

/**
 * Skills — interactive showcase of technical expertise.
 *
 * Narrative flow:
 *   Section header → SkillsExpertise (6 domains)
 *   → SkillsCategories (37 technologies, 7 groups)
 *   → SkillsLearning (4-item roadmap)
 *   → SkillsWorkflow (6-step process)
 *   → SkillsCTA (bridge to Projects)
 */
export function Skills() {
  return (
    <section
      id="skills"
      aria-label="Skills and Technologies"
      className="relative overflow-hidden"
    >
      {/* Shared background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <AnimatedGridBackground dotOpacity={0.02} />
        {/* Top-right orb */}
        <div
          className="absolute -right-48 top-16 h-[700px] w-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)' }}
        />
        {/* Bottom-left orb */}
        <div
          className="absolute -left-56 bottom-32 h-[600px] w-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 70%)' }}
        />
      </div>

      {/* Section header */}
      <div className="pt-24 md:pt-32">
        <Container>
          <div className="mb-0">
            <FadeIn>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                03 — Skills & Technologies
              </p>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
                style={{ letterSpacing: '-0.02em' }}>
                Technical Arsenal
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground-secondary">
                Depth in a few, breadth across many — organized by how I actually use them,
                not alphabetically.
              </p>
            </FadeIn>
          </div>
        </Container>
      </div>

      <SkillsExpertise />
      <SkillsCategories />
      <SkillsLearning />
      <SkillsWorkflow />
      <SkillsCTA />
    </section>
  );
}
