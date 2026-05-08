const steps = [
  {
    number: "01",
    title: "Datos del paciente",
    description:
      "Nombre completo, cédula, fecha de nacimiento, sexo biológico y celular. La edad se calcula automáticamente con validación de rango.",
    details: ["Nombre y documento de identidad", "Cálculo automático de edad", "Datos de contacto"],
  },
  {
    number: "02",
    title: "Evaluación clínica",
    description:
      "Peso y estatura generan el IMC en tiempo real con clasificación OMS (8 categorías). Se registran antecedentes médicos relevantes.",
    details: ["IMC calculado automáticamente", "Clasificación OMS en tiempo real", "Antecedentes médicos"],
  },
  {
    number: "03",
    title: "Procedimientos",
    description:
      "Selector agrupado por categoría: Zonas, Láser, Post-operatorio y Otros. Precio individual en COP con formato automático y notas clínicas.",
    details: ["Selector por categoría de procedimiento", "Precio en COP con formato automático", "Notas clínicas del registro"],
  },
];

export default function WorkflowSteps() {
  return (
    <div className="mt-20">
      <div className="text-center mb-12">
        <span className="text-sm font-semibold text-teal-600 uppercase tracking-wide">
          Flujo de registro
        </span>
        <h3 className="mt-3 text-2xl lg:text-3xl font-bold text-slate-900">
          Registro clínico en 3 pasos
        </h3>
        <p className="mt-3 text-slate-500 max-w-lg mx-auto">
          Un wizard guiado con indicador de progreso. Una vez completado, el
          sistema realiza 3 llamadas secuenciales a la API: paciente → evaluación
          → procedimientos.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <div key={step.number} className="relative">
            {/* Línea conectora */}
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-[calc(100%+1px)] w-8 h-px bg-teal-200 z-10" />
            )}

            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm h-full">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold text-lg shrink-0">
                  {step.number}
                </div>
                <h4 className="font-semibold text-slate-900">{step.title}</h4>
              </div>

              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                {step.description}
              </p>

              <ul className="space-y-2">
                {step.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2 text-sm text-slate-600">
                    <svg
                      className="w-4 h-4 text-teal-500 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
