import { PreScreeningForm } from "@/components/forms/pre-screening/pre-screening-form";
import { Footer } from "@/components/layout/footer";
import { AboutSection } from "@/components/sections/about-section";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { ContactSection } from "@/components/sections/contact-section";
import { EligibilitySection } from "@/components/sections/eligibility-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LpaTestingSection } from "@/components/sections/lpa-testing-section";
import { MechanismOfAction } from "@/components/sections/mechanism-of-action";
import { MeetPiSection } from "@/components/sections/meet-pi-section";
import { StatisticsSection } from "@/components/sections/statistics-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ReferralBanner } from "@/components/shared/referral-banner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ReferralBanner />
      <TestimonialsSection />
      <MeetPiSection />
      <StatisticsSection />
      <LpaTestingSection />
      <AboutSection />
      <EligibilitySection />
      <MechanismOfAction />
      <BenefitsSection />
      <FaqSection />
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
