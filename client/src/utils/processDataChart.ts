import { ChartData } from "chart.js";

import { countersData } from "@/constants/counterServiceFields.ts";
import { ICounter } from "@/utils/extractKeyValuePairsWithServiceName.ts";
import { formatMonthYear } from "@/utils/formatMonthYear.ts";
import { textGrayChart } from "@/constants/colors.ts";

export const processDataChart = (
  counters: ICounter[],
  serviceName?: string,
  selectOptions?: number | string,
  colors?: string[],
) => {
  if (!counters || counters.length === 0) {
    return {
      sumCounters: 0,
      chartData: {
        labels: [""],
        datasets: [
          {
            data: [1],
            backgroundColor: ["rgba(0, 0, 0, 0)"],
            borderColor: [textGrayChart],
            borderWidth: 4,
          },
        ],
      },
      monthYearString: "",
    };
  }

  const dataByKeys: { [key: string]: number } = {};
  const serviceTypes =
    countersData?.filter((el) => el.service === serviceName) || [];

  counters.forEach((counter) => {
    Object.keys(counter).forEach((key) => {
      if (key !== "day" && key !== "month" && key !== "year") {
        if (!dataByKeys[key]) {
          dataByKeys[key] = 0;
        }
        const value = Number(counter[key as keyof ICounter]);
        if (!isNaN(value)) {
          dataByKeys[key] += value;
        }
      }
    });
  });

  const labels = Object.keys(dataByKeys).map((key) => {
    const label = serviceTypes[0]?.counters?.find((el) => el.name === key);
    return label?.type || key;
  });

  const values = Object.values(dataByKeys);
  const index = labels.findIndex((el) => el === selectOptions);

  const sumCounters =
    index !== -1
      ? values[index]
      : Object.values(dataByKeys).reduce((acc, value) => acc + value, 0);

  const allZero = Object.values(dataByKeys).every((value) => value === 0);

  if (allZero) {
    return {
      sumCounters: 0,
      chartData: {
        labels: [""],
        datasets: [
          {
            data: [1],
            backgroundColor: ["rgba(0, 0, 0, 0)"],
            borderColor: [textGrayChart],
            borderWidth: 4,
          },
        ],
      },
      monthYearString: "",
    };
  }

  const chartData: ChartData<"doughnut"> = {
    labels: index !== -1 ? [labels[index]] : labels,
    datasets: [
      {
        data: index !== -1 ? [values[index]] : values,
        backgroundColor: index !== -1 ? colors && [colors[index]] : colors,
        borderRadius: counters.length === 1 ? 0 : 8,
        borderColor: "white",
        borderWidth: values.length === 1 ? 0 : 4,
      },
    ],
  };

  const monthYearString = formatMonthYear(counters[0].month, counters[0].year);

  return { sumCounters, chartData, monthYearString };
};
