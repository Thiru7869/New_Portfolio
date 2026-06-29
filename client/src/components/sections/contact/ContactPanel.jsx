import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Container } from '@/components/layout';
import { FadeIn, FadeInScale, TiltCard, MagneticButton, RevealMask } from '@/components/animations';
import { cn } from '@/lib/utils';
import { AVAILABILITY, CONTACT_METHODS, API_BASE } from './contact-data';
import { EASE_OUT } from '@/lib/animation';

/* ─── Social SVGs (Lucide doesn't include these) ────────────── */

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const LeetcodeIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
);

const ICON_MAP = { github: GithubIcon, linkedin: LinkedinIcon, leetcode: LeetcodeIcon };

/* ─── Availability badge ─────────────────────────────────────── */

function AvailabilityBadge() {
  return (
    <FadeIn>
      <div
        className="inline-flex flex-col gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-4"
        role="status"
        aria-label="Availability status"
      >
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <span className="text-sm font-semibold text-emerald-400">{AVAILABILITY.status}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {AVAILABILITY.types.map((t) => (
            <span
              key={t}
              className="rounded-full border border-emerald-500/20 bg-emerald-500/8 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="text-[11px] text-foreground-secondary">
          ⚡ {AVAILABILITY.responseTime}
        </p>
      </div>
    </FadeIn>
  );
}

/* ─── Quick contact method card ──────────────────────────────── */

function MethodCard({ item, index }) {
  const inner = (
    <article
      className={cn(
        'group relative overflow-hidden rounded-xl border p-3.5',
        'transition-all duration-250 hover:-translate-y-0.5 hover:shadow-md',
        item.colorBorder,
        !item.href ? 'cursor-default' : '',
      )}
      aria-label={`${item.label}: ${item.value}`}
    >
      {/* Left accent bar */}
      <div className={cn('absolute inset-y-0 left-0 w-0.5 rounded-l-xl transition-colors duration-300', item.colorBar, item.colorBarHov)} />
      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse at 0% 50%, ${item.colorGlow} 0%, transparent 65%)` }}
        aria-hidden="true"
      />
      <div className="pl-3">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-base leading-none" role="img" aria-label={item.label}>{item.icon}</span>
          <span className={cn('text-[10px] font-bold uppercase tracking-wider', item.colorText)}>{item.label}</span>
        </div>
        <p className="text-xs font-medium text-foreground-secondary leading-snug">{item.value}</p>
      </div>
    </article>
  );

  return (
    <FadeIn delay={0.06 + index * 0.05} y={8}>
      {item.href
        ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}>{inner}</a>
        : inner}
    </FadeIn>
  );
}

/* ─── Floating label input ───────────────────────────────────── */

function FloatingInput({ id, name, label, type = 'text', value, onChange, error, autoComplete }) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;
  return (
    <div>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            'peer w-full rounded-xl border bg-surface/60 px-4 pt-5 pb-2 text-sm text-foreground',
            'outline-none transition-all duration-200 placeholder-transparent',
            'focus:ring-1',
            error
              ? 'border-rose-400/60 focus:border-rose-400 focus:ring-rose-400/20'
              : 'border-border/60 focus:border-accent focus:ring-accent/20',
          )}
          placeholder={label}
        />
        <label
          htmlFor={id}
          className={cn(
            'pointer-events-none absolute left-4 transition-all duration-200 select-none',
            floated
              ? cn('top-1.5 text-[9px] font-semibold uppercase tracking-wide', error ? 'text-rose-400' : 'text-accent')
              : 'top-3.5 text-sm text-foreground-secondary',
          )}
        >
          {label}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-[11px] text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── Floating label textarea ────────────────────────────────── */

function FloatingTextarea({ id, name, label, value, onChange, error, rows = 5 }) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;
  return (
    <div>
      <div className="relative">
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            'w-full resize-none rounded-xl border bg-surface/60 px-4 pt-6 pb-2 text-sm text-foreground',
            'outline-none transition-all duration-200 placeholder-transparent',
            'focus:ring-1',
            error
              ? 'border-rose-400/60 focus:border-rose-400 focus:ring-rose-400/20'
              : 'border-border/60 focus:border-accent focus:ring-accent/20',
          )}
          placeholder={label}
        />
        <label
          htmlFor={id}
          className={cn(
            'pointer-events-none absolute left-4 transition-all duration-200 select-none',
            floated
              ? cn('top-2 text-[9px] font-semibold uppercase tracking-wide', error ? 'text-rose-400' : 'text-accent')
              : 'top-3.5 text-sm text-foreground-secondary',
          )}
        >
          {label}
        </label>
      </div>
      <div className="mt-1 flex items-start justify-between">
        {error ? (
          <p id={`${id}-error`} role="alert" className="text-[11px] text-rose-400">{error}</p>
        ) : (
          <span />
        )}
        <span className={cn('text-[10px]', value.length > 1800 ? 'text-rose-400' : 'text-foreground-muted')}>
          {value.length}/2000
        </span>
      </div>
    </div>
  );
}

/* ─── Form validation ────────────────────────────────────────── */

function validate({ name, email, subject, message }) {
  const e = {};
  if (!name.trim() || name.trim().length < 2) e.name = 'Please enter your name (min 2 characters).';
  if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email address.';
  if (!subject.trim() || subject.trim().length < 3) e.subject = 'Please enter a subject (min 3 characters).';
  if (!message.trim() || message.trim().length < 20) e.message = 'Please write a message (min 20 characters).';
  if (message.length > 2000) e.message = 'Message is too long (max 2000 characters).';
  return e;
}

/* ─── Contact form ───────────────────────────────────────────── */

function ContactForm() {
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [apiError, setApiError] = useState('');

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change once attempted
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setStatus('loading');
    setApiError('');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const data = await res.json();
      if (data.success) {
        setStatus('success');
      } else {
        setApiError(data.message || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        setApiError('Request timed out. Please check your connection and try again.');
      } else {
        setApiError('Network error. Please check your connection and try again.');
      }
      setStatus('error');
    }
  }, [fields]);

  // Retry
  const handleRetry = useCallback(() => { setStatus('idle'); setApiError(''); }, []);

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        /* ── Success state ── */
        <motion.div
          key="success"
          className="flex min-h-[480px] flex-col items-center justify-center gap-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-8 py-16 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
        >
          <motion.div
            className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/12"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.15 }}
          >
            <Check size={28} className="text-emerald-400" />
          </motion.div>
          <div>
            <motion.h3
              className="mb-2 text-xl font-semibold text-foreground"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, ease: EASE_OUT }}
            >
              Message sent!
            </motion.h3>
            <motion.p
              className="text-sm leading-relaxed text-foreground-secondary"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ease: EASE_OUT }}
            >
              Thank you for reaching out. I'll get back to you within 24 hours.
            </motion.p>
          </div>
        </motion.div>
      ) : (
        /* ── Form state ── */
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-surface/40 p-6 sm:p-8"
          aria-label="Contact form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">Send a message</p>
            <h3 className="mt-1 text-lg font-semibold text-foreground">
              Drop me a line — I read everything.
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FloatingInput
              id="name"
              name="name"
              label="Your Name"
              value={fields.name}
              onChange={handleChange}
              error={errors.name}
              autoComplete="name"
            />
            <FloatingInput
              id="email"
              name="email"
              label="Email Address"
              type="email"
              value={fields.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
            />
          </div>

          <FloatingInput
            id="subject"
            name="subject"
            label="Subject"
            value={fields.subject}
            onChange={handleChange}
            error={errors.subject}
            autoComplete="off"
          />

          <FloatingTextarea
            id="message"
            name="message"
            label="Message"
            value={fields.message}
            onChange={handleChange}
            error={errors.message}
            rows={5}
          />

          {apiError && (
            <div
              role="alert"
              className="flex items-center gap-2 rounded-lg border border-rose-400/20 bg-rose-400/8 px-4 py-3 text-xs text-rose-400"
            >
              <span>⚠️</span>
              <span>{apiError}</span>
              <button
                type="button"
                onClick={handleRetry}
                className="ml-auto text-[10px] font-semibold underline underline-offset-2"
              >
                Retry
              </button>
            </div>
          )}

          <MagneticButton strength={0.2}>
            <button
              type="submit"
              disabled={status === 'loading'}
              className={cn(
                'group relative inline-flex h-12 w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl',
                'bg-accent text-sm font-semibold text-white shadow-sm shadow-accent/20',
                'transition-all duration-200 hover:bg-accent-hover hover:shadow-md hover:shadow-accent/25',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                'disabled:pointer-events-none disabled:opacity-60',
              )}
              aria-label="Send message"
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === 'loading' ? (
                  <motion.span
                    key="loading"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                  >
                    <motion.span
                      className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                    />
                    Sending…
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                  >
                    Send Message
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </MagneticButton>

          <p className="text-center text-[10px] leading-relaxed text-foreground-muted">
            Your message goes directly to my inbox. No bots, no delays.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

/* ─── Main component ─────────────────────────────────────────── */

export function ContactPanel() {
  return (
    <div className="py-12">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[5fr_7fr]">

          {/* ── Left: Info side ── */}
          <div className="flex flex-col gap-6">
            <RevealMask direction="left" duration={0.55}>
              <div>
                <h3
                  className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  Let's build something together
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                  Have a project, idea, or opportunity? I'm available for full-time roles,
                  freelance work, and remote collaboration. Reach out — I'd love to hear what
                  you're building.
                </p>
              </div>
            </RevealMask>

            <AvailabilityBadge />

            {/* Quick methods 2×2 */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {CONTACT_METHODS.map((m, i) => (
                <MethodCard key={m.id} item={m} index={i} />
              ))}
            </div>

            {/* Direct email CTA */}
            <FadeIn delay={0.3} y={8}>
              <p className="text-[11px] leading-relaxed text-foreground-muted">
                Prefer to email directly?{' '}
                <a
                  href="mailto:reddytn4@gmail.com"
                  className="font-semibold text-accent underline underline-offset-2 hover:opacity-80 transition-opacity"
                >
                  reddytn4@gmail.com
                </a>
              </p>
            </FadeIn>
          </div>

          {/* ── Right: Form ── */}
          <RevealMask direction="right" delay={0.08} duration={0.55}>
            <ContactForm />
          </RevealMask>
        </div>
      </Container>
    </div>
  );
}
