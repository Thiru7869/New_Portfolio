import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout';
import { FadeIn, MagneticButton, AnimatedDivider } from '@/components/animations';
import { EASE_OUT } from '@/lib/animation';

export function SkillsCTA() {
  return (
    <div className="pb-24 pt-4 md:pb-32 md:pt-4">
      <Container>
        <AnimatedDivider className="mb-16" />

        <div className="flex flex-col items-center text-center">
          <FadeIn>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              Beyond the Stack
            </p>
          </FadeIn>

          <FadeIn delay={0.06}>
            <h3
              className="mx-auto mb-5 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
              style={{ letterSpacing: '-0.02em' }}
            >
              Skills are only as meaningful as the problems they solve.
            </h3>
          </FadeIn>

          <FadeIn delay={0.12}>
            <p className="mb-10 max-w-lg text-base leading-relaxed text-foreground-secondary">
              See how these technologies come together in real projects — each one built to solve
              a genuine problem.
            </p>
          </FadeIn>

          <FadeIn delay={0.18}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <MagneticButton strength={0.35}>
                <motion.a
                  href="#projects"
                  className="inline-flex h-11 items-center gap-2.5 rounded-lg bg-accent px-6 text-sm font-semibold text-white
                             shadow-sm shadow-accent/20
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  whileHover="hovered"
                  whileTap={{ scale: 0.96 }}
                  variants={{ hovered: { scale: 1.02 } }}
                  transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                >
                  View Projects
                  <motion.span
                    className="inline-flex shrink-0"
                    variants={{ hovered: { x: 3 } }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                    aria-hidden="true"
                  >
                    <ArrowRight size={14} />
                  </motion.span>
                </motion.a>
              </MagneticButton>

              <MagneticButton strength={0.28}>
                <motion.a
                  href="#contact"
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-border px-5 text-sm font-medium
                             text-foreground-secondary transition-colors hover:border-foreground-secondary hover:text-foreground
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                >
                  Get in Touch
                </motion.a>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </Container>
    </div>
  );
}
