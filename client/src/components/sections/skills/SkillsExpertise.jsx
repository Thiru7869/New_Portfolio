import { motion } from 'framer-motion';
import { Code2, Server, TrendingUp, Brain, Cloud, Database } from 'lucide-react';
import { Container } from '@/components/layout';
import { FadeIn, StaggerContainer, StaggerItem, TiltCard } from '@/components/animations';

// Each card's `colorDot` / `colorText` / `colorBg` use complete class strings
// so Tailwind's static scanner picks them up at build time.
const EXPERTISE = [
  {
    icon: Code2,
    title: 'Frontend Engineering',
    description:
      'Crafting performant, accessible UIs with React 19, Tailwind, and Framer Motion that users actually enjoy using.',
    tech: ['React 19', 'JavaScript', 'Tailwind CSS', 'Framer Motion'],
    colorText: 'text-blue-400',
    colorBg: 'bg-blue-400/8',
    colorBorder: 'border-blue-400/25',
    glowBg: 'rgba(96,165,250,0.07)',
  },
  {
    icon: Server,
    title: 'Backend Engineering',
    description:
      'Building scalable REST APIs and server architectures with Node.js and Python that handle real production loads.',
    tech: ['Node.js', 'Express.js', 'Django', 'REST APIs'],
    colorText: 'text-violet-400',
    colorBg: 'bg-violet-400/8',
    colorBorder: 'border-violet-400/25',
    glowBg: 'rgba(167,139,250,0.07)',
  },
  {
    icon: TrendingUp,
    title: 'Data Science',
    description:
      'Turning raw datasets into actionable insights through EDA, statistical modeling, and compelling visualizations.',
    tech: ['Python', 'pandas', 'NumPy', 'Matplotlib'],
    colorText: 'text-emerald-400',
    colorBg: 'bg-emerald-400/8',
    colorBorder: 'border-emerald-400/25',
    glowBg: 'rgba(52,211,153,0.07)',
  },
  {
    icon: Brain,
    title: 'Machine Learning',
    description:
      'Designing, training, and deploying ML models for classification, regression, computer vision, and NLP tasks.',
    tech: ['TensorFlow', 'scikit-learn', 'Keras', 'OpenCV'],
    colorText: 'text-rose-400',
    colorBg: 'bg-rose-400/8',
    colorBorder: 'border-rose-400/25',
    glowBg: 'rgba(251,113,133,0.07)',
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description:
      'Deploying and scaling applications on AWS with containerization, CI/CD pipelines, and infrastructure monitoring.',
    tech: ['AWS', 'Docker', 'GitHub Actions', 'Linux'],
    colorText: 'text-cyan-400',
    colorBg: 'bg-cyan-400/8',
    colorBorder: 'border-cyan-400/25',
    glowBg: 'rgba(34,211,238,0.07)',
  },
  {
    icon: Database,
    title: 'Database Systems',
    description:
      'Designing efficient schemas, writing complex queries, and managing both relational and document databases.',
    tech: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis'],
    colorText: 'text-amber-400',
    colorBg: 'bg-amber-400/8',
    colorBorder: 'border-amber-400/25',
    glowBg: 'rgba(251,191,36,0.07)',
  },
];

function ExpertiseCard({ icon: Icon, title, description, tech, colorText, colorBg, colorBorder, glowBg }) {
  return (
    <TiltCard maxTilt={5}>
      <motion.div
        className="group relative h-full overflow-hidden rounded-xl border border-border bg-card p-6
                   transition-colors duration-300 hover:border-accent/25"
        whileHover="hovered"
        variants={{ hovered: { y: -5 } }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      >
        {/* Per-card glow — uses inline style for dynamic color */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `radial-gradient(ellipse at 10% 0%, ${glowBg} 0%, transparent 65%)` }}
        />

        {/* Icon with spring rotate on hover */}
        <motion.div
          className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border ${colorBorder} ${colorBg}`}
          variants={{ hovered: { scale: 1.1, rotate: 8 } }}
          transition={{ type: 'spring', stiffness: 260, damping: 15 }}
        >
          <Icon size={19} className={colorText} />
        </motion.div>

        <h4 className="mb-2 font-semibold tracking-tight text-foreground">{title}</h4>
        <p className="mb-5 text-sm leading-[1.72] text-foreground-secondary">{description}</p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border/70 bg-surface px-2.5 py-0.5 text-[10px] font-mono text-foreground-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </TiltCard>
  );
}

export function SkillsExpertise() {
  return (
    <div className="py-20 md:py-28">
      <Container>
        <div className="mb-12">
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              What I Do
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h3 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Featured Expertise
            </h3>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground-secondary">
              Six specializations built through real production work — not just coursework.
            </p>
          </FadeIn>
        </div>

        <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.065}>
          {EXPERTISE.map((e) => (
            <StaggerItem key={e.title} y={20}>
              <ExpertiseCard {...e} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </div>
  );
}
