import type { Metadata } from "next";
import { AccountShell } from "@/components/account/account-shell";
import { CustomerProfileForm } from "@/components/account/customer-profile-form";
import { getCustomerProfileById } from "@/lib/customer-data";
import { requireCustomer } from "@/lib/customer-auth";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `My Profile | ${BRAND.name}`,
  description: "Update your Ayurdhara Divya Shakti customer profile details.",
};

export default async function AccountProfilePage() {
  const customer = await requireCustomer("/account/profile");
  const profile = await getCustomerProfileById(customer.id);

  return (
    <AccountShell
      currentPath="/account/profile"
      customer={customer}
      title="Profile"
      description="Keep your main contact details accurate so checkout stays quick and support can reach you when needed."
    >
      {profile ? (
        <CustomerProfileForm profile={profile} />
      ) : (
        <div className="rounded-[32px] border border-[var(--color-line)] bg-white/92 px-5 py-8 text-sm leading-7 text-[var(--color-muted)] shadow-[0_18px_54px_rgba(44,50,28,0.08)]">
          Your profile could not be loaded yet. Try refreshing once, and if this persists we may still need to finish the backend profile table on Supabase.
        </div>
      )}
    </AccountShell>
  );
}
