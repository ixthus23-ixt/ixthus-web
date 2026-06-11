type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl text-left"
      }
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-gold">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold text-cream sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {text ? (
        <p className="mt-5 text-base leading-8 text-warm sm:text-lg">{text}</p>
      ) : null}
    </div>
  );
}
