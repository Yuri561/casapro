// Same imports from before
import React, { useState, useEffect } from "react";
import { Product } from "../Hooks/useInventory";
import useInventory from "../Hooks/useInventory";
import {

  FaBoxes,
  FaMapMarkerAlt,
  FaArrowCircleDown,
  FaClipboardCheck,
  FaGift,
} from "react-icons/fa";

interface Props {
  inventoryData: Product[];
}

const InventoryForecast: React.FC<Props> = ({ inventoryData }) => {
  const [shoppingList, setShoppingList] = useState<string[]>([]);
  const [zoneMap, setZoneMap] = useState<Record<string, string>>({});
  const { totalItems, totalCategories } = useInventory();

  const toggleShoppingItem = (itemName: string) => {
    setShoppingList((prev) =>
      prev.includes(itemName)
        ? prev.filter((i) => i !== itemName)
        : [...prev, itemName]
    );
  };

  useEffect(() => {
    const map: Record<string, string> = {};
    inventoryData.forEach((item) => {
      if (item.category.toLowerCase().includes("tool"))
        map[item.name] = "Garage";
      else if (item.category.toLowerCase().includes("grocery"))
        map[item.name] = "Pantry";
      else if (item.category.toLowerCase().includes("toiletry"))
        map[item.name] = "Bathroom";
      else map[item.name] = "Storage";
    });
    setZoneMap(map);
  }, [inventoryData]);

  const restockQueue = [...inventoryData]
    .filter((item) => item.quantity <= 2)
    .sort(
      (a, b) =>
        new Date(a.updatedAt || a.createdAt).getTime() -
        new Date(b.updatedAt || b.createdAt).getTime()
    );

  const categoryHealth = inventoryData.reduce(
    (acc, item) => {
      if (!acc[item.category])
        acc[item.category] = { total: 0, qty: 0 };
      acc[item.category].total++;
      acc[item.category].qty += item.quantity;
      return acc;
    },
    {} as Record<string, { total: number; qty: number }>
  );

  const avgHealth = Object.entries(categoryHealth).map(
    ([cat, data]) => {
      const avg = data.qty / data.total;
      let status = "Healthy";
      if (avg <= 2) status = "Critical";
      else if (avg <= 5) status = "Caution";
      return { category: cat, avg, status };
    }
  );

  const suggestions: string[] = [];
  const twoMonthsAgo =
    Date.now() - 1000 * 60 * 60 * 24 * 60;

  if (
    inventoryData.some(
      (i) =>
        new Date(i.updatedAt || i.createdAt).getTime() <
        twoMonthsAgo
    )
  ) {
    suggestions.push(
      "Some items haven't been updated in over 2 months."
    );
  }

  if (restockQueue.length > 3) {
    suggestions.push(
      "Multiple items are low — plan a restock trip."
    );
  }

  if (inventoryData.length >= 20) {
    suggestions.push(
      "You're tracking 20+ items. Excellent discipline."
    );
  }

  return (
    <section className="py-16 px-6 bg-[#0f172a]">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            Logistics & Forecast Hub
          </h2>
          <p className="text-gray-400 mt-4">
            Predict shortages. Optimize zones. Stay ahead.
          </p>
        </div>

        {/* Command Summary */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-[0_0_25px_rgba(34,211,238,0.15)]">
            <h4 className="flex items-center gap-2 text-cyan-400 font-semibold mb-3">
              <FaBoxes /> Items Tracked
            </h4>
            <p className="text-3xl font-bold text-white">
              {totalItems}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-[0_0_25px_rgba(16,185,129,0.15)]">
            <h4 className="flex items-center gap-2 text-emerald-400 font-semibold mb-3">
              <FaMapMarkerAlt /> Storage Zones
            </h4>
            <p className="text-gray-300 text-sm">
              {[...new Set(Object.values(zoneMap))].join(", ")}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-[0_0_25px_rgba(139,92,246,0.15)]">
            <h4 className="flex items-center gap-2 text-indigo-400 font-semibold mb-3">
              <FaClipboardCheck /> Categories
            </h4>
            <p className="text-gray-300">
              {totalCategories} Active
            </p>
          </div>
        </div>

        {/* Restock Queue */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">
          <h3 className="flex items-center gap-3 text-red-400 font-semibold text-lg mb-6">
            <FaArrowCircleDown /> Restock Priority
          </h3>

          {restockQueue.length ? (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              {restockQueue.map((item, i) => (
                <li
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-white">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      toggleShoppingItem(item.name)
                    }
                    className="bg-cyan-400 text-black px-3 py-1 rounded-lg text-xs font-medium shadow-[0_0_10px_rgba(34,211,238,0.4)]"
                  >
                    {shoppingList.includes(item.name)
                      ? "✓ Added"
                      : "Add"}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">
              All items sufficiently stocked.
            </p>
          )}
        </div>

        {/* Category Health */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">
            Category Health Overview
          </h3>
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {avgHealth.map(({ category, avg, status }, i) => (
              <li
                key={i}
                className={`rounded-xl p-4 border ${
                  status === "Critical"
                    ? "bg-red-500/10 border-red-500/30"
                    : status === "Caution"
                    ? "bg-yellow-500/10 border-yellow-500/30"
                    : "bg-emerald-500/10 border-emerald-500/30"
                }`}
              >
                <p className="font-semibold text-white">
                  {category}
                </p>
                <p className="text-gray-400 text-xs">
                  Avg Qty: {avg.toFixed(1)}
                </p>
                <p className="text-xs mt-1">{status}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Suggestions */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Smart Suggestions
          </h3>
          <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
            {suggestions.length ? (
              suggestions.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))
            ) : (
              <li>Everything looks optimized.</li>
            )}
          </ul>
        </div>

        {/* Motivation */}
        <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-3xl p-8 text-center text-emerald-300 text-sm shadow-[0_0_25px_rgba(16,185,129,0.15)]">
          <FaGift className="mx-auto text-3xl mb-3" />
          Consistency builds control. Keep optimizing your home system.
        </div>

      </div>
    </section>
  );
};

export default InventoryForecast;