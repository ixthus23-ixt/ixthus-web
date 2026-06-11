"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import { locations } from "@/data/site";
import { MotionDiv, MotionSection, fadeUp, stagger } from "@/components/motion";

export function LocationsSection() {
  return (
    <MotionSection
      id="ubicanos"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#071A35_0%,#0B2A55_52%,#061A33_100%)] py-24 text-cream sm:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(96,165,250,0.16),transparent_34%),radial-gradient(circle_at_86%_78%,rgba(29,78,216,0.2),transparent_34%)]" />
      <div className="section-shell relative z-10">
        <MotionDiv variants={fadeUp} className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-[#D4AF37] drop-shadow-[0_0_18px_rgba(212,175,55,0.28)]">
            Ubícanos
          </p>
          <h2 className="text-4xl font-semibold leading-tight text-[#F8FAFC] sm:text-5xl lg:text-6xl">
            Encuentra una comunidad IXTHUS cerca de ti
          </h2>
          <p className="mt-5 text-base leading-8 text-blue-100 sm:text-lg">
            IXTHUS tiene presencia en comunidades parroquiales de la
            Arquidiócesis Primada de México, donde jóvenes universitarios
            encuentran espacios de formación, oración, servicio y misión.
          </p>
          <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            Presencia actual en la Arquidiócesis Primada de México
          </p>
        </MotionDiv>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {locations.map((location) => (
            <MotionDiv
              key={location.name}
              variants={fadeUp}
              className={`group flex min-h-[560px] flex-col overflow-hidden rounded-3xl border bg-white/[0.085] shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.12] ${
                location.tag === "Sede principal"
                  ? "border-[#D4AF37]/40 ring-1 ring-[#D4AF37]/20"
                  : "border-blue-200/18 hover:border-[#D4AF37]/40"
              }`}
            >
              <div className="relative min-h-[210px] overflow-hidden">
                <div
                  aria-label={location.imageAlt}
                  role="img"
                  className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${location.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061A33] via-[#061A33]/42 to-transparent" />
                <div className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-2xl border border-white/16 bg-[#061A33]/58 text-[#93C5FD] backdrop-blur-md transition group-hover:text-[#D4AF37]">
                  <MapPin className="h-6 w-6 stroke-[2.4]" />
                </div>
                <span className="absolute bottom-5 left-5 rounded-full border border-[#D4AF37]/28 bg-[#061A33]/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#D4AF37] backdrop-blur">
                  {location.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-2xl font-extrabold text-[#F8FAFC]">
                  {location.name}
                </h3>
                <p className="mt-4 leading-7 text-blue-100/90">
                  {location.text}
                </p>
                <div className="mt-6 h-px w-16 bg-gradient-to-r from-[#D4AF37]/80 to-transparent transition group-hover:w-24" />
                <p className="mt-5 text-sm font-medium leading-6 text-blue-50/82">
                  {location.address}
                </p>

                <div className="mt-auto grid gap-3 pt-7 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <Link
                    href={location.directionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-5 text-sm font-bold text-ink transition hover:bg-gold-soft"
                  >
                    Cómo llegar
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm font-bold text-cream transition hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
                  >
                    Ver en Google Maps
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
