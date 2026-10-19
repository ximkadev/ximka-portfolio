/**
 * Identidad pública del sitio: lo que ven buscadores y las vistas previas al
 * compartir un enlace (WhatsApp, LinkedIn, correo).
 */

export const NOMBRE_SITIO = "XIMKA";

export const TITULO_SITIO = "XIMKA — Gestión integral de tu clínica en un solo lugar";

export const DESCRIPCION_SITIO =
  "Historia clínica, pacientes, procedimientos, inventario e información de tu negocio, centralizados en una sola plataforma para clínicas y consultorios.";

/**
 * URL pública del sitio, sin barra final. Sale de `NEXT_PUBLIC_SITE_URL`;
 * si no está definida, en Vercel se usa la URL de producción del proyecto y
 * en local `http://localhost:3000`. Las URL absolutas del sitemap, el
 * canonical y la imagen de vista previa se construyen sobre ella.
 */
function resolverUrlSitio(): string {
  const explicita = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicita) return explicita.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const URL_SITIO = resolverUrlSitio();

/** Rutas públicas del sitio, para el sitemap. */
export const RUTAS_PUBLICAS = ["/", "/historia-clinica-demo", "/casos", "/tecnologia"] as const;
