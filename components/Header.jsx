import Link from "next/link";
import { signOut } from "@/app/actions";
import { getSession } from "@/lib/session";

export default async function Header() {
  const user = await getSession();

  return (
    <header className="bg-gray-900 text-white">
      <div className="mx-auto flex min-h-16 w-[90%] max-w-6xl flex-wrap items-center justify-between gap-4 py-3">
        <Link href="/" className="touch-target text-xl font-bold">
          Addis Eats
        </Link>

        <nav className="flex flex-wrap items-center gap-2">
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

          {user?.role === "staff" && (
            <Link href="/kitchen" className="touch-target px-2 hover:underline">
              Kitchen
            </Link>
          )}

          {user?.role === "staff" && (
            <Link
              href="/dashboard"
              className="touch-target px-2 hover:underline"
            >
              Dashboard
            </Link>
          )}

          {user ? (
            <>
              <span className="text-sm">Hi, {user.name}</span>

              <form action={signOut}>
                <button
                  type="submit"
                  className="touch-target px-2 hover:underline"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link href="/signin" className="touch-target px-2 hover:underline">
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
