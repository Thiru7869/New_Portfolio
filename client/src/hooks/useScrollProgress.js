import { useState, useEffect } from 'react';

/**
 * Returns scroll progress as a 0–100 number and whether the
 * page has scrolled past a threshold (used for navbar styling).
 */
export function useScrollProgress(threshold = 60) {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      const top = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (top / max) * 100 : 0);
      setScrolled(top > threshold);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { progress, scrolled };
}
