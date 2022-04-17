export const isValidDate = (date: string, separator = '/') => {
  const split: string[] = date.split(separator);
  if (split.length !== 3) return false;

  const year = parseInt(split[2]);
  const month = parseInt(split[1]);
  const day = parseInt(split[0]);
  if (!year || !month || !day) return false;

  const dateCheck: Date = new Date(year, month - 1, day);
  return (
    year === dateCheck.getFullYear() &&
    month - 1 === dateCheck.getMonth() &&
    day === dateCheck.getDate()
  );
};
