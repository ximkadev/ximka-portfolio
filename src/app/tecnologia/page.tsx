import type { Metadata } from "next";
import Link from "next/link";
import { MAILTO_DEMO } from "@/config/contacto";

export const metadata: Metadata = {
  title: "Cómo está construido XIMKA",
  description:
    "Arquitectura, seguridad y stack tecnológico de XIMKA: una plataforma en producción construida con prácticas pensadas para datos clínicos reales. Laravel, Next.js, Docker y almacenamiento privado.",
  alternates: { canonical: "/tecnologia" },
};

const blocks = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: "Arquitectura desacoplada y escalable",
    description:
      "Backend y frontend son independientes: una API que expone los datos y una aplicación web que la consume. Esto permite evolucionar cada parte por separado, escalar bajo demanda y, a futuro, conectar nuevos canales (app móvil, integraciones con terceros) sin reescribir el sistema. Todo corre containerizado con Docker.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "Autenticación robusta y control de acceso por rol",
    description:
      "Autenticación con Laravel Sanctum y límites de intentos. El acceso se controla por rol: la administración gestiona todo el negocio y los demás usuarios acceden a lo que su rol permite. Un usuario inactivo queda bloqueado de inmediato a nivel de sistema.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Protección de datos clínicos sensibles",
    description:
      "Las fotos de pacientes se guardan en almacenamiento privado (Cloudflare R2) con URLs firmadas de acceso temporal — nunca quedan expuestas en una URL pública. La galería pública del sitio y las fotos clínicas privadas viven en espacios separados y con permisos distintos.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    title: "Copias de seguridad cifradas y automáticas",
    description:
      "Backups automáticos y cifrados hacia un bucket privado. La información de tu clínica no depende de que alguien se acuerde de respaldarla: el sistema lo hace solo y de forma segura.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
    title: "Trazabilidad total",
    description:
      "Cada cambio relevante registra quién lo hizo y cuándo. Una evaluación clínica, una vez confirmada, queda bloqueada para edición — lo que garantiza integridad del historial médico y auditoría completa de cada acción.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Integridad de los datos",
    description:
      "Operaciones críticas como el descuento de inventario corren en transacciones atómicas: o se completan enteras o no se ejecutan, nunca a medias. Validaciones como la cédula única del paciente impiden duplicados desde la base.",
  },
];

const stack = [
  {
    label: "Backend",
    items: "Laravel · PHP · MySQL · API REST",
  },
  {
    label: "Frontend",
    items: "Next.js · React · TypeScript",
  },
  {
    label: "Infraestructura",
    items: "Docker · almacenamiento de objetos compatible con S3",
  },
];

export default function TecnologiaPage() {
  return (
    <main>
      {/* Encabezado */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(20,184,166,0.15),_transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-6 py-20 lg:py-28">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-teal-300 transition-colors mb-10"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Volver
          </Link>

          <span className="text-sm font-semibold text-teal-300 uppercase tracking-wide">
            Cómo está construido
          </span>
          <h1 className="mt-3 text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            Cómo está construido XIMKA
          </h1>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-2xl">
            XIMKA no es un prototipo ni una plantilla. Es una plataforma en
            producción, construida con prácticas de seguridad y arquitectura
            pensadas para datos clínicos reales.
          </p>
        </div>
      </section>

      {/* Bloques técnicos */}
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 gap-6">
            {blocks.map((block) => (
              <div
                key={block.title}
                className="p-6 rounded-2xl border border-slate-200 bg-slate-50"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-5">
                  {block.icon}
                </div>
                <h2 className="font-bold text-slate-900 mb-2">{block.title}</h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {block.description}
                </p>
              </div>
            ))}
          </div>

          {/* Stack tecnológico */}
          <div className="mt-12 rounded-2xl bg-slate-900 text-white p-8 lg:p-10">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
              Stack tecnológico
            </h2>
            <dl className="divide-y divide-white/10">
              {stack.map((row) => (
                <div
                  key={row.label}
                  className="py-4 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6"
                >
                  <dt className="text-teal-400 font-semibold text-sm uppercase tracking-wide sm:w-40 shrink-0">
                    {row.label}
                  </dt>
                  <dd className="text-slate-200 font-mono text-sm">{row.items}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Volver al inicio
            </Link>
            <a
              href={MAILTO_DEMO}
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Solicita una demo
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
