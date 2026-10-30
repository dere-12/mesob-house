"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useCartStore } from "@/lib/cart-store";

export default function HeaderCart() {
  const pathname = usePathname();
  const items = useCartStore((state) => state.items);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const active = pathname === "/cart" || pathname.startsWith("/cart/");

  const badgeLabel = itemCount > 99 ? "99+" : itemCount;

  const tabClass = [
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-colors",
    active
      ? "border-[#8e210c] bg-[#8e210c] !text-white"
      : "border-transparent text-gray-700 hover:bg-red-50 hover:text-red-700",
  ].join(" ");

  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
      aria-current={active ? "page" : undefined}
      className={tabClass}
      style={
        active
          ? {
              color: "#ffffff",
              backgroundColor: "#8e210c",
              borderColor: "#8e210c",
            }
          : undefined
      }
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
          <span
            className={`absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-bold leading-none ${
              active ? "bg-white text-red-700" : "bg-red-600 text-white"
            }`}
          >
            {badgeLabel}
          </span>
        )}
      </span>

      <span>Cart</span>
    </Link>
  );
}
