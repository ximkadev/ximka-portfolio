import Link from "next/link";
import { ArrowRight, DatabaseBackup, FolderLock, History, KeyRound, LayoutList, Server } from "lucide-react";
import Revelar from "./Revelar";

// Atributos del sistema contados desde lo que le importa a una clínica. Todo
// verificado en el código de XIMKA; las tecnologías quedan como dato secundario.
const atributos = [
  {
    icono: LayoutList,
    titulo: "Información organizada",
    texto: "Un registro único por paciente, con su información clínica separada por secciones y sin duplicados.",
  },
  {
    icono: History,
    titulo: "Trazabilidad",
    texto: "Las evaluaciones confirmadas se bloquean y los cambios quedan registrados con autor y fecha.",
  },
  {
    icono: KeyRound,
    titulo: "Acceso controlado",
    texto: "Cada persona entra con su usuario y ve lo que su rol permite. Un usuario desactivado pierde el acceso.",
  },
  {
    icono: FolderLock,
    titulo: "Fotografías y documentos privados",
    texto: "Se guardan en almacenamiento privado y se consultan con enlaces temporales, nunca en una URL pública.",
  },
  {
    icono: DatabaseBackup,
    titulo: "Copias de seguridad",
    texto: "Respaldos automáticos y cifrados, para que la información no dependa de que alguien se acuerde.",
  },
  {
    icono: Server,
    titulo: "Preparado para crecer",
    texto: "Una arquitectura pensada para centralizar la operación y sumar módulos sin rehacer el sistema.",
  },
];

export default function SecuritySection() {
  return (
    <section aria-labelledby="confianza-titulo" className="bg-slate-50 border-y border-slate-200/70 py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-teal-700 uppercase tracking-wider">Tecnología</p>
          <h2 id="confianza-titulo" className="mt-3 text-3xl lg:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
            Un sistema pensado para información clínica real.
          </h2>
        </div>

        <ul className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {atributos.map((a, i) => {
            const Icono = a.icono;
            return (
              <Revelar como="li" key={a.titulo} retraso={(i % 3) * 110}>
                <Icono className="w-6 h-6 text-teal-700" aria-hidden />
                <h3 className="mt-4 font-bold text-slate-900">{a.titulo}</h3>
                <p className="mt-1.5 text-slate-600 leading-relaxed">{a.texto}</p>
              </Revelar>
            );
          })}
        </ul>

        <div className="mt-14 pt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm text-slate-500">
          <p>Construido con Laravel, Next.js, MySQL y almacenamiento de objetos compatible con S3.</p>
          <Link href="/tecnologia" className="inline-flex items-center gap-1.5 font-semibold text-teal-700 hover:text-teal-600 shrink-0">
            Ver detalle técnico
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
