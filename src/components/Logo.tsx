interface LogoProps {
  /** Alto del logo (clase `h-*`). El ancho sale de la proporción de la imagen. */
  className?: string;
  /** Sobre fondos oscuros va en una placa blanca para no perder contraste. */
  sobreOscuro?: boolean;
}

/**
 * Logo oficial de XIMKA (public/logo-ximka.webp, recortado de
 * public/logoximkasinfondo.png). Se usa la imagen original en lugar de
 * recrearla para no alterar la marca.
 */
export default function Logo({ className = "h-8", sobreOscuro = false }: LogoProps) {
  const imagen = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo-ximka.webp" alt="" aria-hidden width={471} height={385} className={`${className} w-auto`} />
  );
  if (!sobreOscuro) return imagen;
  return <span className="inline-flex items-center justify-center bg-white rounded-lg p-1.5">{imagen}</span>;
}
