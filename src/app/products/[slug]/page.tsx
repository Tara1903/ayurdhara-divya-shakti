import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { AddToCartButton } from "@/components/brand/add-to-cart-button";
import { ProductCard } from "@/components/brand/product-card";
import { PurchaseLink } from "@/components/brand/purchase-link";
import { Reveal } from "@/components/brand/reveal";
import { BRAND } from "@/lib/brand";
import { getProductsBySlugs, products as fallbackProducts } from "@/lib/data";
import { getProductBySlug } from "@/lib/repositories";
import { buildWhatsAppUrl, formatCurrency } from "@/lib/utils";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return fallbackProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: `Product Not Found | ${BRAND.name}`,
    };
  }

  return {
    title: product.seoTitle ?? `${product.name} | ${BRAND.name}`,
    description: product.seoDescription ?? product.description,
  };
}

function getTypeLabel(type: NonNullable<ReturnType<typeof getProductType>>) {
  if (type === "wellness-kit") return BRAND.flagshipLabel;
  if (type === "combo") return "Bundle Offer";
  if (type === "raw-herb") return "Raw Herb";
  if (type === "herbal-oil") return "Herbal Oil";
  return "Herbal Powder";
}

function getProductType(type: string | undefined) {
  if (
    type === "wellness-kit" ||
    type === "combo" ||
    type === "raw-herb" ||
    type === "herbal-oil" ||
    type === "herbal-powder"
  ) {
    return type;
  }

  return "wellness-kit";
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsBySlugs(product.relatedSlugs ?? []);
  const productType = getProductType(product.type);
  const groupedItems =
    productType === "wellness-kit"
      ? {
          "Nabhi Oils": product.whatsInside.filter((item) => item.group === "Nabhi Oils"),
          "Feet Oils": product.whatsInside.filter((item) => item.group === "Feet Oils"),
          "Herbal Powders": product.whatsInside.filter((item) => item.group === "Herbal Powders"),
        }
      : null;

  return (
    <section className="page-shell section-space">
      <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <Reveal>
          <div className="poster-surface relative overflow-hidden rounded-[40px] p-4 md:p-5">
            <div className="relative min-h-[26rem] overflow-hidden rounded-[30px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-x-4 top-4 flex flex-wrap gap-2">
                {product.badge ? (
                  <span className="rounded-full bg-[var(--color-gold)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                    {product.badge}
                  </span>
                ) : null}
                {product.limitedStockText ? (
                  <span className="rounded-full bg-[rgba(15,38,25,0.72)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
                    {product.limitedStockText}
                  </span>
                ) : null}
              </div>
              <div className="absolute inset-x-4 bottom-4 rounded-[26px] bg-[rgba(15,31,20,0.74)] p-5 text-white backdrop-blur">
                <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-gold-soft)]">
                  {getTypeLabel(productType)}
                </p>
                <p className="mt-2 font-serif-display text-4xl leading-none">{product.name}</p>
                <p className="mt-3 text-sm leading-7 text-white/82">
                  {product.supportLine ?? product.shortBenefit}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="eyebrow">{product.category}</p>
              <h1 className="font-serif-display text-5xl leading-[0.92] text-[var(--color-ink)] md:text-6xl">
                {product.name}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--color-muted)]">
                {product.description}
              </p>
            </div>

            <div className="glass-panel rounded-[30px] p-6">
              <div className="flex flex-wrap items-end gap-4">
                <p className="text-4xl font-semibold text-[var(--color-forest)]">
                  {formatCurrency(product.price)}
                </p>
                <p className="text-xl text-[var(--color-muted)] line-through">
                  {formatCurrency(product.originalPrice)}
                </p>
                <p className="rounded-full bg-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-white">
                  Save ₹{product.saveAmount ?? Math.max(product.originalPrice - product.price, 0)}
                </p>
              </div>

              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                {productType === "wellness-kit"
                  ? "Each kit clearly shows all 9 pieces so the buyer understands the complete system at a glance."
                  : "This support product fits into the broader Ayurdhara ritual without forcing a complicated buying decision."}
              </p>

              <div className="mt-6 grid gap-3">
                <AddToCartButton product={product} />
                <PurchaseLink href="/checkout" variant="secondary" className="w-full">
                  Buy Now
                </PurchaseLink>
                <a
                  href={buildWhatsAppUrl(
                    BRAND.whatsappNumber,
                    `Hi, I want to order ${product.name} from ${BRAND.name}.`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-line)] bg-white/80 px-5 py-3 text-sm font-semibold text-[var(--color-forest)]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Order on WhatsApp
                </a>
              </div>

              <div className="mt-6 flex items-center gap-3 text-sm text-[var(--color-muted)]">
                <ShieldCheck className="h-4 w-4 text-[var(--color-gold)]" />
                Cash on Delivery Available
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="section-frame p-6">
                <p className="eyebrow">Problem It Supports</p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                  {product.problemStatement}
                </p>
              </div>
              <div className="section-frame p-6">
                <p className="eyebrow">Results Timeline</p>
                <div className="mt-4 grid gap-3">
                  {product.expectedTimeline.map((step) => (
                    <div key={step} className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-[var(--color-gold)]" />
                      <p className="text-sm leading-7 text-[var(--color-muted)]">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {groupedItems ? (
        <Reveal>
          <section className="mt-16">
            <div className="max-w-2xl">
              <p className="eyebrow">What&apos;s Inside</p>
              <h2 className="mt-3 font-serif-display text-5xl text-[var(--color-ink)]">
                See all 9 items in the system.
              </h2>
            </div>
            <div className="mt-8 grid gap-6 xl:grid-cols-3">
              {Object.entries(groupedItems).map(([group, items]) => (
                <div key={group} className="section-frame p-6">
                  <p className="eyebrow">{group}</p>
                  <div className="mt-5 grid gap-4">
                    {items.map((item) => (
                      <div key={item.name} className="rounded-[24px] bg-[var(--color-surface)] px-5 py-5">
                        <h3 className="font-serif-display text-3xl text-[var(--color-ink)]">
                          {item.name}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                          {item.purpose}
                        </p>
                        {item.format ? (
                          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                            {item.format}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      ) : (
        <Reveal>
          <section className="mt-16 section-frame p-6 md:p-8">
            <p className="eyebrow">What&apos;s Inside</p>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {product.whatsInside.map((item) => (
                <div key={item.name} className="rounded-[24px] bg-[var(--color-surface)] px-5 py-5">
                  <h3 className="font-serif-display text-3xl text-[var(--color-ink)]">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                    {item.purpose}
                  </p>
                  {item.format ? (
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                      {item.format}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      <div className="mt-16 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <div className="space-y-8">
            <section className="section-frame p-6 md:p-8">
              <p className="eyebrow">Benefits</p>
              <div className="mt-5 grid gap-3">
                {product.benefits.map((benefit) => (
                  <div key={benefit} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-[var(--color-gold)]" />
                    <p className="text-sm leading-7 text-[var(--color-muted)]">{benefit}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="section-frame p-6 md:p-8">
              <p className="eyebrow">Ingredient Feel</p>
              <div className="mt-5 grid gap-4">
                {product.ingredientsFeel.map((item) => (
                  <div key={item} className="rounded-[24px] bg-[var(--color-surface)] px-5 py-5">
                    <p className="text-sm leading-7 text-[var(--color-muted)]">{item}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="space-y-8">
            <section className="section-frame p-6 md:p-8">
              <p className="eyebrow">Usage Instructions</p>
              <div className="mt-5 grid gap-4">
                {product.usageMethod.map((item) => (
                  <div key={item} className="rounded-[24px] bg-[var(--color-surface)] px-5 py-5">
                    <p className="text-sm leading-7 text-[var(--color-muted)]">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="section-frame p-6 md:p-8">
              <p className="eyebrow">Who It&apos;s For</p>
              <div className="mt-5 grid gap-4">
                {product.whoShouldUse.map((item) => (
                  <div key={item} className="rounded-[24px] bg-[var(--color-surface)] px-5 py-5">
                    <p className="text-sm leading-7 text-[var(--color-muted)]">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="glass-panel rounded-[30px] p-6">
              <div className="flex gap-3">
                <Sparkles className="mt-1 h-5 w-5 text-[var(--color-gold)]" />
                <p className="text-sm leading-7 text-[var(--color-muted)]">
                  {productType === "wellness-kit"
                    ? "This page is designed to make the system feel complete, premium, and easy to understand in one screen."
                    : "This page keeps support products clear, useful, and easy to pair with the main wellness kits."}
                </p>
              </div>
            </section>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <section className="mt-16 section-frame p-6 md:p-8">
          <div className="max-w-2xl">
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-3 font-serif-display text-4xl text-[var(--color-ink)]">
              Answers before checkout.
            </h2>
          </div>

          <div className="mt-8 grid gap-4">
            {product.faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-[26px] border border-[var(--color-line)] bg-white/82 px-5 py-5"
              >
                <summary className="cursor-pointer font-medium text-[var(--color-ink)]">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </Reveal>

      {relatedProducts.length ? (
        <Reveal>
          <section className="mt-16">
            <div className="max-w-2xl">
              <p className="eyebrow">Suggested Next</p>
              <h2 className="mt-3 font-serif-display text-4xl text-[var(--color-ink)]">
                Complementary picks for this ritual.
              </h2>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {relatedProducts.slice(0, 3).map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </section>
        </Reveal>
      ) : null}
    </section>
  );
}
