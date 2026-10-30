import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { getOrder } from "@/lib/db";
import { getSession } from "@/lib/session";
import OrderStatus from "./OrderStatus";
import MapPanel from "./MapPanel";

export const dynamic = "force-dynamic";

export default async function OrderPage({ params }) {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/orders");
  }

  const { id } = await params;
  const order = await getOrder(id);

  if (!order || order.userId !== user.id) {
    notFound();
  }

  const initial = {
    id: order.id,
    status: order.status,
  };

  return (
    <main className="mx-auto w-[90%] max-w-3xl py-10">
      <Link
        href="/orders"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#8e210c] shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a87610]"
      >
        <span aria-hidden="true">←</span>
        Back to Orders
      </Link>

      <h1 className="mt-6 font-display text-3xl font-bold">Order Status</h1>

      <p className="mt-2 text-gray-600">Tracking order: {order.id}</p>

      <OrderStatus id={id} initial={initial} />

      <MapPanel neighbourhood={order.neighbourhood} />
    </main>
  );
}
