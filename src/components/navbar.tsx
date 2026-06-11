"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { navItems } from "@/data/site";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/72 backdrop-blur-xl">
      <nav className="section-shell flex h-20 items-center justify-between">
        <Link href="#inicio" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-gold/12 text-sm font-black text-gold">
            IX
          </span>
          <span className="text-lg font-black tracking-[0.18em] text-cream">
            IXTHUS
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-cream/76 transition hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link
            href="#primer-paso"
            className="rounded-full bg-cream px-5 py-3 text-sm font-bold text-ink transition hover:bg-gold"
          >
            Primer paso
          </Link>
        </div>

        <button
          type="button"
          aria-label="Abrir menú"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/8 text-cream lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-ink/96 px-4 py-5 lg:hidden">
          <div className="mx-auto grid max-w-sm gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-full px-4 py-3 text-center text-sm font-semibold text-cream/82 transition hover:bg-white/8 hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#primer-paso"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gold px-4 py-3 text-center text-sm font-bold text-ink"
            >
              Primer paso
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
