import React, { useMemo } from "react";
import useInventory, { Product } from "../Hooks/useInventory";
import {
  FaLightbulb,
  FaBroom,
  FaDollarSign,
  FaBell,
  FaSnowflake,
  FaSeedling,
  FaShieldAlt,
} from "react-icons/fa";

interface Props {
  inventoryData: Product[];
}

const HomeOpsIntelligenceSection: React.FC<Props> = ({ inventoryData }) => {
  const { formattedTotal } = useInventory();

  const now = Date.now();
  const twoMonthsAgo = now - 1000 * 60 * 60 * 24 * 60;

  /* ---------------- SMART DATA CALCULATIONS ---------------- */

  const unusedItems = useMemo(
    () =>
      inventoryData.filter(
        (item) =>
          new Date(item.updatedAt || item.createdAt).getTime() < twoMonthsAgo
      ),
    [inventoryData]
  );

  const lowStockItems = useMemo(
    () => inventoryData.filter((item) => item.quantity <= 2),
    [inventoryData]
  );

  const activityScore = useMemo(() => {
    if (!inventoryData.length) return 0;
    const activeItems =
      inventoryData.length - unusedItems.length;
    return Math.round((activeItems / inventoryData.length) * 100);
  }, [inventoryData, unusedItems]);

  const riskLevel =
    lowStockItems.length > 5
      ? "High"
      : lowStockItems.length > 2
      ? "Moderate"
      : "Low";

  /* ---------------- SEASONAL INTELLIGENCE ---------------- */

  const seasonal = (() => {
    const month = new Date().getMonth();
    if ([2, 3, 4].includes(month))
      return "Spring cleaning: Refresh pantry & surfaces.";
    if ([5, 6, 7].includes(month))
      return "Summer prep: Review outdoor tools.";
    if ([8, 9, 10].includes(month))
      return "Fall organization: Rotate seasonal gear.";
    return "Winter check: Inspect heaters & backups.";
  })();

  return (
    <section className="relative py-32 px-6 bg-[#0f172a] text-white overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[160px]" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[160px]" />

      <div className="relative max-w-7xl mx-auto space-y-24">

        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-5xl font-bold">
            HomeOps <span className="text-cyan-400">Intelligence</span>
          </h2>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            Real-time operational awareness driven by your inventory behavior.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-10 lg:grid-cols-2">

          {/* SMART PROMPTS */}
          <GlassCard
            title="Smart Action Prompts"
            icon={<FaLightbulb />}
            accent="cyan"
          >
            <ul className="space-y-3 text-gray-300 text-sm">
              {lowStockItems.length > 0 && (
                <li>
                  • {lowStockItems.length} item(s) critically low — restock soon.
                </li>
              )}
              {unusedItems.length > 0 && (
                <li>
                  • {unusedItems.length} inactive items — review clutter.
                </li>
              )}
              <li>• Backup inventory before major edits.</li>
            </ul>
          </GlassCard>

          {/* CLUTTER CONTROL */}
          <GlassCard
            title="Clutter Control"
            icon={<FaBroom />}
            accent="pink"
          >
            {unusedItems.length ? (
              <ul className="space-y-2 text-sm text-gray-300">
                {unusedItems.slice(0, 4).map((item, i) => (
                  <li key={i}>• {item.name}</li>
                ))}
              </ul>
            ) : (
              <p className="text-green-400 text-sm">
                No clutter risk detected.
              </p>
            )}
          </GlassCard>

          {/* VALUE */}
          <GlassCard
            title="Total Inventory Value"
            icon={<FaDollarSign />}
            accent="amber"
          >
            <p className="text-4xl font-bold text-cyan-400">
              {formattedTotal}
            </p>
            <p className="mt-3 text-gray-400 text-sm">
              Live valuation across tracked categories.
            </p>
          </GlassCard>

          {/* RISK + ACTIVITY */}
          <GlassCard
            title="Operational Risk Level"
            icon={<FaShieldAlt />}
            accent="blue"
          >
            <div className="space-y-4">

              <div>
                <p className="text-sm text-gray-400">
                  Activity Score
                </p>
                <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                  <div
                    className="h-2 bg-emerald-400 rounded-full transition-all duration-700"
                    style={{ width: `${activityScore}%` }}
                  />
                </div>
                <p className="text-xs mt-1 text-gray-500">
                  {activityScore}% actively managed
                </p>
              </div>

              <div className="text-sm">
                Risk Level:{" "}
                <span
                  className={`font-semibold ${
                    riskLevel === "High"
                      ? "text-red-400"
                      : riskLevel === "Moderate"
                      ? "text-yellow-400"
                      : "text-emerald-400"
                  }`}
                >
                  {riskLevel}
                </span>
              </div>

            </div>
          </GlassCard>

        </div>

        {/* SEASONAL INSIGHT */}
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

/* ---------- REUSABLE GLASS CARD ---------- */

const GlassCard = ({
  title,
  icon,
  children,
  accent,
}: any) => {
  const accentColor =
    accent === "cyan"
      ? "text-cyan-400"
      : accent === "pink"
      ? "text-pink-400"
      : accent === "amber"
      ? "text-amber-400"
      : accent === "blue"
      ? "text-blue-400"
      : "text-white";

  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-[0_0_35px_rgba(34,211,238,0.1)]">
      <h3 className={`flex items-center gap-3 text-xl font-semibold mb-6 ${accentColor}`}>
        {icon} {title}
      </h3>
      {children}
    </div>
  );
};