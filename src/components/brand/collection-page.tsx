import { ArrowRight } from "lucide-react";
import type { CollectionPageContent, Product } from "@/types";
import { ProductCard } from "@/components/brand/product-card";
import { PurchaseLink } from "@/components/brand/purchase-link";
import { Reveal } from "@/components/brand/reveal";
import { SectionHeading } from "@/components/brand/section-heading";

export function CollectionPage({
  content,
  products,
}: {
  content: CollectionPageContent;
  products: Product[];
}) {
  return (
    <section className="page-shell section-space">
      <Reveal>
        <div className="poster-surface overflow-hidden rounded-[40px] px-6 py-10 md:px-10 md:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="max-w-3xl space-y-5">
              <p className="eyebrow">{content.eyebrow}</p>
              <h1 className="font-serif-display text-5xl leading-[0.9] text-[var(--color-ink)] md:text-7xl">
                {content.heroTitle}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--color-muted)] md:text-lg">
                {content.heroDescription}
              </p>
            </div>

            <div className="glass-panel rounded-[30px] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-gold)]">
                Featured Categories
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.featuredCategories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full border border-[var(--color-line)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--color-forest)]"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">
                {content.description}
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-10">
          <SectionHeading
            eyebrow={content.title}
            title={`${products.length} curated products arranged for easier buying.`}
            description="Use the category tabs to scan fast, then move deeper into the product page for rituals, benefits, and bundle logic."
            action={
              <PurchaseLink href="/cart" variant="secondary" className="gap-2">
                View Cart
                <ArrowRight className="h-4 w-4" />
              </PurchaseLink>
            }
          />
        </div>
      </Reveal>

      <div className="mobile-scroll-row mt-8 flex gap-3 overflow-x-auto pb-2">
        {content.featuredCategories.map((category) => (
          <a
            key={category}
            href={`#${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            className="rounded-full border border-[var(--color-line)] bg-white/72 px-4 py-2 text-sm font-medium whitespace-nowrap text-[var(--color-forest)]"
          >
            {category}
          </a>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {products.map((product, index) => (
          <Reveal key={product.id} delay={index * 0.03}>
            <div id={product.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
              <ProductCard product={product} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
