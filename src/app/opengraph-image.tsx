import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { DESCRIPCION_SITIO, NOMBRE_SITIO } from "@/config/sitio";

/**
 * Imagen de vista previa al compartir el enlace (Open Graph / Twitter).
 * Se genera en el build a partir del logo oficial, así no hay que mantener
 * un PNG aparte cada vez que cambie el texto.
 */

export const alt = "XIMKA — Gestión integral de tu clínica en un solo lugar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// El logo va como PNG (satori no rasteriza WebP). Las dimensiones se leen de
// la cabecera IHDR para no clavarlas a mano.
const logoPng = await readFile(join(process.cwd(), "public/logoximkasinfondo.png"));
const logoAncho = logoPng.readUInt32BE(16);
const logoAlto = logoPng.readUInt32BE(20);
const logoAltoRender = 150;
const logoAnchoRender = Math.round((logoAncho / logoAlto) * logoAltoRender);
const logoDataUri = `data:image/png;base64,${logoPng.toString("base64")}`;

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #020617 0%, #0f172a 55%, #134e4a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              display: "flex",
              background: "#ffffff",
              borderRadius: 24,
              padding: 14,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoDataUri} width={logoAnchoRender} height={logoAltoRender} alt="" />
          </div>
          <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: 10 }}>{NOMBRE_SITIO}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>
            <span>Gestión integral de tu clínica</span>
            <span style={{ color: "#2dd4bf" }}>en un solo lugar.</span>
          </div>
          <div style={{ fontSize: 28, color: "#cbd5e1", lineHeight: 1.4, maxWidth: 1000 }}>
            {DESCRIPCION_SITIO}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
