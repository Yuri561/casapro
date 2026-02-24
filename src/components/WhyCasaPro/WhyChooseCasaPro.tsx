import React from "react";
import cards from "../../db/WhyCasaProdb";

const WhyChooseCasaPro: React.FC = () => {
  return (
    <section
      id="why"
      aria-label="Why choose CasaPro"
      className="relative py-24 bg-[#0f172a] text-white overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-medium text-cyan-300">
            Why CasaPro
          </span>

          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Built for Modern
            <span className="text-cyan-400"> Homeowners</span>
          </h2>

          <p className="mt-6 text-lg text-gray-400">
            Stay organized, reduce loss, and manage your home inventory
            with a system designed for clarity and control.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <article
              key={index}
              className="
                group relative rounded-3xl
                bg-white/5 backdrop-blur-xl
                border border-white/10
                p-8
                transition-all duration-300
                hover:-translate-y-2
                hover:border-cyan-400/40
                hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]
              "
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/20">
                <card.icon
                  className="w-8 h-8 text-cyan-400"
                  aria-hidden="true"
                />
              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-semibold text-white">
                {card.title}
              </h3>

              {/* Description */}
              <p className="mt-4 text-gray-400 leading-relaxed">
                {card.desc}
              </p>

              {/* Subtle Accent Line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full rounded-b-3xl" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseCasaPro;