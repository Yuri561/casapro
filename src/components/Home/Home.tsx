import React from 'react'
import Hero from '../Hero/Hero'
import WhyChooseCasaPro from '../WhyCasaPro/WhyChooseCasaPro'
import HowItWorks from '../HowItWorks/HowItWorks'
import Newsletter from '../Newsletter/Newsletter'

import { 
  PartnersLogos, 
  FeaturesSection, 
  StatsCounter, 
  Testimonials, 
  PricingPlans, 
  FAQSection, 


  TrustBadges, 

  ContactStrip 
} from '../HomeExtras/HomeExtras'

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      <main className="">
        <Hero />
        <PartnersLogos />
        <WhyChooseCasaPro />
        <FeaturesSection />
        <StatsCounter />
        <HowItWorks />
        <Testimonials />
        <PricingPlans />
        <FAQSection />
 

        <TrustBadges />
        <Newsletter />
        <ContactStrip />
      </main>
    </div>
  );
}

export default Home
