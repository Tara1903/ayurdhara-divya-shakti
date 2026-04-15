"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { submitOrderAction, type OrderActionState } from "@/app/actions/order";
import { useCart } from "@/context/cart-context";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { CustomerAddress, CustomerProfile } from "@/types";

const initialState: OrderActionState = {};

function formatAddress(address: CustomerAddress) {
  return [
    address.line1,
    address.line2,
    `${address.city}, ${address.state} ${address.pincode}`,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
}

export function CheckoutForm({
  profile,
  addresses = [],
}: {
  profile?: CustomerProfile | null;
  addresses?: CustomerAddress[];
}) {
  const router = useRouter();
  const { detailedItems, subtotal, clearCart } = useCart();
  const [state, action, pending] = useActionState(submitOrderAction, initialState);
  const defaultAddress = useMemo(
    () => addresses.find((address) => address.isDefault) ?? addresses[0] ?? null,
    [addresses],
  );
  const [selectedAddressId, setSelectedAddressId] = useState(defaultAddress?.id ?? "");
  const [addressValue, setAddressValue] = useState(defaultAddress ? formatAddress(defaultAddress) : "");

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
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
      <form action={action} className="rounded-[28px] border border-[var(--color-line)] bg-white/92 p-5 shadow-[0_18px_60px_rgba(61,44,20,0.08)] md:rounded-[32px] md:p-8">
        <div className="mb-8 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-gold)]">
            Cash on Delivery
          </p>
          <h2 className="font-serif-display text-[2rem] text-[var(--color-ink)] md:text-4xl">
            Complete your order
          </h2>
          <p className="max-w-xl text-sm leading-6 text-[var(--color-muted)] md:leading-7">
            We keep checkout simple: name, phone, address, and your selected
            order summary.
          </p>
        </div>

        {profile ? (
          <div className="mb-6 rounded-[24px] bg-[#eff8ee] px-4 py-4 text-sm leading-6 text-[var(--color-muted)] md:leading-7">
            Signed in as <span className="font-semibold text-[var(--color-ink)]">{profile.email}</span>. We’ve prefilled your details and any saved default address.
          </div>
        ) : (
          <div className="mb-6 rounded-[24px] bg-[var(--color-surface)] px-4 py-4 text-sm leading-6 text-[var(--color-muted)] md:leading-7">
            Guest checkout is still available. Create an account later if you want saved addresses, wishlist access, and order history.
          </div>
        )}

        <div className="grid gap-5">
          <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
            Name
            <input
              name="customerName"
              placeholder="Your full name"
              className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 outline-none"
              defaultValue={profile?.fullName ?? ""}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
            Email
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 outline-none"
              defaultValue={profile?.email ?? ""}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
            Phone
            <input
              name="phone"
              placeholder="10-digit mobile number"
              className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 outline-none"
              defaultValue={profile?.phone ?? ""}
              required
            />
          </label>
          {addresses.length ? (
            <div className="grid gap-3">
              <p className="text-sm font-medium text-[var(--color-ink)]">Saved Addresses</p>
              <div className="grid gap-3">
                {addresses.map((address) => (
                  <button
                    key={address.id}
                    type="button"
                    onClick={() => {
                      setSelectedAddressId(address.id);
                      setAddressValue(formatAddress(address));
                    }}
                    className={`rounded-[24px] border px-4 py-4 text-left text-sm ${
                      selectedAddressId === address.id
                        ? "border-transparent bg-[rgba(46,125,50,0.12)] text-[var(--color-forest)]"
                        : "border-[var(--color-line)] bg-white text-[var(--color-ink)]"
                    }`}
                  >
                    <p className="font-semibold">{address.label}</p>
                    <p className="mt-2 leading-6 text-[inherit]">{formatAddress(address)}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
            Address
            <textarea
              name="address"
              placeholder="House number, street, city, district, pincode"
              rows={5}
              className="rounded-[24px] border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 outline-none"
              value={addressValue}
              onChange={(event) => setAddressValue(event.target.value)}
              required
            />
          </label>
          {selectedAddressId ? <input type="hidden" name="addressId" value={selectedAddressId} /> : null}
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

      <aside className="rounded-[28px] border border-[var(--color-line)] bg-[var(--color-surface)] p-5 shadow-[0_18px_60px_rgba(61,44,20,0.06)] md:rounded-[32px] md:p-8">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-gold)]">
            Order Summary
          </p>
          <h3 className="font-serif-display text-[1.9rem] text-[var(--color-ink)] md:text-3xl">
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
