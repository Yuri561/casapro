import React from "react";
import {
  ClipboardList,
  Box,
  BarChart3,
  ShieldCheck,
  Smartphone,
  FileBarChart,
} from "lucide-react";

const WhyChooseCasaPro: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 sm:py-20 lg:py-24">
      <div className="px-4 mx-auto w-full sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl xl:text-6xl font-pj animate-fade-in-up">
            Why Choose Casa Pro?
          </h2>
          <p className="mt-4 text-lg text-gray-600 sm:mt-6 font-pj animate-fade-in-up delay-200">
            Discover how Casa Pro simplifies home inventory management and keeps
            your home organized effortlessly.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 mt-12 gap-y-12 sm:mt-16 sm:grid-cols-2 sm:gap-12 md:grid-cols-3 md:gap-12 xl:mt-24">
          {/* Feature 1: Easy Item Management */}
          <div className=" p-5 text-center md:p-8 lg:p-12 bg-white rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-2 duration-300 animate-fade-in-up">
            <div className="flex items-center justify-center w-20 h-20 mx-auto bg-teal-100 rounded-full">
              <ClipboardList className="w-10 h-10 text-teal-500 hover:scale-110 transition-all duration-200" />
            </div>
            <h3 className="mt-8 text-2xl font-bold text-gray-900 font-pj">
              Easy Item Management
            </h3>
            <p className="mt-5 text-lg text-gray-600 font-pj">
              Add, update, and categorize home items effortlessly with just a
              few clicks.
            </p>
          </div>

          {/* Feature 2: Smart Categorization */}
          <div className="p-5 text-center md:p-8 lg:p-12 bg-white rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-2 duration-300 animate-fade-in-up delay-100">
            <div className="flex items-center justify-center w-20 h-20 mx-auto bg-teal-100 rounded-full">
              <Box className="w-10 h-10 text-teal-500 hover:scale-110 transition-all duration-200" />
            </div>
            <h3 className="mt-8 text-2xl font-bold text-gray-900 font-pj">
              Smart Categorization
            </h3>
            <p className="mt-5 text-lg text-gray-600 font-pj">
              Automatically group your inventory into categories like Groceries,
              Tools, and more.
            </p>
          </div>

          {/* Feature 3: Real-Time Insights */}
          <div className="p-5 text-center md:p-8 lg:p-12 bg-white rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-2 duration-300 animate-fade-in-up delay-200">
            <div className="flex items-center justify-center w-20 h-20 mx-auto bg-teal-100 rounded-full">
              <BarChart3 className="w-10 h-10 text-teal-500 hover:scale-110 transition-all duration-200" />
            </div>
            <h3 className="mt-8 text-2xl font-bold text-gray-900 font-pj">
              Real-Time Insights
            </h3>
            <p className="mt-5 text-lg text-gray-600 font-pj">
              Stay on top of your inventory with visual data and real-time
              updates.
            </p>
          </div>

          {/* Feature 4: Secure Backup */}
          <div className="p-5 text-center md:p-8 lg:p-12 bg-white rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-2 duration-300 animate-fade-in-up delay-300">
            <div className="flex items-center justify-center w-20 h-20 mx-auto bg-teal-100 rounded-full">
              <ShieldCheck className="w-10 h-10 text-teal-500 hover:scale-110 transition-all duration-200" />
            </div>
            <h3 className="mt-8 text-2xl font-bold text-gray-900 font-pj">
              Secure Backup
            </h3>
            <p className="mt-5 text-lg text-gray-600 font-pj">
              Protect your data with secure cloud storage and backup options.
            </p>
          </div>

          {/* Feature 5: Multi-Device Sync */}
          <div className="p-5 text-center md:p-8 lg:p-12 bg-white rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-2 duration-300 animate-fade-in-up delay-400">
            <div className="flex items-center justify-center w-20 h-20 mx-auto bg-teal-100 rounded-full">
              <Smartphone className="w-10 h-10 text-teal-500 hover:scale-110 transition-all duration-200" />
            </div>
            <h3 className="mt-8 text-2xl font-bold text-gray-900 font-pj">
              Multi-Device Sync
            </h3>
            <p className="mt-5 text-lg text-gray-600 font-pj">
              Access your inventory anytime, anywhere, from any device.
            </p>
          </div>

          {/* Feature 6: Inventory Reports */}
          <div className="p-5 text-center md:p-8 lg:p-12 bg-white rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-2 duration-300 animate-fade-in-up delay-500">
            <div className="flex items-center justify-center w-20 h-20 mx-auto bg-teal-100 rounded-full">
              <FileBarChart className="w-10 h-10 text-teal-500 hover:scale-110 transition-all duration-200" />
            </div>
            <h3 className="mt-8 text-2xl font-bold text-gray-900 font-pj">
              Inventory Reports
            </h3>
            <p className="mt-5 text-lg text-gray-600 font-pj">
              Generate detailed reports to monitor and manage your inventory
              with ease.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseCasaPro;
