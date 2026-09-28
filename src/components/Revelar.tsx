"use client";

import { createElement, useCallback, useState, type ReactNode } from "react";

/**
 * Aparición suave al entrar en pantalla (fundido + desplazamiento corto).
 * Solo oculta el contenido cuando hay JavaScript (ver `.revelar` en
 * globals.css) y respeta `prefers-reduced-motion`.
 */
export default function Revelar({
  children,
  retraso = 0,
  como = "div",
  className = "",
}: {
  children: ReactNode;
  /** Milisegundos, para escalonar elementos de una lista. */
  retraso?: number;
  como?: "div" | "li" | "article";
  className?: string;
}) {
  const [visible, setVisible] = useState(false);

  // Callback ref con limpieza (React 19): observa el elemento hasta que
  // aparece una vez en pantalla.
  const observar = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true);
          limpiar();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observador.observe(el);

    // Red de seguridad por si el observador no responde (pestaña que no
    // dibuja, navegador limitado): si el elemento ya está en pantalla, se
    // muestra igual. Así el contenido nunca se queda invisible.
    const enPantalla = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        setVisible(true);
        limpiar();
      }
    };
    const respaldo = window.setTimeout(enPantalla, 1500);
    window.addEventListener("scroll", enPantalla, { passive: true });
    function limpiar() {
      observador.disconnect();
      window.clearTimeout(respaldo);
      window.removeEventListener("scroll", enPantalla);
    }
    return limpiar;
  }, []);

  return createElement(
    como,
    {
      ref: observar,
      className: `revelar ${visible ? "revelar-visible" : ""} ${className}`,
      style: retraso ? { transitionDelay: `${retraso}ms` } : undefined,
    },
    children,
  );
}
