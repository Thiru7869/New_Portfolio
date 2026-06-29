import { useRef, useCallback, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn, prefersReducedMotion } from '@/lib/utils';
import { EASE_OUT } from '@/lib/animation';

const PROFILE_URL =
  'https://raw.githubusercontent.com/Thiru7869/New_Portfolio/main/profile%20picture.jpeg';

/**
 * Shared frame dimensions — used by both the photo layer and the badge
 * positioning layer so they share the same reference point.
 */
const FRAME_W = 'w-[260px] sm:w-[300px] lg:w-[340px]';
const FRAME_H = 'h-[340px] sm:h-[400px] lg:h-[460px]';

const SKILLS = [
  { label: 'React 19',  pos: '-top-3 -left-14', delay: 0.85,  floatDur: 3.2, floatAmp: 5 },
  { label: 'Node.js',   pos: 'top-20 -right-14', delay: 0.97,  floatDur: 3.8, floatAmp: 6 },
  { label: 'Python',    pos: 'bottom-28 -left-16', delay: 1.1, floatDur: 2.9, floatAmp: 4 },
  { label: 'AWS',       pos: 'bottom-12 -right-14', delay: 1.2, floatDur: 3.5, floatAmp: 7 },
];

/**
 * SkillBadge — entrance spring-scale + gentle ambient y-float after settling.
 * Float delays past the entrance so they don't compete with the entrance cascade.
 */
function SkillBadge({ label, pos, delay, floatDur, floatAmp }) {
  return (
    <motion.div
      className={cn('absolute z-20 cursor-default', pos)}
      initial={{ opacity: 0, scale: 0.65 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, delay }}
    >
      {/* Float wrapper — starts after entrance settles */}
      <motion.div
        animate={{ y: [0, -floatAmp, 0] }}
        transition={{
          duration: floatDur,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay + 1.0,
        }}
      >
        <div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 shadow-md">
          <motion.span
            className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: floatDur * 0.9, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.5 }}
          />
          <span className="whitespace-nowrap text-[11px] font-mono font-medium text-foreground-secondary">
            {label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function HeroVisual({ className }) {
  const containerRef = useRef(null);
  const reduced = prefersReducedMotion();
  const [imgLoaded, setImgLoaded] = useState(false);

  /* ── Parallax setup ───────────────────────────────────────── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { stiffness: 35, damping: 16, mass: 0.9 };
  const springX = useSpring(mouseX, spring);
  const springY = useSpring(mouseY, spring);

  /* Each layer moves at a different depth ratio — badges > photo > glow */
  const glowX  = useTransform(springX, v => v * 0.25);
  const glowY  = useTransform(springY, v => v * 0.25);
  const photoX = useTransform(springX, v => v * 0.55);
  const photoY = useTransform(springY, v => v * 0.55);
  const badgeX = useTransform(springX, v => v * 1.1);
  const badgeY = useTransform(springY, v => v * 1.1);

  const onMouseMove = useCallback((e) => {
    if (reduced || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - (rect.left + rect.width * 0.5)) * 0.045);
    mouseY.set((e.clientY - (rect.top  + rect.height * 0.5)) * 0.045);
  }, [reduced, mouseX, mouseY]);

  const onMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn('relative flex items-center justify-center py-10 md:py-0', className)}
      /* Clip so floating badges never cause horizontal scroll on mobile */
      style={{ isolation: 'isolate' }}
    >

      {/* ── Layer 1: Ambient glow (slowest parallax) ─────────── */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background:
            'radial-gradient(ellipse at 55% 50%, rgba(37,99,235,0.14) 0%, rgba(37,99,235,0.05) 45%, transparent 70%)',
          x: glowX,
          y: glowY,
          willChange: 'transform',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.4, ease: EASE_OUT }}
      />

      {/* ── Layer 2: Profile photo (medium parallax) ─────────── */}
      <motion.div
        style={{ x: photoX, y: photoY, willChange: 'transform' }}
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 55, damping: 18, delay: 0.35 }}
      >
        <div className={cn('relative', FRAME_W, FRAME_H)}>

          {/* Photo container */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl border border-border shadow-2xl">
            {/* Skeleton — fades out once image loads */}
            <motion.div
              className="absolute inset-0 bg-surface"
              animate={{ opacity: imgLoaded ? 0 : 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex h-full items-center justify-center">
                <span className="text-3xl font-semibold tracking-tight text-foreground-muted opacity-20 select-none">
                  TNP
                </span>
              </div>
            </motion.div>

            <motion.img
              src={PROFILE_URL}
              alt="Thirumala Narasimha Poluru — Full Stack Developer & Data Scientist"
              className="h-full w-full object-cover object-top"
              loading="eager"
              fetchPriority="high"
              onLoad={() => setImgLoaded(true)}
              animate={{ opacity: imgLoaded ? 1 : 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            />

            {/* Bottom vignette — blends photo into background without blur */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
              style={{
                background:
                  'linear-gradient(to top, var(--background) 0%, transparent 100%)',
                opacity: 0.45,
              }}
            />
          </div>

          {/* Education context badge — top-center, non-duplicate info */}
          <motion.div
            className="absolute -top-4 left-1/2 z-10 -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 22, delay: 1.05 }}
          >
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 shadow-md">
              <span className="text-[10px] font-mono text-foreground-muted">B.Tech CSE</span>
              <span className="text-foreground-muted opacity-30">→</span>
              <span className="text-[10px] font-mono font-medium text-accent">MBA Data Science</span>
            </div>
          </motion.div>

          {/* Bottom detail: subtle location tag */}
          <motion.div
            className="absolute -bottom-4 left-1/2 z-10 -translate-x-1/2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 22, delay: 1.25 }}
          >
            <div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 shadow-md">
              <span className="text-[10px] font-mono text-foreground-muted">
                📍 Venkatagiri, Andhra Pradesh
              </span>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* ── Layer 3: Floating skill badges (strongest parallax) ── */}
      {/*
        Badges are hidden below `sm` — on mobile the tight column has no room.
        The badge layer uses the same FRAME dimensions as the photo layer so
        absolute positions like `top-20 -right-14` reference the same edges.
      */}
      <motion.div
        className={cn(
          'pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'hidden sm:block',
          FRAME_W, FRAME_H
        )}
        style={{ x: badgeX, y: badgeY, willChange: 'transform' }}
      >
        {SKILLS.map((s) => (
          <SkillBadge key={s.label} {...s} />
        ))}
      </motion.div>

    </div>
  );
}
