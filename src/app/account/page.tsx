import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, Heart, MapPin, PackageSearch } from "lucide-react";
import { AccountShell } from "@/components/account/account-shell";
import { buttonStyles } from "@/components/ui/button";
import {
  listCustomerAddresses,
  listCustomerOrders,
  listCustomerWishlist,
} from "@/lib/customer-data";
import { requireCustomer } from "@/lib/customer-auth";
import { BRAND } from "@/lib/brand";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: `My Account | ${BRAND.name}`,
  description:
    "Review your Ayurdhara Divya Shakti orders, addresses, wishlist, and profile from one account dashboard.",
};

export default async function AccountOverviewPage() {
  const customer = await requireCustomer("/account");
  const [orders, addresses, wishlist] = await Promise.all([
    listCustomerOrders(customer.id),
    listCustomerAddresses(customer.id),
    listCustomerWishlist(customer.id),
  ]);

  const cards = [
    { label: "Orders", value: orders.length, icon: PackageSearch },
    { label: "Wishlist", value: wishlist.length, icon: Heart },
    { label: "Addresses", value: addresses.length, icon: MapPin },
    {
      label: "Latest Order",
      value: orders[0] ? formatCurrency(orders[0].totalPrice) : "None yet",
      icon: Clock3,
    },
  ];

  return (
    <AccountShell
      currentPath="/account"
      customer={customer}
      title="Overview"
      description="Keep your account details, delivery information, saved products, and recent orders in one calm, mobile-friendly workspace."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article
            key={card.label}
            className="rounded-[30px] border border-[var(--color-line)] bg-white/92 p-5 shadow-[0_18px_54px_rgba(44,50,28,0.08)]"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-[var(--color-muted)]">{card.label}</p>
              <card.icon className="h-5 w-5 text-[var(--color-gold)]" />
            </div>
            <p className="mt-4 font-serif-display text-4xl text-[var(--color-ink)]">{card.value}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <section className="rounded-[32px] border border-[var(--color-line)] bg-white/92 p-6 shadow-[0_18px_54px_rgba(44,50,28,0.08)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
                Recent Orders
              </p>
              <h2 className="mt-2 font-serif-display text-3xl text-[var(--color-ink)]">
                Latest purchase activity
              </h2>
            </div>
            <Link href="/account/orders" className={buttonStyles({ variant: "secondary" })}>
              View All
            </Link>
          </div>

          <div className="mt-6 grid gap-4">
            {orders.slice(0, 3).map((order) => (
              <article
                key={order.id}
                className="rounded-[24px] bg-[var(--color-surface)] px-5 py-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-[var(--color-ink)]">{order.orderNumber}</p>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">{order.customerName}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-forest)]">
                    {order.status}
                  </span>
                </div>
                <p className="mt-3 text-sm text-[var(--color-muted)]">
                  {formatCurrency(order.totalPrice)}
                </p>
              </article>
            ))}
            {!orders.length ? (
              <p className="rounded-[24px] bg-[var(--color-surface)] px-5 py-5 text-sm leading-7 text-[var(--color-muted)]">
                No account-linked orders yet. Guest checkout still works, but future signed-in orders will appear here automatically.
              </p>
            ) : null}
          </div>
        </section>

        <section className="rounded-[32px] border border-[var(--color-line)] bg-white/92 p-6 shadow-[0_18px_54px_rgba(44,50,28,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
            Saved Defaults
          </p>
          <h2 className="mt-2 font-serif-display text-3xl text-[var(--color-ink)]">
            Profile and delivery shortcuts
          </h2>

          <div className="mt-6 grid gap-4">
            <div className="rounded-[24px] bg-[var(--color-surface)] px-5 py-5">
              <p className="text-sm text-[var(--color-muted)]">Email</p>
              <p className="mt-2 font-medium text-[var(--color-ink)]">{customer.email}</p>
            </div>
            <div className="rounded-[24px] bg-[var(--color-surface)] px-5 py-5">
              <p className="text-sm text-[var(--color-muted)]">Phone</p>
              <p className="mt-2 font-medium text-[var(--color-ink)]">{customer.phone}</p>
            </div>
            <div className="rounded-[24px] bg-[var(--color-surface)] px-5 py-5">
              <p className="text-sm text-[var(--color-muted)]">Default Address</p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-ink)]">
                {addresses.find((address) => address.isDefault)?.line1 || "No default address saved yet."}
              </p>
            </div>
          </div>
        </section>
      </div>
    </AccountShell>
  );
}
