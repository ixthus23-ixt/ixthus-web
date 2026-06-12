"use client";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  CheckCircle2,
  Loader2,
  LogOut,
  MessageCircle,
  Pencil,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { isAdminEmail } from "@/lib/admin";
import { getFirebaseAuth, getFirebaseDb } from "@/lib/firebase";
import {
  ESTADOS_PAGO,
  formatRegistrationDate,
  getWhatsAppUrl,
  KERIGMA_COLLECTION,
  PARROQUIAS,
  SEXOS,
  type EstadoPago,
  type KerigmaRegistration,
  type Parroquia,
  type Sexo,
} from "@/lib/kerigma";

type Filters = {
  parroquia: "todos" | Parroquia;
  sexo: "todos" | Sexo;
  estadoPago: "todos" | EstadoPago;
};

const initialFilters: Filters = {
  parroquia: "todos",
  sexo: "todos",
  estadoPago: "todos",
};

export default function AdminKerigmaPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [registrations, setRegistrations] = useState<KerigmaRegistration[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const isAdmin = isAdminEmail(user?.email);

  useEffect(() => {
    return onAuthStateChanged(getFirebaseAuth(), (nextUser) => {
      setUser(nextUser);
      setAuthLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!user || !isAdmin) {
      setRegistrations([]);
      return;
    }

    setDataLoading(true);

    const registrationsQuery = query(
      collection(getFirebaseDb(), KERIGMA_COLLECTION),
      orderBy("createdAt", "desc"),
    );

    return onSnapshot(
      registrationsQuery,
      (snapshot) => {
        setRegistrations(
          snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
          })) as KerigmaRegistration[],
        );
        setDataLoading(false);
      },
      () => {
        setDataLoading(false);
      },
    );
  }, [isAdmin, user]);

  const filteredRegistrations = useMemo(() => {
    return registrations.filter((registration) => {
      const parishMatch =
        filters.parroquia === "todos" ||
        registration.parroquia === filters.parroquia;
      const sexMatch =
        filters.sexo === "todos" || registration.sexo === filters.sexo;
      const paymentMatch =
        filters.estadoPago === "todos" ||
        registration.estadoPago === filters.estadoPago;

      return parishMatch && sexMatch && paymentMatch;
    });
  }, [filters, registrations]);

  const stats = useMemo(() => {
    const paidOrReserved = registrations.filter((registration) =>
      ["apartado", "pagado"].includes(registration.estadoPago),
    );

    return {
      total: registrations.length,
      byParish: PARROQUIAS.map((parroquia) => ({
        label: parroquia,
        value: registrations.filter(
          (registration) => registration.parroquia === parroquia,
        ).length,
      })),
      bySex: SEXOS.map((sexo) => ({
        label: sexo,
        value: registrations.filter((registration) => registration.sexo === sexo)
          .length,
      })),
      paidOrReserved: paidOrReserved.length,
      totalReserved: registrations.reduce(
        (total, registration) => total + (Number(registration.montoApartado) || 0),
        0,
      ),
    };
  }, [registrations]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      await signInWithEmailAndPassword(
        getFirebaseAuth(),
        loginEmail,
        loginPassword,
      );
    } catch {
      setLoginError("No pudimos iniciar sesión. Revisa el correo y contraseña.");
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function updateRegistration(
    id: string,
    data: Partial<KerigmaRegistration>,
  ) {
    await updateDoc(doc(getFirebaseDb(), KERIGMA_COLLECTION, id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  }

  async function editAmount(registration: KerigmaRegistration) {
    const value = window.prompt(
      "Monto apartado",
      String(registration.montoApartado ?? 0),
    );

    if (value === null) {
      return;
    }

    const amount = Number(value);

    if (!Number.isFinite(amount) || amount < 0) {
      window.alert("Escribe un monto válido.");
      return;
    }

    await updateRegistration(registration.id, { montoApartado: amount });
  }

  async function editNotes(registration: KerigmaRegistration) {
    const notes = window.prompt("Notas de seguimiento", registration.notas ?? "");

    if (notes === null) {
      return;
    }

    await updateRegistration(registration.id, { notas: notes });
  }

  if (authLoading) {
    return <CenteredStatus text="Cargando acceso administrativo..." />;
  }

  if (!user) {
    return (
      <AdminShell>
        <div className="mx-auto max-w-md rounded-[2rem] border border-white/14 bg-white/[0.09] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-8">
          <div className="mb-8">
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-black text-white">
              Admin Kerigma 2026
            </h1>
            <p className="mt-3 leading-7 text-blue-100">
              Inicia sesión con tu correo administrador para consultar y dar
              seguimiento a los pre-registros.
            </p>
          </div>

          <form onSubmit={handleLogin} className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-blue-50">Correo</span>
              <input
                value={loginEmail}
                onChange={(event) => setLoginEmail(event.target.value)}
                type="email"
                className="field-input"
                placeholder="admin@ixthus.org"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-bold text-blue-50">Contraseña</span>
              <input
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
                type="password"
                className="field-input"
                placeholder="••••••••"
              />
            </label>
            {loginError ? (
              <p className="rounded-3xl border border-red-300/24 bg-red-500/12 p-4 text-sm font-semibold leading-6 text-red-50">
                {loginError}
              </p>
            ) : null}
            <button
              disabled={isLoggingIn}
              className="inline-flex min-h-13 items-center justify-center rounded-full bg-[#D4AF37] px-6 font-black text-[#061A33] transition hover:bg-[#f0cf70] disabled:opacity-70"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Entrando
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>
        </div>
      </AdminShell>
    );
  }

  if (!isAdmin) {
    return (
      <AdminShell>
        <div className="mx-auto max-w-xl rounded-[2rem] border border-red-200/20 bg-red-500/10 p-8 text-center text-red-50 backdrop-blur-xl">
          <h1 className="text-3xl font-black">Acceso no autorizado</h1>
          <p className="mt-4 leading-7">
            Tu sesión está activa, pero este correo no está en la lista de
            administradores del Kerigma 2026.
          </p>
          <button
            onClick={() => signOut(getFirebaseAuth())}
            className="mt-7 rounded-full border border-white/15 px-6 py-3 font-bold text-white transition hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
          >
            Cerrar sesión
          </button>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              href="/"
              className="text-sm font-bold uppercase tracking-[0.24em] text-[#D4AF37]"
            >
              IXTHUS
            </Link>
            <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">
              Panel Kerigma 2026
            </h1>
            <p className="mt-3 max-w-2xl leading-7 text-blue-100">
              Consulta, filtra y acompaña los pre-registros del Retiro
              Kerigmático IXTHUS 2026.
            </p>
          </div>
          <button
            onClick={() => signOut(getFirebaseAuth())}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 font-bold text-blue-50 transition hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
          >
            <LogOut className="h-4 w-4" />
            Salir
          </button>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <StatCard label="Total inscritos" value={stats.total} />
          <StatCard label="Apartado o pagado" value={stats.paidOrReserved} />
          <StatCard
            label="Monto total apartado"
            value={`$${stats.totalReserved.toLocaleString("es-MX")}`}
          />
          {stats.bySex.map((item) => (
            <StatCard
              key={item.label}
              label={item.label === "Hombre" ? "Hombres" : "Mujeres"}
              value={item.value}
            />
          ))}
        </section>

        <section className="mt-5 grid gap-4 lg:grid-cols-4">
          {stats.byParish.map((item) => (
            <StatCard key={item.label} label={item.label} value={item.value} />
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border border-white/12 bg-white/[0.07] p-5 backdrop-blur-xl">
          <div className="grid gap-4 md:grid-cols-3">
            <SelectFilter
              label="Parroquia"
              value={filters.parroquia}
              onChange={(value) =>
                setFilters((current) => ({
                  ...current,
                  parroquia: value as Filters["parroquia"],
                }))
              }
              options={PARROQUIAS}
            />
            <SelectFilter
              label="Sexo"
              value={filters.sexo}
              onChange={(value) =>
                setFilters((current) => ({
                  ...current,
                  sexo: value as Filters["sexo"],
                }))
              }
              options={SEXOS}
            />
            <SelectFilter
              label="Estado de pago"
              value={filters.estadoPago}
              onChange={(value) =>
                setFilters((current) => ({
                  ...current,
                  estadoPago: value as Filters["estadoPago"],
                }))
              }
              options={ESTADOS_PAGO}
            />
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.07] shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 p-5">
            <h2 className="text-xl font-black text-white">Registros</h2>
            <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-sm font-bold text-blue-100">
              {filteredRegistrations.length} visibles
            </span>
          </div>

          {dataLoading ? (
            <div className="flex min-h-52 items-center justify-center gap-3 text-blue-100">
              <Loader2 className="h-5 w-5 animate-spin" />
              Cargando registros
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[1180px] text-left text-sm">
                <thead className="bg-[#061A33]/70 text-xs uppercase tracking-[0.12em] text-blue-100">
                  <tr>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Edad</TableHead>
                    <TableHead>Sexo</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Parroquia</TableHead>
                    <TableHead>Estado de pago</TableHead>
                    <TableHead>Monto apartado</TableHead>
                    <TableHead>Confirmado</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Acciones</TableHead>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.map((registration) => (
                    <tr
                      key={registration.id}
                      className="border-t border-white/10 text-blue-50/90"
                    >
                      <TableCell>
                        <div className="font-bold text-white">
                          {registration.nombre}
                        </div>
                        {registration.notas ? (
                          <div className="mt-1 max-w-[220px] truncate text-xs text-blue-200">
                            {registration.notas}
                          </div>
                        ) : null}
                      </TableCell>
                      <TableCell>{registration.edad}</TableCell>
                      <TableCell>{registration.sexo}</TableCell>
                      <TableCell>{registration.telefono}</TableCell>
                      <TableCell>
                        {registration.parroquia === "Otra" &&
                        registration.parroquiaOtra
                          ? registration.parroquiaOtra
                          : registration.parroquia}
                      </TableCell>
                      <TableCell>
                        <select
                          value={registration.estadoPago}
                          onChange={(event) =>
                            updateRegistration(registration.id, {
                              estadoPago: event.target.value as EstadoPago,
                            })
                          }
                          className="rounded-full border border-white/12 bg-[#061A33] px-3 py-2 text-sm font-bold text-blue-50"
                        >
                          {ESTADOS_PAGO.map((estado) => (
                            <option key={estado} value={estado}>
                              {estado}
                            </option>
                          ))}
                        </select>
                      </TableCell>
                      <TableCell>${registration.montoApartado ?? 0}</TableCell>
                      <TableCell>
                        <button
                          onClick={() =>
                            updateRegistration(registration.id, {
                              confirmado: !registration.confirmado,
                            })
                          }
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-2 font-bold ${
                            registration.confirmado
                              ? "bg-emerald-400/14 text-emerald-200"
                              : "bg-white/8 text-blue-100"
                          }`}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          {registration.confirmado ? "Sí" : "No"}
                        </button>
                      </TableCell>
                      <TableCell>
                        {formatRegistrationDate(registration.createdAt)}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          <ActionButton
                            onClick={() =>
                              updateRegistration(registration.id, {
                                estadoPago: "pagado",
                              })
                            }
                          >
                            Pagó
                          </ActionButton>
                          <ActionButton
                            onClick={() =>
                              updateRegistration(registration.id, {
                                estadoPago: "apartado",
                              })
                            }
                          >
                            Apartado
                          </ActionButton>
                          <ActionButton onClick={() => editAmount(registration)}>
                            <Pencil className="h-3.5 w-3.5" />
                            Monto
                          </ActionButton>
                          <ActionButton onClick={() => editNotes(registration)}>
                            Notas
                          </ActionButton>
                          <Link
                            href={getWhatsAppUrl(registration.telefono)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-full bg-emerald-400/14 px-3 py-2 text-xs font-black text-emerald-100 transition hover:bg-emerald-400/22"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            WhatsApp
                          </Link>
                        </div>
                      </TableCell>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </AdminShell>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#061A33] px-5 py-8 text-[#F8FAFC] sm:px-6 lg:px-8">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(37,99,235,0.28),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(212,175,55,0.12),transparent_26%),linear-gradient(135deg,#061A33_0%,#0B2A55_48%,#071A35_100%)]" />
      {children}
    </main>
  );
}

function CenteredStatus({ text }: { text: string }) {
  return (
    <AdminShell>
      <div className="grid min-h-[70vh] place-items-center text-blue-100">
        <div className="inline-flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin" />
          {text}
        </div>
      </div>
    </AdminShell>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-[1.5rem] border border-white/12 bg-white/[0.08] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl">
      <p className="text-sm font-bold text-blue-100">{label}</p>
      <p className="mt-3 text-3xl font-black text-white">{value}</p>
    </div>
  );
}

function SelectFilter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-blue-50">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="field-input"
      >
        <option value="todos">Todos</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TableHead({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-4 font-black">{children}</th>;
}

function TableCell({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-4 align-top">{children}</td>;
}

function ActionButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 rounded-full border border-white/12 px-3 py-2 text-xs font-black text-blue-50 transition hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
    >
      {children}
    </button>
  );
}
