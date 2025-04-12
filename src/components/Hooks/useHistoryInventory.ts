// src/hooks/useInventoryHistory.ts
import { useState, useEffect } from "react";
import axios from "axios";

export interface HistoryRecord {
  changeType: "added" | "removed" | "lowStock";
  amount: number;
  timestamp: string; 
}

export interface MonthlyData {
  month: string;
  added: number;
  removed: number;
  lowStock: number;
}

const API_URL = "https://casapro-backend-o0k1.onrender.com";

export default function useInventoryHistory(userId: string, refresh: any) {
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`${API_URL}/inventory/history/${userId}`)
      .then(res => {
        setHistory(res.data.history);
        // console.log("Fetched history:", res.data.history); debug purpose only!!!
      })
      .catch(err => {
        console.error("Error fetching history:", err);
      });
  }, [userId, refresh]);

  // Aggregate by month
  const buckets: Record<string, MonthlyData> = {};
  history.forEach(({ timestamp, changeType, amount }) => {
    const month = new Date(timestamp).toLocaleString("default", { month: "short" });
    if (!buckets[month]) buckets[month] = { month, added: 0, removed: 0, lowStock: 0 };
    buckets[month][changeType] += amount;
  });

  // Sort into an array by calendar order
  const monthOrder = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const chartData = Object.values(buckets).sort(
    (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
  );

  return chartData;
}
