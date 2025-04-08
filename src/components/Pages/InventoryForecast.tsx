// Same imports from before
import React, { useState, useEffect } from 'react';
import { Product } from '../Hooks/useInventory';
import useInventory from '../Hooks/useInventory';
import {
  FaTrash,
  FaClipboardList,
  FaBoxes,
  FaMapMarkerAlt,
  FaArrowCircleDown,
  FaClipboardCheck,
  FaGift
} from 'react-icons/fa';

interface Props {
  inventoryData: Product[];
}

// const zones = ["Kitchen", "Bathroom", "Garage", "Pantry", "Utility", "Storage"];

const InventoryForecast: React.FC<Props> = ({ inventoryData }) => {
  const [shoppingList, setShoppingList] = useState<string[]>([]);
  const [zoneMap, setZoneMap] = useState<Record<string, string>>({});
  const {totalItems, totalCategories} = useInventory()

  const toggleShoppingItem = (itemName: string) => {
    setShoppingList((prev) =>
      prev.includes(itemName) ? prev.filter(i => i !== itemName) : [...prev, itemName]
    );
  };

  useEffect(() => {
    // Automatically tag tools/electronics to "Garage", groceries to "Pantry", etc.
    const map: Record<string, string> = {};
    inventoryData.forEach(item => {
      if (item.category.toLowerCase().includes("tool")) map[item.name] = "Garage";
      else if (item.category.toLowerCase().includes("grocery")) map[item.name] = "Pantry";
      else if (item.category.toLowerCase().includes("toiletry")) map[item.name] = "Bathroom";
      else map[item.name] = "Storage";
    });
    setZoneMap(map);
  }, [inventoryData]);

  const restockQueue = [...inventoryData]
    .filter(item => item.quantity <= 2)
    .sort((a, b) => new Date(a.updatedAt || a.createdAt).getTime() - new Date(b.updatedAt || b.createdAt).getTime());

  const categoryHealth = inventoryData.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = { total: 0, qty: 0 };
    acc[item.category].total++;
    acc[item.category].qty += item.quantity;
    return acc;
  }, {} as Record<string, { total: number; qty: number }>);

  const avgHealth = Object.entries(categoryHealth).map(([cat, data]) => {
    const avg = data.qty / data.total;
    let status = "Healthy";
    if (avg <= 2) status = "Critical";
    else if (avg <= 5) status = "Caution";
    return { category: cat, avg, status };
  });

  const suggestions: string[] = [];
  const twoMonthsAgo = Date.now() - 1000 * 60 * 60 * 24 * 60;
  if (inventoryData.some(i => new Date(i.updatedAt || i.createdAt).getTime() < twoMonthsAgo)) {
    suggestions.push("⏳ It’s been over 2 months since you updated some items — consider a refresh or clean out.");
  }
  if (restockQueue.length > 3) {
    suggestions.push("🛍 You have several items running low — plan a restock trip soon.");
  }
  if (inventoryData.length >= 20) {
    suggestions.push("🏡 Amazing! You're tracking over 20 items. You're really managing your home like a pro!");
  }

  return (
    <section className="py-6 px-4 bg-gradient-to-br from-emerald-50 via-cyan-100 to-blue-50">
      <div className="max-w-7xl mx-auto space-y-14">
        <h2 className="text-4xl font-bold text-center text-gray-800">Home Management & Logistics Hub</h2>

        {/* Command Summary */}
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div className="bg-white shadow rounded-xl p-6">
            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><FaBoxes /> Items Tracked</h4>
            <p className="text-2xl font-semibold text-blue-600">{totalItems}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6">
            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><FaMapMarkerAlt /> Storage Zones</h4>
            <p className="text-sm text-gray-600">{[...new Set(Object.values(zoneMap))].join(", ")}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6">
            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><FaClipboardCheck /> Active Categories</h4>
            <p className="text-sm text-gray-600">{totalCategories} categories</p>
          </div>
        </div>

        {/* Restock Queue + Shopping */}
        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2"><FaArrowCircleDown /> Restock Priority Queue</h3>
          {restockQueue.length ? (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
              {restockQueue.map((item, i) => (
                <li key={i} className="bg-gray-100 p-3 rounded-md flex justify-between items-center">
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity} • {item.category}</p>
                  </div>
                  <button onClick={() => toggleShoppingItem(item.name)} className="text-xs bg-blue-600 text-white px-3 py-1 rounded">
                    {shoppingList.includes(item.name) ? "✓ Added" : "Add to List"}
                  </button>
                </li>
              ))}
            </ul>
          ) : <p className="text-gray-500 text-sm">Everything’s stocked up — nice work!</p>}
        </div>

        {/* Shopping List */}
        {shoppingList.length > 0 && (
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2"><FaClipboardList /> Your Shopping List</h3>
            <ul className="space-y-2 mt-2 text-sm">
              {shoppingList.map((item, i) => (
                <li key={i} className="flex justify-between items-center">
                  <span>{item}</span>
                  <button onClick={() => toggleShoppingItem(item)} className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-3">
              <button onClick={() => navigator.clipboard.writeText(shoppingList.join(", "))} className="bg-green-600 text-white px-4 py-1 rounded text-sm">Copy List</button>
              <button onClick={() => alert("Export to CSV coming soon!")} className="bg-indigo-600 text-white px-4 py-1 rounded text-sm">Export CSV</button>
            </div>
          </div>
        )}

        {/* Category Health */}
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Category Health Overview</h3>
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {avgHealth.map(({ category, avg, status }, i) => (
              <li key={i} className={`p-4 rounded-md ${status === "Critical" ? "bg-red-100" : status === "Caution" ? "bg-yellow-100" : "bg-green-100"}`}>
                <p className="font-semibold">{category}</p>
                <p className="text-gray-700">Avg Qty: {avg.toFixed(1)}</p>
                <p className="text-xs text-gray-500">Status: <strong>{status}</strong></p>
              </li>
            ))}
          </ul>
        </div>

        {/* Smart Suggestions */}
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">💡 Smart Suggestions & Logistics Reminders</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
            {suggestions.length ? suggestions.map((tip, i) => <li key={i}>{tip}</li>) : <li>Everything looks good! Keep it up 💪</li>}
          </ul>
        </div>

        {/* Motivation Boost */}
        <div className="bg-white shadow rounded-xl p-6 text-center text-emerald-700 font-medium text-sm rounded-2xl border border-emerald-300">
          <FaGift className="mx-auto text-3xl mb-2" />
          You’ve done an amazing job tracking your home. A little consistency each week keeps your home stress-free and your mind focused. Keep going! 🌱
        </div>
      </div>
    </section>
  );
};

export default InventoryForecast;
