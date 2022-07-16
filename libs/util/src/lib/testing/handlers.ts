/* eslint-disable @typescript-eslint/no-explicit-any */
export const mockWindowLocation = () => {
  global.window = Object.create(window);
  Object.defineProperty(window, 'location', {
    value: {
      href: 'localhost',
    },
    writable: true,
  });
};

export const restoreWindowLocation = (window: any) => {
  global.window = window;
};
