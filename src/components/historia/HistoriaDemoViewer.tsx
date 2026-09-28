"use client";

import { useState } from "react";
import { Check, ClipboardList, FileCheck, Stethoscope, type LucideIcon } from "lucide-react";
import type { EstadoDemo } from "@/data/historia-demo";
import { CabeceraHistoria } from "./CabeceraHistoria";
import { HistoriaProvider, useHistoria } from "./estado";
import { AdendaModal, FirmaModal, HistorialModal } from "./Modales";
import { PasoAntecedentes } from "./PasoAntecedentes";
import { PasoCierre } from "./PasoCierre";
import { PasoEvaluacion } from "./PasoEvaluacion";
import { PasoProcedimientos } from "./PasoProcedimientos";

/**
 * La historia repartida en el orden en que se atiende: se explora primero y se
 * diagnostica después. El riel es un índice, no un asistente: todos los pasos
 * están siempre alcanzables, porque la atención real no siempre sigue el orden.
 */
const PASOS: {
  titulo: string;
  sub: string;
  icono: LucideIcon;
  completo: (s: EstadoDemo) => boolean;
}[] = [
  {
    titulo: "Antecedentes",
    sub: "Qué trae el paciente. Queda en su perfil, no solo en esta atención.",
    icono: ClipboardList,
    completo: (s) => s.antecedentes.length > 0,
  },
  {
    titulo: "Evaluación clínica",
    sub: "Motivo, enfermedad actual, revisión por sistemas, examen físico y signos vitales.",
    icono: Stethoscope,
    completo: (s) =>
      !!s.valoracion.motivoConsulta.trim() && s.examen.length > 0 && s.signos.length > 0,
  },
  {
    titulo: "Procedimientos y cierre",
    sub: "Registro de diagnósticos, intervenciones, órdenes, resultados y cierre del encuentro clínico.",
    icono: FileCheck,
    completo: (s) => s.estado !== "borrador",
  },
];

export default function HistoriaDemoViewer() {
  return (
    <HistoriaProvider>
      <Contenido />
    </HistoriaProvider>
  );
}

function Contenido() {
  const { s, reinicios } = useHistoria();
  const [paso, setPaso] = useState(0);
  const [modal, setModal] = useState<"firma" | "adenda" | "historial" | null>(null);
  const cerrarModal = () => setModal(null);

  function ir(n: number) {
    setPaso(n);
    document.getElementById("registro-clinico")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const actual = PASOS[paso];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-5">
      <CabeceraHistoria onHistorial={() => setModal("historial")} />

      <div id="registro-clinico" className="scroll-mt-20 flex gap-6 items-start">
        {/* Riel de pasos. Se oculta bajo `lg`: en pantallas estrechas un riel
            vertical se come el formulario, y ahí el progreso lo comunica la
            cabecera del paso. */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-20">
          <div className="bg-white rounded-2xl border border-[#9ef0d8]/60 shadow-sm p-5">
            <h2 className="text-base font-bold text-slate-900">Registro clínico</h2>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              Los pasos pueden diligenciarse en cualquier orden.
            </p>
            <ol className="relative">
              {PASOS.map((p, i) => {
                const activo = i === paso;
                const hecho = p.completo(s);
                const Icono = p.icono;
                return (
                  <li key={p.titulo} className="relative pb-6 last:pb-0">
                    {i < PASOS.length - 1 && (
                      <span
                        aria-hidden
                        className={`absolute left-[15px] top-8 bottom-0 w-px ${hecho ? "bg-[#0FB888]" : "bg-slate-200"}`}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => ir(i)}
                      aria-current={activo ? "step" : undefined}
                      className="relative flex items-start gap-3 w-full text-left rounded-xl"
                    >
                      <span
                        className={`relative z-10 shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 transition-colors ${
                          hecho
                            ? "bg-[#0FB888] border-[#0FB888] text-white"
                            : activo
                              ? "bg-white border-[#0FB888] text-[#0FB888]"
                              : "bg-white border-slate-200 text-slate-400"
                        }`}
                      >
                        {hecho ? <Check className="w-4 h-4" /> : i + 1}
                      </span>
                      <span className="pt-0.5 min-w-0">
                        <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Paso {i + 1}
                        </span>
                        <span
                          className={`flex items-center gap-1.5 text-sm font-bold mt-0.5 ${
                            activo ? "text-slate-900" : "text-slate-500"
                          }`}
                        >
                          <Icono className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{p.titulo}</span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </aside>

        <div key={reinicios} className="flex-1 min-w-0 space-y-4">
          <div className="rounded-2xl bg-gradient-to-r from-[#0b8f6b] to-[#0FB888] px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/70 lg:hidden">
              Paso {paso + 1} de {PASOS.length}
            </p>
            <h2 className="text-base font-bold text-white">{actual.titulo}</h2>
            <p className="text-xs text-white/80 mt-0.5">{actual.sub}</p>
          </div>

          <Navegacion paso={paso} ir={ir} />

          {paso === 0 && <PasoAntecedentes />}
          {paso === 1 && <PasoEvaluacion />}
          {paso === 2 && (
            <>
              <PasoProcedimientos />
              <PasoCierre onFirmar={() => setModal("firma")} onAdenda={() => setModal("adenda")} />
            </>
          )}

          <Navegacion paso={paso} ir={ir} />
        </div>
      </div>

      <FirmaModal abierto={modal === "firma"} onCerrar={cerrarModal} />
      <AdendaModal abierto={modal === "adenda"} onCerrar={cerrarModal} />
      <HistorialModal abierto={modal === "historial"} onCerrar={cerrarModal} />
    </div>
  );
}

function Navegacion({ paso, ir }: { paso: number; ir: (n: number) => void }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <button
        type="button"
        onClick={() => ir(Math.max(0, paso - 1))}
        disabled={paso === 0}
        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        ← Anterior
      </button>
      <button
        type="button"
        onClick={() => ir(Math.min(PASOS.length - 1, paso + 1))}
        disabled={paso === PASOS.length - 1}
        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
      >
        Siguiente →
      </button>
    </div>
  );
}
