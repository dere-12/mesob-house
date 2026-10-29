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
      <h1 className="text-3xl font-bold">Order Status</h1>

      <p className="mt-2 text-gray-600">Tracking order: {order.id}</p>

      <OrderStatus id={id} initial={initial} />

      <MapPanel neighbourhood={order.neighbourhood} />
    </main>
  );
}
