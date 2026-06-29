import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE_OUT, DURATION } from '@/lib/animation';

/**
 * PageTransition — wraps the entire page/app with an entrance animation.
 * Mount once in App.jsx. Creates a premium initial page load feel.
 *
 * Usage:
 *   <PageTransition>
 *     <YourPage />
 *   </PageTransition>
 */
export function PageTransition({ children, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.slow, ease: EASE_OUT }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/**
 * SectionTransition — for routing between views (if used with React Router).
 * Wrap route content with this and wrap in AnimatePresence at the router level.
 */
export function SectionTransition({ children, className }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={typeof window !== 'undefined' ? window.location.pathname : 'page'}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: DURATION.default, ease: EASE_OUT }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
