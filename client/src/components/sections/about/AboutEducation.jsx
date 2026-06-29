import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { Container } from '@/components/layout';
import { FadeIn, StaggerContainer, StaggerItem, TiltCard } from '@/components/animations';

const EDUCATION = [
  {
    degree: 'MBA in Data Science',
    status: 'Ongoing',
    institution: 'Amity University',
    location: 'Noida, UP',
    period: '2024 — Present',
    description:
      'Merging engineering depth with business intelligence — machine learning, analytics, and data-driven decision making at scale.',
    tags: ['ML', 'Analytics', 'Business Intelligence', 'Python'],
    gpa: null,
    monogram: 'AU',
    accent: true,
  },
  {
    degree: 'B.Tech Computer Science',
    status: 'Completed',
    institution: 'Annamacharya Institute of Technology and Sciences',
    location: 'Tirupati, AP',
    period: '2020 — 2024',
    description:
      'Four years building the foundation — algorithms, systems design, full-stack development, and problem solving under pressure.',
    tags: ['DSA', 'React', 'Java', 'Databases', 'Networks'],
    gpa: null,
    monogram: 'AITS',
    accent: false,
  },
  {
    degree: 'Intermediate (MPC)',
    status: 'Completed',
    institution: 'Amaravathi Junior College',
    location: 'Venkatagiri, AP',
    period: '2018 — 2020',
    description:
      'Mathematics, Physics, and Chemistry — the analytical framework that now drives every technical decision.',
    tags: ['Mathematics', 'Physics', 'Chemistry'],
    gpa: '6.5 GPA',
    monogram: 'AJC',
    accent: false,
  },
  {
    degree: 'Secondary Education (SSC)',
    status: 'Completed',
    institution: 'Sri Chaitanya Techno School',
    location: 'Venkatagiri, AP',
    period: '2017 — 2018',
    description:
      'Where the love for learning first crystallized — academic excellence rooted in genuine curiosity.',
    tags: ['Sciences', 'Mathematics', 'English'],
    gpa: '9.3 GPA',
    monogram: 'SC',
    accent: false,
  },
];

function EducationCard({ degree, status, institution, location, period, description, tags, gpa, monogram, accent }) {
  return (
    <TiltCard maxTilt={4}>
      <motion.div
        className="group relative h-full overflow-hidden rounded-xl border border-border bg-card p-6
                   transition-all duration-300 hover:border-accent/30 hover:shadow-lg"
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 350, damping: 24 }}
      >
        {/* Hover glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.08) 0%, transparent 70%)' }}
        />

        {/* Top row: monogram + period + status */}
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-xs font-bold tracking-tight
            ${accent
              ? 'border-accent/30 bg-accent/8 text-accent'
              : 'border-border bg-surface text-foreground-secondary'
            }`}
          >
            {monogram}
          </div>

          <div className="text-right">
            <div className="text-[10px] font-mono text-foreground-muted">{period}</div>
            <div className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em]
              ${accent
                ? 'bg-accent/10 text-accent'
                : status === 'Completed'
                  ? 'bg-emerald-500/10 text-emerald-500'
                  : 'bg-border text-foreground-muted'
              }`}
            >
              {status}
            </div>
          </div>
        </div>

        {/* Degree + institution */}
        <h4 className="mb-1 font-semibold leading-tight text-foreground">{degree}</h4>
        <div className="mb-1 flex items-center gap-1.5">
          <GraduationCap size={11} className="shrink-0 text-accent" />
          <p className="text-[11px] font-medium text-foreground-secondary">{institution}</p>
        </div>
        <p className="mb-4 text-[10px] font-mono text-foreground-muted">{location}</p>

        {/* Description */}
        <p className="mb-4 text-sm leading-[1.7] text-foreground-secondary">{description}</p>

        {/* Footer: tags + GPA */}
        <div className="flex items-end justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span key={t} className="rounded-full border border-border/80 px-2 py-0.5 text-[9px] font-mono text-foreground-muted">
                {t}
              </span>
            ))}
          </div>
          {gpa && (
            <span className="shrink-0 rounded-full border border-emerald-500/30 bg-emerald-500/8 px-2.5 py-1 text-[10px] font-semibold text-emerald-500">
              {gpa}
            </span>
          )}
        </div>
      </motion.div>
    </TiltCard>
  );
}

export function AboutEducation() {
  return (
    <div className="py-20 md:py-28">
      <Container>
        {/* Heading */}
        <div className="mb-12">
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              Academic Journey
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h3 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Education
            </h3>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground-secondary">
              Every institution, a new chapter. Every degree, a new lens for problem solving.
            </p>
          </FadeIn>
        </div>

        {/* Grid */}
        <StaggerContainer
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          stagger={0.08}
        >
          {EDUCATION.map((e) => (
            <StaggerItem key={e.degree} y={20}>
              <EducationCard {...e} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </div>
  );
}
