import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import FeaturesSection from "@/components/FeaturesSection";
import RolesSection from "@/components/RolesSection";
import StatsPreviewSection from "@/components/StatsPreviewSection";
import ClientsSection from "@/components/ClientsSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <RolesSection />
      <StatsPreviewSection />
      <ClientsSection />
      <CTASection />
    </main>
  );
}
