import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-[90%] max-w-3xl py-16">
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-orange-700">
        Mesob House
      </p>

      <h1 className="mt-3 font-display text-3xl font-bold">Page Not Found</h1>

      <p className="mt-3 text-gray-600">
        We couldn&apos;t find the page you were looking for.
      </p>

      <Link
        href="/"
        className="touch-target mt-6 rounded-md bg-gray-900 px-5 py-3 font-semibold text-white hover:bg-gray-700"
      >
        Return Home
      </Link>
    </main>
  );
}
