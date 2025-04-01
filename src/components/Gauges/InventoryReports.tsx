import React, { useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "../ui/tabs" 

const inventoryData = [
  { month: "Jan", added: 120, removed: 45, lowStock: 25 },
  { month: "Feb", added: 135, removed: 60, lowStock: 20 },
  { month: "Mar", added: 160, removed: 55, lowStock: 30 },
  { month: "Apr", added: 190, removed: 70, lowStock: 22 },
]

const InventoryReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState("added")

  const tabConfig = {
    added: {
      color: "#0d9488",
      fill: "rgba(13, 148, 136, 0.2)",
      label: "Items Added",
    },
    removed: {
      color: "#dc2626",
      fill: "rgba(220, 38, 38, 0.2)",
      label: "Items Removed",
    },
    lowStock: {
      color: "#ea580c",
      fill: "rgba(234, 88, 12, 0.2)",
      label: "Low Stock Alerts",
    },
  }

  const currentConfig = tabConfig[activeTab as keyof typeof tabConfig]

  return (
    <Card className="w-80 h-80 border-none bg-white rounded-xl shadow-md flex flex-col">
      <CardHeader className="p-3 pb-0 text-center">
        <CardTitle className="text-sm text-muted-foreground">Inventory Report</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col px-3 pt-2 pb-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-2">
          <TabsList className="w-full justify-center gap-2 bg-gray-100">
            <TabsTrigger value="added" className="text-xs px-2">Added</TabsTrigger>
            <TabsTrigger value="removed" className="text-xs px-2">Removed</TabsTrigger>
            <TabsTrigger value="lowStock" className="text-xs px-2">Low Stock</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="w-full h-[160px] sm:h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={inventoryData}
              margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" fontSize={10} stroke="#ccc" />
              <YAxis fontSize={10} stroke="#ccc" />
              <Tooltip
                content={({ active, payload }) =>
                  active && payload?.[0] ? (
                    <div className="bg-white border text-xs px-2 py-1 rounded shadow">
                      <strong>{payload[0].payload.month}</strong><br />
                      {currentConfig.label}: {payload[0].value}
                    </div>
                  ) : null
                }
              />
              <Area
                type="monotone"
                dataKey={activeTab}
                stroke={currentConfig.color}
                fill={currentConfig.fill}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default InventoryReports
