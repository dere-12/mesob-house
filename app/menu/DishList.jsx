"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { getDishImage } from "@/lib/dish-images";
import { etb } from "@/lib/format";

export default function DishList({ dishes }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {dishes.map((dish) => (
        <article
          key={dish.slug}
          className="rounded-lg border bg-white p-5 shadow-sm"
        >
          <div className="mb-4 overflow-hidden rounded-lg">
            <Image
              src={getDishImage(dish)}
              alt={`${dish.nameEn} served as Ethiopian food`}
              width={400}
              height={300}
              sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 30vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          <div className="mb-3 flex items-start justify-between gap-3">
            <h2 className="text-lg font-bold">{dish.nameEn}</h2>

            {dish.isSpecial && (
              <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-700">
                Special
              </span>
            )}
          </div>

          <p className="mb-2 text-sm text-gray-500">{dish.nameAm}</p>

          <p className="mb-3 text-sm text-gray-600">{dish.description}</p>

          <div className="mb-4 flex items-center justify-between">
            <span className="font-bold">{etb.format(dish.priceETB)}</span>

            <span className="text-xs text-gray-500">{dish.category}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href={`/menu/${dish.slug}`}
              className="touch-target rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-100"
            >
              View detail
            </Link>

            <button
              type="button"
              onClick={() => addItem(dish)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
            >
              Add to Cart
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
