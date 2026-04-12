"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { buttonStyles } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export function CartPageView() {
  const { detailedItems, subtotal, removeItem, updateQuantity } = useCart();

  if (!detailedItems.length) {
    return (
      <section className="page-shell section-space">
        <div className="section-frame mx-auto max-w-3xl px-6 py-12 text-center md:px-10">
          <p className="eyebrow">Cart Empty</p>
          <h1 className="mt-4 font-serif-display text-4xl text-[var(--color-ink)] md:text-5xl">
            Your wellness cart is waiting.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--color-muted)]">
            Explore the 9-in-1 wellness kits and supporting powders, oils, and combos
            built around a clearer daily ritual.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/wellness-kits" className={buttonStyles()}>
              Explore Wellness Kits
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell section-space">
      <div className="mb-10 max-w-2xl space-y-3">
        <p className="eyebrow">Cart</p>
        <h1 className="font-serif-display text-5xl text-[var(--color-ink)]">
          Review your selected wellness routine.
        </h1>
        <p className="text-base leading-7 text-[var(--color-muted)]">
          Wellness kits lead the cart, while powders, oils, and combos support the
          routine with clean, premium add-ons.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {detailedItems.map(({ product, quantity }) => (
            <article
              key={product.id}
              className="section-frame grid gap-5 overflow-hidden p-5 md:grid-cols-[180px_1fr]"
            >
              <div className="relative aspect-[1/1] overflow-hidden rounded-[24px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 180px"
                />
              </div>

              <div className="flex flex-col justify-between gap-5">
                <div className="space-y-2">
                  <p className="eyebrow">{product.therapyLabel ?? "Wellness Product"}</p>
                  <h2 className="font-serif-display text-3xl text-[var(--color-ink)]">
                    {product.name}
                  </h2>
                  <p className="text-sm leading-7 text-[var(--color-muted)]">
                    {product.shortBenefit}
                  </p>
                </div>

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-surface)] px-2 py-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="grid h-9 w-9 place-items-center rounded-full bg-white text-[var(--color-forest)]"
                      aria-label={`Decrease quantity for ${product.name}`}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-8 text-center text-sm font-semibold text-[var(--color-ink)]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="grid h-9 w-9 place-items-center rounded-full bg-white text-[var(--color-forest)]"
                      aria-label={`Increase quantity for ${product.name}`}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-xl font-semibold text-[var(--color-forest)]">
                      {formatCurrency(product.price * quantity)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-4 py-2 text-sm font-medium text-[var(--color-forest)]"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="section-frame h-fit p-6 md:p-8">
          <p className="eyebrow">Summary</p>
          <h2 className="mt-3 font-serif-display text-4xl text-[var(--color-ink)]">
            Calm checkout, no surprises.
          </h2>
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between text-sm text-[var(--color-muted)]">
              <span>Items</span>
              <span>{detailedItems.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-[var(--color-muted)]">
              <span>Cash on Delivery</span>
              <span>Available</span>
            </div>
            <div className="gold-divider" />
            <div className="flex items-center justify-between text-lg font-semibold text-[var(--color-ink)]">
              <span>Total</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
          </div>

          <div className="mt-8 grid gap-3">
            <Link href="/checkout" className={buttonStyles({ className: "w-full" })}>
              Proceed to Checkout
            </Link>
            <Link
              href="/wellness-kits"
              className={buttonStyles({ variant: "secondary", className: "w-full" })}
            >
              Continue Shopping
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
