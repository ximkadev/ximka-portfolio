import { useId } from "react";

interface LogoProps {
  className?: string;
  /** Color de las flechas del centro. Por defecto, el menta de la marca. */
  acento?: string;
}

/**
 * Marca XIMKA (public/logoximkasinfondo.png) recreada como SVG: una X con barra
 * vertical, cortada en el centro por dos flechas que apuntan hacia adentro.
 * El trazo usa `currentColor`, así que se recolorea con la clase `text-*`.
 */
export default function Logo({ className = "", acento = "#d7f8ee" }: LogoProps) {
  const mascara = useId();
  return (
    <svg viewBox="0 0 100 100" role="img" aria-label="XIMKA" className={className}>
      <defs>
        <mask id={mascara}>
          <rect width="100" height="100" fill="black" />
          <g fill="white">
            <polygon points="13,19.5 25.8,19.5 86.4,79.2 73.6,79.2" />
            <polygon points="73.6,19.5 86.4,19.5 25.8,79.2 13,79.2" />
          </g>
          {/* Franja central: interrumpe las diagonales donde van las flechas. */}
          <rect x="30" y="40" width="40" height="18.5" fill="black" />
          <rect x="45.3" y="19.5" width="8.8" height="59.7" fill="white" />
        </mask>
      </defs>
      <rect width="100" height="100" fill="currentColor" mask={`url(#${mascara})`} />
      <g fill={acento}>
        <polygon points="36,41 41.8,41 45.3,49.25 41.8,57.5 36,57.5 39.5,49.25" />
        <polygon points="63.4,41 57.6,41 54.1,49.25 57.6,57.5 63.4,57.5 59.9,49.25" />
      </g>
    </svg>
  );
}
