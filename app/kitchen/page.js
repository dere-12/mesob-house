import { notFound, redirect } from "next/navigation";

import { getSession } from "@/lib/session";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function KitchenPage() {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/kitchen");
  }

  if (user.role !== "staff") {
    notFound();
  }

  const orders = await db.order.findMany();

  return (
    <main className="mx-auto w-[90%] max-w-4xl py-10">
      <h1 className="font-display text-3xl font-bold">Kitchen Dashboard</h1>

      <p className="mt-2 text-gray-600">
        Staff access verified. All orders are listed below.
      </p>

      {orders.length === 0 ? (
        <div className="mt-6 rounded-xl bg-white p-5 shadow-md">
          <p className="text-gray-600">No orders have been placed yet.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-xl bg-white p-5 shadow-md transition-shadow duration-200 hover:shadow-lg"
            >
              <p>
                <span className="font-semibold">Order:</span> {order.id}
              </p>

              <p className="mt-2">
                <span className="font-semibold">Status:</span> {order.status}
              </p>

              <p className="mt-2">
                <span className="font-semibold">Quantity:</span>{" "}
                {order.quantity}
              </p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
