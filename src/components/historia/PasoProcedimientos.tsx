"use client";

import { useState } from "react";
import {
  ClipboardCheck,
  ClipboardList,
  ClipboardPlus,
  FilePen,
  FlaskConical,
  Plus,
  Save,
  Scissors,
  Search,
  ShieldAlert,
  Siren,
  Trash2,
  TriangleAlert,
  X,
} from "lucide-react";
import {
  CATALOGO_CIE10,
  CUMPLIMIENTO_LABEL,
  MOMENTOS_EVENTO,
  SEVERIDADES_EVENTO,
  SUGERENCIAS,
  TIPOS_DIAGNOSTICO,
  TIPOS_EVENTO,
  TIPO_ORDEN_LABEL,
  type CodigoCie,
  type Cumplimiento,
  type PlanManejo,
  type Prioridad,
  type TipoDiagnostico,
  type TipoOrden,
} from "@/data/historia-demo";
import { siguienteId, useHistoria } from "./estado";
import {
  BotonGrande,
  BotonOscuro,
  BotonPrimario,
  BotonSuave,
  CampoTexto,
  Dato,
  EtiquetaSinGuardar,
  PanelFormulario,
  Seccion,
  Vacio,
  claseInput,
  claseSelect,
} from "./ui";

export function PasoProcedimientos() {
  return (
    <>
      <SeccionDiagnosticos />
      <SeccionPlanManejo />
      <SeccionProcedimientos />
      <div className="grid gap-4 lg:grid-cols-2 items-start">
        <SeccionOrdenes />
        <SeccionResultados />
      </div>
      <SeccionOrdenClinica />
      <SeccionEventosAdversos />
    </>
  );
}

// ── Diagnósticos ─────────────────────────────────────────────────────────────

