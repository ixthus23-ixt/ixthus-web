"use client";

import { MessageCircle, Send } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { MotionDiv, MotionSection, fadeUp } from "@/components/motion";

export function PrayerSection() {
  return (
    <MotionSection
      id="oracion"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="bg-[linear-gradient(180deg,#071A35_0%,#0B2A55_100%)] py-24 sm:py-32"
    >
      <div className="section-shell">
        <MotionDiv
          variants={fadeUp}
          className="relative overflow-hidden rounded-lg border border-gold/20 bg-ink/40 p-8 shadow-2xl shadow-black/25 sm:p-12 lg:p-16"
        >
          <div className="absolute inset-x-0 top-0 h-px gold-line" />
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-gold">
                Oración
              </p>
              <h2 className="text-3xl font-semibold text-cream sm:text-5xl">
                Queremos orar contigo y por ti
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-warm">
                Si estás pasando por algo, si quieres agradecer o si necesitas
                que la comunidad presente una intención, este espacio queda
                listo para recibir peticiones de oración.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <ButtonLink href="https://wa.me/" variant="primary">
                Pedir oración por WhatsApp
              </ButtonLink>
              <a
                href="#primer-paso"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-bold text-cream transition hover:border-gold/60 hover:text-gold"
              >
                <Send className="h-4 w-4" />
                Escribir en el formulario
              </a>
              <p className="flex items-center gap-2 text-sm text-warm">
                <MessageCircle className="h-4 w-4 text-gold" />
                Placeholder listo para conectar después.
              </p>
            </div>
          </div>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
