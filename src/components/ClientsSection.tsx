import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { casos } from "@/data/casos";
import Revelar from "./Revelar";

// Clínicas que usan XIMKA. Para agregar una, basta con sumarla a
// src/data/casos.ts con tipo "real" y su logo en /public/clientes.
const clientes = casos.filter((c) => c.tipo === "real");

export default function ClientsSection() {
  return (
    <section id="clientes" aria-labelledby="clientes-titulo" className="scroll-mt-16 bg-white py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm font-semibold text-teal-700 uppercase tracking-wider">Clientes</p>
        <h2 id="clientes-titulo" className="mt-3 text-3xl lg:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
          Clínicas que ya trabajan con XIMKA
        </h2>

        <ul className="mt-14 flex flex-wrap justify-center gap-x-14 gap-y-10">
          {clientes.map((c, i) => (
            <Revelar como="li" key={c.slug} retraso={i * 120}>
              <Link href={`/casos#${c.slug}`} className="group flex flex-col items-center gap-3">
                {c.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.logo}
                    alt={`Logo de ${c.nombre}`}
                    width={96}
                    height={96}
                    loading="lazy"
                    className="w-24 h-24 rounded-full object-cover border border-slate-200 bg-white grayscale-[35%] group-hover:grayscale-0 group-hover:scale-105 transition"
                  />
                ) : (
                  <span className="w-24 h-24 rounded-full border border-slate-200 bg-slate-50 grid place-items-center text-lg font-bold text-slate-500">
                    {c.nombre.slice(0, 2)}
                  </span>
                )}
                <span className="font-semibold text-slate-800">{c.nombre}</span>
                <span className="text-sm text-slate-500 -mt-2">{c.especialidad}</span>
              </Link>
            </Revelar>
          ))}
        </ul>

        <Link href="/casos" className="mt-14 inline-flex items-center gap-2 font-semibold text-teal-700 hover:text-teal-600">
          Ver casos
          <ArrowRight className="w-4 h-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
