import React from "react";
import { ArrowDown } from "lucide-react"; // Optional for better icons

const Hero: React.FC = () => {
  return (
    <div>
      <section id='home' className="relative py-12 sm:py-16 lg:pt-20 lg:pb-36 bg-gradient-to-b from-cyan-50 to-blue-50">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 gap-y-12 lg:items-center lg:grid-cols-2 xl:grid-cols-5">

            <div className="text-center xl:col-span-2 lg:text-left md:px-16 lg:px-0">
              <div className="max-w-sm mx-auto sm:max-w-md md:max-w-full">
                <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj animate-fade-in-up">
                  A Smarter Way to Manage Your Home.
                </h1>

                <p className="mt-4 text-lg text-gray-700 sm:mt-6 lg:mt-8 font-pj animate-fade-in-up delay-200">
                  Simplify home inventory with{" "}
                  <span className="font-bold text-teal-500">100+ Families</span>{" "}
                  using Casa Pro.
                </p>

                <div className="mt-8 lg:mt-12 lg:flex lg:items-center animate-fade-in-up delay-300">
                  <div className="flex justify-center flex-shrink-0 -space-x-4 overflow-hidden lg:justify-start">
                    <img
                      className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                      src="https://d33wubrfki0l68.cloudfront.net/3bfa6da479d6b9188c58f2d9a8d33350290ee2ef/301f1/images/hero/3/avatar-male.png"
                      alt="User 1"
                    />
                    <img
                      className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                      src="https://d33wubrfki0l68.cloudfront.net/b52fa09a115db3a80ceb2d52c275fadbf84cf8fc/7fd8a/images/hero/3/avatar-female-1.png"
                      alt="User 2"
                    />
                    <img
                      className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                      src="https://d33wubrfki0l68.cloudfront.net/8a2efb13f103a5ae2909e244380d73087a9c2fc4/31ed6/images/hero/3/avatar-female-2.png"
                      alt="User 3"
                    />
                    <img
                        className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                        src="https://randomuser.me/api/portraits/men/28.jpg"
                        alt="User 6"
                    />
                    <img
                        className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                        src="https://randomuser.me/api/portraits/women/90.jpg"
                        alt="User 6"
                    />
                    <img
                        className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                        src="https://randomuser.me/api/portraits/men/81.jpg"
                        alt="User 6"
                    />
                    <img
                        className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                        src="https://randomuser.me/api/portraits/women/61.jpg"
                        alt="User 6"
                    />

                  </div>
                </div>

                <div className="mt-8 sm:flex sm:items-center sm:justify-center lg:justify-start sm:space-x-5 lg:mt-12 animate-fade-in-up delay-500">
                  <a
                    href="#how-it-works"
                    className="inline-flex items-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-teal-500 border border-transparent rounded-xl hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 shadow-md"
                    role="button"
                  >
                    Learn more
                  </a>

                  <a
                    href="#"
                    className="inline-flex items-center px-4 py-4 mt-4 text-lg font-bold transition-all duration-300 bg-transparent border border-gray-300 sm:mt-0 font-pj justify-center rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 hover:bg-gray-200 shadow-sm"
                    role="button"
                  >
                    <ArrowDown className="w-5 h-5 mr-2" />
                    Download iOS App
                  </a>
                </div>
              </div>
            </div>

            {/* Right Image Section */}
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
    </div>
  );
};

export default Hero;
