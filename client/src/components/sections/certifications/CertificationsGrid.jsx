import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Container } from '@/components/layout';
import { FadeIn, TiltCard, RevealMask } from '@/components/animations';
import { cn } from '@/lib/utils';
import { CERTIFICATES } from './certifications-data';
import { EASE_OUT } from '@/lib/animation';

/* ─── Verified seal ──────────────────────────────────────────────────────── */

function VerifiedSeal() {
  return (
    <motion.div
      className="flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-2 py-0.5"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.3 }}
    >
      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      <span className="text-[9px] font-semibold text-emerald-400">Certified</span>
    </motion.div>
  );
}

/* ─── Single certificate card ────────────────────────────────────────────── */

function CertCard({ cert, index }) {
  const link = cert.imageUrl ?? cert.verifyUrl;

  return (
    <div className="mb-5 break-inside-avoid">
      <RevealMask direction="bottom" delay={0.04 + index * 0.055} duration={0.55}>
        <TiltCard maxTilt={5}>
          <article
            className={cn(
              'group relative overflow-hidden rounded-2xl border border-border/60 bg-surface/60',
              'transition-all duration-300 hover:-translate-y-1 hover:border-border',
              'hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
            )}
            aria-label={`${cert.title} certificate from ${cert.issuer}`}
          >
            {/* Left accent bar */}
            <div className="absolute inset-y-0 left-0 w-0.5 rounded-l-2xl bg-accent/12 transition-colors duration-300 group-hover:bg-accent/55" />

            {/* Hover glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: `radial-gradient(ellipse at 0% 0%, ${cert.colorGlow} 0%, transparent 65%)` }}
              aria-hidden="true"
            />

            {/* Category header strip */}
            <div className={cn('flex items-center justify-between rounded-t-2xl px-4 py-3', cert.colorBg)}>
              <div className="flex items-center gap-2">
                <span className="text-base leading-none" role="img" aria-label={cert.issuer}>
                  {cert.icon}
                </span>
                <span className={cn('text-[10px] font-bold uppercase tracking-widest', cert.colorText)}>
                  {cert.categoryLabel}
                </span>
              </div>
              <VerifiedSeal />
            </div>

            {/* Body */}
            <div className="px-5 pb-5 pt-3 pl-6">
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: 12, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.08 + index * 0.055, ease: EASE_OUT }}
                >
                  <h3 className="mb-0.5 text-[15px] font-semibold leading-snug text-foreground">
                    {cert.title}
                  </h3>
                </motion.div>
              </div>

              <FadeIn delay={0.12 + index * 0.055} y={6}>
                <p className="mb-3 text-[11px] font-medium text-foreground-secondary">
                  {cert.issuer}
                </p>
                <p className="mb-3.5 text-xs leading-relaxed text-foreground-secondary/80 line-clamp-2">
                  {cert.contribution}
                </p>
              </FadeIn>

              {/* Skills chips */}
              <FadeIn delay={0.17 + index * 0.055} y={4}>
                <div className="mb-4 flex flex-wrap gap-1">
                  {cert.skills.map((s) => (
                    <span
                      key={s}
                      className={cn(
                        'rounded-md border px-2 py-0.5 text-[9px] font-medium',
                        cert.colorChip,
                      )}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </FadeIn>

              {/* Footer link */}
              {link && (
                <FadeIn delay={0.2 + index * 0.055} y={4}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'inline-flex items-center gap-1.5 text-[11px] font-semibold transition-all duration-200',
                      cert.colorText,
                      'opacity-60 hover:opacity-100',
                    )}
                    aria-label={`View ${cert.title} certificate from ${cert.issuer}`}
                  >
                    {cert.imageUrl ? 'View Certificate' : 'Verify Credential'}
                    <ExternalLink size={10} />
                  </a>
                </FadeIn>
              )}
            </div>
          </article>
        </TiltCard>
      </RevealMask>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export function CertificationsGrid() {
  return (
    <div className="pb-4">
      <Container>
        {/* Sub-heading */}
        <div className="mb-10">
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              Verified Credentials
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h3
              className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
              style={{ letterSpacing: '-0.02em' }}
            >
              8 Certifications
            </h3>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground-secondary">
              Every certificate earned through active internship work — not passive courses.
              Each one maps directly to a shipped project.
            </p>
          </FadeIn>
        </div>

        {/* Masonry-style certificate layout using CSS columns */}
        <div
          className="columns-1 gap-5 sm:columns-2 lg:columns-3"
          role="list"
          aria-label="Certifications"
        >
          {CERTIFICATES.map((cert, i) => (
            <div key={cert.id} role="listitem">
              <CertCard cert={cert} index={i} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
