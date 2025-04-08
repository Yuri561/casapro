import React from 'react'
import Hero from '../Hero/Hero'
import WhyChooseCasaPro from '../WhyCasaPro/WhyChooseCasaPro'
import HowItWorks from '../HowItWorks/HowItWorks'
import Newsletter from '../Newsletter/Newsletter'

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <WhyChooseCasaPro />
        <HowItWorks />
        <Newsletter />
      </main>
    </div>
  );
}

export default Home;
