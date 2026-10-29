"use client";

export default function DashboardError({ reset }) {
  return (
    <main className="mx-auto w-[90%] max-w-3xl py-10">
      <section role="alert" className="rounded-lg border border-red-200 p-6">
        <h1 className="text-2xl font-bold">Dashboard unavailable</h1>

        <p className="mt-2 text-gray-700">
          We couldn&apos;t load the dashboard data. Please try again.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-4 rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-700"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
