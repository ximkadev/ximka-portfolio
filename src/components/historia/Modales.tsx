"use client";

import { useState } from "react";
import { Clock, FilePlus2, FileSignature, TriangleAlert } from "lucide-react";
import { ATENCION, type FamiliaCambio } from "@/data/historia-demo";
import { faltantesFirma, siguienteId, useHistoria } from "./estado";
import { BotonGrande, BotonPrimario, BotonSuave, Modal, claseInput } from "./ui";

// ── Firma ────────────────────────────────────────────────────────────────────

export function FirmaModal({ abierto, onCerrar }: { abierto: boolean; onCerrar: () => void }) {
  const { s, aplicar } = useHistoria();
  const faltantes = faltantesFirma(s);

  function firmar() {
    aplicar((_, ahora) => ({ estado: "firmada", firmadaEn: ahora }), {
      accion: "Firmó la historia clínica",
      detalle: "Contenido sellado con sello interno de integridad",
      familia: "confirmacion",
    });
    onCerrar();
  }

  return (
    <Modal
      abierto={abierto}
      onCerrar={onCerrar}
      titulo="Firmar historia clínica"
      subtitulo="Después de firmar, el contenido no se edita"
      icono={FileSignature}
    >
      {faltantes.length > 0 ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
            <TriangleAlert className="w-4 h-4" />
            Faltan campos obligatorios para firmar
          </p>
          <ul className="mt-2 space-y-1 text-xs text-amber-800 list-disc pl-5">
            {faltantes.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="text-[11px] text-amber-700/80 mt-2">
            Tip: en «Evolución» puedes usar «Rellenar con ejemplo» y guardar el borrador.
          </p>
        </div>
      ) : (
        <p className="text-sm text-slate-600 leading-relaxed">
          Se sellará todo el contenido clínico de la atención. A partir de ahí, cualquier
          corrección se registra como adenda y queda en el historial de cambios.
        </p>
      )}
      <footer className="flex gap-3 mt-5">
        <BotonSuave onClick={onCerrar}>Cancelar</BotonSuave>
        <div className="flex-1" />
        <BotonGrande onClick={firmar} disabled={faltantes.length > 0}>
          <FileSignature className="w-4 h-4 text-[#cffff0]" />
          Firmar
        </BotonGrande>
      </footer>
    </Modal>
  );
}

// ── Adenda ───────────────────────────────────────────────────────────────────

export function AdendaModal({ abierto, onCerrar }: { abierto: boolean; onCerrar: () => void }) {
  const { aplicar } = useHistoria();
  const [motivo, setMotivo] = useState("");
  const [contenido, setContenido] = useState("");
  const valido = motivo.trim() && contenido.trim();

  function agregar() {
    if (!valido) return;
    const m = motivo.trim();
    const c = contenido.trim();
    aplicar(
      (p, ahora) => ({ adendas: [...p.adendas, { id: siguienteId(p.adendas), motivo: m, contenido: c, hora: ahora }] }),
      { accion: "Agregó adenda", detalle: m, familia: "adenda" },
    );
    setMotivo("");
    setContenido("");
    onCerrar();
  }

  return (
    <Modal
      abierto={abierto}
      onCerrar={onCerrar}
      titulo="Agregar adenda"
      subtitulo="Se añade al registro; no modifica lo ya sellado"
      icono={FilePlus2}
    >
      <div className="space-y-3">
        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="adenda-motivo" className="text-[11px] font-bold text-slate-500">
              Motivo
            </label>
            {!motivo && !contenido && (
              <button
                type="button"
                onClick={() => {
                  setMotivo("Resultado de laboratorio recibido después de la firma");
                  setContenido(
                    "Se recibe resultado de creatinina en suero dentro de rangos normales. Se mantiene el plan de manejo.",
                  );
                }}
                className="text-[10px] font-bold text-[#0FB888] hover:underline"
              >
                Usar ejemplo
              </button>
            )}
          </div>
          <input
            id="adenda-motivo"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Por qué se agrega esta corrección…"
            className={`${claseInput} mt-1`}
          />
        </div>
        <div>
          <label htmlFor="adenda-contenido" className="text-[11px] font-bold text-slate-500">
            Contenido
          </label>
          <textarea
            id="adenda-contenido"
            rows={5}
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            placeholder="Texto de la adenda…"
            className={`${claseInput} mt-1 resize-y`}
          />
        </div>
      </div>
      <footer className="flex gap-3 mt-5">
        <BotonSuave onClick={onCerrar}>Cancelar</BotonSuave>
        <div className="flex-1" />
        <BotonPrimario onClick={agregar} disabled={!valido}>
          Agregar adenda
        </BotonPrimario>
      </footer>
    </Modal>
  );
}

// ── Historial de cambios ─────────────────────────────────────────────────────

const ESTILO_FAMILIA: Record<FamiliaCambio, { pildora: string; texto: string }> = {
  alta: { pildora: "bg-emerald-50 text-emerald-700 border-emerald-200", texto: "Registro" },
  correccion: { pildora: "bg-violet-50 text-violet-700 border-violet-200", texto: "Edición" },
  confirmacion: { pildora: "bg-[#cffff0]/60 text-slate-700 border-[#9ef0d8]", texto: "Confirmación" },
  adenda: { pildora: "bg-amber-50 text-amber-700 border-amber-200", texto: "Adenda" },
  anulacion: { pildora: "bg-rose-50 text-rose-700 border-rose-200", texto: "Retiro" },
};

export function HistorialModal({ abierto, onCerrar }: { abierto: boolean; onCerrar: () => void }) {
  const { s } = useHistoria();
  const entradas = [...s.historial].reverse();

  return (
    <Modal
      abierto={abierto}
      onCerrar={onCerrar}
      titulo="Historial de cambios"
      subtitulo="Quién hizo qué y cuándo, en orden cronológico inverso"
      icono={Clock}
      ancho="max-w-xl"
    >
      <ol className="space-y-2.5">
        {entradas.map((e) => {
          const estilo = ESTILO_FAMILIA[e.familia];
          return (
            <li key={e.id} className="rounded-xl border border-slate-200 p-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2 py-0.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${estilo.pildora}`}>
                  {estilo.texto}
                </span>
                <p className="text-xs font-semibold text-slate-900">{e.accion}</p>
                <span className="text-[11px] text-slate-400 ml-auto">{e.hora}</span>
              </div>
              {e.detalle && <p className="text-[11px] text-slate-500 mt-1">{e.detalle}</p>}
              <p className="text-[10px] text-slate-400 mt-1">
                {ATENCION.profesional} · {ATENCION.cargo}
              </p>
            </li>
          );
        })}
      </ol>
    </Modal>
  );
}
