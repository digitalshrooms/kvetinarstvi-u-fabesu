import type { Variants } from 'framer-motion';

/** Custom "ease out" curve (ne výchozí CSS ease) — plynulý start, měkké doběhnutí. */
export const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export function staggerContainer(stagger = 0.08): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };
}

/** whileInView nastavení: animuj jen jednou, spusť těsně před vstupem do viewportu. */
export const viewportOnce = { once: true, margin: '-80px' } as const;
