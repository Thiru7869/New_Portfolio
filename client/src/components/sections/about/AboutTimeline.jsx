import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Container } from '@/components/layout';
import { FadeIn, TiltCard } from '@/components/animations';
import { cn } from '@/lib/utils';

const MILESTONES = [
  {
    period: '2017 — 2018',
    title: 'Academic Excellence',
    subtitle: 'Sri Chaitanya Techno School, Venkatagiri',
    description:
      '9.3 GPA in secondary education — where curiosity for mathematics and systematic thinking first took root. Not a score: a mindset.',
    tags: ['Mathematics', 'Sciences', 'Computers'],
    highlight: '9.3 GPA',
  },
  {
    period: '2018 — 2020',
    title: 'Analytical Foundation',
    subtitle: 'Amaravathi Junior College, Venkatagiri',
    description:
      'Mathematics, Physics, Chemistry — the logical framework that now drives every architectural decision. Learned to think in systems, not just answers.',
    tags: ['MPC Stream', 'Problem Solving', 'Analytical Thinking'],
    highlight: null,
  },
  {
    period: '2020 — 2024',
    title: 'Engineering Begins',
    subtitle: 'AITS Tirupati — B.Tech Computer Science',
    description:
      'Four years building the technical core. First Python scripts became full-stack applications, REST APIs, cloud deployments, and ML pipelines.',
    tags: ['React', 'Node.js', 'Python', 'Java', 'DSA'],
    highlight: 'B.Tech CSE',
  },
  {
    period: '2022 — 2023',
    title: 'Industry Immersion',
    subtitle: '7 Concurrent Internships',
    description:
      'AWS Cloud, Full Stack Python, Java Enterprise, Cybersecurity, Web Development × 2, and Public Speaking. Each role added a different dimension to my engineering mindset — 500+ Chegg solutions alongside.',
    tags: ['AWS', 'Python', 'Java', 'Security', 'Web Dev'],
    highlight: '7 Roles',
  },
  {
    period: '2024 — Present',
    title: 'A New Chapter',
    subtitle: 'Amity University Noida — MBA Data Science',
    description:
      'B.Tech complete. Now merging engineering depth with business intelligence — machine learning, analytics, and the ability to communicate insights to decision makers.',
    tags: ['Data Science', 'ML', 'Business Intelligence'],
    highlight: 'MBA',
  },
];

function TimelineDot({ index }) {
  return (
    <div className="absolute left-[13px] z-10 flex items-center justify-center"
      style={{ top: '20px' }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ type: 'spring', stiffness: 380, damping: 22, delay: 0.05 + index * 0.04 }}
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute h-5 w-5 rounded-full border border-accent/30"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + index * 0.04, duration: 0.3 }}
        />
        {/* Core dot */}
        <div className="relative h-2.5 w-2.5 rounded-full border-2 border-accent bg-background" />
      </motion.div>
    </div>
  );
}

function MilestoneCard({ item, index }) {
  return (
    <motion.div
      className="relative flex items-start pb-12 pl-10"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ type: 'spring', stiffness: 70, damping: 20, delay: 0.1 + index * 0.05 }}
    >
      <TimelineDot index={index} />

      <TiltCard maxTilt={3} className="w-full max-w-2xl">
        <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-md">
          {/* Animated left accent */}
          <div className="absolute inset-y-0 left-0 w-0.5 rounded-l-xl bg-accent/15 transition-colors duration-300 group-hover:bg-accent/50" />

          {/* Hover glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(37,99,235,0.06) 0%, transparent 60%)' }}
          />

          <div className="pl-4">
            {/* Header row */}
            <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
              <span className="font-mono text-[11px] font-semibold text-accent">{item.period}</span>
              {item.highlight && (
                <span className="rounded-full border border-accent/25 bg-accent/8 px-2.5 py-0.5 text-[10px] font-semibold text-accent">
                  {item.highlight}
                </span>
              )}
            </div>

            {/* Title + institution */}
            <h4 className="mb-1 text-[15px] font-semibold text-foreground">{item.title}</h4>
            <p className="mb-3 text-[11px] font-medium text-foreground-muted">{item.subtitle}</p>

            {/* Description */}
            <p className="mb-4 text-sm leading-[1.72] text-foreground-secondary">{item.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border/70 px-2 py-0.5 text-[9px] font-mono text-foreground-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export function AboutTimeline() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 25%'],
  });

  const lineScaleY = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div className="py-20 md:py-28">
      <Container>
        {/* Heading */}
        <div className="mb-12">
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              My Journey
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h3 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              The Story So Far
            </h3>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground-secondary">
              From a 9.3 GPA secondary student in Venkatagiri to 7 concurrent industry internships —
              each milestone deliberately chosen.
            </p>
          </FadeIn>
        </div>

        {/* Timeline container — scroll target */}
        <div ref={containerRef} className="relative">
          {/* Track line */}
          <div
            className="absolute bottom-4 left-[17px] top-4 w-px bg-border/25"
            aria-hidden="true"
          >
            {/* Scroll-drawn progress fill */}
            <motion.div
              className="absolute inset-0 origin-top bg-accent/50"
              style={{ scaleY: lineScaleY, willChange: 'transform' }}
            />
          </div>

          {/* Milestone items */}
          <div>
            {MILESTONES.map((item, i) => (
              <MilestoneCard key={item.period} item={item} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
