import {
  ArrowRight,
  Camera,
  FileSpreadsheet,
  FolderOpen,
  History,
  MessageCircle,
  NotebookPen,
  Paperclip,
} from "lucide-react";
import Logo from "./Logo";
import Revelar from "./Revelar";

// No se presentan estas herramientas como "malas": el problema es que la
// información de una misma clínica termina repartida entre todas ellas.
const fragmentos = [
  { icono: FolderOpen, lugar: "Carpetas", contenido: "Historias clínicas en papel" },
  { icono: FileSpreadsheet, lugar: "Excel", contenido: "Controles y lista de precios" },
  { icono: MessageCircle, lugar: "WhatsApp", contenido: "La coordinación del día a día" },
  { icono: Camera, lugar: "Celulares", contenido: "Fotografías de antes y después" },
  { icono: NotebookPen, lugar: "Cuadernos", contenido: "Inventario anotado a mano" },
  { icono: Paperclip, lugar: "Archivos sueltos", contenido: "Datos administrativos por separado" },
  { icono: History, lugar: "Memoria del equipo", contenido: "Lo que pasó hace meses, difícil de encontrar" },
];

// Pequeñas variaciones de posición para que el bloque se lea como "disperso".
const desorden = ["lg:-rotate-2", "lg:rotate-1 lg:translate-y-3", "lg:-rotate-1", "lg:rotate-2 lg:-translate-y-2", "lg:rotate-1", "lg:-rotate-2 lg:translate-y-2", "lg:rotate-1 lg:-translate-y-1"];

export default function ProblemSection() {
  return (
    <section id="problema" aria-labelledby="problema-titulo" className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Revelar className="max-w-3xl">
          <p className="text-sm font-semibold text-teal-700 uppercase tracking-wider">El problema</p>
          <h2 id="problema-titulo" className="mt-3 text-3xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
            Tu clínica no debería estar repartida entre cinco herramientas diferentes.
          </h2>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            Cada herramienta sirve para algo. El problema aparece cuando la información de un mismo
            paciente, un mismo procedimiento o un mismo mes queda en lugares distintos y nadie la
            ve completa.
          </p>
        </Revelar>

        <ul className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {fragmentos.map((f, i) => {
            const Icono = f.icono;
            return (
              <Revelar como="li" key={f.lugar} retraso={i * 70} className={desorden[i]}>
                {/* Cada fragmento flota a su ritmo: se lee como información suelta. */}
                <div
                  className="flotar h-full rounded-xl border border-slate-200 bg-slate-50 p-5"
                  style={{ animationDelay: `${-i * 0.9}s`, animationDuration: `${6 + (i % 3)}s` }}
                >
                  <Icono className="w-5 h-5 text-slate-500" aria-hidden />
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-400">{f.lugar}</p>
                  <p className="mt-1 font-medium text-slate-800">{f.contenido}</p>
                </div>
              </Revelar>
            );
          })}
          <Revelar
            como="li"
            retraso={fragmentos.length * 70}
            className="rounded-xl border border-dashed border-slate-300 p-5 flex items-center text-sm text-slate-500 lg:rotate-1"
          >
            …y para ver el panorama completo, alguien tiene que reconstruirlo a mano.
          </Revelar>
        </ul>

        {/* Transición: disperso → XIMKA → centralizado */}
        <Revelar className="mt-20 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-center">
          <span className="px-5 py-3 rounded-full border border-dashed border-slate-300 text-slate-600 font-medium">
            Información dispersa
          </span>
          <span className="rotate-90 md:rotate-0"><ArrowRight className="avanzar w-5 h-5 text-slate-400" aria-hidden /></span>
          <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900 text-white font-semibold">
            <Logo className="h-4" sobreOscuro />
            XIMKA
          </span>
          <span className="rotate-90 md:rotate-0"><ArrowRight className="avanzar w-5 h-5 text-slate-400" aria-hidden /></span>
          <span className="px-5 py-3 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-semibold">
            Información centralizada y trazable
          </span>
        </Revelar>
      </div>
    </section>
  );
}
