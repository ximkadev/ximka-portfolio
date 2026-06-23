import Link from "next/link";

const points = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Copias de seguridad cifradas",
    description:
      "Respaldos automáticos y cifrados. La información clínica de tu negocio no se pierde.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "Fotos en almacenamiento privado",
    description:
      "Las imágenes de tus pacientes se guardan en almacenamiento privado, no expuesto al público.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L9.88 9.88" />
      </svg>
    ),
    title: "Información que no queda expuesta",
    description:
      "La información sensible de tu clínica está protegida y solo la ve quien debe verla.",
  },
];

export default function SecuritySection() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <span className="text-sm font-semibold text-teal-600 uppercase tracking-wide">
            Seguridad y confianza
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            Tus datos clínicos están protegidos
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Sin tecnicismos: tu información sensible no se pierde ni queda
            expuesta.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {points.map((point) => (
            <div
              key={point.title}
              className="p-6 rounded-2xl border border-slate-200 bg-white"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-5">
                {point.icon}
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{point.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Enlace a la explicación técnica */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-teal-200 bg-teal-50 p-6">
          <p className="text-slate-600 text-center sm:text-left">
            ¿Quieres el detalle técnico? Mira cómo está construido por dentro.
          </p>
          <Link
            href="/tecnologia"
            className="inline-flex items-center gap-2 bg-white hover:bg-teal-100 border border-teal-300 text-teal-700 font-semibold px-6 py-3 rounded-lg transition-colors shrink-0"
          >
            Cómo está construido XIMKA
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
