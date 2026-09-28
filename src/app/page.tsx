import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import CentralizacionSection from "@/components/CentralizacionSection";
import ProductoSection from "@/components/ProductoSection";
import VozSection from "@/components/VozSection";
import DemoSection from "@/components/DemoSection";
import ClientsSection from "@/components/ClientsSection";
import TestimoniosSection from "@/components/TestimoniosSection";
import SecuritySection from "@/components/SecuritySection";
import FoundersSection from "@/components/FoundersSection";

// Narrativa: qué resuelve (problema → solución), cómo funciona (producto, voz,
// demo), por qué confiar (clientes, tecnología, founders) y cómo pedir una demo.
export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <CentralizacionSection />
      <ProductoSection />
      <VozSection />
      <DemoSection />
      <ClientsSection />
      <TestimoniosSection />
      <SecuritySection />
      <FoundersSection />
    </main>
  );
}
