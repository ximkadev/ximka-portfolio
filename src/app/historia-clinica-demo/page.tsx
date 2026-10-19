import type { Metadata } from "next";
import Link from "next/link";
import HistoriaDemoViewer from "@/components/historia/HistoriaDemoViewer";
import { MAILTO_DEMO } from "@/config/contacto";

export const metadata: Metadata = {
  title: "Historia clínica demo",
  description:
    "Recorrido interactivo por la historia clínica de XIMKA, con datos ficticios.",
  alternates: { canonical: "/historia-clinica-demo" },
};

const capacidades = [
  "Antecedentes por selección",
  "Examen físico por sistemas",
  "Signos vitales con IMC",
  "Diagnósticos CIE-10",
  "Procedimientos CUPS",
  "Órdenes y resultados",
  "Eventos adversos",
  "Firma con sello de integridad",
  "Adendas",
  "Historial de cambios",
];

export default function HistoriaClinicaDemoPage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="bg-amber-100 border-b border-amber-300 text-amber-900 text-sm text-center px-6 py-2">
        <strong>Demostración comercial.</strong> Todos los datos son ficticios. No corresponde a
        un paciente real y nada de lo que hagas aquí se guarda.
      </div>

      <section className="max-w-6xl mx-auto px-6 pt-12 pb-8 text-center">
        <span className="text-sm font-semibold text-teal-600 uppercase tracking-wide">
          Historia clínica · Demo interactiva
        </span>
        <h1 className="mt-3 text-3xl lg:text-5xl font-bold text-slate-900 leading-tight">
          Así se diligencia una historia clínica en XIMKA
        </h1>
        <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
          Pruébala: marca antecedentes, registra signos vitales, agrega diagnósticos, firma la
          historia y corrige con una adenda. Cada acción queda en el historial de cambios.
        </p>
        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {capacidades.map((c) => (
            <li
              key={c}
              className="text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-full px-3 py-1"
            >
              {c}
            </li>
          ))}
        </ul>
      </section>

      <HistoriaDemoViewer />

      <section className="max-w-6xl mx-auto px-6 pt-6 pb-20 flex flex-wrap justify-center gap-4">
        <Link
          href="/casos"
          className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-400 text-slate-800 font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Ver casos
        </Link>
        <a
          href={MAILTO_DEMO}
          className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Solicita una demo con tus procesos →
        </a>
      </section>
    </main>
  );
}
