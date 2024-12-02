import { ChartOptions } from "chart.js";

export const optionsBarChart: ChartOptions<"bar"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 20,
      },
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
      },
    },
    y: {
      stacked: true,
      beginAtZero: true,
    },
  },
};
