import Link from "next/link";
import { MEDIA } from "@/lib/media";
import { Countdown } from "@/components/Countdown";

export function PromoDrop({ endAt }: { endAt: string }) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={MEDIA.heroStill}
      >
        <source src={MEDIA.heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/50 md:bg-gradient-to-r md:from-black md:via-black/80 md:to-black/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-end gap-8 px-4 pb-10 pt-24 sm:gap-10 sm:px-6 sm:pb-12 md:justify-center md:px-8 md:py-20 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 border border-rw-accent/40 bg-rw-accent/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-rw-accent">
            Limited window
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-[0.06em] text-white sm:mt-5 sm:text-5xl md:text-6xl lg:text-7xl">
            $10 off
            <span className="mt-1 block text-rw-accent">+ free express</span>
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70 sm:mt-4 md:text-base">
            On orders over Rs 5,000. Clock is live — when it hits zero, the cut ends.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex h-12 w-full items-center justify-center bg-rw-accent px-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-rw-accent-ink hover:bg-white sm:mt-8 sm:w-auto"
          >
            Shop the offer
          </Link>
        </div>

        <div className="w-full max-w-lg lg:pb-2">
          <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-white/50">
            Offer ends in
          </p>
          <Countdown endAt={endAt} variant="blocks" />
        </div>
      </div>
    </section>
  );
}
