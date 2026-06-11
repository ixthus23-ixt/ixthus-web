import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: ButtonLinkProps) {
  const styles = {
    primary:
      "bg-gold text-ink shadow-[0_18px_48px_rgba(217,183,111,0.28)] hover:bg-gold-soft",
    secondary:
      "border border-cream/20 bg-white/8 text-cream hover:border-gold/60 hover:bg-white/12",
    ghost: "text-cream hover:text-gold",
  };

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition ${styles[variant]}`}
    >
      {children}
      <ArrowRight aria-hidden="true" className="h-4 w-4" />
    </Link>
  );
}
