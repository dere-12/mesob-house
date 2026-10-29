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

export default function SearchBox({ initialData }) {
  const [term, setTerm] = useState("");
  const debouncedTerm = useDebounce(term, 300);

  const key = debouncedTerm.trim()
    ? `/api/dishes?q=${encodeURIComponent(debouncedTerm.trim())}`
    : null;

  const { data, error, isValidating } = useSWR(key, fetcher, {
    fallbackData: initialData,
    keepPreviousData: true,
  });

  const dishes = data ?? initialData;

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
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      {isValidating && (
        <p className="text-sm text-gray-500">Updating results...</p>
      )}

      {error && (
        <p role="alert" className="text-sm text-red-600">
          Could not refresh dishes. Please try again.
        </p>
      )}

      {dishes.length === 0 ? (
        <p>No dishes found.</p>
      ) : (
        <DishList dishes={dishes} />
      )}
    </section>
  );
}
