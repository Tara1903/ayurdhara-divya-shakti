import Image from "next/image";
import {
  ArrowRight,
  Baby,
  Crown,
  Droplets,
  Footprints,
  Leaf,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  UserRound,
  Users,
} from "lucide-react";
import { ProductCard } from "@/components/brand/product-card";
import { PurchaseLink } from "@/components/brand/purchase-link";
import { Reveal } from "@/components/brand/reveal";
import { SectionHeading } from "@/components/brand/section-heading";
import { BRAND } from "@/lib/brand";
import {
  collectionQuickLinks,
  comboHighlightSlugs,
  featuredKitSlugs,
  getProductsBySlugs,
  getProductsByType,
  howItWorks,
  lifestyleProblems,
  testimonials,
  topCategories,
  whyChooseUs,
} from "@/lib/data";
import { listProducts } from "@/lib/repositories";
import { buildWhatsAppUrl, formatCurrency } from "@/lib/utils";

const categoryIcons = [UserRound, Sparkles, Baby, ShieldCheck, Users, Crown];

export default async function HomePage() {
  const allProducts = await listProducts();
  const featuredKits = getProductsBySlugs(featuredKitSlugs).filter((product) =>
    allProducts.find((entry) => entry.slug === product.slug),
  );
  const comboHighlights = getProductsBySlugs(comboHighlightSlugs).filter((product) =>
    allProducts.find((entry) => entry.slug === product.slug),
  );
  const premiumHeroProduct =
    featuredKits.find((product) => product.slug === "ayur-therapy-premium-immunity-kit") ??
    featuredKits[0];
  const powders = getProductsByType("herbal-powder").slice(0, 3);
  const oils = getProductsByType("herbal-oil").slice(0, 3);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="ambient-orb -left-6 top-16 h-40 w-40 bg-[rgba(46,125,50,0.18)]" />
        <div className="ambient-orb right-0 top-0 h-56 w-56 bg-[rgba(212,175,55,0.22)]" />
        <div className="grid min-h-[calc(100svh-5.25rem)] items-center gap-10 px-4 py-8 md:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:px-10 lg:py-12">
          <Reveal>
            <div className="mx-auto w-full max-w-2xl space-y-8 lg:ml-auto lg:max-w-xl">
              <div className="space-y-5">
                <p className="eyebrow">{BRAND.name}</p>
                <h1 className="font-serif-display text-5xl leading-[0.9] text-[var(--color-ink)] md:text-7xl">
                  Complete 9-in-1 Ayurvedic Wellness System
                </h1>
                <p className="max-w-lg text-lg leading-8 text-[var(--color-muted)]">
                  Nabhi + Feet + Herbal Powder Therapy for Total Body Balance.
                  Built as a premium daily ritual, not a random product shelf.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <PurchaseLink href="/wellness-kits" className="gap-2">
                  Shop Wellness Kits
                  <ArrowRight className="h-4 w-4" />
                </PurchaseLink>
                <PurchaseLink href="/how-it-works" variant="secondary">
                  Explore How It Works
                </PurchaseLink>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-[var(--color-muted)]">
                <span className="rounded-full bg-white/72 px-4 py-2">3 Nabhi Oils</span>
                <span className="rounded-full bg-white/72 px-4 py-2">3 Feet Oils</span>
                <span className="rounded-full bg-white/72 px-4 py-2">3 Herbal Powders</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="glass-panel rounded-[24px] p-4">
                  <p className="text-xs uppercase tracking-[0.26em] text-[var(--color-muted)]">
                    Offer Price
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-[var(--color-forest)]">
                    {formatCurrency(BRAND.offerPrice)}
                  </p>
                </div>
                <div className="glass-panel rounded-[24px] p-4">
                  <p className="text-xs uppercase tracking-[0.26em] text-[var(--color-muted)]">
                    Original
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-[var(--color-ink)] line-through opacity-60">
                    {formatCurrency(BRAND.originalPrice)}
                  </p>
                </div>
                <div className="glass-panel rounded-[24px] p-4">
                  <p className="text-xs uppercase tracking-[0.26em] text-[var(--color-muted)]">
                    Savings
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-[var(--color-gold)]">
                    Save ₹{BRAND.savings}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="poster-surface mx-auto w-full max-w-4xl overflow-hidden rounded-[42px] p-4 md:p-6">
              <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="relative min-h-[26rem] overflow-hidden rounded-[32px]">
                  {premiumHeroProduct ? (
                    <Image
                      src={premiumHeroProduct.image}
                      alt={premiumHeroProduct.name}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : null}
                  <div className="absolute inset-x-4 bottom-4 rounded-[26px] bg-[rgba(18,35,24,0.72)] p-5 text-white backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gold-soft)]">
                      {BRAND.flagshipLabel}
                    </p>
                    <p className="mt-3 font-serif-display text-4xl leading-[0.95]">
                      {premiumHeroProduct?.name}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/82">
                      {premiumHeroProduct?.shortBenefit}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="glass-panel rounded-[30px] p-6">
                    <p className="eyebrow">Why it converts</p>
                    <h2 className="mt-4 font-serif-display text-4xl leading-[0.95] text-[var(--color-ink)]">
                      One system. One premium buying decision.
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                      The kit leads the storefront because it solves the biggest customer problem:
                      not knowing how to combine oils and powders into one disciplined routine.
                    </p>
                  </div>

                  <div className="glass-panel rounded-[30px] p-6">
                    <div className="grid gap-4">
                      <div className="flex gap-3">
                        <Droplets className="mt-1 h-5 w-5 text-[var(--color-gold)]" />
                        <p className="text-sm leading-7 text-[var(--color-muted)]">
                          3 targeted Nabhi oils for focused nightly support.
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <Footprints className="mt-1 h-5 w-5 text-[var(--color-gold)]" />
                        <p className="text-sm leading-7 text-[var(--color-muted)]">
                          3 feet oils for grounding massage and bedtime comfort.
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <Leaf className="mt-1 h-5 w-5 text-[var(--color-gold)]" />
                        <p className="text-sm leading-7 text-[var(--color-muted)]">
                          3 herbal powders for the inner side of the ritual.
                        </p>
                      </div>
                    </div>

                    <a
                      href={buildWhatsAppUrl(BRAND.whatsappNumber, BRAND.whatsappOrderMessage)}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-forest)]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Order on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="page-shell section-space pt-6">
        <Reveal>
          <SectionHeading
            eyebrow="Lifestyle Signals"
            title="Built around the patterns customers recognize in everyday life."
            description="We keep the language responsible and clear: support, balance, calmer routines, and better daily consistency."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {lifestyleProblems.map((problem, index) => (
            <Reveal key={problem} delay={index * 0.04}>
              <div className="glass-panel rounded-[26px] px-5 py-6 text-center">
                <p className="font-serif-display text-3xl text-[var(--color-ink)]">{problem}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="page-shell section-space">
        <Reveal>
          <SectionHeading
            eyebrow="Category Focus"
            title="Start with the wellness track that feels closest to the customer’s current life stage."
            description="Men, women, child, senior, family, and premium kits are framed as structured solutions, not generic product groups."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          {topCategories.map((item, index) => {
            const Icon = categoryIcons[index];

            return (
              <Reveal key={item.label} delay={index * 0.04}>
                <a
                  href={item.href}
                  className="glass-panel flex h-full flex-col rounded-[28px] p-5 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-[rgba(46,125,50,0.12)] text-[var(--color-forest)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    {item.badge ? (
                      <span className="rounded-full bg-[var(--color-gold)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                        {item.badge}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-5 font-serif-display text-3xl text-[var(--color-ink)]">
                    {item.label}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                    {item.description}
                  </p>
                </a>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="page-shell section-space">
        <Reveal>
          <SectionHeading
            eyebrow="Wellness Kits"
            title="Four kit highlights built to carry the storefront."
            description="Men Kit, Women Kit, Immunity Kit, and Family Kit lead with clear labels, savings, and simplified product stories."
            action={<PurchaseLink href="/wellness-kits" variant="secondary">View All Wellness Kits</PurchaseLink>}
          />
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {featuredKits.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.04}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="how-it-works-preview" className="page-shell section-space">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <div className="space-y-5">
              <p className="eyebrow">How It Works</p>
              <h2 className="font-serif-display text-5xl leading-[0.94] text-[var(--color-ink)]">
                A simple 3-step ritual that keeps the system understandable.
              </h2>
              <p className="max-w-xl text-base leading-8 text-[var(--color-muted)]">
                The ritual is intentionally simple: Nabhi oil, feet oil, and herbal powder.
                The website should make that logic obvious within seconds.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {howItWorks.map((step, index) => (
              <Reveal key={step.step} delay={index * 0.05}>
                <div className="glass-panel flex gap-5 rounded-[30px] p-6 md:p-7">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[var(--color-forest)] text-sm font-semibold tracking-[0.24em] text-white">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-serif-display text-3xl text-[var(--color-ink)]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell section-space">
        <Reveal>
          <SectionHeading
            eyebrow="Supporting Ranges"
            title="The kits stay primary while powders, oils, raw herbs, and combos support the system."
            description="Secondary categories are arranged to deepen the cart and increase trust, not distract from the main offer."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-5">
          {collectionQuickLinks.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.03}>
              <a href={item.href} className="glass-panel rounded-[26px] p-5 hover:-translate-y-1">
                <p className="font-serif-display text-3xl text-[var(--color-ink)]">{item.label}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{item.description}</p>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="section-frame p-6">
              <p className="eyebrow">Herbal Powders</p>
              <div className="mt-5 grid gap-4">
                {powders.map((product) => (
                  <div key={product.id} className="rounded-[24px] bg-[var(--color-surface)] px-5 py-5">
                    <p className="font-medium text-[var(--color-ink)]">{product.name}</p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                      {product.shortBenefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="section-frame p-6">
              <p className="eyebrow">Herbal Oils</p>
              <div className="mt-5 grid gap-4">
                {oils.map((product) => (
                  <div key={product.id} className="rounded-[24px] bg-[var(--color-surface)] px-5 py-5">
                    <p className="font-medium text-[var(--color-ink)]">{product.name}</p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                      {product.shortBenefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="page-shell section-space">
        <Reveal>
          <SectionHeading
            eyebrow="Combo Offers"
            title="Bundle offers that reduce friction and make the first purchase feel easier."
            description="Combos are positioned as smart, lower-ticket entry points with visible savings and clear use cases."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {comboHighlights.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.04}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="page-shell section-space">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <div className="space-y-5">
              <p className="eyebrow">Why Choose Us</p>
              <h2 className="font-serif-display text-5xl leading-[0.94] text-[var(--color-ink)]">
                Premium Ayurvedic-modern design backed by responsible product language.
              </h2>
              <p className="text-base leading-8 text-[var(--color-muted)]">
                We stay away from cure claims and focus on support, balance, daily rituals,
                and calmer customer decision-making.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {whyChooseUs.map((item, index) => (
              <Reveal key={item} delay={index * 0.04}>
                <div className="glass-panel rounded-[28px] p-6">
                  <ShieldCheck className="h-5 w-5 text-[var(--color-gold)]" />
                  <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="page-shell section-space">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="Real buyer language that builds trust without overpromising."
            description="Reviews are framed around routine value, clarity, and premium feel, because those are the conversion signals that matter here."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-3 xl:grid-cols-5">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.04}>
              <blockquote className="glass-panel h-full rounded-[28px] p-5">
                <div className="flex gap-1 text-[var(--color-gold)]">
                  {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                    <Star key={`${testimonial.name}-${starIndex}`} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  “{testimonial.quote}”
                </p>
                <footer className="mt-6">
                  <p className="font-medium text-[var(--color-ink)]">{testimonial.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                    {testimonial.location}
                  </p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="page-shell section-space pt-0">
        <Reveal>
          <div className="poster-surface overflow-hidden rounded-[40px] px-6 py-10 md:px-10 md:py-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl space-y-5">
                <p className="eyebrow">Final CTA</p>
                <h2 className="font-serif-display text-5xl leading-[0.92] text-[var(--color-ink)]">
                  Begin with the wellness kit, then expand into powders, oils, and combos only when needed.
                </h2>
                <p className="text-base leading-8 text-[var(--color-muted)]">
                  That’s the cleanest path to a premium, high-conversion Ayurvedic storefront.
                </p>
              </div>

              <div className="grid gap-3">
                <PurchaseLink href="/wellness-kits" className="justify-center">
                  Shop Wellness Kits
                </PurchaseLink>
                <a
                  href={buildWhatsAppUrl(BRAND.whatsappNumber, BRAND.whatsappOrderMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-line)] bg-white/78 px-5 py-3 text-sm font-semibold text-[var(--color-forest)]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Order via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
