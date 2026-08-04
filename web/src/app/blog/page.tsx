import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "From the Atelier",
  description:
    "Fit guides, care tips, embroidery craft, and drop culture from REWORRKED — editorial notes for collectors of premium caps.",
  path: "/blog",
  keywords: ["cap fit guide", "embroidery", "streetwear blog", "REWORRKED atelier"],
});

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <p className="text-[11px] uppercase tracking-[0.14em] text-rw-muted">
        Editorial
      </p>
      <h1 className="mt-2 font-display text-4xl tracking-[0.08em] md:text-5xl">
        From the atelier
      </h1>
      <p className="mt-3 max-w-lg text-sm text-rw-muted">
        Fit, care, embroidery, and night style — sparse notes for people who notice brim and stitch.
      </p>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <div className="relative aspect-[16/10] overflow-hidden bg-rw-surface">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 33vw"
              />
            </div>
            <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-rw-muted">
              {post.category} · {post.date} · {post.readTime}
            </p>
            <h2 className="mt-1 text-lg group-hover:text-rw-accent">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-rw-muted">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
