"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import HeaderCart from "@/components/HeaderCart";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Checkout", href: "/checkout" },
  { label: "Orders", href: "/orders" },
];

export default function HeaderNavigation() {
  const pathname = usePathname();

  function isActive(href) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function getTabClass(active) {
    const base =
      "inline-flex min-h-11 items-center justify-center rounded-full border px-3 py-2 text-sm font-medium transition-colors";

    return active
      ? `${base} border-[#8e210c] bg-[#8e210c] !text-white`
      : `${base} border-transparent text-gray-700 hover:bg-red-50 hover:text-red-700`;
  }

  function getActiveStyle(active) {
    return active
      ? {
          color: "#ffffff",
          backgroundColor: "#8e210c",
          borderColor: "#8e210c",
        }
      : undefined;
  }

  return (
    <nav
      aria-label="Main navigation"
      className="flex flex-wrap items-center gap-1.5"
    >
      {navigationItems.slice(0, 2).map((item) => {
        const active = isActive(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={getTabClass(active)}
            style={getActiveStyle(active)}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}

      <HeaderCart />

      {navigationItems.slice(2).map((item) => {
        const active = isActive(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={getTabClass(active)}
            style={getActiveStyle(active)}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
