import { HeroBackground } from './HeroBackground';
import { HeroContent }    from './HeroContent';
import { HeroVisual }     from './HeroVisual';
import { HeroScrollHint } from './HeroScrollHint';

/**
 * Hero — full-viewport two-column section.
 *
 * Desktop layout  (lg+):  [text  60%]  [visual  40%]
 * Mobile layout   (<lg):  [text]  then [visual] — single column
 *
 * Animation sequence — all springs, no CSS transitions:
 *   0.05s  badge → 0.22s name[0] → 0.37s name[1] → 0.52s name[2]
 *   0.35s  photo reveals (spring scale-in)
 *   1.00s  role cycler (after name spring settles)
 *   1.05s  education badge on photo
 *   1.18s  description
 *   1.25s  location badge on photo
 *   1.32s  stats row
 *   1.44s  CTAs
 *   1.56s  social links
 *   1.80s  scroll hint
 */
export function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction — Thirumala Narasimha Poluru, Full Stack Developer & Data Scientist"
      className="relative flex min-h-[calc(100dvh-60px)] w-full items-center overflow-hidden"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-14 sm:py-16 lg:px-8 lg:py-0">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-6 xl:grid-cols-[1fr_440px] xl:gap-16">

          {/* Left — text hierarchy */}
          <HeroContent />

          {/* Right — visual composition */}
          <HeroVisual />

        </div>
      </div>

      {/* Scroll indicator — appears last, anchored bottom-left */}
      <HeroScrollHint />
    </section>
  );
}
