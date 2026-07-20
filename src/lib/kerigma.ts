export const KERIGMA_COLLECTION = "kerigma2026_pre_registros";

export const KERIGMA_COSTO = 800;

export const PARROQUIAS = [
  "San Pío Décimo",
  "Divina Providencia",
  "Asunción de Nuestra Señora",
  "Otra",
] as const;

export const SEXOS = ["Hombre", "Mujer"] as const;

export const ESTADOS_PAGO = ["pendiente", "apartado", "pagado"] as const;

export const CONTACT_STATUSES = ["not_contacted", "contacted"] as const;

export type Parroquia = (typeof PARROQUIAS)[number];
export type Sexo = (typeof SEXOS)[number];
export type EstadoPago = (typeof ESTADOS_PAGO)[number];
export type ContactStatus = (typeof CONTACT_STATUSES)[number];

export type KerigmaRegistration = {
  id: string;
  nombre: string;
  edad: number;
  sexo: Sexo;
  telefono: string;
  parroquia: Parroquia;
  parroquiaOtra: string;
  estadoPago: EstadoPago;
  montoApartado: number;
  confirmado: boolean;
  contactStatus?: ContactStatus;
  notas: string;
  createdAt?: {
    toDate?: () => Date;
  };
  updatedAt?: {
    toDate?: () => Date;
  };
};

export const WHATSAPP_MESSAGE =
  "Hola, soy parte del equipo de IXTHUS. Gracias por tu pre-registro al Kerigma 2026. Queremos compartirte más información sobre el retiro.";

export function cleanPhoneDigits(phone: string) {
  return phone.replace(/\D/g, "");
}

export function normalizeMexicoPhone(phone: string) {
  const digits = cleanPhoneDigits(phone);

  if (digits.startsWith("52")) {
    return digits;
  }

  if (digits.length === 10) {
    return `52${digits}`;
  }

  return digits;
}

export function getWhatsAppUrl(phone: string) {
  const normalizedPhone = normalizeMexicoPhone(phone);

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE,
  )}`;
}

export function getMontoAbonado(registration: Pick<KerigmaRegistration, "estadoPago" | "montoApartado">) {
  if (registration.estadoPago === "pagado") {
    return KERIGMA_COSTO;
  }

  if (registration.estadoPago === "apartado") {
    return Math.max(0, Number(registration.montoApartado) || 0);
  }

  return 0;
}

export function getSaldoPendiente(
  registration: Pick<KerigmaRegistration, "estadoPago" | "montoApartado">,
) {
  return Math.max(0, KERIGMA_COSTO - getMontoAbonado(registration));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getContactStatus(
  registration: Pick<KerigmaRegistration, "contactStatus">,
): ContactStatus {
  return registration.contactStatus === "contacted"
    ? "contacted"
    : "not_contacted";
}

export function getContactStatusLabel(status: ContactStatus) {
  return status === "contacted" ? "Contactado" : "Sin contactar";
}

export function formatRegistrationDate(
  value: KerigmaRegistration["createdAt"],
) {
  const date = value?.toDate?.();

  if (!date) {
    return "Sin fecha";
  }

  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
