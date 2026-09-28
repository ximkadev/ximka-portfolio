"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { MAILTO_DEMO } from "@/config/contacto";

const enlaces = [
  { href: "/#producto", label: "Producto" },
  { href: "/#demo", label: "Demo" },
  { href: "/#clientes", label: "Clientes" },
  { href: "/tecnologia", label: "Tecnología" },
];

export default function Header() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label="XIMKA, inicio">
          <Logo className="h-8" />
          <span className="text-[19px] font-extrabold tracking-[0.14em] text-slate-900">
            XIMKA
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden md:flex items-center gap-7">
          {enlaces.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors"
            >
              {e.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={MAILTO_DEMO}
            className="inline-flex items-center bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Solicita una demo
          </a>
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden w-10 h-10 grid place-items-center rounded-lg text-slate-700 hover:bg-slate-100"
          >
            {abierto ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {abierto && (
        <nav id="menu-movil" aria-label="Principal" className="md:hidden border-t border-slate-100 bg-white">
          <ul className="px-4 py-2">
            {enlaces.map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  onClick={() => setAbierto(false)}
                  className="block py-3 text-sm font-medium text-slate-700 border-b border-slate-100 last:border-0"
                >
                  {e.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
