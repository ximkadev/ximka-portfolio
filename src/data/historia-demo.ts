/**
 * Historia clínica DEMOSTRATIVA para presentaciones comerciales.
 *
 * Todos los datos son ficticios y genéricos. No uses aquí información de
 * pacientes reales ni datos copiados de producción.
 *
 * Cada sección corresponde a un paso del flujo. Para adaptarla a un cliente,
 * edita los campos o agrega secciones; la página las recorre en orden.
 */

export interface Campo {
  etiqueta: string;
  valor: string;
}

export interface Tabla {
  columnas: string[];
  filas: string[][];
}

export interface EventoTimeline {
  fecha: string;
  titulo: string;
  detalle: string;
}

export interface SeccionHistoria {
  id: string;
  titulo: string;
  /** Qué capacidad de XIMKA muestra este paso. */
  capacidad: string;
  campos?: Campo[];
  tabla?: Tabla;
  timeline?: EventoTimeline[];
  fotos?: string[];
  nota?: string;
}

export const pacienteDemo = {
  nombre: "Paciente Demo",
  documento: "ID-DEMO-0001",
  edad: "35 años",
  profesional: "Profesional Demo",
  sede: "Sede Principal (demo)",
};

export const seccionesHistoria: SeccionHistoria[] = [
  {
    id: "datos",
    titulo: "Datos del paciente",
    capacidad:
      "Ficha única del paciente. Se registra una sola vez y queda disponible en todas sus atenciones.",
    campos: [
      { etiqueta: "Nombre", valor: pacienteDemo.nombre },
      { etiqueta: "Documento", valor: pacienteDemo.documento },
      { etiqueta: "Edad", valor: pacienteDemo.edad },
      { etiqueta: "Teléfono", valor: "300 000 0000" },
      { etiqueta: "Correo", valor: "paciente@demo.com" },
      { etiqueta: "Profesional asignado", valor: pacienteDemo.profesional },
    ],
  },
  {
    id: "consulta",
    titulo: "Motivo de consulta y anamnesis",
    capacidad:
      "Registro estructurado de la consulta. Los campos se ajustan a la especialidad de cada clínica.",
    campos: [
      {
        etiqueta: "Motivo de consulta",
        valor: "Valoración inicial para el tratamiento solicitado.",
      },
      {
        etiqueta: "Enfermedad actual",
        valor:
          "Paciente refiere molestia leve de dos semanas de evolución. Sin tratamientos previos.",
      },
      { etiqueta: "Expectativas del paciente", valor: "Mejoría del síntoma." },
    ],
  },
  {
    id: "antecedentes",
    titulo: "Antecedentes",
    capacidad:
      "Antecedentes y alergias visibles en toda la historia para una atención segura.",
    campos: [
      { etiqueta: "Personales", valor: "No refiere." },
      { etiqueta: "Familiares", valor: "No refiere." },
      { etiqueta: "Alergias", valor: "Ninguna conocida." },
      { etiqueta: "Medicamentos actuales", valor: "Ninguno." },
    ],
  },
  {
    id: "evaluacion",
    titulo: "Evaluación clínica",
    capacidad: "Hallazgos del examen y signos vitales de cada atención.",
    campos: [
      { etiqueta: "Presión arterial", valor: "120/80 mmHg" },
      { etiqueta: "Frecuencia cardíaca", valor: "72 lpm" },
      { etiqueta: "Peso", valor: "65 kg" },
      { etiqueta: "Talla", valor: "1,68 m" },
      {
        etiqueta: "Hallazgos",
        valor: "Sin hallazgos de alarma. Zona de tratamiento sin signos de infección.",
      },
    ],
  },
  {
    id: "plan",
    titulo: "Diagnóstico y plan de tratamiento",
    capacidad:
      "El plan queda asociado a los procedimientos que se realizarán en cada sesión.",
    campos: [
      { etiqueta: "Impresión diagnóstica", valor: "Diagnóstico de ejemplo." },
      {
        etiqueta: "Plan",
        valor: "Tres sesiones del procedimiento de ejemplo, una cada 15 días.",
      },
      {
        etiqueta: "Recomendaciones",
        valor: "Cuidados generales posteriores al procedimiento.",
      },
    ],
  },
  {
    id: "procedimiento",
    titulo: "Procedimiento e insumos",
    capacidad:
      "Al registrar el procedimiento, los insumos usados se descuentan automáticamente del inventario.",
    campos: [
      { etiqueta: "Procedimiento", valor: "Procedimiento de ejemplo — sesión 1 de 3" },
      { etiqueta: "Realizado por", valor: pacienteDemo.profesional },
    ],
    tabla: {
      columnas: ["Insumo", "Cantidad", "Stock antes", "Stock después"],
      filas: [
        ["Insumo A (demo)", "1", "20", "19"],
        ["Insumo B (demo)", "2", "50", "48"],
        ["Material desechable (demo)", "1", "100", "99"],
      ],
    },
  },
  {
    id: "fotos",
    titulo: "Registro fotográfico",
    capacidad:
      "Fotos clínicas en almacenamiento privado con acceso temporal firmado. No quedan en URLs públicas.",
    fotos: ["Antes (demo)", "Después (demo)"],
    nota: "Imágenes ilustrativas. En XIMKA solo las ven usuarios autorizados.",
  },
  {
    id: "evolucion",
    titulo: "Evolución y seguimiento",
    capacidad:
      "Línea de tiempo con todas las atenciones del paciente, en orden.",
    timeline: [
      {
        fecha: "Día 1",
        titulo: "Valoración inicial",
        detalle: "Se registra historia clínica y plan de tratamiento.",
      },
      {
        fecha: "Día 1",
        titulo: "Sesión 1 de 3",
        detalle: "Procedimiento realizado sin complicaciones.",
      },
      {
        fecha: "Día 15",
        titulo: "Sesión 2 de 3",
        detalle: "Paciente refiere mejoría. Se continúa el plan.",
      },
      {
        fecha: "Día 30",
        titulo: "Sesión 3 de 3 (programada)",
        detalle: "Pendiente.",
      },
    ],
  },
  {
    id: "trazabilidad",
    titulo: "Confirmación y trazabilidad",
    capacidad:
      "Una evaluación confirmada queda bloqueada para edición. Cada cambio guarda quién lo hizo y cuándo.",
    tabla: {
      columnas: ["Acción", "Usuario", "Momento"],
      filas: [
        ["Creó la historia clínica", pacienteDemo.profesional, "Día 1 · 09:02"],
        ["Registró procedimiento", pacienteDemo.profesional, "Día 1 · 09:40"],
        ["Confirmó evaluación (bloqueada)", pacienteDemo.profesional, "Día 1 · 09:45"],
      ],
    },
  },
];
