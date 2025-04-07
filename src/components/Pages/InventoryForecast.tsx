import React, { useEffect, useState } from 'react';
import { Product } from '../Hooks/useInventory';
import { FaChartLine, FaChartBar, FaFireAlt, FaHourglassHalf } from 'react-icons/fa';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface Props {
  inventoryData: Product[];
}

const InventoryForecast: React.FC<Props> = ({ inventoryData }) => {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [trendsData, setTrendsData] = useState<any[]>([]);

  useEffect(() => {
    const groupedByMonth: Record<string, number> = {};
    inventoryData.forEach(item => {
      const date = new Date(item.updatedAt || item.createdAt || "");
      const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });

      groupedByMonth[monthYear] = (groupedByMonth[monthYear] || 0) + 1;
    });

    const trends = Object.entries(groupedByMonth).map(([month, count]) => ({
      name: month,
      items: count,
    }));

    setTrendsData(trends.sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime()));
  }, [inventoryData]);

  const frequentCategories = (() => {
    const catCount: Record<string, number> = {};
    inventoryData.forEach(item => {
      catCount[item.category] = (catCount[item.category] || 0) + 1;
    });

    return Object.entries(catCount)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  })();

  const forecastItems = inventoryData
    .filter(item => item.quantity <= 3)
    .map(item => ({
      name: item.name,
      qty: item.quantity,
    }));

  return (
    <section className="bg-gradient-to-r from-white via-blue-50 to-cyan-100 py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        <h2 className="text-4xl font-bold text-center text-gray-800">📉 Inventory Trends & Forecast</h2>

        {/* Chart Toggle */}
        <div className="flex justify-end gap-3 mb-6">
          <button onClick={() => setChartType('line')} className={`p-2 rounded ${chartType === 'line' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`} title="Line Chart">
            <FaChartLine />
          </button>
          <button onClick={() => setChartType('bar')} className={`p-2 rounded ${chartType === 'bar' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`} title="Bar Chart">
            <FaChartBar />
          </button>
        </div>

        {/* Inventory Trends Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📅 Inventory Added Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            {chartType === 'line' ? (
              <LineChart data={trendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="items" stroke="#3b82f6" strokeWidth={3} />
              </LineChart>
            ) : (
              <BarChart data={trendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="items" fill="#06b6d4" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Category Heatmap-like Insight */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🔥 Most Used Categories</h3>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
            {frequentCategories.map((cat, i) => (
              <li key={i} className="flex items-center gap-2">
                <FaFireAlt className="text-amber-500" /> {cat.category} — <span className="font-semibold">{cat.count} items</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Forecasting List */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🔮 Forecast: Items to Restock Soon</h3>
          {forecastItems.length > 0 ? (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
              {forecastItems.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <FaHourglassHalf className="text-red-400" />
                  {item.name} — <span className="font-semibold">Only {item.qty} left</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">All items are well-stocked right now 🎉</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default InventoryForecast;
