"use client";

import { pillars } from "@/data/site";
import { MotionDiv, MotionSection, fadeUp, stagger } from "@/components/motion";

export function EssenceSection() {
  return (
    <MotionSection
      id="esencia"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="essence-bg relative overflow-hidden py-24 text-cream sm:py-32"
    >
      <div className="section-shell relative z-10">
        <MotionDiv variants={fadeUp} className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-[#D4AF37] drop-shadow-[0_0_18px_rgba(212,175,55,0.28)]">
            Nuestra esencia
          </p>
          <h2 className="text-3xl font-semibold text-[#F8FAFC] sm:text-4xl lg:text-5xl">
            Pilares que sostienen nuestra vida comunitaria
          </h2>
          <p className="mt-5 text-base leading-8 text-blue-100 sm:text-lg">
            No somos solo actividades. Somos una forma de vivir la fe: con
            Cristo al centro, en comunidad, en oración y en salida.
          </p>
        </MotionDiv>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <MotionDiv
              key={pillar.title}
              variants={fadeUp}
              className="group flex min-h-[280px] flex-col rounded-2xl border border-blue-200/18 bg-white/[0.085] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-white/[0.12] hover:shadow-[0_24px_80px_rgba(29,78,216,0.24)] sm:p-6"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-[#60A5FA]/20 bg-[#60A5FA]/14 text-[#93C5FD] shadow-[0_0_34px_rgba(96,165,250,0.12)] transition group-hover:border-[#D4AF37]/35 group-hover:bg-[#D4AF37]/12 group-hover:text-[#D4AF37]">
                <pillar.icon className="h-6 w-6 stroke-[2.4]" />
              </div>
              <div className="mb-4 h-px w-12 bg-gradient-to-r from-[#60A5FA]/80 to-transparent transition group-hover:w-20 group-hover:from-[#D4AF37]/85" />
              <h3 className="text-base font-extrabold leading-snug text-[#F8FAFC] drop-shadow-[0_2px_14px_rgba(0,0,0,0.25)] sm:text-lg">
                {pillar.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-blue-100/90">
                {pillar.text}
              </p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
