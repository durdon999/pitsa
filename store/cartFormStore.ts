"use client";

import { create } from "zustand";

interface CartFormState {
  name: string;
  address: string;
  payment: string;
  isSubmitting: boolean;
  setName: (name: string) => void;
  setAddress: (address: string) => void;
  setPayment: (payment: string) => void;
  setIsSubmitting: (submitting: boolean) => void;
  resetForm: () => void;
}

const useCartFormStore = create<CartFormState>((set) => ({
  name: "",
  address: "",
  payment: "наличии",
  isSubmitting: false,
  setName: (name) => set({ name }),
  setAddress: (address) => set({ address }),
  setPayment: (payment) => set({ payment }),
  setIsSubmitting: (submitting) => set({ isSubmitting: submitting }),
  resetForm: () =>
    set({ name: "", address: "", payment: "наличии", isSubmitting: false }),
}));

export default useCartFormStore;
