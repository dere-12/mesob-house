const categories = [
  "Traditional Stews & Wat",
  "Tibs & Grills",
  "Raw & Cured Delicacies / Kitfo",
  "Fasting & Vegan / Tsom",
  "Beverages & Tej",
];

export default function MenuLayout({ children }) {
  return (
    <main className="mx-auto grid w-[90%] max-w-6xl grid-cols-1 gap-8 py-8 md:grid-cols-[220px_1fr]">
      <aside className="border-b border-gray-200 pb-5 md:border-b-0 md:border-r md:pb-0 md:pr-6">
        <h2 className="mb-4 font-display text-lg font-bold">Categories</h2>

        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category} className="text-sm text-gray-600">
              {category}
            </li>
          ))}
        </ul>
      </aside>

      <section className="min-w-0">{children}</section>
    </main>
  );
}
