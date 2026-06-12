"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { CheckCircle2, Loader2, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { getFirebaseDb } from "@/lib/firebase";
import {
  cleanPhoneDigits,
  KERIGMA_COLLECTION,
  PARROQUIAS,
  SEXOS,
  type Parroquia,
  type Sexo,
} from "@/lib/kerigma";

type FormState = {
  nombre: string;
  edad: string;
  sexo: "" | Sexo;
  telefono: string;
  parroquia: "" | Parroquia;
  parroquiaOtra: string;
};

const initialFormState: FormState = {
  nombre: "",
  edad: "",
  sexo: "",
  telefono: "",
  parroquia: "",
  parroquiaOtra: "",
};

export default function KerigmaPreRegistroPage() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const phoneDigits = useMemo(
    () => cleanPhoneDigits(form.telefono),
    [form.telefono],
  );

  function updateField<Key extends keyof FormState>(
    field: Key,
    value: FormState[Key],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError("");
  }

  function validateForm() {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.nombre.trim()) {
      nextErrors.nombre = "Escribe el nombre completo.";
    }

    if (!form.edad.trim()) {
      nextErrors.edad = "Escribe la edad.";
    } else if (!Number.isFinite(Number(form.edad)) || Number(form.edad) <= 0) {
      nextErrors.edad = "Escribe una edad válida.";
    }

    if (!form.sexo) {
      nextErrors.sexo = "Selecciona una opción.";
    }

    if (!form.telefono.trim()) {
      nextErrors.telefono = "Escribe un teléfono.";
    } else if (phoneDigits.length < 10) {
      nextErrors.telefono = "El teléfono debe tener mínimo 10 dígitos.";
    }

    if (!form.parroquia) {
      nextErrors.parroquia = "Selecciona una parroquia.";
    }

    if (form.parroquia === "Otra" && !form.parroquiaOtra.trim()) {
      nextErrors.parroquiaOtra = "Escribe el nombre de tu parroquia.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess(false);
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(getFirebaseDb(), KERIGMA_COLLECTION), {
        nombre: form.nombre.trim(),
        edad: Number(form.edad),
        sexo: form.sexo,
        telefono: phoneDigits,
        parroquia: form.parroquia,
        parroquiaOtra:
          form.parroquia === "Otra" ? form.parroquiaOtra.trim() : "",
        estadoPago: "pendiente",
        montoApartado: 0,
        confirmado: false,
        notas: "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setForm(initialFormState);
      setSuccess(true);
    } catch {
      setSubmitError(
        "No pudimos guardar el registro. Revisa la configuración de Firebase e inténtalo nuevamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#061A33] text-[#F8FAFC]">
      <section className="relative min-h-screen px-5 py-10 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(37,99,235,0.35),transparent_30%),radial-gradient(circle_at_84%_20%,rgba(212,175,55,0.16),transparent_26%),linear-gradient(135deg,#061A33_0%,#0B2A55_48%,#071A35_100%)]" />
        <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.16)_1px,transparent_1.5px)] [background-size:32px_32px]" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-bold text-blue-100 backdrop-blur transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
            >
              IXTHUS
            </Link>
            <h1 className="mt-10 max-w-3xl text-5xl font-black leading-none text-white sm:text-6xl lg:text-7xl">
              Pre-registro Kerigma 2026
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100 sm:text-xl">
              Déjanos tus datos para recibir información y dar seguimiento a tu
              posible participación en el próximo retiro kerigmático de IXTHUS.
            </p>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#F8FAFC]/78">
              Este registro nos ayuda a acompañarte de forma cercana y a
              compartirte los siguientes pasos cuando abramos la convocatoria.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/14 bg-white/[0.09] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-8"
          >
            <div className="grid gap-5">
              <Field label="Nombre completo del joven" error={errors.nombre}>
                <input
                  value={form.nombre}
                  onChange={(event) => updateField("nombre", event.target.value)}
                  className="field-input"
                  placeholder="Escribe tu nombre completo"
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Edad" error={errors.edad}>
                  <input
                    value={form.edad}
                    onChange={(event) => updateField("edad", event.target.value)}
                    className="field-input"
                    inputMode="numeric"
                    placeholder="18"
                  />
                </Field>

                <Field label="Sexo" error={errors.sexo}>
                  <select
                    value={form.sexo}
                    onChange={(event) =>
                      updateField("sexo", event.target.value as Sexo)
                    }
                    className="field-input"
                  >
                    <option value="">Selecciona</option>
                    {SEXOS.map((sexo) => (
                      <option key={sexo} value={sexo}>
                        {sexo}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Número de teléfono" error={errors.telefono}>
                <input
                  value={form.telefono}
                  onChange={(event) =>
                    updateField("telefono", event.target.value)
                  }
                  className="field-input"
                  inputMode="tel"
                  placeholder="55 1234 5678"
                />
              </Field>

              <Field
                label="Parroquia a la que pertenece"
                error={errors.parroquia}
              >
                <select
                  value={form.parroquia}
                  onChange={(event) =>
                    updateField("parroquia", event.target.value as Parroquia)
                  }
                  className="field-input"
                >
                  <option value="">Selecciona una parroquia</option>
                  {PARROQUIAS.map((parroquia) => (
                    <option key={parroquia} value={parroquia}>
                      {parroquia}
                    </option>
                  ))}
                </select>
              </Field>

              {form.parroquia === "Otra" ? (
                <Field
                  label="Nombre de tu parroquia"
                  error={errors.parroquiaOtra}
                >
                  <input
                    value={form.parroquiaOtra}
                    onChange={(event) =>
                      updateField("parroquiaOtra", event.target.value)
                    }
                    className="field-input"
                    placeholder="Escribe el nombre de tu parroquia"
                  />
                </Field>
              ) : null}

              {success ? (
                <div className="flex gap-3 rounded-3xl border border-emerald-300/24 bg-emerald-400/12 p-4 text-sm font-semibold leading-6 text-emerald-50">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                  Registro realizado correctamente. Un integrante de IXTHUS se
                  pondrá en contacto contigo.
                </div>
              ) : null}

              {submitError ? (
                <div className="rounded-3xl border border-red-300/24 bg-red-500/12 p-4 text-sm font-semibold leading-6 text-red-50">
                  {submitError}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#D4AF37] px-6 text-base font-black text-[#061A33] shadow-[0_18px_42px_rgba(212,175,55,0.22)] transition hover:bg-[#f0cf70] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Registrando
                  </>
                ) : (
                  "Registrar"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="relative border-t border-white/10 bg-[#061A33] px-5 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-xs font-medium text-blue-100/58">
            IXTHUS — Pre-registro Kerigma 2026
          </p>
          <Link
            href="/admin/kerigma-2026"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-100/58 transition hover:text-[#D4AF37]"
          >
            <LockKeyhole className="h-3.5 w-3.5" />
            Acceso administrativo
          </Link>
        </div>
      </footer>
    </main>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-blue-50">{label}</span>
      {children}
      {error ? <span className="text-sm font-semibold text-red-200">{error}</span> : null}
    </label>
  );
}
