"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductShowcaseCard } from "@/components/brand/product-showcase-card";
import { buttonStyles } from "@/components/ui/button";
import type { Product } from "@/types";

export function ProductCarouselRow({
  title,
  subtitle,
  href,
  products,
}: {
  title: string;
  subtitle: string;
  href: string;
  products: Product[];
}) {
  const railRef = useRef<HTMLDivElement | null>(null);

  if (!products.length) {
    return null;
  }

  function scrollRail(direction: 1 | -1) {
    railRef.current?.scrollBy({
      left: direction * 280,
      behavior: "smooth",
    });
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h2 className="font-serif-display text-[2.1rem] leading-[0.97] text-[var(--color-ink)] md:text-[2.65rem]">
            {title}
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-[var(--color-muted)] md:text-base md:leading-7">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => scrollRail(-1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-white/88 text-[var(--color-ink)]"
              aria-label={`Scroll ${title} left`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollRail(1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-white/88 text-[var(--color-ink)]"
              aria-label={`Scroll ${title} right`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <Link href={href} className={buttonStyles({ variant: "secondary", className: "gap-2 px-4" })}>
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div
        ref={railRef}
        className="mobile-scroll-row flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 sm:gap-4"
        tabIndex={0}
        aria-label={title}
      >
        {products.map((product) => (
          <div key={product.id} className="w-[15.5rem] shrink-0 snap-start sm:w-[17rem] md:w-[18rem]">
            <ProductShowcaseCard product={product} variant="compact" />
          </div>
        ))}
      </div>
    </section>
  );
}
