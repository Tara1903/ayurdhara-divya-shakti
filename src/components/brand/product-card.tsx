import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/brand/add-to-cart-button";
import { buttonStyles } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types";

function getLabel(product: Product) {
  if (product.type === "wellness-kit") {
    return product.therapyLabel ?? "9-in-1 Complete Therapy Kit";
  }

  if (product.type === "combo") {
    return "Bundle Offer";
  }

  if (product.type === "raw-herb") {
    return "Raw Herb";
  }

  return "Support Product";
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-[30px] border border-[var(--color-line)] bg-white/88 shadow-[0_18px_60px_rgba(61,44,20,0.08)]">
      <div className="relative aspect-[1/1.04] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
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
      </div>

      <div className="space-y-5 p-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
            {getLabel(product)}
          </p>
          <h3 className="font-serif-display text-3xl leading-tight text-[var(--color-ink)]">
            {product.name}
          </h3>
          <p className="text-sm font-medium text-[var(--color-forest)]">{product.category}</p>
          <p className="text-sm leading-7 text-[var(--color-muted)]">{product.shortBenefit}</p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="text-2xl font-semibold text-[var(--color-forest)]">
              {formatCurrency(product.price)}
            </p>
            <p className="text-sm text-[var(--color-muted)]">
              <span className="line-through">{formatCurrency(product.originalPrice)}</span>{" "}
              <span className="font-medium text-[var(--color-gold)]">
                Save ₹{product.saveAmount ?? Math.max(product.originalPrice - product.price, 0)}
              </span>
            </p>
          </div>
          <p className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold text-[var(--color-forest)]">
            {product.durationLabel}
          </p>
        </div>

        {product.type === "wellness-kit" ? (
          <div className="grid grid-cols-3 gap-2 rounded-[24px] bg-[var(--color-surface)] p-3 text-center">
            <div>
              <p className="text-lg font-semibold text-[var(--color-forest)]">3</p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
                Nabhi Oils
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold text-[var(--color-forest)]">3</p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
                Feet Oils
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold text-[var(--color-forest)]">3</p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
                Powders
              </p>
            </div>
          </div>
        ) : null}

        <div className="grid gap-3">
          <Link
            href={`/products/${product.slug}`}
            className={buttonStyles({ variant: "secondary", className: "w-full" })}
          >
            View Details
          </Link>
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
