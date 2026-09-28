/**
 * Historia clínica DEMOSTRATIVA para presentaciones comerciales.
 *
 * Todos los datos son ficticios y genéricos: no hay pacientes, profesionales ni
 * sedes reales. No copies aquí información de producción.
 *
 * El escenario es una consulta ambulatoria de control, neutra a propósito para
 * que sirva con cualquier tipo de clínica. Para adaptarla a un cliente basta con
 * editar este archivo: los componentes solo pintan lo que hay aquí.
 */

// ── Tipos ────────────────────────────────────────────────────────────────────

export type EstadoHistoria = "borrador" | "firmada" | "cerrada";

export type HallazgoExamen = "normal" | "anormal" | "no_evaluable";

export interface ExamenSistema {
  sistema: string;
  hallazgo: HallazgoExamen;
  descripcion: string;
}

export interface TomaSignos {
  id: number;
  hora: string;
  paSistolica: number | null;
  paDiastolica: number | null;
  fc: number | null;
  fr: number | null;
  temperatura: number | null;
  spo2: number | null;
  peso: number | null;
  talla: number | null;
  dolor: number | null;
}

export interface CodigoCie {
  codigo: string;
  titulo: string;
}

export type TipoDiagnostico =
  | "Impresión diagnóstica"
  | "Confirmado nuevo"
  | "Confirmado repetido";

export interface Diagnostico {
  id: number;
  cie: CodigoCie;
  rol: "principal" | "secundario";
  tipo: TipoDiagnostico;
}

export interface Procedimiento {
  id: number;
  cups: string;
  descripcion: string;
  cantidad: number;
  hora: string;
}

export type TipoOrden =
  | "laboratorio"
  | "imagen"
  | "procedimiento"
  | "interconsulta"
  | "medicamento";

export type Prioridad = "rutinaria" | "urgente";

/** Cumplimiento de la orden. Vive fuera del sello: se sigue registrando tras la firma. */
export type Cumplimiento = "pendiente" | "en_proceso" | "cumplida";

export interface Orden {
  id: number;
  tipo: TipoOrden;
  descripcion: string;
  codigo: string;
  prioridad: Prioridad;
  cumplimiento: Cumplimiento;
  hora: string;
}

/** Resultado del PACIENTE: no depende de esta atención y puede llegar después de firmar. */
export interface Resultado {
  id: number;
  examen: string;
  informe: string;
  alterado: boolean;
  hora: string;
}

/** Documento de orden entregado al paciente. Al emitirse queda sellado. */
export interface OrdenEmitida {
  id: number;
  orden: string;
  indicacion: string;
  observacion: string;
  hora: string;
}

export interface EventoAdverso {
  id: number;
  tipo: string;
  severidad: string;
  momento: string;
  descripcion: string;
  accionInmediata: string;
  requirioRemision: boolean;
  reportado: boolean;
  hora: string;
}

export interface Anexo {
  id: number;
  nombre: string;
  tipo: "consentimiento" | "documento";
  detalle: string;
}

export interface Adenda {
  id: number;
  motivo: string;
  contenido: string;
  hora: string;
}

export type FamiliaCambio =
  | "alta"
  | "correccion"
  | "confirmacion"
  | "adenda"
  | "anulacion";

export interface EntradaHistorial {
  id: number;
  hora: string;
  accion: string;
  detalle?: string;
  familia: FamiliaCambio;
}

export interface Valoracion {
  motivoConsulta: string;
  enfermedadActual: string;
  revisionSistemas: string;
}

export interface PlanManejo {
  recomendaciones: string;
  educacionPaciente: string;
  proximoControl: string;
  remision: string;
}

export interface Evolucion {
  narrativa: string;
  hallazgos: string;
  intervencion: string;
  respuestaPaciente: string;
  planConducta: string;
}

