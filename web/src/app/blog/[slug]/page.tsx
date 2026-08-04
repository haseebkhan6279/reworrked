import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getPost } from "@/lib/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    return buildMetadata({
      title: "Article not found",
      description: "This REWORRKED editorial is unavailable.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.date,
    keywords: [post.category, "REWORRKED", "caps", "headwear", post.title],
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <JsonLd
        data={[
          articleJsonLd(post),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />
      <p className="mt-8 text-[11px] uppercase tracking-[0.14em] text-rw-muted">
        {post.category} · {post.date} · {post.readTime}
      </p>
      <h1 className="mt-3 font-display text-4xl tracking-[0.06em] md:text-5xl">
        {post.title}
      </h1>
      <p className="mt-4 text-lg text-rw-muted">{post.excerpt}</p>

      <div className="prose-invert mt-10 space-y-5 text-sm leading-relaxed text-rw-text">
        <p>
          REWORRKED writes short. The silhouette comes first — crown height,
          brim curve, sweatband hand-feel. Everything else follows.
        </p>
        <p>
          {post.title.includes("Fit") &&
            "Measure your head where the band sits. Mid-profile fitteds flatter most faces; low crowns read sharper under street light."}
          {post.title.includes("Care") &&
            "Spot clean with a damp cloth. Air dry away from heat. Never machine-wash structured embroidery."}
          {post.title.includes("Snapback") &&
            "Snapbacks adjust. Fitteds commit. Choose by how you wear the night — and how often you share the cap."}
          {post.title.includes("Embroidery") &&
            "Density matters. Cheap thread catches light wrong. Look for clean underlay and even edges at the mark."}
          {post.title.includes("Drop") &&
            "Limited means limited. No bots. Wear what you buy. Resale theater is not culture."}
          {post.title.includes("Night") &&
            "Black-on-black under sodium and LED. Bone accents read when neon does not."}
          {!/(Fit|Care|Snapback|Embroidery|Drop|Night)/.test(post.title) &&
            "Read the fabric. Feel the brim. Buy for the cut you will still want in two years."}
        </p>
        <p>
          When you are ready, return to the shop — fitted, snapback, dad cap,
          trucker, or the current drop.
        </p>
      </div>

      <div className="mt-12 border border-rw-border bg-rw-surface p-6 text-center">
        <p className="font-display text-2xl tracking-[0.08em]">Shop the cut</p>
        <p className="mt-2 text-sm text-rw-muted">
          Collector-grade caps on black.
        </p>
        <Link href="/products" className="mt-5 inline-block">
          <Button>Shop Caps</Button>
        </Link>
      </div>
    </article>
  );
}
