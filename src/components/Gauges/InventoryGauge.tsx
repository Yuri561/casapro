import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Product } from "../Hooks/useInventory";

interface InventoryGaugeProps {
  inventoryData: Product[];
}

const InventoryGauge: React.FC<InventoryGaugeProps> = ({ inventoryData }) => {
  const totalItems = inventoryData.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const capacity = 1000;
  const percentage = Math.min((totalItems / capacity) * 100, 100);

  const status =
    percentage < 50
      ? { label: "Plenty of capacity", color: "#22D3EE" } // cyan
      : percentage < 90
      ? { label: "Approaching limit", color: "#F59E0B" } // amber
      : { label: "Near capacity", color: "#EF4444" }; // red

  return (
    <div
      className="
        relative
        bg-white/5
        border border-white/10
        backdrop-blur-xl
        rounded-3xl
        p-8
        shadow-[0_0_45px_rgba(34,211,238,0.12)]
        flex flex-col
        items-center
        justify-between
        w-full
        h-full
      "
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 rounded-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white tracking-tight">
          Inventory Status
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          {totalItems.toLocaleString()} / {capacity.toLocaleString()} items
        </p>
      </div>

      {/* Gauge */}
      <div className="flex justify-center items-center">
        <div style={{ width: 200, height: 200 }}>
          <CircularProgressbar
            value={percentage}
            text={`${Math.round(percentage)}%`}
            styles={buildStyles({
              pathColor: status.color,
              textColor: "#FFFFFF",
              trailColor: "rgba(255,255,255,0.08)",
              textSize: "14px",
              pathTransitionDuration: 0.6,
            })}
          />
        </div>
      </div>

      {/* Footer Status Badge */}
      <div className="text-center mt-4">
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: `${status.color}20`,
            color: status.color,
            boxShadow: `0 0 15px ${status.color}40`,
          }}
        >
          {status.label}
        </span>
      </div>
    </div>
  );
};

export default InventoryGauge;