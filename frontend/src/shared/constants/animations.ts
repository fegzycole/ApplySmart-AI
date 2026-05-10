export const MISSION_CONTROL_ANIMATIONS = {
  stagger: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
      },
    },
    item: {
      hidden: { opacity: 0, y: 24, scale: 0.96 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      },
    },
  },
} as const;
