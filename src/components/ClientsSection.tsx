import Placeholder from "./Placeholder";

const clients = [
  {
    name: "Cold Esthetic",
    slug: "cold-esthetic",
    location: "Medicina estética",
    description:
      "Una de las clínicas que ya opera su día a día sobre XIMKA: historia clínica, procedimientos y cifras del negocio en un solo lugar.",
    demoLabel: "SCREENSHOT: XIMKA EN COLD ESTHETIC",
    demoHref: "#",
  },
  {
    name: "Perfect Esthetic",
    slug: "perfect-esthetic",
    location: "Medicina estética",
    description:
      "Gestiona pacientes, inventario y la salud financiera de la clínica con XIMKA, en tiempo real y sin papeles sueltos.",
    demoLabel: "SCREENSHOT: XIMKA EN PERFECT ESTHETIC",
    demoHref: "#",
  },
  {
    name: "PODOCARE",
    slug: "podocare",
    location: "Podología",
    description:
      "Clínica de podología que usa XIMKA para el registro y la trazabilidad de cada tratamiento y procedimiento.",
    demoLabel: "SCREENSHOT: XIMKA EN PODOCARE",
    demoHref: "#",
  },
];

export default function ClientsSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-teal-600 uppercase tracking-wide">
            Casos de éxito
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            No es una promesa. XIMKA ya está en producción.
          </h2>
          <p className="mt-4 text-slate-500">
            Clínicas reales en Colombia que ya operan su día a día sobre XIMKA.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {clients.map((client) => (
            <div
              key={client.slug}
              className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden flex flex-col"
            >
              {/* Logo placeholder */}
              <div className="p-6 border-b border-slate-200 bg-white">
                <Placeholder
                  label={`LOGO DE ${client.name.toUpperCase()}`}
                  aspectRatio="wide"
                  className="border-slate-200"
                />
              </div>

              {/* Info */}
              <div className="p-6 flex-1 flex flex-col gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{client.name}</h3>
                  <p className="text-sm text-slate-400">{client.location}</p>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  {client.description}
                </p>

                {/* Screenshot placeholder */}
                <Placeholder
                  label={client.demoLabel}
                  aspectRatio="video"
                />

                {/* Testimonio placeholder */}
                <div className="bg-white border border-slate-200 rounded-xl p-4">
                  <svg
                    className="w-6 h-6 text-teal-200 mb-1"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                  </svg>
                  <p className="text-sm text-slate-400 italic leading-relaxed">
                    Espacio para el testimonio del médico líder.
                  </p>
                  <p className="mt-2 text-xs text-slate-300 uppercase tracking-wide">
                    Próximamente
                  </p>
                </div>

                {/* CTA */}
                <a
                  href={client.demoHref}
                  className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold text-sm px-4 py-3 rounded-lg transition-colors w-full"
                >
                  Ver demo
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
