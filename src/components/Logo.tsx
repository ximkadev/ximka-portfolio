interface LogoProps {
  className?: string;
}

/**
 * Marca XIMKA recreada como SVG geométrico.
 * Usa `currentColor`, así que se recolorea con la clase `text-*`.
 * El centro (flechas que apuntan hacia adentro) es transparente: deja ver el
 * fondo, por lo que funciona tanto sobre claro como sobre oscuro.
 */
export default function Logo({ className = "" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label="XIMKA"
      className={className}
    >
      <defs>
        <mask id="ximkaLogoMask">
          <rect width="100" height="100" fill="black" />
          <g fill="white">
            {/* Barra vertical central */}
            <rect x="44" y="10" width="12" height="80" />
            {/* Diagonal \ (esquina superior izq → inferior der) */}
            <polygon points="8,14 24,14 92,86 76,86" />
            {/* Diagonal / (esquina superior der → inferior izq) */}
            <polygon points="76,14 92,14 24,86 8,86" />
          </g>
          {/* Cruz de salud calada en el centro (brazos iguales) */}
          <rect x="48" y="43" width="4" height="14" fill="black" />
          <rect x="43" y="48" width="14" height="4" fill="black" />
        </mask>
      </defs>
      <rect
        width="100"
        height="100"
        fill="currentColor"
        mask="url(#ximkaLogoMask)"
      />
    </svg>
  );
}
