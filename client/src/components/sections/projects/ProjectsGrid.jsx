import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Container } from '@/components/layout';
import { FadeIn, TiltCard } from '@/components/animations';
import { cn } from '@/lib/utils';
import { ALL_PROJECTS, FILTERS } from './projects-data';

/* ─── Color maps — full static strings for Tailwind scanner ─────────────── */

const GLOW_CLASSES = {
  'text-blue-400':    'group-hover:shadow-[0_0_32px_rgba(96,165,250,0.12)]',
  'text-violet-400':  'group-hover:shadow-[0_0_32px_rgba(167,139,250,0.12)]',
  'text-emerald-400': 'group-hover:shadow-[0_0_32px_rgba(52,211,153,0.12)]',
  'text-cyan-400':    'group-hover:shadow-[0_0_32px_rgba(34,211,238,0.12)]',
  'text-orange-400':  'group-hover:shadow-[0_0_32px_rgba(251,146,60,0.12)]',
  'text-rose-400':    'group-hover:shadow-[0_0_32px_rgba(251,113,133,0.12)]',
};

/* ─── Project card ───────────────────────────────────────────────────────── */

function ProjectCard({ project }) {
  const glowCls = GLOW_CLASSES[project.colorText] ?? '';
  const isFeatured = 'problem' in project;

  return (
    <TiltCard maxTilt={5} className="h-full">
      <article
        className={cn(
          'group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-surface/60',
          'transition-all duration-300 hover:-translate-y-1',
          'border-border/60 hover:border-border',
          glowCls,
        )}
      >
        {/* Left accent */}
        <div
          className={cn(
            'absolute inset-y-0 left-0 w-0.5 rounded-l-2xl transition-colors duration-300',
            'bg-accent/10 group-hover:bg-accent/50',
          )}
        />

        {/* Header strip */}
        <div className={cn('flex items-center justify-between px-5 pt-5 pb-3')}>
          <span className={cn('text-xs font-semibold uppercase tracking-wider', project.colorText)}>
            {project.categoryLabel}
          </span>
          {isFeatured && (
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
                project.colorBg,
                project.colorBorder,
                project.colorText,
                'border',
              )}
            >
              Featured
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-3 px-5 pb-4">
          <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-foreground/90 transition-colors">
            {project.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-foreground-secondary">
            {project.description ?? project.tagline}
          </p>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {project.tech.slice(0, 5).map((t) => (
              <span
                key={t}
                className="rounded-md border border-border/50 bg-surface px-2 py-0.5 text-[10px] font-medium text-foreground-secondary"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto border-t border-border/40 px-5 py-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-1.5 text-xs font-medium transition-colors',
              project.colorText,
              'opacity-70 hover:opacity-100',
            )}
            aria-label={`View ${project.title} on GitHub`}
          >
            View on GitHub
            <ExternalLink size={11} />
          </a>
        </div>
      </article>
    </TiltCard>
  );
}

/* ─── Filter tab ─────────────────────────────────────────────────────────── */

function FilterTab({ filter, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        'relative px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 rounded-lg',
        isActive ? 'text-foreground' : 'text-foreground-secondary hover:text-foreground',
      )}
    >
      {isActive && (
        <motion.span
          layoutId="projects-filter-pill"
          className="absolute inset-0 rounded-lg border border-accent/20 bg-accent/8"
          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
        />
      )}
      <span className="relative">{filter.label}</span>
    </button>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export function ProjectsGrid() {
  const [active, setActive] = useState('all');

  const filtered =
    active === 'all'
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.category === active);

  return (
    <div className="pb-24 md:pb-32">
      <Container>
        {/* Sub-heading + filters */}
        <FadeIn className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground-secondary">
              All Projects
            </p>
            <h3 className="mt-1 text-xl font-semibold text-foreground">
              Full portfolio
            </h3>
          </div>

          {/* Filter tabs */}
          <div
            className="flex flex-wrap gap-1 rounded-xl border border-border/40 bg-surface/40 p-1"
            role="group"
            aria-label="Filter projects by category"
          >
            {FILTERS.map((f) => (
              <FilterTab
                key={f.id}
                filter={f}
                isActive={active === f.id}
                onClick={() => setActive(f.id)}
              />
            ))}
          </div>
        </FadeIn>

        {/* Grid — AnimatePresence handles enter/exit */}
        <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -8 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 text-center text-sm text-foreground-secondary"
          >
            No projects in this category yet.
          </motion.p>
        )}
      </Container>
    </div>
  );
}
