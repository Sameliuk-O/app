import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import classNames from "classnames";

import { optionsDoughnutChart } from "@/constants/optionsDoughnutChart.ts";
import { processDataChart } from "@/utils/processDataChart.ts";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { ICounter } from "@/utils/extractKeyValuePairsWithServiceName";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({
  counters,
  serviceName,
  legendClassName,
  selectOptions,
  colors,
}: {
  counters: ICounter[];
  serviceName?: string;
  legendClassName?: string;
  selectOptions: number | string;
  colors: string[];
}) => {
  const [sumCounters, setSumCounters] = useState(0);
  const [monthYear, setMonthYear] = useState("");
  const [chartData, setChartData] = useState<ChartData<"doughnut">>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const { sumCounters, chartData, monthYearString } = processDataChart(
      counters,
      serviceName,
      selectOptions,
      colors,
    );
    setSumCounters(sumCounters);
    setChartData(chartData);
    setMonthYear(monthYearString);
  }, [counters, serviceName, selectOptions]);

  return (
    <>
      <div className="relative w-full h-80">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={classNames("text-lg text-gray500", {
              [legendClassName ? legendClassName : ""]: !!legendClassName,
            })}
          >
            {monthYear}
          </span>
          <span className="text-gray800 text-xl">
            {sumCounters}{" "}
            {serviceName === "energozbut" ? (
              "кВт"
            ) : (
              <>
                м<sup>3</sup>
              </>
            )}
          </span>
        </div>
        <Doughnut
          data={chartData}
          options={optionsDoughnutChart}
          className="relative z-50"
        />
      </div>
    </>
  );
};

export default DoughnutChart;
