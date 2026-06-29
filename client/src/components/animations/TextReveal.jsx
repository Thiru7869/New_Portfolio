import { motion } from 'framer-motion';
import { EASE_OUT } from '@/lib/animation';

/**
 * TextReveal — animates text word-by-word on entrance.
 * Clean, professional — no typewriter effect.
 */
export function TextReveal({ text, delay = 0, duration = 0.6, className, as: Tag = 'span' }) {
  const words = text.split(' ');

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration,
            delay: delay + i * 0.06,
            ease: EASE_OUT,
          }}
          className="inline-block mr-[0.25em]"
          aria-hidden="true"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
