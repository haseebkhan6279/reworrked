import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ topic: string; location: string }>;
};

function titleCase(s: string) {
  return s
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic, location } = await params;
  const topicLabel = titleCase(topic);
  const city = titleCase(location);
  const title = `${topicLabel} in ${city}`;
  return buildMetadata({
    title,
    description: `Premium ${topicLabel.toLowerCase()} for ${city} — REWORRKED collector-grade headwear. Fit notes and night edits, not spam local lists.`,
    path: `/local/${topic}/${location}`,
    keywords: [topicLabel, city, "REWORRKED", "premium caps"],
  });
}

export default async function LocalLandingPage({ params }: Props) {
  const { topic, location } = await params;
  const topicLabel = titleCase(topic);
  const city = titleCase(location);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <JsonLd
        data={[
          webPageJsonLd({
            title: `${topicLabel} in ${city}`,
            description: `Premium ${topicLabel.toLowerCase()} for ${city} from REWORRKED.`,
            path: `/local/${topic}/${location}`,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Local", path: "/local" },
            { name: `${topicLabel} · ${city}` },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Local", href: "/local" },
          { label: `${topicLabel} · ${city}` },
        ]}
      />
      <h1 className="mt-8 font-display text-4xl tracking-[0.06em] md:text-5xl">
        {topicLabel} in {city}
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-rw-muted">
        A REWORRKED night edit for {city}. Silhouette first — fitted, snapback,
        or dad cap depending on how the city wears after dark. Ships nationwide
        in USD; local page is editorial context, not a storefront clone.
      </p>
      <div className="mt-10 space-y-4 border-t border-rw-border pt-8 text-sm text-rw-text">
        <p>
          Look for mid-profile crowns under {city} streetlight. Bone accents
          read cleaner than neon. Buy the cut you will still wear next season.
        </p>
        <p className="text-rw-muted">
          Free shipping on all orders · Authentic REWORRKED only.
        </p>
      </div>
      <Link href="/products" className="mt-10 inline-block">
        <Button size="lg">Shop {topicLabel}</Button>
      </Link>
    </div>
  );
}
