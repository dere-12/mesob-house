"use client";

import { cloneElement, isValidElement, useState } from "react";

const categories = [
  "All",
  "Traditional Stews & Wat",
  "Tibs & Grills",
  "Raw & Cured Delicacies / Kitfo",
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
            type="button"
            aria-pressed={selected === category}
            onClick={() => setSelected(category)}
            className={`min-h-11 min-w-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              selected === category
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {isValidElement(children)
        ? cloneElement(children, { selectedCategory: selected })
        : children}
    </div>
  );
}
