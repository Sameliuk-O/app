export const generateMonthYearArray = (year: number) => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    year,
    counters: [],
  }));
};
