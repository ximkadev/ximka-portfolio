"use client";

import { BadgeCheck, BookOpenText, Check, History, RotateCcw } from "lucide-react";
import {
  ATENCION,
  ESTADO_HINT,
  ESTADO_LABEL,
  ORDEN_ESTADOS,
  PACIENTE,
  type EstadoHistoria,
} from "@/data/historia-demo";
import { useHistoria } from "./estado";

export const ESTADO_BADGE: Record<EstadoHistoria, string> = {
  borrador: "bg-amber-50 text-amber-700 border border-amber-200",
  firmada: "bg-[#cffff0]/70 text-slate-800 border border-[#9ef0d8]",
  cerrada: "bg-slate-100 text-slate-600 border border-slate-200",
};

export function BadgeIntegridad() {
  return (
    <span
      title="El contenido coincide con su sello interno de integridad."
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"
    >
      <BadgeCheck className="w-3 h-3" />
      Integridad verificada
    </span>
  );
}

export function CabeceraHistoria({ onHistorial }: { onHistorial: () => void }) {
  const { s, reiniciar } = useHistoria();
  const indiceActual = ORDEN_ESTADOS.indexOf(s.estado);
  const principal = s.diagnosticos.find((d) => d.rol === "principal");

  return (
    <div className="space-y-3">
      <header className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 flex items-center gap-4 flex-wrap">
        <div className="w-10 h-10 rounded-full bg-[#cffff0] text-slate-800 font-bold grid place-items-center shrink-0">
          PD
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpenText className="w-5 h-5 text-[#0FB888]" />
            Historia clínica
          </h2>
          <p className="text-xs text-slate-500 truncate">
            {PACIENTE.nombre} · {PACIENTE.documento} · {PACIENTE.edad} años · {PACIENTE.sexo}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span
            title={ESTADO_HINT[s.estado]}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${ESTADO_BADGE[s.estado]}`}
          >
            {ESTADO_LABEL[s.estado]}
          </span>
          {s.estado !== "borrador" && <BadgeIntegridad />}
          <button
            onClick={onHistorial}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold bg-white border border-slate-200 text-slate-700 hover:border-violet-300 hover:text-violet-700 transition-colors"
          >
            <History className="w-3.5 h-3.5" />
            Historial
          </button>
          <button
            onClick={reiniciar}
            title="Volver la demo a su estado inicial"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold bg-white border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>
      </header>

      {/* Contexto clínico de la atención. */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm px-5 py-3 space-y-2.5">
        <dl className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
          <Meta etiqueta="Responsable" valor={`${ATENCION.profesional} · ${ATENCION.cargo}`} />
          <Meta etiqueta="Sede" valor={ATENCION.sede} />
          <Meta etiqueta="Modalidad" valor={ATENCION.modalidad} />
          <Meta etiqueta="Inicio" valor={ATENCION.inicio} />
          <Meta
            etiqueta="Dx"
            valor={principal ? `${principal.cie.codigo} · ${principal.cie.titulo.toUpperCase()}` : "Sin diagnóstico principal"}
          />
        </dl>
        {/* La máquina de estados, visible: así "firmar" no se lee como un botón suelto. */}
        <ol className="flex items-center gap-1.5">
          {ORDEN_ESTADOS.map((e, i) => {
            const hecho = i < indiceActual;
            const actual = i === indiceActual;
            return (
              <li key={e} className="flex items-center gap-1.5">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    actual
                      ? ESTADO_BADGE[e]
                      : hecho
                        ? "bg-slate-100 text-slate-500 border border-slate-200"
                        : "bg-white text-slate-300 border border-dashed border-slate-200"
                  }`}
                >
                  {hecho && <Check className="w-2.5 h-2.5" />}
                  {ESTADO_LABEL[e]}
                </span>
                {i < ORDEN_ESTADOS.length - 1 && (
                  <span className={`w-4 h-px ${hecho ? "bg-slate-300" : "bg-slate-200"}`} />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function Meta({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="flex items-baseline gap-1.5 min-w-0">
      <dt className="text-[10px] uppercase tracking-wider text-slate-300 font-semibold shrink-0">
        {etiqueta}
      </dt>
      <dd className="font-medium text-slate-600 truncate">{valor}</dd>
    </div>
  );
}
