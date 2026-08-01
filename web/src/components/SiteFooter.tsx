"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

const SERVICES = [
  {
    n: "01",
    title: "Worldwide delivery",
    desc: "Ships globally — tracked to your door.",
  },
  {
    n: "02",
    title: "Fast shipping",
    desc: "Most US orders land in 2–5 days.",
  },
  {
    n: "03",
    title: "Atelier support",
    desc: "Mon–Fri replies from the REWORRKED desk.",
  },
  {
    n: "04",
    title: "Secure checkout",
    desc: "Payments encrypted end to end.",
  },
];

const LINKS = [
  { href: "/blog", label: "About" },
  { href: "/products", label: "Shop" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/cookies", label: "Cookies" },
];

export function SiteFooter() {
  const [done, setDone] = useState(false);

  function onSubscribe(e: FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  return (
    <footer className="mt-auto bg-rw-canvas text-white">
      {/* Services — open editorial row, no cage borders */}
      <div className="border-t border-rw-border bg-rw-canvas-elev">
        <div className="mx-auto grid max-w-[1600px] gap-8 px-4 py-12 sm:grid-cols-2 sm:gap-10 sm:py-14 md:px-8 lg:grid-cols-4 lg:gap-8 lg:py-20">
          {SERVICES.map((s) => (
            <div key={s.n} className="flex flex-col gap-3">
              <span className="font-mono text-[11px] tracking-[0.14em] text-rw-accent">
                {s.n}
              </span>
              <h3 className="font-display text-2xl tracking-[0.08em] text-white md:text-[1.65rem]">
                {s.title}
              </h3>
              <p className="max-w-[220px] text-sm leading-relaxed text-rw-muted">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto grid max-w-[1600px] gap-12 border-t border-rw-border px-4 py-16 md:grid-cols-[1.2fr_1fr_0.8fr] md:gap-10 md:px-8 md:py-20">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-rw-muted">
            Newsletter
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">
            Drop alerts and atelier notes — no spam, sparse sends.
          </p>
          {done ? (
            <p className="mt-6 text-sm text-rw-accent">You&apos;re on the list.</p>
          ) : (
            <form
              onSubmit={onSubscribe}
              className="mt-6 flex w-full max-w-md flex-row items-stretch overflow-hidden border border-rw-border"
            >
              <input
                type="email"
                required
                placeholder="Email"
                className="h-11 min-w-0 flex-1 border-0 bg-transparent px-3 text-sm text-white placeholder:text-rw-muted focus:outline-none focus:ring-0 sm:h-12 sm:px-4"
              />
              <button
                type="submit"
                className="h-11 shrink-0 border-0 bg-rw-accent px-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-rw-accent-ink hover:bg-white sm:h-12 sm:px-8"
              >
                Join
              </button>
            </form>
          )}
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-rw-muted">
            About
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">
            Elevated caps with craft, silhouette, and drop culture. Dense
            embroidery. Honest materials.
          </p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-rw-muted">
            Navigate
          </p>
          <ul className="mt-4 space-y-3">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-white/80 transition-colors hover:text-rw-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Giant scrolling wordmark */}
      <div className="overflow-hidden border-t border-rw-border" aria-hidden>
        <div className="animate-rw-marquee flex w-max select-none whitespace-nowrap py-2 font-display text-[18vw] leading-none tracking-[0.06em] text-white/[0.07]">
          <span className="pr-[0.15em]">
            REWORRKED&nbsp;&nbsp;REWORRKED&nbsp;&nbsp;
          </span>
          <span className="pr-[0.15em]">
            REWORRKED&nbsp;&nbsp;REWORRKED&nbsp;&nbsp;
          </span>
        </div>
      </div>

      <div className="border-t border-rw-border px-4 py-5 text-center text-[10px] uppercase tracking-[0.16em] text-rw-muted">
        © {new Date().getFullYear()} REWORRKED · PKR
      </div>
    </footer>
  );
}
