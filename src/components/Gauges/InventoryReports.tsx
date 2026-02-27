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
  added: {
    color: "#22D3EE",
    fill: "rgba(34,211,238,0.15)",
    label: "Items Added",
  },
  removed: {
    color: "#EF4444",
    fill: "rgba(239,68,68,0.15)",
    label: "Items Removed",
  },
  lowStock: {
    color: "#F59E0B",
    fill: "rgba(245,158,11,0.15)",
    label: "Low Stock Alerts",
  },
} as const;

type TabKey = keyof typeof tabConfig;

const InventoryReports: React.FC<Props> = ({ refresh }) => {
  const data: MonthlyData[] = useInventoryHistory(refresh);
  const [activeTab, setActiveTab] = useState<TabKey>("added");
  const cfg = tabConfig[activeTab];

  return (
    <Card
      className="
        w-full
        h-full
        bg-white/5
        border border-white/10
        backdrop-blur-xl
        rounded-3xl
        shadow-[0_0_40px_rgba(34,211,238,0.12)]
        flex flex-col
      "
    >
      <CardHeader className="p-5 pb-2 text-center">
        <CardTitle className="text-sm text-gray-400 tracking-wide">
          Inventory Report
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 px-4 pb-4">

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as TabKey)}
          className="mb-4"
        >
          <TabsList className="w-full justify-center gap-3 bg-white/5 border border-white/10 rounded-xl p-1">
            {(Object.keys(tabConfig) as TabKey[]).map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="
                  text-xs px-3 py-1.5
                  data-[state=active]:bg-cyan-400
                  data-[state=active]:text-black
                  data-[state=active]:shadow-[0_0_15px_rgba(34,211,238,0.4)]
                  text-gray-300
                  transition-all
                  rounded-lg
                "
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Chart */}
        <div className="w-full h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 10, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                content={({ active, payload }) =>
                  active && payload?.[0] ? (
                    <div className="bg-[#0f172a] border border-white/10 backdrop-blur-xl text-xs px-3 py-2 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                      <strong className="text-gray-300">
                        {payload[0].payload.month}
                      </strong>
                      <br />
                      <span style={{ color: cfg.color }}>
                        {cfg.label}: {payload[0].value}
                      </span>
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
                dot={false}
                animationDuration={600}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </CardContent>
    </Card>
  );
};

export default InventoryReports;