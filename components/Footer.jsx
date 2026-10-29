import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 bg-gray-900 px-5 py-6 text-white">
      <div className="mx-auto flex w-[90%] max-w-6xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <div>
          <Link href="/" className="font-display text-lg font-bold">
            Mesob House
          </Link>
          <p className="mt-1 text-sm text-gray-200">
            Ethiopian food, shared with hospitality.
          </p>
        </div>

        <p className="text-sm text-gray-200">
          © {new Date().getFullYear()} Mesob House
        </p>
      </div>
    </footer>
  );
}
