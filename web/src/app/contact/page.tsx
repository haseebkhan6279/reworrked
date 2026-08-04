import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/seo/config";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Contact ${SITE.name} support and atelier. Orders, fit questions, and drop access — we reply within one business day.`,
  path: "/contact",
  keywords: ["contact REWORRKED", "cap support", "customer service Pakistan"],
});

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-4 py-10 md:grid-cols-[1.2fr_0.8fr] md:px-6 md:py-14">
      <JsonLd
        data={faqJsonLd([
          {
            question: "How do I contact REWORRKED?",
            answer: `Email ${SITE.email} or call ${SITE.phoneDisplay}. We reply within one business day.`,
          },
          {
            question: "Do you ship in Pakistan?",
            answer:
              "Yes. Nationwide delivery with Cash on Delivery on eligible orders.",
          },
        ])}
      />
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
              href={`mailto:${SITE.email}`}
              className="transition-colors hover:text-rw-accent"
            >
              {SITE.email}
            </a>
          </li>
          <li>
            <span className="block text-rw-muted">Phone</span>
            <a
              href={`tel:${SITE.phone}`}
              className="transition-colors hover:text-rw-accent"
            >
              {SITE.phoneDisplay}
            </a>
          </li>
          <li>
            <span className="block text-rw-muted">Hours</span>
            Mon–Sat · 11:00–20:00 PKT
          </li>
        </ul>
      </aside>
    </div>
  );
}
