import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Briefcase } from 'lucide-react';
import { Container } from '@/components/layout';
import { FadeIn, FadeInScale, RevealMask, TiltCard } from '@/components/animations';
import { EASE_OUT } from '@/lib/animation';

const PROFILE_URL =
  'https://raw.githubusercontent.com/Thiru7869/New_Portfolio/main/profile%20picture.jpeg';

const FACTS = [
  { icon: MapPin,         label: 'Venkatagiri, Andhra Pradesh' },
  { icon: GraduationCap, label: 'MBA Data Science — Amity University' },
  { icon: Briefcase,     label: 'Available for full-time roles' },
];

export function AboutIntro() {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="py-20 md:py-32">
      <Container>

        {/* Section label */}
        <FadeIn>
          <p className="mb-10 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
            02 — About Me
          </p>
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-[380px_1fr] lg:gap-20 xl:grid-cols-[420px_1fr]">

          {/* ── Left: profile photo ───────────────────────────── */}
          <FadeIn delay={0.04} y={0} x={-16}>
            <div className="relative mx-auto max-w-[340px] lg:mx-0 lg:max-w-none">
              <TiltCard maxTilt={5}>
                {/* Outer frame */}
                <div className="group relative overflow-hidden rounded-2xl border border-border shadow-2xl">
                  {/* Image with hover-zoom */}
                  <motion.div
                    className="relative aspect-square overflow-hidden"
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 26 }}
                  >
                    {/* Skeleton */}
                    <motion.div
                      className="absolute inset-0 bg-surface"
                      animate={{ opacity: imgLoaded ? 0 : 1 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="flex h-full items-center justify-center">
                        <span className="select-none text-3xl font-semibold tracking-tight text-foreground-muted opacity-20">
                          TNP
                        </span>
                      </div>
                    </motion.div>

                    <motion.img
                      src={PROFILE_URL}
                      alt="Thirumala Narasimha Poluru"
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                      onLoad={() => setImgLoaded(true)}
                      animate={{ opacity: imgLoaded ? 1 : 0 }}
                      transition={{ duration: 0.45, ease: EASE_OUT }}
                    />

                    {/* Subtle overlay tint on hover */}
                    <div className="absolute inset-0 bg-accent/0 transition-colors duration-300 group-hover:bg-accent/3" />
                  </motion.div>
                </div>
              </TiltCard>

              {/* Floating fact chip — top right corner */}
              <motion.div
                className="absolute -right-4 -top-4 z-10 sm:-right-6 sm:-top-5"
                initial={{ opacity: 0, scale: 0.7, rotate: 8 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ type: 'spring', stiffness: 250, damping: 22, delay: 0.3 }}
              >
                <div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 shadow-lg">
                  <motion.span
                    className="h-2 w-2 rounded-full bg-emerald-500"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.35, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.8 }}
                  />
                  <span className="text-[10px] font-medium text-foreground-secondary">Open to Work</span>
                </div>
              </motion.div>

              {/* Floating chip — bottom left */}
              <motion.div
                className="absolute -bottom-4 -left-4 z-10 sm:-bottom-5 sm:-left-6"
                initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ type: 'spring', stiffness: 250, damping: 22, delay: 0.45 }}
              >
                <div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 shadow-lg">
                  <span className="text-[10px] font-mono text-foreground-muted">8+ Internships</span>
                  <span className="text-accent">·</span>
                  <span className="text-[10px] font-mono text-foreground-muted">25+ Projects</span>
                </div>
              </motion.div>
            </div>
          </FadeIn>

          {/* ── Right: text content ───────────────────────────── */}
          <div className="flex flex-col justify-center">

            <FadeIn delay={0.08}>
              <h2 className="mb-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
                style={{ letterSpacing: '-0.02em' }}>
                More Than Just Code
              </h2>
            </FadeIn>

            <FadeIn delay={0.16} y={12}>
              <p className="mb-4 text-[15px] leading-[1.78] text-foreground-secondary">
                I'm a Full Stack Developer and aspiring Data Scientist from Venkatagiri, Andhra Pradesh.
                My journey began with a{' '}
                <span className="font-medium text-foreground">9.3 GPA in secondary school</span>
                {' '}— not because I was chasing grades, but because I was genuinely obsessed with how
                systems work.
              </p>
            </FadeIn>

            <FadeIn delay={0.22} y={12}>
              <p className="mb-4 text-[15px] leading-[1.78] text-foreground-secondary">
                Technology became my language. From writing my first Python script to architecting
                production-grade web applications, I've always been drawn to the intersection of{' '}
                <span className="font-medium text-foreground">elegant design and robust engineering</span>.
              </p>
            </FadeIn>

            <FadeIn delay={0.28} y={12}>
              <p className="mb-8 text-[15px] leading-[1.78] text-foreground-secondary">
                Today I hold dual expertise — B.Tech CSE gives me the engineering foundation;
                MBA in Data Science gives me the business lens. Together, they let me build
                solutions that{' '}
                <span className="font-medium text-foreground">don't just work technically —
                they solve real problems</span>.
              </p>
            </FadeIn>

            {/* Quick facts */}
            <FadeIn delay={0.34} y={8}>
              <div className="space-y-2.5" role="list" aria-label="Key facts">
                {FACTS.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3" role="listitem">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border bg-surface">
                      <Icon size={12} className="text-accent" />
                    </div>
                    <span className="text-sm text-foreground-secondary">{label}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

          </div>
        </div>
      </Container>
    </div>
  );
}
