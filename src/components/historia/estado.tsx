"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import {
  ESTADO_INICIAL,
  hora,
  type EstadoDemo,
  type FamiliaCambio,
} from "@/data/historia-demo";

// Estado de la demo, en memoria. No hay backend: cada acción actualiza este
// objeto y deja una entrada en el historial de cambios, igual que lo haría la
// auditoría del sistema real.

interface HistoriaCtx {
  s: EstadoDemo;
  /** Verdadero desde la firma: el contenido clínico queda sellado. */
  sellada: boolean;
  /**
   * Aplica un cambio y lo registra en el historial. El reloj ficticio avanza un
   * minuto por acción para que el historial se lea en orden.
   */
  aplicar: (
    cambio: (s: EstadoDemo, ahora: string) => Partial<EstadoDemo>,
    registro: { accion: string; detalle?: string; familia: FamiliaCambio },
  ) => void;
  reiniciar: () => void;
  /** Cambia en cada reinicio: sirve de `key` para descartar formularios a medio llenar. */
  reinicios: number;
}

const Ctx = createContext<HistoriaCtx | null>(null);

export function HistoriaProvider({ children }: { children: ReactNode }) {
  const [s, setS] = useState<EstadoDemo>(ESTADO_INICIAL);
  const [reinicios, setReinicios] = useState(0);

  const aplicar: HistoriaCtx["aplicar"] = (cambio, registro) =>
    setS((prev) => {
      const minuto = prev.minuto + 1;
      const ahora = hora(minuto);
      return {
        ...prev,
        ...cambio(prev, ahora),
        minuto,
        historial: [
          ...prev.historial,
          { id: prev.historial.length + 1, hora: ahora, ...registro },
        ],
      };
    });

  return (
    <Ctx.Provider
      value={{
        s,
        sellada: s.estado !== "borrador",
        aplicar,
        reiniciar: () => {
          setS(ESTADO_INICIAL);
          setReinicios((n) => n + 1);
        },
        reinicios,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useHistoria(): HistoriaCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useHistoria debe usarse dentro de HistoriaProvider");
  return ctx;
}

/** Siguiente id libre de una lista. */
export function siguienteId(lista: { id: number }[]): number {
  return lista.reduce((max, x) => Math.max(max, x.id), 0) + 1;
}

/** Qué falta para poder firmar. Vacío = se puede firmar. */
export function faltantesFirma(s: EstadoDemo): string[] {
  const f: string[] = [];
  if (!s.valoracion.motivoConsulta.trim()) f.push("Motivo de consulta");
  if (!s.diagnosticos.some((d) => d.rol === "principal")) f.push("Diagnóstico principal");
  const evo = s.evolucion;
  if (!evo.narrativa.trim()) f.push("Evolución · Narrativa");
  if (!evo.hallazgos.trim()) f.push("Evolución · Hallazgos");
  if (!evo.intervencion.trim()) f.push("Evolución · Intervención");
  if (!evo.respuestaPaciente.trim()) f.push("Evolución · Respuesta del paciente");
  if (!evo.planConducta.trim()) f.push("Evolución · Plan / conducta");
  return f;
}
