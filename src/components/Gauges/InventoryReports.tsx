import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import useInventoryHistory, { MonthlyData } from "../Hooks/useHistoryInventory";

interface Props {
  userId: string;
  refresh: number;
}

const tabConfig = {
  added: { color: "#0d9488", fill: "rgba(13,148,136,0.2)", label: "Items Added" },
  removed: { color: "#dc2626", fill: "rgba(220,38,38,0.2)", label: "Items Removed" },
  lowStock: { color: "#ea580c", fill: "rgba(234,88,12,0.2)", label: "Low Stock Alerts" },
} as const;

type TabKey = keyof typeof tabConfig;

const InventoryReports: React.FC<Props> = ({ userId, refresh }) => {
  const data: MonthlyData[] = useInventoryHistory(userId, refresh);
  const [activeTab, setActiveTab] = useState<TabKey>("added");
  const cfg = tabConfig[activeTab];

  return (
    <Card className="w-80 h-80 bg-white  border-none rounded-xl shadow-md flex flex-col">
      <CardHeader className="p-3 pb-0 text-center">
        <CardTitle className="text-sm text-muted-foreground">Inventory Report</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 px-3 pt-2 pb-1">
        <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as TabKey)} className="mb-2">
          <TabsList className="w-full justify-center gap-2 bg-gray-100">
            {(Object.keys(tabConfig) as TabKey[]).map((tab) => (
              <TabsTrigger key={tab} value={tab} className="text-xs px-2">
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="w-full h-[160px] sm:h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#666" }} />
              <YAxis tick={{ fontSize: 10, fill: "#666" }} />
              <Tooltip
                content={({ active, payload }) =>
                  active && payload?.[0] ? (
                    <div className="bg-white border text-xs px-2 py-1 rounded shadow">
                      <strong>{payload[0].payload.month}</strong>
                      <br />
                      {cfg.label}: {payload[0].value}
                    </div>
                  ) : null
                }
              />
              <Area
                type="monotone"
                dataKey={activeTab}
                stroke={cfg.color}
                fill={cfg.fill}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryReports;
