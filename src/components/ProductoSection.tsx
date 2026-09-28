import Link from "next/link";
import { ArrowRight, CalendarDays, Camera, Check, Lock, PenLine } from "lucide-react";

// Funcionalidades del producto. Solo lo verificado en el código de XIMKA; lo que
// aún no está disponible se marca como tal. Los visuales usan datos ficticios.

function Encabezado({ etiqueta, titulo, texto }: { etiqueta: string; titulo: string; texto: string }) {
  return (
    <div>
      <p className="text-sm font-semibold text-teal-700 uppercase tracking-wider">{etiqueta}</p>
      <h3 className="mt-3 text-2xl lg:text-4xl font-bold text-slate-900 leading-tight tracking-tight">{titulo}</h3>
      <p className="mt-4 text-lg text-slate-600 leading-relaxed">{texto}</p>
    </div>
  );
}

function Lista({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
      {items.map((i) => (
        <li key={i} className="flex gap-2.5 text-slate-700">
          <Check className="w-4 h-4 mt-1 text-teal-600 shrink-0" aria-hidden />
          {i}
        </li>
      ))}
    </ul>
  );
}

function Marco({ children, nota = "Ilustración con datos ficticios" }: { children: React.ReactNode; nota?: string }) {
  return (
    <figure>
      <div aria-hidden className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 p-5 select-none">
        {children}
      </div>
      <figcaption className="mt-2 text-xs text-slate-400">{nota}</figcaption>
    </figure>
  );
}

// ── Visuales ─────────────────────────────────────────────────────────────────

