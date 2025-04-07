import React, { useMemo } from 'react';
import { Product } from '../Hooks/useInventory';
import {
  FaLightbulb, FaBroom, FaDollarSign,
  FaTags, FaArchive, FaDownload, FaBell, FaSnowflake, FaSeedling
} from 'react-icons/fa';

interface Props {
  inventoryData: Product[];
}

const HomeOpsIntelligenceSection: React.FC<Props> = ({ inventoryData }) => {
  const now = Date.now();
  const twoMonthsAgo = now - 1000 * 60 * 60 * 24 * 60;

  const unusedItems = inventoryData.filter(item =>
    new Date(item.updatedAt || item.createdAt).getTime() < twoMonthsAgo
  );

  const inventoryValue = useMemo(() => {
    return inventoryData.reduce((acc, item) => acc + (item.price || 0), 0);
  }, [inventoryData]);

  const seasonal = (() => {
    const month = new Date().getMonth();
    if ([2, 3, 4].includes(month)) return "🌱 Spring cleaning: Check your pantry, expired goods, and clean surfaces.";
    if ([5, 6, 7].includes(month)) return "☀️ Summer prep: Review your outdoor tools and supplies.";
    if ([8, 9, 10].includes(month)) return "🍂 Fall organization: Tidy up the garage, swap seasonal tools.";
    return "❄️ Winter check: Inspect heaters, backup batteries, and indoor items.";
  })();

  return (
    <section className="bg-gradient-to-tr from-white via-blue-50 to-emerald-50 py-20 px-4">
      <div className="max-w-7xl mx-auto space-y-14">
        <h2 className="text-4xl font-bold text-center text-gray-800">🧠 HomeOps Intelligence Center</h2>

        {/* AI-style Suggestions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="flex items-center text-lg font-semibold text-indigo-700 mb-4 gap-2">
            <FaLightbulb /> Smart Action Prompts
          </h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
            <li>🧻 You're low on paper goods — consider restocking toiletries this week.</li>
            <li>📦 7+ items haven’t been touched in 60+ days — do a quick inventory refresh.</li>
            <li>🔄 Backup your inventory list before making bulk updates or moving.</li>
            <li>🛠 It’s time to review your tool category — some may need relocation or disposal.</li>
          </ul>
        </div>

        {/* Clutter Control */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-pink-700 mb-4"><FaBroom /> Clutter Control Advisor</h3>
          {unusedItems.length > 0 ? (
            <ul className="text-sm text-gray-700 space-y-2">
              {unusedItems.slice(0, 5).map((item, i) => (
                <li key={i}>
                  {item.name} — not updated in over 60 days.
                </li>
              ))}
              <li className="italic text-gray-500">+ {unusedItems.length - 5} more item(s) may need review</li>
            </ul>
          ) : (
            <p className="text-sm text-green-600">You're staying up to date — no clutter detected! ✅</p>
          )}
        </div>

        {/* Value Estimator */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-amber-700 mb-4"><FaDollarSign /> Total Inventory Value</h3>
          <p className="text-2xl font-bold text-gray-800">${inventoryValue}</p>
          <p className="text-sm text-gray-600">Estimate based on current price values in your inventory.</p>
        </div>

        {/* Bulk Actions */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-cyan-700"><FaTags /> Quick Bulk Actions</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2 justify-center">
              <FaTags /> Apply Tags to Category
            </button>
            <button className="bg-gray-700 text-white px-4 py-2 rounded flex items-center gap-2 justify-center">
              <FaArchive /> Archive Old Items
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 justify-center">
              <FaDownload /> Export Backup
            </button>
          </div>
        </div>

        {/* Automation Prompts */}
        <div className="bg-white rounded-xl shadow p-6 space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-700 mb-2"><FaBell /> Automation Prompts</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
            <li>🧼 Set a reminder to clean the fridge every 30 days</li>
            <li>🧽 Organize the pantry on the 1st of each month</li>
            <li>🔁 Rotate seasonal tools every 90 days</li>
          </ul>
        </div>

        {/* Seasonal Tips */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4 text-emerald-700 text-sm font-medium rounded-2xl border border-emerald-300">
          {seasonal.includes("Winter") ? <FaSnowflake className="text-2xl" /> : <FaSeedling className="text-2xl" />}
          <p>{seasonal}</p>
        </div>
      </div>
    </section>
  );
};

export default HomeOpsIntelligenceSection;
