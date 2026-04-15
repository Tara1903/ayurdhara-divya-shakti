import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutForm } from "@/components/cart/checkout-form";
import { buttonStyles } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { getCurrentCustomer } from "@/lib/customer-auth";
import { getCustomerProfileById, listCustomerAddresses } from "@/lib/customer-data";

export const metadata: Metadata = {
  title: `Checkout | ${BRAND.name}`,
  description: "Complete your Ayurdhara Divya Shakti order with Cash on Delivery checkout.",
};

export default async function CheckoutPage() {
  const customer = await getCurrentCustomer();
  const [profile, addresses] = customer
    ? await Promise.all([
        getCustomerProfileById(customer.id),
        listCustomerAddresses(customer.id),
      ])
    : [null, []];

  return (
    <section className="page-shell section-space">
      <div className="mb-10 max-w-2xl space-y-3">
        <p className="eyebrow">Checkout</p>
        <h1 className="font-serif-display text-4xl text-[var(--color-ink)] md:text-5xl">
          Confirm your order details.
        </h1>
        <p className="text-base leading-7 text-[var(--color-muted)]">
          Keep the checkout flow clean and friction-light: basic customer details,
          a clear order summary, and Cash on Delivery reassurance.
        </p>
      </div>

      <CheckoutForm profile={profile} addresses={addresses} />

      <div className="mt-8">
        <Link href="/cart" className={buttonStyles({ variant: "ghost" })}>
          Back to Cart
        </Link>
      </div>
    </section>
  );
}