function VisualHistoria() {
  const atenciones = [
    { fecha: "Hoy", titulo: "Control", detalle: "Evolución favorable. Se ajusta el plan.", actual: true },
    { fecha: "Hace 1 mes", titulo: "Procedimiento", detalle: "Procedimiento registrado con consentimiento firmado." },
    { fecha: "Hace 2 meses", titulo: "Valoración inicial", detalle: "Antecedentes, examen físico y factores de riesgo." },
  ];
  return (
    <Marco>
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <span className="w-9 h-9 rounded-full bg-teal-50 text-teal-700 text-xs font-bold grid place-items-center">PD</span>
        <div>
          <p className="text-sm font-bold text-slate-900">Paciente Demo</p>
          <p className="text-xs text-slate-400">3 atenciones · 2 antecedentes · 4 fotografías</p>
        </div>
      </div>
      <ol className="mt-4 relative border-l border-slate-200 ml-2 space-y-5">
        {atenciones.map((a) => (
          <li key={a.titulo} className="pl-5 relative">
            <span className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${a.actual ? "bg-teal-500" : "bg-slate-300"}`} />
            <p className="text-[11px] text-slate-400">{a.fecha}</p>
            <p className="text-sm font-semibold text-slate-900">{a.titulo}</p>
            <p className="text-xs text-slate-500">{a.detalle}</p>
          </li>
        ))}
      </ol>
      <p className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
        <Lock className="w-3 h-3" />
        Evaluación confirmada · historial de cambios disponible
      </p>
    </Marco>
  );
}

const ESTADO_STOCK = {
  Disponible: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Crítico: "bg-amber-50 text-amber-700 border-amber-200",
  Agotado: "bg-rose-50 text-rose-700 border-rose-200",
} as const;

function VisualInventario() {
  const productos: { nombre: string; stock: number; minimo: number; estado: keyof typeof ESTADO_STOCK }[] = [
    { nombre: "Guantes de nitrilo (caja)", stock: 24, minimo: 10, estado: "Disponible" },
    { nombre: "Gasas estériles", stock: 6, minimo: 8, estado: "Crítico" },
    { nombre: "Solución antiséptica", stock: 0, minimo: 3, estado: "Agotado" },
    { nombre: "Apósitos", stock: 40, minimo: 15, estado: "Disponible" },
  ];
  return (
    <Marco>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-slate-900">Inventario</p>
        <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
          2 productos por reponer
        </span>
      </div>
      <table className="mt-4 w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wider text-slate-400">
            <th className="font-semibold pb-2">Producto</th>
            <th className="font-semibold pb-2 text-right">Stock</th>
            <th className="font-semibold pb-2 text-right">Mín.</th>
            <th className="font-semibold pb-2 text-right">Estado</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.nombre} className="border-t border-slate-100">
              <td className="py-2 text-slate-800">{p.nombre}</td>
              <td className="py-2 text-right tabular-nums text-slate-800">{p.stock}</td>
              <td className="py-2 text-right tabular-nums text-slate-400">{p.minimo}</td>
              <td className="py-2 text-right">
                <span className={`text-[11px] font-semibold border rounded-md px-1.5 py-0.5 ${ESTADO_STOCK[p.estado]}`}>{p.estado}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Marco>
  );
}

function VisualEstadisticas() {
  const kpis = [
    { k: "Ingresos del mes", v: "vs. mes anterior" },
    { k: "Pacientes atendidos", v: "vs. mes anterior" },
    { k: "Procedimientos", v: "vs. mes anterior" },
  ];
  const barras = [38, 52, 45, 61, 58, 72, 66, 80];
  return (
    <Marco nota="Ilustración: los indicadores se calculan con la información registrada en XIMKA">
      <div className="grid grid-cols-3 gap-3">
        {kpis.map((x) => (
          <div key={x.k} className="rounded-xl bg-slate-50 border border-slate-100 p-3">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{x.k}</p>
            <div className="mt-2 h-4 w-3/4 rounded bg-slate-200" />
            <p className="mt-1.5 text-[10px] text-teal-700 font-semibold">{x.v}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs font-semibold text-slate-500">Tendencia de ingresos</p>
      <div className="mt-2 h-28 flex items-end gap-2">
        {barras.map((h, i) => (
          <div key={i} className={`flex-1 rounded-t-md ${i === barras.length - 1 ? "bg-teal-500" : "bg-teal-200"}`} style={{ height: `${h}%` }} />
        ))}
      </div>
    </Marco>
  );
}

// ── Sección ──────────────────────────────────────────────────────────────────

export default function ProductoSection() {
  return (
    <section id="producto" aria-labelledby="producto-titulo" className="scroll-mt-16 bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-teal-700 uppercase tracking-wider">El producto</p>
          <h2 id="producto-titulo" className="mt-3 text-3xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
            Lo que tu clínica maneja todos los días, en un mismo sistema.
          </h2>
        </div>

        <div className="mt-20 space-y-28">
          {/* Historia clínica y pacientes */}
          <article className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <Encabezado
                etiqueta="Historia clínica y pacientes"
                titulo="La historia del paciente no empieza de cero en cada consulta."
                texto="Cada paciente tiene un registro organizado por secciones, y cada atención se suma a lo que ya estaba. Puedes consultar lo registrado a lo largo de todas sus atenciones."
              />
              <Lista
                items={[
                  "Antecedentes y factores de riesgo",
                  "Examen físico",
                  "Signos vitales e IMC",
                  "Diagnósticos",
                  "Procedimientos",
                  "Evolución y controles",
                  "Historial de cambios",
                  "Registro bloqueado al confirmar",
                ]}
              />
              <Link href="/historia-clinica-demo" className="mt-8 inline-flex items-center gap-2 font-semibold text-teal-700 hover:text-teal-600">
                Ver historia clínica demo
                <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
            </div>
            <VisualHistoria />
          </article>

          {/* Inventario */}
          <article className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="lg:order-2">
              <Encabezado
                etiqueta="Inventario bajo control"
                titulo="Un insumo se termina y te enteras cuando ya lo necesitas."
                texto="Con XIMKA sabes qué hay, qué entró, qué se consumió y qué está por acabarse, antes de que falte en plena atención."
              />
              <Lista
                items={[
                  "Productos y categorías",
                  "Stock actual y stock mínimo",
                  "Entradas por compra",
                  "Consumos registrados",
                  "Productos críticos y agotados",
                  "Gasto por categoría y proveedor",
                ]}
              />
            </div>
            <div className="lg:order-1">
              <VisualInventario />
            </div>
          </article>

          {/* Estadísticas */}
          <article className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <Encabezado
                etiqueta="Estadísticas del negocio"
                titulo="Entiende cómo está funcionando tu clínica."
                texto="Consulta la actividad del negocio sin reconstruirla a mano desde distintas fuentes: sale directamente de lo que se registra en la operación."
              />
              <Lista
                items={[
                  "Ingresos, pacientes y procedimientos del mes",
                  "Comparación con el mes anterior",
                  "Procedimientos más solicitados",
                  "Procedimientos que más ingresos generan",
                  "Tendencia de ingresos",
                  "Comparativos mensuales y anuales",
                ]}
              />
            </div>
            <VisualEstadisticas />
          </article>
        </div>

        {/* Complementos de la atención */}
        <div className="mt-28 grid md:grid-cols-3 gap-10 border-t border-slate-200 pt-16">
          <div>
            <Camera className="w-6 h-6 text-teal-700" aria-hidden />
            <h3 className="mt-4 text-lg font-bold text-slate-900">
              El antes y después también forma parte de la historia del paciente.
            </h3>
            <p className="mt-2 text-slate-600 leading-relaxed">
              Las fotografías clínicas quedan asociadas al paciente y a su atención, en
              almacenamiento privado. No terminan dispersas en celulares sin contexto.
            </p>
          </div>
          <div>
            <PenLine className="w-6 h-6 text-teal-700" aria-hidden />
            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Gestión de consentimientos asociados a la atención.
            </h3>
            <p className="mt-2 text-slate-600 leading-relaxed">
              El paciente firma en pantalla y el consentimiento queda guardado junto con su
              registro clínico, en un documento PDF.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <CalendarDays className="w-6 h-6 text-teal-700" aria-hidden />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
                En desarrollo
              </span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">Agenda conectada con la atención.</h3>
            <p className="mt-2 text-slate-600 leading-relaxed">
              Estamos integrando la agenda para que las citas vivan en el mismo entorno que la
              historia del paciente y sus procedimientos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
