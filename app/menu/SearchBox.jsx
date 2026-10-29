"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import DishList from "./DishList";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default function SearchBox({ initialData, selectedCategory = "All" }) {
  const [term, setTerm] = useState("");
  const debouncedTerm = useDebounce(term, 300);

  const key = debouncedTerm.trim()
    ? `/api/dishes?q=${encodeURIComponent(debouncedTerm.trim())}`
    : null;

  const { data, error, isValidating } = useSWR(key, fetcher, {
    fallbackData: initialData,
  });

  const dishes = Array.isArray(data) ? data : initialData;

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  return (
    <section className="space-y-4">
      <div>
        <label htmlFor="dish-search" className="mb-2 block font-medium">
          Search dishes
        </label>

        <input
          id="dish-search"
          type="search"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Search by dish name"
          className="w-full rounded-md border border-gray-200 bg-white px-3 py-2"
        />
      </div>

      {isValidating && (
        <p className="text-sm text-gray-500" role="status">
          Updating results...
        </p>
      )}

      {error && (
        <p role="alert" className="text-sm text-red-600">
          Could not refresh dishes. Showing the last available results.
        </p>
      )}

      {filteredDishes.length === 0 ? (
        <p className="rounded-lg border border-gray-200 bg-white p-5 text-gray-600">
          No dishes found for this search and category.
        </p>
      ) : (
        <DishList dishes={filteredDishes} />
      )}
    </section>
  );
}
