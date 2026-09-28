import { BookOpenText, Check, ClipboardList, FileCheck, HeartPulse, Stethoscope } from "lucide-react";
import { ESTADO_INICIAL, PACIENTE } from "@/data/historia-demo";

/**
 * Vista previa estática de la historia clínica demo (/historia-clinica-demo),
 * con sus mismos datos ficticios y su mismo lenguaje visual. No es interactiva:
 * invita a abrir la demo real.
 */
export default function VistaPreviaHistoria() {
  const toma = ESTADO_INICIAL.signos[0];
  const dx = ESTADO_INICIAL.diagnosticos[0];
  const imc = toma.peso && toma.talla ? (toma.peso / (toma.talla * toma.talla)).toFixed(1) : "—";

  const signos = [
    { k: "Presión arterial", v: `${toma.paSistolica}/${toma.paDiastolica}` },
    { k: "FC", v: `${toma.fc} lpm` },
    { k: "SpO₂", v: `${toma.spo2} %` },
    { k: "Temp.", v: `${toma.temperatura} °C` },
    { k: "Peso", v: `${toma.peso} kg` },
    { k: "IMC", v: imc },
  ];

  const pasos = [
    { t: "Antecedentes", i: ClipboardList, hecho: true },
    { t: "Evaluación clínica", i: Stethoscope, hecho: true },
    { t: "Procedimientos y cierre", i: FileCheck, hecho: false },
  ];

  return (
    <div
      aria-hidden
      className="rounded-2xl bg-slate-50 border border-white/10 shadow-2xl shadow-black/40 p-3 sm:p-4 text-left select-none"
    >
      <div className="bg-white rounded-xl border border-slate-200/60 px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#cffff0] text-slate-800 text-xs font-bold grid place-items-center">
          PD
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <BookOpenText className="w-4 h-4 text-[#0FB888]" />
            Historia clínica
          </p>
          <p className="text-[10px] text-slate-500 truncate">
            {PACIENTE.nombre} · {PACIENTE.edad} años · datos ficticios
          </p>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          Borrador
        </span>
      </div>

      <div className="mt-3 flex gap-3">
        <div className="hidden sm:block w-40 shrink-0 bg-white rounded-xl border border-[#9ef0d8]/60 p-3">
          <p className="text-[11px] font-bold text-slate-900 mb-3">Registro clínico</p>
          <ol className="space-y-3">
            {pasos.map((p, i) => {
              const Icono = p.i;
              return (
                <li key={p.t} className="flex items-center gap-2">
                  <span
                    className={`w-5 h-5 rounded-full grid place-items-center text-[9px] font-black border-2 ${
                      p.hecho ? "bg-[#0FB888] border-[#0FB888] text-white" : "border-[#0FB888] text-[#0FB888]"
                    }`}
                  >
                    {p.hecho ? <Check className="w-3 h-3" /> : i + 1}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-600 flex items-center gap-1 truncate">
                    <Icono className="w-3 h-3 shrink-0" />
                    {p.t}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="flex-1 min-w-0 space-y-3">
          <div className="rounded-xl bg-gradient-to-r from-[#0b8f6b] to-[#0FB888] px-3 py-2.5">
            <p className="text-xs font-bold text-white">Evaluación clínica</p>
            <p className="text-[10px] text-white/80">Examen físico y signos vitales</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
            <p className="px-3 py-2 border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-900 flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5 text-slate-400" />
              Signos vitales
            </p>
            <dl className="p-3 grid grid-cols-3 gap-2.5">
              {signos.map((s) => (
                <div key={s.k}>
                  <dt className="text-[8px] uppercase tracking-wider text-slate-400 font-semibold">{s.k}</dt>
                  <dd className="text-xs font-medium text-slate-800">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/60 p-3 flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase bg-[#cffff0]/70 text-slate-800 border border-[#9ef0d8]">
              Principal
            </span>
            <p className="text-[11px] text-slate-700 truncate">
              <span className="font-mono font-bold">{dx.cie.codigo}</span> · {dx.cie.titulo}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
