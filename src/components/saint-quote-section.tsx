"use client";

import { Quote } from "lucide-react";
import { saintQuote } from "@/data/site";
import { MotionDiv, MotionSection, fadeUp } from "@/components/motion";

export function SaintQuoteSection() {
  return (
    <MotionSection
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#071A35_0%,#061A33_100%)] py-20 text-cream"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(96,165,250,0.16),transparent_34%)]" />
      <div className="section-shell relative z-10">
        <MotionDiv
          variants={fadeUp}
          className="mx-auto max-w-4xl rounded-3xl border border-[#D4AF37]/22 bg-white/[0.075] p-8 text-center shadow-[0_28px_90px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-12"
        >
          <Quote className="mx-auto mb-6 h-9 w-9 text-[#D4AF37]" />
          <p className="text-2xl font-semibold leading-10 text-[#F8FAFC] sm:text-3xl">
            “{saintQuote.quote}”
          </p>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            — {saintQuote.author}
          </p>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
