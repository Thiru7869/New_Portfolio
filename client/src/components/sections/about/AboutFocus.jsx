import { motion } from 'framer-motion';
import { ArrowRight, Target, Rocket } from 'lucide-react';
import { Container } from '@/components/layout';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { EASE_OUT } from '@/lib/animation';

const CURRENT = [
  'MBA Data Science — AI-driven business forecasting thesis',
  'Production portfolio with React 19 + Framer Motion + Node.js',
  'Merging full-stack depth with machine learning model serving',
  'Preparing for AWS Solutions Architect certification',
];

const VISION = [
  'Lead full-stack engineering at a data-driven company',
  'Bridge the gap between product and data science teams',
  'Build tools that simplify complex workflows for people',
  'Contribute meaningfully to open source developer tooling',
];

function FocusPanel({ icon: Icon, label, heading, items, accent, delay }) {
  return (
    <FadeIn delay={delay} y={20}>
      <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:border-accent/25 hover:shadow-lg">
        {/* Hover accent glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: 'radial-gradient(ellipse at 10% 0%, rgba(37,99,235,0.07) 0%, transparent 65%)' }}
        />

        {/* Icon pill */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5">
          <Icon size={13} className="text-accent" />
          <span className="text-[10px] font-mono font-medium uppercase tracking-[0.1em] text-accent">
            {label}
          </span>
        </div>

        <h3 className="mb-6 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {heading}
        </h3>

        <StaggerContainer className="space-y-3" stagger={0.06} delayChildren={delay + 0.1}>
          {items.map((item) => (
            <StaggerItem key={item} y={8}>
              <div className="flex items-start gap-3">
                <div
                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50"
                  aria-hidden="true"
                />
                <p className="text-sm leading-relaxed text-foreground-secondary">{item}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </FadeIn>
  );
}

export function AboutFocus() {
  return (
    <div className="pb-24 pt-0 md:pb-32">
      <Container>
        {/* Section heading */}
        <div className="mb-12">
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              What Drives Me
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h3 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Now & Next
            </h3>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground-secondary">
              Where I am today and where I'm deliberately heading.
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <FocusPanel
            icon={Target}
            label="Currently Building"
            heading="Present Focus"
            items={CURRENT}
            delay={0}
          />
          <FocusPanel
            icon={Rocket}
            label="Working Toward"
            heading="Future Vision"
            items={VISION}
            delay={0.1}
          />
        </div>
      </Container>
    </div>
  );
}
