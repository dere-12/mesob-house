"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/cart-store";

export function Providers({ children }) {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return children;
}
