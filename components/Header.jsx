import Link from "next/link";
import HeaderAuth from "@/components/HeaderAuth";
import HeaderCart from "@/components/HeaderCart";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#edd8ce] bg-[#fff7f2] text-[#30211d]">
      <div className="mx-auto flex min-h-16 w-[90%] max-w-6xl flex-wrap items-center justify-between gap-4 py-3">
        <Link
          href="/"
          className="flex min-h-11 flex-col justify-center"
          aria-label="Mesob House home"
        >
          <span className="font-display text-xl font-bold text-[#8e210c]">
            Mesob House
          </span>

          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8c611d]">
            Habesha Hospitality
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex flex-wrap items-center gap-2"
        >
          <Link href="/" className="touch-target px-2 hover:text-[#8e210c]">
            Home
          </Link>

          <Link href="/menu" className="touch-target px-2 hover:text-[#8e210c]">
            Menu
          </Link>

          <HeaderCart />

          <Link
            href="/checkout"
            className="touch-target px-2 hover:text-[#8e210c]"
          >
            Checkout
          </Link>

          <Link
            href="/orders"
            className="touch-target px-2 hover:text-[#8e210c]"
          >
            Orders
          </Link>

          <HeaderAuth />
        </nav>
      </div>
    </header>
  );
}
