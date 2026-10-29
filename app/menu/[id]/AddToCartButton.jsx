"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";

export default function AddToCartButton({ dish }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem(dish);
    setAdded(true);
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleAddToCart}
        className="touch-target rounded-md bg-gray-900 px-5 py-3 font-semibold text-white hover:bg-gray-700"
      >
        Add to Cart
      </button>

      <p
        role="status"
        aria-live="polite"
        className="mt-2 text-sm text-gray-600"
      >
        {added ? `${dish.nameEn} added to your cart.` : ""}
      </p>
    </div>
  );
}
