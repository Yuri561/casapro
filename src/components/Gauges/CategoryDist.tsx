import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/card";
import { Product } from "../Hooks/useInventory";

interface ChartDataItem {
  category: string;
  count: number;
}

interface CategoryDistProps {
  inventoryData: Product[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const COLORS = [
  "#22D3EE", // cyan-400
  "#38BDF8", // sky-400
  "#3B82F6", // blue-500
  "#6366F1", // indigo
  "#10B981", // emerald
  "#F59E0B", // amber
];

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload as ChartDataItem;

    return (
      <div className="bg-[#0f172a] border border-white/10 backdrop-blur-xl rounded-xl p-3 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
        <p className="text-gray-400 text-xs">
          {item.category.toUpperCase()}
        </p>
        <p className="text-cyan-400 font-bold text-sm">
          {item.count} items
        </p>
      </div>
    );
  }
  return null;
};

const CategoryDist: React.FC<CategoryDistProps> = ({
  inventoryData,
}) => {
  const chartData = inventoryData.reduce<ChartDataItem[]>(
    (acc, item) => {
      const existingCategory = acc.find(
        (data) => data.category === item.category
      );

      if (existingCategory) {
        existingCategory.count += Number(item.quantity);
      } else {
        acc.push({
          category: item.category,
          count: Number(item.quantity),
        });
      }

      return acc;
    },
    []
  );

  return (
    <Card
      className="
        w-full
        h-full
        bg-white/5
        border border-white/10
        backdrop-blur-xl
        rounded-3xl
        shadow-[0_0_40px_rgba(34,211,238,0.1)]
        flex flex-col
      "
    >
      <CardHeader className="p-5 pb-0">
        <CardTitle className="text-center text-sm text-gray-400 tracking-wide">
          Inventory Breakdown
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 px-4 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
          >
            <CartesianGrid
              stroke="rgba(255,255,255,0.05)"
              horizontal={false}
            />

            <XAxis type="number" hide />

            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              axisLine={false}
              width={90}
              tick={{
                fontSize: 12,
                fill: "#94A3B8", // slate-400
              }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Bar
              dataKey="count"
              barSize={14}
              radius={[0, 8, 8, 0]}
              animationDuration={600}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

              <LabelList
                dataKey="count"
                position="right"
                offset={8}
                className="fill-white text-xs"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CategoryDist;