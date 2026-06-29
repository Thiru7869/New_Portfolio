import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Container } from '@/components/layout';
import { FadeIn } from '@/components/animations';
import { EASE_OUT } from '@/lib/animation';

export function AboutPhilosophy() {
  return (
    <div className="py-20 md:py-28">
      <Container size="sm">
        <FadeIn y={16}>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-8 sm:p-12 md:p-16">

            {/* Dot grid texture */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)',
                backgroundSize: '22px 22px',
              }}
            />

            {/* Accent orb top-right */}
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)' }}
            />

            {/* Quote icon */}
            <motion.div
              className="relative mb-8 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/6"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.05 }}
            >
              <Quote size={18} className="text-accent" />
            </motion.div>

            {/* Quote body — mix of light + semibold weights for editorial hierarchy */}
            <FadeIn delay={0.12} y={10}>
              <blockquote>
                <p
                  className="relative text-xl leading-[1.72] text-foreground sm:text-2xl md:text-[1.65rem] md:leading-[1.68]"
                  style={{ fontWeight: 300, letterSpacing: '-0.01em' }}
                >
                  "Software should feel{' '}
                  <span className="font-semibold text-foreground" style={{ fontWeight: 600 }}>
                    invisible
                  </span>
                  {' '}— intuitive enough that users never notice it. I engineer from the user
                  outward: design the experience first, then build the systems that make it possible.{' '}
                  <span className="font-semibold text-foreground" style={{ fontWeight: 600 }}>
                    Clean code, clear purpose, obsessive attention to detail.
                  </span>
                  "
                </p>
              </blockquote>
            </FadeIn>

            {/* Attribution */}
            <FadeIn delay={0.25} y={6}>
              <footer className="mt-8 flex items-center gap-3">
                <div className="h-px w-8 bg-accent" aria-hidden="true" />
                <cite className="not-italic text-sm font-mono tracking-wide text-foreground-muted">
                  Thirumala Narasimha Poluru
                </cite>
              </footer>
            </FadeIn>

          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
