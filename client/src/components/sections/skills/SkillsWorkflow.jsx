import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout';
import { FadeIn } from '@/components/animations';
import { EASE_OUT } from '@/lib/animation';

const STEPS = [
  {
    num: '01',
    title: 'Research',
    description: 'Requirements, constraints, domain knowledge, and user goals.',
    color: 'text-blue-400',
  },
  {
    num: '02',
    title: 'Design',
    description: 'Architecture, component structure, API contracts, UI wireframes.',
    color: 'text-violet-400',
  },
  {
    num: '03',
    title: 'Develop',
    description: 'Clean, modular code with a focus on readability and performance.',
    color: 'text-accent',
  },
  {
    num: '04',
    title: 'Test',
    description: 'Unit tests, integration checks, accessibility audits, edge cases.',
    color: 'text-emerald-400',
  },
  {
    num: '05',
    title: 'Deploy',
    description: 'CI/CD pipelines, cloud provisioning, monitoring and alerting.',
    color: 'text-cyan-400',
  },
  {
    num: '06',
    title: 'Optimize',
    description: 'Performance profiling, user feedback, iterative improvement.',
    color: 'text-amber-400',
  },
];

function StepCard({ step, index }) {
  return (
    <motion.div
      className="group relative flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.08 + index * 0.08 }}
    >
      {/* Number node — sits on the horizontal track */}
      <motion.div
        className="relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background
                   transition-colors duration-300 group-hover:border-accent/40"
        whileHover={{ scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      >
        <span className={`font-mono text-xs font-bold ${step.color}`}>{step.num}</span>
        {/* Pulse on hover */}
        <motion.div
          className="absolute inset-0 rounded-full border border-accent/20"
          initial={{ scale: 1, opacity: 0 }}
          whileHover={{ scale: 1.35, opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Title */}
      <h4 className="mb-2 text-sm font-semibold text-foreground">{step.title}</h4>

      {/* Description */}
      <p className="text-xs leading-[1.65] text-foreground-muted">{step.description}</p>
    </motion.div>
  );
}

function Connector({ index }) {
  return (
    <div className="relative mt-7 hidden h-px w-full flex-1 items-center lg:flex" aria-hidden="true">
      {/* Track */}
      <div className="h-px w-full bg-border/20" />
      {/* Animated fill */}
      <motion.div
        className="absolute inset-0 h-px origin-left bg-accent/35"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: EASE_OUT }}
      />
    </div>
  );
}

export function SkillsWorkflow() {
  return (
    <div className="py-20 md:py-28">
      <Container>
        {/* Heading */}
        <div className="mb-16">
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              How I Work
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h3 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Development Process
            </h3>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground-secondary">
              A deliberate process applied to every project — from understanding the problem
              to continuous improvement.
            </p>
          </FadeIn>
        </div>

        {/* Desktop — horizontal flow with connector lines */}
        <div className="hidden lg:flex lg:items-start">
          {STEPS.map((step, i) => (
            <Fragment key={step.title}>
              <div className="flex-1">
                <StepCard step={step} index={i} />
              </div>
              {i < STEPS.length - 1 && (
                <div className="relative mt-7 h-4 w-10 shrink-0 flex items-center" aria-hidden="true">
                  <div className="h-px w-full bg-border/20" />
                  <motion.div
                    className="absolute inset-0 h-px origin-left bg-accent/40"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.1, ease: EASE_OUT }}
                  />
                </div>
              )}
            </Fragment>
          ))}
        </div>

        {/* Mobile — 2×3 grid with vertical connectors */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:hidden">
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative">
              <StepCard step={step} index={i} />
              {/* Vertical line below — only between rows */}
              {i < STEPS.length - 2 && (
                <div className="absolute -bottom-3 left-1/2 h-3 w-px -translate-x-1/2 bg-border/20 sm:hidden" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
