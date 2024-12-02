import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartDataset,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";

import { countersData } from "@/constants/counterServiceFields.ts";
import { monthNames } from "@/constants/monthNames.ts";
import { optionsLineChart } from "@/constants/optionsLineChart.ts";
import { ICounter } from "@/utils/extractKeyValuePairsWithServiceName.ts";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
);

const LineChart = ({
  counter,
  serviceName,
  selectOptions,
  colors,
}: {
  counter: ICounter[];
  serviceName?: string;
  selectOptions: string | number;
  colors: string[];
}) => {
  const dataByKeys: { [key: string]: number[] } = {};
  const serviceTypes = countersData.filter((el) => el.service === serviceName);
  const datasets: ChartDataset<"line">[] = [];

  const option =
    countersData
      .find((el) => el.service === serviceName)
      ?.counters.find((value) => value.type === selectOptions)?.name ||
    "allCounters";

  const optionalIndex = countersData
    .find((el) => el.service === serviceName)
    ?.counters.findIndex((value) => value.type === selectOptions);

  counter.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (key !== "day" && key !== "month" && key !== "year") {
        if (!dataByKeys[key]) {
          dataByKeys[key] = new Array(12).fill(0);
        }
        const monthIndex = Number(item.month) - 1;
        const value = Number(item[key]);
        if (
          !isNaN(monthIndex) &&
          monthIndex >= 0 &&
          monthIndex < 12 &&
          !isNaN(value)
        ) {
          dataByKeys[key][monthIndex] = value;
        }
      }
    });
  });

  const keysToDisplay =
    option === "allCounters" ? Object.keys(dataByKeys) : [option];

  keysToDisplay.forEach((key, index) => {
    const label = serviceTypes[0].counters.find((el) => el.name === key);

    const backgroundColor =
      optionalIndex !== -1 && optionalIndex
        ? colors[optionalIndex]
        : colors[index % colors.length];

    datasets.push({
      label: `${label?.type}`,
      data: dataByKeys[key],
      borderColor: backgroundColor,
      fill: false,
      tension: 0.4,
      pointBackgroundColor: backgroundColor,
    });
  });

  const data: ChartData<"line"> = {
    labels: monthNames,
    datasets: datasets,
  };

  return <Line data={data} options={optionsLineChart} />;
};

export default LineChart;
