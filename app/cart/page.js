"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { etb } from "@/lib/format";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce(
    (total, item) => total + item.priceETB * item.quantity,
    0,
  );

  return (
    <main className="mx-auto flex-1 w-[90%] max-w-4xl py-10">
      <h1 className="font-display text-3xl font-bold">Your Cart</h1>

      {items.length === 0 ? (
        <div className="mt-6 rounded-xl bg-white p-6 shadow-md">
          <p className="text-gray-600">Your cart is empty.</p>

          <Link
            href="/menu"
            className="touch-target mt-4 rounded-md bg-gray-900 px-5 py-2 transition-colors hover:bg-red-700"
          >
            <p className="text-white">Browse Menu</p>
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <article
                key={item.slug}
                className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg"
              >
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-lg font-semibold">
                    {item.nameEn}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {etb.format(item.priceETB)} each
                  </p>

                  <p className="mt-2 font-medium">
                    Item total: {etb.format(item.priceETB * item.quantity)}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(item.slug)}
                    disabled={item.quantity <= 1}
                    aria-label={`Decrease ${item.nameEn} quantity`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-gray-200 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    −
                  </button>

                  <span
                    className="min-w-5 text-center"
                    aria-label={`Quantity ${item.quantity}`}
                  >
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => increaseQuantity(item.slug)}
                    aria-label={`Increase ${item.nameEn} quantity`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-gray-200 transition-colors hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.slug)}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center px-3 text-sm font-medium text-red-600 hover:underline"
                >
                  Remove
                </button>
              </article>
            ))}
          </div>

          <section className="mt-8 rounded-xl bg-white p-5 shadow-md">
            <div className="flex justify-between gap-4">
              <span className="text-gray-600">Total dishes</span>
              <span>{totalItems}</span>
            </div>

            <div className="mt-3 flex justify-between gap-4 text-lg font-bold">
              <span>Subtotal</span>
              <span>{etb.format(subtotal)}</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={clearCart}
                className="min-h-11 rounded-md border border-red-500 px-4 py-2 text-red-600 transition-colors hover:bg-red-50"
              >
                Clear Cart
              </button>

              <Link
                href="/checkout"
                className="touch-target rounded-md bg-gray-900 px-5 py-2 text-white transition-colors hover:bg-red-700"
              >
                <p className="text-white">Proceed to Checkout</p>
              </Link>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
