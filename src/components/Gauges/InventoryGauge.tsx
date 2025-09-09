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

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col w-80 h-80 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 tracking-tight">
          Inventory Status
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {totalItems.toLocaleString()} / {capacity.toLocaleString()} items
        </p>
      </div>

      {/* Gauge */}
      <div className="flex flex-1 justify-center items-center">
        <div style={{ width: 220, height: 220 }}>
          <CircularProgressbar
            value={percentage}
            text={`${totalItems.toLocaleString()}`}
            styles={buildStyles({
              pathColor: "#2563EB", // CasaPro accent blue
              textColor: "#111827", // brand dark text
              trailColor: "#E5E7EB", // neutral gray
              textSize: "16px",
            })}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 text-center">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
            percentage < 50
              ? "bg-blue-50 text-blue-700"
              : percentage < 90
              ? "bg-yellow-50 text-yellow-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {percentage < 50
            ? "Plenty of space"
            : percentage < 90
            ? "Approaching limit"
            : "Near capacity"}
        </span>
      </div>
    </div>
  );
};

export default InventoryGauge;
