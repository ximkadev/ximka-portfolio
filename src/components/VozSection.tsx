import { AudioLines, CheckCheck, FileText, ListTree, Mic } from "lucide-react";

// Flujo real del registro por voz de XIMKA: grabación → transcripción →
// clasificación en campos clínicos → revisión y confirmación del profesional.
const pasos = [
  { icono: Mic, titulo: "El profesional habla", texto: "Describe la consulta como lo haría en voz alta." },
  { icono: AudioLines, titulo: "XIMKA transcribe", texto: "Convierte el audio en texto." },
  { icono: ListTree, titulo: "Clasifica la información", texto: "Identifica motivo, antecedentes, hallazgos y factores de riesgo." },
  { icono: FileText, titulo: "La organiza en el registro", texto: "Cada dato queda en su campo del registro clínico." },
  { icono: CheckCheck, titulo: "El profesional confirma", texto: "Revisa, corrige si hace falta y guarda." },
];

export default function VozSection() {
  return (
    <section aria-labelledby="voz-titulo" className="bg-slate-50 border-y border-slate-200/70 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-teal-700 uppercase tracking-wider">Registro clínico asistido por voz</p>
          <h2 id="voz-titulo" className="mt-3 text-3xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
            Habla la consulta. XIMKA la organiza.
          </h2>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            Facilita el diligenciamiento de la consulta mediante voz. XIMKA transcribe y clasifica
            la información para ayudar al profesional a completar el registro clínico de forma más
            ágil.
          </p>
        </div>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pasos.map((p, i) => {
            const Icono = p.icono;
            const final = i === pasos.length - 1;
            return (
              <li
                key={p.titulo}
                className={`relative rounded-2xl border p-5 ${final ? "bg-slate-900 border-slate-900 text-white" : "bg-white border-slate-200"}`}
              >
                <span className={`text-xs font-bold tabular-nums ${final ? "text-teal-300" : "text-slate-400"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icono className={`mt-3 w-6 h-6 ${final ? "text-teal-300" : "text-teal-700"}`} aria-hidden />
                <p className="mt-3 font-semibold">{p.titulo}</p>
                <p className={`mt-1 text-sm leading-relaxed ${final ? "text-slate-300" : "text-slate-600"}`}>{p.texto}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 grid sm:grid-cols-2 gap-4 text-sm text-slate-600">
          <p className="flex gap-2">
            <CheckCheck className="w-4 h-4 mt-0.5 text-teal-600 shrink-0" aria-hidden />
            Nada se guarda sin la revisión del profesional: la voz ayuda a llenar, no decide.
          </p>
          <p className="flex gap-2">
            <CheckCheck className="w-4 h-4 mt-0.5 text-teal-600 shrink-0" aria-hidden />
            Antes de clasificar el texto, se retiran los datos que identifican al paciente.
          </p>
        </div>
      </div>
    </section>
  );
}
