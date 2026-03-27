import Header from '@/components/header';
import Hero from '@/components/sections/hero';
import StatsSection from '@/components/sections/stats-section';
import AboutSection from '@/components/sections/about';
import Courses from '@/components/sections/courses';
import ServicesSection from '@/components/sections/services-section';
import WhyJoinSection from '@/components/sections/why-join-section';
import Advisor from '@/components/sections/advisor';
import ReferSection from '@/components/sections/refer-section';
import Partners from '@/components/sections/partners';
import CTASection from '@/components/sections/cta-section';
import ContactSection from '@/components/sections/contact';
import Footer from '@/components/footer';
import CareerPopup from '@/components/career-popup';

import AppShowcase from '@/components/sections/app-showcase';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <CareerPopup />
      <main className="flex-1">
        <Hero />
        <StatsSection />
        <AboutSection />
        <Courses isHomepage={true} />
        <ServicesSection />
        <WhyJoinSection />
        <Advisor />
        <ReferSection />
        <Partners />
        <AppShowcase />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
