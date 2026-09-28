/**
 * Casos que se muestran en /casos.
 *
 * Reglas para agregar o editar un caso:
 * - `tipo: "real"` solo para clínicas que usan XIMKA en producción.
 * - `tipo: "demo"` para escenarios de referencia o conceptos que no están en
 *   producción. Se muestran marcados como demostrativos y nunca como cliente.
 * - `resultados` debe contener únicamente resultados confirmados por el
 *   cliente. Si aún no hay resultados validados, déjalo como arreglo vacío y
 *   la página mostrará "Resultados pendientes de validar con el cliente".
 * - `testimonio` solo con autorización del cliente; si no existe, omítelo.
 */

export type TipoCaso = "real" | "demo";

export interface Caso {
  slug: string;
  tipo: TipoCaso;
  nombre: string;
  especialidad: string;
  /** Situación de la clínica antes de XIMKA. */
  problema: string;
  /** Cómo se utiliza (o se utilizaría, en un demo) XIMKA. */
  usoXimka: string[];
  /** Módulos de XIMKA involucrados. */
  modulos: string[];
  /** Resultados confirmados (casos reales) o beneficios esperados (demos). */
  resultados: string[];
  testimonio?: { cita: string; autor: string; cargo: string };
  /** Ruta a imagen en /public. Si no existe se muestra un placeholder. */
  imagen?: string;
  /** Logo del cliente en /public (solo casos reales, con autorización). */
  logo?: string;
}

export const casos: Caso[] = [
  {
    slug: "cold-esthetic",
    tipo: "real",
    nombre: "Coldesthetic",
    logo: "/clientes/coldesthetic.webp",
    especialidad: "Medicina estética",
    problema:
      "Pendiente de documentar con la clínica: situación antes de usar XIMKA.",
    usoXimka: [
      "Historia clínica digital de cada paciente.",
      "Registro de procedimientos realizados.",
      "Cifras del negocio en un solo lugar.",
    ],
    modulos: ["Historia clínica", "Procedimientos", "Estadísticas"],
    resultados: [],
  },
  {
    slug: "perfect-esthetic",
    tipo: "real",
    nombre: "Perfectesthetic",
    logo: "/clientes/perfectesthetic.webp",
    especialidad: "Medicina estética",
    problema:
      "Pendiente de documentar con la clínica: situación antes de usar XIMKA.",
    usoXimka: [
      "Gestión de pacientes.",
      "Control de inventario.",
      "Estadísticas de la actividad del negocio.",
    ],
    modulos: ["Pacientes", "Inventario", "Estadísticas"],
    resultados: [],
  },
  {
    slug: "podocare",
    tipo: "real",
    nombre: "PodoCare",
    logo: "/clientes/podocare.webp",
    especialidad: "Podología",
    problema:
      "Pendiente de documentar con la clínica: situación antes de usar XIMKA.",
    usoXimka: [
      "Registro de cada tratamiento y procedimiento.",
      "Trazabilidad de la atención de cada paciente.",
    ],
    modulos: ["Historia clínica", "Procedimientos", "Trazabilidad"],
    resultados: [],
  },
  {
    slug: "consultorio-referencia",
    tipo: "demo",
    nombre: "Consultorio de referencia",
    especialidad: "Escenario genérico · cualquier especialidad",
    problema:
      "Un consultorio con historias en papel, inventario en Excel y la agenda coordinada por WhatsApp. La información está dispersa y no hay forma rápida de saber cuánto factura el mes.",
    usoXimka: [
      "La historia clínica de cada paciente se diligencia en XIMKA y queda bloqueada al confirmarse.",
      "Los consumos de insumos se registran en el inventario y el sistema señala los productos por reponer.",
      "La administradora consulta ingresos y procedimientos del mes sin sumar a mano.",
    ],
    modulos: [
      "Historia clínica",
      "Procedimientos",
      "Inventario",
      "Estadísticas",
    ],
    resultados: [
      "Toda la información del paciente en un solo lugar.",
      "Visibilidad de qué insumos están por acabarse.",
      "Visibilidad inmediata de las cifras del negocio.",
    ],
  },
];
