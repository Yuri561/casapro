import React, { useEffect, useState } from "react";
import bannerPng from "../../../public/profile.jpg";
import InventoryAssistant from "../Pages/InventoryAssistant";
import InventoryForecast from "../Pages/InventoryForecast";
import HomeOpsIntelligenceSection from "../Pages/HomeOpsInteligence";
import { userInventory } from "../../UserAuth/user_auth";
import useInventory, { Product } from "../Hooks/useInventory";
import EditProfile from "../EditProfile/EditProfile";

interface ProfileProps {
  username?: string;
  email?: string;
  totalItems?: number;
  totalCategories?: number;
  profileCompletion?: number;
  lastLogin?: string;
  onEditProfile?: () => void;
  onViewActivity?: () => void;
  onLogout?: () => void;
}

const Profile: React.FC<ProfileProps> = ({


  profileCompletion = 65,


}) => {
  const [username, setUsername] = useState("");
  const [inventoryData, setInventoryData] = useState<Product[]>([]);
  const {totalItems, totalCategories} = useInventory()

  const name = localStorage.getItem("user_id") || "?";
  const userId = localStorage.getItem("user_id") || "";

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);

    const fetchInventory = async () => {
      try {
        const response = await userInventory(userId);
        if (response.status === 200) {
          setInventoryData(response.data.user_inventory);
        }
      } catch (error) {
        console.error("Unable to retrieve inventory data:", error);
      }
    };

    fetchInventory();
  }, [userId]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#e8f4f8] via-[#dbeef7] to-[#c8e2f0] overflow-hidden">
      {/* ===== Cover Banner ===== */}
      <div className="relative h-48">
        <img src={bannerPng} alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black opacity-30" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="w-28 h-28 rounded-full border-4 border-white hover:border-blue-300 shadow-lg bg-white flex items-center justify-center text-4xl font-bold text-gray-900">
            {name?.[0]?.toUpperCase()}
          </div>
        </div>
      </div>

      {/* ===== Basic Info ===== */}
      <div className="pt-20 pb-6 px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">{username || "User"}</h2>
        <div className="mt-5">
        <EditProfile/>
        </div>
      </div>

      {/* ===== Stats & Completion ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-8 pb-6">
        <div className="text-center">
          <p className="text-4xl font-semibold text-teal-600">{totalItems}</p>
          <p className="text-sm text-gray-500">Total Items</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-semibold text-purple-600">{totalCategories}</p>
          <p className="text-sm text-gray-500">Categories</p>
        </div>
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-1">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeDasharray={`${profileCompletion}, 100`}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-800">
              {profileCompletion}%
            </span>
          </div>
          <p className="text-sm text-gray-500">Profile Complete</p>
        </div>
      </div>


      {/* ===== Dashboard Feature Sections (Unified Background) ===== */}
      <section className="py-10">
        <InventoryAssistant inventoryData={inventoryData} />
      </section>

      <section className="py-10">
        <InventoryForecast inventoryData={inventoryData} />
      </section>

      <section className="py-10 pb-10">
        <HomeOpsIntelligenceSection inventoryData={inventoryData} />
      </section>
    </div>
  );
};

export default Profile;
