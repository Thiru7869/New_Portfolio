import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE_OUT } from '@/lib/animation';

const containerVariants = (stagger, delayChildren) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

const itemVariants = (y, duration) => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration, ease: EASE_OUT } },
});

/**
 * StaggerContainer — wraps children and staggers their entrance animations.
 * Each direct child wrapped in <StaggerItem> will animate in sequence.
 *
 * @param {number} stagger       - delay between each child (seconds)
 * @param {number} delayChildren - delay before first child starts (seconds)
 */
export function StaggerContainer({
  children,
  stagger = 0.08,
  delayChildren = 0,
  className,
  once = true,
  ...props
}) {
  return (
    <motion.div
      variants={containerVariants(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem — must be a direct child of StaggerContainer.
 */
export function StaggerItem({ children, y = 16, duration = 0.5, className, ...props }) {
  return (
    <motion.div variants={itemVariants(y, duration)} className={cn(className)} {...props}>
      {children}
    </motion.div>
  );
}
