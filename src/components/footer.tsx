import Link from "next/link";
import { Church, Mail, MapPin } from "lucide-react";
import {
  footerContent,
  navItems,
  parishPresence,
  socialLinks,
} from "@/data/site";

export function Footer() {
  return (
    <footer id="contacto" className="border-t border-white/10 bg-[#041126] py-12">
      <div className="section-shell">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <p className="text-2xl font-black tracking-[0.16em] text-cream">
              IXTHUS
            </p>
            <p className="mt-4 max-w-md leading-7 text-warm">
              {footerContent.description}
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-blue-100/72">
              {footerContent.institutional}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-cream">Navegación</h3>
            <div className="mt-4 grid gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-warm transition hover:text-gold"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-cream">Contacto</h3>
            <div className="mt-4 grid gap-3 text-sm text-warm">
              <p className="flex items-center gap-2">
                <Church className="h-4 w-4 text-gold" />
                Presencia en 3 parroquias:
              </p>
              <ul className="ml-6 grid gap-2 list-disc marker:text-gold">
                {parishPresence.map((parish) => (
                  <li key={parish}>{parish}</li>
                ))}
              </ul>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" />
                {footerContent.city}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold" />
                {footerContent.email}
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-full border border-white/12 px-4 py-2 text-sm font-semibold text-cream transition hover:border-gold/60 hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 text-sm text-warm">
          IXTHUS - Hacer del mundo la Iglesia que Jesús soñó.
        </div>
      </div>
    </footer>
  );
}
