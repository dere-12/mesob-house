"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";

export default function HeaderCart() {
  const items = useCartStore((state) => state.items);

  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const badgeLabel = itemCount > 99 ? "99+" : itemCount;

  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
      className="touch-target relative gap-2 rounded-md px-2 transition-colors hover:bg-[#fbe7d9] hover:text-[#8e210c]"
    >
      <span className="relative inline-flex">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <circle cx="9" cy="20" r="1" />
          <circle cx="19" cy="20" r="1" />
          <path d="M2 3h2l2.4 11.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6L22 7H5" />
        </svg>

        {itemCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#8e210c] px-1 text-[10px] font-bold leading-none text-white">
            {badgeLabel}
          </span>
        )}
      </span>

      <span className="text-sm font-medium">Cart</span>
    </Link>
  );
}