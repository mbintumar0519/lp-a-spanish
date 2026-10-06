import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import ReferralBanner from "./components/ReferralBanner";
import TestimonialsSection from "./components/TestimonialsSection";
import MechanismOfAction from "./components/MechanismOfAction";
import AboutSection from "./components/AboutSection";
import MeetPISection from "./components/MeetPISection";
import BenefitsSection from "./components/BenefitsSection";
import ContactSection from "./components/ContactSection";
import FAQSection from "./components/FAQSection";
import EligibilitySection from "./components/EligibilitySection";
import StatisticsSection from "./components/StatisticsSection";
import LpaTestingSection from "./components/LpaTestingSection";
import PreScreeningForm from "./components/PreScreenForm";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ReferralBanner />
      <TestimonialsSection />
      <MeetPISection />
      <StatisticsSection />
      <LpaTestingSection />
      <AboutSection />
      <EligibilitySection />
      <MechanismOfAction />
      <BenefitsSection />
      <FAQSection />
      <ContactSection />
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <PreScreeningForm layout="horizontal" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
