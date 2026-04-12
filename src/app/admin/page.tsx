import type { Metadata } from "next";
import { BarChart3, Clock3, IndianRupee, PackageSearch } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  getAdminSetupState,
  isPreviewAdminAuth,
  requireAdmin,
} from "@/lib/admin-auth";
import { BRAND } from "@/lib/brand";
import { getDashboardStats, listOrders, listProducts } from "@/lib/repositories";
import { isSupabaseConfigured } from "@/lib/supabase";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: `Admin Dashboard | ${BRAND.name}`,
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardPage() {
  await requireAdmin();
  const [stats, orders, products] = await Promise.all([
    getDashboardStats(),
    listOrders(),
    listProducts(),
  ]);
  const previewAuth = isPreviewAdminAuth();

  const statusCards = [
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: PackageSearch,
    },
    {
      label: "Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: IndianRupee,
    },
    {
      label: "Pending Orders",
      value: stats.pendingOrders,
      icon: Clock3,
    },
    {
      label: "Products",
      value: products.length,
      icon: BarChart3,
    },
  ];

  return (
    <AdminShell
      title="Dashboard"
      description="Overview of orders, product inventory, and whether the secure backend environment is fully configured."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {statusCards.map((card) => (
          <article key={card.label} className="section-frame px-5 py-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[var(--color-muted)]">{card.label}</p>
              <card.icon className="h-5 w-5 text-[var(--color-gold)]" />
            </div>
            <p className="mt-4 font-serif-display text-4xl text-[var(--color-ink)]">
              {card.value}
            </p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="section-frame p-6">
          <p className="eyebrow">Setup Status</p>
          <div className="mt-5 grid gap-4">
            <StatusRow
              label="Admin Credentials"
              value={
                getAdminSetupState()
                  ? "Configured"
                  : previewAuth
                    ? "Local preview credentials active"
                    : "Missing ADMIN_* env values"
              }
              healthy={getAdminSetupState() || previewAuth}
            />
            <StatusRow
              label="Supabase Backend"
              value={isSupabaseConfigured() ? "Configured" : "Missing Supabase env values"}
              healthy={isSupabaseConfigured()}
            />
          </div>
        </section>

        <section className="section-frame p-6">
          <p className="eyebrow">Recent Orders</p>
          <div className="mt-5 grid gap-4">
            {orders.slice(0, 4).map((order) => (
              <div
                key={order.id}
                className="rounded-[24px] border border-[var(--color-line)] bg-white/85 px-5 py-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-[var(--color-ink)]">{order.customerName}</p>
                    <p className="text-sm text-[var(--color-muted)]">{order.orderNumber}</p>
                  </div>
                  <span className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-forest)]">
                    {order.status}
                  </span>
                </div>
                <p className="mt-3 text-sm text-[var(--color-muted)]">
                  {formatCurrency(order.totalPrice)}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}

function StatusRow({
  label,
  value,
  healthy,
}: {
  label: string;
  value: string;
  healthy: boolean;
}) {
  return (
    <div className="rounded-[24px] border border-[var(--color-line)] bg-white/82 px-5 py-5">
      <p className="text-sm text-[var(--color-muted)]">{label}</p>
      <p className="mt-2 font-medium text-[var(--color-ink)]">{value}</p>
      <p
        className={`mt-2 text-xs font-semibold uppercase tracking-[0.24em] ${
          healthy ? "text-[var(--color-forest)]" : "text-[#9c4b35]"
        }`}
      >
        {healthy ? "Ready" : "Needs attention"}
      </p>
    </div>
  );
}
