import type { Metadata } from "next";
import { CartPageView } from "@/components/cart/cart-page-view";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Cart | ${BRAND.name}`,
  description: "Review your selected Ayurdhara Divya Shakti wellness items before checkout.",
};

export default function CartPage() {
  return <CartPageView />;
}
