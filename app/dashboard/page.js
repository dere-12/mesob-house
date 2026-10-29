import { redirect, notFound } from "next/navigation";

import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import RevenueChart from "./RevenueChart";
import OrderTable from "@/app/orders/OrderTable";
import { etb, number } from "@/lib/format";

export const dynamic = "force-dynamic";

function getOrderTotal(order) {
  return (order.items ?? []).reduce(
    (total, item) => total + item.priceETB * item.quantity,
    0,
  );
}

function getRevenueByNeighbourhood(orders) {
  const revenueMap = new Map();

  for (const order of orders) {
    if (order.status === "CANCELLED") {
      continue;
    }

    const neighbourhood = order.neighbourhood || "Unknown";
    const orderTotal = getOrderTotal(order);

    revenueMap.set(
      neighbourhood,
      (revenueMap.get(neighbourhood) ?? 0) + orderTotal,
    );
  }

  return Array.from(revenueMap, ([neighbourhood, revenue]) => ({
    neighbourhood,
    revenue,
  }));
}

export default async function DashboardPage({ searchParams }) {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/dashboard");
  }

  if (user.role !== "staff") {
    notFound();
  }

  const orders = await db.order.findMany();

  const revenueData = getRevenueByNeighbourhood(orders);

  const totalRevenue = orders
    .filter((order) => order.status !== "CANCELLED")
    .reduce((total, order) => total + getOrderTotal(order), 0);

  const activeOrders = orders.filter(
    (order) => order.status !== "CANCELLED",
  ).length;

  const params = await searchParams;
  const page = Math.max(1, Number(params?.page) || 1);
  const sort = params?.sort === "total" ? "total" : "createdAt";
  const direction = params?.direction === "asc" ? "asc" : "desc";

  const tableOrders = orders.map((order) => ({
    ...order,
    total: getOrderTotal(order),
  }));

  tableOrders.sort((a, b) => {
    let comparison;

    if (sort === "total") {
      comparison = a.total - b.total;
    } else {
      comparison =
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }

    return direction === "asc" ? comparison : -comparison;
  });

  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(tableOrders.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const pagedOrders = tableOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <main className="mx-auto w-[90%] max-w-6xl py-10">
      <h1 className="text-3xl font-bold">Staff Dashboard</h1>

      <p className="mt-2 text-gray-600">
        Welcome, {user.name}. Here is the current order summary.
      </p>

      <section
        aria-label="Order summary"
        className="mt-6 grid gap-4 sm:grid-cols-2"
      >
        <article className="rounded-lg border p-5">
          <h2 className="text-sm text-gray-600">Total Revenue</h2>

          <p className="mt-2 text-2xl font-bold">{etb.format(totalRevenue)}</p>
        </article>

        <article className="rounded-lg border p-5">
          <h2 className="text-sm text-gray-600">Non-cancelled Orders</h2>

          <p className="mt-2 text-2xl font-bold">
            {number.format(activeOrders)}
          </p>
        </article>
      </section>

      <div className="mt-8">
        <RevenueChart data={revenueData} />
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">All Orders</h2>

        <p className="mt-1 text-sm text-gray-600">
          Sort the table using the URL options and move between pages.
        </p>

        <OrderTable
          orders={pagedOrders}
          page={currentPage}
          totalPages={totalPages}
          sort={sort}
          direction={direction}
        />
      </section>
    </main>
  );
}
