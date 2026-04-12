import type { Metadata } from "next";
import { updateOrderStatusAction } from "@/app/actions/admin";
import { AdminShell } from "@/components/admin/admin-shell";
import { buttonStyles } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin-auth";
import { BRAND } from "@/lib/brand";
import { listOrders } from "@/lib/repositories";
import { formatCurrency } from "@/lib/utils";

const statuses = ["pending", "shipped", "delivered"] as const;
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: `Admin Orders | ${BRAND.name}`,
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminOrdersPage() {
  await requireAdmin();
  const orders = await listOrders();

  return (
    <AdminShell
      title="Orders"
      description="Review every order, inspect the ordered kits, and update the delivery status without leaving the dashboard."
    >
      <div className="grid gap-5">
        {orders.map((order) => (
          <article key={order.id} className="section-frame px-6 py-6 md:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-2">
                <p className="eyebrow">{order.orderNumber}</p>
                <h2 className="font-serif-display text-3xl text-[var(--color-ink)]">
                  {order.customerName}
                </h2>
                <p className="text-sm leading-7 text-[var(--color-muted)]">
                  {order.phone} · {order.address}
                </p>
                <p className="text-sm font-medium text-[var(--color-forest)]">
                  {formatCurrency(order.totalPrice)}
                </p>
              </div>

              <form action={updateOrderStatusAction} className="flex flex-wrap items-center gap-3">
                <input type="hidden" name="id" value={order.id} />
                <select
                  name="status"
                  defaultValue={order.status}
                  className="rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 text-sm"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <button type="submit" className={buttonStyles()}>
                  Update Status
                </button>
              </form>
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
      </div>
    </AdminShell>
  );
}
