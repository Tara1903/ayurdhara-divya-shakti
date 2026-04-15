import type { Metadata } from "next";
import { AccountShell } from "@/components/account/account-shell";
import { CustomerAddressBook } from "@/components/account/customer-address-book";
import { listCustomerAddresses } from "@/lib/customer-data";
import { requireCustomer } from "@/lib/customer-auth";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `My Addresses | ${BRAND.name}`,
  description: "Save and manage delivery addresses for faster Ayurdhara checkout.",
};

export default async function AccountAddressesPage() {
  const customer = await requireCustomer("/account/addresses");
  const addresses = await listCustomerAddresses(customer.id);

  return (
    <AccountShell
      currentPath="/account/addresses"
      customer={customer}
      title="Addresses"
      description="Save delivery addresses once so future wellness kit orders can move through checkout faster."
    >
      <CustomerAddressBook addresses={addresses} />
    </AccountShell>
  );
}
