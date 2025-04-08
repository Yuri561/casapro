import React, { useState } from 'react';
import { FaLightbulb, FaThList, FaThLarge, FaDownload, FaCogs } from 'react-icons/fa';
import { Product } from '../Hooks/useInventory';


interface Props {
  inventoryData: Product[];
}

const InventoryAssistant: React.FC<Props> = ({ inventoryData }) => {
  const [filterType, setFilterType] = useState<'all' | 'low' | 'new' | 'unused'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'compact'>('grid');

  const now = Date.now();

  const filteredItems = inventoryData.filter(item => {
    const lastUpdated = new Date(item.updatedAt || item.createdAt || "").getTime();
    const daysAgo = (now - lastUpdated) / (1000 * 60 * 60 * 24);

    switch (filterType) {
      case 'low':
        return item.quantity <= 2;
      case 'new':
        return daysAgo <= 5;
      case 'unused':
        return daysAgo >= 30;
      default:
        return true;
    }
  });

  return (
    <section className="bg-gradient-to-r from-white via-sky-50 to-blue-100 py-6 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        <h2 className="text-4xl font-bold text-center text-gray-800">Inventory Assistant Hub</h2>

        {/* Filter and view controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-3">
            <button onClick={() => setFilterType('all')} className={`px-3 py-2 rounded text-sm ${filterType === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>All</button>
            <button onClick={() => setFilterType('low')} className={`px-3 py-2 rounded text-sm ${filterType === 'low' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Low Stock</button>
            <button onClick={() => setFilterType('new')} className={`px-3 py-2 rounded text-sm ${filterType === 'new' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Recently Added</button>
            <button onClick={() => setFilterType('unused')} className={`px-3 py-2 rounded text-sm ${filterType === 'unused' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}>Unused</button>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setViewMode('grid')} title="Grid View" className={`p-2 rounded ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
              <FaThLarge />
            </button>
            <button onClick={() => setViewMode('list')} title="List View" className={`p-2 rounded ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
              <FaThList />
            </button>
            <button onClick={() => setViewMode('compact')} title="Compact View" className={`p-2 rounded ${viewMode === 'compact' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
              <FaCogs />
            </button>
            <button className="p-2 rounded bg-green-500 text-white hover:bg-green-600" title="Export CSV">
              <FaDownload />
            </button>
          </div>
        </div>

        {/* Assistant Insight Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl shadow-md border-t-4 border-indigo-400">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold mb-2">
              <FaLightbulb />
              Smart Insight
            </div>
            <p className="text-sm text-gray-700">
              {filteredItems.length === 0
                ? "No items matched this filter. Try another one!"
                : `Showing ${filteredItems.length} item(s) under the "${filterType}" filter.`}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-md border-t-4 border-blue-400">
            <p className="text-sm text-gray-700">
              Try switching to <strong>Compact View</strong> to manage large inventories faster.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-md border-t-4 border-emerald-400">
            <p className="text-sm text-gray-700">
              You can export just the <strong>{filterType}</strong> items for backup or CSV use.
            </p>
          </div>
        </div>

        {/* Filtered Inventory Display (simplified for now) */}
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
              <h4 className="font-semibold text-gray-800 text-base">{item.name}</h4>
              <p className="text-xs text-gray-500">{item.category}</p>
              <p className="text-sm mt-2 text-gray-700">Qty: {item.quantity}</p>
              {item.price && <p className="text-sm text-gray-600">Price: ${item.price}</p>}
            </div>
          ))}
          {filteredItems.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">No items found for this view.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default InventoryAssistant;
