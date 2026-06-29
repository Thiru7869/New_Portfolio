import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { EASE_OUT } from '@/lib/animation';

const NAV_LINKS = [
  { label: 'About',           href: '#about' },
  { label: 'Skills',          href: '#skills' },
  { label: 'Projects',        href: '#projects' },
  { label: 'Experience',      href: '#experience' },
  { label: 'Certifications',  href: '#certifications' },
  { label: 'Contact',         href: '#contact' },
];

const RESUME_URL = 'https://drive.google.com/file/d/1tf1CfdDaZpWJ4SvDiEV7sYd1Z4y-eBiY/view';

function scrollToSection(href) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 72;
  window.scrollTo({
    top: el.offsetTop - offset,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  });
}

export function Navbar() {
  const { isDark, toggle } = useTheme();
  const { scrolled } = useScrollProgress(40);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Track active section
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.replace('#', ''));
    function onScroll() {
      const pos = window.scrollY + 100;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && pos >= el.offsetTop) { setActive(ids[i]); return; }
      }
      setActive('');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keyboard: close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setOpen(false);
    scrollToSection(href);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300 ease-out',
          scrolled
            ? 'border-b border-border bg-background/80 backdrop-blur-xl'
            : 'bg-transparent'
        )}
        role="banner"
      >
        <div className="mx-auto flex h-[60px] max-w-6xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-1.5 font-semibold text-foreground text-sm tracking-tight"
            aria-label="Home"
          >
            <span className="text-accent font-bold">Thiru</span>
            <span className="text-foreground-muted font-light">/</span>
            <span className="text-foreground-secondary font-normal">Portfolio</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace('#', '');
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={cn(
                    'relative px-3 py-1.5 text-sm rounded-md transition-colors duration-150',
                    active === id
                      ? 'text-foreground'
                      : 'text-foreground-secondary hover:text-foreground'
                  )}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-md bg-surface"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-md',
                'text-foreground-secondary hover:text-foreground',
                'hover:bg-surface transition-colors duration-150'
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Resume link */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'hidden md:inline-flex items-center h-8 px-4 rounded-md text-xs font-medium',
                'border border-border text-foreground-secondary hover:border-foreground-secondary hover:text-foreground',
                'transition-colors duration-150'
              )}
            >
              Resume
            </a>

            {/* Hire Me CTA */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className={cn(
                'hidden md:inline-flex items-center h-8 px-4 rounded-md text-xs font-medium',
                'bg-accent text-white hover:bg-accent-hover',
                'transition-colors duration-150'
              )}
            >
              Hire Me
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className={cn(
                'md:hidden flex h-9 w-9 items-center justify-center rounded-md',
                'text-foreground-secondary hover:text-foreground hover:bg-surface',
                'transition-colors duration-150'
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'close' : 'menu'}
                  initial={{ opacity: 0, rotate: -30 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 30 }}
                  transition={{ duration: 0.15 }}
                >
                  {open ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.nav
              id="mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: EASE_OUT }}
              className={cn(
                'fixed top-[60px] left-4 right-4 z-50 md:hidden',
                'rounded-xl border border-border bg-card shadow-lg p-2'
              )}
              role="navigation"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={cn(
                    'flex items-center rounded-lg px-4 py-3 text-sm font-medium',
                    'transition-colors duration-150',
                    active === href.replace('#', '')
                      ? 'bg-surface text-foreground'
                      : 'text-foreground-secondary hover:bg-surface hover:text-foreground'
                  )}
                >
                  {label}
                </a>
              ))}
              <div className="mt-2 space-y-2 border-t border-border pt-2">
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-lg border border-border py-3 text-sm font-medium text-foreground-secondary hover:text-foreground"
                >
                  View Resume
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="flex items-center justify-center rounded-lg bg-accent py-3 text-sm font-medium text-white"
                >
                  Hire Me
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
