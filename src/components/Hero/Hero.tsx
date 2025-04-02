import React from "react"
import AddToHomeButton from "../Hooks/AddToHome"
import LearnMoreBtn from "./LearnMoreBtn"
import CountUp from "react-countup"


const Hero: React.FC = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center"
      style={{ backgroundImage: "url('/house2.jpg')" }}
    >

      <div className="absolute inset-0 bg-black/60 z-0" />


      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight font-pj">
          Find the best home inventory solution in one tap
        </h1>

        <p className="mt-4 text-lg sm:text-xl text-gray-200">
          Keep track of what matters. Casa Pro simplifies how you manage your home.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <LearnMoreBtn />
          <AddToHomeButton />
        </div>


        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-8 text-white text-center text-lg font-semibold">
          <div className="flex flex-col items-center justify-center space-y-2">
          
            <CountUp start={0} end={1500} duration={10} className="text-4xl font-bold" />
            <p className="text-sm text-gray-300">Items Managed</p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex flex-col items-center justify-center space-y-2">
          
          <CountUp start={0} end={540} duration={10} className="text-4xl font-bold" />
          <p className="text-sm text-gray-300">Happy Users</p>
        </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
