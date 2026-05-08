import Placeholder from "./Placeholder";

const kpis = [
  {
    icon: "💰",
    title: "Ingresos del periodo",
    description: "Mes actual vs. mes anterior con variación porcentual en tiempo real",
  },
  {
    icon: "👤",
    title: "Nuevos pacientes",
    description: "Contador de pacientes nuevos en el periodo seleccionado",
  },
  {
    icon: "📋",
    title: "Registros clínicos",
    description: "Total de valoraciones creadas en el periodo",
  },
  {
    icon: "✅",
    title: "Procedimientos realizados",
    description: "Solo los CONFIRMADOS — excluye EN ESPERA y CANCELADOS",
  },
  {
    icon: "🏆",
    title: "Top procedimientos por ingresos",
    description: "Los 5 procedimientos que generaron más ingresos en el mes",
  },
  {
    icon: "📈",
    title: "Top procedimientos por demanda",
    description: "Los 5 procedimientos más solicitados por cantidad",
  },
  {
    icon: "👥",
    title: "Desglose por remitente",
    description: "Ingresos y pacientes por médico colaborador — histórico y periodo actual",
  },
  {
    icon: "📅",
    title: "Ingresos semanales",
    description: "Ingresos de la semana actual distribuidos por día",
  },
];

export default function StatsPreviewSection() {
  return (
    <section className="bg-slate-900 py-24 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Texto */}
          <div>
            <span className="text-sm font-semibold text-teal-400 uppercase tracking-wide">
              Panel de estadísticas
            </span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold leading-tight">
              Datos clínicos y financieros en tiempo real
            </h2>
            <p className="mt-4 text-slate-400 leading-relaxed">
              El Médico Líder tiene acceso a un dashboard completo con KPIs del
              negocio. Toda la información se filtra automáticamente para mostrar
              solo los registros{" "}
              <span className="text-green-400 font-semibold">CONFIRMADOS</span> en
              los cálculos financieros.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {kpis.map((kpi) => (
                <div
                  key={kpi.title}
                  className="bg-slate-800 rounded-xl p-4 border border-slate-700"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">{kpi.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">
                        {kpi.title}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {kpi.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshots */}
          <div className="space-y-4">
            <Placeholder
              label="SCREENSHOT: DASHBOARD PRINCIPAL DE ESTADÍSTICAS"
              aspectRatio="video"
              className="border-slate-700 bg-slate-800"
            />
            <div className="grid grid-cols-2 gap-4">
              <Placeholder
                label="SCREENSHOT: TOP PROCEDIMIENTOS"
                aspectRatio="square"
                className="border-slate-700 bg-slate-800"
              />
              <Placeholder
                label="SCREENSHOT: INGRESOS POR REMITENTE"
                aspectRatio="square"
                className="border-slate-700 bg-slate-800"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
