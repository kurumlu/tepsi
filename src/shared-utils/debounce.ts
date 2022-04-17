export const debounce = <T>(
  func: (...args: T[]) => void,
  delay: number
): ((...args: T[]) => void) => {
  let inDebounce;
  return (...args) => {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func(...args), delay);
  };
};
