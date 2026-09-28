"use client";

import { useState } from "react";
import { Ban, Check, HeartPulse, Plus, Save, Stethoscope, TriangleAlert, Activity } from "lucide-react";
import {
  SISTEMAS_EXAMEN,
  SUGERENCIAS,
  type HallazgoExamen,
  type TomaSignos,
  type Valoracion,
} from "@/data/historia-demo";
import { siguienteId, useHistoria } from "./estado";
import {
  BotonPrimario,
  BotonSuave,
  CampoTexto,
  Dato,
  BotonOscuro,
  EtiquetaSinGuardar,
  PanelFormulario,
  Seccion,
  claseInput,
} from "./ui";

export function PasoEvaluacion() {
  return (
    <>
      <SeccionValoracion />
      <SeccionExamenFisico />
      <SeccionSignosVitales />
    </>
  );
}

// ── Valoración ───────────────────────────────────────────────────────────────

function SeccionValoracion() {
  const { s, sellada, aplicar } = useHistoria();
  const [campos, setCampos] = useState<Valoracion>(s.valoracion);
  const sucio = (Object.keys(campos) as (keyof Valoracion)[]).some(
    (k) => campos[k] !== s.valoracion[k],
  );
  const set = (k: keyof Valoracion) => (v: string) => setCampos((c) => ({ ...c, [k]: v }));

  return (
    <Seccion
      id="valoracion"
      titulo="Valoración clínica"
      icono={Stethoscope}
      descripcion="Motivo de consulta, enfermedad actual y revisión por sistemas."
      bloqueado={sellada}
    >
      <div className="space-y-4">
        <CampoTexto
          id="v-motivo"
          label="Motivo de consulta"
          valor={campos.motivoConsulta}
          onChange={set("motivoConsulta")}
          bloqueado={sellada}
          filas={2}
        />
        <CampoTexto
          id="v-enfermedad"
          label="Enfermedad actual"
          valor={campos.enfermedadActual}
          onChange={set("enfermedadActual")}
          bloqueado={sellada}
          filas={4}
        />
        <CampoTexto
          id="v-revision"
          label="Revisión por sistemas"
          valor={campos.revisionSistemas}
          onChange={set("revisionSistemas")}
          bloqueado={sellada}
          filas={4}
          sugerencia={SUGERENCIAS.revisionSistemas}
        />
      </div>

      {!sellada && (
        <div className="flex items-center gap-3 mt-4">
          <BotonPrimario
            disabled={!sucio}
            onClick={() =>
              aplicar(() => ({ valoracion: campos }), {
                accion: "Guardó la valoración",
                familia: "correccion",
              })
            }
          >
            <Save className="w-4 h-4" />
            Guardar valoración
          </BotonPrimario>
          {sucio && <EtiquetaSinGuardar />}
        </div>
      )}
    </Seccion>
  );
}

// ── Examen físico por sistemas ───────────────────────────────────────────────
// Un textarea confunde cuatro situaciones distintas: sistema no examinado,
// normal, con hallazgo y "se intentó y no se pudo". Aquí cada una tiene su color.

const HALLAZGO_UI: Record<HallazgoExamen, { icon: typeof Check; texto: string; clase: string }> = {
  normal: { icon: Check, texto: "Normal", clase: "bg-emerald-50 border-emerald-200 text-emerald-800" },
  anormal: { icon: TriangleAlert, texto: "Hallazgo", clase: "bg-rose-50 border-rose-200 text-rose-800" },
  no_evaluable: { icon: Ban, texto: "No evaluable", clase: "bg-amber-50 border-amber-200 text-amber-800" },
};

const etiquetaSistema = (clave: string) =>
  SISTEMAS_EXAMEN.find((x) => x.clave === clave)?.etiqueta ?? clave;

