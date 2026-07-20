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
  BarChart3,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  Loader2,
  LogOut,
  MessageCircle,
  Pencil,
  Search,
  Send,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { isAdminEmail } from "@/lib/admin";
import {
  getFirebaseAuth,
  getFirebaseDb,
  isFirebaseConfigured,
} from "@/lib/firebase";
import {
  ESTADOS_PAGO,
  formatCurrency,
  formatRegistrationDate,
  getContactStatus,
  getContactStatusLabel,
  getMontoAbonado,
  getSaldoPendiente,
  getWhatsAppUrl,
  KERIGMA_COLLECTION,
  KERIGMA_COSTO,
  normalizeSearchText,
  PARROQUIAS,
  SEXOS,
  type ContactStatus,
  type EstadoPago,
  type KerigmaRegistration,
  type Parroquia,
  type Sexo,
} from "@/lib/kerigma";

type Filters = {
  nameSearch: string;
  parroquia: "todos" | Parroquia;
  sexo: "todos" | Sexo;
  estadoPago: "todos" | EstadoPago;
  contactStatus: "todos" | ContactStatus;
};

type AdminTab = "registros" | "detalles" | "pagos";

const initialFilters: Filters = {
  nameSearch: "",
  parroquia: "todos",
  sexo: "todos",
  estadoPago: "todos",
  contactStatus: "todos",
};

const parishStyles: Record<
  Parroquia,
  {
    accent: string;
    bar: string;
    glow: string;
  }
> = {
  "San Pío Décimo": {
    accent: "text-[#D4AF37]",
    bar: "from-[#D4AF37] to-[#F0D895]",
    glow: "shadow-[0_18px_56px_rgba(212,175,55,0.16)]",
  },
  "Divina Providencia": {
    accent: "text-sky-200",
    bar: "from-sky-300 to-blue-400",
    glow: "shadow-[0_18px_56px_rgba(125,211,252,0.14)]",
  },
  "Asunción de Nuestra Señora": {
    accent: "text-violet-200",
    bar: "from-violet-300 to-fuchsia-300",
    glow: "shadow-[0_18px_56px_rgba(196,181,253,0.14)]",
  },
  Otra: {
    accent: "text-slate-200",
    bar: "from-slate-300 to-slate-500",
    glow: "shadow-[0_18px_56px_rgba(148,163,184,0.12)]",
  },
};

const tabs: Array<{
  id: AdminTab;
  label: string;
  icon: typeof ClipboardList;
}> = [
  { id: "registros", label: "Registros", icon: ClipboardList },
  { id: "detalles", label: "Detalles de inscripciones", icon: BarChart3 },
  { id: "pagos", label: "Pagos e ingresos", icon: CircleDollarSign },
];

