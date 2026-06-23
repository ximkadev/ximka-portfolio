import Placeholder from "./Placeholder";

const benefits = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Ve cuánto estás ganando, en tiempo real",
    description:
      "Ingresos del mes contra el anterior, los procedimientos que más venden, qué médico trae más pacientes y una proyección de tus próximos meses. Abres el panel y entiendes tu negocio en 10 segundos.",
    screenshotLabel: "SCREENSHOT: PANEL FINANCIERO EN TIEMPO REAL",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    title: "Historia clínica completa y sin duplicados",
    description:
      "Cada paciente queda registrado una sola vez. Antecedentes, examen físico, evaluaciones y procedimientos ordenados por fecha y trazables: siempre sabes quién hizo qué y cuándo.",
    screenshotLabel: "SCREENSHOT: HISTORIA CLÍNICA DEL PACIENTE",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    title: "Inventario que se cuida solo",
    description:
      "El sistema te avisa antes de que un insumo se agote, descuenta el stock cuando lo usas y te muestra tu utilidad neta — lo que entra menos lo que gastas — sin que toques una hoja de cálculo.",
    screenshotLabel: "SCREENSHOT: CONTROL DE INVENTARIO Y UTILIDAD",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3h18M3 21h18M7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z" />
      </svg>
    ),
    title: "Fotos antes/después y consentimiento digital",
    description:
      "Galería privada por paciente para respaldar cada evolución, y firma de consentimiento informado directo en pantalla. Se acabaron los papeles de autorización perdidos.",
    screenshotLabel: "SCREENSHOT: GALERÍA ANTES/DESPUÉS Y FIRMA DIGITAL",
  },
];

export default function BenefitsSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-sm font-semibold text-teal-600 uppercase tracking-wide">
            Beneficios
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            Resultados que sientes desde el primer mes
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            No es una lista de funciones: es tu clínica más ordenada, más rentable
            y bajo control, en tiempo real.
          </p>
        </div>

        <div className="space-y-16">
          {benefits.map((benefit, i) => (
            <div
              key={benefit.title}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Texto */}
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-5">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              {/* Screenshot */}
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <Placeholder
                  label={benefit.screenshotLabel}
                  aspectRatio="video"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bloque de marca / equipo */}
        <div className="mt-16 rounded-2xl bg-slate-900 text-white p-8 lg:p-12 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h3 className="text-xl font-bold mb-2">Tu marca, tu equipo</h3>
            <p className="text-slate-300 leading-relaxed">
              XIMKA lleva el nombre y la identidad de tu clínica. Cada colaborador
              ve solo sus pacientes; tú, como administradora, ves todo.
            </p>
          </div>
          <div className="flex items-center gap-3 text-teal-400 font-semibold shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            Roles y permisos por colaborador
          </div>
        </div>
      </div>
    </section>
  );
}
