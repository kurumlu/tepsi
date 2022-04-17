export const isTouchScreen = (): boolean =>
  'ontouchstart' in document.documentElement;
