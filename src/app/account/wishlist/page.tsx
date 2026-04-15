import type { Metadata } from "next";
import Link from "next/link";
import { AccountShell } from "@/components/account/account-shell";
import { ProductShowcaseCard } from "@/components/brand/product-showcase-card";
import { buttonStyles } from "@/components/ui/button";
import { listCustomerWishlist } from "@/lib/customer-data";
import { requireCustomer } from "@/lib/customer-auth";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `My Wishlist | ${BRAND.name}`,
  description: "Review the Ayurvedic wellness products you saved for later.",
};

export default async function AccountWishlistPage() {
  const customer = await requireCustomer("/account/wishlist");
  const wishlist = await listCustomerWishlist(customer.id);

  return (
    <AccountShell
      currentPath="/account/wishlist"
      customer={customer}
      title="Wishlist"
      description="Keep promising products in one list so you can return later without losing the items that caught your attention."
    >
      {wishlist.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {wishlist.map((item) => (
            <ProductShowcaseCard
              key={`${item.userId}-${item.productId}`}
              product={item.product}
              wishlistActive
              wishlistRedirectTo="/account/wishlist"
            />
          ))}
        </div>
      ) : (
        <div className="rounded-[32px] border border-[var(--color-line)] bg-white/92 px-5 py-8 shadow-[0_18px_54px_rgba(44,50,28,0.08)]">
          <p className="text-sm leading-7 text-[var(--color-muted)]">
            Your wishlist is empty right now. Save products while browsing and they’ll appear here for easy comparison.
          </p>
          <div className="mt-6">
            <Link href="/wellness-kits" className={buttonStyles()}>
              Explore Wellness Kits
            </Link>
          </div>
        </div>
      )}
    </AccountShell>
  );
}
