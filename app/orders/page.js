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
      <h1 className="text-3xl font-bold">My Orders</h1>

      <p className="mt-2 text-gray-600">Orders belonging to {user.name}.</p>

      {orders.length === 0 ? (
        <div className="mt-6">
          <p>You haven&apos;t placed any orders yet.</p>

          <Link
            href="/menu"
            className="touch-target mt-4 text-blue-600 hover:underline"
          >
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((order) => {
            const subtotal = (order.items ?? []).reduce(
              (total, item) => total + item.priceETB * item.quantity,
              0,
            );

            return (
              <article key={order.id} className="rounded-lg border p-5">
                <p>
                  <span className="font-semibold">Order ID:</span> {order.id}
                </p>

                <p className="mt-1">
                  <span className="font-semibold">Status:</span> {order.status}
                </p>

                <p className="mt-1">
                  <span className="font-semibold">Total dishes:</span>{" "}
                  {order.quantity}
                </p>

                {order.items?.length > 0 && (
                  <div className="mt-4">
                    <h2 className="font-semibold">Items</h2>

                    <ul className="mt-2 space-y-1">
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

                    <p className="mt-3 text-right font-semibold">
                      Subtotal: {etb.format(subtotal)}
                    </p>
                  </div>
                )}

                <Link
                  href={`/orders/${order.id}`}
                  className="touch-target mt-3 text-blue-600 hover:underline"
                >
                  Track order
                </Link>

                {order.status !== "CANCELLED" && (
                  <form
                    action={cancelOrder.bind(null, order.id)}
                    className="mt-3"
                  >
                    <button
                      type="submit"
                      className="min-h-11 rounded-md border border-red-500 px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Cancel order
                    </button>
                  </form>
                )}
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}