function SeccionExamenFisico() {
  const { s, sellada, aplicar } = useHistoria();
  const [abierto, setAbierto] = useState<string | null>(null);
  const [hallazgo, setHallazgo] = useState<HallazgoExamen>("normal");
  const [descripcion, setDescripcion] = useState("");

  const examinados = new Set(s.examen.map((e) => e.sistema));
  const pendientes = SISTEMAS_EXAMEN.filter((x) => !examinados.has(x.clave));
  const requiereDescripcion = hallazgo !== "normal" && !descripcion.trim();

  function abrir(clave: string) {
    setAbierto(clave);
    setHallazgo("normal");
    setDescripcion("");
  }

  function registrar() {
    if (!abierto || requiereDescripcion) return;
    const sistema = abierto;
    aplicar(
      (p) => ({ examen: [...p.examen, { sistema, hallazgo, descripcion: descripcion.trim() }] }),
      {
        accion: "Registró examen físico",
        detalle: `${etiquetaSistema(sistema)} · ${HALLAZGO_UI[hallazgo].texto}`,
        familia: "alta",
      },
    );
    setAbierto(null);
  }

  return (
    <Seccion
      id="examen"
      titulo="Examen físico por sistemas"
      icono={Activity}
      descripcion="Normal, con hallazgo o no evaluable: cada sistema queda con su resultado explícito."
      bloqueado={sellada}
      nota="Un sistema sin registro significa que nadie lo examinó; «no evaluable» significa que se intentó y no se pudo. Ninguno de los dos se confunde con «normal»."
    >
      <ul className="space-y-2">
        {s.examen.map((e) => {
          const ui = HALLAZGO_UI[e.hallazgo];
          const Icon = ui.icon;
          return (
            <li key={e.sistema} className={`rounded-xl border p-3 ${ui.clase}`}>
              <div className="flex items-start gap-2">
                <Icon className="w-4 h-4 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold">
                    {etiquetaSistema(e.sistema)}
                    <span className="ml-2 text-[11px] font-normal uppercase tracking-wide opacity-70">
                      {ui.texto}
                    </span>
                  </p>
                  {e.descripcion && <p className="text-sm mt-0.5 opacity-90">{e.descripcion}</p>}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {!sellada && abierto && (
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 mt-3 space-y-3">
          <p className="text-sm font-bold text-slate-900">{etiquetaSistema(abierto)}</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(HALLAZGO_UI) as HallazgoExamen[]).map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHallazgo(h)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
                  hallazgo === h ? HALLAZGO_UI[h].clase : "bg-white border-slate-200 text-slate-500"
                }`}
              >
                {HALLAZGO_UI[h].texto}
              </button>
            ))}
          </div>
          <textarea
            rows={2}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder={
              hallazgo === "normal"
                ? "Descripción (opcional)…"
                : hallazgo === "anormal"
                  ? "Describe el hallazgo (obligatorio)…"
                  : "Por qué no se pudo evaluar (obligatorio)…"
            }
            className={claseInput}
          />
          <div className="flex gap-2">
            <BotonPrimario onClick={registrar} disabled={requiereDescripcion}>
              <Save className="w-4 h-4" />
              Registrar
            </BotonPrimario>
            <BotonSuave onClick={() => setAbierto(null)}>Cancelar</BotonSuave>
          </div>
        </div>
      )}

      {!sellada && !abierto && pendientes.length > 0 && (
        <div className="mt-4">
          <p className="text-[11px] font-bold text-slate-500 mb-2">Sin examinar</p>
          <div className="flex flex-wrap gap-1.5">
            {pendientes.map((x) => (
              <button
                key={x.clave}
                type="button"
                onClick={() => abrir(x.clave)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-dashed border-slate-300 text-[11px] font-medium text-slate-500 hover:border-[#0FB888]/50 hover:text-[#0FB888] transition-colors"
              >
                <Plus className="w-3 h-3" />
                {x.etiqueta}
              </button>
            ))}
          </div>
        </div>
      )}
    </Seccion>
  );
}

// ── Signos vitales ───────────────────────────────────────────────────────────

/** El IMC se calcula al mostrar: guardarlo lo dejaría desfasado del peso y la talla. */
function imc(peso: number | null, talla: number | null): string | null {
  if (!peso || !talla) return null;
  return (peso / (talla * talla)).toFixed(1);
}

const METRICAS: { clave: keyof Omit<TomaSignos, "id" | "hora">; label: string; unidad: string; paso?: string }[] = [
  { clave: "paSistolica", label: "PA sistólica", unidad: "mmHg" },
  { clave: "paDiastolica", label: "PA diastólica", unidad: "mmHg" },
  { clave: "fc", label: "Frec. cardiaca", unidad: "lpm" },
  { clave: "fr", label: "Frec. respiratoria", unidad: "rpm" },
  { clave: "temperatura", label: "Temperatura", unidad: "°C", paso: "0.1" },
  { clave: "spo2", label: "Saturación", unidad: "%" },
  { clave: "peso", label: "Peso", unidad: "kg", paso: "0.1" },
  { clave: "talla", label: "Talla", unidad: "m", paso: "0.01" },
  { clave: "dolor", label: "Dolor", unidad: "/10" },
];

function SeccionSignosVitales() {
  const { s, sellada, aplicar } = useHistoria();
  const [abierto, setAbierto] = useState(false);
  const [borrador, setBorrador] = useState<Record<string, string>>({});

  function registrar() {
    const num = (k: string) => (borrador[k] ? Number(borrador[k]) : null);
    aplicar(
      (p, ahora) => ({
        signos: [
          ...p.signos,
          {
            id: siguienteId(p.signos),
            hora: ahora,
            paSistolica: num("paSistolica"),
            paDiastolica: num("paDiastolica"),
            fc: num("fc"),
            fr: num("fr"),
            temperatura: num("temperatura"),
            spo2: num("spo2"),
            peso: num("peso"),
            talla: num("talla"),
            dolor: num("dolor"),
          },
        ],
      }),
      { accion: "Registró toma de signos vitales", familia: "alta" },
    );
    setBorrador({});
    setAbierto(false);
  }

  return (
    <Seccion
      id="signos"
      titulo="Signos vitales"
      icono={HeartPulse}
      descripcion="Varias tomas por atención. Cada una queda con su hora y su responsable."
      bloqueado={sellada}
      nota="El IMC no se guarda: se calcula a partir del peso y la talla de la misma toma."
      acciones={
        !sellada && !abierto ? (
          <BotonOscuro onClick={() => setAbierto(true)}>
            <Plus className="w-3.5 h-3.5" />
            Nueva toma
          </BotonOscuro>
        ) : null
      }
    >
      {abierto && !sellada && (
        <PanelFormulario>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {METRICAS.map((m) => (
              <div key={m.clave}>
                <label
                  htmlFor={`sv-${m.clave}`}
                  className="text-[11px] font-bold text-slate-500"
                >
                  {m.label}
                </label>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <input
                    id={`sv-${m.clave}`}
                    type="number"
                    step={m.paso}
                    value={borrador[m.clave] ?? ""}
                    onChange={(e) => setBorrador((b) => ({ ...b, [m.clave]: e.target.value }))}
                    className="w-full text-sm border border-slate-200 bg-white rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-slate-400 text-slate-900"
                  />
                  <span className="text-[10px] text-slate-400 shrink-0">{m.unidad}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <BotonPrimario onClick={registrar}>
              <Save className="w-4 h-4" />
              Registrar toma
            </BotonPrimario>
            <BotonSuave onClick={() => setAbierto(false)}>Cancelar</BotonSuave>
          </div>
          <p className="text-[11px] text-slate-500">
            Lo que dejes en blanco queda vacío: no hereda el valor de la toma anterior.
          </p>
        </PanelFormulario>
      )}

      <div className="space-y-3">
        {s.signos.map((t) => (
          <article key={t.id} className="rounded-xl border border-slate-200 p-3.5">
            <p className="text-[11px] font-semibold text-slate-500 mb-2.5">{t.hora}</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              <Dato
                label="Presión arterial"
                valor={t.paSistolica && t.paDiastolica ? `${t.paSistolica}/${t.paDiastolica}` : null}
              />
              <Dato label="FC" valor={t.fc ? `${t.fc} lpm` : null} />
              <Dato label="FR" valor={t.fr ? `${t.fr} rpm` : null} />
              <Dato label="Temp." valor={t.temperatura ? `${t.temperatura} °C` : null} />
              <Dato label="SpO₂" valor={t.spo2 ? `${t.spo2} %` : null} />
              <Dato label="Peso" valor={t.peso ? `${t.peso} kg` : null} />
              <Dato label="Talla" valor={t.talla ? `${t.talla} m` : null} />
              <Dato label="IMC (calculado)" valor={imc(t.peso, t.talla)} />
              <Dato label="Dolor" valor={t.dolor !== null ? `${t.dolor}/10` : null} />
            </div>
          </article>
        ))}
      </div>
    </Seccion>
  );
}
