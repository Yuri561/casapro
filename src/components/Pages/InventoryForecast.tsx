import React, { useState, useEffect, useMemo } from "react";
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

  /* ------------------ AUTO ZONE MAPPING ------------------ */
  useEffect(() => {
    const map: Record<string, string> = {};
    inventoryData.forEach((item) => {
      const cat = item.category.toLowerCase();
      if (cat.includes("tool")) map[item.name] = "Garage";
      else if (cat.includes("grocery")) map[item.name] = "Pantry";
      else if (cat.includes("toiletry")) map[item.name] = "Bathroom";
      else map[item.name] = "Storage";
    });
    setZoneMap(map);
  }, [inventoryData]);

  /* ------------------ RESTOCK QUEUE ------------------ */
  const restockQueue = useMemo(() => {
    return [...inventoryData]
      .filter((item) => item.quantity <= 2)
      .sort(
        (a, b) =>
          new Date(a.updatedAt || a.createdAt).getTime() -
          new Date(b.updatedAt || b.createdAt).getTime()
      );
  }, [inventoryData]);

  /* ------------------ CATEGORY HEALTH ------------------ */
  const avgHealth = useMemo(() => {
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

    return Object.entries(categoryHealth).map(([cat, data]) => {
      const avg = data.qty / data.total;
      let status = "Healthy";
      if (avg <= 2) status = "Critical";
      else if (avg <= 5) status = "Caution";
      return { category: cat, avg, status };
    });
  }, [inventoryData]);

  /* ------------------ SMART SUGGESTIONS ------------------ */
  const suggestions = useMemo(() => {
    const tips: string[] = [];
    const twoMonthsAgo =
      Date.now() - 1000 * 60 * 60 * 24 * 60;

    if (
      inventoryData.some(
        (i) =>
          new Date(i.updatedAt || i.createdAt).getTime() <
          twoMonthsAgo
      )
    ) {
      tips.push("Some items haven’t been updated in 60+ days.");
    }

    if (restockQueue.length > 3) {
      tips.push("Several items are critically low.");
    }

    if (inventoryData.length >= 20) {
      tips.push("You're managing 20+ items efficiently.");
    }

    return tips;
  }, [inventoryData, restockQueue]);

  return (
    <section className="py-20 px-6 bg-[#0f172a]">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-bold text-white">
            Logistics Intelligence Hub
          </h2>
          <p className="text-gray-400 text-sm">
            Real-time insights into your home operations.
          </p>
        </div>

        {/* Command Summary */}
        <div className="grid md:grid-cols-3 gap-8">
          <SummaryCard icon={<FaBoxes />} label="Items Tracked" value={totalItems} color="cyan" />
          <SummaryCard icon={<FaMapMarkerAlt />} label="Zones" value={[...new Set(Object.values(zoneMap))].length} color="emerald" />
          <SummaryCard icon={<FaClipboardCheck />} label="Categories" value={totalCategories} color="indigo" />
        </div>

        {/* Restock Priority */}
        <GlassCard title="Restock Priority" accent="red">
          {restockQueue.length ? (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {restockQueue.map((item, i) => (
                <li
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 flex justify-between items-center transition hover:bg-white/10"
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
                    onClick={() => toggleShoppingItem(item.name)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                      shoppingList.includes(item.name)
                        ? "bg-emerald-500 text-black"
                        : "bg-cyan-400 text-black hover:bg-cyan-300"
                    }`}
                  >
                    {shoppingList.includes(item.name) ? "Added" : "Add"}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">
              All inventory levels stable.
            </p>
          )}
        </GlassCard>

        {/* Category Health */}
        <GlassCard title="Category Health Overview" accent="emerald">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {avgHealth.map(({ category, avg, status }, i) => {
              const percent = Math.min((avg / 10) * 100, 100);

              const color =
                status === "Critical"
                  ? "bg-red-500"
                  : status === "Caution"
                  ? "bg-yellow-500"
                  : "bg-emerald-500";

              return (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm text-white">
                    <span>{category}</span>
                    <span className="text-xs text-gray-400">
                      {status}
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${color} transition-all duration-500`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* Suggestions */}
        <GlassCard title="Smart Recommendations" accent="cyan">
          <ul className="list-disc list-inside text-gray-300 text-sm space-y-3">
            {suggestions.length
              ? suggestions.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))
              : <li>System optimized. No action needed.</li>}
          </ul>
        </GlassCard>

        {/* Motivation */}
        <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-3xl p-10 text-center text-emerald-300 text-sm shadow-[0_0_25px_rgba(16,185,129,0.15)]">
          <FaGift className="mx-auto text-3xl mb-4" />
          Consistency builds control. Small weekly reviews prevent big future problems.
        </div>

      </div>
    </section>
  );
};

export default InventoryForecast;


/* ------------------ REUSABLE COMPONENTS ------------------ */

const SummaryCard = ({
  icon,
  label,
  value,
  color,
}: any) => {
  const accent =
    color === "cyan"
      ? "text-cyan-400"
      : color === "emerald"
      ? "text-emerald-400"
      : "text-indigo-400";

  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-[0_0_25px_rgba(34,211,238,0.15)] text-center space-y-3">
      <div className={`${accent} text-2xl mx-auto`}>
        {icon}
      </div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-3xl font-bold text-white">
        {value}
      </p>
    </div>
  );
};

const GlassCard = ({
  title,
  children,
  accent,
}: any) => {
  const accentColor =
    accent === "red"
      ? "text-red-400"
      : accent === "emerald"
      ? "text-emerald-400"
      : "text-cyan-400";

  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-[0_0_25px_rgba(34,211,238,0.15)] space-y-6">
      <h3 className={`text-lg font-semibold ${accentColor}`}>
        {title}
      </h3>
      {children}
    </div>
  );
};