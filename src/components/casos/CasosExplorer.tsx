"use client";

import { useState } from "react";
import CasoCard from "./CasoCard";
import type { Caso, TipoCaso } from "@/data/casos";

type Filtro = "todos" | TipoCaso;

const filtros: { valor: Filtro; etiqueta: string }[] = [
  { valor: "todos", etiqueta: "Todos" },
  { valor: "real", etiqueta: "Clientes reales" },
  { valor: "demo", etiqueta: "Casos demostrativos" },
];

export default function CasosExplorer({ casos }: { casos: Caso[] }) {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const visibles =
    filtro === "todos" ? casos : casos.filter((c) => c.tipo === filtro);

  const conteo = (f: Filtro) =>
    f === "todos" ? casos.length : casos.filter((c) => c.tipo === f).length;

  return (
    <>
      <div
        role="tablist"
        aria-label="Filtrar casos"
        className="flex flex-wrap justify-center gap-2 mb-12"
      >
        {filtros.map((f) => (
          <button
            key={f.valor}
            role="tab"
            aria-selected={filtro === f.valor}
            onClick={() => setFiltro(f.valor)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
              filtro === f.valor
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
            }`}
          >
            {f.etiqueta}
            <span className="ml-2 opacity-60">{conteo(f.valor)}</span>
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibles.map((caso) => (
          <CasoCard key={caso.slug} caso={caso} />
        ))}
      </div>
    </>
  );
}
