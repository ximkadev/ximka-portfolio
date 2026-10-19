import { Mail } from "lucide-react";
import { MAILTO_DEMO } from "@/config/contacto";

/** CTA de demo: solo correo, que es el único canal de contacto publicado. */
export default function BotonesDemo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <a
        href={MAILTO_DEMO}
        className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 hover:-translate-y-0.5 text-white font-semibold px-6 py-3 rounded-lg transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
      >
        <Mail className="w-4 h-4" aria-hidden />
        Solicita una demo
      </a>
    </div>
  );
}
