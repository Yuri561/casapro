import React from "react";

const Newsletter: React.FC = () => {
  return (
    <section
      id="newsletter"
      aria-label="Newsletter signup"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-neutral-50 to-white"
    >
      <div className="w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-black text-white px-3 py-1 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Stay in the loop
          </p>
          <h2 className="mt-4 text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-gray-900">
            Join our newsletter
          </h2>
          <p className="mt-4 sm:mt-6 text-lg text-gray-600">
            Get product updates, tips, and new feature drops — straight to your inbox.
          </p>
        </div>

        {/* Signup Form */}
        <div className="max-w-xl mx-auto mt-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <form action="#" className="flex flex-col gap-4 sm:flex-row sm:gap-3">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email"
              className="flex-1 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              type="submit"
              className="rounded-xl bg-black px-6 py-3 font-medium text-white shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-xs text-gray-500 text-center">
            By subscribing, you agree to receive emails from CasaPro. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
