import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getOrdersFor } from "@/lib/db";
import { cancelOrder } from "@/app/actions";
import { etb } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/orders");
  }

  const orders = await getOrdersFor(user.id);

  return (
    <main className="mx-auto w-[90%] max-w-3xl py-10">
      <h1 className="font-display text-3xl font-bold">My Orders</h1>

      <p className="mt-2 text-gray-600">Orders belonging to {user.name}.</p>

      {orders.length === 0 ? (
        <div className="mt-6 rounded-xl bg-white p-6 shadow-md">
          <p className="text-gray-600">
            You haven&apos;t placed any orders yet.
          </p>

          <Link
            href="/checkout"
            className="touch-target mt-4 rounded-md bg-gray-900 px-5 py-2 transition-colors hover:bg-red-700"
          >
            <p className="text-white">Back to Checkout</p>
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          {orders.map((order) => {
            const subtotal = (order.items ?? []).reduce(
              (total, item) => total + item.priceETB * item.quantity,
              0,
            );

            const isCancelled = order.status === "CANCELLED";

            return (
              <article
                key={order.id}
                className="rounded-xl bg-white p-5 shadow-md transition-shadow duration-200 hover:shadow-lg sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="break-all">
                      <span className="font-semibold">Order ID:</span>{" "}
                      {order.id}
                    </p>

                    <p className="mt-2">
                      <span className="font-semibold">Status:</span>{" "}
                      <span
                        className={
                          isCancelled
                            ? "font-semibold text-red-600"
                            : "font-semibold text-gray-800"
                        }
                      >
                        {order.status}
                      </span>
                    </p>

                    <p className="mt-1">
                      <span className="font-semibold">Total dishes:</span>{" "}
                      {order.quantity}
                    </p>
                  </div>
                </div>

                {order.items?.length > 0 && (
                  <div className="mt-5 rounded-lg bg-[#fffaf6] p-4">
                    <h2 className="font-semibold">Items</h2>

                    <ul className="mt-3 space-y-2">
                      {order.items.map((item) => (
                        <li
                          key={item.slug}
                          className="flex justify-between gap-4 text-sm"
                        >
                          <span>
                            {item.nameEn} × {item.quantity}
                          </span>

                          <span className="whitespace-nowrap">
                            {etb.format(item.priceETB * item.quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-4 text-right font-semibold">
                      Subtotal: {etb.format(subtotal)}
                    </p>
                  </div>
                )}

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div>
                    {!isCancelled ? (
                      <form action={cancelOrder.bind(null, order.id)}>
                        <button
                          type="submit"
                          className="inline-flex min-h-11 items-center justify-center rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50"
                        >
                          Cancel order
                        </button>
                      </form>
                    ) : (
                      <span className="text-sm text-gray-500">
                        This order has been cancelled.
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/orders/${order.id}`}
                    className="ml-auto inline-flex min-h-11 items-center justify-center rounded-md bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-100"
                  >
                    Track order →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
