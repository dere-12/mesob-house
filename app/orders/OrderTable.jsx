import Link from "next/link";
import { etb, formatWhen } from "@/lib/format";

function SortLink({ label, field, sort, direction }) {
  const isCurrentSort = sort === field;

  const nextDirection = isCurrentSort && direction === "desc" ? "asc" : "desc";

  const arrow = isCurrentSort ? (direction === "asc" ? " ↑" : " ↓") : "";

  return (
    <Link
      href={`/dashboard?sort=${field}&direction=${nextDirection}&page=1`}
      className="touch-target px-2 underline decoration-dotted underline-offset-4 hover:text-blue-700"
    >
      {label}
      {arrow}
    </Link>
  );
}

export default function OrderTable({
  orders,
  page,
  totalPages,
  sort,
  direction,
}) {
  return (
    <div className="mt-4">
      {orders.length === 0 ? (
        <p className="rounded-lg border p-5">No orders to display yet.</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Orders with status, neighbourhood, date and total amount
              </caption>

              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Order ID
                  </th>

                  <th scope="col" className="px-4 py-3">
                    Customer
                  </th>

                  <th scope="col" className="px-4 py-3">
                    Neighbourhood
                  </th>

                  <th scope="col" className="px-4 py-3">
                    Status
                  </th>

                  <th scope="col" className="px-4 py-3">
                    <SortLink
                      label="Date"
                      field="createdAt"
                      sort={sort}
                      direction={direction}
                    />
                  </th>

                  <th scope="col" className="px-4 py-3 text-right">
                    <SortLink
                      label="Total"
                      field="total"
                      sort={sort}
                      direction={direction}
                    />
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <th scope="row" className="px-4 py-3 font-medium">
                      {order.id}
                    </th>

                    <td className="px-4 py-3">{order.name}</td>

                    <td className="px-4 py-3">
                      {order.neighbourhood || "Unknown"}
                    </td>

                    <td className="px-4 py-3">{order.status}</td>

                    <td className="whitespace-nowrap px-4 py-3">
                      {formatWhen(order.createdAt)}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      {etb.format(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <nav
            aria-label="Order table pagination"
            className="mt-4 flex items-center justify-between gap-4"
          >
            <p className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </p>

            <div className="flex gap-3">
              {page > 1 ? (
                <Link
                  href={`/dashboard?sort=${sort}&direction=${direction}&page=${page - 1}`}
                  className="touch-target rounded-md border px-4 py-2 hover:bg-gray-50"
                  rel="prev"
                >
                  Previous
                </Link>
              ) : (
                <span className="rounded-md border px-4 py-2 text-gray-400">
                  Previous
                </span>
              )}

              {page < totalPages ? (
                <Link
                  href={`/dashboard?sort=${sort}&direction=${direction}&page=${page + 1}`}
                  className="touch-target rounded-md border px-4 py-2 hover:bg-gray-50"
                  rel="next"
                >
                  Next
                </Link>
              ) : (
                <span className="rounded-md border px-4 py-2 text-gray-400">
                  Next
                </span>
              )}
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
