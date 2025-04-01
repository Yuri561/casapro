import React, { useState } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import { getInventoryData } from "./getInventoryData";

const InventoryReports:React.FC = () => {
    const [options] = useState<AgChartOptions>({
        title: {
          text: "Inventory Report",
        },
        data: getInventoryData(),
        series: [
            {
              type: "area",
              xKey: "month",
              yKey: "added",
              yName: "Items Added",
              stroke: "teal",
              strokeWidth: 3,
              lineDash: [3, 4],
              fill: "rgba(56, 189, 248, 0.3)", 
              marker: {
                enabled: true,
                fill: "teal",
              },
            },
            {
              type: "area",
              xKey: "month",
              yKey: "removed",
              yName: "Items Removed",
              stroke: "red",
              strokeWidth: 3,
              fill: "rgba(239, 68, 68, 0.3)", // Light red for removed
              marker: {
                enabled: true,
                fill: "red",
              },
            },
            {
              type: "area",
              xKey: "month",
              yKey: "lowStock",
              yName: "Low Stock Alerts",
              stroke: "orange",
              strokeWidth: 3,
              fill: "rgba(251, 146, 60, 0.3)", // Light orange for low stock
              marker: {
                enabled: true,
                fill: "orange",
              },
              label: {
                enabled: true,
                fontWeight: "bold",
                formatter: ({ value }) => value.toFixed(0), // Display number of low stock alerts
              },
            },
          ],
          
      });
    
  return (
    <div className="w-80 h-80 bg-white rounded-xl overflow-hidden shadow-lg ">
        <AgCharts options={options}  />
    </div>
  )
}

export default InventoryReports