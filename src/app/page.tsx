import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import WhatIsXimkaSection from "@/components/WhatIsXimkaSection";
import BenefitsSection from "@/components/BenefitsSection";
import ClientsSection from "@/components/ClientsSection";
import SecuritySection from "@/components/SecuritySection";
import CTASection from "@/components/CTASection";
import ExperienciasSection from "@/components/ExperienciasSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <WhatIsXimkaSection />
      <BenefitsSection />
      <ClientsSection />
      <ExperienciasSection />
      <SecuritySection />
      <CTASection />
    </main>
  );
}
