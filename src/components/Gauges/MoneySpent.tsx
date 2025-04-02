import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/card";

import useInventory from "../Hooks/useInventory";

const COLORS = [
  "#60a5fa",
  "#22c55e",
  "#facc15",
  "#fb7185",
  "#c084fc",
  "#f97316",
];

// Custom Tooltip Component
const CustomTooltip: React.FC<any> = ({ active, payload }) => {
    
    if (active && payload && payload.length) {
        const { category, price } = payload[0].payload;
        return (
            <div
            className="bg-white p-2 rounded shadow text-xs border border-gray-200"
            style={{
                marginLeft: '30px',   
                marginTop: '-10px',
                pointerEvents: 'none', 
                position: 'relative',
            }}
            >
          <div className="font-bold">{category}</div>
          <div>${price.toLocaleString()}</div>
        </div>
      );
    }
    return null;
};

const MoneySpent: React.FC = () => {
    const data = useInventory();
    
    const totalAmount = data.reduce((acc, curr) => acc + curr.price, 0);
  return (
    <Card className="w-80 h-80 bg-white border-none shadow-sm rounded-xl flex flex-col">
      <CardHeader className="p-3 pb-0 text-center">
        <CardTitle className="text-sm text-muted-foreground">
          Money Spent Breakdown
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col items-center justify-center p-0">
        <div className="relative w-full h-[130px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={3}
                dataKey="price"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
            </PieChart>
          </ResponsiveContainer>

          {/*Label for Total Amount */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-[10px] text-gray-500">Total</p>
            <p className="text-lg font-bold text-emerald-600">
              ${totalAmount.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Compact Legend */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs text-gray-600">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
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
