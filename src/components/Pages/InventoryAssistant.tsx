import React, { useState } from "react";
import {
  FaLightbulb,
  FaThList,
  FaThLarge,
  FaDownload,
  FaCogs,
} from "react-icons/fa";
import { Product } from "../Hooks/useInventory";

interface Props {
  inventoryData: Product[];
}

const InventoryAssistant: React.FC<Props> = ({ inventoryData }) => {
  const [filterType, setFilterType] = useState<
    "all" | "low" | "new" | "unused"
  >("all");
  const [viewMode, setViewMode] = useState<
    "grid" | "list" | "compact"
  >("grid");

  const now = Date.now();

  const filteredItems = inventoryData.filter((item) => {
    const lastUpdated = new Date(
      item.updatedAt || item.createdAt || ""
    ).getTime();
    const daysAgo =
      (now - lastUpdated) / (1000 * 60 * 60 * 24);

    switch (filterType) {
      case "low":
        return item.quantity <= 2;
      case "new":
        return daysAgo <= 5;
      case "unused":
        return daysAgo >= 30;
      default:
        return true;
    }
  });

  return (
    <section className="bg-[#0f172a] py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            Inventory Assistant Hub
          </h2>
          <p className="text-gray-400 mt-4">
            Filter, analyze, and manage inventory intelligently.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-6">

          {/* Filters */}
          <div className="flex gap-3 flex-wrap">
            {["all", "low", "new", "unused"].map((type) => (
              <button
                key={type}
                onClick={() =>
                  setFilterType(type as any)
                }
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                  filterType === type
                    ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                    : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10"
                }`}
              >
                {type === "all"
                  ? "All"
                  : type === "low"
                  ? "Low Stock"
                  : type === "new"
                  ? "Recently Added"
                  : "Unused"}
              </button>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex gap-3 items-center">
            {[
              { key: "grid", icon: <FaThLarge /> },
              { key: "list", icon: <FaThList /> },
              { key: "compact", icon: <FaCogs /> },
            ].map((v) => (
              <button
                key={v.key}
                onClick={() =>
                  setViewMode(v.key as any)
                }
                className={`p-3 rounded-xl transition ${
                  viewMode === v.key
                    ? "bg-indigo-500 text-white shadow-lg"
                    : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10"
                }`}
              >
                {v.icon}
              </button>
            ))}

            <button
              className="p-3 rounded-xl bg-emerald-500 text-white hover:bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)] transition"
              title="Export CSV"
            >
              <FaDownload />
            </button>
          </div>
        </div>

        {/* Insight Panels */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-[0_0_25px_rgba(99,102,241,0.15)]">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-3">
              <FaLightbulb />
              Smart Insight
            </div>
            <p className="text-gray-300 text-sm">
              {filteredItems.length === 0
                ? "No items matched this filter."
                : `Displaying ${filteredItems.length} item(s) under "${filterType}".`}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-[0_0_25px_rgba(34,211,238,0.15)]">
            <p className="text-gray-300 text-sm">
              Switch to <strong className="text-cyan-400">Compact View</strong> for high-density management.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-[0_0_25px_rgba(16,185,129,0.15)]">
            <p className="text-gray-300 text-sm">
              Export filtered items for reporting or backup.
            </p>
          </div>
        </div>

        {/* Items Display */}
        <div
          className={`mt-8 ${
            viewMode === "grid"
              ? "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              : viewMode === "list"
              ? "space-y-4"
              : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          }`}
        >
          {filteredItems.map((item, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-4 hover:border-cyan-400/40 transition shadow-[0_0_15px_rgba(34,211,238,0.08)]"
            >
              <h4 className="font-semibold text-white">
                {item.name}
              </h4>
              <p className="text-xs text-gray-400 capitalize">
                {item.category}
              </p>

              <p className="text-sm mt-3 text-gray-300">
                Qty:{" "}
                <span className="text-cyan-400">
                  {item.quantity}
                </span>
              </p>

              {item.price && (
                <p className="text-sm text-gray-400">
                  ${item.price}
                </p>
              )}
            </div>
          ))}

          {filteredItems.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">
              No items found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default InventoryAssistant;