import React from "react";
import {
  FaCalendarAlt,
  FaTrophy,
  FaBullseye,
  FaLightbulb,
  FaClipboardList,
  FaTrashRestoreAlt,
  FaRegFolderOpen,
} from "react-icons/fa";
import { Product } from "../Hooks/useInventory";

interface InventoryTipsProps {
  inventoryData?: Product[];
  inventoryHistory?: { action: string; date: string }[];
}

const InventoryTips: React.FC<InventoryTipsProps> = ({
  inventoryData = [],
  inventoryHistory = [],
}) => {
  const hasInventory = inventoryData.length > 0;

  // === Budget Goals Calculation ===
  const budgetGoals = [
    {
      category: "Groceries",
      current: inventoryData
        .filter((item) => item.category === "Groceries")
        .reduce((sum, item) => sum + (item.price || 0), 0),
      limit: 100,
    },
    {
      category: "Toiletries",
      current: inventoryData
        .filter((item) => item.category === "Toiletries")
        .reduce((sum, item) => sum + (item.price || 0), 0),
      limit: 40,
    },
  ];

  // === Simulated Reminders ===
  const reminders = hasInventory
    ? [
        { task: "Check soon-to-expire items", due: "April 10, 2025" },
        { task: "Update pantry quantities", due: "April 13, 2025" },
      ]
    : [];

  // === Milestones ===
  const totalCategories = [...new Set(inventoryData.map((item) => item.category))].length;
  const milestones = [
    { title: "🎉 First 10 Items Added", completed: inventoryData.length >= 10 },
    { title: "💼 Track 3 Categories", completed: totalCategories >= 3 },
    {
      title: "🧼 First Restock Logged",
      completed: inventoryHistory.some((log) => log.action === "restock"),
    },
  ];

  // === Logs from history ===
  const logs = inventoryHistory.map((entry) => `${entry.date}: ${entry.action}`);

  // === Smart Suggestions (based on inventory)
  const healthSuggestions = [];
  if (!hasInventory) {
    healthSuggestions.push("Add your first item to begin tracking.");
  } else {
    if (inventoryData.some((item) => item.quantity < 2)) {
      healthSuggestions.push("📦 Some items are running low. Consider restocking soon.");
    }
    const pantryItems = inventoryData.filter((item) =>
      item.category.toLowerCase().includes("pantry")
    );
    if (
      pantryItems.length > 0 &&
      pantryItems.every(
        (item) => item.updatedAt && new Date(item.updatedAt) < new Date("2024-03-01")
      )
    ) {
      healthSuggestions.push("🧼 Consider reviewing old pantry items.");
    }
  }

  // === Saved plans (optional future feature)
  const savedPlans = hasInventory
    ? [
        { title: "🛒 Weekly Grocery Restock", updated: "April 5, 2025" },
        { title: "🧽 Spring Clean Checklist", updated: "March 20, 2025" },
      ]
    : [];

  return (
    <section className="bg-gradient-to-r from-cyan-100 via-blue-100 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <h2 className="text-4xl font-bold text-center text-gray-800">
          Smart Inventory Planner
        </h2>

        {hasInventory ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Budget Goals */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-teal-500">
              <h3 className="flex items-center gap-2 text-teal-600 font-bold text-lg mb-4">
                <FaBullseye /> Category Budget Goals
              </h3>
              <ul className="space-y-4 text-gray-700 text-sm">
                {budgetGoals.map((goal, i) => {
                  const percent = (goal.current / goal.limit) * 100;
                  return (
                    <li key={i}>
                      <div className="flex justify-between mb-1">
                        <span>{goal.category}</span>
                        <span className="font-semibold">
                          ${goal.current.toFixed(2)} / ${goal.limit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 bg-teal-500 rounded-full"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
              <button className="mt-4 text-sm text-teal-600 underline hover:text-teal-800">
                + Set New Goal
              </button>
            </div>

            {/* Reminders */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
              <h3 className="flex items-center gap-2 text-blue-600 font-bold text-lg mb-4">
                <FaCalendarAlt /> Upcoming Reminders
              </h3>
              {reminders.length > 0 ? (
                <ul className="space-y-2 text-gray-700 text-sm">
                  {reminders.map((r, i) => (
                    <li key={i} className="flex justify-between">
                      <span>{r.task}</span>
                      <span className="text-gray-500">{r.due}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No reminders set.</p>
              )}
              <button className="mt-4 text-sm text-blue-600 underline hover:text-blue-800">
                + Add Reminder
              </button>
            </div>

            {/* Milestones */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-amber-400">
              <h3 className="flex items-center gap-2 text-amber-600 font-bold text-lg mb-4">
                <FaTrophy /> Inventory Milestones
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {milestones.map((m, i) => (
                  <li
                    key={i}
                    className={`flex justify-between ${
                      m.completed ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    <span>{m.title}</span>
                    <span>{m.completed ? "✅" : "❌"}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Smart Suggestions */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-pink-400">
              <h3 className="flex items-center gap-2 text-pink-600 font-bold text-lg mb-4">
                <FaLightbulb /> Smart Suggestions
              </h3>
              {healthSuggestions.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                  {healthSuggestions.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">All looks good!</p>
              )}
            </div>

            {/* Clean Out */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-red-400">
              <h3 className="flex items-center gap-2 text-red-500 font-bold text-lg mb-4">
                <FaTrashRestoreAlt /> Clean Out Opportunities
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                Check older pantry or frozen goods for expiration or inactivity.
              </p>
              <button className="text-sm text-red-500 underline hover:text-red-700">
                Review Pantry
              </button>
            </div>

            {/* Saved Plans */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-indigo-400">
              <h3 className="flex items-center gap-2 text-indigo-600 font-bold text-lg mb-4">
                <FaRegFolderOpen /> Saved Inventory Plans
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                {savedPlans.map((plan, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{plan.title}</span>
                    <span className="text-gray-400 text-xs">{plan.updated}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Activity Logs */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-gray-400 col-span-full lg:col-span-3">
              <h3 className="flex items-center gap-2 text-gray-700 font-bold text-lg mb-4">
                <FaClipboardList /> Recent Activity Log
              </h3>
              {logs.length > 0 ? (
                <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                  {logs.map((log, i) => (
                    <li key={i}>{log}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No recent activity.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 text-gray-600 space-y-4">
            <p className="text-lg">You haven’t added anything to your inventory yet.</p>
            <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
              Add Your First Item
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default InventoryTips;
