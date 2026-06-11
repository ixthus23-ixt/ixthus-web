"use client";

import { Camera, Cross } from "lucide-react";
import { whatIsCards, whatIsContent } from "@/data/site";
import { MotionDiv, MotionSection, fadeUp, stagger } from "@/components/motion";

export function WhatIsSection() {
  return (
    <MotionSection
      id="nosotros"
      className="what-is-bg relative overflow-hidden py-24 text-cream sm:py-32"
    >
      <div className="section-shell relative z-10">
        <MotionDiv
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <MotionDiv variants={fadeUp}>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-[#D4AF37] drop-shadow-[0_0_18px_rgba(212,175,55,0.28)]">
              {whatIsContent.eyebrow}
            </p>
            <h2 className="text-4xl font-semibold leading-tight text-[#F8FAFC] sm:text-5xl lg:text-6xl">
              {whatIsContent.title}
            </h2>
            <div className="mt-7 grid gap-5 text-base leading-8 text-blue-100 sm:text-lg">
              {whatIsContent.text.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </MotionDiv>

          <MotionDiv
            variants={fadeUp}
            className="relative min-h-[460px] overflow-hidden rounded-3xl border border-blue-200/18 bg-white/[0.075] shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl"
          >
            <div
              aria-label={whatIsContent.imageAlt}
              role="img"
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${whatIsContent.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061A33] via-[#061A33]/48 to-[#1D4ED8]/18" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-4 py-2 text-sm font-semibold text-[#F8FAFC] backdrop-blur-md">
                <Camera className="h-4 w-4 text-[#D4AF37]" />
                Espacio para fotos reales
              </div>
              <div className="flex flex-wrap gap-2">
                {whatIsContent.photoTypes.map((type) => (
                  <span
                    key={type}
                    className="rounded-full border border-blue-200/18 bg-[#061A33]/62 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-blue-100 backdrop-blur"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </MotionDiv>
        </MotionDiv>

        <MotionDiv
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {whatIsCards.map((item) => (
            <MotionDiv
              key={item.title}
              variants={fadeUp}
              className="group rounded-2xl border border-blue-200/18 bg-white/[0.085] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-white/[0.12]"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-[#60A5FA]/20 bg-[#60A5FA]/14 text-[#93C5FD] transition group-hover:border-[#D4AF37]/35 group-hover:bg-[#D4AF37]/12 group-hover:text-[#D4AF37]">
                <item.icon className="h-6 w-6 stroke-[2.4]" />
              </div>
              <h3 className="text-lg font-extrabold uppercase tracking-[0.08em] text-[#F8FAFC]">
                {item.title}
              </h3>
              <p className="mt-3 leading-7 text-blue-100/90">{item.text}</p>
            </MotionDiv>
          ))}
        </MotionDiv>

        <MotionDiv
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="mx-auto mt-14 max-w-4xl rounded-3xl border border-[#D4AF37]/22 bg-[#D4AF37]/8 px-6 py-7 text-center shadow-[0_22px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl"
        >
          <Cross className="mx-auto mb-4 h-7 w-7 text-[#D4AF37]" />
          <p className="text-xl font-semibold leading-8 text-[#F8FAFC] sm:text-2xl">
            {whatIsContent.closing}
          </p>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
