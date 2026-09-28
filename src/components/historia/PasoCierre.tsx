"use client";

import { useState } from "react";
import {
  CheckCircle2,
  FilePlus2,
  FileSignature,
  FileText,
  Lock,
  NotebookPen,
  Paperclip,
  Plus,
  Save,
  ShieldCheck,
} from "lucide-react";
import {
  ATENCION,
  ESTADO_HINT,
  ETIQUETA_EVOLUCION,
  SUGERENCIAS,
  type Evolucion,
} from "@/data/historia-demo";
import { BadgeIntegridad } from "./CabeceraHistoria";
import { siguienteId, useHistoria } from "./estado";
import {
  BotonGrande,
  BotonPrimario,
  BotonSuave,
  CampoTexto,
  Dato,
  EtiquetaSinGuardar,
  Seccion,
} from "./ui";

export function PasoCierre({
  onFirmar,
  onAdenda,
}: {
  onFirmar: () => void;
  onAdenda: () => void;
}) {
  return (
    <>
      <SeccionEvolucion />
      <SeccionAnexos />
      <SeccionFirma onFirmar={onFirmar} />
      <SeccionAdendas onAdenda={onAdenda} />
    </>
  );
}

// ── Evolución ────────────────────────────────────────────────────────────────

const ORDEN_EVOLUCION = Object.keys(ETIQUETA_EVOLUCION) as (keyof Evolucion)[];

function SeccionEvolucion() {
  const { s, sellada, aplicar } = useHistoria();
  const [campos, setCampos] = useState<Evolucion>(s.evolucion);
  const sucio = ORDEN_EVOLUCION.some((k) => campos[k] !== s.evolucion[k]);
  const faltan = ORDEN_EVOLUCION.some((k) => !campos[k].trim());

  function rellenarEjemplo() {
    setCampos((c) => ({
      ...c,
      hallazgos: c.hallazgos || SUGERENCIAS.hallazgos,
      intervencion: c.intervencion || SUGERENCIAS.intervencion,
      respuestaPaciente: c.respuestaPaciente || SUGERENCIAS.respuestaPaciente,
      planConducta: c.planConducta || SUGERENCIAS.planConducta,
    }));
  }

  return (
    <Seccion
      id="evolucion"
      titulo="Evolución"
      icono={NotebookPen}
      descripcion="La nota clínica de la atención. Sus cinco campos son requisito para firmar."
      bloqueado={sellada}
      nota="Al firmar, la evolución queda sellada: no se edita, y la única corrección posible es una adenda."
      acciones={
        !sellada && faltan ? <BotonSuave onClick={rellenarEjemplo}>Rellenar con ejemplo</BotonSuave> : null
      }
    >
      <div className="space-y-4">
        {ORDEN_EVOLUCION.map((k) => (
          <CampoTexto
            key={k}
            id={`evo-${k}`}
            label={ETIQUETA_EVOLUCION[k]}
            valor={campos[k]}
            onChange={(v) => setCampos((c) => ({ ...c, [k]: v }))}
            bloqueado={sellada}
            filas={k === "narrativa" ? 4 : 2}
          />
        ))}
      </div>

      {!sellada && (
        <div className="flex items-center gap-3 mt-4">
          <BotonPrimario
            disabled={!sucio}
            onClick={() =>
              aplicar(() => ({ evolucion: campos }), {
                accion: "Guardó borrador de la evolución",
                familia: "correccion",
              })
            }
          >
            <Save className="w-3.5 h-3.5" />
            Guardar borrador
          </BotonPrimario>
          {sucio && <EtiquetaSinGuardar />}
        </div>
      )}
    </Seccion>
  );
}

// ── Consentimientos y anexos ─────────────────────────────────────────────────

