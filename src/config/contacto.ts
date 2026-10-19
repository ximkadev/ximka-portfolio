/**
 * Datos de contacto comercial de XIMKA. Única fuente: los componentes importan
 * los enlaces de aquí en vez de repetir el correo.
 *
 * El único canal publicado es el correo: no se muestra ningún número.
 */

export const CORREO = "ximkatech@gmail.com";

export const MENSAJE_DEMO = "Hola, quiero conocer XIMKA y solicitar una demostración.";

const ASUNTO_DEMO = "Solicitud de demo de XIMKA";

const CUERPO_DEMO = [
  MENSAJE_DEMO,
  "",
  "Nombre:",
  "Clínica o consultorio:",
  "Ciudad:",
  "Número de contacto:",
].join("\n");

export const MAILTO_DEMO = `mailto:${CORREO}?subject=${encodeURIComponent(ASUNTO_DEMO)}&body=${encodeURIComponent(CUERPO_DEMO)}`;

export const MAILTO_CONTACTO = `mailto:${CORREO}`;
