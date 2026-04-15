import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductShowcaseCard } from "@/components/brand/product-showcase-card";
import { buttonStyles } from "@/components/ui/button";
import type { Product } from "@/types";

export function FeaturedProductsGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return null;
  }

  return (
    <section className="page-shell section-space pb-8 pt-8 md:pb-10 md:pt-14">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-gold)]">
            Featured Products
          </p>
          <h2 className="font-serif-display text-[2.2rem] leading-[0.95] text-[var(--color-ink)] md:text-5xl">
            Shop the products people should see first.
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-[var(--color-muted)] md:text-base md:leading-7">
            High-visibility kits and everyday add-ons placed early so visitors can start browsing instead of reading.
          </p>
        </div>

        <Link href="/wellness-kits" className={buttonStyles({ variant: "secondary", className: "gap-2" })}>
          View All Products
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 xl:grid-cols-4">
        {products.map((product) => (
          <ProductShowcaseCard key={product.id} product={product} variant="compact" />
        ))}
      </div>
    </section>
  );
}
