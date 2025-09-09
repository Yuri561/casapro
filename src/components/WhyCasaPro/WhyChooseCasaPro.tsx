import React from "react";
import cards from "../../db/WhyCasaProdb";

const WhyChooseCasaPro: React.FC = () => {
  return (
    <section
      id="why"
      aria-label="Why choose CasaPro"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-neutral-50 to-white"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="inline-flex items-center gap-2 rounded-full bg-black text-white px-3 py-1 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Why CasaPro
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
            Why Choose CasaPro?
          </h2>
          <p className="mt-4 text-lg text-gray-600 sm:mt-6">
            Simplify home inventory, prevent overspending, and stay organized without the busywork.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 md:grid-cols-3">
          {cards.map((card, index) => (
            <article
              key={index}
              className="group rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm transition hover:shadow-md hover:-translate-y-1 focus-within:shadow-md focus-within:-translate-y-1"
              tabIndex={0}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 ring-1 ring-blue-100">
                <card.icon className="h-8 w-8 text-blue-600" aria-hidden="true" />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {card.title}
              </h3>

              <p className="mt-3 text-gray-600 leading-relaxed">
                {card.desc}
              </p>

              <div className="mt-5">
                <span className="inline-flex items-center text-sm font-medium text-blue-700 group-hover:underline">
                  Learn more
                  <svg
                    className="ml-1 h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12.293 3.293a1 1 0 011.414 0l4.0 4a1 1 0 01-1.414 1.414L14 6.414V17a1 1 0 11-2 0V6.414L8.707 8.707A1 1 0 017.293 7.293l4-4z" />
                  </svg>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseCasaPro;
