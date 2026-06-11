"use client";

import { MapPin } from "lucide-react";
import { locations, parishPresenceContent } from "@/data/site";
import { MotionDiv, MotionSection, fadeUp, stagger } from "@/components/motion";

export function ParishPresenceSection() {
  return (
    <MotionSection
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#061A33_0%,#0B2A55_100%)] py-24 text-cream sm:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(96,165,250,0.14),transparent_34%),radial-gradient(circle_at_82%_78%,rgba(29,78,216,0.18),transparent_34%)]" />
      <div className="section-shell relative z-10">
        <MotionDiv variants={fadeUp} className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
            {parishPresenceContent.eyebrow}
          </p>
          <h2 className="text-4xl font-semibold leading-tight text-[#F8FAFC] sm:text-5xl">
            {parishPresenceContent.title}
          </h2>
          <p className="mt-5 text-base leading-8 text-blue-100 sm:text-lg">
            {parishPresenceContent.text}
          </p>
          <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            {parishPresenceContent.institutionalLine}
          </p>
        </MotionDiv>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {locations.map((location) => (
            <MotionDiv
              key={location.name}
              variants={fadeUp}
              className={`overflow-hidden rounded-3xl border bg-white/[0.085] shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.12] ${
                location.tag === "Sede principal"
                  ? "border-[#D4AF37]/40 ring-1 ring-[#D4AF37]/20"
                  : "border-blue-200/18 hover:border-[#D4AF37]/40"
              }`}
            >
              <div className="relative min-h-[190px]">
                <div
                  aria-label={location.imageAlt}
                  role="img"
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${location.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061A33] via-[#061A33]/46 to-transparent" />
                <span className="absolute bottom-5 left-5 rounded-full border border-[#D4AF37]/24 bg-[#061A33]/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#D4AF37] backdrop-blur">
                  {location.tag}
                </span>
              </div>
              <div className="p-7">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-[#60A5FA]/20 bg-[#60A5FA]/14 text-[#93C5FD]">
                  <MapPin className="h-6 w-6 stroke-[2.4]" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#F8FAFC]">
                  {location.name}
                </h3>
                <p className="mt-4 leading-7 text-blue-100/90">
                  {location.text}
                </p>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
