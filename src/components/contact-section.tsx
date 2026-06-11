"use client";

import { Send } from "lucide-react";
import { MotionDiv, MotionSection, fadeUp } from "@/components/motion";

export function ContactSection() {
  return (
    <MotionSection
      id="primer-paso"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-ink py-24 sm:py-32"
    >
      <div className="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <MotionDiv variants={fadeUp}>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-gold">
            Primer paso
          </p>
          <h2 className="text-4xl font-semibold leading-tight text-cream sm:text-5xl">
            Empieza a caminar con IXTHUS
          </h2>
          <p className="mt-6 text-lg leading-8 text-warm">
            No necesitas tener todo resuelto para acercarte. Ven como estás:
            con preguntas, con ganas, con historia. Cristo también llama desde
            el camino.
          </p>
          <div className="mt-8 h-px max-w-sm bg-gold/45" />
          <p className="mt-8 text-2xl font-semibold text-cream">
            Hacer del mundo la Iglesia que Jesús soñó.
          </p>
        </MotionDiv>

        <MotionDiv
          variants={fadeUp}
          className="soft-border rounded-lg bg-white/[0.06] p-6 shadow-2xl shadow-black/25 sm:p-8"
        >
          <form className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-cream">Nombre</span>
              <input
                type="text"
                name="name"
                placeholder="Tu nombre"
                className="min-h-12 rounded-lg border border-white/12 bg-ink/55 px-4 text-cream outline-none transition placeholder:text-warm/50 focus:border-gold"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-cream">Edad</span>
              <input
                type="number"
                name="age"
                placeholder="Ej. 18"
                className="min-h-12 rounded-lg border border-white/12 bg-ink/55 px-4 text-cream outline-none transition placeholder:text-warm/50 focus:border-gold"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-cream">
                WhatsApp
              </span>
              <input
                type="tel"
                name="whatsapp"
                placeholder="Tu número"
                className="min-h-12 rounded-lg border border-white/12 bg-ink/55 px-4 text-cream outline-none transition placeholder:text-warm/50 focus:border-gold"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-cream">Mensaje</span>
              <textarea
                name="message"
                rows={5}
                placeholder="Cuéntanos cómo te gustaría acercarte"
                className="rounded-lg border border-white/12 bg-ink/55 px-4 py-3 text-cream outline-none transition placeholder:text-warm/50 focus:border-gold"
              />
            </label>
            <button
              type="button"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-bold text-ink transition hover:bg-gold-soft"
            >
              <Send className="h-4 w-4" />
              Enviar primer paso
            </button>
            <p className="text-center text-sm leading-6 text-warm/75">
              Este formulario está listo para conectarse después con backend,
              Google Forms o WhatsApp.
            </p>
          </form>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
