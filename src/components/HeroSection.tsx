import Link from "next/link";
import BotonesDemo from "./BotonesDemo";
import VistaPreviaHistoria from "./VistaPreviaHistoria";

export default function HeroSection() {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(20,184,166,0.16),transparent_55%)]"
      />
      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 lg:pt-24 lg:pb-28 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-3.5 py-1 text-sm font-medium text-teal-200">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" aria-hidden />
            En uso en clínicas en Colombia
          </p>

          <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
            Gestión integral de tu clínica
            <span className="block text-teal-400">en un solo lugar.</span>
          </h1>

          <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl">
            Historia clínica, pacientes, procedimientos, inventario e información de tu negocio,
            centralizados en una sola plataforma.
          </p>

          <BotonesDemo className="mt-9" />
        </div>

        <figure className="min-w-0">
          <Link href="/historia-clinica-demo" aria-label="Abrir la historia clínica demo" className="block">
            <VistaPreviaHistoria />
          </Link>
          <figcaption className="mt-3 text-xs text-slate-400">
            Historia clínica de XIMKA con datos ficticios.{" "}
            <Link href="/historia-clinica-demo" className="text-teal-300 hover:underline">
              Pruébala
            </Link>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
