import React from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarGrid,
  PolarRadiusAxis,
  Label,
} from "recharts";

// Sample data: you could later replace this with actual item totals
const chartData = [
  { category: "inventory", count: 1260, fill: "hsl(200, 100%, 70%)" },
];

const InventoryGauge: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-2 flex flex-col w-80 h-80 max-w-md">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Total Inventory</h2>
        <p className="text-sm text-gray-500">Tracked with Casa Pro</p>
      </div>

      {/* Chart */}
      <div className="flex justify-center items-center mb-4">
        <RadialBarChart
          width={250}
          height={250}
          innerRadius={80}
          outerRadius={140}
          startAngle={90}
          endAngle={400}
          data={chartData}
        >
          <PolarGrid radialLines={false} stroke="none" />
          <RadialBar dataKey="count" background />

          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-black text-3xl font-bold"
                      >
                        {chartData[0].count.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-gray-500 text-sm"
                      >
                        Items Tracked
                      </tspan>
                    </text>
                  );
                }
                return null;
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </div>

    </div>
  );
};

export default InventoryGauge;
