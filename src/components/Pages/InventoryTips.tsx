import React, { useEffect, useState } from "react";
import {
  FaTrophy,
  FaLightbulb,
  FaClipboardList,
  FaTrashRestoreAlt,
  FaRegFolderOpen,
} from "react-icons/fa";
import { Product } from "../Hooks/useInventory";
import BudgetCard from "../DashboardSubComponent/BudgetCard";
import { BudgetGoal } from "../Hooks/useBudget";
import { showBudget } from "../../UserAuth/user_auth";

interface InventoryTipsProps {
  inventoryData?: Product[];
  inventoryHistory?: { action: string; date: string }[];
}

const InventoryTips: React.FC<InventoryTipsProps> = ({
  inventoryData = [],
  inventoryHistory = [],
}) => {
  const hasInventory = inventoryData.length > 0;
  const userId = localStorage.getItem("user_id");

  const [budgetGoalsRaw, setBudgetGoalsRaw] = useState<BudgetGoal[]>([]);

  const fetchBudgetGoals = async () => {
    try {
      const res = await showBudget();
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.user_budget;
      setBudgetGoalsRaw(data || []);
    } catch (err) {
      console.error("Error fetching budget goals:", err);
    }
  };

  useEffect(() => {
    if (userId) fetchBudgetGoals();
  }, [userId]); //

  /* =======================
    Budget Current Values
  ======================== */
  const budgetGoalsWithCurrentValues = budgetGoalsRaw.map(
    (goal) => {
      const totalSpent = inventoryData
        .filter(
          (item) =>
            item.category.toLowerCase() ===
            goal.category.toLowerCase()
        )
        .reduce(
          (sum, item) =>
            sum + (item.price || 0) * (item.quantity || 1),
          0
        );

      return { ...goal, current: totalSpent };
    }
  );

  /* =======================
     Milestones
  ======================== */
  const totalCategories = [
    ...new Set(inventoryData.map((i) => i.category)),
  ].length;

  const milestones = [
    { title: "First 10 Items Added", completed: inventoryData.length >= 10 },
    { title: "Track 3 Categories", completed: totalCategories >= 3 },
    {
      title: "First Restock Logged",
      completed: inventoryHistory.some(
        (log) => log.action === "restock"
      ),
    },
  ];

  /* =======================
     Smart Suggestions
  ======================== */
  const suggestions: string[] = [];

  if (!hasInventory) {
    suggestions.push("Start by adding your first item.");
  } else {
    if (inventoryData.some((item) => item.quantity < 2)) {
      suggestions.push("Some items are running low.");
    }
    if (inventoryData.length > 25) {
      suggestions.push("Consider grouping items by location.");
    }
  }

  const logs = inventoryHistory.map(
    (entry) => `${entry.date}: ${entry.action}`
  );

  /* =======================
     UI
  ======================== */

  return (
    <section className="bg-[#0f172a] py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-14">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            Smart Inventory Intelligence
          </h2>
          <p className="text-gray-400 mt-4">
            Real-time insights, planning, and optimization tools.
          </p>
        </div>

        {hasInventory ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Budget Goals */}
            <div className="lg:col-span-3">
              <BudgetCard
                budgetGoals={budgetGoalsWithCurrentValues}
                userId={userId!}
                onGoalAdded={fetchBudgetGoals}
              />
            </div>

            {/* Milestones */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-[0_0_30px_rgba(250,204,21,0.15)]">
              <h3 className="flex items-center gap-3 text-amber-400 font-semibold text-lg mb-4">
                <FaTrophy /> Milestones
              </h3>
              <ul className="space-y-3 text-sm">
                {milestones.map((m, i) => (
                  <li
                    key={i}
                    className={`flex justify-between ${
                      m.completed
                        ? "text-emerald-400"
                        : "text-gray-500"
                    }`}
                  >
                    {m.title}
                    <span>{m.completed ? "✔" : "—"}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggestions */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-[0_0_30px_rgba(236,72,153,0.15)]">
              <h3 className="flex items-center gap-3 text-pink-400 font-semibold text-lg mb-4">
                <FaLightbulb /> Smart Suggestions
              </h3>
              {suggestions.length > 0 ? (
                <ul className="space-y-2 text-gray-300 text-sm">
                  {suggestions.map((s, i) => (
                    <li key={i}>• {s}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">
                  Everything looks optimized.
                </p>
              )}
            </div>

            {/* Clean Out */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-[0_0_30px_rgba(239,68,68,0.15)]">
              <h3 className="flex items-center gap-3 text-red-400 font-semibold text-lg mb-4">
                <FaTrashRestoreAlt /> Clean Out
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Review inactive items and reduce clutter.
              </p>
              <button className="text-red-400 hover:text-red-300 transition text-sm underline">
                Review Items
              </button>
            </div>

            {/* Saved Plans */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-[0_0_30px_rgba(99,102,241,0.15)]">
              <h3 className="flex items-center gap-3 text-indigo-400 font-semibold text-lg mb-4">
                <FaRegFolderOpen /> Saved Plans
              </h3>
              <p className="text-gray-400 text-sm">
                Create recurring inventory routines.
              </p>
            </div>

            {/* Activity Logs */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 lg:col-span-3 shadow-[0_0_30px_rgba(148,163,184,0.15)]">
              <h3 className="flex items-center gap-3 text-gray-300 font-semibold text-lg mb-4">
                <FaClipboardList /> Activity Log
              </h3>

              {logs.length > 0 ? (
                <ul className="space-y-2 text-gray-400 text-sm">
                  {logs.map((log, i) => (
                    <li key={i}>• {log}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">
                  No recent activity.
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 mb-6">
              Your inventory is empty.
            </p>
            <button className="bg-cyan-400 text-black px-6 py-3 rounded-xl font-semibold shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:bg-cyan-300 transition">
              Add First Item
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default InventoryTips;