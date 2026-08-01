import Link from "next/link";
import Image from "next/image";
import { MEDIA, MODELS } from "@/lib/media";
import { getStoreProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { CollectionRail } from "@/components/home/CollectionRail";
import { PromoDrop } from "@/components/home/PromoDrop";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await getStoreProducts();
  const gridProducts = products.slice(0, 4);

  const strip = [
    MEDIA.caps[15],
    MEDIA.caps[0],
    MEDIA.caps[6],
    MEDIA.caps[17],
    MEDIA.caps[20],
  ];

  const promoEnd = "2026-08-15T23:59:59";

  return (
    <>
      {/* Hero */}
      <section className="relative -mt-14 min-h-[100svh] overflow-hidden md:-mt-16">
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={MODELS.dadsClub}
          >
            <source src={MODELS.video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-end px-4 pb-12 pt-28 sm:px-6 sm:pb-16 md:px-8 md:pb-24">
          <p className="animate-rw-fade-delay-1 text-[10px] uppercase tracking-[0.2em] text-white/80 sm:text-[11px] sm:tracking-[0.22em]">
            ● Night collection 26
          </p>
          <h1 className="animate-rw-fade-delay-2 mt-3 max-w-xl text-[1.75rem] font-semibold uppercase leading-[1.15] tracking-[0.05em] text-white sm:mt-4 sm:text-3xl md:text-5xl lg:text-6xl">
            Cut for the dark.
            <span className="mt-1 block">
              Worn in the light.
            </span>
          </h1>
          <p className="animate-rw-fade-delay-2 mt-4 max-w-md text-[10px] uppercase leading-relaxed tracking-[0.14em] text-white/75 sm:mt-5 sm:text-[11px] sm:tracking-[0.16em] md:text-xs">
            Elevated dad caps & limited embroidery — built for silhouette, not
            noise.
          </p>
          <div className="animate-rw-fade-delay-3 mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap">
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center bg-white px-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-black hover:bg-rw-accent"
            >
              Shop caps
            </Link>
            <Link
              href="/category/limited-drops"
              className="inline-flex h-12 items-center justify-center border border-white px-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-white hover:bg-white hover:text-black"
            >
              View drops
            </Link>
          </div>
        </div>
      </section>

      <CollectionRail products={products.slice(0, 12)} />

      {/* Split lifestyle + products */}
      <section className="grid lg:grid-cols-2 lg:items-start">
        <div className="relative aspect-[4/5] min-h-[320px] sm:min-h-[420px] lg:min-h-0 lg:aspect-[4/5]">
          <Image
            src={MODELS.dnaIntact}
            alt="DNA Intact worn"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 md:p-10">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white sm:text-[11px]">
              ● New season drop
            </p>
            <div>
              <h2 className="max-w-md text-2xl font-semibold uppercase leading-tight tracking-[0.06em] text-white sm:text-3xl md:text-5xl">
                Define your cut
              </h2>
              <p className="mt-2 max-w-sm text-[10px] uppercase leading-relaxed tracking-[0.12em] text-white/80 sm:mt-3 sm:text-[11px] sm:tracking-[0.14em]">
                Fitted. Snapback. Dad cap. Trucker. Limited embroidery.
              </p>
            </div>
          </div>
        </div>

        <div className="grid h-fit grid-cols-2 content-start">
          {gridProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <PromoDrop endAt={promoEnd} />

      {/* Manifesto */}
      <section className="relative flex min-h-[60svh] items-center justify-center overflow-hidden sm:min-h-[70vh]">
        <Image
          src={MODELS.adventureAwaits}
          alt=""
          fill
          className="scale-105 object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-3xl px-5 text-center sm:px-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white sm:text-[11px] sm:tracking-[0.22em]">
            ● Define your own path
          </p>
          <h2 className="mt-4 text-2xl font-semibold uppercase leading-tight tracking-[0.06em] text-white sm:mt-5 sm:text-3xl md:text-5xl">
            Made for creators, rebels, and dreamers.
          </h2>
          <Link
            href="/blog"
            className="mt-6 inline-flex h-11 items-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white underline underline-offset-8 decoration-white/40 hover:decoration-white sm:mt-8"
          >
            Learn more
          </Link>
        </div>
      </section>

      {/* Wear strip */}
      <section className="relative overflow-hidden bg-black py-14 sm:py-16 md:py-24">
        <div className="mx-auto flex max-w-[1400px] justify-center gap-1.5 px-2 sm:gap-2 md:gap-3">
          {strip.map((src, i) => (
            <div
              key={src}
              className={`relative overflow-hidden ${
                i === 2
                  ? "h-40 w-[30%] sm:h-56 sm:w-[22%] md:h-80"
                  : "h-32 w-[22%] sm:h-44 sm:w-[15%] md:h-64"
              } ${i === 0 || i === 4 ? "hidden sm:block" : ""}`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center px-4 sm:bottom-10 md:bottom-16">
          <p className="font-display text-4xl tracking-[0.08em] text-white mix-blend-difference sm:text-5xl md:text-7xl lg:text-8xl">
            Wear the
          </p>
          <p className="font-display text-4xl tracking-[0.08em] text-white mix-blend-difference sm:text-5xl md:text-7xl lg:text-8xl">
            REWORRKED
          </p>
          <p className="mt-3 text-center text-[10px] uppercase tracking-[0.16em] text-white/80 sm:mt-4 sm:text-[11px] sm:tracking-[0.2em]">
            Timeless pieces designed to make a statement.
          </p>
        </div>
      </section>
    </>
  );
}
