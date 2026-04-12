"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";

export function CartButton() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white/72 px-4 py-2 text-sm font-medium text-[var(--color-forest)] backdrop-blur"
    >
      <ShoppingBag className="h-4 w-4" />
      <span>Cart</span>
      <span className="rounded-full bg-[var(--color-gold)] px-2 py-0.5 text-xs font-semibold text-white">
        {totalItems}
      </span>
    </Link>
  );
}
