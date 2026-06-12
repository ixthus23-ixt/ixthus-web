export const ADMIN_EMAILS = ["tu-correo@ejemplo.com"];

export function isAdminEmail(email?: string | null) {
  if (!email) {
    return false;
  }

  return ADMIN_EMAILS.some(
    (adminEmail) => adminEmail.toLowerCase() === email.toLowerCase(),
  );
}
