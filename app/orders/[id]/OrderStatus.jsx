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
    return (
      <section className="mt-6 rounded-xl bg-white p-6 shadow-md" role="status">
        <p className="text-sm text-gray-600">Loading order status...</p>
      </section>
    );
  }

  if (!data && error) {
    return (
      <section className="mt-6 rounded-xl bg-white p-6 shadow-md" role="alert">
        <h2 className="font-display text-xl font-semibold">
          Unable to load order status
        </h2>
        <p className="mt-2 text-sm text-gray-600">Please try again shortly.</p>
      </section>
    );
  }

  return (
    <section
      className="mt-6 rounded-xl bg-white p-6 shadow-md"
      aria-label="Current order status"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p>
          <span className="font-semibold">Status: </span>
          <span className="font-semibold text-[#8e210c]">{data.status}</span>
        </p>

        {isValidating && (
          <span
            className="text-xs text-gray-500"
            role="status"
            aria-live="polite"
          >
            Updating...
          </span>
        )}
      </div>

      <p className="mt-3 text-sm text-gray-500">Order ID: {data.id}</p>
    </section>
  );
}
