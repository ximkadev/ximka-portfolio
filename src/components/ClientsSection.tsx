import Placeholder from "./Placeholder";

const clients = [
  {
    name: "Perfetestetic",
    slug: "perfetestetic",
    location: "Colombia",
    description:
      "Clínica de medicina estética con múltiples profesionales. Gestiona su operación completa a través de XIMKA.",
    demoLabel: "SCREENSHOT: XIMKA EN PERFETESTETIC",
    demoHref: "#",
  },
  {
    name: "Coldesthetic",
    slug: "coldesthetic",
    location: "Colombia",
    description:
      "Primera clínica en adoptar XIMKA. Ha digitalizado completamente su historial clínico y seguimiento de ingresos.",
    demoLabel: "SCREENSHOT: XIMKA EN COLDESTHETIC",
    demoHref: "#",
  },
  {
    name: "Podocare",
    slug: "podocare",
    location: "Colombia",
    description:
      "Clínica especializada que utiliza XIMKA para el registro y trazabilidad de sus tratamientos y procedimientos.",
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
            Clientes actuales
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            Clínicas que ya digitalizaron su operación con XIMKA
          </h2>
          <p className="mt-4 text-slate-500">
            En producción activa con clientes reales del sector de medicina
            estética colombiana.
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
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 text-xs font-bold">
                      ?
                    </div>
                    <div>
                      <p className="text-xs font-mono text-slate-300 uppercase tracking-wide">
                        TESTIMONIO DEL MÉDICO LÍDER
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 italic font-mono">
                    &quot;[Agregar testimonio aquí]&quot;
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
