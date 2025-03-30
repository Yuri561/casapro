import React from 'react'
import Header from '../Header/Header'
import Hero from '../Hero/Hero'
import WhyChooseCasaPro from '../WhyCasaPro/WhyChooseCasaPro'
import HowItWorks from '../HowItWorks/HowItWorks'
import Newsletter from '../Newsletter/Newsletter'
import Footer from '../Footer/Footer'
// import Dashboard from '../Pages/Dashboard'
// import Table from '../Pages/Table'


const Home:React.FC = () => {
  return (
    <div>
        <Header/>
         <Hero/>
         <WhyChooseCasaPro/>
         <HowItWorks/>
         <Newsletter/>
         {/* <Dashboard/>
         <Table/> */}
         <Footer/>
    </div>
  )
}

export default Home