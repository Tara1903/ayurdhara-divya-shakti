"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { submitOrderAction, type OrderActionState } from "@/app/actions/order";
import { useCart } from "@/context/cart-context";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const initialState: OrderActionState = {};

export function CheckoutForm() {
  const router = useRouter();
  const { detailedItems, subtotal, clearCart } = useCart();
  const [state, action, pending] = useActionState(submitOrderAction, initialState);

  useEffect(() => {
    if (state.orderId) {
      clearCart();
      router.push(`/order-success/${state.orderId}?number=${state.orderNumber ?? ""}`);
    }
  }, [clearCart, router, state.orderId, state.orderNumber]);

  if (!detailedItems.length) {
    return null;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form action={action} className="rounded-[32px] border border-[var(--color-line)] bg-white/92 p-6 shadow-[0_18px_60px_rgba(61,44,20,0.08)] md:p-8">
        <div className="mb-8 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-gold)]">
            Cash on Delivery
          </p>
          <h2 className="font-serif-display text-4xl text-[var(--color-ink)]">
            Complete your order
          </h2>
          <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)]">
            We keep checkout simple: name, phone, address, and your selected
            order summary.
          </p>
        </div>

        <div className="grid gap-5">
          <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
            Name
            <input
              name="customerName"
              placeholder="Your full name"
              className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 outline-none"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
            Phone
            <input
              name="phone"
              placeholder="10-digit mobile number"
              className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 outline-none"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
            Address
            <textarea
              name="address"
              placeholder="House number, street, city, district, pincode"
              rows={5}
              className="rounded-[24px] border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 outline-none"
              required
            />
          </label>
          <input
            type="hidden"
            name="items"
            value={JSON.stringify(
              detailedItems.map((item) => ({
                productId: item.product.id,
                productName: item.product.name,
                quantity: item.quantity,
                unitPrice: item.product.price,
              })),
            )}
          />
          {state.error ? (
            <p className="rounded-2xl bg-[#fff0eb] px-4 py-3 text-sm text-[#9c4b35]">
              {state.error}
            </p>
          ) : null}
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? "Placing Order..." : "Confirm Order"}
          </Button>
        </div>
      </form>

      <aside className="rounded-[32px] border border-[var(--color-line)] bg-[var(--color-surface)] p-6 shadow-[0_18px_60px_rgba(61,44,20,0.06)] md:p-8">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-gold)]">
            Order Summary
          </p>
          <h3 className="font-serif-display text-3xl text-[var(--color-ink)]">
            Your selected wellness routine
          </h3>
        </div>
        <div className="mt-8 space-y-4">
          {detailedItems.map((item) => (
            <div
              key={item.product.id}
              className="flex items-start justify-between gap-4 border-b border-[var(--color-line)] pb-4"
            >
              <div className="space-y-1">
                <p className="font-medium text-[var(--color-ink)]">
                  {item.product.name}
                </p>
                <p className="text-sm text-[var(--color-muted)]">
                  Qty {item.quantity}
                </p>
              </div>
              <p className="font-medium text-[var(--color-forest)]">
                {formatCurrency(item.product.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-3 rounded-[24px] bg-white/80 p-5">
          <div className="flex items-center justify-between text-sm text-[var(--color-muted)]">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-[var(--color-muted)]">
            <span>Cash on Delivery</span>
            <span>Available</span>
          </div>
          <div className="flex items-center justify-between border-t border-[var(--color-line)] pt-3 text-base font-semibold text-[var(--color-ink)]">
            <span>Total</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
