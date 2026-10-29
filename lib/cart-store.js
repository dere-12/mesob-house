import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      addItem: (dish) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.slug === dish.slug,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.slug === dish.slug
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }

          return {
            items: [...state.items, { ...dish, quantity: 1 }],
          };
        }),

      increaseQuantity: (slug) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.slug === slug
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        })),

      decreaseQuantity: (slug) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.slug === slug && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        })),

      removeItem: (slug) =>
        set((state) => ({
          items: state.items.filter((item) => item.slug !== slug),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "mesob-house-cart",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);
