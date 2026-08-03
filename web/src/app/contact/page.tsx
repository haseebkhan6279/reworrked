import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact REWORRKED support and atelier.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-4 py-10 md:grid-cols-[1.2fr_0.8fr] md:px-6 md:py-14">
      <div>
        <h1 className="font-display text-4xl tracking-[0.08em] md:text-5xl">
          Contact
        </h1>
        <p className="mt-3 max-w-md text-sm text-rw-muted">
          Orders, fit questions, drop access. We reply within one business day.
        </p>
        <div className="mt-10">
          <ContactForm />
        </div>
      </div>
      <aside className="border border-rw-border bg-rw-surface p-6 md:p-8 h-fit">
        <p className="text-[11px] uppercase tracking-[0.14em] text-rw-muted">
          Support
        </p>
        <ul className="mt-4 space-y-4 text-sm">
          <li>
            <span className="block text-rw-muted">Email</span>
            <a
              href="mailto:meermustafa@gmail.com"
              className="transition-colors hover:text-rw-accent"
            >
              meermustafa@gmail.com
            </a>
          </li>
          <li>
            <span className="block text-rw-muted">Phone</span>
            <a
              href="tel:+923160770535"
              className="transition-colors hover:text-rw-accent"
            >
              +92 316 0770535
            </a>
          </li>
          <li>
            <span className="block text-rw-muted">Hours</span>
            Mon–Fri · 10a–6p PKT
          </li>
          <li>
            <span className="block text-rw-muted">Shipping</span>
            Free on all orders · COD nationwide
          </li>
          <li>
            <span className="block text-rw-muted">Returns</span>
            30 days · unworn with tags
          </li>
        </ul>
      </aside>
    </div>
  );
}