export interface EstadoDemo {
  estado: EstadoHistoria;
  antecedentes: string[];
  valoracion: Valoracion;
  examen: ExamenSistema[];
  signos: TomaSignos[];
  diagnosticos: Diagnostico[];
  plan: PlanManejo;
  procedimientos: Procedimiento[];
  ordenes: Orden[];
  resultados: Resultado[];
  emitidas: OrdenEmitida[];
  eventos: EventoAdverso[];
  evolucion: Evolucion;
  anexos: Anexo[];
  adendas: Adenda[];
  historial: EntradaHistorial[];
  firmadaEn: string | null;
  cerradaEn: string | null;
  /** Reloj ficticio de la demo, en minutos desde el inicio de la atención. */
  minuto: number;
}

// ── Contexto de la atención ─────────────────────────────────────────────────

export const PACIENTE = {
  nombre: "Paciente Demo",
  documento: "CC 0000000000",
  edad: 45,
  sexo: "Femenino",
};

export const ATENCION = {
  profesional: "Profesional Demo",
  cargo: "Médico general",
  sede: "Sede Principal (demo)",
  modalidad: "Ambulatoria · Consulta externa",
  inicio: "Hoy · 09:00",
};

/** Hora ficticia a partir del minuto de la demo (09:00 + n). */
export function hora(minuto: number): string {
  const h = 9 + Math.floor(minuto / 60);
  const m = minuto % 60;
  return `Hoy · ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

// ── Estados de la historia ──────────────────────────────────────────────────

export const ORDEN_ESTADOS: EstadoHistoria[] = ["borrador", "firmada", "cerrada"];

export const ESTADO_LABEL: Record<EstadoHistoria, string> = {
  borrador: "Borrador",
  firmada: "Firmada",
  cerrada: "Cerrada",
};

export const ESTADO_HINT: Record<EstadoHistoria, string> = {
  borrador: "En captura. Todo el contenido clínico es editable.",
  firmada: "Contenido sellado. Ya no se edita; la corrección es por adenda.",
  cerrada: "Atención cerrada. El registro queda completo e inmutable.",
};

// ── Antecedentes ────────────────────────────────────────────────────────────

export const ANTECEDENTES_PATOLOGICOS = [
  "Hipertensión",
  "Diabetes mellitus",
  "Dislipidemia",
  "Hipotiroidismo",
  "Obesidad",
  "Asma",
  "EPOC",
  "Cardiopatía",
  "Enfermedad renal crónica",
  "Artritis reumatoide",
  "Osteoporosis",
  "Insuficiencia venosa",
  "Migraña",
  "Ansiedad / depresión",
];

/** Factores que cambian la conducta durante la atención, no solo el historial. */
export const FACTORES_RIESGO = [
  "Anticoagulado",
  "En embarazo",
  "Inmunosuprimido",
  "En tratamiento de cáncer",
  "Alergia a medicamentos",
  "Riesgo de caídas",
];

/** Marcar una categoría deja constancia de que se indagó. */
export const CATEGORIAS_ANTECEDENTES = [
  "Quirúrgicos",
  "Farmacológicos",
  "Tóxicos",
  "Gineco-obstétricos",
  "Hospitalarios",
  "Familiares",
];

// ── Examen físico ───────────────────────────────────────────────────────────

export const SISTEMAS_EXAMEN: { clave: string; etiqueta: string }[] = [
  { clave: "general", etiqueta: "General" },
  { clave: "cabeza_cuello", etiqueta: "Cabeza y cuello" },
  { clave: "ojos", etiqueta: "Ojos" },
  { clave: "cardiovascular", etiqueta: "Cardiovascular" },
  { clave: "respiratorio", etiqueta: "Respiratorio" },
  { clave: "abdomen", etiqueta: "Abdomen" },
  { clave: "genitourinario", etiqueta: "Genitourinario" },
  { clave: "osteomuscular", etiqueta: "Osteomuscular" },
  { clave: "neurologico", etiqueta: "Neurológico" },
  { clave: "piel_faneras", etiqueta: "Piel y faneras" },
  { clave: "mental", etiqueta: "Estado mental" },
];

// ── Catálogos ───────────────────────────────────────────────────────────────

/** Muestra reducida de CIE-10 para la búsqueda de la demo. */
export const CATALOGO_CIE10: CodigoCie[] = [
  { codigo: "I10X", titulo: "Hipertensión esencial (primaria)" },
  { codigo: "E119", titulo: "Diabetes mellitus no insulinodependiente, sin mención de complicación" },
  { codigo: "E785", titulo: "Hiperlipidemia no especificada" },
  { codigo: "E039", titulo: "Hipotiroidismo, no especificado" },
  { codigo: "R51X", titulo: "Cefalea" },
  { codigo: "J00X", titulo: "Rinofaringitis aguda (resfriado común)" },
  { codigo: "K297", titulo: "Gastritis, no especificada" },
  { codigo: "M545", titulo: "Lumbago no especificado" },
  { codigo: "N390", titulo: "Infección de vías urinarias, sitio no especificado" },
  { codigo: "F419", titulo: "Trastorno de ansiedad, no especificado" },
  { codigo: "L709", titulo: "Acné, no especificado" },
  { codigo: "Z000", titulo: "Examen médico general" },
];

export const TIPOS_DIAGNOSTICO: TipoDiagnostico[] = [
  "Impresión diagnóstica",
  "Confirmado nuevo",
  "Confirmado repetido",
];

export const TIPO_ORDEN_LABEL: Record<TipoOrden, string> = {
  laboratorio: "Laboratorio",
  imagen: "Imagen",
  procedimiento: "Procedimiento",
  interconsulta: "Interconsulta",
  medicamento: "Medicamento",
};

export const CUMPLIMIENTO_LABEL: Record<Cumplimiento, string> = {
  pendiente: "Pendiente",
  en_proceso: "En proceso",
  cumplida: "Cumplida",
};

export const TIPOS_EVENTO: Record<string, string> = {
  caida: "Caída",
  error_medicacion: "Error de medicación",
  lesion_piel: "Lesión de piel",
  infeccion_asociada: "Infección asociada",
  falla_dispositivo: "Falla de dispositivo",
  reaccion_adversa_medicamento: "Reacción adversa a medicamento",
  otro: "Otro",
};

/** Severidad del DAÑO ocurrido, no del riesgo. */
export const SEVERIDADES_EVENTO: Record<string, string> = {
  sin_dano: "Sin daño",
  leve: "Leve",
  moderado: "Moderado",
  grave: "Grave",
  centinela: "Centinela",
};

export const MOMENTOS_EVENTO: Record<string, string> = {
  durante_atencion: "Ocurrió durante la atención",
  detectado_en_atencion: "Se detectó en la atención (ocurrió antes)",
};

export const ETIQUETA_EVOLUCION: Record<keyof Evolucion, string> = {
  narrativa: "Narrativa",
  hallazgos: "Hallazgos",
  intervencion: "Intervención",
  respuestaPaciente: "Respuesta del paciente",
  planConducta: "Plan / conducta",
};

// ── Textos de ejemplo ───────────────────────────────────────────────────────
// No se autocompletan: se ofrecen con un botón para que quien presenta no
// tenga que escribir párrafos en vivo.

export const SUGERENCIAS = {
  revisionSistemas:
    "Cardiovascular: sin dolor torácico ni palpitaciones. Respiratorio: sin disnea ni tos. Gastrointestinal: apetito conservado, deposiciones normales. Genitourinario: sin disuria. Neurológico: cefalea ocasional, sin déficit focal.",
  recomendaciones:
    "Dieta baja en sodio. Actividad física aeróbica 30 minutos, 5 días a la semana. Continuar tratamiento farmacológico sin cambios.",
  educacionPaciente:
    "Se explican los signos de alarma: dolor torácico, cefalea intensa súbita, alteración visual o debilidad en extremidades. Consultar por urgencias si se presentan.",
  proximoControl: "En 3 meses, con resultados de laboratorio.",
  hallazgos:
    "Presión arterial en metas. Cefalea ocasional sin signos de alarma. Perfil lipídico con colesterol total por encima de la meta.",
  intervencion:
    "Valoración clínica completa, revisión de resultados de laboratorio, ajuste de recomendaciones no farmacológicas y educación en signos de alarma.",
  respuestaPaciente:
    "Paciente comprende las indicaciones y repite los signos de alarma. Refiere buena adherencia al tratamiento.",
  planConducta:
    "Continuar manejo actual. Control en 3 meses con creatinina y perfil lipídico. Reforzar cambios en el estilo de vida.",
};

// ── Estado inicial ──────────────────────────────────────────────────────────
// Arranca a medio diligenciar: hay algo que mostrar de entrada y algo que
// completar en vivo durante la presentación.

export const ESTADO_INICIAL: EstadoDemo = {
  estado: "borrador",
  antecedentes: ["Hipertensión", "Farmacológicos"],
  valoracion: {
    motivoConsulta: "Control de hipertensión arterial.",
    enfermedadActual:
      "Paciente de 45 años con diagnóstico de hipertensión arterial hace 3 años, en tratamiento farmacológico. Refiere buena adherencia. Cefalea ocasional en la última semana, sin otros síntomas. Trae resultados de laboratorio.",
    revisionSistemas: "",
  },
  examen: [
    { sistema: "general", hallazgo: "normal", descripcion: "Alerta, orientada, hidratada." },
    { sistema: "cardiovascular", hallazgo: "normal", descripcion: "Ruidos cardiacos rítmicos, sin soplos." },
  ],
  signos: [
    {
      id: 1,
      hora: hora(4),
      paSistolica: 128,
      paDiastolica: 82,
      fc: 74,
      fr: 16,
      temperatura: 36.5,
      spo2: 98,
      peso: 68,
      talla: 1.62,
      dolor: 2,
    },
  ],
  diagnosticos: [
    {
      id: 1,
      cie: CATALOGO_CIE10[0],
      rol: "principal",
      tipo: "Confirmado repetido",
    },
  ],
  plan: {
    recomendaciones: "",
    educacionPaciente: "",
    proximoControl: "",
    remision: "",
  },
  procedimientos: [
    {
      id: 1,
      cups: "890301",
      descripcion: "Consulta de control o de seguimiento por medicina general",
      cantidad: 1,
      hora: hora(0),
    },
  ],
  ordenes: [
    {
      id: 1,
      tipo: "laboratorio",
      descripcion: "Creatinina en suero",
      codigo: "INTERNO 000214",
      prioridad: "rutinaria",
      cumplimiento: "pendiente",
      hora: hora(5),
    },
    {
      id: 2,
      tipo: "procedimiento",
      descripcion: "Electrocardiograma de control",
      codigo: "INTERNO 000388",
      prioridad: "urgente",
      cumplimiento: "pendiente",
      hora: hora(5),
    },
  ],
  resultados: [
    {
      id: 1,
      examen: "Perfil lipídico",
      informe:
        "Colesterol total 212 mg/dL, LDL 138 mg/dL, HDL 48 mg/dL, triglicéridos 160 mg/dL.",
      alterado: true,
      hora: "Hace 5 días",
    },
  ],
  emitidas: [],
  eventos: [],
  evolucion: {
    narrativa:
      "Paciente asiste a control de hipertensión arterial. Consciente, orientada, hemodinámicamente estable.",
    hallazgos: "",
    intervencion: "",
    respuestaPaciente: "",
    planConducta: "",
  },
  anexos: [
    {
      id: 1,
      nombre: "Consentimiento informado general",
      tipo: "consentimiento",
      detalle: "Aceptado · v1.0",
    },
    {
      id: 2,
      nombre: "Resultado perfil lipídico.pdf",
      tipo: "documento",
      detalle: "Documento · 240 KB",
    },
  ],
  adendas: [],
  historial: [
    { id: 1, hora: hora(0), accion: "Inició la historia clínica", familia: "alta" },
    { id: 2, hora: hora(4), accion: "Registró toma de signos vitales", familia: "alta" },
  ],
  firmadaEn: null,
  cerradaEn: null,
  minuto: 6,
};
