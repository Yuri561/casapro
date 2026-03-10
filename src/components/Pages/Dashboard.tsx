import React, { useEffect, useState } from "react";
import InventoryGauge from "../Gauges/InventoryGauge";
import CategoryDist from "../Gauges/CategoryDist";
import InventoryReports from "../Gauges/InventoryReports";
import MoneySpent from "../Gauges/MoneySpent";
import InventoryTable from "./InventoryTable";
import { Product } from "../Hooks/useInventory";
import { userInventory } from "../../UserAuth/user_auth";
import InventoryTips from "./InventoryTips";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const Dashboard: React.FC = () => {
  const [username, setUsername] = useState("");
  const [inventoryData, setInventoryData] = useState<Product[]>([]);
  const [refreshHistory, setRefreshHistory] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleAddSave = (newItem: Product) => {
    setInventoryData([...inventoryData, newItem]);
    setRefreshHistory((r) => r + 1);
  };

  const userId = localStorage.getItem("user_id") || "";

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);

    const fetchInventory = async () => {
      try {
        const response = await userInventory();
        if (response.status === 200) {
          setInventoryData(response.data.user_inventory);
        }
      } catch (error: any) {
        console.error(
          "unable to retrieve inventory data:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (loading) return <LoadingAnimation />;

  return (
    <div className="relative min-h-screen bg-[#0f172a] text-white overflow-hidden">

      {/* Background glow layers */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[160px]" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[160px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 pointer-events-none" />

      {/* HEADER SECTION */}
      <section className="relative py-24 px-6 text-center">
        <h2 className="text-5xl font-bold tracking-tight">
          Welcome{" "}
          <span className="text-cyan-400">
            {username || "back"}
          </span>
        </h2>

        <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
          Monitor, manage, and optimize your home inventory in one unified control center.
        </p>
      </section>

      {/* GAUGE SECTION */}
      <section className="relative px-6 pb-24">
        <div className="max-w-8xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {[
            <InventoryGauge inventoryData={inventoryData} />,
            <CategoryDist inventoryData={inventoryData} />,
            <InventoryReports userId={userId} refresh={refreshHistory} />,
            <MoneySpent inventoryData={inventoryData} />
          ].map((Component, index) => (
            <div
              key={index}
              className="
                bg-white/5
                border border-white/10
                backdrop-blur-xl
                rounded-3xl
                p-6
                shadow-[0_0_35px_rgba(34,211,238,0.12)]
                hover:border-cyan-400/40
                transition
              "
            >
              {Component}
            </div>
          ))}

        </div>
      </section>

      {/* TIPS SECTION */}
      <section className="relative px-6 pb-24">
        <div className="max-w-6xl mx-auto bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-[0_0_40px_rgba(34,211,238,0.1)]">
          <InventoryTips inventoryData={inventoryData || []}/>
        </div>
      </section>

      {/* INVENTORY TABLE SECTION */}
      <section className="relative px-6 pb-32">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">
              My{" "}
              <span className="text-cyan-400">
                Inventory
              </span>
            </h2>
            <p className="mt-4 text-gray-400">
              Take full control of your tracked items.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-[0_0_40px_rgba(34,211,238,0.1)]">
            <InventoryTable
              inventoryData={inventoryData}
              setInventoryData={setInventoryData}
              onAddSave={handleAddSave}
            />
          </div>

        </div>
      </section>
    </div>
  );
};

export default Dashboard;