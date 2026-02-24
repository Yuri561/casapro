import React from "react";

const Newsletter: React.FC = () => {
  return (
    <section
      id="newsletter"
      aria-label="Newsletter signup"
      className="relative min-h-[85vh] flex items-center justify-center bg-[#0f172a] text-white overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20" />
      
      {/* Floating Glow Orbs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[140px]" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[140px]" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        
        {/* Badge */}
        <span className="inline-flex items-center rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-1 text-sm font-medium text-cyan-300">
          Stay in the loop
        </span>

        {/* Heading */}
        <h2 className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
          Get smarter inventory insights.
          <br />
          <span className="text-cyan-400">
            Straight to your inbox.
          </span>
        </h2>

        {/* Subtext */}
        <p className="mt-8 text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
          Product updates, feature drops, workflow tips, and early access —
          no spam. Just value.
        </p>

        {/* Form */}
        <form
          action="#"
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            required
            placeholder="Enter your email address"
            className="
              w-full sm:w-auto sm:min-w-[380px]
              rounded-xl
              bg-white/5
              border border-white/10
              px-6 py-4
              text-white
              placeholder-gray-400
              focus:outline-none
              focus:border-cyan-400
              focus:ring-2
              focus:ring-cyan-400/40
              transition
            "
          />

          <button
            type="submit"
            className="
              w-full sm:w-auto
              rounded-xl
              bg-cyan-400
              text-black
              font-semibold
              px-8 py-4
              shadow-xl shadow-cyan-400/30
              hover:scale-[1.02]
              hover:shadow-cyan-400/40
              transition-all duration-300
            "
          >
            Subscribe
          </button>
        </form>

        {/* Disclaimer */}
        <p className="mt-8 text-xs text-gray-500">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;