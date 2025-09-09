import React from "react";
import cards from "../../db/HowItWorksdb";

const HowItWorks: React.FC = () => {
  return (
    <section
      id="how-it-works"
      aria-label="How CasaPro works"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-neutral-50 to-white"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-black text-white px-3 py-1 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            How it works
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Manage inventory in 3 simple steps
          </h2>
          <p className="mt-4 text-lg text-gray-600 sm:mt-6 leading-relaxed">
            CasaPro makes it easy to log items, track usage, and stay
            organized—so you never run out of essentials again.
          </p>
        </div>

        {/* Steps grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {cards.map((card, index) => (
            <article
              key={index}
              className="group flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm transition hover:shadow-md hover:-translate-y-1 focus-within:shadow-md focus-within:-translate-y-1"
              tabIndex={0}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 ring-1 ring-blue-100">
                <card.icon
                  className="h-10 w-10 text-blue-600"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {card.title}
              </h3>
              <p className="mt-3 text-gray-600 text-base leading-relaxed">
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
