import { AnimatedGridBackground } from '@/components/animations';
import { AboutIntro }      from './AboutIntro';
import { AboutStats }      from './AboutStats';
import { AboutTimeline }   from './AboutTimeline';
import { AboutEducation }  from './AboutEducation';
import { AboutStrengths }  from './AboutStrengths';
import { AboutPhilosophy } from './AboutPhilosophy';
import { AboutFocus }      from './AboutFocus';

/**
 * About — a scroll-driven storytelling journey answering:
 *   Who am I? → AboutIntro
 *   What have I achieved? → AboutStats
 *   Where did it start? → AboutTimeline
 *   What is my education? → AboutEducation
 *   What do I bring? → AboutStrengths
 *   How do I think? → AboutPhilosophy
 *   Where am I going? → AboutFocus
 */
export function About() {
  return (
    <section
      id="about"
      aria-label="About Thirumala Narasimha Poluru"
      className="relative overflow-hidden"
    >
      {/* Shared subtle background — all layers pointer-events-none */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <AnimatedGridBackground dotOpacity={0.022} />
        {/* Top-left orb — counterpoint to Hero's top-right */}
        <div
          className="absolute -left-52 top-24 h-[650px] w-[650px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.055) 0%, transparent 70%)' }}
        />
        {/* Bottom-right orb — balances the composition */}
        <div
          className="absolute -right-72 bottom-64 h-[750px] w-[750px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.038) 0%, transparent 70%)' }}
        />
      </div>

      {/* Narrative flow — ordered by storytelling sequence */}
      <AboutIntro />
      <AboutStats />
      <AboutTimeline />
      <AboutEducation />
      <AboutStrengths />
      <AboutPhilosophy />
      <AboutFocus />
    </section>
  );
}