function SeccionAnexos() {
  const { s, aplicar } = useHistoria();

  function adjuntar() {
    aplicar(
      (p) => {
        const id = siguienteId(p.anexos);
        return {
          anexos: [
            ...p.anexos,
            { id, nombre: `Documento adjunto ${id}.pdf`, tipo: "documento", detalle: "Documento · 180 KB" },
          ],
        };
      },
      { accion: "Adjuntó un anexo", familia: "alta" },
    );
  }

  return (
    <Seccion
      id="anexos"
      titulo="Consentimientos y anexos"
      icono={Paperclip}
      descripcion="Lo que respalda la atención: consentimiento del paciente y documentos."
      nota="Los anexos no entran al sello: un consentimiento escaneado o un resultado externo se pueden adjuntar con la historia ya firmada."
      acciones={
        <BotonSuave onClick={adjuntar}>
          <Plus className="w-3.5 h-3.5" />
          Adjuntar
        </BotonSuave>
      }
    >
      <div className="space-y-2.5">
        {s.anexos.map((a) => (
          <div key={a.id} className="flex items-start gap-3 rounded-xl border border-slate-200 p-3">
            {a.tipo === "consentimiento" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-800 truncate">{a.nombre}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{a.detalle}</p>
            </div>
            {a.tipo === "consentimiento" && (
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                Aceptado
              </span>
            )}
          </div>
        ))}
      </div>
    </Seccion>
  );
}

// ── Firma y cierre ───────────────────────────────────────────────────────────

function SeccionFirma({ onFirmar }: { onFirmar: () => void }) {
  const { s, aplicar } = useHistoria();

  function cerrar() {
    aplicar((_, ahora) => ({ estado: "cerrada", cerradaEn: ahora }), {
      accion: "Cerró la atención",
      familia: "confirmacion",
    });
  }

  return (
    <Seccion
      id="firma"
      titulo="Firma y cierre"
      icono={ShieldCheck}
      descripcion={ESTADO_HINT[s.estado]}
    >
      {s.estado === "borrador" ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <p className="text-xs text-slate-700 leading-relaxed">
              Al firmar, el contenido clínico queda sellado con un{" "}
              <strong>sello interno de integridad</strong> y deja de ser editable.
            </p>
            <p className="text-[11px] text-slate-500 leading-relaxed mt-2">
              No es una firma digital certificada. Lo que garantiza es que cualquier alteración
              posterior del contenido se detecta.
            </p>
          </div>
          <BotonGrande onClick={onFirmar}>
            <FileSignature className="w-4 h-4 text-[#cffff0]" />
            Firmar historia clínica
          </BotonGrande>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 flex items-start gap-3">
            <BadgeIntegridad />
            <p className="text-xs text-slate-600">
              Firmada con sello interno de integridad {s.firmadaEn} por {ATENCION.profesional} (
              {ATENCION.cargo}).
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Dato label="Firmado por" valor={ATENCION.profesional} />
            <Dato label="Firmado" valor={s.firmadaEn} />
            <Dato label="Cerrado" valor={s.cerradaEn} />
          </div>
          {s.estado === "firmada" && (
            <div className="rounded-xl border border-[#9ef0d8] bg-[#cffff0]/25 p-4">
              <p className="text-xs text-slate-700 leading-relaxed mb-3">
                El contenido ya está sellado. Cerrar la atención la da por terminada.
              </p>
              <BotonGrande onClick={cerrar}>
                <Lock className="w-4 h-4 text-[#cffff0]" />
                Cerrar atención
              </BotonGrande>
            </div>
          )}
        </div>
      )}
    </Seccion>
  );
}

// ── Adendas ──────────────────────────────────────────────────────────────────

function SeccionAdendas({ onAdenda }: { onAdenda: () => void }) {
  const { s, sellada } = useHistoria();
  return (
    <Seccion
      id="adendas"
      titulo="Adendas"
      icono={FilePlus2}
      descripcion="La única corrección posible sobre contenido firmado. Se agregan, nunca se editan ni se borran."
      acciones={
        sellada ? (
          <BotonPrimario onClick={onAdenda}>
            <FilePlus2 className="w-3.5 h-3.5" />
            Agregar adenda
          </BotonPrimario>
        ) : null
      }
    >
      {s.adendas.length === 0 ? (
        <p className="text-xs text-slate-400">
          {sellada
            ? "Sin adendas. Cualquier corrección después de la firma se registra aquí."
            : "Disponible después de firmar: mientras la historia está en borrador se edita directamente."}
        </p>
      ) : (
        <ul className="space-y-3">
          {s.adendas.map((a) => (
            <li key={a.id} className="rounded-xl border border-slate-200/60 p-4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <p className="text-sm font-semibold text-slate-900">{ATENCION.profesional}</p>
                <span className="text-[11px] text-slate-500">{ATENCION.cargo}</span>
                <span className="text-[11px] text-slate-400 ml-auto">{a.hora}</span>
                <BadgeIntegridad />
              </div>
              <p className="text-xs text-slate-500 mb-1.5">
                <span className="font-semibold text-slate-600">Motivo:</span> {a.motivo}
              </p>
              <p className="text-sm text-slate-800 whitespace-pre-wrap bg-slate-50 rounded-xl p-3">
                {a.contenido}
              </p>
            </li>
          ))}
        </ul>
      )}
    </Seccion>
  );
}
