"use client";

import { ArrowRight, Camera } from "lucide-react";
import Link from "next/link";
import { historyContent, historyTimeline } from "@/data/site";
import { MotionDiv, MotionSection, fadeUp, stagger } from "@/components/motion";

export function HistorySection() {
  return (
    <MotionSection
      id="historia"
      className="history-bg relative overflow-hidden py-24 text-cream sm:py-32"
    >
      <div className="section-shell relative z-10">
        <MotionDiv
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr]"
        >
          <MotionDiv variants={fadeUp}>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-[#D4AF37] drop-shadow-[0_0_18px_rgba(212,175,55,0.28)]">
              {historyContent.eyebrow}
            </p>
            <h2 className="text-4xl font-semibold leading-tight text-[#F8FAFC] sm:text-5xl lg:text-6xl">
              {historyContent.title}
            </h2>
            <div className="mt-7 grid gap-5 text-base leading-8 text-blue-100 sm:text-lg">
              {historyContent.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </MotionDiv>

          <MotionDiv variants={fadeUp} className="grid gap-4 sm:grid-cols-3">
            {historyContent.photos.map((photo, index) => (
              <div
                key={photo.label}
                className={`relative min-h-[260px] overflow-hidden rounded-3xl border border-blue-200/16 bg-white/[0.075] shadow-[0_24px_80px_rgba(0,0,0,0.24)] ${
                  index === 1 ? "sm:translate-y-8" : ""
                }`}
              >
                <div
                  aria-label={photo.label}
                  role="img"
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${photo.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061A33] via-[#061A33]/48 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#F8FAFC] backdrop-blur">
                    <Camera className="h-3.5 w-3.5 text-[#D4AF37]" />
                    {photo.label}
                  </span>
                </div>
              </div>
            ))}
          </MotionDiv>
        </MotionDiv>

        <MotionDiv
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="relative mt-20"
        >
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-[#D4AF37]/0 via-[#D4AF37]/65 to-[#60A5FA]/0 md:left-1/2 md:block" />
          <div className="grid gap-6">
            {historyTimeline.map((item, index) => (
              <MotionDiv
                key={item.title}
                variants={fadeUp}
                className={`relative grid gap-5 md:grid-cols-2 md:items-center ${
                  index % 2 === 0 ? "" : "md:[&>div:first-child]:col-start-2"
                }`}
              >
                <div
                  className={`rounded-3xl border border-blue-200/18 bg-white/[0.085] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.23)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-white/[0.12] ${
                    index % 2 === 0 ? "md:mr-10" : "md:ml-10"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl border border-[#60A5FA]/20 bg-[#60A5FA]/14 text-[#93C5FD]">
                      <item.icon className="h-6 w-6 stroke-[2.4]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
                        {item.stage} · {item.year}
                      </p>
                      <h3 className="mt-2 text-2xl font-extrabold text-[#F8FAFC]">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-5 whitespace-pre-line leading-7 text-blue-100/92 sm:leading-8">
                    {item.text}
                  </p>
                </div>

                <div className="absolute left-6 top-8 hidden h-4 w-4 -translate-x-1/2 rounded-full border border-[#D4AF37] bg-[#061A33] shadow-[0_0_28px_rgba(212,175,55,0.48)] md:left-1/2 md:block" />
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>

        <MotionDiv
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="mx-auto mt-20 max-w-4xl rounded-3xl border border-[#D4AF37]/22 bg-[#D4AF37]/8 p-7 text-center shadow-[0_28px_90px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-10"
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#D4AF37]">
            {historyContent.missionTitle}
          </p>
          <div className="mx-auto max-w-3xl whitespace-pre-line text-lg leading-8 text-blue-50 sm:text-xl">
            {historyContent.missionText}
          </div>
          <Link
            href="#primer-paso"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-bold text-ink shadow-[0_18px_48px_rgba(217,183,111,0.26)] transition hover:bg-gold-soft"
          >
            Quiero formar parte
            <ArrowRight className="h-4 w-4" />
          </Link>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
