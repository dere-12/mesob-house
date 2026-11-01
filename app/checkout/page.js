import Link from "next/link";
import { redirect } from "next/navigation";

import CheckoutForm from "./CheckoutForm";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/checkout");
  }

  return (
    <main className="mx-auto flex-1 w-[90%] max-w-3xl py-10">
      <h1 className="text-3xl font-bold">Checkout</h1>

      <p className="mt-3 text-gray-600">
        Signed in as {user.name}. Complete your order here.
      </p>

      <CheckoutForm />

      <Link
        href="/cart"
        className="touch-target mt-6 text-blue-600 hover:underline"
      >
        ← Back to Cart
      </Link>
    </main>
  );
}
