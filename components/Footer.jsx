import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-[#edd8ce] bg-[#fff0e9] py-6 text-[#30211d]">
      <div className="mx-auto flex w-[90%] max-w-6xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <div>
          <Link
            href="/"
            className="font-display text-lg font-bold text-[#8e210c]"
          >
            Mesob House
          </Link>

          <p className="mt-1 text-sm text-[#735d54]">
            Ethiopian food, shared with hospitality.
          </p>
        </div>

        <p className="text-sm text-[#735d54]">
          © {new Date().getFullYear()} Mesob House
        </p>
      </div>
    </footer>
  );
}
