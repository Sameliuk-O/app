import { ICounter } from "@/utils/extractKeyValuePairsWithServiceName.ts";

interface DataItem {
  month: number;
  year: number;
  counters: ICounter[];
}

export const reorderArrayByCurrentMonth = (
  array: DataItem[],
  currentMonth: number,
): DataItem[] => {
  const currentMonthIndex = array.findIndex(
    (item) => item.month === currentMonth,
  );

  if (currentMonthIndex === -1) return array;

  const beforeCurrent = array.slice(0, currentMonthIndex);
  const fromCurrent = array.slice(currentMonthIndex);

  return [...fromCurrent, ...beforeCurrent];
};
