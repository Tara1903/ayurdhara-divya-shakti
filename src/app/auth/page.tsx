import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CustomerAuthPanel } from "@/components/account/customer-auth-panel";
import { getCurrentCustomer } from "@/lib/customer-auth";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Customer Login | ${BRAND.name}`,
  description:
    "Sign in or create your Ayurdhara Divya Shakti customer account for faster checkout, order history, addresses, and wishlist access.",
};

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const customer = await getCurrentCustomer();
  const next = params.next?.startsWith("/") ? params.next : "/account";

  if (customer) {
    redirect(next);
  }

  return <CustomerAuthPanel next={next} />;
}
