const adminPerms = [
  "Gestión completa de pacientes y registros clínicos",
  "Dashboard de estadísticas globales (ingresos, procedimientos, remitentes)",
  "Crear, activar, pausar y dar de baja a médicos colaboradores",
  "Administración completa de la galería antes/después",
  "Acceso a todos los pacientes independientemente del remitente",
  "Confirmación y cancelación de cualquier valoración",
];

const remitentPerms = [
  "Solo sus propios pacientes y registros clínicos",
  "Crear valoraciones y procedimientos propios",
  "Gestión de sus propias imágenes clínicas",
  "Sin acceso a estadísticas globales ni datos de otros colaboradores",
  "Acceso bloqueado si su cuenta está pausada o dada de baja",
];

const stateRows = [
  {
    state: "EN ESPERA",
    color: "bg-amber-100 text-amber-700 border border-amber-200",
    dot: "bg-amber-400",
    finance: false,
    description: "Registro creado, pendiente de confirmación",
  },
  {
    state: "CONFIRMADO",
    color: "bg-green-100 text-green-700 border border-green-200",
    dot: "bg-green-500",
    finance: true,
    description: "Procedimiento realizado — se contabiliza en finanzas",
  },
  {
    state: "CANCELADO",
    color: "bg-red-100 text-red-700 border border-red-200",
    dot: "bg-red-500",
    finance: false,
    description: "No realizado — no se contabiliza",
  },
];

export default function RolesSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-sm font-semibold text-teal-600 uppercase tracking-wide">
            Control de acceso
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            Cada médico ve exactamente lo que necesita
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Dos roles diferenciados con permisos granulares. La información
            sensible —estadísticas, ingresos, otros colaboradores— solo la ve el
            Médico Líder.
          </p>
        </div>

        {/* Roles */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          {/* ADMIN */}
          <div className="rounded-2xl border-2 border-teal-200 bg-teal-50 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-sm">
                A
              </div>
              <div>
                <p className="font-bold text-slate-900">ADMIN — Médico Líder</p>
                <p className="text-sm text-slate-500">Acceso completo al sistema</p>
              </div>
            </div>
            <ul className="space-y-3">
              {adminPerms.map((perm) => (
                <li key={perm} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <svg
                    className="w-4 h-4 text-teal-500 shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {perm}
                </li>
              ))}
            </ul>
          </div>

          {/* REMITENTE */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-slate-400 text-white flex items-center justify-center font-bold text-sm">
                R
              </div>
              <div>
                <p className="font-bold text-slate-900">REMITENTE — Médico Colaborador</p>
                <p className="text-sm text-slate-500">Acceso restringido a sus propios recursos</p>
              </div>
            </div>
            <ul className="space-y-3">
              {remitentPerms.map((perm) => (
                <li key={perm} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <svg
                    className="w-4 h-4 text-slate-400 shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {perm}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Estados de valoración */}
        <div className="bg-slate-900 rounded-2xl p-8 text-white">
          <h3 className="text-lg font-bold mb-2">Estados de valoración clínica</h3>
          <p className="text-slate-400 text-sm mb-8">
            Cada registro tiene un flujo de estados que garantiza la trazabilidad y la integridad financiera.
            <strong className="text-white"> Los registros confirmados no pueden modificarse</strong> — si hay un error, se cancela y se crea uno nuevo.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {stateRows.map((row) => (
              <div key={row.state} className="bg-slate-800 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-2 h-2 rounded-full ${row.dot}`} />
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${row.color}`}>
                    {row.state}
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-3">{row.description}</p>
                <div className="flex items-center gap-1.5 text-xs">
                  {row.finance ? (
                    <>
                      <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-green-400">Cuenta en finanzas</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-slate-500">No cuenta en finanzas</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
