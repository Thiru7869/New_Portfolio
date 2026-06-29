import { motion } from 'framer-motion';
import { Container } from '@/components/layout';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { cn } from '@/lib/utils';

// Full static class strings required — Tailwind needs to scan these at build time.
const COLOR_MAP = {
  blue:    { dot: 'bg-blue-400',    text: 'text-blue-400',    bg: 'bg-blue-400/8',    border: 'border-blue-400/30'    },
  violet:  { dot: 'bg-violet-400',  text: 'text-violet-400',  bg: 'bg-violet-400/8',  border: 'border-violet-400/30'  },
  orange:  { dot: 'bg-orange-400',  text: 'text-orange-400',  bg: 'bg-orange-400/8',  border: 'border-orange-400/30'  },
  emerald: { dot: 'bg-emerald-400', text: 'text-emerald-400', bg: 'bg-emerald-400/8', border: 'border-emerald-400/30' },
  cyan:    { dot: 'bg-cyan-400',    text: 'text-cyan-400',    bg: 'bg-cyan-400/8',    border: 'border-cyan-400/30'    },
  rose:    { dot: 'bg-rose-400',    text: 'text-rose-400',    bg: 'bg-rose-400/8',    border: 'border-rose-400/30'    },
  amber:   { dot: 'bg-amber-400',   text: 'text-amber-400',   bg: 'bg-amber-400/8',   border: 'border-amber-400/30'   },
};

const CATEGORIES = [
  {
    id: 'frontend',
    label: 'Frontend',
    color: 'blue',
    count: 6,
    tech: [
      { name: 'React.js',      primary: true  },
      { name: 'JavaScript',    primary: true  },
      { name: 'Tailwind CSS',  primary: true  },
      { name: 'HTML5',         primary: false },
      { name: 'CSS3',          primary: false },
      { name: 'Framer Motion', primary: false },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    color: 'violet',
    count: 5,
    tech: [
      { name: 'Node.js',     primary: true  },
      { name: 'Express.js',  primary: true  },
      { name: 'Django',      primary: true  },
      { name: 'REST APIs',   primary: false },
      { name: 'JWT / Auth',  primary: false },
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    color: 'orange',
    count: 5,
    tech: [
      { name: 'Python',     primary: true  },
      { name: 'Java',       primary: true  },
      { name: 'JavaScript', primary: true  },
      { name: 'C',          primary: false },
      { name: 'C++',        primary: false },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    color: 'emerald',
    count: 4,
    tech: [
      { name: 'MongoDB',    primary: true  },
      { name: 'MySQL',      primary: true  },
      { name: 'PostgreSQL', primary: false },
      { name: 'Redis',      primary: false },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    color: 'cyan',
    count: 5,
    tech: [
      { name: 'AWS',             primary: true  },
      { name: 'Docker',          primary: true  },
      { name: 'GitHub Actions',  primary: false },
      { name: 'Linux',           primary: false },
      { name: 'Vercel',          primary: false },
    ],
  },
  {
    id: 'aiml',
    label: 'AI / Machine Learning',
    color: 'rose',
    count: 6,
    tech: [
      { name: 'TensorFlow',  primary: true  },
      { name: 'scikit-learn',primary: true  },
      { name: 'pandas',      primary: true  },
      { name: 'OpenCV',      primary: false },
      { name: 'Keras',       primary: false },
      { name: 'NLP',         primary: false },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Ecosystem',
    color: 'amber',
    count: 5,
    tech: [
      { name: 'Git & GitHub', primary: true  },
      { name: 'VS Code',      primary: false },
      { name: 'Figma',        primary: false },
      { name: 'Postman',      primary: false },
      { name: 'Jupyter',      primary: false },
    ],
  },
];

function TechChip({ name, primary, colors }) {
  return (
    <motion.div
      className={cn(
        'inline-flex cursor-default items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors duration-200',
        primary
          ? `${colors.border} ${colors.bg} font-medium text-foreground`
          : 'border-border/70 bg-surface text-foreground-secondary'
      )}
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 420, damping: 26 }}
    >
      <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', primary ? colors.dot : 'bg-foreground-muted/40')} />
      {name}
    </motion.div>
  );
}

function CategoryBlock({ label, color, count, tech, index }) {
  const colors = COLOR_MAP[color];

  return (
    <motion.div
      className="rounded-xl border border-border bg-card/60 p-6"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: 'spring', stiffness: 75, damping: 20, delay: 0.06 * index }}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className={cn('h-2 w-2 rounded-full', colors.dot)} />
          <span className={cn('text-xs font-semibold uppercase tracking-[0.1em]', colors.text)}>
            {label}
          </span>
        </div>
        <span className="rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] font-mono text-foreground-muted">
          {count} techs
        </span>
      </div>

      {/* Tech chips — stagger within each block */}
      <div className="flex flex-wrap gap-2">
        {tech.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ type: 'spring', stiffness: 250, damping: 22, delay: 0.06 * index + 0.04 * i }}
          >
            <TechChip name={t.name} primary={t.primary} colors={colors} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function SkillsCategories() {
  return (
    <div className="border-y border-border/60 bg-surface/30 py-20 md:py-24">
      <Container>
        <div className="mb-12">
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              The Full Stack
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h3 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Technology Landscape
            </h3>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground-secondary">
              Organized by specialty — primary technologies{' '}
              <span className="font-medium text-foreground">highlighted</span>,
              supporting tools alongside.
            </p>
          </FadeIn>
        </div>

        {/* 2-column grid — collapses to 1 on mobile */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {CATEGORIES.map((cat, i) => (
            <CategoryBlock key={cat.id} {...cat} index={i} />
          ))}
        </div>
      </Container>
    </div>
  );
}
