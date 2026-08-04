import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How REWORRKED collects, uses, and protects personal data for orders, accounts, and storefront analytics.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <h1 className="font-display text-4xl tracking-[0.08em]">Privacy</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-rw-muted">
        <p>
          REWORRKED collects only what we need to fulfill orders, support
          accounts, and improve the storefront. We do not sell personal data.
        </p>
        <h2 className="font-display text-2xl tracking-[0.06em] text-rw-text">
          Data we process
        </h2>
        <p>
          Account email, shipping addresses, order history, and optional
          analytics events (with consent). Payments are processed by our
          payment provider — we do not store full card numbers.
        </p>
        <h2 className="font-display text-2xl tracking-[0.06em] text-rw-text">
          Your rights
        </h2>
        <p>
          Request access, correction, or deletion via meermustafa@gmail.com.
          Cookie preferences can be changed on the Cookies page.
        </p>
      </div>
    </div>
  );
}
