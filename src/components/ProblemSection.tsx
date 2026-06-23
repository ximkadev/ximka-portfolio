const problems = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    title: "Información partida",
    description:
      "La historia del paciente en una carpeta, los precios en un Excel, las fotos en un celular y lo que se vende guardado en la cabeza de alguien.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: "Facturación a mano",
    description:
      "Cuando quieres saber cuánto facturaste este mes, toca sumar a mano. Tu negocio avanza a ciegas, sin cifras en tiempo real.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    title: "Inventario sin control",
    description:
      "Cuando un insumo se acaba, te enteras tarde y mal. Nadie sabe con certeza qué hay, qué falta ni cuánto te está costando.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Pacientes desde cero",
    description:
      "Cada paciente nuevo es volver a empezar de cero. Sin un registro único, repites el mismo trabajo una y otra vez.",
  },
];

export default function ProblemSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-sm font-semibold text-teal-600 uppercase tracking-wide">
            El problema
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            Hoy tu información vive partida
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            La historia del paciente en una carpeta, los precios en un Excel, las
            fotos en un celular y lo que se vende en la cabeza de alguien. Así se
            pierden datos, tiempo y dinero todos los días.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="group p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-red-50 hover:border-red-100 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-500 group-hover:bg-red-200 flex items-center justify-center mb-5 transition-colors">
                {problem.icon}
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{problem.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Puente hacia la solución */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-sm uppercase tracking-wide font-medium">
            XIMKA reemplaza todo eso
          </p>
          <div className="mt-3 w-px h-12 bg-gradient-to-b from-slate-200 to-teal-400 mx-auto" />
        </div>
      </div>
    </section>
  );
}
