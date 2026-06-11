"use client";

import { missionCards } from "@/data/site";
import { MotionDiv, MotionSection, fadeUp, stagger } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";

export function MissionSection() {
  return (
    <MotionSection
      id="mision"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="bg-[linear-gradient(180deg,#071A35_0%,#0D47A1_52%,#071A35_100%)] py-24 sm:py-32"
    >
      <div className="section-shell">
        <MotionDiv variants={fadeUp}>
          <SectionHeading
            eyebrow="Misión, visión y objetivo"
            title="Nuestra respuesta a la llamada de Cristo"
            text="Una identidad clara para crecer como jóvenes discípulos, servir a la comunidad y llevar el Evangelio a los lugares donde vivimos cada día."
          />
        </MotionDiv>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {missionCards.map((card) => (
            <MotionDiv
              key={card.title}
              variants={fadeUp}
              className="soft-border rounded-lg bg-cream/[0.06] p-7 shadow-2xl shadow-black/20"
            >
              <div className="mb-7 grid h-13 w-13 place-items-center rounded-lg bg-gold/15 text-gold">
                <card.icon className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-cream">{card.title}</h3>
              <p className="mt-5 leading-8 text-warm">{card.text}</p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
