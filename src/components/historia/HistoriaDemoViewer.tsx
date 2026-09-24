"use client";

import { useState } from "react";
import Placeholder from "../Placeholder";
import { pacienteDemo, seccionesHistoria } from "@/data/historia-demo";

export default function HistoriaDemoViewer() {
  const [paso, setPaso] = useState(0);
  const seccion = seccionesHistoria[paso];
  const total = seccionesHistoria.length;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 overflow-hidden">
      {/* Encabezado del paciente */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center">
            PD
          </div>
          <div>
            <p className="font-semibold text-slate-900">{pacienteDemo.nombre}</p>
            <p className="text-xs text-slate-500">
              {pacienteDemo.documento} · {pacienteDemo.edad} · {pacienteDemo.sede}
            </p>
          </div>
        </div>
        <span className="text-xs font-bold uppercase tracking-wide bg-amber-100 text-amber-800 border border-amber-300 rounded-full px-3 py-1">
          Datos ficticios · Demo
        </span>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr]">
        {/* Navegación del flujo */}
        <nav
          aria-label="Pasos de la historia clínica"
          className="border-b lg:border-b-0 lg:border-r border-slate-200 p-3 flex lg:flex-col gap-1 overflow-x-auto"
        >
          {seccionesHistoria.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setPaso(i)}
              aria-current={i === paso ? "step" : undefined}
              className={`shrink-0 flex items-center gap-3 text-left text-sm rounded-lg px-3 py-2 transition-colors ${
                i === paso
                  ? "bg-teal-50 text-teal-800 font-semibold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span
                className={`w-6 h-6 shrink-0 rounded-full text-xs flex items-center justify-center ${
                  i === paso
                    ? "bg-teal-600 text-white"
                    : i < paso
                      ? "bg-teal-100 text-teal-700"
                      : "bg-slate-100 text-slate-500"
                }`}
              >
                {i + 1}
              </span>
              <span className="whitespace-nowrap lg:whitespace-normal">
                {s.titulo}
              </span>
            </button>
          ))}
        </nav>

        {/* Contenido del paso */}
        <div className="p-6 lg:p-8 flex flex-col min-h-[480px]">
          <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide">
            Paso {paso + 1} de {total}
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            {seccion.titulo}
          </h2>

          <div className="mt-4 flex gap-3 rounded-xl bg-teal-50 border border-teal-100 p-4 text-sm text-teal-900">
            <span aria-hidden>✦</span>
            <p>
              <strong>Qué muestra XIMKA:</strong> {seccion.capacidad}
            </p>
          </div>

          <div className="mt-6 space-y-6 flex-1">
            {seccion.campos && (
              <dl className="grid sm:grid-cols-2 gap-4">
                {seccion.campos.map((c) => (
                  <div
                    key={c.etiqueta}
                    className="rounded-lg border border-slate-200 px-4 py-3"
                  >
                    <dt className="text-xs text-slate-500">{c.etiqueta}</dt>
                    <dd className="mt-0.5 text-sm text-slate-900">{c.valor}</dd>
                  </div>
                ))}
              </dl>
            )}

            {seccion.tabla && (
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-left">
                    <tr>
                      {seccion.tabla.columnas.map((col) => (
                        <th key={col} className="px-4 py-2 font-medium">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {seccion.tabla.filas.map((fila, i) => (
                      <tr key={i} className="border-t border-slate-100">
                        {fila.map((celda, j) => (
                          <td key={j} className="px-4 py-2 text-slate-700">
                            {celda}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {seccion.fotos && (
              <div className="grid sm:grid-cols-2 gap-4">
                {seccion.fotos.map((f) => (
                  <Placeholder key={f} label={f} aspectRatio="square" />
                ))}
              </div>
            )}

            {seccion.timeline && (
              <ol className="relative border-l-2 border-teal-100 ml-2 space-y-5">
                {seccion.timeline.map((ev) => (
                  <li key={ev.titulo} className="pl-5 relative">
                    <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-teal-500" />
                    <p className="text-xs text-slate-500">{ev.fecha}</p>
                    <p className="font-semibold text-slate-900 text-sm">
                      {ev.titulo}
                    </p>
                    <p className="text-sm text-slate-600">{ev.detalle}</p>
                  </li>
                ))}
              </ol>
            )}

            {seccion.nota && (
              <p className="text-xs text-slate-400 italic">{seccion.nota}</p>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 pt-6 border-t border-slate-100">
            <button
              onClick={() => setPaso((p) => Math.max(0, p - 1))}
              disabled={paso === 0}
              className="px-4 py-2 rounded-lg text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Anterior
            </button>
            <button
              onClick={() => setPaso((p) => Math.min(total - 1, p + 1))}
              disabled={paso === total - 1}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-teal-600 hover:bg-teal-500 text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Siguiente →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
