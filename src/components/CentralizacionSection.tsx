import {
  Camera,
  ChartColumn,
  FileText,
  History,
  NotebookPen,
  Package,
  Stethoscope,
  UserRound,
} from "lucide-react";
import Revelar from "./Revelar";

const modulos = [
  { icono: Stethoscope, label: "Historia clínica" },
  { icono: NotebookPen, label: "Procedimientos" },
  { icono: Camera, label: "Fotografías" },
  { icono: FileText, label: "Consentimientos" },
  { icono: Package, label: "Inventario" },
  { icono: ChartColumn, label: "Estadísticas" },
];

// Ejemplos concretos en lugar de repetir "centralización" y "trazabilidad".
const ejemplos = [
  {
    titulo: "La consulta de hoy parte de lo que ya se sabe",
    texto:
      "Antecedentes, controles anteriores y fotografías del paciente están en su registro. No hay que volver a preguntar ni buscar en otra carpeta.",
  },
  {
    titulo: "Cada cambio deja rastro",
    texto:
      "Una evaluación confirmada queda bloqueada. Si hay que corregirla, la corrección queda registrada con quién la hizo, cuándo y por qué.",
  },
  {
    titulo: "Las cifras salen de la operación",
    texto:
      "Los procedimientos registrados alimentan las estadísticas del negocio. Nadie tiene que reconstruir el mes en una hoja de cálculo.",
  },
];

export default function CentralizacionSection() {
  // overflow-x-clip: el anillo que gira sobresale unos píxeles del ancho en
  // pantallas angostas y, sin esto, la página entera ganaba scroll horizontal.
  return (
    <section aria-labelledby="solucion-titulo" className="overflow-x-clip bg-slate-50 border-y border-slate-200/70 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-sm font-semibold text-teal-700 uppercase tracking-wider">La solución</p>
          <h2 id="solucion-titulo" className="mt-3 text-3xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
            XIMKA reúne la operación de tu clínica en un solo sistema.
          </h2>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            Lo que pasa con cada paciente —su atención, sus procedimientos, sus fotografías y sus
            consentimientos— queda en un mismo lugar, junto con el inventario y las cifras de la
            clínica.
          </p>

          <dl className="mt-10 space-y-6">
            {ejemplos.map((e, i) => (
              <Revelar key={e.titulo} retraso={i * 120} className="border-l-2 border-teal-500 pl-5">
                <dt className="font-semibold text-slate-900">{e.titulo}</dt>
                <dd className="mt-1 text-slate-600 leading-relaxed">{e.texto}</dd>
              </Revelar>
            ))}
          </dl>
        </div>

        {/* El paciente en el centro, con lo que cuelga de su registro alrededor. */}
        <Revelar retraso={150}>
        <div aria-hidden className="orbita-pausable relative mx-auto w-full max-w-md aspect-square">
          <div className="absolute inset-[36%] rounded-full bg-white border border-slate-200 shadow-lg grid place-items-center text-center">
            <div>
              <UserRound className="w-7 h-7 mx-auto text-teal-600" />
              <p className="mt-1 text-sm font-bold text-slate-900">Paciente</p>
              <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <History className="w-3 h-3" />
                registro único
              </p>
            </div>
          </div>
          {/* El anillo con los módulos gira alrededor del paciente. */}
          <div className="orbita absolute inset-0">
            <div className="absolute inset-[18%] rounded-full border border-dashed border-teal-300" />
          {modulos.map((m, i) => {
            const angulo = (i / modulos.length) * 2 * Math.PI - Math.PI / 2;
            const x = 50 + 41 * Math.cos(angulo);
            const y = 50 + 41 * Math.sin(angulo);
            const Icono = m.icono;
            return (
              <div
                key={m.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {/* Gira al revés que el anillo: el módulo se mantiene derecho. */}
                <div className="orbita-contraria flex flex-col items-center gap-1.5">
                  <span className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm grid place-items-center">
                    <Icono className="w-5 h-5 text-teal-700" />
                  </span>
                  <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">{m.label}</span>
                </div>
              </div>
            );
          })}
          </div>
        </div>
        </Revelar>
      </div>
    </section>
  );
}
