import React, { useState } from "react";
import { AgGauge } from "ag-charts-react";
import { AgRadialGaugeOptions } from "ag-charts-enterprise";
import "ag-charts-enterprise";

const InventoryGauge: React.FC = () => {
  const [options] = useState<AgRadialGaugeOptions>({
    type: "radial-gauge",
    value: 75, 
    scale: {
      min: 0,
      max: 100,
      label: {
        enabled: false, 
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
    <div className="w-80 h-80 bg-white rounded-xl overflow-hidden shadow-lg ">
      <AgGauge options={options as any} />
    </div>
  );
};

export default InventoryGauge;
