export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3 },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.3 },
};

export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
};

export const spinAnimation = {
  animate: { rotate: 360 },
  transition: { duration: 1, repeat: Infinity },
};
