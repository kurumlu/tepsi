Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => 0,
  }),
});
