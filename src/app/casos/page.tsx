import type { Metadata } from "next";
import Link from "next/link";
import CasosExplorer from "@/components/casos/CasosExplorer";
import { casos } from "@/data/casos";

export const metadata: Metadata = {
  title: "Casos",
  description:
    "Clínicas que ya operan sobre XIMKA y escenarios demostrativos que muestran cómo se usaría en otras clínicas.",
  alternates: { canonical: "/casos" },
};

export default function CasosPage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <span className="text-sm font-semibold text-teal-300 uppercase tracking-wide">
            Casos
          </span>
          <h1 className="mt-3 text-3xl lg:text-5xl font-bold leading-tight">
            XIMKA en clínicas reales
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
            Mostramos por separado las clínicas que usan XIMKA en producción y
            los escenarios demostrativos. Un caso demostrativo explica cómo se
            usaría XIMKA. No es un cliente.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <span className="inline-flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-teal-400" />
              Cliente real · En producción
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-3 h-3 rounded-full border-2 border-dashed border-amber-400" />
              Caso demostrativo · No es un cliente
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <CasosExplorer casos={casos} />

        <div className="mt-16 text-center">
          <p className="text-slate-500 mb-4">
            ¿Quieres ver cómo se ve una historia clínica en XIMKA?
          </p>
          <Link
            href="/historia-clinica-demo"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Ver historia clínica demo →
          </Link>
        </div>
      </section>
    </main>
  );
}
