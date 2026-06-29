import { Suspense, lazy } from 'react';
import { Navbar, Footer }  from '@/components/layout';
import { ScrollProgress }  from '@/components/layout/ScrollProgress';
import { CursorGlow, MouseFollower, PageTransition } from '@/components/animations';

// Hero is eagerly loaded — it is the LCP element and must render immediately.
import { Hero } from '@/components/sections/hero';

// All sections below the fold are code-split and lazy-loaded.
// Each import creates a separate chunk, reducing the initial JS parse cost.
const About          = lazy(() => import('@/components/sections/about').then(m =>          ({ default: m.About })));
const Skills         = lazy(() => import('@/components/sections/skills').then(m =>         ({ default: m.Skills })));
const Projects       = lazy(() => import('@/components/sections/projects').then(m =>       ({ default: m.Projects })));
const Experience     = lazy(() => import('@/components/sections/experience').then(m =>     ({ default: m.Experience })));
const Certifications = lazy(() => import('@/components/sections/certifications').then(m => ({ default: m.Certifications })));
const Contact        = lazy(() => import('@/components/sections/contact').then(m =>        ({ default: m.Contact })));

// Minimal skeleton that matches the section header rhythm — dark surface pulse.
// Keeps cumulative layout shift (CLS) near zero while chunks stream in.
function SectionSkeleton() {
  return (
    <div className="animate-pulse py-24 md:py-32" aria-hidden="true">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-4 h-2.5 w-20 rounded-full bg-surface" />
        <div className="mb-3 h-9 w-72 rounded-xl bg-surface" />
        <div className="h-4 w-[28rem] max-w-full rounded-lg bg-surface" />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <PageTransition>
      {/* Ambient cursor effects — mounted once at root, outside lazy boundary */}
      <CursorGlow opacity={0.05} size={550} />
      <MouseFollower size={8} />
      <ScrollProgress />
      <Navbar />

      <main>
        {/* Eager — LCP element, renders on first paint */}
        <Hero />

        {/* Lazy — each section is a separate chunk, streamed as the user scrolls */}
        <Suspense fallback={<SectionSkeleton />}><About /></Suspense>
        <Suspense fallback={<SectionSkeleton />}><Skills /></Suspense>
        <Suspense fallback={<SectionSkeleton />}><Projects /></Suspense>
        <Suspense fallback={<SectionSkeleton />}><Experience /></Suspense>
        <Suspense fallback={<SectionSkeleton />}><Certifications /></Suspense>
        <Suspense fallback={<SectionSkeleton />}><Contact /></Suspense>
      </main>

      <Footer />
    </PageTransition>
  );
}
