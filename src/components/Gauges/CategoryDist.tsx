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
import  { Product } from "../Hooks/useInventory";


interface ChartDataItem {
  category: string;
  count: number;
}

interface CategoryDistProps{
  inventoryData: Product[]
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#6366f1", "#14b8a6"];

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload as ChartDataItem;
    return (
      <div className="bg-white text-xs rounded border border-gray-200 shadow p-2">
        <p className="text-gray-600">{item.category}</p>
        <p className="font-bold">{item.count} items</p>
      </div>
    );
  }
  return null;
};

const CategoryDist: React.FC<CategoryDistProps> = ({inventoryData}) => {
 

  const chartData = inventoryData.reduce<ChartDataItem[]>((acc, item) => {
    const existingCategory = acc.find(data => data.category === item.category);
    if (existingCategory) {
      existingCategory.count += Number(item.quantity);

    } else {
      acc.push({ category: item.category, count: Number(item.quantity) });
    }
    return acc;
  }, []);

  return (
    <Card className="w-80 h-80 border-none rounded-xl bg-white shadow-sm flex flex-col">
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-center text-sm text-muted-foreground">
          Inventory Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 px-2 pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" hide />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              axisLine={false}
              width={80}
              tick={{ fontSize: 12, fill: "#666" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" barSize={14} radius={[0, 6, 6, 0]}>
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
              <LabelList dataKey="count" position="right" offset={10} className="fill-gray-800 text-xs" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CategoryDist;
