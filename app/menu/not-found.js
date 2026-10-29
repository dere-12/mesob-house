import Link from "next/link";

export default function DishNotFound() {
  return (
    <section className="mx-auto w-[90%] max-w-3xl py-16">
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-orange-700">
        Mesob House Menu
      </p>

      <h1 className="mt-3 font-display text-3xl font-bold">Dish Not Found</h1>

      <p className="mt-3 text-gray-600">
        We couldn&apos;t find that dish. It may no longer be available in the
        menu.
      </p>

      <Link
        href="/menu"
        className="touch-target mt-6 rounded-md bg-gray-900 px-5 py-3 font-semibold text-white hover:bg-gray-700"
      >
        Back to Menu
      </Link>
    </section>
  );
}
