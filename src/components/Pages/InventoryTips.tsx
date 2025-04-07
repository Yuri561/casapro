import React, { useState } from 'react';
import { FaCalendarAlt, FaTrophy, FaPlusCircle, FaDownload, FaBullseye } from 'react-icons/fa';

const InventoryTips: React.FC = () => {
  const [goals] = useState([
    { category: "Groceries", limit: 100 },
    { category: "Toiletries", limit: 40 },
  ]);
  const [milestones] = useState([
    { title: "🎉 First 10 Items Added", completed: true },
    { title: "💼 Track 3 Categories", completed: true },
    { title: "🧼 First Restock Logged", completed: false },
  ]);
  const [reminders] = useState([
    { task: "Restock paper towels", due: "April 10, 2025" },
    { task: "Review pantry items", due: "April 13, 2025" },
  ]);

  return (
    <section className="bg-gradient-to-r from-cyan-100 via-blue-100 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <h2 className="text-4xl font-bold text-center text-gray-800">🧠 Smart Inventory Planner</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* 🎯 Budget Goals */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-teal-500">
            <h3 className="flex items-center gap-2 text-teal-600 font-bold text-lg mb-4"><FaBullseye /> Category Budget Goals</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              {goals.map((goal, i) => (
                <li key={i} className="flex justify-between">
                  <span>{goal.category}</span>
                  <span className="font-semibold">${goal.limit.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <button className="mt-4 text-sm text-teal-600 underline hover:text-teal-800">+ Set New Goal</button>
          </div>

          {/* 🗓️ Reminders */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
            <h3 className="flex items-center gap-2 text-blue-600 font-bold text-lg mb-4"><FaCalendarAlt /> Upcoming Reminders</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              {reminders.map((r, i) => (
                <li key={i} className="flex justify-between">
                  <span>{r.task}</span>
                  <span className="text-gray-500">{r.due}</span>
                </li>
              ))}
            </ul>
            <button className="mt-4 text-sm text-blue-600 underline hover:text-blue-800">+ Add Reminder</button>
          </div>

          {/* 🏆 Milestones */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-amber-400">
            <h3 className="flex items-center gap-2 text-amber-600 font-bold text-lg mb-4"><FaTrophy /> Inventory Milestones</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {milestones.map((m, i) => (
                <li key={i} className={`flex justify-between ${m.completed ? 'text-green-600' : 'text-gray-500'}`}>
                  <span>{m.title}</span>
                  <span>{m.completed ? "✅" : "❌"}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ⚡ Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500 col-span-full lg:col-span-3">
            <h3 className="text-purple-600 font-bold text-lg mb-4">⚡ Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700">
                <FaPlusCircle /> Add New Item
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">
                <FaDownload /> Export to CSV
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">
                💡 Smart Suggestions
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InventoryTips;
