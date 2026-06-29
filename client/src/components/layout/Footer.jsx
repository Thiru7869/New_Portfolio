import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';
import { MagneticButton, FadeIn } from '@/components/animations';

const RESUME_URL = 'https://drive.google.com/file/d/1tf1CfdDaZpWJ4SvDiEV7sYd1Z4y-eBiY/view';

const NAV_LINKS = [
  { label: 'About',          href: '#about' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact' },
];

/* ─── SVG icons ──────────────────────────────────────────────── */

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const LeetcodeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
);

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  });
}

function scrollToSection(href) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({
    top: el.offsetTop - 72,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  });
}

/* ─── Social icon button ─────────────────────────────────────── */

function SocialIconBtn({ href, label, children }) {
  return (
    <MagneticButton strength={0.3} distance={40}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg',
          'text-foreground-secondary border border-border/60 bg-surface/60',
          'transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:text-foreground hover:shadow-sm',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        )}
      >
        {children}
      </a>
    </MagneticButton>
  );
}

/* ─── Main footer ─────────────────────────────────────────────── */

export function Footer() {
  const { isDark, toggle } = useTheme();

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    scrollToSection(href);
  }, []);

  return (
    <footer
      className="relative border-t border-border/40 bg-background"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        {/* ── Top row: brand + socials ── */}
        <FadeIn>
          <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Brand */}
            <div>
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, '#home')}
                className="flex items-center gap-1.5 font-semibold text-foreground"
                aria-label="Back to top"
              >
                <span className="text-accent font-bold">Thiru</span>
                <span className="text-foreground-muted font-light">/</span>
                <span className="text-foreground-secondary font-normal">Portfolio</span>
              </a>
              <p className="mt-1 text-xs text-foreground-muted">
                Full Stack Developer & Data Scientist
              </p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              <SocialIconBtn href="https://www.linkedin.com/in/thirumala-narasimha-poluru-23775926b" label="LinkedIn profile">
                <LinkedinIcon />
              </SocialIconBtn>
              <SocialIconBtn href="https://github.com/Thiru7869" label="GitHub profile">
                <GithubIcon />
              </SocialIconBtn>
              <SocialIconBtn href="https://leetcode.com/u/thiru7869/" label="LeetCode profile">
                <LeetcodeIcon />
              </SocialIconBtn>
            </div>
          </div>
        </FadeIn>

        {/* ── Nav links row ── */}
        <FadeIn delay={0.05}>
          <nav
            aria-label="Footer navigation"
            className="mb-8 flex flex-wrap gap-x-4 gap-y-2"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="text-sm text-foreground-secondary transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:text-foreground"
              >
                {label}
              </a>
            ))}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground-secondary transition-colors duration-150 hover:text-accent focus-visible:outline-none focus-visible:text-accent"
            >
              Resume ↗
            </a>
          </nav>
        </FadeIn>

        {/* ── Divider ── */}
        <div className="mb-6 h-px w-full bg-border/40" />

        {/* ── Bottom row: copyright + actions ── */}
        <FadeIn delay={0.08}>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Copyright + built-with */}
            <div>
              <p className="text-[11px] text-foreground-muted">
                © {new Date().getFullYear()} Thirumala Narasimha Poluru. All rights reserved.
              </p>
              <p className="mt-0.5 text-[11px] text-foreground-muted">
                Built with React · Vite · Tailwind CSS · Framer Motion
              </p>
            </div>

            {/* Actions: theme toggle + back to top */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <button
                onClick={toggle}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg',
                  'border border-border/60 bg-surface/60 text-foreground-secondary',
                  'transition-colors duration-150 hover:border-border hover:text-foreground',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isDark ? 'moon' : 'sun'}
                    initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
                    transition={{ duration: 0.18 }}
                  >
                    {isDark ? <Sun size={14} /> : <Moon size={14} />}
                  </motion.span>
                </AnimatePresence>
              </button>

              {/* Back to top */}
              <button
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                className={cn(
                  'flex items-center gap-1.5 rounded-lg border border-border/60 bg-surface/60',
                  'px-3 py-1.5 text-[11px] font-medium text-foreground-secondary',
                  'transition-all duration-150 hover:border-border hover:text-foreground hover:-translate-y-0.5',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                )}
              >
                <ArrowUp size={12} />
                Back to top
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
