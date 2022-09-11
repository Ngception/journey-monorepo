// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setFadeOptions = (key?: any, duration?: number) => {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: duration || 0.25,
    },
    ...(key && { key }),
  };
};

export const setSlideYOptions = (key?: string, duration?: number) => {
  return {
    initial: { opacity: 0, y: 0 },
    animate: { opacity: 1, y: 50 },
    exit: { opacity: 0, y: 0 },
    transition: {
      duration: duration || 0.25,
    },
    ...(key && { key }),
  };
};
