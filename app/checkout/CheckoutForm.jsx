"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { placeOrder } from "@/app/actions";
import { useCartStore } from "@/lib/cart-store";
import { etb } from "@/lib/format";

export default function CheckoutForm() {
  const [state, formAction, pending] = useActionState(placeOrder, null);
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const subtotal = items.reduce(
    (total, item) => total + item.priceETB * item.quantity,
    0,
  );

  useEffect(() => {
    if (state?.success) {
      clearCart();
      router.push("/orders");
    }
  }, [state, clearCart, router]);

  if (items.length === 0 && !state?.success) {
    return (
      <section className="mt-6 rounded-xl bg-white p-6 shadow-md">
        <p>Your cart is empty. Add some dishes before checking out.</p>

        <Link
          href="/menu"
          className="touch-target mt-4 rounded-md bg-gray-900 px-5 py-2 text-white hover:bg-gray-700"
        >
          Browse Menu
        </Link>
      </section>
    );
  }

  return (
    <form
      action={formAction}
      className="mt-6 space-y-4 rounded-xl bg-white p-6 shadow-md sm:p-8"
    >
      <div>
        <h2 className="text-xl font-semibold">Your order</h2>

        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li key={item.slug} className="flex justify-between gap-4">
              <span>
                {item.nameEn} × {item.quantity}
              </span>

              <span className="whitespace-nowrap">
                {etb.format(item.priceETB * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-right font-bold">
          Subtotal: {etb.format(subtotal)}
        </p>
      </div>

      <input type="hidden" name="cartItems" value={JSON.stringify(items)} />

      <div>
        <label htmlFor="name" className="block font-medium">
          Full name
        </label>

        <input
          id="name"
          name="name"
          required
          minLength={2}
          className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2"
        />

        {state?.fieldErrors?.name?.[0] && (
          <p role="alert" className="text-sm text-red-600">
            {state.fieldErrors.name[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block font-medium">
          Phone number
        </label>

        <input
          id="phone"
          name="phone"
          type="tel"
          required
          pattern="(09|[+]2519)[0-9]{8}"
          title="Use 09… or +2519… followed by 8 digits"
          className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2"
        />

        {state?.fieldErrors?.phone?.[0] && (
          <p role="alert" className="text-sm text-red-600">
            {state.fieldErrors.phone[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="neighbourhood" className="block font-medium">
          Delivery neighbourhood
        </label>

        <select
          id="neighbourhood"
          name="neighbourhood"
          required
          defaultValue=""
          className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2"
        >
          <option value="" disabled>
            Select your neighbourhood
          </option>
          <option value="Bole">Bole</option>
          <option value="Kazanchis">Kazanchis</option>
          <option value="Piassa">Piassa</option>
          <option value="Mexico">Mexico</option>
        </select>

        {state?.fieldErrors?.neighbourhood?.[0] && (
          <p role="alert" className="text-sm text-red-600">
            {state.fieldErrors.neighbourhood[0]}
          </p>
        )}
      </div>

      {state?.message && !state.success && (
        <p role="alert" className="text-sm text-red-600">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending || items.length === 0}
        className="min-h-11 rounded-md bg-gray-900 px-5 py-2 text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Submitting..." : "Place order"}
      </button>
    </form>
  );
}
