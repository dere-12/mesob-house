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
      <h1 className="text-3xl font-bold">Kitchen Dashboard</h1>

      <p className="mt-2 text-gray-600">
        Staff access verified. All orders are listed below.
      </p>

      {orders.length === 0 ? (
        <p className="mt-6">No orders have been placed yet.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {orders.map((order) => (
            <article key={order.id} className="rounded-lg border p-4">
              <p>
                <span className="font-semibold">Order:</span> {order.id}
              </p>

              <p>
                <span className="font-semibold">Status:</span> {order.status}
              </p>

              <p>
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
