import Placeholder from "../Placeholder";
import type { Caso } from "@/data/casos";

const estilos = {
  real: {
    card: "border-slate-200 bg-white",
    badge: "bg-teal-50 text-teal-700 border-teal-200",
    dot: "bg-teal-500",
    etiqueta: "Cliente real · En producción",
    tituloResultados: "Resultados",
    bullet: "text-teal-500",
  },
  demo: {
    card: "border-dashed border-amber-300 bg-amber-50/40",
    badge: "bg-amber-100 text-amber-800 border-amber-300",
    dot: "bg-amber-500",
    etiqueta: "Caso demostrativo · No es un cliente",
    tituloResultados: "Beneficios esperados",
    bullet: "text-amber-500",
  },
};

export default function CasoCard({ caso }: { caso: Caso }) {
  const e = estilos[caso.tipo];

  return (
    <article
      id={caso.slug}
      className={`scroll-mt-24 rounded-2xl border-2 overflow-hidden flex flex-col ${e.card}`}
    >
      <div className="p-6 pb-0 space-y-4">
        <span
          className={`inline-flex items-center gap-2 border rounded-full px-3 py-1 text-xs font-semibold ${e.badge}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${e.dot}`} />
          {e.etiqueta}
        </span>

        <div>
          <h3 className="text-xl font-bold text-slate-900">{caso.nombre}</h3>
          <p className="text-sm text-slate-500">{caso.especialidad}</p>
        </div>

        {caso.imagen ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={caso.imagen}
            alt={`XIMKA en ${caso.nombre}`}
            className="w-full rounded-xl border border-slate-200"
          />
        ) : (
          <Placeholder
            label={
              caso.tipo === "real"
                ? `SCREENSHOT: XIMKA EN ${caso.nombre.toUpperCase()}`
                : "ILUSTRACIÓN DEL ESCENARIO DEMO"
            }
            aspectRatio="video"
          />
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col gap-5 text-sm">
        <section>
          <h4 className="font-semibold text-slate-900 mb-1">El problema</h4>
          <p className="text-slate-600 leading-relaxed">{caso.problema}</p>
        </section>

        <section>
          <h4 className="font-semibold text-slate-900 mb-1">
            {caso.tipo === "real" ? "Cómo usan XIMKA" : "Cómo se usaría XIMKA"}
          </h4>
          <ul className="space-y-1.5">
            {caso.usoXimka.map((item) => (
              <li key={item} className="flex gap-2 text-slate-600">
                <span className={e.bullet}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-1.5">
          {caso.modulos.map((m) => (
            <span
              key={m}
              className="text-xs bg-slate-100 text-slate-600 rounded-md px-2 py-0.5"
            >
              {m}
            </span>
          ))}
        </div>

        <section className="mt-auto">
          <h4 className="font-semibold text-slate-900 mb-1">
            {e.tituloResultados}
          </h4>
          {caso.resultados.length > 0 ? (
            <ul className="space-y-1.5">
              {caso.resultados.map((r) => (
                <li key={r} className="flex gap-2 text-slate-600">
                  <span className={e.bullet}>✓</span>
                  {r}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 italic">
              Resultados pendientes de validar con el cliente.
            </p>
          )}
          {caso.tipo === "demo" && (
            <p className="mt-3 text-xs text-amber-800/80">
              Escenario ilustrativo: no corresponde a una clínica real ni a
              resultados medidos.
            </p>
          )}
        </section>

        {caso.testimonio && (
          <blockquote className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-slate-700 italic">“{caso.testimonio.cita}”</p>
            <footer className="mt-2 text-xs text-slate-500">
              {caso.testimonio.autor} · {caso.testimonio.cargo}
            </footer>
          </blockquote>
        )}
      </div>
    </article>
  );
}
