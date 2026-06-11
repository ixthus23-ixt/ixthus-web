"use client";

import { Camera, Heart } from "lucide-react";
import { MotionDiv, MotionSection, fadeUp, stagger } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";

const gallery = [
  { className: "community-image-1", label: "Encuentro juvenil" },
  { className: "community-image-2", label: "Misión y camino" },
  { className: "community-image-3", label: "Amistad en comunidad" },
  { className: "community-image-4", label: "Oración compartida" },
];

export function CommunitySection() {
  return (
    <MotionSection
      id="comunidad"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="bg-[linear-gradient(180deg,#071A35_0%,#08204A_46%,#0D47A1_100%)] py-24 sm:py-32"
    >
      <div className="section-shell grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <MotionDiv variants={fadeUp}>
          <SectionHeading
            align="left"
            eyebrow="Comunidad"
            title="Una familia espiritual donde la fe se vuelve vida"
            text="Pertenecer a IXTHUS es encontrar jóvenes que también quieren amar más a Cristo, levantarse cuando caen, servir con generosidad y descubrir que la Iglesia puede sentirse como hogar."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2 text-sm font-semibold text-cream">
              <Heart className="h-4 w-4 text-gold" />
              Amistad real
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2 text-sm font-semibold text-cream">
              <Camera className="h-4 w-4 text-gold" />
              Momentos con sentido
            </span>
          </div>
        </MotionDiv>

        <MotionDiv
          variants={fadeUp}
          className="grid min-h-[520px] grid-cols-2 gap-4"
        >
          {gallery.map((image, index) => (
            <div
              key={image.label}
              className={`${image.className} relative overflow-hidden rounded-lg bg-cover bg-center shadow-2xl shadow-black/30 ${
                index === 0 || index === 3 ? "translate-y-6" : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-sm font-bold text-cream">
                {image.label}
              </p>
            </div>
          ))}
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
