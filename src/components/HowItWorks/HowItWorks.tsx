import { BarChart3, Box, ClipboardList } from "lucide-react";
import React from "react";

const HowItWorks: React.FC = () => {
  return (
    <section id='how-it-works'className="py-16 bg-gradient-to-r from-teal-100 via-cyan-100 to-blue-100 sm:py-20 lg:py-24">
      <div className="px-4 mx-auto w-full sm:px-6 lg:px-8">

        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl font-pj">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600 font-pj">
            Manage your home inventory in 3 easy steps with Casa Pro.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-y-12 mt-12 sm:grid-cols-3 sm:gap-x-12">

          <div className="flex flex-col items-center justify-center w-74 h-74 mx-auto bg-white rounded-full shadow-lg hover:scale-110 transition-all duration-200">
            <div className="flex items-center justify-center w-20 h-20 bg-teal-100 rounded-full">
              <ClipboardList className="w-10 h-10 text-teal-500" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900 font-pj text-center">
              Add Your Items
            </h3>
            <p className="mt-2 text-base text-gray-600 font-pj text-center">
              Scan/manually input your home items with ease.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center w-74 h-74 mx-auto bg-white rounded-full shadow-lg hover:scale-110 transition-all duration-200">
            <div className="flex items-center justify-center w-20 h-20 bg-teal-100 rounded-full">
              <Box className="w-10 h-10 text-teal-500" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900 font-pj text-center">
              Categorize & Manage
            </h3>
            <p className="mt-2 text-base text-gray-600 font-pj text-center">
              Group and organize items for better control.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center w-74 h-74 mx-auto bg-white rounded-full shadow-lg hover:scale-110 transition-all duration-200">
            <div className="flex items-center justify-center w-20 h-20 bg-teal-100 rounded-full">
              <BarChart3 className="w-10 h-10 text-teal-500" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900 font-pj text-center">
              Track & Report
            </h3>
            <p className="mt-2 text-base text-gray-600 font-pj text-center">
              Generate reports and gain valuable insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
