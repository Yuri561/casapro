import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useInventory from "../Hooks/useInventory";

const InventoryGauge: React.FC = () => {
  const inventoryData = useInventory();
  const totalItems = inventoryData.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );


  const capacity = 1000;
  const percentage = Math.min((totalItems / capacity) * 100, 100);

  return (
    <div className="bg-white rounded-lg shadow-md p-2 flex flex-col w-80 h-80 max-w-md">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Total Inventory</h2>
        <p className="text-sm text-gray-500">Tracked with Casa Pro</p>
      </div>

      <div className="flex justify-center items-center mb-4">
        <div style={{ width: 230, height: 230 }}>
          <CircularProgressbar
            value={percentage}
            text={`${totalItems.toLocaleString()}`}
            styles={buildStyles({
              pathColor: "#3B82F6",
              textColor: "#000",
              trailColor: "#d6d6d6",
            })}
          />
        </div>
      </div>
{/*       
      <div className="text-center mt-2">
        <p className="text-sm text-gray-500">Items Tracked</p>
      </div> */}
    </div>
  );
};

export default InventoryGauge;
