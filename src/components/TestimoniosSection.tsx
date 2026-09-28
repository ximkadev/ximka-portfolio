import { Quote } from "lucide-react";

/**
 * Testimonios REALES y autorizados. No se inventan: mientras la lista esté
 * vacía, en producción la sección no se muestra y en desarrollo aparece un
 * placeholder marcado como tal.
 */
interface Testimonio {
  cita: string;
  nombre: string;
  cargo: string;
  clinica: string;
  /** Ruta en /public, con autorización de uso. */
  foto?: string;
}

const testimonios: Testimonio[] = [];

export default function TestimoniosSection() {
  if (testimonios.length === 0) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <section className="bg-white pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50 p-6 text-sm text-amber-900">
            <p className="font-bold">[Solo en desarrollo] Sección de testimonios sin contenido</p>
            <p className="mt-1">
              Agrega testimonios reales y autorizados (foto, nombre, cargo, clínica y texto) en
              <code className="mx-1 font-mono break-all">src/components/TestimoniosSection.tsx</code>. Esta
              sección no se publica mientras esté vacía.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="testimonios-titulo" className="bg-white pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 id="testimonios-titulo" className="sr-only">
          Testimonios
        </h2>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonios.map((t) => (
            <li key={t.nombre} className="rounded-2xl border border-slate-200 p-6 flex flex-col">
              <Quote className="w-6 h-6 text-teal-200" aria-hidden />
              <blockquote className="mt-3 text-slate-700 leading-relaxed flex-1">“{t.cita}”</blockquote>
              <div className="mt-6 flex items-center gap-3">
                {t.foto && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.foto} alt="" className="w-11 h-11 rounded-full object-cover" />
                )}
                <div>
                  <p className="font-semibold text-slate-900">{t.nombre}</p>
                  <p className="text-sm text-slate-500">
                    {t.cargo} · {t.clinica}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
