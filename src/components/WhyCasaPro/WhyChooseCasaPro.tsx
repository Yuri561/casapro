import React from "react";
import cards from "../../db/WhyCasaProdb";

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
          {cards.map((card, index) =>(
            <div key={index}
            className=" p-5 text-center md:p-8 lg:p-12 bg-white rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-2 duration-300 animate-fade-in-up">
            <div className="flex items-center justify-center w-20 h-20 mx-auto bg-teal-100 rounded-full">
              <card.icon className="w-10 h-10 text-teal-500"/>
            </div>
            <h3 className="mt-8 text-2xl font-bold text-gray-900 font-pj">
              {card.title}
            </h3>
            <p className="mt-5 text-lg text-gray-600 font-pj">
              {card.desc}
            </p>
            
          </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default WhyChooseCasaPro;
