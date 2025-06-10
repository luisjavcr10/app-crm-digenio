export const calculatePercentage = (
  total: number,
  current: number
): number => {
  if (total === 0) {
    return 0;
  }
  return Math.round((current / total) * 100);
};