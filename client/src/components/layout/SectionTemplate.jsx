import { cn } from '@/lib/utils';
import { FadeIn } from '@/components/animations/FadeIn';
import { AnimatedDivider } from '@/components/animations/AnimatedDivider';
import { AnimatedGridBackground } from '@/components/animations/AnimatedGrid';
import { Container } from './Container';

/**
 * SectionTemplate — the master layout used by every portfolio section.
 * Guarantees consistent:
 *   • vertical padding         (py-24 md:py-32)
 *   • container width          (max-w-6xl, px-6/8)
 *   • section label animation  (FadeIn, delay 0)
 *   • heading animation        (FadeIn, delay 0.05)
 *   • subheading animation     (FadeIn, delay 0.1)
 *   • header-to-content gap    (mb-12 md:mb-16)
 *   • optional grid background
 *   • optional top divider
 *
 * Usage:
 *   <SectionTemplate
 *     id="projects"
 *     label="Featured Work"
 *     heading="Projects"
 *     subheading="A selection of things I've shipped."
 *     divider
 *   >
 *     <ProjectGrid />
 *   </SectionTemplate>
 *
 * @param {string}  id              - used as anchor href target
 * @param {string}  label           - small eyebrow text (accent color, uppercase)
 * @param {string}  heading         - primary section heading (h2)
 * @param {string}  subheading      - supporting description text
 * @param {boolean} tight           - reduce vertical padding (default false)
 * @param {boolean} divider         - render animated divider above section (default false)
 * @param {boolean} grid            - add dot-grid background (default false)
 * @param {string}  containerSize   - 'sm' | 'default' | 'lg' (default 'default')
 * @param {ReactNode} headerExtra   - additional content rendered after subheading
 */
export function SectionTemplate({
  id,
  label,
  heading,
  subheading,
  tight = false,
  divider = false,
  grid = false,
  containerSize = 'default',
  headerExtra,
  className,
  headerClassName,
  children,
  ...props
}) {
  const hasHeader = label || heading || subheading || headerExtra;

  return (
    <section
      id={id}
      aria-label={label || heading}
      className={cn('relative w-full', tight ? 'py-16 md:py-20' : 'py-24 md:py-32', className)}
      {...props}
    >
      {grid && <AnimatedGridBackground />}

      {divider && (
        <Container size={containerSize}>
          <AnimatedDivider className="mb-16 md:mb-20" />
        </Container>
      )}

      <Container size={containerSize}>
        {hasHeader && (
          <div className={cn('mb-12 md:mb-16', headerClassName)}>
            {label && (
              <FadeIn delay={0}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                  {label}
                </p>
              </FadeIn>
            )}
            {heading && (
              <FadeIn delay={0.05}>
                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {heading}
                </h2>
              </FadeIn>
            )}
            {subheading && (
              <FadeIn delay={0.1}>
                <p className="mt-4 max-w-2xl text-base text-foreground-secondary leading-relaxed">
                  {subheading}
                </p>
              </FadeIn>
            )}
            {headerExtra && (
              <FadeIn delay={0.15}>
                <div className="mt-6">{headerExtra}</div>
              </FadeIn>
            )}
          </div>
        )}

        {children}
      </Container>
    </section>
  );
}
