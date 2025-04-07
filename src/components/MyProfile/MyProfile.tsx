import React from "react";
import { Edit, LogOut, Clock, Star } from "lucide-react";
import bannerPng from "../../../public/profile.jpg";
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
  username = "John Doe",
  email = "johndoe@example.com",
  totalItems = 0,
  totalCategories = 0,
  profileCompletion = 65,

  onEditProfile = () => alert("Edit Profile Clicked"),
  onViewActivity = () => alert("View Activity Clicked"),
  onLogout = () => alert("Logged Out"),
}) => {

  // Sample recent activity & favorites
  const recentActivity = [
    "Added 5 new items",
    "Removed 2 expired items",
    "Low stock alert on Electronics",
  ];
  const favorites = ["Groceries", "Tools", "Electronics"];
  const name = localStorage.getItem("user_id")
  return (
    <div className="max-w-full mx-auto bg-white shadow-2xl  overflow-hidden">
      {/* Cover Banner */}
      <div className="relative h-48">
        <img src={bannerPng} alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black opacity-30" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
    <div className="w-28 h-28 rounded-full border-4 border-white hover:border-blue-300 shadow-lg bg-white  flex items-center justify-center text-4xl font-bold text-gray-900 ">
      {name?.[0]?.toUpperCase() || "?"}
    </div>
  </div>
      </div>

      {/* Basic Info */}
      <div className="pt-20 pb-6 px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">{username}</h2>
        <p className="text-sm text-gray-600">{email}</p>
        <button
          onClick={onEditProfile}
          className="mt-4 inline-flex items-center px-5 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition"
        >
          <Edit className="w-4 h-4 mr-1" /> Edit Profile
        </button>
      </div>

      {/* Stats & Completion */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-8 pb-6 bg-gray-50">
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

      {/* Bio Section */}
      <div className="px-8 py-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Bio</h3>
        <p className="text-gray-600">
          Hi, I’m {name}! I love keeping track of my home inventory and making sure everything’s in its place.
        </p>
      </div>

      {/* Recent Activity */}
      <div className="px-8 py-6 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Recent Activity</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          {recentActivity.map((act, i) => (
            <li key={i}>{act}</li>
          ))}
        </ul>
      </div>

      {/* Favorites Tags */}
      <div className="px-8 py-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Favorite Categories</h3>
        <div className="flex flex-wrap gap-2">
          {favorites.map((fav) => (
            <span
              key={fav}
              className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              <Star className="w-4 h-4 mr-1" /> {fav}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-8 py-6 bg-gray-50 flex justify-between">
        <button
          onClick={onViewActivity}
          className="flex items-center text-blue-600 hover:underline"
        >
          <Clock className="w-5 h-5 mr-1" /> View Activity
        </button>
        <button
          onClick={onLogout}
          className="flex items-center text-red-600 hover:underline"
        >
          <LogOut className="w-5 h-5 mr-1" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
