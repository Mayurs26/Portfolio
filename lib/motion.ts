// Shared motion configuration for consistent animations across the site

// Standard easing curve — exponential out
export const EASE = [0.16, 1, 0.3, 1] as const;

// Standard durations
export const DURATION = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.7,
  hero: 0.8,
} as const;

// Scroll-triggered fade-up preset
export const fadeUpProps = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  transition: { duration: DURATION.slow, delay, ease: EASE },
});

// Stagger children preset
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASE },
  },
};
