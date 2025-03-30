import React, { useState } from "react";
import { AgGauge } from "ag-charts-react";
import { AgRadialGaugeOptions } from "ag-charts-enterprise";
import "ag-charts-enterprise";

const InventoryGauge: React.FC = () => {
  const [options] = useState<AgRadialGaugeOptions>({
    type: "radial-gauge",
    value: 75, // Update this dynamically if needed
    scale: {
      min: 0,
      max: 100,
      label: {
        enabled: false, // Hide unnecessary labels
      },
    },
    label: {
      formatter({ value }) {
        return `${value.toFixed(0)}%`; 
      },
    },
    secondaryLabel: {
      text: "Inventory Status", 
    },
    title: {
      text: "Inventory Overview", 
      fontSize: 18,
    },
  });

  return (
    <div className="w-74 h-74 bg-white rounded-xl overflow-hidden shadow-lg ">
      <AgGauge options={options as any} />
    </div>
  );
};

export default InventoryGauge;
