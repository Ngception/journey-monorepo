// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setFadeOptions = (key?: any, duration?: number) => {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    ...(duration && { transition: { duration } }),
    ...(key && { key }),
  };
};
