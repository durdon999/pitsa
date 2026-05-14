"use client";

import { create } from "zustand";
import { Pizza } from "@/types/pizza";

interface AppState {
  pizzas: Pizza[];
  selectedCategory: number;
  sortType: string;
  isLoading: boolean;
  setPizzas: (pizzas: Pizza[]) => void;
  setSelectedCategory: (category: number) => void;
  setSortType: (sortType: string) => void;
  setIsLoading: (loading: boolean) => void;
}

const useAppStore = create<AppState>((set) => ({
  pizzas: [],
  selectedCategory: 0,
  sortType: "default",
  isLoading: false,
  setPizzas: (pizzas) => set({ pizzas }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSortType: (sortType) => set({ sortType }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));

export default useAppStore;