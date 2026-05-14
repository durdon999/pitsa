"use client";

import { create } from "zustand";

interface PizzaCardState {
  selectedSizes: Record<number, number>; // pizzaId -> selectedSize
  setSelectedSize: (pizzaId: number, size: number) => void;
  getSelectedSize: (pizzaId: number, defaultSize: number) => number;
}

const usePizzaCardStore = create<PizzaCardState>((set, get) => ({
  selectedSizes: {},
  setSelectedSize: (pizzaId, size) =>
    set((state) => ({
      selectedSizes: { ...state.selectedSizes, [pizzaId]: size },
    })),
  getSelectedSize: (pizzaId, defaultSize) => {
    return get().selectedSizes[pizzaId] ?? defaultSize;
  },
}));

export default usePizzaCardStore;
