import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import WhyChooseCasaPro from './components/WhyCasaPro/WhyChooseCasaPro'
import HowItWorks from './components/HowItWorks/HowItWorks'
import Newsletter from './components/Newsletter/Newsletter'
import Footer from './components/Footer/Footer'

function App() {


  return (
    <>
      <div>
        <Header/>
         <Hero/>
         <WhyChooseCasaPro/>
         <HowItWorks/>
         <Newsletter/>
         <Footer/>
       </div>
    </>
  )
}

export default App
