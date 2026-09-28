"use client";

import { ClipboardList } from "lucide-react";
import {
  ANTECEDENTES_PATOLOGICOS,
  CATEGORIAS_ANTECEDENTES,
  FACTORES_RIESGO,
} from "@/data/historia-demo";
import { useHistoria } from "./estado";
import { Seccion } from "./ui";

// Antecedentes POR SELECCIÓN: el profesional marca en vez de escribir, y así
// "Hipertensión" es siempre la misma cadena y se puede consultar después.
export function PasoAntecedentes() {
  const { s, sellada, aplicar } = useHistoria();

  function marcar(etiqueta: string) {
    if (sellada || s.antecedentes.includes(etiqueta)) return;
    aplicar((p) => ({ antecedentes: [...p.antecedentes, etiqueta] }), {
      accion: "Registró antecedente",
      detalle: etiqueta,
      familia: "alta",
    });
  }

  const chip = (etiqueta: string) => {
    const puesto = s.antecedentes.includes(etiqueta);
    return (
      <button
        key={etiqueta}
        type="button"
        disabled={sellada || puesto}
        onClick={() => marcar(etiqueta)}
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-medium transition-colors ${
          puesto
            ? "bg-emerald-50 border-emerald-200 text-emerald-700 cursor-default"
            : sellada
              ? "bg-white border-slate-200 text-slate-400 cursor-default"
              : "bg-white border-slate-200 text-slate-600 hover:border-[#0FB888]/50 hover:text-[#0FB888]"
        }`}
      >
        {puesto && <span aria-hidden>✓</span>}
        {etiqueta}
      </button>
    );
  };

  return (
    <Seccion
      id="antecedentes"
      titulo="Antecedentes personales"
      icono={ClipboardList}
      descripcion="Marca lo que aplique. Queda en el perfil del paciente, no solo en esta atención."
      bloqueado={sellada}
      nota="Los antecedentes pertenecen al paciente: lo que se registra hoy aparece en su próxima consulta sin volver a preguntarlo."
    >
      <div className="space-y-4">
        <div>
          <p className="text-[11px] font-bold text-slate-500 mb-2">Patológicos</p>
          <div className="flex flex-wrap gap-1.5">{ANTECEDENTES_PATOLOGICOS.map(chip)}</div>
        </div>

        <div>
          <p className="text-[11px] font-bold text-slate-500 mb-1">Factores de riesgo</p>
          <p className="text-[10px] text-slate-400 mb-2">
            Cambian la conducta durante la atención, no solo el historial.
          </p>
          <div className="flex flex-wrap gap-1.5">{FACTORES_RIESGO.map(chip)}</div>
        </div>

        <div>
          <p className="text-[11px] font-bold text-slate-500 mb-2">Otras categorías</p>
          <div className="flex flex-wrap gap-1.5">{CATEGORIAS_ANTECEDENTES.map(chip)}</div>
          <p className="text-[10px] text-slate-400 mt-1.5">
            Marcar una categoría deja constancia de que se indagó.
          </p>
        </div>

        <p className="text-[11px] text-slate-500">
          {s.antecedentes.length} antecedente{s.antecedentes.length === 1 ? "" : "s"} en el
          perfil.
        </p>
      </div>
    </Seccion>
  );
}
