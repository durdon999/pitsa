"use client";

import { create } from "zustand";
import { Pizza } from "@/types/pizza";
import { OrderItem } from "@/lib/db";

interface AdminState {
  isAdmin: boolean;
  code: string;
  pizzas: Pizza[];
  orders: OrderItem[];
  loading: boolean;
  login: (code: string) => boolean;
  logout: () => void;
  setCode: (code: string) => void;
  setPizzas: (pizzas: Pizza[]) => void;
  setOrders: (orders: OrderItem[]) => void;
  setLoading: (loading: boolean) => void;
}

const useAdminStore = create<AdminState>((set) => ({
  isAdmin: false,
  code: "admin123",
  pizzas: [],
  orders: [],
  loading: false,
  login: (code) => {
    if (code === "admin123") {
      set({ isAdmin: true });
      return true;
    }
    return false;
  },
  logout: () => set({ isAdmin: false }),
  setCode: (code) => set({ code }),
  setPizzas: (pizzas) => set({ pizzas }),
  setOrders: (orders) => set({ orders }),
  setLoading: (loading) => set({ loading }),
}));

export default useAdminStore;
