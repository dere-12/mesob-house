"use client";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function OrderStatus({ id, initial }) {
  const { data, error, isLoading, isValidating } = useSWR(
    `/api/orders/${id}`,
    fetcher,
    {
      fallbackData: initial,
      refreshInterval: 5000,
    },
  );

  if (!data && isLoading) {
    return <p>Loading order status...</p>;
  }

  if (!data && error) {
    return <p>Could not load the order status.</p>;
  }

  return (
    <section className="mt-6 rounded-lg border p-6">
      <p>
        <span className="font-semibold">Status: </span>
        {data.status}
      </p>

      <p className="mt-2 text-sm text-gray-500">Order ID: {data.id}</p>

      {/* {isValidating && (
        <p className="mt-3 text-sm text-gray-500">Checking for updates...</p>
      )} */}

      {/* {error && (
        <p className="mt-3 text-sm text-amber-700">
          Could not refresh the status. Showing the last available data.
        </p>
      )} */}
    </section>
  );
}