function SeccionDiagnosticos() {
  const { s, sellada, aplicar } = useHistoria();
  const [buscando, setBuscando] = useState(false);
  const [q, setQ] = useState("");
  const [tipo, setTipo] = useState<TipoDiagnostico>("Impresión diagnóstica");

  const principal = s.diagnosticos.find((d) => d.rol === "principal");
  const ordenados = [...s.diagnosticos].sort(
    (a, b) => Number(b.rol === "principal") - Number(a.rol === "principal"),
  );
  const usados = new Set(s.diagnosticos.map((d) => d.cie.codigo));
  const termino = q.trim().toLowerCase();
  const sugerencias = CATALOGO_CIE10.filter(
    (c) =>
      !usados.has(c.codigo) &&
      (!termino || c.codigo.toLowerCase().includes(termino) || c.titulo.toLowerCase().includes(termino)),
  ).slice(0, 6);

  function agregar(cie: CodigoCie) {
    const rol = principal ? "secundario" : "principal";
    aplicar(
      (p) => ({ diagnosticos: [...p.diagnosticos, { id: siguienteId(p.diagnosticos), cie, rol, tipo }] }),
      { accion: `Agregó diagnóstico ${rol}`, detalle: `${cie.codigo} · ${cie.titulo}`, familia: "alta" },
    );
    setQ("");
    setBuscando(false);
  }

  function quitar(id: number) {
    const d = s.diagnosticos.find((x) => x.id === id);
    aplicar(
      (p) => {
        const resto = p.diagnosticos.filter((x) => x.id !== id);
        // Si se retira el principal, el primer secundario pasa a ser principal.
        if (d?.rol === "principal" && resto.length > 0) resto[0] = { ...resto[0], rol: "principal" };
        return { diagnosticos: resto };
      },
      { accion: "Retiró diagnóstico", detalle: d?.cie.codigo, familia: "anulacion" },
    );
  }

  return (
    <Seccion
      id="diagnosticos"
      titulo="Diagnósticos"
      icono={ClipboardCheck}
      descripcion="Uno principal y los secundarios que apliquen, codificados en CIE-10. El principal es requisito para firmar."
      bloqueado={sellada}
      acciones={
        !sellada && !buscando ? (
          <BotonOscuro onClick={() => setBuscando(true)}>
            <Plus className="w-3.5 h-3.5" />
            Agregar diagnóstico
          </BotonOscuro>
        ) : null
      }
    >
      {buscando && !sellada && (
        <PanelFormulario>
          <div className="flex gap-2 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar en CIE-10 por nombre o código…"
                aria-label="Buscar diagnóstico"
                className={`${claseInput} pl-9 pr-9`}
              />
              <button
                onClick={() => {
                  setBuscando(false);
                  setQ("");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Cerrar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as TipoDiagnostico)}
              aria-label="Tipo de diagnóstico"
              className={claseSelect}
            >
              {TIPOS_DIAGNOSTICO.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <ul className="space-y-1">
            {sugerencias.map((c) => (
              <li key={c.codigo}>
                <button
                  onClick={() => agregar(c)}
                  className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white transition-colors"
                >
                  <span className="font-mono text-[11px] font-bold text-slate-900 shrink-0">{c.codigo}</span>
                  <span className="text-xs text-slate-600 truncate">{c.titulo}</span>
                </button>
              </li>
            ))}
          </ul>
          {sugerencias.length === 0 && <p className="text-[11px] text-slate-400 px-3">Sin coincidencias.</p>}
        </PanelFormulario>
      )}

      {ordenados.length === 0 ? (
        <Vacio>Sin diagnósticos registrados.</Vacio>
      ) : (
        <div className="space-y-2">
          {ordenados.map((d) => (
            <div key={d.id} className="flex items-start gap-3 rounded-xl border border-slate-200 p-3">
              <span
                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                  d.rol === "principal"
                    ? "bg-[#cffff0]/70 text-slate-800 border border-[#9ef0d8]"
                    : "bg-slate-50 text-slate-500 border border-slate-200"
                }`}
              >
                {d.rol}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-800">
                  <span className="font-mono text-slate-900">{d.cie.codigo}</span> · {d.cie.titulo}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">{d.tipo}</p>
              </div>
              {!sellada && (
                <button
                  onClick={() => quitar(d.id)}
                  className="text-slate-300 hover:text-rose-600 transition-colors shrink-0"
                  aria-label={`Quitar ${d.cie.codigo}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </Seccion>
  );
}

// ── Plan de manejo ───────────────────────────────────────────────────────────

function SeccionPlanManejo() {
  const { s, sellada, aplicar } = useHistoria();
  const [campos, setCampos] = useState<PlanManejo>(s.plan);
  const sucio = (Object.keys(campos) as (keyof PlanManejo)[]).some((k) => campos[k] !== s.plan[k]);
  const set = (k: keyof PlanManejo) => (v: string) => setCampos((c) => ({ ...c, [k]: v }));

  return (
    <Seccion
      id="plan"
      titulo="Plan de manejo"
      icono={ClipboardPlus}
      descripcion="Recomendaciones, educación al paciente, próximo control y remisión."
      bloqueado={sellada}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <CampoTexto
          id="p-recomendaciones"
          label="Recomendaciones"
          valor={campos.recomendaciones}
          onChange={set("recomendaciones")}
          bloqueado={sellada}
          sugerencia={SUGERENCIAS.recomendaciones}
        />
        <CampoTexto
          id="p-educacion"
          label="Educación al paciente"
          valor={campos.educacionPaciente}
          onChange={set("educacionPaciente")}
          bloqueado={sellada}
          sugerencia={SUGERENCIAS.educacionPaciente}
        />
        <CampoTexto
          id="p-control"
          label="Próximo control"
          valor={campos.proximoControl}
          onChange={set("proximoControl")}
          bloqueado={sellada}
          filas={2}
          sugerencia={SUGERENCIAS.proximoControl}
        />
        <CampoTexto
          id="p-remision"
          label="Remisión"
          valor={campos.remision}
          onChange={set("remision")}
          bloqueado={sellada}
          filas={2}
          placeholder="Sin remisión…"
        />
      </div>

      {!sellada && (
        <div className="flex items-center gap-3 mt-4">
          <BotonPrimario
            disabled={!sucio}
            onClick={() =>
              aplicar(() => ({ plan: campos }), { accion: "Guardó el plan de manejo", familia: "correccion" })
            }
          >
            <Save className="w-3.5 h-3.5" />
            Guardar plan
          </BotonPrimario>
          {sucio && <EtiquetaSinGuardar />}
        </div>
      )}
    </Seccion>
  );
}

// ── Procedimientos ───────────────────────────────────────────────────────────

function SeccionProcedimientos() {
  const { s, sellada } = useHistoria();
  return (
    <Seccion
      id="procedimientos"
      titulo="Procedimientos"
      icono={Scissors}
      descripcion="Registro de procedimientos realizados. La fecha de realización se requiere para el cierre del encuentro."
      bloqueado={sellada}
    >
      {s.procedimientos.length === 0 ? (
        <Vacio>Sin procedimientos registrados.</Vacio>
      ) : (
        <div className="space-y-2">
          {s.procedimientos.map((p) => (
            <div key={p.id} className="rounded-xl border border-slate-200 p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-800">{p.descripcion}</p>
                  <p className="text-[11px] text-slate-400">CUPS {p.cups}</p>
                </div>
                <span className="font-mono text-[11px] font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-lg shrink-0">
                  {p.cups}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-100">
                <Dato label="Cantidad" valor={p.cantidad} />
                <Dato label="Realizado" valor={p.hora} />
              </div>
            </div>
          ))}
        </div>
      )}
    </Seccion>
  );
}

// ── Órdenes ──────────────────────────────────────────────────────────────────

function SeccionOrdenes() {
  const { s, sellada, aplicar } = useHistoria();
  const [abierto, setAbierto] = useState(false);
  const [tipo, setTipo] = useState<TipoOrden>("laboratorio");
  const [prioridad, setPrioridad] = useState<Prioridad>("rutinaria");
  const [descripcion, setDescripcion] = useState("");

  function crear() {
    const texto = descripcion.trim();
    if (!texto) return;
    aplicar(
      (p, ahora) => {
        const id = siguienteId(p.ordenes);
        return {
          ordenes: [
            ...p.ordenes,
            {
              id,
              tipo,
              descripcion: texto,
              codigo: `INTERNO ${String(200 + id * 37).padStart(6, "0")}`,
              prioridad,
              cumplimiento: "pendiente",
              hora: ahora,
            },
          ],
        };
      },
      { accion: "Creó orden", detalle: `${TIPO_ORDEN_LABEL[tipo]} · ${texto}`, familia: "alta" },
    );
    setDescripcion("");
    setAbierto(false);
  }

  function cumplimiento(id: number, valor: Cumplimiento) {
    const o = s.ordenes.find((x) => x.id === id);
    aplicar((p) => ({ ordenes: p.ordenes.map((x) => (x.id === id ? { ...x, cumplimiento: valor } : x)) }), {
      accion: "Registró cumplimiento de orden",
      detalle: `${o?.descripcion} · ${CUMPLIMIENTO_LABEL[valor]}`,
      familia: "confirmacion",
    });
  }

  return (
    <Seccion
      id="ordenes"
      titulo="Órdenes"
      icono={ClipboardList}
      descripcion={
        sellada
          ? "Encuentro firmado: la orden no admite modificación; su cumplimiento sí se registra."
          : "Lo que se solicita en esta atención."
      }
      acciones={
        !sellada && !abierto ? (
          <BotonOscuro onClick={() => setAbierto(true)}>
            <Plus className="w-3.5 h-3.5" />
            Nueva orden
          </BotonOscuro>
        ) : null
      }
      nota="La orden es contenido de la historia clínica y queda sellada con la firma. El cumplimiento no: se ejecuta con posterioridad y su registro no modifica lo ordenado."
    >
      {abierto && !sellada && (
        <PanelFormulario>
          <div className="grid grid-cols-2 gap-2">
            <select value={tipo} onChange={(e) => setTipo(e.target.value as TipoOrden)} aria-label="Tipo de orden" className={claseSelect}>
              {(Object.keys(TIPO_ORDEN_LABEL) as TipoOrden[]).map((t) => (
                <option key={t} value={t}>
                  {TIPO_ORDEN_LABEL[t]}
                </option>
              ))}
            </select>
            <select value={prioridad} onChange={(e) => setPrioridad(e.target.value as Prioridad)} aria-label="Prioridad" className={claseSelect}>
              <option value="rutinaria">Rutinaria</option>
              <option value="urgente">Urgente</option>
            </select>
          </div>
          <input
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción de la orden… (ej. Hemograma)"
            aria-label="Descripción de la orden"
            className={claseInput}
          />
          <div className="flex gap-2">
            <BotonPrimario onClick={crear} disabled={!descripcion.trim()}>
              Crear orden
            </BotonPrimario>
            <BotonSuave onClick={() => setAbierto(false)}>Cancelar</BotonSuave>
          </div>
        </PanelFormulario>
      )}

      {s.ordenes.length === 0 ? (
        <Vacio>Sin órdenes en esta atención.</Vacio>
      ) : (
        <ul className="divide-y divide-slate-100 -my-1">
          {s.ordenes.map((o) => (
            <li key={o.id} className="py-3 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {TIPO_ORDEN_LABEL[o.tipo]}
                  </span>
                  {o.prioridad === "urgente" && (
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      Urgente
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">{o.descripcion}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{o.codigo}</p>
              </div>
              <select
                value={o.cumplimiento}
                onChange={(e) => cumplimiento(o.id, e.target.value as Cumplimiento)}
                aria-label={`Cumplimiento de ${o.descripcion}`}
                className={`${claseSelect} shrink-0`}
              >
                {(Object.keys(CUMPLIMIENTO_LABEL) as Cumplimiento[]).map((c) => (
                  <option key={c} value={c}>
                    {CUMPLIMIENTO_LABEL[c]}
                  </option>
                ))}
              </select>
            </li>
          ))}
        </ul>
      )}
    </Seccion>
  );
}

// ── Resultados del paciente ──────────────────────────────────────────────────

function SeccionResultados() {
  const { s, aplicar } = useHistoria();
  const [abierto, setAbierto] = useState(false);
  const [examen, setExamen] = useState("");
  const [informe, setInforme] = useState("");
  const [alterado, setAlterado] = useState(false);

  function registrar() {
    if (!examen.trim() || !informe.trim()) return;
    const e = examen.trim();
    const i = informe.trim();
    aplicar(
      (p, ahora) => ({
        resultados: [...p.resultados, { id: siguienteId(p.resultados), examen: e, informe: i, alterado, hora: ahora }],
      }),
      { accion: "Registró resultado", detalle: e, familia: "alta" },
    );
    setExamen("");
    setInforme("");
    setAlterado(false);
    setAbierto(false);
  }

  return (
    <Seccion
      id="resultados"
      titulo="Resultados del paciente"
      icono={FlaskConical}
      descripcion="Historial completo de resultados del paciente, no limitado a esta atención."
      acciones={
        !abierto ? (
          <BotonOscuro onClick={() => setAbierto(true)}>
            <Plus className="w-3.5 h-3.5" />
            Registrar resultado
          </BotonOscuro>
        ) : null
      }
    >
      {abierto && (
        <PanelFormulario>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">Nuevo resultado</span>
            {!examen && !informe && (
              <button
                type="button"
                onClick={() => {
                  setExamen("Creatinina en suero");
                  setInforme("Creatinina 0.9 mg/dL. Dentro de rangos de referencia.");
                }}
                className="text-[10px] font-bold text-[#0FB888] hover:underline"
              >
                Usar ejemplo
              </button>
            )}
          </div>
          <input value={examen} onChange={(e) => setExamen(e.target.value)} placeholder="Examen…" aria-label="Examen" className={claseInput} />
          <textarea rows={2} value={informe} onChange={(e) => setInforme(e.target.value)} placeholder="Informe…" aria-label="Informe" className={claseInput} />
          <label className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
            <input type="checkbox" checked={alterado} onChange={(e) => setAlterado(e.target.checked)} className="w-3.5 h-3.5 rounded border-slate-300" />
            Marcar como alterado
          </label>
          <div className="flex gap-2">
            <BotonPrimario onClick={registrar} disabled={!examen.trim() || !informe.trim()}>
              Registrar
            </BotonPrimario>
            <BotonSuave onClick={() => setAbierto(false)}>Cancelar</BotonSuave>
          </div>
        </PanelFormulario>
      )}

      {s.resultados.length === 0 ? (
        <p className="py-4 text-center text-xs text-slate-400">Sin resultados registrados para este paciente.</p>
      ) : (
        <ul className="space-y-2.5">
          {[...s.resultados].reverse().map((r) => (
            <li key={r.id} className="rounded-xl border border-slate-200 p-3">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-xs font-bold text-slate-800">{r.examen}</p>
                {r.alterado && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                    <TriangleAlert className="w-2.5 h-2.5" />
                    Alterado
                  </span>
                )}
                <span className="text-[10px] text-slate-400 ml-auto">{r.hora}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 rounded-lg p-2.5 mt-2">{r.informe}</p>
            </li>
          ))}
        </ul>
      )}
    </Seccion>
  );
}

// ── Orden clínica ────────────────────────────────────────────────────────────

function SeccionOrdenClinica() {
  const { s, aplicar } = useHistoria();
  const [ordenId, setOrdenId] = useState<number | null>(s.ordenes[0]?.id ?? null);
  const [indicacion, setIndicacion] = useState("");
  const [observacion, setObservacion] = useState("");
  const orden = s.ordenes.find((o) => o.id === ordenId) ?? s.ordenes[0];

  function emitir() {
    if (!orden) return;
    const datos = { orden: orden.descripcion, indicacion: indicacion.trim(), observacion: observacion.trim() };
    aplicar(
      (p, ahora) => ({ emitidas: [...p.emitidas, { id: siguienteId(p.emitidas), ...datos, hora: ahora }] }),
      { accion: "Emitió orden clínica", detalle: datos.orden, familia: "confirmacion" },
    );
    setIndicacion("");
    setObservacion("");
  }

  return (
    <Seccion
      id="orden-clinica"
      titulo="Orden clínica"
      icono={FilePen}
      descripcion="Documento independiente para el paciente: verificar, complementar y emitir."
      nota="Con la emisión el documento queda sellado y no admite edición. Toda corrección posterior se realiza mediante una nueva emisión."
    >
      {!orden ? (
        <Vacio>Crea una orden para poder emitir su documento.</Vacio>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {TIPO_ORDEN_LABEL[orden.tipo]}
            </span>
            {s.ordenes.length > 1 ? (
              <select
                value={orden.id}
                onChange={(e) => setOrdenId(Number(e.target.value))}
                aria-label="Orden a emitir"
                className={claseSelect}
              >
                {s.ordenes.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.descripcion}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-sm font-semibold text-slate-800">{orden.descripcion}</span>
            )}
          </div>
          <label className="block text-[11px] font-bold text-slate-500">
            Indicación
            <input
              value={indicacion}
              onChange={(e) => setIndicacion(e.target.value)}
              placeholder="Instrucción para el paciente"
              className={`${claseInput} mt-1 sm:max-w-xl`}
            />
          </label>
          <label className="block text-[11px] font-bold text-slate-500">
            Observación
            <input
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              placeholder="Notas adicionales"
              className={`${claseInput} mt-1`}
            />
          </label>
          <BotonGrande onClick={emitir}>
            <FilePen className="w-4 h-4" />
            Emitir orden clínica
          </BotonGrande>
        </div>
      )}

      {s.emitidas.length > 0 && (
        <ul className="mt-4 pt-4 border-t border-slate-100 space-y-2">
          {s.emitidas.map((e) => (
            <li key={e.id} className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-xs font-bold text-slate-800">{e.orden}</p>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                  Emitida
                </span>
                <span className="text-[10px] text-slate-400 ml-auto">{e.hora}</span>
              </div>
              {e.indicacion && <p className="text-[11px] text-slate-600 mt-1">Indicación: {e.indicacion}</p>}
              {e.observacion && <p className="text-[11px] text-slate-500 mt-0.5">Observación: {e.observacion}</p>}
            </li>
          ))}
        </ul>
      )}
    </Seccion>
  );
}

// ── Eventos adversos ─────────────────────────────────────────────────────────

const SEVERIDAD_TONO: Record<string, string> = {
  sin_dano: "bg-slate-50 text-slate-600 border-slate-200",
  leve: "bg-sky-50 text-sky-700 border-sky-200",
  moderado: "bg-amber-50 text-amber-700 border-amber-200",
  grave: "bg-orange-50 text-orange-700 border-orange-200",
  centinela: "bg-rose-50 text-rose-700 border-rose-200",
};

const FORM_VACIO = {
  tipo: "caida",
  severidad: "sin_dano",
  momento: "durante_atencion",
  descripcion: "",
  accionInmediata: "",
  requirioRemision: false,
};

function SeccionEventosAdversos() {
  const { s, sellada, aplicar } = useHistoria();
  const [abierto, setAbierto] = useState(false);
  const [form, setForm] = useState(FORM_VACIO);
  const sinReportar = s.eventos.filter((e) => !e.reportado).length;

  function crear() {
    if (!form.descripcion.trim()) return;
    aplicar(
      (p, ahora) => ({ eventos: [...p.eventos, { id: siguienteId(p.eventos), ...form, reportado: false, hora: ahora }] }),
      {
        accion: "Registró evento adverso",
        detalle: `${TIPOS_EVENTO[form.tipo]} · ${SEVERIDADES_EVENTO[form.severidad]}`,
        familia: "alta",
      },
    );
    setForm(FORM_VACIO);
    setAbierto(false);
  }

  function reportar(id: number) {
    aplicar((p) => ({ eventos: p.eventos.map((e) => (e.id === id ? { ...e, reportado: true } : e)) }), {
      accion: "Reportó evento adverso al programa de seguridad del paciente",
      familia: "confirmacion",
    });
  }

  const labelSelect = "text-[11px] font-bold text-slate-500";

  return (
    <Seccion
      id="eventos"
      titulo="Eventos adversos"
      icono={Siren}
      descripcion="Puede haber más de uno: una caída y un error de medicación no son el mismo hecho."
      bloqueado={sellada}
      acciones={
        !sellada ? (
          <BotonOscuro onClick={() => setAbierto((v) => !v)}>
            <Plus className="w-3.5 h-3.5" />
            {abierto ? "Cancelar" : "Registrar evento"}
          </BotonOscuro>
        ) : null
      }
      nota={
        sellada && s.eventos.length > 0
          ? "El evento quedó sellado con la historia y se corrige por adenda. El reporte al programa de seguridad no: sigue disponible, y hacerlo no rompe la firma."
          : undefined
      }
    >
      {sinReportar > 0 && (
        <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 mb-3">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-800">
              {sinReportar} evento{sinReportar === 1 ? "" : "s"} sin reportar al programa de seguridad
            </p>
            <p className="text-[11px] text-amber-700/80 mt-0.5 leading-relaxed">
              Reportar no modifica la historia clínica ni rompe su firma.
            </p>
          </div>
        </div>
      )}

      {abierto && !sellada && (
        <PanelFormulario>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <label className={labelSelect}>
              Tipo
              <select value={form.tipo} onChange={(e) => setForm((f) => ({ ...f, tipo: e.target.value }))} className={`${claseSelect} mt-1 w-full`}>
                {Object.entries(TIPOS_EVENTO).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
            <label className={labelSelect}>
              Severidad del daño
              <select value={form.severidad} onChange={(e) => setForm((f) => ({ ...f, severidad: e.target.value }))} className={`${claseSelect} mt-1 w-full`}>
                {Object.entries(SEVERIDADES_EVENTO).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
              <span className="text-[10px] font-normal text-slate-400">Del daño ocurrido, no del riesgo.</span>
            </label>
            <label className={labelSelect}>
              Momento
              <select value={form.momento} onChange={(e) => setForm((f) => ({ ...f, momento: e.target.value }))} className={`${claseSelect} mt-1 w-full`}>
                {Object.entries(MOMENTOS_EVENTO).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="block text-[11px] font-bold text-slate-500">
            Descripción
            <textarea rows={2} value={form.descripcion} onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))} placeholder="Qué pasó" className={`${claseInput} mt-1 text-xs`} />
          </label>
          <label className="block text-[11px] font-bold text-slate-500">
            Acción inmediata
            <textarea rows={2} value={form.accionInmediata} onChange={(e) => setForm((f) => ({ ...f, accionInmediata: e.target.value }))} placeholder="Qué se hizo en el momento" className={`${claseInput} mt-1 text-xs`} />
          </label>
          <label className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
            <input type="checkbox" checked={form.requirioRemision} onChange={(e) => setForm((f) => ({ ...f, requirioRemision: e.target.checked }))} className="w-3.5 h-3.5 rounded border-slate-300" />
            Requirió remisión
          </label>
          <BotonPrimario onClick={crear} disabled={!form.descripcion.trim()}>
            <Save className="w-3.5 h-3.5" />
            Registrar evento
          </BotonPrimario>
        </PanelFormulario>
      )}

      {s.eventos.length === 0 ? (
        <p className="py-2 text-center text-xs text-slate-400">Sin eventos adversos registrados en esta atención.</p>
      ) : (
        <ul className="space-y-2.5">
          {s.eventos.map((ev) => (
            <li key={ev.id} className="rounded-xl border border-slate-200 p-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-xs font-bold text-slate-800">{TIPOS_EVENTO[ev.tipo]}</p>
                    <span className={`px-2 py-0.5 rounded-lg border text-[10px] font-bold ${SEVERIDAD_TONO[ev.severidad]}`}>
                      {SEVERIDADES_EVENTO[ev.severidad]}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {MOMENTOS_EVENTO[ev.momento]} · {ev.hora}
                    {ev.requirioRemision && " · Requirió remisión"}
                  </p>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{ev.descripcion}</p>
                  {ev.accionInmediata && (
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      <span className="font-semibold">Acción inmediata:</span> {ev.accionInmediata}
                    </p>
                  )}
                </div>
                {ev.reportado ? (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg shrink-0">
                    Reportado
                  </span>
                ) : (
                  <button
                    onClick={() => reportar(ev.id)}
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg hover:bg-amber-100 shrink-0"
                  >
                    <ShieldAlert className="w-3 h-3" />
                    Reportar
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Seccion>
  );
}