export default function AdminKerigmaPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [firebaseConfigError, setFirebaseConfigError] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [registrations, setRegistrations] = useState<KerigmaRegistration[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [activeTab, setActiveTab] = useState<AdminTab>("registros");
  const [contactUpdates, setContactUpdates] = useState<
    Record<string, ContactStatus>
  >({});
  const [contactSuccess, setContactSuccess] = useState<Record<string, boolean>>(
    {},
  );
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});

  const isAdmin = isAdminEmail(user?.email);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setFirebaseConfigError(true);
      setAuthLoading(false);
      return;
    }

    try {
      const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (nextUser) => {
        setUser(nextUser);
        setAuthLoading(false);
      });

      return unsubscribe;
    } catch {
      setFirebaseConfigError(true);
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user || !isAdmin) {
      setRegistrations([]);
      return;
    }

    if (!isFirebaseConfigured()) {
      setDataLoading(false);
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
    const normalizedNameSearch = normalizeSearchText(filters.nameSearch);

    return registrations.filter((registration) => {
      const normalizedName = normalizeSearchText(registration.nombre);
      const nameMatch =
        normalizedNameSearch.length === 0 ||
        normalizedName.includes(normalizedNameSearch);
      const parishMatch =
        filters.parroquia === "todos" ||
        registration.parroquia === filters.parroquia;
      const sexMatch =
        filters.sexo === "todos" || registration.sexo === filters.sexo;
      const paymentMatch =
        filters.estadoPago === "todos" ||
        registration.estadoPago === filters.estadoPago;
      const contactMatch =
        filters.contactStatus === "todos" ||
        getContactStatus(registration) === filters.contactStatus;

      return (
        nameMatch && parishMatch && sexMatch && paymentMatch && contactMatch
      );
    });
  }, [filters, registrations]);

  const stats = useMemo(() => {
    const total = registrations.length;
    const paid = registrations.filter(
      (registration) => registration.estadoPago === "pagado",
    );
    const reserved = registrations.filter(
      (registration) => registration.estadoPago === "apartado",
    );
    const pending = registrations.filter(
      (registration) => registration.estadoPago === "pendiente",
    );
    const confirmed = registrations.filter(
      (registration) => registration.confirmado,
    );
    const contacted = registrations.filter(
      (registration) => getContactStatus(registration) === "contacted",
    );
    const notContacted = registrations.filter(
      (registration) => getContactStatus(registration) === "not_contacted",
    );
    const totalIncome = registrations.reduce(
      (totalAmount, registration) => totalAmount + getMontoAbonado(registration),
      0,
    );
    const pendingBalance = registrations.reduce(
      (totalAmount, registration) =>
        totalAmount + getSaldoPendiente(registration),
      0,
    );

    return {
      total,
      byParish: PARROQUIAS.map((parroquia) => {
        const value = registrations.filter(
          (registration) => registration.parroquia === parroquia,
        ).length;

        return {
          label: parroquia,
          value,
          percentage: total > 0 ? Math.round((value / total) * 100) : 0,
        };
      }),
      bySex: SEXOS.map((sexo) => ({
        label: sexo,
        value: registrations.filter((registration) => registration.sexo === sexo)
          .length,
      })),
      confirmed: confirmed.length,
      pending: pending.length,
      reserved: reserved.length,
      paid: paid.length,
      contacted: contacted.length,
      notContacted: notContacted.length,
      totalIncome,
      pendingBalance,
      fullRegistrationValue: total * KERIGMA_COSTO,
    };
  }, [registrations]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      if (!isFirebaseConfigured()) {
        throw new Error("Firebase is not configured.");
      }

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
      "Monto abonado",
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

    await updateRegistration(registration.id, {
      montoApartado: Math.min(amount, KERIGMA_COSTO),
      estadoPago: amount >= KERIGMA_COSTO ? "pagado" : "apartado",
    });
  }

  async function editNotes(registration: KerigmaRegistration) {
    const notes = window.prompt("Notas de seguimiento", registration.notas ?? "");

    if (notes === null) {
      return;
    }

    await updateRegistration(registration.id, { notas: notes });
  }

  async function updateContactStatus(
    registration: KerigmaRegistration,
    nextStatus: ContactStatus,
  ) {
    if (contactUpdates[registration.id]) {
      return;
    }

    const currentStatus = getContactStatus(registration);

    if (currentStatus === nextStatus) {
      return;
    }

    setContactErrors((current) => {
      const next = { ...current };
      delete next[registration.id];
      return next;
    });
    setContactSuccess((current) => {
      const next = { ...current };
      delete next[registration.id];
      return next;
    });
    setContactUpdates((current) => ({
      ...current,
      [registration.id]: nextStatus,
    }));

    try {
      await updateRegistration(registration.id, { contactStatus: nextStatus });
      setContactSuccess((current) => ({
        ...current,
        [registration.id]: true,
      }));
      window.setTimeout(() => {
        setContactSuccess((current) => {
          const next = { ...current };
          delete next[registration.id];
          return next;
        });
      }, 1800);
    } catch {
      setContactErrors((current) => ({
        ...current,
        [registration.id]: "No se pudo actualizar. Inténtalo otra vez.",
      }));
    } finally {
      setContactUpdates((current) => {
        const next = { ...current };
        delete next[registration.id];
        return next;
      });
    }
  }

  if (authLoading) {
    return <CenteredStatus text="Cargando acceso administrativo..." />;
  }

  if (!isFirebaseConfigured() || firebaseConfigError) {
    return (
      <AdminShell>
        <div className="mx-auto max-w-xl rounded-[2rem] border border-[#D4AF37]/24 bg-[#D4AF37]/10 p-8 text-center text-blue-50 backdrop-blur-xl">
          <h1 className="text-3xl font-black text-white">
            Configuración de Firebase pendiente
          </h1>
          <p className="mt-4 leading-7 text-blue-100">
            Agrega las variables de entorno de Firebase en `.env.local` para
            activar el login administrativo y la lectura de registros.
          </p>
          <Link
            href="/kerigma-2026"
            className="mt-7 inline-flex rounded-full border border-white/15 px-6 py-3 font-bold text-white transition hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
          >
            Volver al pre-registro
          </Link>
        </div>
      </AdminShell>
    );
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
              Dashboard de seguimiento para pre-registros, confirmaciones y
              pagos del Retiro Kerigmático IXTHUS 2026.
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

        <section className="mt-8 grid gap-4 lg:grid-cols-4">
          {stats.byParish.map((item) => (
            <ParishMetricCard
              key={item.label}
              label={item.label}
              value={item.value}
              percentage={item.percentage}
            />
          ))}
        </section>

        <nav className="mt-8 overflow-x-auto rounded-[1.75rem] border border-white/12 bg-white/[0.07] p-2 backdrop-blur-xl">
          <div className="flex min-w-max gap-2">
            {tabs.map((tabItem) => {
              const Icon = tabItem.icon;
              const isActive = activeTab === tabItem.id;

              return (
                <button
                  key={tabItem.id}
                  type="button"
                  onClick={() => setActiveTab(tabItem.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-black transition ${
                    isActive
                      ? "bg-[#D4AF37] text-[#061A33]"
                      : "text-blue-100 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tabItem.label}
                </button>
              );
            })}
          </div>
        </nav>

        {activeTab === "registros" ? (
          <RecordsTab
            dataLoading={dataLoading}
            filteredRegistrations={filteredRegistrations}
            filters={filters}
            setFilters={setFilters}
            updateRegistration={updateRegistration}
            updateContactStatus={updateContactStatus}
            editAmount={editAmount}
            editNotes={editNotes}
            contactUpdates={contactUpdates}
            contactSuccess={contactSuccess}
            contactErrors={contactErrors}
          />
        ) : null}

        {activeTab === "detalles" ? <DetailsTab stats={stats} /> : null}

        {activeTab === "pagos" ? <PaymentsTab stats={stats} /> : null}
      </div>
    </AdminShell>
  );
}

function RecordsTab({
  dataLoading,
  filteredRegistrations,
  filters,
  setFilters,
  updateRegistration,
  updateContactStatus,
  editAmount,
  editNotes,
  contactUpdates,
  contactSuccess,
  contactErrors,
}: {
  dataLoading: boolean;
  filteredRegistrations: KerigmaRegistration[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  updateRegistration: (
    id: string,
    data: Partial<KerigmaRegistration>,
  ) => Promise<void>;
  updateContactStatus: (
    registration: KerigmaRegistration,
    nextStatus: ContactStatus,
  ) => Promise<void>;
  editAmount: (registration: KerigmaRegistration) => Promise<void>;
  editNotes: (registration: KerigmaRegistration) => Promise<void>;
  contactUpdates: Record<string, ContactStatus>;
  contactSuccess: Record<string, boolean>;
  contactErrors: Record<string, string>;
}) {
  return (
    <>
      <section className="mt-8 rounded-[2rem] border border-white/12 bg-white/[0.07] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.16)] backdrop-blur-xl">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-black text-white">Registros</h2>
            <p className="mt-1 text-sm leading-6 text-blue-100/78">
              Busca por nombre y combina filtros por comunidad, sexo, pago y
              contacto para coordinar el seguimiento después de misa.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setFilters(initialFilters)}
              className="rounded-full border border-white/12 px-3 py-1.5 text-sm font-bold text-blue-100 transition hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
            >
              Limpiar filtros
            </button>
            <span className="w-fit rounded-full border border-white/12 bg-white/8 px-3 py-1 text-sm font-bold text-blue-100">
              {filteredRegistrations.length} visibles
            </span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <NameSearchFilter
            value={filters.nameSearch}
            onChange={(value) =>
              setFilters((current) => ({
                ...current,
                nameSearch: value,
              }))
            }
            onClear={() =>
              setFilters((current) => ({
                ...current,
                nameSearch: "",
              }))
            }
          />
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
          <ContactStatusFilter
            value={filters.contactStatus}
            onChange={(value) =>
              setFilters((current) => ({
                ...current,
                contactStatus: value as Filters["contactStatus"],
              }))
            }
          />
        </div>
      </section>

      <section className="mt-8 overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.07] shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl">
        {dataLoading ? (
          <div className="flex min-h-52 items-center justify-center gap-3 text-blue-100">
            <Loader2 className="h-5 w-5 animate-spin" />
            Cargando registros
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <EmptyRegistrationsState
            hasSearch={normalizeSearchText(filters.nameSearch).length > 0}
            onClearSearch={() =>
              setFilters((current) => ({
                ...current,
                nameSearch: "",
              }))
            }
            onResetFilters={() => setFilters(initialFilters)}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1660px] border-separate border-spacing-0 text-left text-sm">
              <thead className="bg-[#061A33]/78 text-xs uppercase tracking-[0.12em] text-blue-100">
                <tr>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Edad</TableHead>
                  <TableHead>Sexo</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Parroquia</TableHead>
                  <TableHead>Estado de pago</TableHead>
                  <TableHead>Estado de contacto</TableHead>
                  <TableHead>Costo total</TableHead>
                  <TableHead>Monto abonado</TableHead>
                  <TableHead>Saldo pendiente</TableHead>
                  <TableHead>Confirmado</TableHead>
                  <TableHead>Fecha de registro</TableHead>
                  <TableHead>Acciones</TableHead>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((registration) => {
                  const amountPaid = getMontoAbonado(registration);
                  const pendingBalance = getSaldoPendiente(registration);
                  const contactStatus =
                    contactUpdates[registration.id] ??
                    getContactStatus(registration);
                  const isContactUpdating = Boolean(
                    contactUpdates[registration.id],
                  );

                  return (
                    <tr
                      key={registration.id}
                      className="border-t border-white/10 text-blue-50/90 transition hover:bg-white/[0.045]"
                    >
                      <TableCell>
                        <div className="font-black text-white">
                          {registration.nombre}
                        </div>
                        {registration.notas ? (
                          <div className="mt-1 max-w-[240px] truncate text-xs font-medium text-blue-200/82">
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
                        <div className="mt-2">
                          <PaymentBadge status={registration.estadoPago} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <ContactStatusControl
                          status={contactStatus}
                          isUpdating={isContactUpdating}
                          wasSaved={Boolean(contactSuccess[registration.id])}
                          error={contactErrors[registration.id]}
                          onChange={(nextStatus) =>
                            updateContactStatus(registration, nextStatus)
                          }
                        />
                      </TableCell>
                      <TableCell>{formatCurrency(KERIGMA_COSTO)}</TableCell>
                      <TableCell>{formatCurrency(amountPaid)}</TableCell>
                      <TableCell>
                        <span
                          className={
                            pendingBalance === 0
                              ? "font-black text-emerald-200"
                              : "font-black text-amber-200"
                          }
                        >
                          {formatCurrency(pendingBalance)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() =>
                            updateRegistration(registration.id, {
                              confirmado: !registration.confirmado,
                            })
                          }
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-2 font-bold transition ${
                            registration.confirmado
                              ? "bg-emerald-400/14 text-emerald-200 hover:bg-emerald-400/22"
                              : "bg-white/8 text-blue-100 hover:bg-white/12"
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
                            Editar abono
                          </ActionButton>
                          <ActionButton onClick={() => editNotes(registration)}>
                            Notas
                          </ActionButton>
                          <Link
                            href={getWhatsAppUrl(registration.telefono)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-full bg-emerald-400/14 px-3 py-2 text-xs font-black text-emerald-100 transition hover:bg-emerald-400/22"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            WhatsApp
                          </Link>
                          <ActionButton
                            disabled={isContactUpdating}
                            onClick={() =>
                              updateContactStatus(
                                registration,
                                getContactStatus(registration) === "contacted"
                                  ? "not_contacted"
                                  : "contacted",
                              )
                            }
                          >
                            {isContactUpdating ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Send className="h-3.5 w-3.5" />
                            )}
                            {getContactStatus(registration) === "contacted"
                              ? "Sin contactar"
                              : "Marcar contactado"}
                          </ActionButton>
                        </div>
                      </TableCell>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

function DetailsTab({
  stats,
}: {
  stats: {
    total: number;
    bySex: Array<{ label: Sexo; value: number }>;
    confirmed: number;
    pending: number;
    reserved: number;
    paid: number;
    contacted: number;
    notContacted: number;
  };
}) {
  const men = stats.bySex.find((item) => item.label === "Hombre")?.value ?? 0;
  const women = stats.bySex.find((item) => item.label === "Mujer")?.value ?? 0;

  return (
    <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard icon={Users} label="Total inscritos" value={stats.total} />
      <StatCard icon={Users} label="Hombres" value={men} tone="blue" />
      <StatCard icon={Users} label="Mujeres" value={women} tone="violet" />
      <StatCard
        icon={CheckCircle2}
        label="Confirmados"
        value={stats.confirmed}
        tone="green"
      />
      <StatCard
        icon={Clock3}
        label="Pendientes"
        value={stats.pending}
        tone="orange"
      />
      <StatCard
        icon={CircleDollarSign}
        label="Apartados"
        value={stats.reserved}
        tone="gold"
      />
      <StatCard
        icon={CheckCircle2}
        label="Pagados"
        value={stats.paid}
        tone="green"
      />
      <StatCard
        icon={Send}
        label="Contactados"
        value={stats.contacted}
        tone="blue"
      />
      <StatCard
        icon={MessageCircle}
        label="Pendientes de contactar"
        value={stats.notContacted}
        tone="gold"
      />
    </section>
  );
}

function PaymentsTab({
  stats,
}: {
  stats: {
    paid: number;
    reserved: number;
    pending: number;
    totalIncome: number;
    pendingBalance: number;
    fullRegistrationValue: number;
  };
}) {
  return (
    <section className="mt-8 grid gap-4 lg:grid-cols-3">
      <StatCard
        icon={CircleDollarSign}
        label="Costo por inscripción"
        value={formatCurrency(KERIGMA_COSTO)}
        tone="gold"
      />
      <StatCard
        icon={CircleDollarSign}
        label="Monto total de inscripciones"
        value={formatCurrency(stats.totalIncome)}
        tone="green"
      />
      <StatCard
        icon={Clock3}
        label="Saldo pendiente total"
        value={formatCurrency(stats.pendingBalance)}
        tone="orange"
      />
      <StatCard
        icon={CheckCircle2}
        label="Total pagados"
        value={stats.paid}
        tone="green"
      />
      <StatCard
        icon={CircleDollarSign}
        label="Total apartados"
        value={stats.reserved}
        tone="gold"
      />
      <StatCard
        icon={Clock3}
        label="Total pendientes"
        value={stats.pending}
        tone="orange"
      />
      <div className="rounded-[1.5rem] border border-white/12 bg-white/[0.08] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl lg:col-span-3">
        <p className="text-sm font-bold text-blue-100">
          Valor completo si todos liquidan
        </p>
        <p className="mt-3 text-4xl font-black text-white">
          {formatCurrency(stats.fullRegistrationValue)}
        </p>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-emerald-300"
            style={{
              width:
                stats.fullRegistrationValue > 0
                  ? `${Math.round(
                      (stats.totalIncome / stats.fullRegistrationValue) * 100,
                    )}%`
                  : "0%",
            }}
          />
        </div>
      </div>
    </section>
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

function ParishMetricCard({
  label,
  value,
  percentage,
}: {
  label: Parroquia;
  value: number;
  percentage: number;
}) {
  const styles = parishStyles[label];

  return (
    <div
      className={`rounded-[1.5rem] border border-white/12 bg-white/[0.085] p-5 backdrop-blur-xl ${styles.glow}`}
    >
      <p className={`text-sm font-black ${styles.accent}`}>{label}</p>
      <div className="mt-5 flex items-end justify-between gap-4">
        <p className="text-4xl font-black text-white">{value}</p>
        <p className="text-sm font-bold text-blue-100">{percentage}%</p>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${styles.bar}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-blue-100/60">
        inscritos por comunidad
      </p>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  tone = "neutral",
}: {
  label: string;
  value: string | number;
  icon?: typeof Users;
  tone?: "neutral" | "blue" | "violet" | "green" | "gold" | "orange";
}) {
  const toneClass = {
    neutral: "text-blue-100 bg-white/8",
    blue: "text-sky-200 bg-sky-300/12",
    violet: "text-violet-200 bg-violet-300/12",
    green: "text-emerald-200 bg-emerald-300/12",
    gold: "text-[#D4AF37] bg-[#D4AF37]/12",
    orange: "text-orange-200 bg-orange-300/12",
  }[tone];

  return (
    <div className="rounded-[1.5rem] border border-white/12 bg-white/[0.08] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-bold text-blue-100">{label}</p>
        {Icon ? (
          <span className={`grid h-10 w-10 place-items-center rounded-2xl ${toneClass}`}>
            <Icon className="h-5 w-5" />
          </span>
        ) : null}
      </div>
      <p className="mt-4 text-3xl font-black text-white">{value}</p>
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

function NameSearchFilter({
  value,
  onChange,
  onClear,
}: {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}) {
  return (
    <label className="grid gap-2 md:col-span-2 xl:col-span-1">
      <span className="text-sm font-bold text-blue-50">Buscar inscripción</span>
      <span className="relative block">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-100/62"
        />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label="Buscar inscripción por nombre"
          placeholder="Buscar por nombre..."
          className="field-input"
          style={{ paddingLeft: "2.75rem", paddingRight: "3rem" }}
        />
        {value ? (
          <button
            type="button"
            onClick={onClear}
            aria-label="Limpiar búsqueda por nombre"
            className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-blue-100/72 transition hover:bg-white/10 hover:text-[#D4AF37]"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </span>
    </label>
  );
}

function ContactStatusFilter({
  value,
  onChange,
}: {
  value: Filters["contactStatus"];
  onChange: (value: Filters["contactStatus"]) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-blue-50">Estado de contacto</span>
      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value as Filters["contactStatus"])
        }
        className="field-input"
      >
        <option value="todos">Todos</option>
        <option value="not_contacted">Sin contactar</option>
        <option value="contacted">Contactados</option>
      </select>
    </label>
  );
}

function EmptyRegistrationsState({
  hasSearch,
  onClearSearch,
  onResetFilters,
}: {
  hasSearch: boolean;
  onClearSearch: () => void;
  onResetFilters: () => void;
}) {
  return (
    <div className="grid min-h-64 place-items-center p-8 text-center">
      <div className="max-w-md">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-white/12 bg-white/[0.08] text-blue-100">
          <Search aria-hidden="true" className="h-6 w-6" />
        </div>
        <h3 className="mt-5 text-2xl font-black text-white">
          No encontramos inscripciones que coincidan con tu búsqueda.
        </h3>
        <p className="mt-3 text-sm leading-6 text-blue-100/78">
          Ajusta el nombre o restablece los filtros para volver a ver todos los
          registros disponibles.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          {hasSearch ? (
            <button
              type="button"
              onClick={onClearSearch}
              className="rounded-full border border-white/12 px-5 py-3 text-sm font-black text-blue-50 transition hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
            >
              Limpiar búsqueda
            </button>
          ) : null}
          <button
            type="button"
            onClick={onResetFilters}
            className="rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-black text-[#061A33] transition hover:bg-[#F0D895]"
          >
            Restablecer filtros
          </button>
        </div>
      </div>
    </div>
  );
}

function PaymentBadge({ status }: { status: EstadoPago }) {
  const styles = {
    pendiente: "border-orange-200/20 bg-orange-400/12 text-orange-100",
    apartado: "border-[#D4AF37]/26 bg-[#D4AF37]/12 text-[#F0D895]",
    pagado: "border-emerald-200/20 bg-emerald-400/12 text-emerald-100",
  }[status];

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-black uppercase tracking-[0.1em] ${styles}`}
    >
      {status}
    </span>
  );
}

function ContactStatusBadge({ status }: { status: ContactStatus }) {
  const styles = {
    not_contacted: "border-amber-200/20 bg-amber-300/10 text-amber-100",
    contacted: "border-sky-200/20 bg-sky-300/12 text-sky-100",
  }[status];

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-black uppercase tracking-[0.1em] ${styles}`}
    >
      {getContactStatusLabel(status)}
    </span>
  );
}

function ContactStatusControl({
  status,
  isUpdating,
  wasSaved,
  error,
  onChange,
}: {
  status: ContactStatus;
  isUpdating: boolean;
  wasSaved: boolean;
  error?: string;
  onChange: (status: ContactStatus) => void;
}) {
  return (
    <div className="min-w-44">
      <div className="flex flex-col gap-2">
        <select
          value={status}
          disabled={isUpdating}
          onChange={(event) => onChange(event.target.value as ContactStatus)}
          className="rounded-full border border-white/12 bg-[#061A33] px-3 py-2 text-sm font-bold text-blue-50 disabled:cursor-not-allowed disabled:opacity-65"
        >
          <option value="not_contacted">Sin contactar</option>
          <option value="contacted">Contactado</option>
        </select>
        <ContactStatusBadge status={status} />
      </div>
      <div className="mt-2 min-h-5">
        {isUpdating ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-100">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Guardando
          </span>
        ) : null}
        {!isUpdating && wasSaved ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Guardado
          </span>
        ) : null}
        {!isUpdating && error ? (
          <span className="text-xs font-bold leading-5 text-red-200">
            {error}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function TableHead({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-4 font-black">{children}</th>;
}

function TableCell({ children }: { children: React.ReactNode }) {
  return <td className="border-t border-white/10 px-4 py-5 align-top">{children}</td>;
}

function ActionButton({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1 rounded-full border border-white/12 px-3 py-2 text-xs font-black text-blue-50 transition hover:border-[#D4AF37]/60 hover:text-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-55"
    >
      {children}
    </button>
  );
}
