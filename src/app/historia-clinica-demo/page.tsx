import type { Metadata } from "next";
import Link from "next/link";
import HistoriaDemoViewer from "@/components/historia/HistoriaDemoViewer";

export const metadata: Metadata = {
  title: "Historia clínica demo — XIMKA",
  description:
    "Recorrido demostrativo por una historia clínica en XIMKA, con datos ficticios.",
};

export default function HistoriaClinicaDemoPage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="bg-amber-100 border-b border-amber-300 text-amber-900 text-sm text-center px-6 py-2">
        <strong>Demostración comercial.</strong> Todos los datos son ficticios.
        No corresponde a un paciente real.
      </div>

      <section className="max-w-6xl mx-auto px-6 pt-14 pb-10 text-center">
        <span className="text-sm font-semibold text-teal-600 uppercase tracking-wide">
          Historia clínica · Demo
        </span>
        <h1 className="mt-3 text-3xl lg:text-5xl font-bold text-slate-900 leading-tight">
          Así se ve una historia clínica en XIMKA
        </h1>
        <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
          Recorre el flujo completo, desde la ficha del paciente hasta la
          trazabilidad. Los campos se adaptan a la especialidad de cada clínica.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <HistoriaDemoViewer />

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/casos"
            className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-400 text-slate-800 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Ver casos
          </Link>
          <Link
            href="/#contacto"
            className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Agenda una demo con tus procesos →
          </Link>
        </div>
      </section>
    </main>
  );
}
