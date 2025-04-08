
import React from "react";
import cards from "../../db/HowItWorksdb"

const HowItWorks: React.FC = () => {
  return (
    <section id='how-it-works' className="py-8 bg-gradient-to-r from-teal-100 via-cyan-100 to-blue-100 sm:py-20 lg:py-24">
      <div className="px-4 mx-auto w-full sm:px-6 lg:px-8">

        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl font-pj">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600 font-pj">
            Manage your home inventory effortlessly with Casa Pro in just 3 simple steps:
            <br />
            1. <strong>Add Items:</strong> Easily log your groceries, tools, toiletries, and more by scanning barcodes or entering them manually.
            <br />
            2. <strong>Track Usage:</strong> Monitor inventory levels in real-time and receive alerts when supplies are running low.
            <br />
            3. <strong>Stay Organized:</strong> Categorize items, set expiration dates, and access your inventory from anywhere with ease.
          </p>

        </div>

        <div className="grid grid-cols-1 gap-y-12 mt-12 sm:grid-cols-3 sm:gap-x-12">
          {cards.map((card, index) => (
            <div
              key={index}
              className="p-5 flex flex-col items-center justify-center w-64 h-64 mx-auto bg-white rounded-full shadow-lg hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-20 h-20 bg-teal-100 rounded-full">
                <card.icon className="w-10 h-10 text-teal-500" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900 font-pj text-center">
                {card.title}
              </h3>
              <p className="mt-2 text-base text-gray-600 font-pj text-center">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
