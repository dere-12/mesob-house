"use client";

import dynamic from "next/dynamic";
import { getDemoLocations } from "@/lib/demo-locations";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-[360px] w-full items-center justify-center rounded-xl bg-slate-100 text-sm text-slate-600 shadow-md"
      role="status"
      aria-label="Loading delivery map"
    >
      <span>Loading map...</span>
    </div>
  ),
});

export default function MapPanel({ neighbourhood }) {
  return (
    <section className="mt-8" aria-labelledby="delivery-map-heading">
      <h2
        id="delivery-map-heading"
        className="font-display text-2xl font-semibold"
      >
        Delivery Map
      </h2>

      <div className="mt-4 grid items-start gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)]">
        <div className="min-w-0">
          <DeliveryMap neighbourhood={neighbourhood} />
        </div>

        <aside
          className="rounded-xl bg-white p-5 shadow-md"
          aria-label="Delivery locations in text"
        >
          <h3 className="font-display text-lg font-semibold">
            Location Details
          </h3>

          <dl className="mt-4 space-y-4">
            <div>
              <dt className="flex items-center gap-2 font-medium">
                <span
                  aria-hidden="true"
                  className="inline-block h-3 w-3 rounded-full bg-blue-600"
                />
                Courier Location
              </dt>
            </div>

            <div>
              <dt className="flex items-center gap-2 font-medium">
                <span
                  aria-hidden="true"
                  className="inline-block h-3 w-3 rounded-full bg-rose-600"
                />
                Delivery Location
              </dt>
            </div>
          </dl>

          <p className="mt-4 rounded-lg bg-[#fff7f2] p-3 text-sm leading-6 text-amber-800">
            This is a map demonstration, not live tracking. The current order
            stores a neighbourhood, not an exact street address or courier GPS
            coordinates.
          </p>
        </aside>
      </div>
    </section>
  );
}
