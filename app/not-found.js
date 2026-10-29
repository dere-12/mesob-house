import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>Dish not found</h1>
      <p>We couldn&apos;t find that dish.</p>

      <Link
        href="/menu"
        className="touch-target mt-4 text-blue-600 hover:underline"
      >
        Back to Menu
      </Link>
    </main>
  );
}
