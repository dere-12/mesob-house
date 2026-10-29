export default function MenuLayout({ children }) {
  return (
    <main className="mx-auto w-[90%] max-w-6xl flex-1 py-8">
      <section className="min-w-0">{children}</section>
    </main>
  );
}
