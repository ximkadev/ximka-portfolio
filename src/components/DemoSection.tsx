import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

// Lo que el visitante puede hacer en la demo, en el orden del recorrido.
const recorrido = [
  "Marca los antecedentes del paciente",
  "Registra signos vitales y examen físico",
  "Agrega diagnósticos y órdenes",
  "Completa la evolución y firma la historia",
  "Corrige con una adenda y revisa el historial de cambios",
];

/**
 * Recorrido guiado en video (grabación de pantalla con voz en off). Cuando
 * exista, pon aquí la ruta del archivo en /public (y opcionalmente un póster);
 * mientras sea null, el bloque no se muestra.
 */
const VIDEO_RECORRIDO = null as { src: string; poster?: string; titulo: string } | null;

export default function DemoSection() {
  return (
    <section id="demo" aria-labelledby="demo-titulo" className="scroll-mt-16 bg-slate-950 text-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-sm font-semibold text-teal-400 uppercase tracking-wider">Demo navegable</p>
            <h2 id="demo-titulo" className="mt-3 text-3xl lg:text-5xl font-bold leading-tight tracking-tight">
              Mira XIMKA en funcionamiento
            </h2>
            <p className="mt-5 text-lg text-slate-300 leading-relaxed">
              Historia clínica general — caso demostrativo. Recorre la atención completa:
              antecedentes, evaluación, diagnósticos, evolución, firma y adendas. Todos los datos
              son ficticios.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/historia-clinica-demo"
                className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Ver historia clínica demo
                <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
              <Link
                href="/casos"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Ver casos
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="text-sm font-semibold text-slate-300">En la demo puedes:</p>
            <ol className="mt-5 space-y-4">
              {recorrido.map((r, i) => (
                <li key={r} className="flex items-center gap-4">
                  <span className="w-8 h-8 shrink-0 rounded-full border border-teal-400/40 text-teal-300 text-sm font-bold grid place-items-center tabular-nums">
                    {i + 1}
                  </span>
                  <span className="text-slate-100">{r}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {VIDEO_RECORRIDO && (
          <figure className="mt-20">
            <video
              src={VIDEO_RECORRIDO.src}
              poster={VIDEO_RECORRIDO.poster}
              controls
              preload="metadata"
              className="w-full rounded-2xl border border-white/10"
            />
            <figcaption className="mt-3 text-sm text-slate-400 flex items-center gap-2">
              <PlayCircle className="w-4 h-4" aria-hidden />
              {VIDEO_RECORRIDO.titulo}
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
