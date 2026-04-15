"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { toggleWishlistAction, type CustomerActionState } from "@/app/actions/customer";

const initialCustomerState: CustomerActionState = {};

export function WishlistToggleButton({
  productId,
  redirectTo,
  active = false,
  compact = false,
}: {
  productId: string;
  redirectTo: string;
  active?: boolean;
  compact?: boolean;
}) {
  const router = useRouter();
  const [state, action, pending] = useActionState(toggleWishlistAction, initialCustomerState);

  useEffect(() => {
    if (state.redirectTo?.startsWith("/auth")) {
      router.push(state.redirectTo);
      return;
    }

    if (state.redirectTo) {
      router.refresh();
    }
  }, [router, state.redirectTo]);

  return (
    <form action={action}>
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <button
        type="submit"
        disabled={pending}
        aria-label={active ? "Remove from wishlist" : "Save to wishlist"}
        className={
          compact
            ? `inline-flex h-10 w-10 items-center justify-center rounded-full border ${
                active
                  ? "border-transparent bg-[rgba(46,125,50,0.14)] text-[var(--color-forest)]"
                  : "border-[var(--color-line)] bg-white/92 text-[var(--color-ink)]"
              }`
            : `inline-flex items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-medium ${
                active
                  ? "border-transparent bg-[rgba(46,125,50,0.14)] text-[var(--color-forest)]"
                  : "border-[var(--color-line)] bg-white/92 text-[var(--color-ink)]"
              }`
        }
      >
        <Heart className={`h-4 w-4 ${active ? "fill-current" : ""}`} />
        {compact ? null : active ? "Saved" : "Save to Wishlist"}
      </button>
    </form>
  );
}
