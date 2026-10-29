"use client";

import { useState } from "react";

const categories = [
  "All",
  "Traditional Stews & Wat",
  "Tibs & Grills",
  "Fasting & Vegan / Tsom",
  "Beverages & Tej",
];

export default function FilterShell({ children }) {
  const [selected, setSelected] = useState("All");

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelected(category)}
            className={`min-h-11 min-w-11 rounded-full px-4 py-2 text-sm ${
              selected === category
                ? "bg-gray-900 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {children}
    </div>
  );
}
