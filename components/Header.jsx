import Link from "next/link";
import HeaderAuth from "@/components/HeaderAuth";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white">
      <div className="mx-auto flex min-h-16 w-[90%] max-w-6xl flex-wrap items-center justify-between gap-4 py-3">
        <Link
          href="/"
          className="flex min-h-11 flex-col justify-center"
          aria-label="Mesob House home"
        >
          <span className="font-display text-xl font-bold">Mesob House</span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-700">
            Habesha Hospitality
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex flex-wrap items-center gap-2"
        >
          <Link href="/" className="touch-target px-2 hover:underline">
            Home
          </Link>

          <Link href="/menu" className="touch-target px-2 hover:underline">
            Menu
          </Link>

          <Link href="/cart" className="touch-target px-2 hover:underline">
            Cart
          </Link>

          <Link href="/checkout" className="touch-target px-2 hover:underline">
            Checkout
          </Link>

          <Link href="/orders" className="touch-target px-2 hover:underline">
            Orders
          </Link>

          <HeaderAuth />
        </nav>
      </div>
    </header>
  );
}
