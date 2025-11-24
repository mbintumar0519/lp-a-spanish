import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import MechanismOfAction from "./components/MechanismOfAction";
import AboutSection from "./components/AboutSection";
import MeetPISection from "./components/MeetPISection";
import BenefitsSection from "./components/BenefitsSection";
import EnrollmentSection from "./components/EnrollmentSection";
import ContactSection from "./components/ContactSection";
import FloatingCTA from "./components/FloatingCTA";
import FAQSection from "./components/FAQSection";
import EligibilitySection from "./components/EligibilitySection";
import StatisticsSection from "./components/StatisticsSection";
import LpaTestingSection from "./components/LpaTestingSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatisticsSection />
      <LpaTestingSection />
      <AboutSection />
      <EligibilitySection />
      <MechanismOfAction />
      <MeetPISection />
      <BenefitsSection />
      <EnrollmentSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <FloatingCTA />
    </>
  );
}
