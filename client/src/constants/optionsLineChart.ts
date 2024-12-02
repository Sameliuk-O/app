import { borderGray } from "@/constants/colors.ts";
import { ChartOptions, LegendItem } from "chart.js";

export const optionsLineChart: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        boxWidth: 20,
        padding: 20,
        generateLabels: (chart) => {
          return chart.data.datasets.map(
            (dataset, i): LegendItem => ({
              text: dataset.label ?? "",
              fillStyle: dataset.borderColor as string,
              strokeStyle: dataset.borderColor as string,
              lineWidth: 2,
              hidden: !chart.isDatasetVisible(i),
              datasetIndex: i,
            }),
          );
        },
      },
    },
    tooltip: {
      mode: "index",
      intersect: false,
    },
  },
  interaction: {
    mode: "index",
    intersect: false,
  },
  scales: {
    x: {
      grid: {
        color: borderGray,
      },
      ticks: {
        font: {
          size: 14,
        },
      },
    },
    y: {
      min: 0,
      grid: {
        color: borderGray,
      },
      ticks: {
        stepSize: 5,
        font: {
          size: 14,
        },
      },
    },
  },
  elements: {
    line: {
      tension: 0.4,
      borderWidth: 3,
    },
    point: {
      radius: 1,
      hoverRadius: 7,
      backgroundColor: "#fff",
      borderWidth: 2,
    },
  },
};
