"use client";

import { Quote } from "lucide-react";
import { testimonials } from "@/data/site";
import { MotionDiv, MotionSection, fadeUp, stagger } from "@/components/motion";

export function TestimonialsSection() {
  return (
    <MotionSection
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={stagger}
      className="testimonials-bg relative overflow-hidden py-24 text-cream sm:py-32"
    >
      <div className="section-shell relative z-10">
        <MotionDiv variants={fadeUp} className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-[#D4AF37] drop-shadow-[0_0_18px_rgba(212,175,55,0.28)]">
            Testimonios
          </p>
          <h2 className="text-3xl font-semibold text-[#F8FAFC] sm:text-4xl lg:text-5xl">
            Historias que empiezan con un sí
          </h2>
          <p className="mt-5 text-base leading-8 text-blue-100 sm:text-lg">
            Estos textos son editables y pueden reemplazarse por testimonios
            reales cuando la comunidad quiera compartirlos.
          </p>
        </MotionDiv>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <MotionDiv
              key={item.name}
              variants={fadeUp}
              className="group rounded-2xl border border-blue-200/18 bg-white/[0.085] p-7 shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-white/[0.12] hover:shadow-[0_24px_80px_rgba(29,78,216,0.24)]"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#D4AF37]/24 bg-[#D4AF37]/10 text-[#D4AF37] shadow-[0_0_34px_rgba(212,175,55,0.12)] transition group-hover:border-[#60A5FA]/30 group-hover:bg-[#60A5FA]/12 group-hover:text-[#93C5FD]">
                <Quote className="h-6 w-6 stroke-[2.4]" />
              </div>
              <p className="mt-6 leading-8 text-[#F8FAFC]/90">{item.text}</p>
              <div className="mt-7 h-px w-16 bg-gradient-to-r from-[#D4AF37]/80 to-transparent transition group-hover:w-24 group-hover:from-[#60A5FA]/80" />
              <p className="mt-5 font-extrabold text-[#D4AF37] drop-shadow-[0_2px_14px_rgba(0,0,0,0.24)]">
                {item.name}
              </p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
