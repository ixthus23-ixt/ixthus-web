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
            IXTHUS tiene presencia en tres parroquias de Ciudad de México,
            donde jóvenes se reúnen para vivir la fe en comunidad, oración,
            formación y misión.
          </p>
        </MotionDiv>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {locations.map((location) => (
            <MotionDiv
              key={location.name}
              variants={fadeUp}
              className="group flex min-h-[360px] flex-col rounded-3xl border border-blue-200/18 bg-white/[0.085] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-white/[0.12]"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl border border-[#60A5FA]/20 bg-[#60A5FA]/14 text-[#93C5FD] transition group-hover:border-[#D4AF37]/35 group-hover:bg-[#D4AF37]/12 group-hover:text-[#D4AF37]">
                  <MapPin className="h-6 w-6 stroke-[2.4]" />
                </div>
                <span className="rounded-full border border-[#D4AF37]/24 bg-[#D4AF37]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#D4AF37]">
                  {location.tag}
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-[#F8FAFC]">
                {location.name}
              </h3>
              <p className="mt-4 leading-7 text-blue-100/90">{location.text}</p>
              <div className="mt-6 h-px w-16 bg-gradient-to-r from-[#D4AF37]/80 to-transparent transition group-hover:w-24" />
              <p className="mt-5 text-sm font-medium leading-6 text-blue-50/82">
                {location.address}
              </p>

              <Link
                href={location.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm font-bold text-cream transition hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
              >
                Ver en Google Maps
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
