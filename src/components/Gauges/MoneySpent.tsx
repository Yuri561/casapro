import React, { useState } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import { getMoneySpentData } from "./GetMoneySpent";

const MoneySpent: React.FC = () => {
  const [options] = useState<AgChartOptions>({
    data: getMoneySpentData(),
    title: {
      text: "Money Spent Breakdown",
      fontSize: 18,
    },
    series: [
        {
          type: "donut",
          calloutLabelKey: "category",
          angleKey: "amount",
          innerRadiusRatio: 0.9,
          innerLabels: [
            {
              text: "Money Spent",
              fontWeight: "bold",
            },
            {
              text: "$53,704",
              spacing: 4,
              fontSize: 48,
              color: "green",
            },
          ],
          innerCircle: {
            fill: "#c9fdc9",
          },
        },
      ],
    legend: {
      position: "bottom",
      spacing: 12,
      item: {
        marker: {
          size: 12,
        },
        label: {
          fontSize: 12,
        },
      },
    },
  });

  return (
    <div className="w-74 h-74 bg-white rounded-xl overflow-hidden shadow-lg">
      <AgCharts options={options} />
    </div>
  );
};

export default MoneySpent;
