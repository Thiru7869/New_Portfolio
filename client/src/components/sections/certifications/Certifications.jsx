import { ExternalLink } from 'lucide-react';
import { AnimatedGridBackground, FadeIn, MagneticButton, AnimatedDivider } from '@/components/animations';
import { Container } from '@/components/layout';
import { cn } from '@/lib/utils';
import { CertificationsGrid }     from './CertificationsGrid';
import { AchievementHighlights }  from './AchievementHighlights';
import { RecognitionWall }        from './RecognitionWall';

const RESUME_URL = 'https://drive.google.com/file/d/1tf1CfdDaZpWJ4SvDiEV7sYd1Z4y-eBiY/view';
const CERTS_FOLDER = 'https://drive.google.com/drive/folders/1CeUNMpxUDLLAZ9WpRYlME_wbw_3AW7J_';

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-label="Certifications and Achievements"
      className="relative overflow-hidden"
    >
      {/* Shared background — matches portfolio visual language */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <AnimatedGridBackground dotOpacity={0.016} />
        {/* Top-left orb */}
        <div
          className="absolute -left-56 top-16 h-[700px] w-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 65%)' }}
        />
        {/* Bottom-right orb */}
        <div
          className="absolute -right-48 bottom-20 h-[600px] w-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Section header ── */}
      <div className="pt-24 md:pt-32">
        <Container>
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              06 — Certifications & Achievements
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2
              className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
              style={{ letterSpacing: '-0.02em' }}
            >
              Credentials & Recognition
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground-secondary">
              Eight organizations. Eight certificates. Each earned through active project work,
              not passive study — a record of continuous learning across cloud, security,
              full-stack, and communication.
            </p>
          </FadeIn>
        </Container>
      </div>

      {/* ── Block 1: Featured Certifications ── */}
      <div className="pt-16">
        <CertificationsGrid />
      </div>

      {/* ── Divider ── */}
      <Container>
        <AnimatedDivider className="my-4" />
      </Container>

      {/* ── Block 2: Achievement Highlights ── */}
      <AchievementHighlights />

      {/* ── Divider ── */}
      <Container>
        <AnimatedDivider className="my-4" />
      </Container>

      {/* ── Block 3: Recognition Wall ── */}
      <RecognitionWall />

      {/* ── CTA ── */}
      <div className="pb-24 md:pb-32">
        <Container>
          <FadeIn>
            <div className="flex flex-col items-center gap-5 rounded-2xl border border-border/40 bg-surface/40 py-10 text-center">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                  See everything
                </p>
                <h3
                  className="text-2xl font-semibold text-foreground sm:text-3xl"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  All Certificates Available
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground-secondary">
                  Full resolution certificate images and verification documents — one Google Drive folder.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <MagneticButton strength={0.3}>
                  <a
                    href={CERTS_FOLDER}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'group inline-flex items-center gap-2 rounded-xl',
                      'bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-accent/25',
                      'transition-all duration-200 hover:brightness-110',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    )}
                  >
                    View All Certificates
                    <ExternalLink
                      size={13}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </MagneticButton>

                <MagneticButton strength={0.25}>
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'group inline-flex items-center gap-2 rounded-xl border border-border/60',
                      'px-6 py-3 text-sm font-semibold text-foreground-secondary',
                      'transition-all duration-200 hover:border-border hover:text-foreground',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    )}
                  >
                    View Resume
                    <ExternalLink
                      size={13}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </MagneticButton>
              </div>
            </div>
          </FadeIn>
        </Container>
      </div>
    </section>
  );
}
