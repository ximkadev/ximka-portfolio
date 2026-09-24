import Link from "next/link";

const experiencias = [
  {
    href: "/casos",
    etiqueta: "Casos",
    titulo: "Casos de éxito y escenarios demo",
    descripcion:
      "Clínicas que ya operan sobre XIMKA y escenarios de referencia marcados como demostrativos.",
    boton: "Ver casos",
    estilo: {
      card: "bg-white border-slate-200 hover:border-teal-400",
      icono: "bg-teal-100 text-teal-600",
      boton: "bg-teal-500 group-hover:bg-teal-400 text-white",
    },
    icono: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
      />
    ),
  },
  {
    href: "/historia-clinica-demo",
    etiqueta: "Demo interactiva",
    titulo: "Historia clínica general",
    descripcion:
      "Recorre una historia clínica completa en XIMKA, paso a paso, con datos ficticios.",
    boton: "Abrir historia clínica demo",
    estilo: {
      card: "bg-slate-900 border-slate-800 hover:border-teal-500 text-white",
      icono: "bg-teal-400/15 text-teal-300",
      boton: "bg-white text-slate-900 group-hover:bg-teal-50",
    },
    icono: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    ),
  },
];

export default function ExperienciasSection() {
  return (
    <section id="experiencias" className="bg-slate-50 border-y border-slate-100 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-teal-600 uppercase tracking-wide">
            Conoce XIMKA por dentro
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            Mira dónde funciona y cómo se ve
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {experiencias.map((x) => (
            <Link
              key={x.href}
              href={x.href}
              className={`group rounded-2xl border-2 p-8 flex flex-col gap-5 transition-all hover:-translate-y-1 hover:shadow-xl ${x.estilo.card}`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${x.estilo.icono}`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {x.icono}
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide opacity-60">
                  {x.etiqueta}
                </p>
                <h3 className="mt-1 text-2xl font-bold">{x.titulo}</h3>
                <p className="mt-2 opacity-70">{x.descripcion}</p>
              </div>
              <span
                className={`self-start inline-flex items-center gap-2 font-semibold px-5 py-3 rounded-lg transition-colors ${x.estilo.boton}`}
              >
                {x.boton} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
