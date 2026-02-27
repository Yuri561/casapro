import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Product } from "../Hooks/useInventory";

interface MoneySpentProps {
  inventoryData: Product[];
}

interface ChartDataItem {
  category: string;
  totalSpent: number;
}

const COLORS = [
  "#22D3EE", // cyan
  "#38BDF8", // sky
  "#3B82F6", // blue
  "#10B981", // emerald
  "#F59E0B", // amber
  "#EF4444", // red
];

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { category, totalSpent } = payload[0].payload;

    return (
      <div className="bg-[#0f172a] border border-white/10 backdrop-blur-xl rounded-xl p-3 shadow-[0_0_20px_rgba(34,211,238,0.2)] text-xs">
        <div className="text-gray-400 uppercase tracking-wide">
          {category}
        </div>
        <div className="text-cyan-400 font-bold">
          ${totalSpent.toLocaleString()}
        </div>
      </div>
    );
  }
  return null;
};

const MoneySpent: React.FC<MoneySpentProps> = ({ inventoryData }) => {

  const chartData = inventoryData.reduce<ChartDataItem[]>((acc, item) => {
    const cost = item.price * (item.quantity || 1);
    const existing = acc.find((data) => data.category === item.category);

    if (existing) {
      existing.totalSpent += cost;
    } else {
      acc.push({
        category: item.category,
        totalSpent: Number(cost),
      });
    }

    return acc;
  }, []);

  const totalAmount = chartData.reduce(
    (sum, data) => sum + data.totalSpent,
    0
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
        shadow-[0_0_45px_rgba(34,211,238,0.12)]
        flex flex-col
      "
    >
      <CardHeader className="p-5 pb-2 text-center">
        <CardTitle className="text-sm text-gray-400 tracking-wide">
          Money Spent Breakdown
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col items-center justify-center p-4">

        {/* Donut Chart */}
        <div className="relative w-full h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={4}
                dataKey="totalSpent"
                animationDuration={600}
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "transparent" }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">
              Total
            </p>
            <p className="text-lg font-bold text-cyan-400">
              $
              {totalAmount.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-xs text-gray-300">
          {chartData.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                  boxShadow: `0 0 6px ${COLORS[index % COLORS.length]}`,
                }}
              ></span>
              {entry.category}
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  );
};

export default MoneySpent;