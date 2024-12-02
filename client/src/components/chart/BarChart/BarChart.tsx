import { OverlayContainer } from "@/components/OverlayContainer";
import { getUserFlowStateFrigade } from "@/services/getUserFlowStateFrigade.ts";
import { IFlowState } from "@/types/IFlowState.ts";
import * as Frigade from "@frigade/react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartDataset,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import { countersData } from "@/constants/counterServiceFields.ts";
import { monthNames } from "@/constants/monthNames.ts";
import { optionsBarChart } from "@/constants/optionsBarChart.ts";
import { ICounter } from "@/utils/extractKeyValuePairsWithServiceName.ts";

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

const BarChart = ({
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
  const datasets: ChartDataset<"bar">[] = [];
  const paddingData = new Array(12).fill(1);

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
    if (index > 0) {
      datasets.push({
        label: "",
        data: paddingData,
        backgroundColor: "rgba(0, 0, 0, 0)",
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      });
    }

    const label = serviceTypes[0].counters.find((el) => el.name === key);

    const backgroundColor =
      optionalIndex !== -1 && optionalIndex
        ? colors[optionalIndex]
        : colors[index % colors.length];

    datasets.push({
      label: `${label?.type}`,
      data: dataByKeys[key],
      backgroundColor: backgroundColor,
      barPercentage: 0.8,
      categoryPercentage: 0.8,
      borderRadius: 5,
    });
  });

  const data: ChartData<"bar"> = {
    labels: monthNames,
    datasets: datasets,
  };

  const [flow, setFlow] = useState(true);

  useEffect(() => {
    const fetchFlowState = async () => {
      const resp = await getUserFlowStateFrigade("my-user-id");
      const filterRes = resp.eligibleFlows.filter(
        (el: IFlowState) => el.flowSlug === "flow_yPza5WgP",
      )[0].$state.completed;
      setFlow(filterRes);
    };

    fetchFlowState();
  }, []);

  return (
    <>
      {!flow && <OverlayContainer />}
      <div
        className={classNames({
          "bg-white p-2 lg:py-4 lg:px-6 z-20 relative rounded-2xl": !flow,
        })}
      >
        <Bar data={data} options={optionsBarChart} />
      </div>
      {!flow && (
        <div
          className={classNames(
            "z-20 max-w-[348px] absolute mt-2.5 ml-4 mr-4 rounded-2xl inset-0 h-fit top-1/3 lg:mr-0 lg:left-0 lg:-ml-4 lg:top-1/3 2xl:max-w-[400px] 2xl:lg:-ml-24",
            {
              "bg-white": !flow,
            },
          )}
        >
          <Frigade.Card
            flowId="flow_yPza5WgP"
            dismissible={true}
            className="onboarding z-80"
            onComplete={() => setFlow(true)}
          />
        </div>
      )}
    </>
  );
};

export default BarChart;
