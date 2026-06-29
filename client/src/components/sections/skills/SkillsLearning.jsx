import { motion } from 'framer-motion';
import { Container } from '@/components/layout';
import { FadeIn } from '@/components/animations';
import { cn } from '@/lib/utils';
import { EASE_OUT } from '@/lib/animation';

const STATUS_STYLES = {
  Active:    { dot: 'bg-emerald-500', badge: 'border-emerald-500/30 bg-emerald-500/8 text-emerald-500' },
  Deepening: { dot: 'bg-accent',      badge: 'border-accent/30 bg-accent/8 text-accent'                },
  Upcoming:  { dot: 'bg-foreground-muted/40', badge: 'border-border bg-surface text-foreground-muted'  },
};

const LEARNING = [
  {
    status: 'Active',
    title: 'Advanced React',
    subtitle: 'React 19 Patterns',
    description:
      'Server components, streaming, concurrent features, advanced hooks composition, and architectural patterns for large-scale apps.',
    topics: ['Server Components', 'Concurrent Rendering', 'Custom Hooks', 'Performance'],
  },
  {
    status: 'Active',
    title: 'AI Engineering',
    subtitle: 'LLMs & Pipelines',
    description:
      'Building production AI features — RAG pipelines, vector databases, embedding models, and LLM API integration.',
    topics: ['LLMs', 'RAG', 'Vector DBs', 'Embeddings'],
  },
  {
    status: 'Deepening',
    title: 'Cloud Architecture',
    subtitle: 'AWS Solutions Architect',
    description:
      'Designing resilient, cost-efficient cloud infrastructure with AWS services — EC2, Lambda, RDS, S3, CloudFront.',
    topics: ['EC2', 'Lambda', 'RDS', 'S3', 'CloudFront'],
  },
  {
    status: 'Upcoming',
    title: 'System Design',
    subtitle: 'Distributed Systems',
    description:
      'Scalability patterns, microservices communication, event-driven architecture, and designing for millions of users.',
    topics: ['Microservices', 'Event-driven', 'Caching', 'Load Balancing'],
  },
];

function LearningCard({ item, index }) {
  const styles = STATUS_STYLES[item.status];

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ type: 'spring', stiffness: 75, damping: 20, delay: 0.08 + index * 0.1 }}
    >
      {/* Node — sits on the connecting track */}
      <div className="relative z-10 mx-auto mb-4 flex h-8 w-8 items-center justify-center">
        <motion.div
          className={cn('h-3 w-3 rounded-full border-2 border-background', styles.dot)}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 380, damping: 20, delay: 0.12 + index * 0.1 }}
        />
        {/* Outer ring */}
        <motion.div
          className="absolute h-7 w-7 rounded-full border border-border/50 bg-background"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + index * 0.1 }}
        />
      </div>

      {/* Card */}
      <motion.div
        className="group relative overflow-hidden rounded-xl border border-border bg-card p-5
                   transition-all duration-300 hover:border-accent/25 hover:shadow-md"
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 350, damping: 24 }}
      >
        {/* Hover glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.07) 0%, transparent 70%)' }}
        />

        {/* Status badge */}
        <div className={cn('mb-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold', styles.badge)}>
          <span className={cn('h-1.5 w-1.5 rounded-full', styles.dot)} />
          {item.status}
        </div>

        <h4 className="mb-0.5 font-semibold text-foreground">{item.title}</h4>
        <p className="mb-3 text-[11px] font-mono text-foreground-muted">{item.subtitle}</p>
        <p className="mb-4 text-sm leading-[1.7] text-foreground-secondary">{item.description}</p>

        {/* Topics */}
        <div className="flex flex-wrap gap-1.5">
          {item.topics.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border/60 bg-surface px-2 py-0.5 text-[9px] font-mono text-foreground-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function SkillsLearning() {
  return (
    <div className="py-20 md:py-28">
      <Container>
        <div className="mb-12">
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              Always Growing
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h3 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Current Learning Path
            </h3>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground-secondary">
              A deliberate roadmap — not random tutorials. Every topic chosen for compounding impact.
            </p>
          </FadeIn>
        </div>

        {/* Roadmap layout */}
        <div className="relative">
          {/* Horizontal connecting track — desktop only */}
          <div
            className="absolute left-0 right-0 top-4 hidden h-px bg-border/20 md:block"
            aria-hidden="true"
          >
            <motion.div
              className="absolute inset-0 origin-left"
              style={{
                background:
                  'linear-gradient(to right, rgba(16,185,129,0.5), rgba(37,99,235,0.4), rgba(37,99,235,0.15), transparent)',
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.5, delay: 0.2, ease: EASE_OUT }}
            />
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {LEARNING.map((item, i) => (
              <LearningCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
