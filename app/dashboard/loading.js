
export default function DashboardLoading() {
  return (
    <main
      className="mx-auto w-[90%] max-w-6xl py-10"
      aria-busy="true"
      aria-label="Loading staff dashboard"
    >
      <div className="h-9 w-64 animate-pulse rounded bg-gray-200" />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="h-24 animate-pulse rounded-lg bg-gray-100" />
        <div className="h-24 animate-pulse rounded-lg bg-gray-100" />
      </div>

      <div className="mt-8 h-96 animate-pulse rounded-lg bg-gray-100" />

      <div className="mt-10 space-y-3">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />

        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className="h-12 animate-pulse rounded bg-gray-100"
          />
        ))}
      </div>

      <p className="sr-only">Loading dashboard data…</p>
    </main>
  );
}
