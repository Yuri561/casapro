import React from "react"
import AddToHomeButton from "../Hooks/AddToHome"
import LearnMoreBtn from "./LearnMoreBtn"
import CountUp from "react-countup"

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-[#0f172a] text-white overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/house2.jpg')" }}
      />

      {/* Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/90 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE - CONTENT */}
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Smart Home Inventory.
            <br />
            <span className="text-cyan-400">
              Simplified.
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-xl">
            Casa Pro helps you track, organize, and protect everything inside your home from appliances to insurance documentation  all in one secure place.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <LearnMoreBtn />
            <AddToHomeButton />
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap gap-10">
            
            <div>
              <CountUp start={0} end={1500} duration={4} className="text-3xl font-bold text-cyan-400" />
              <p className="text-sm text-gray-400 mt-1">Items Managed</p>
            </div>

            <div>
              <CountUp start={0} end={540} duration={4} className="text-3xl font-bold text-cyan-400" />
              <p className="text-sm text-gray-400 mt-1">Active Users</p>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE - VISUAL CARD */}
        <div className="hidden lg:block">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            
            <h3 className="text-xl font-semibold mb-6 text-cyan-400">
              Your Dashboard Overview
            </h3>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-xl p-4 flex justify-between">
                <span className="text-gray-300">Appliances</span>
                <span className="font-semibold">24 Items</span>
              </div>

              <div className="bg-white/5 rounded-xl p-4 flex justify-between">
                <span className="text-gray-300">Electronics</span>
                <span className="font-semibold">18 Items</span>
              </div>

              <div className="bg-white/5 rounded-xl p-4 flex justify-between">
                <span className="text-gray-300">Furniture</span>
                <span className="font-semibold">12 Items</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero