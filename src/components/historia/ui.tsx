"use client";

import { useEffect, type ReactNode } from "react";
import { Lock, X, type LucideIcon } from "lucide-react";

// Piezas compartidas de la historia clínica demo. Mismo molde visual que la
// historia clínica del producto: tarjeta blanca, franja de encabezado gris con
// ícono, título y descripción, y notas al pie en su propia franja.

/** Marca un contenido bloqueado por la firma. */
export function PillSellado() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200">
      <Lock className="w-3 h-3" />
      Sellado
    </span>
  );
}

export function Seccion({
  id,
  titulo,
  icono: Icono,
  descripcion,
  bloqueado = false,
  acciones,
  nota,
  children,
  className = "",
}: {
  id: string;
  titulo: string;
  icono: LucideIcon;
  descripcion?: string;
  bloqueado?: boolean;
  acciones?: ReactNode;
  /** Nota al pie: por qué algo es como es. */
  nota?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col ${className}`}
    >
      <header className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-start gap-2.5 min-w-0">
          <Icono className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-slate-900">{titulo}</h3>
              {bloqueado && <PillSellado />}
            </div>
            {descripcion && (
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{descripcion}</p>
            )}
          </div>
        </div>
        {acciones && <div className="shrink-0">{acciones}</div>}
      </header>
      <div className="p-4 flex-1">{children}</div>
      {nota && (
        <p className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/50 text-[11px] text-slate-400 leading-relaxed">
          {nota}
        </p>
      )}
    </section>
  );
}

/** Par etiqueta/valor. Un valor vacío se pinta como raya, nunca como cero. */
export function Dato({ label, valor }: { label: string; valor: ReactNode }) {
  const vacio = valor === null || valor === undefined || valor === "";
  return (
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{label}</p>
      <p className={`text-sm mt-0.5 ${vacio ? "text-slate-300" : "text-slate-800 font-medium"}`}>
        {vacio ? "—" : valor}
      </p>
    </div>
  );
}

export function TextoClinico({ valor }: { valor: string }) {
  if (!valor.trim()) {
    return <p className="text-sm italic text-slate-400 bg-slate-50 rounded-xl p-3">Sin registro</p>;
  }
  return (
    <p className="text-sm text-slate-800 whitespace-pre-wrap bg-slate-50 rounded-xl p-3">{valor}</p>
  );
}

export function Vacio({ children }: { children: ReactNode }) {
  return <p className="text-xs text-slate-500 italic">{children}</p>;
}

/**
 * Campo de texto clínico. Bloqueado no pinta un textarea deshabilitado sino el
 * texto plano: un input gris invita a intentar escribir, y ya no se puede.
 */
export function CampoTexto({
  id,
  label,
  valor,
  onChange,
  bloqueado = false,
  filas = 3,
  sugerencia,
  placeholder,
}: {
  id: string;
  label: string;
  valor: string;
  onChange: (v: string) => void;
  bloqueado?: boolean;
  filas?: number;
  sugerencia?: string;
  placeholder?: string;
}) {
  if (bloqueado) {
    return (
      <div>
        <p className="text-[11px] font-bold text-slate-500 mb-1">{label}</p>
        <TextoClinico valor={valor} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1 gap-2">
        <label htmlFor={id} className="text-[11px] font-bold text-slate-500">
          {label}
        </label>
        {sugerencia && !valor.trim() && (
          <button
            type="button"
            onClick={() => onChange(sugerencia)}
            className="text-[10px] font-bold text-[#0FB888] hover:underline"
          >
            Usar ejemplo
          </button>
        )}
      </div>
      <textarea
        id={id}
        rows={filas}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? `${label}…`}
        className="w-full text-sm border border-slate-200 bg-white rounded-xl px-3 py-2 resize-y focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all text-slate-900 placeholder:text-slate-400"
      />
    </div>
  );
}

type PropsBoton = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

/** Acción principal de una sección: botón oscuro, como "Registrar resultado". */
export function BotonOscuro({ children, onClick, disabled }: PropsBoton) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      {children}
    </button>
  );
}

/** Guardar: verde menta. */
export function BotonPrimario({ children, onClick, disabled }: PropsBoton) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-800 bg-[#cffff0] border border-[#9ef0d8] rounded-xl hover:bg-[#b0f5e1] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {children}
    </button>
  );
}

export function BotonSuave({ children, onClick, disabled }: PropsBoton) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {children}
    </button>
  );
}

/** Botón grande de acción irreversible (firmar, cerrar, emitir). */
export function BotonGrande({ children, onClick, disabled }: PropsBoton) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-slate-950 rounded-xl hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      {children}
    </button>
  );
}

export function EtiquetaSinGuardar() {
  return (
    <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-1 rounded-full">
      Cambios sin guardar
    </span>
  );
}

export const claseInput =
  "w-full text-sm border border-slate-200 bg-white rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-slate-400 text-slate-900 placeholder:text-slate-400";

export const claseSelect =
  "px-2.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-400";

/** Formulario desplegado dentro de una sección. */
export function PanelFormulario({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 mb-4 space-y-3">{children}</div>;
}

export function Modal({
  abierto,
  onCerrar,
  titulo,
  subtitulo,
  icono: Icono,
  ancho = "max-w-lg",
  children,
}: {
  abierto: boolean;
  onCerrar: () => void;
  titulo: string;
  subtitulo?: string;
  icono: LucideIcon;
  ancho?: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCerrar();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [abierto, onCerrar]);

  if (!abierto) return null;
  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={onCerrar}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        className={`bg-white rounded-2xl shadow-xl w-full ${ancho} max-h-[85vh] overflow-y-auto p-6`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-full bg-[#cffff0] grid place-items-center shrink-0">
            <Icono className="w-5 h-5 text-[#0FB888]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900">{titulo}</h3>
            {subtitulo && <p className="text-xs text-slate-500">{subtitulo}</p>}
          </div>
          <button onClick={onCerrar} aria-label="Cerrar" className="text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </header>
        {children}
      </div>
    </div>
  );
}
