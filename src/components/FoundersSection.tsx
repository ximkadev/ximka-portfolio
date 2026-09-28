import { IconoWhatsApp } from "./BotonesDemo";
import Revelar from "./Revelar";
import { WHATSAPP_KAROL_DEMO, WHATSAPP_KAROL_VISIBLE } from "@/config/contacto";

/**
 * Fundadoras de XIMKA. Solo nombres: cargo, foto y enlace se agregan aquí
 * cuando existan (no se inventan).
 */
interface Founder {
  nombre: string;
  cargo?: string;
  /** Ruta en /public. */
  foto?: string;
  enlace?: string;
  whatsapp?: { href: string; visible: string };
}

const founders: Founder[] = [
  { nombre: "Karol Cheverria", whatsapp: { href: WHATSAPP_KAROL_DEMO, visible: WHATSAPP_KAROL_VISIBLE } },
  { nombre: "Ximena Baquero" },
];

const iniciales = (nombre: string) =>
  nombre
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

export default function FoundersSection() {
  return (
    <section aria-labelledby="founders-titulo" className="bg-white py-20 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 id="founders-titulo" className="text-sm font-semibold text-teal-700 uppercase tracking-wider">
          Founders
        </h2>
        <ul className="mt-8 flex flex-col sm:flex-row justify-center gap-8 sm:gap-16">
          {founders.map((f, i) => {
            const contenido = (
              <>
                {f.foto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={f.foto} alt="" className="w-16 h-16 rounded-full object-cover" />
                ) : (
                  <span
                    aria-hidden
                    className="w-16 h-16 rounded-full bg-teal-50 border border-teal-100 text-teal-700 font-bold text-lg grid place-items-center"
                  >
                    {iniciales(f.nombre)}
                  </span>
                )}
                <span className="font-semibold text-slate-900">{f.nombre}</span>
                {f.cargo && <span className="text-sm text-slate-500 -mt-2">{f.cargo}</span>}
              </>
            );
            return (
              <Revelar como="li" key={f.nombre} retraso={i * 120} className="flex flex-col items-center gap-3">
                {f.enlace ? (
                  <a href={f.enlace} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 hover:opacity-80">
                    {contenido}
                  </a>
                ) : (
                  contenido
                )}
                {f.whatsapp && (
                  <a
                    href={f.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WhatsApp de ${f.nombre}: ${f.whatsapp.visible}`}
                    className="-mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-[#128C4B] hover:text-[#0d6b39]"
                  >
                    <IconoWhatsApp className="w-4 h-4" />
                    {f.whatsapp.visible}
                  </a>
                )}
              </Revelar>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
