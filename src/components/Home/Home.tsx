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
  CallToActionBanner, 
  BlogPreview, 
  TrustBadges, 
  DemoVideo, 
  ContactStrip 
} from '../HomeExtras/HomeExtras'

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <PartnersLogos />
        <WhyChooseCasaPro />
        <FeaturesSection />
        <StatsCounter />
        <HowItWorks />
        <Testimonials />
        <DemoVideo />
        <PricingPlans />
        <FAQSection />
        <CallToActionBanner />
        <BlogPreview />
        <TrustBadges />
        <Newsletter />
        <ContactStrip />
      </main>
    </div>
  );
}

export default Home
