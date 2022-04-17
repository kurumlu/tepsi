export const range = (start: number, end: number): number[] => {
  return new Array(end + 1 - start).fill('').map((_, i: number) => i + start);
};
