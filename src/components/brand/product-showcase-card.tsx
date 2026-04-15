"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { WishlistToggleButton } from "@/components/account/wishlist-toggle-button";
import { AddToCartButton } from "@/components/brand/add-to-cart-button";
import { getProductShowcaseMeta } from "@/lib/storefront/showcase";
import { buttonStyles } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import type { Product } from "@/types";

function buildProductLabel(product: Product) {
  if (product.type === "wellness-kit") {
    return product.therapyLabel ?? "9-in-1 Wellness Kit";
  }

  if (product.type === "combo") {
    return "Curated Combo";
  }

  if (product.type === "raw-herb") {
    return "Raw Herb";
  }

  if (product.type === "herbal-oil") {
    return "Herbal Oil";
  }

  return "Herbal Powder";
}

export function ProductShowcaseCard({
  product,
  variant = "standard",
  wishlistActive = false,
  wishlistRedirectTo,
}: {
  product: Product;
  variant?: "standard" | "compact";
  wishlistActive?: boolean;
  wishlistRedirectTo?: string;
}) {
  const meta = getProductShowcaseMeta(product);
  const isCompact = variant === "compact";
  const saveAmount = product.saveAmount ?? Math.max(product.originalPrice - product.price, 0);

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[30px] border border-[rgba(34,58,37,0.08)] bg-[rgba(255,255,255,0.92)] shadow-[0_18px_56px_rgba(43,46,26,0.08)]",
        isCompact ? "w-full" : "",
      )}
    >
      <Link href={`/products/${product.slug}`} className="relative block overflow-hidden">
        <div className={cn("relative overflow-hidden", isCompact ? "aspect-[0.95]" : "aspect-[1/1.02]")}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes={isCompact ? "(max-width: 768px) 70vw, 18rem" : "(max-width: 768px) 50vw, 25vw"}
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        </div>

        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[rgba(20,40,28,0.82)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
              {meta.badge ?? product.badge ?? "Organic"}
            </span>
            {product.limitedStockText ? (
              <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-forest)]">
                {product.limitedStockText}
              </span>
            ) : null}
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/92 px-2.5 py-1 text-xs font-semibold text-[var(--color-ink)] shadow-sm">
            <Star className="h-3.5 w-3.5 fill-[var(--color-gold)] text-[var(--color-gold)]" />
            {meta.rating.toFixed(1)}
          </span>
        </div>

        <div className="absolute bottom-3 right-3 z-10">
          <WishlistToggleButton
            productId={product.id}
            redirectTo={wishlistRedirectTo ?? `/products/${product.slug}`}
            active={wishlistActive}
            compact
          />
        </div>
      </Link>

      <div className={cn("flex flex-1 flex-col", isCompact ? "gap-4 p-4" : "gap-5 p-5")}>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-gold)]">
              {buildProductLabel(product)}
            </p>
            <p className="text-xs font-medium text-[var(--color-muted)]">
              {meta.reviewCount}+ reviews
            </p>
          </div>

          <Link href={`/products/${product.slug}`} className="block">
            <h3
              className={cn(
                "font-serif-display leading-[1.02] text-[var(--color-ink)]",
                isCompact ? "text-[1.35rem] sm:text-[1.6rem]" : "text-[1.7rem] sm:text-[1.95rem]",
              )}
            >
              {product.name}
            </h3>
          </Link>

          <p className="text-sm font-medium text-[var(--color-forest)]">{product.category}</p>
          <p className="text-sm leading-6 text-[var(--color-muted)]">{product.shortBenefit}</p>

          <div className="flex flex-wrap gap-2 pt-1">
            <span className="rounded-full bg-[rgba(46,125,50,0.08)] px-3 py-1 text-xs font-medium text-[var(--color-forest)]">
              {meta.trustLabel}
            </span>
            {product.type === "wellness-kit" ? (
              <span className="rounded-full bg-[rgba(212,175,55,0.14)] px-3 py-1 text-xs font-medium text-[var(--color-ink)]">
                3 oils + 3 feet + 3 powders
              </span>
            ) : null}
          </div>
        </div>

        <div className="mt-auto space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-2xl font-semibold text-[var(--color-forest)]">
                {formatCurrency(product.price)}
              </p>
              <p className="text-sm text-[var(--color-muted)]">
                <span className="line-through">{formatCurrency(product.originalPrice)}</span>
                <span className="ml-2 font-medium text-[var(--color-gold)]">Save ₹{saveAmount}</span>
              </p>
            </div>
            <p className="rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold text-[var(--color-forest)]">
              {product.durationLabel}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
            <Link
              href={`/products/${product.slug}`}
              className={buttonStyles({
                variant: "secondary",
                className: cn("h-11 justify-center", isCompact ? "px-4" : ""),
              })}
            >
              {meta.ctaLabel}
            </Link>
            <AddToCartButton
              product={product}
              compact
              className="h-11 min-w-[8.5rem] rounded-full px-4 sm:w-auto"
              label="Add"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
