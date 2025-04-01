import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector } from "recharts";

// 🎯 New data with more categories
const data = [
  { name: "Groceries", value: 600 },
  { name: "Tools", value: 450 },
  { name: "Toiletries", value: 300 },
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 350 },
  { name: "Furniture", value: 500 },
  { name: "Subscriptions", value: 200 },
];

// ✅ Calculate the average value dynamically per category
const calculateCategoryAverage = (value: number) => {
  return (value / 12).toFixed(2); // Divide by 12 for monthly average
};

// 🎨 Custom rendering for active Pie section
const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value,
  } = props;

  return (
    <g>
      {/* ✅ Center Label for Active Shape */}
      <text
        x={cx}
        y={cy - 10}
        dy={8}
        textAnchor="middle"
        fill={fill}
        fontSize="14px"
        fontWeight="bold"
      >
        {payload.name}
      </text>
      <text
        x={cx}
        y={cy + 10}
        dy={8}
        textAnchor="middle"
        fill="#333"
        fontSize="12px"
      >
        {`Avg: ${calculateCategoryAverage(value)}`} {/* ✅ Show per-category avg */}
      </text>

      {/* ✅ Main Sector for Active Shape */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

const CategoryDist: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // ✅ Handle Pie Hover to update the active section
  const onPieEnter = useCallback((_, index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <div className="w-80 h-80 bg-white rounded-xl overflow-hidden shadow-lg p-2">
      {/* ✅ Title added above the PieChart */}

      {/* ✅ Center Pie Chart properly */}
      <div className="flex flex-col items-center justify-center mx-auto">
      <h5 className="font-bold text-gray-500  sm:text-1xl mb-2 text-center">
        Breakdown
      </h5>
        <PieChart width={350} height={350} className="">
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </div>
    </div>
  );
};

export default CategoryDist;
