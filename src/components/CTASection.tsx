import Link from "next/link";
import { Mail } from "lucide-react";
import Logo from "./Logo";
import BotonesDemo, { IconoWhatsApp } from "./BotonesDemo";
import {
  CORREO,
  MAILTO_CONTACTO,
  WHATSAPP_DEMO,
  WHATSAPP_KAROL_DEMO,
  WHATSAPP_KAROL_VISIBLE,
  WHATSAPP_VISIBLE,
} from "@/config/contacto";

const navegacion = [
  { href: "/#producto", label: "Producto" },
  { href: "/historia-clinica-demo", label: "Historia clínica demo" },
  { href: "/casos", label: "Casos" },
  { href: "/tecnologia", label: "Tecnología" },
];

export default function CTASection() {
  return (
    <footer id="contacto" className="bg-slate-950 text-white">
      {/* CTA final */}
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl lg:text-5xl font-bold leading-tight tracking-tight">
          Conoce XIMKA con los procesos de tu clínica
        </h2>
        <p className="mt-5 text-lg text-slate-300 max-w-xl mx-auto">
          Cuéntanos cómo trabajas hoy y te mostramos cómo se vería tu operación en un solo
          sistema.
        </p>
        <BotonesDemo className="mt-10 justify-center" />
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 sm:grid-cols-3 text-sm">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <Logo className="h-6" sobreOscuro />
              <span className="font-extrabold tracking-[0.14em] text-base">XIMKA</span>
            </Link>
            <p className="mt-3 text-slate-400 max-w-xs">
              Gestión integral para clínicas y consultorios.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-200">Contacto</h3>
            <ul className="mt-3 space-y-2 text-slate-400">
              <li>
                <a href={MAILTO_CONTACTO} className="inline-flex items-center gap-2 hover:text-teal-300">
                  <Mail className="w-4 h-4" aria-hidden />
                  {CORREO}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_DEMO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-teal-300"
                >
                  <IconoWhatsApp className="w-4 h-4" />
                  {WHATSAPP_VISIBLE}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_KAROL_DEMO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-teal-300"
                >
                  <IconoWhatsApp className="w-4 h-4" />
                  {WHATSAPP_KAROL_VISIBLE}
                  <span className="text-slate-500">· Karol Cheverria</span>
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Pie de página">
            <h3 className="font-semibold text-slate-200">Explorar</h3>
            <ul className="mt-3 space-y-2 text-slate-400">
              {navegacion.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:text-teal-300">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="max-w-7xl mx-auto px-6 pb-8 text-xs text-slate-500">
          © {new Date().getFullYear()} XIMKA · Bogotá, Colombia
        </p>
      </div>
    </footer>
  );
}
