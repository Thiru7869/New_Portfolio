import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, RefreshCw, Mail } from 'lucide-react';
import { MagneticButton } from '@/components/animations';
import { cn, prefersReducedMotion } from '@/lib/utils';
import { EASE_OUT, DURATION } from '@/lib/animation';

// ── Icons ──────────────────────────────────────────────────────────────────

const IconGithub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const IconLinkedin = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const IconLeetcode = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
);

// ── Config ─────────────────────────────────────────────────────────────────

const ROLES = ['Full Stack Developer', 'Data Scientist', 'Problem Solver', 'Cloud Engineer'];

const RESUME_URL = 'https://drive.google.com/file/d/1tf1CfdDaZpWJ4SvDiEV7sYd1Z4y-eBiY/view';

const SOCIALS = [
  { label: 'GitHub',   href: 'https://github.com/Thiru7869',                                        icon: <IconGithub /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/thirumala-narasimha-poluru-23775926b',    icon: <IconLinkedin /> },
  { label: 'LeetCode', href: 'https://leetcode.com/u/thiru7869/',                                   icon: <IconLeetcode /> },
  { label: 'Email',    href: 'mailto:reddytn4@gmail.com',                                           icon: <Mail size={15} /> },
];

// ── Animation timing constants ─────────────────────────────────────────────
// Carefully sequenced so each element appears after the previous one settles.
const T = {
  badge:       0.05,   // availability pill
  greeting:    0.14,   // "Hello, I'm"
  name0:       0.22,   // "Thirumala"
  name1:       0.37,   // "Narasimha"
  name2:       0.52,   // "Poluru"
  role:        1.00,   // role cycler — after name spring settles (~0.52 + ~0.45s)
  description: 1.18,
  stats:       1.32,
  cta:         1.44,
  social:      1.56,
};

// ── Sub-components ─────────────────────────────────────────────────────────

/**
 * WordLift — wraps a word in overflow-hidden so it clips during the spring.
 * The container line-height is `1.1em` giving a tight clip box that prevents
 * the previous word from showing through while the next lifts in.
 */
function WordLift({ word, delay }) {
  return (
    <span className="inline-block overflow-hidden" style={{ lineHeight: '1.08' }}>
      <motion.span
        className="inline-block"
        initial={{ y: '108%' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 65, damping: 13, delay }}
        style={{ willChange: 'transform' }}
      >
        {word}
      </motion.span>
    </span>
  );
}

/**
 * RoleCycler — AnimatePresence vertical slide between role titles.
 * Container height is fixed so layout is stable during transitions.
 * aria-live ensures screen-readers hear the changing role.
 */
function RoleCycler() {
  const [index, setIndex] = useState(0);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 3200);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <motion.div
      className="mt-3 flex items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: T.role, ease: EASE_OUT }}
    >
      {/* Accent tick — visual anchor for the cycling text */}
      <motion.span
        className="h-px w-5 shrink-0 bg-accent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.4, delay: T.role + 0.05, ease: EASE_OUT }}
        style={{ transformOrigin: 'left' }}
      />

      {/* Fixed-height container prevents layout shift on transition */}
      <div className="relative h-[1.4rem] overflow-hidden" style={{ minWidth: '200px' }}>
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {ROLES[index]}
        </span>
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            aria-hidden="true"
            className="absolute inset-0 text-sm font-medium tracking-wide text-foreground-secondary sm:text-base"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -18, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
          >
            {ROLES[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/**
 * SocialLink — icon button with lift on hover.
 * Focus ring uses accent color for accessibility.
 */
function SocialLink({ label, href, icon }) {
  const isExternal = !href.startsWith('mailto');
  return (
    <motion.a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground-muted
                 transition-colors duration-150 hover:border-foreground-secondary hover:text-foreground
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1
                 focus-visible:ring-offset-background"
      whileHover={{ y: -2, scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 500, damping: 22 }}
    >
      {icon}
    </motion.a>
  );
}

/**
 * DownloadButton — three-state button with proper AnimatePresence icon swap
 * so there's no rotation discontinuity when states change.
 */
function DownloadButton() {
  const [state, setState] = useState('idle');

  const handleClick = () => {
    if (state !== 'idle') return;
    setState('downloading');
    setTimeout(() => setState('done'), 2200);
    setTimeout(() => setState('idle'), 3800);
  };

  const labels = { idle: 'Resume', downloading: 'Opening…', done: 'Done!' };

  return (
    <motion.a
      href={RESUME_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={`Download Resume — ${labels[state]}`}
      className={cn(
        'relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-lg border px-5 text-sm font-medium',
        'transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background',
        state === 'done'
          ? 'border-emerald-500/70 text-emerald-500'
          : 'border-border text-foreground-secondary hover:border-foreground-secondary hover:text-foreground'
      )}
      whileHover={state === 'idle' ? { scale: 1.02 } : {}}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Progress sweep — linear fill while opening */}
      <AnimatePresence>
        {state === 'downloading' && (
          <motion.div
            key="progress"
            className="absolute inset-0 bg-accent/6"
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.0, ease: 'linear' }}
          />
        )}
      </AnimatePresence>

      {/* Icon swap — no rotation discontinuity */}
      <div className="relative h-4 w-4 shrink-0">
        <AnimatePresence mode="wait">
          {state === 'idle' && (
            <motion.span
              key="dl"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: EASE_OUT }}
            >
              <Download size={14} />
            </motion.span>
          )}
          {state === 'downloading' && (
            <motion.span
              key="spin"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                className="inline-flex"
              >
                <RefreshCw size={13} />
              </motion.span>
            </motion.span>
          )}
          {state === 'done' && (
            <motion.span
              key="check"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 22 }}
            >
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="h-3.5 w-3.5">
                <polyline points="2 7 6 11 12 3" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <span className="relative">{labels[state]}</span>
    </motion.a>
  );
}

