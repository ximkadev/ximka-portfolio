import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo className="w-8 h-8 text-teal-600" />
          <span className="text-lg font-bold tracking-tight text-slate-900">
            XIMKA
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/casos"
            className="hidden md:inline text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
          >
            Casos
          </Link>
          <Link
            href="/historia-clinica-demo"
            className="hidden md:inline text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
          >
            Historia clínica demo
          </Link>
          <Link
            href="/tecnologia"
            className="hidden sm:inline text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
          >
            Tecnología
          </Link>
          <Link
            href="/#contacto"
            className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Agenda una demo
          </Link>
        </nav>
      </div>
    </header>
  );
}
