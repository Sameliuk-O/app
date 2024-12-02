import { ChartOptions } from "chart.js";

export const optionsDoughnutChart: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "60%",
  plugins: {
    legend: {
      display: false,
    },
  },
};
