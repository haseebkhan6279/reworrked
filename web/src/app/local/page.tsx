import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Local Hubs",
  description: "Premium local guides for REWORRKED caps — city night edits, not doorway spam.",
};

const HUBS = [
  { topic: "fitted-caps", location: "los-angeles", label: "Fitted Caps in Los Angeles" },
  { topic: "snapback", location: "new-york", label: "Snapbacks in New York" },
  { topic: "dad-cap", location: "chicago", label: "Dad Caps in Chicago" },
  { topic: "limited-drops", location: "miami", label: "Limited Drops in Miami" },
];

export default function LocalHubPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <p className="text-[11px] uppercase tracking-[0.14em] text-rw-muted">
        Local
      </p>
      <h1 className="mt-2 font-display text-4xl tracking-[0.08em] md:text-5xl">
        City hubs
      </h1>
      <p className="mt-3 max-w-lg text-sm text-rw-muted">
        Night edits and fit notes by city. Editorial pages — not keyword warehouses.
      </p>
      <ul className="mt-12 divide-y divide-rw-border border-y border-rw-border">
        {HUBS.map((h) => (
          <li key={`${h.topic}-${h.location}`}>
            <Link
              href={`/local/${h.topic}/${h.location}`}
              className="flex items-center justify-between py-5 text-sm hover:text-rw-accent"
            >
              <span>{h.label}</span>
              <span className="text-rw-muted">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
