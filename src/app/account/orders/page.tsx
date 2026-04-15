import type { Metadata } from "next";
import { AccountShell } from "@/components/account/account-shell";
import { listCustomerOrders } from "@/lib/customer-data";
import { requireCustomer } from "@/lib/customer-auth";
import { BRAND } from "@/lib/brand";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: `My Orders | ${BRAND.name}`,
  description: "Review your account-linked Ayurdhara Divya Shakti order history.",
};

export default async function AccountOrdersPage() {
  const customer = await requireCustomer("/account/orders");
  const orders = await listCustomerOrders(customer.id);

  return (
    <AccountShell
      currentPath="/account/orders"
      customer={customer}
      title="Orders"
      description="Every signed-in purchase appears here with status, amount, and the items included in the order."
    >
      <div className="grid gap-5">
        {orders.map((order) => (
          <article
            key={order.id}
            className="rounded-[32px] border border-[var(--color-line)] bg-white/92 px-5 py-5 shadow-[0_18px_54px_rgba(44,50,28,0.08)] md:px-6"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
                  {order.orderNumber}
                </p>
                <h2 className="mt-2 font-serif-display text-3xl text-[var(--color-ink)]">
                  {formatCurrency(order.totalPrice)}
                </h2>
                <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                  {order.address}
                </p>
              </div>
              <span className="rounded-full bg-[rgba(46,125,50,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-forest)]">
                {order.status}
              </span>
            </div>

            <div className="mt-6 grid gap-3">
              {order.items.map((item) => (
                <div
                  key={`${order.id}-${item.productId}`}
                  className="rounded-[22px] bg-[var(--color-surface)] px-5 py-4 text-sm text-[var(--color-muted)]"
                >
                  {item.productName} · Qty {item.quantity} · {formatCurrency(item.unitPrice)}
                </div>
              ))}
            </div>
          </article>
        ))}

        {!orders.length ? (
          <div className="rounded-[32px] border border-[var(--color-line)] bg-white/92 px-5 py-8 text-sm leading-7 text-[var(--color-muted)] shadow-[0_18px_54px_rgba(44,50,28,0.08)]">
            No account-linked orders yet. Guest orders stay separate, and future signed-in orders will show here automatically.
          </div>
        ) : null}
      </div>
    </AccountShell>
  );
}
