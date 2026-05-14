"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  name: string;
  imageUrl: string;
  size: number;
  price: number;
  quantity: number;
  types: string[];
}

interface PizzaStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, size: number, quantity: number) => void;
  removeFromCart: (id: number, size: number) => void;
  clearCart: () => void;
}

const useStore = create<PizzaStore>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item) =>
        set((state) => {
          const found = state.cart.find(
            (cartItem) =>
              cartItem.id === item.id && cartItem.size === item.size,
          );
          if (found) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === item.id && cartItem.size === item.size
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem,
              ),
            };
          }
          return { cart: [...state.cart, item] };
        }),
      updateQuantity: (id, size, quantity) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id && item.size === size
                ? { ...item, quantity: Math.max(1, quantity) }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),
      removeFromCart: (id, size) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) => !(item.id === id && item.size === size),
          ),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "pizza-cart-store",
      partialize: (state) => ({ cart: state.cart }),
    },
  ),
);

export default useStore;
