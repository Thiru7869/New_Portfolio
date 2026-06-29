import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import {
  AnimatedGridBackground,
  FadeIn,
  MagneticButton,
  AnimatedDivider,
  RevealMask,
} from '@/components/animations';
import { Container } from '@/components/layout';
import { cn } from '@/lib/utils';
import { CONTACT_INFO, SOCIALS } from './contact-data';
import { ContactPanel } from './ContactPanel';
import { EASE_OUT } from '@/lib/animation';

/* ─── Social SVGs ─────────────────────────────────────────────── */

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const LeetcodeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
);

const ICON_COMPONENTS = { github: GithubIcon, linkedin: LinkedinIcon, leetcode: LeetcodeIcon };

/* ─── Social card ─────────────────────────────────────────────── */

function SocialCard({ social, index }) {
  const Icon = ICON_COMPONENTS[social.icon];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: 0.05 + index * 0.07, ease: EASE_OUT }}
    >
      <MagneticButton strength={0.25} distance={50}>
        <a
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'group flex items-center gap-3 rounded-2xl border px-5 py-4',
            'transition-all duration-250 hover:-translate-y-1 hover:shadow-lg',
            social.colorBg,
            social.colorBorder,
          )}
          aria-label={`${social.label} — ${social.description}`}
        >
          <span className={cn('transition-transform duration-300 group-hover:scale-110', social.colorText)}>
            {Icon && <Icon size={20} />}
          </span>
          <div>
            <p className={cn('text-sm font-semibold', social.colorText)}>{social.label}</p>
            <p className="text-[10px] text-foreground-muted">{social.description}</p>
          </div>
          <ExternalLink size={12} className="ml-auto text-foreground-muted opacity-0 transition-opacity duration-200 group-hover:opacity-70" />
        </a>
      </MagneticButton>
    </motion.div>
  );
}

/* ─── Main export ─────────────────────────────────────────────── */

export function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative overflow-hidden"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <AnimatedGridBackground dotOpacity={0.018} />
        <div
          className="absolute -right-56 top-0 h-[800px] w-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.055) 0%, transparent 65%)' }}
        />
        <div
          className="absolute -left-48 bottom-0 h-[600px] w-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Section header ── */}
      <div className="pt-24 md:pt-32">
        <Container>
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              07 — Contact
            </p>
          </FadeIn>
          <RevealMask direction="bottom" duration={0.6}>
            <h2
              className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
              style={{ letterSpacing: '-0.02em' }}
            >
              Let's start a
              <br />
              <span className="text-accent">conversation</span>
            </h2>
          </RevealMask>
          <FadeIn delay={0.1}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground-secondary">
              Whether you have a project in mind, a role to fill, or just want to connect —
              I'm one message away.
            </p>
          </FadeIn>
        </Container>
      </div>

      {/* ── Contact panel (info + form side by side) ── */}
      <ContactPanel />

      {/* ── Divider ── */}
      <Container>
        <AnimatedDivider className="my-2" />
      </Container>

      {/* ── Social presence ── */}
      <div className="py-14">
        <Container>
          <FadeIn>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent">Find me online</p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h3
              className="mb-8 text-2xl font-semibold text-foreground sm:text-3xl"
              style={{ letterSpacing: '-0.02em' }}
            >
              Social Presence
            </h3>
          </FadeIn>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {SOCIALS.map((s, i) => (
              <SocialCard key={s.id} social={s} index={i} />
            ))}
          </div>
        </Container>
      </div>

      {/* ── Closing CTA ── */}
      <div className="pb-24 md:pb-32">
        <Container>
          <RevealMask direction="bottom" duration={0.65}>
            <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-surface/40 px-8 py-16 text-center md:px-16">
              {/* Subtle glow behind text */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.06) 0%, transparent 60%)' }}
                aria-hidden="true"
              />

              <FadeIn>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                  Ready when you are
                </p>
              </FadeIn>
              <FadeIn delay={0.06}>
                <h3
                  className="mx-auto mb-5 max-w-2xl text-3xl font-semibold text-foreground sm:text-4xl"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  500+ students trusted me with their hardest problems.
                  <br />
                  <span className="text-foreground-secondary">If you're building something real — let's talk.</span>
                </h3>
              </FadeIn>
              <FadeIn delay={0.12}>
                <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-foreground-secondary">
                  Eight internships. 25+ projects shipped. Three years on Chegg with a 95%+ satisfaction rate.
                  I bring the same attention to every collaboration — big or small.
                </p>
              </FadeIn>

              <FadeIn delay={0.18}>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <MagneticButton strength={0.3}>
                    <a
                      href="mailto:reddytn4@gmail.com"
                      className={cn(
                        'group inline-flex items-center gap-2.5 rounded-xl',
                        'bg-accent px-8 py-3.5 text-sm font-semibold text-white',
                        'shadow-sm shadow-accent/25 transition-all duration-200 hover:brightness-110',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                      )}
                    >
                      Email Me Directly
                      <motion.span
                        className="inline-block"
                        animate={{ x: [0, 2, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        →
                      </motion.span>
                    </a>
                  </MagneticButton>
                  <MagneticButton strength={0.2}>
                    <a
                      href={CONTACT_INFO.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'inline-flex items-center gap-2 rounded-xl border border-border/60',
                        'px-8 py-3.5 text-sm font-semibold text-foreground-secondary',
                        'transition-all duration-200 hover:border-border hover:text-foreground',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                      )}
                    >
                      View Resume
                      <ExternalLink size={13} />
                    </a>
                  </MagneticButton>
                </div>
              </FadeIn>
            </div>
          </RevealMask>
        </Container>
      </div>
    </section>
  );
}
