import Placeholder from "./Placeholder";
import Logo from "./Logo";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(20,184,166,0.15),_transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Texto */}
          <div className="space-y-8">
            <Logo className="w-16 h-16 text-teal-400" />

            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-sm text-teal-300 font-medium">
                Ya en producción en clínicas reales en Colombia
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight">
              Tu clínica entera
              <span className="block text-teal-400 mt-1">
                en un solo lugar
              </span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
              Historia clínica, procedimientos, inventario y las cifras de tu
              negocio — sin carpetas de papel, sin Excel suelto, sin grupos de
              WhatsApp. XIMKA ya opera en clínicas reales en Colombia.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Agenda una demo
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                {/* Ícono WhatsApp */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.127 1.534 5.862L.057 23.997l6.304-1.654A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.371l-.36-.213-3.724.977.994-3.634-.234-.374A9.818 9.818 0 112 12 9.818 9.818 0 0112 21.818z" />
                </svg>
                Contactar por WhatsApp
              </a>
            </div>

            {/* Estadísticas rápidas */}
            <div className="flex flex-wrap gap-8 pt-4 border-t border-white/10">
              {[
                { value: "3", label: "Clínicas en producción" },
                { value: "100%", label: "Digital y centralizado" },
                { value: "Tiempo real", label: "Cifras de tu negocio" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-teal-400">{stat.value}</p>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshot placeholder */}
          <div className="lg:block">
            <Placeholder
              label="SCREENSHOT O VIDEO DEL DASHBOARD PRINCIPAL"
              aspectRatio="video"
              className="shadow-2xl shadow-black/40 border-slate-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
