"use client";

import { events } from "@/data/site";
import { MotionDiv, MotionSection, fadeUp, stagger } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";

export function EventsSection() {
  return (
    <MotionSection
      id="eventos"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="bg-ink py-24 sm:py-32"
    >
      <div className="section-shell">
        <MotionDiv variants={fadeUp}>
          <SectionHeading
            eyebrow="Eventos"
            title="Momentos para encontrarnos, crecer y salir en misión"
            text="Cada experiencia está pensada para formar jóvenes con raíces espirituales profundas y una fe capaz de tocar la vida diaria."
          />
        </MotionDiv>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <MotionDiv
              key={event.title}
              variants={fadeUp}
              className="group soft-border rounded-lg bg-white/[0.055] p-6 transition hover:-translate-y-1 hover:bg-white/[0.08]"
            >
              <div className="mb-6 flex items-center justify-between">
                <event.icon className="h-8 w-8 text-gold" />
                <span className="h-px w-16 bg-gold/40 transition group-hover:w-24" />
              </div>
              <h3 className="text-xl font-bold text-cream">{event.title}</h3>
              <p className="mt-4 leading-7 text-warm">{event.text}</p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
