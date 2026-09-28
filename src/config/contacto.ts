/**
 * Datos de contacto comercial de XIMKA. Única fuente: los componentes importan
 * los enlaces de aquí en vez de repetir el correo o el número.
 */

export const CORREO = "ximkatech@gmail.com";

/** Número en formato internacional, solo dígitos (lo que espera wa.me). */
export const WHATSAPP_NUMERO = "573242876534";
export const WHATSAPP_VISIBLE = "+57 324 287 6534";

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

export const WHATSAPP_DEMO = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(MENSAJE_DEMO)}`;

/** WhatsApp de Karol Cheverria (founder), como contacto adicional. */
export const WHATSAPP_KAROL_NUMERO = "573232205474";
export const WHATSAPP_KAROL_VISIBLE = "+57 323 220 5474";
export const WHATSAPP_KAROL_DEMO = `https://wa.me/${WHATSAPP_KAROL_NUMERO}?text=${encodeURIComponent(MENSAJE_DEMO)}`;