// ── Main export ────────────────────────────────────────────────────────────

export function HeroContent({ className }) {
  return (
    <div className={cn('flex flex-col', className)}>

      {/* ── Availability pill ── */}
      <motion.div
        className="mb-6 inline-flex self-start"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: T.badge, ease: EASE_OUT }}
      >
        <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5">
          <motion.span
            className="inline-block h-2 w-2 rounded-full bg-emerald-500"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.35, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }}
          />
          <span className="text-[11px] font-medium tracking-wide text-foreground-secondary">
            Available for opportunities
          </span>
        </div>
      </motion.div>

      {/* ── Greeting ── */}
      <motion.p
        className="mb-1 text-xs font-mono tracking-[0.12em] text-foreground-muted sm:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay: T.greeting, ease: EASE_OUT }}
      >
        Hello, I'm
      </motion.p>

      {/* ── Display name — word-lift, 3 independent springs ── */}
      <h1
        className="flex flex-col text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
        aria-label="Thirumala Narasimha Poluru"
        /* Gap-1 = 4px: just enough so overflow-hidden clips don't visually merge */
        style={{ gap: '0.1em' }}
      >
        <WordLift word="Thirumala" delay={T.name0} />
        <WordLift word="Narasimha" delay={T.name1} />
        {/* "Poluru" renders at slightly lower contrast — typographic depth signal */}
        <span className="text-foreground-secondary" style={{ fontWeight: 450 }}>
          <WordLift word="Poluru" delay={T.name2} />
        </span>
      </h1>

      {/* ── Role cycler ── */}
      <RoleCycler />

      {/* ── Description ── */}
      <motion.p
        className="mt-6 max-w-[44ch] text-sm leading-[1.75] text-foreground-muted sm:text-base"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: T.description, ease: EASE_OUT }}
      >
        Transforming complex problems into elegant digital solutions —
        through full stack engineering, data-driven thinking, and a
        relentless commitment to craft.
      </motion.p>

      {/* ── Stats row ── */}
      <motion.div
        className="mt-7 flex items-center"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: T.stats, ease: EASE_OUT }}
        role="list"
        aria-label="Professional statistics"
      >
        {[
          { value: '8+',   label: 'Internships' },
          { value: '25+',  label: 'Projects' },
          { value: '500+', label: 'Solutions' },
        ].map(({ value, label }, i) => (
          <div key={label} className="flex items-center" role="listitem">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-semibold tabular-nums text-foreground sm:text-xl">{value}</span>
              <span className="text-[11px] text-foreground-muted sm:text-xs">{label}</span>
            </div>
            {i < 2 && (
              <div
                aria-hidden="true"
                className="mx-5 h-3.5 w-px bg-border"
              />
            )}
          </div>
        ))}
      </motion.div>

      {/* ── CTA row ── */}
      <motion.div
        className="mt-8 flex flex-wrap items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: T.cta, ease: EASE_OUT }}
      >
        <MagneticButton strength={0.35}>
          {/*
            whileHover="hovered" + child variants = proper Framer Motion
            hover propagation. The arrow slides right only when the link is hovered.
          */}
          <motion.a
            href="#projects"
            className="inline-flex h-11 items-center gap-2.5 rounded-lg bg-accent px-6 text-sm font-semibold text-white
                       shadow-sm shadow-accent/20
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            whileHover="hovered"
            whileTap={{ scale: 0.96 }}
            variants={{ hovered: { scale: 1.02 } }}
            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
          >
            View Projects
            <motion.span
              className="inline-flex shrink-0"
              variants={{ hovered: { x: 3 } }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              aria-hidden="true"
            >
              <ArrowRight size={14} />
            </motion.span>
          </motion.a>
        </MagneticButton>

        <MagneticButton strength={0.28}>
          <DownloadButton />
        </MagneticButton>
      </motion.div>

      {/* ── Social links ── */}
      <motion.div
        className="mt-6 flex items-center gap-2"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: T.social, ease: EASE_OUT }}
        role="list"
        aria-label="Social profiles"
      >
        {SOCIALS.map((s) => (
          <div key={s.label} role="listitem">
            <SocialLink {...s} />
          </div>
        ))}
      </motion.div>

    </div>
  );
}
