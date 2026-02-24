import React from "react";
import cards from "../../db/HowItWorksdb";

const HowItWorks: React.FC = () => {
  return (
    <section
      id="how-it-works"
      aria-label="How CasaPro works"
      className="relative py-24 bg-[#0f172a] text-white overflow-hidden"
    >
      {/* Subtle gradient depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-medium text-cyan-300">
            How it works
          </span>

          <h2 className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight">
            Manage inventory in
            <span className="text-cyan-400"> 3 simple steps</span>
          </h2>

          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            CasaPro makes it effortless to log items, track usage,
            and stay organized — without spreadsheets or chaos.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-10 relative">

          {/* Optional connecting line on desktop */}
          <div className="hidden sm:block absolute top-12 left-0 right-0 h-[2px] bg-white/10" />

          {cards.map((card, index) => (
            <article
              key={index}
              className="relative z-10 group flex flex-col items-center text-center rounded-3xl bg-white/5 border border-white/10 p-10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
              tabIndex={0}
            >
              {/* Step Number */}
              <div className="absolute -top-5 text-xs font-semibold bg-cyan-400 text-black px-3 py-1 rounded-full shadow-lg">
                Step {index + 1}
              </div>

              {/* Icon */}
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-cyan-400/10 border border-cyan-400/20">
                <card.icon
                  className="h-10 w-10 text-cyan-400"
                  aria-hidden="true"
                />
              </div>

              {/* Title */}
              <h3 className="mt-8 text-xl font-semibold">
                {card.title}
              </h3>

              {/* Description */}
              <p className="mt-4 text-gray-400 text-base leading-relaxed">
                {card.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;