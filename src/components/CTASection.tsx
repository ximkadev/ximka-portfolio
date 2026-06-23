import Logo from "./Logo";

export default function CTASection() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white">
      {/* CTA principal */}
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl lg:text-5xl font-bold leading-tight mb-6">
          Ordena tu clínica hoy
        </h2>
        <p className="text-lg text-slate-300 max-w-xl mx-auto mb-10">
          Agenda una demo y te mostramos XIMKA funcionando con los procesos de tu
          propia clínica.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          {/* Agenda una demo */}
          <a
            href="#"
            className="inline-flex items-center gap-3 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
          >
            Agenda una demo
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href="#"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.127 1.534 5.862L.057 23.997l6.304-1.654A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.371l-.36-.213-3.724.977.994-3.634-.234-.374A9.818 9.818 0 112 12 9.818 9.818 0 0112 21.818z" />
            </svg>
            Escribirnos por WhatsApp
          </a>

          {/* Correo */}
          <a
            href="mailto:#"
            className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Enviar un correo
          </a>
        </div>
      </div>

      {/* Divisor */}
      <div className="border-t border-white/10" />

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2">
            <Logo className="w-6 h-6 text-teal-400" />
            <span className="font-bold text-white text-base">XIMKA</span>
          </span>
          <span>·</span>
          <span>Toda tu clínica en un solo lugar</span>
        </div>

        <div className="flex items-center gap-4">
          <span>Bogotá, Colombia · 2025–2026</span>
          <span>·</span>
          <span>
            Desarrollado por{" "}
            <a href="#" className="text-teal-400 hover:text-teal-300 transition-colors">
              @ximenabaquero
            </a>{" "}
            &{" "}
            <a href="#" className="text-teal-400 hover:text-teal-300 transition-colors">
              @karol-cc
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
