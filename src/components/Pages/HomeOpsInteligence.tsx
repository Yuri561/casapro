import React from "react";
import useInventory, { Product } from "../Hooks/useInventory";
import {
  FaLightbulb,
  FaBroom,
  FaDollarSign,
  FaBell,
  FaSnowflake,
  FaSeedling,
} from "react-icons/fa";

interface Props {
  inventoryData: Product[];
}

const HomeOpsIntelligenceSection: React.FC<Props> = ({ inventoryData }) => {
  const { formattedTotal } = useInventory();

  const now = Date.now();
  const twoMonthsAgo = now - 1000 * 60 * 60 * 24 * 60;

  const unusedItems = inventoryData.filter(
    (item) =>
      new Date(item.updatedAt || item.createdAt).getTime() < twoMonthsAgo
  );

  const seasonal = (() => {
    const month = new Date().getMonth();
    if ([2, 3, 4].includes(month))
      return "Spring cleaning: Check pantry, expired goods, and refresh surfaces.";
    if ([5, 6, 7].includes(month))
      return "Summer prep: Review outdoor tools and supplies.";
    if ([8, 9, 10].includes(month))
      return "Fall organization: Tidy the garage and rotate seasonal tools.";
    return "Winter check: Inspect heaters, backup batteries, and indoor items.";
  })();

  return (
    <section className="relative py-32 px-6 bg-[#0f172a] text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[160px]" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[160px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto space-y-20">

        <div className="text-center">
          <h2 className="text-5xl font-bold">
            HomeOps
            <span className="text-cyan-400"> Intelligence Center</span>
          </h2>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            Smart operational insights powered by your inventory behavior.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-10 lg:grid-cols-2">

          {/* Smart Prompts */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-[0_0_35px_rgba(34,211,238,0.1)]">
            <h3 className="flex items-center gap-3 text-cyan-400 text-xl font-semibold mb-6">
              <FaLightbulb /> Smart Action Prompts
            </h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li>• You're low on paper goods — consider restocking toiletries.</li>
              <li>• 7+ items untouched in 60+ days — refresh inventory soon.</li>
              <li>• Backup your list before bulk edits or moving.</li>
              <li>• Review tools category — relocation or disposal recommended.</li>
            </ul>
          </div>

          {/* Clutter Control */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-[0_0_35px_rgba(34,211,238,0.1)]">
            <h3 className="flex items-center gap-3 text-pink-400 text-xl font-semibold mb-6">
              <FaBroom /> Clutter Control Advisor
            </h3>

            {unusedItems.length > 0 ? (
              <ul className="space-y-2 text-gray-300 text-sm">
                {unusedItems.slice(0, 5).map((item, i) => (
                  <li key={i}>
                    • {item.name} — inactive 60+ days
                  </li>
                ))}
                {unusedItems.length > 5 && (
                  <li className="text-gray-500 italic">
                    + {unusedItems.length - 5} more item(s) require review
                  </li>
                )}
              </ul>
            ) : (
              <p className="text-green-400 text-sm">
                No clutter detected. You're maintaining control.
              </p>
            )}
          </div>

          {/* Value Estimator */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-[0_0_35px_rgba(34,211,238,0.1)]">
            <h3 className="flex items-center gap-3 text-amber-400 text-xl font-semibold mb-6">
              <FaDollarSign /> Total Inventory Value
            </h3>
            <p className="text-4xl font-bold text-cyan-400">
              {formattedTotal}
            </p>
            <p className="mt-4 text-gray-400 text-sm">
              Estimated based on current tracked item values.
            </p>
          </div>

          {/* Automation */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-[0_0_35px_rgba(34,211,238,0.1)]">
            <h3 className="flex items-center gap-3 text-blue-400 text-xl font-semibold mb-6">
              <FaBell /> Automation Prompts
            </h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li>• Schedule fridge cleaning every 30 days</li>
              <li>• Pantry review on the 1st monthly</li>
              <li>• Rotate seasonal tools every 90 days</li>
            </ul>
          </div>

        </div>

        {/* Seasonal Insight */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-400/30 backdrop-blur-xl rounded-3xl p-8 flex items-center gap-6 shadow-[0_0_35px_rgba(34,211,238,0.15)]">
          {seasonal.includes("Winter") ? (
            <FaSnowflake className="text-3xl text-cyan-400" />
          ) : (
            <FaSeedling className="text-3xl text-emerald-400" />
          )}

          <p className="text-lg font-medium text-gray-200">
            {seasonal}
          </p>
        </div>

      </div>
    </section>
  );
};

export default HomeOpsIntelligenceSection;