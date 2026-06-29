import { motion } from 'framer-motion';
import { Code2, PenTool, BarChart2, Cloud, Zap, Shield } from 'lucide-react';
import { Container } from '@/components/layout';
import { FadeIn, StaggerContainer, StaggerItem, TiltCard } from '@/components/animations';
import { cn } from '@/lib/utils';

const STRENGTHS = [
  {
    icon: Code2,
    title: 'Full Stack Development',
    description: 'End-to-end application development from React frontends to Node.js APIs and database design.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    icon: PenTool,
    title: 'UI/UX Engineering',
    description: 'Translating design intent into pixel-perfect, accessible, responsive interfaces that users love.',
    tags: ['Figma', 'Tailwind', 'Framer Motion', 'a11y'],
  },
  {
    icon: BarChart2,
    title: 'Data Science & ML',
    description: 'Extracting meaningful patterns from data — from EDA and visualization to model deployment.',
    tags: ['Python', 'pandas', 'scikit-learn', 'TensorFlow'],
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'Deploying and scaling applications on AWS with containerization and CI/CD pipelines.',
    tags: ['AWS', 'Docker', 'Git', 'CI/CD'],
  },
  {
    icon: Zap,
    title: 'Performance Engineering',
    description: 'Obsessive about Core Web Vitals, render optimization, and making every millisecond count.',
    tags: ['Profiling', 'Bundle size', 'Caching', 'Web Vitals'],
  },
  {
    icon: Shield,
    title: 'Security & Best Practices',
    description: 'Writing secure code with OWASP principles, threat modeling, and vulnerability awareness.',
    tags: ['OWASP', 'Auth', 'Encryption', 'Pentesting'],
  },
];

function StrengthCard({ icon: Icon, title, description, tags }) {
  return (
    <TiltCard maxTilt={5}>
      <motion.div
        className="group relative h-full overflow-hidden rounded-xl border border-border bg-card p-6
                   transition-all duration-300 hover:border-accent/30 hover:shadow-lg"
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 350, damping: 24 }}
      >
        {/* Hover glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(37,99,235,0.08) 0%, transparent 65%)' }}
        />

        {/* Animated left accent bar */}
        <div className="absolute inset-y-0 left-0 w-0.5 rounded-l-xl bg-accent/15 transition-colors duration-300 group-hover:bg-accent/60" />

        <div className="pl-4">
          {/* Icon */}
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface transition-colors duration-300 group-hover:border-accent/30 group-hover:bg-accent/5">
            <Icon size={18} className="text-accent transition-transform duration-300 group-hover:scale-110" />
          </div>

          {/* Title */}
          <h4 className="mb-2 font-semibold text-foreground">{title}</h4>

          {/* Description */}
          <p className="mb-4 text-sm leading-[1.7] text-foreground-secondary">{description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border/80 bg-surface px-2 py-0.5 text-[10px] font-mono text-foreground-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
}

export function AboutStrengths() {
  return (
    <div className="py-20 md:py-28">
      <Container>
        {/* Heading */}
        <div className="mb-12">
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              What I Bring
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h3 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Core Competencies
            </h3>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground-secondary">
              Six areas where I consistently deliver — built through real projects,
              not just coursework.
            </p>
          </FadeIn>
        </div>

        {/* Grid */}
        <StaggerContainer
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.065}
        >
          {STRENGTHS.map((s) => (
            <StaggerItem key={s.title} y={20}>
              <StrengthCard {...s} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </div>
  );
}
