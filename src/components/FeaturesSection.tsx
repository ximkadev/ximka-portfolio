import Placeholder from "./Placeholder";
import WorkflowSteps from "./WorkflowSteps";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: "Registro de pacientes",
    description:
      "Formulario multi-paso con validación en tiempo real. Cálculo automático de IMC y selector de procedimientos con precios en COP.",
    screenshotLabel: "SCREENSHOT: FORMULARIO DE REGISTRO DE PACIENTE",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    title: "Historial clínico",
    description:
      "Visualización completa por paciente con todos sus registros, fechas, remitentes y estados. Principio de inmutabilidad: los registros no se modifican, cada corrección genera un nuevo registro.",
    screenshotLabel: "SCREENSHOT: HISTORIAL CLÍNICO DEL PACIENTE",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Panel de estadísticas",
    description:
      "Solo para el Médico Líder. KPIs del mes actual vs. mes anterior, top procedimientos por ingresos y demanda, desglose por remitente.",
    screenshotLabel: "SCREENSHOT: DASHBOARD DE ESTADÍSTICAS",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3h18M3 21h18M7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z" />
      </svg>
    ),
    title: "Galería antes/después",
    description:
      "Carga y gestión de imágenes clínicas comparativas por tratamiento. Accesible desde la landing pública de la clínica.",
    screenshotLabel: "SCREENSHOT: GALERÍA ANTES Y DESPUÉS",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Control de acceso por roles",
    description:
      "Dos roles diferenciados: Médico Líder (ADMIN) con gestión completa, y Médico Colaborador (REMITENTE) con acceso solo a sus propios pacientes y registros.",
    screenshotLabel: "SCREENSHOT: PANTALLA DE LOGIN / GESTIÓN DE ROLES",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-sm font-semibold text-teal-600 uppercase tracking-wide">
            Funcionalidades
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            Todo lo que necesita su clínica en un solo lugar
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Una plataforma centralizada, segura y diseñada específicamente para
            el flujo clínico de medicina estética colombiana.
          </p>
        </div>

        <div className="space-y-16">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Texto */}
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Screenshot */}
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <Placeholder
                  label={feature.screenshotLabel}
                  aspectRatio="video"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Flujo del wizard */}
        <WorkflowSteps />
      </div>
    </section>
  );
}
