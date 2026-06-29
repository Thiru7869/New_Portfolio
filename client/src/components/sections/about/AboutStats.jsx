import { motion } from 'framer-motion';
import { Briefcase, Folder, CheckCircle2, Star, Cpu, CalendarDays } from 'lucide-react';
import { CountUp, StaggerContainer, StaggerItem } from '@/components/animations';
import { Container } from '@/components/layout';
import { EASE_OUT } from '@/lib/animation';

const STATS = [
  { to: 8,   suffix: '+', label: 'Internships',   sub: 'Industry roles',      icon: Briefcase    },
  { to: 25,  suffix: '+', label: 'Projects',       sub: 'Built & shipped',     icon: Folder       },
  { to: 500, suffix: '+', label: 'Solutions',      sub: 'On Chegg platform',   icon: CheckCircle2 },
  { to: 95,  suffix: '%', label: 'Satisfaction',   sub: 'Average rating',      icon: Star         },
  { to: 10,  suffix: '+', label: 'Tech Stacks',    sub: 'Actively mastered',   icon: Cpu          },
  { to: 3,   suffix: '+', label: 'Years Coding',   sub: 'Continuous growth',   icon: CalendarDays },
];

function StatCard({ to, suffix, label, sub, icon: Icon }) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl border border-border bg-background p-5
                 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/25 hover:shadow-md"
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 380, damping: 26 }}
    >
      {/* Corner accent glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(circle at 15% 15%, rgba(37,99,235,0.07) 0%, transparent 60%)' }}
      />

      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface">
          <Icon size={14} className="text-accent" />
        </div>
        <span className="text-[9px] font-mono uppercase tracking-[0.08em] text-foreground-muted">
          {sub}
        </span>
      </div>

      <CountUp
        to={to}
        suffix={suffix}
        duration={1.5}
        className="block text-2xl font-semibold tabular-nums text-foreground sm:text-3xl"
      />
      <p className="mt-1 text-xs font-medium text-foreground-secondary">{label}</p>
    </motion.div>
  );
}

export function AboutStats() {
  return (
    <div className="border-y border-border/60 bg-surface/40">
      <Container>
        <div className="py-10">
          <StaggerContainer
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
            stagger={0.065}
          >
            {STATS.map((s) => (
              <StaggerItem key={s.label}>
                <StatCard {...s} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </div>
  );
}
