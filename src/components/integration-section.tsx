"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { integrationContent, integrationPoints } from "@/data/site";
import { MotionDiv, MotionSection, fadeUp, stagger } from "@/components/motion";

export function IntegrationSection() {
  return (
    <MotionSection
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#0B2A55_0%,#071A35_100%)] py-24 text-cream sm:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_22%,rgba(96,165,250,0.16),transparent_36%),radial-gradient(circle_at_86%_72%,rgba(212,175,55,0.08),transparent_30%)]" />
      <div className="section-shell relative z-10 grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <MotionDiv variants={fadeUp}>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
            {integrationContent.eyebrow}
          </p>
          <h2 className="text-4xl font-semibold leading-tight text-[#F8FAFC] sm:text-5xl">
            {integrationContent.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-blue-100">
            {integrationContent.text}
          </p>
          <Link
            href="#primer-paso"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-bold text-ink shadow-[0_18px_48px_rgba(217,183,111,0.26)] transition hover:bg-gold-soft"
          >
            {integrationContent.button}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </MotionDiv>

        <div className="grid gap-4 sm:grid-cols-2">
          {integrationPoints.map((point) => (
            <MotionDiv
              key={point.title}
              variants={fadeUp}
              className="rounded-3xl border border-blue-200/18 bg-white/[0.085] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl"
            >
              <point.icon className="h-8 w-8 text-[#93C5FD]" />
              <p className="mt-5 text-lg font-extrabold leading-snug text-[#F8FAFC]">
                {point.title}
              </p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
