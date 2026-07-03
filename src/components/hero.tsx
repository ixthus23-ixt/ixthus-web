"use client";

import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/button-link";
import { MotionDiv } from "@/components/motion";
import { heroContent, heroStats } from "@/data/site";

type ImpactCounterProps = {
  label: string;
  prefix?: string;
  value: number;
};

function ImpactCounter({ label, prefix = "", value }: ImpactCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        const duration = 1200;
        const start = performance.now();

        const animate = (time: number) => {
          const progress = Math.min((time - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(value * eased));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [value]);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-blue-200/14 bg-white/[0.075] px-4 py-3 shadow-[0_18px_56px_rgba(0,0,0,0.18)] backdrop-blur-md"
    >
      <p className="text-2xl font-black leading-none text-cream">
        <span className="text-gold">{prefix}</span>
        {count}
      </p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-100/78">
        {label}
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="inicio"
      className="cinematic-bg relative flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      {heroContent.backgroundVideoSrc ? (
        <video
          aria-hidden="true"
          className="hero-video-bg absolute inset-0 h-full w-full object-cover opacity-70"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={heroContent.backgroundVideoSrc} type="video/mp4" />
        </video>
      ) : null}
      <div className="hero-global-dim absolute inset-0" />
      <div className="hero-blue-veil absolute inset-0" />
      <div className="hero-light-field absolute inset-0 opacity-90" />
      <div className="hero-campus-lines absolute inset-0 opacity-55" />
      <div className="hero-particles absolute inset-0 opacity-35" />
      <div className="hero-depth-orbit absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-ink/86 via-ink/48 to-transparent" />
      <div className="section-shell relative z-10 py-16 sm:py-20">
        <MotionDiv
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200/25 bg-white/8 px-4 py-2 text-sm font-semibold text-cream shadow-[0_0_42px_rgba(37,99,235,0.22)] backdrop-blur-md">
            {heroContent.label}
          </div>
          <h1 className="text-5xl font-black leading-none text-cream sm:text-7xl md:text-8xl lg:text-9xl">
            {heroContent.title}
          </h1>
          <p className="mt-6 max-w-3xl text-3xl font-semibold leading-tight text-cream sm:text-4xl lg:text-5xl">
            {heroContent.slogan}
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-warm sm:text-xl">
            {heroContent.description}
          </p>
          <p className="mt-5 max-w-3xl border-l-2 border-gold/70 pl-5 text-lg font-medium leading-8 text-blue-50/95">
            {heroContent.inspiration}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="#primer-paso">Quiero unirme</ButtonLink>
            <ButtonLink href="#mision" variant="secondary">
              Conoce nuestra misión
            </ButtonLink>
          </div>

          <p className="mt-10 max-w-3xl text-base font-semibold leading-7 text-cream/90 sm:text-lg">
            {heroContent.emotionalCallout}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {heroStats.map((stat) => (
              <ImpactCounter
                key={stat.label}
                label={stat.label}
                prefix={stat.prefix}
                value={stat.value}
              />
            ))}
          </div>

          <blockquote className="mt-7 max-w-3xl text-blue-50/90">
            <p className="text-lg font-semibold leading-8">
              “{heroContent.bibleQuote}”
            </p>
            <footer className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-gold">
              {heroContent.bibleReference}
            </footer>
          </blockquote>
        </MotionDiv>
      </div>
      <a
        href="#nosotros"
        aria-label="Bajar a la siguiente sección"
        className="group absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-cream/80 transition hover:text-gold"
      >
        <span className="relative h-16 w-px overflow-hidden rounded-full bg-white/18">
          <span className="scroll-light absolute left-0 top-0 h-7 w-px rounded-full bg-gold shadow-[0_0_18px_rgba(217,183,111,0.7)]" />
        </span>
        <span className="grid h-10 w-10 place-items-center rounded-full border border-white/16 bg-white/8 shadow-[0_0_36px_rgba(96,165,250,0.16)] backdrop-blur transition group-hover:border-gold/50">
          <ArrowDown className="h-4 w-4" />
        </span>
      </a>
    </section>
  );
}
