import React from "react"
import AddToHomeButton from "../Hooks/AddToHome"

const Hero: React.FC = () => {
  return (
    <section className="relative py-12 sm:py-16 lg:pt-20 lg:pb-36 bg-gradient-to-b from-cyan-50 to-blue-50">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 gap-y-12 lg:items-center lg:grid-cols-2 xl:grid-cols-5">

          {/* Left Section */}
          <div className="text-center xl:col-span-2 lg:text-left md:px-16 lg:px-0">
            <div className="max-w-sm mx-auto sm:max-w-md md:max-w-full">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl font-pj animate-fade-in-up">
                A Smarter Way to Manage Your Home.
              </h1>

              <p className="mt-4 text-lg text-gray-700 font-pj animate-fade-in-up delay-200">
                Simplify home inventory with{" "}
                <span className="font-bold text-teal-500">100+ Families</span>{" "}
                using Casa Pro.
              </p>

              <div className="mt-8 sm:flex sm:space-x-5 lg:mt-12 animate-fade-in-up delay-500">
                <a
                  href="#how-it-works"
                  className="inline-flex items-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-teal-500 border border-transparent rounded-xl hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 shadow-md"
                  role="button"
                >
                  Learn more
                </a>

                {/* This is your Add button now */}
                <AddToHomeButton />
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative xl:col-span-3 mx-2">
            <div className="relative w-full mx-auto lg:max-w-2xl xl:max-w-full">
              <img
                className="w-full rounded-lg shadow-lg transform scale-105"
                src="/house2.jpg"
                alt="Smart home management"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
