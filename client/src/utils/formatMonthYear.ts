import { monthNames } from "@/constants/monthNames.ts";

export const formatMonthYear = (month: number, year: number) => {
  return `${monthNames[month - 1]} ${year}`;
};
