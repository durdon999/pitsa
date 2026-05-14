"use client";

import { create } from "zustand";

interface PizzaFormState {
  name: string;
  price: string;
  imageUrl: string;
  typeInput: string;
  isSubmitting: boolean;
  setName: (name: string) => void;
  setPrice: (price: string) => void;
  setImageUrl: (imageUrl: string) => void;
  setTypeInput: (typeInput: string) => void;
  setIsSubmitting: (submitting: boolean) => void;
  resetForm: () => void;
}

const usePizzaFormStore = create<PizzaFormState>((set) => ({
  name: "",
  price: "",
  imageUrl: "",
  typeInput: "Мясные",
  isSubmitting: false,
  setName: (name) => set({ name }),
  setPrice: (price) => set({ price }),
  setImageUrl: (imageUrl) => set({ imageUrl }),
  setTypeInput: (typeInput) => set({ typeInput }),
  setIsSubmitting: (submitting) => set({ isSubmitting: submitting }),
  resetForm: () =>
    set({
      name: "",
      price: "",
      imageUrl: "",
      typeInput: "Мясные",
      isSubmitting: false,
    }),
}));

export default usePizzaFormStore;
