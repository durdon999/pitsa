"use client";

import { Pizza } from "@/types/pizza";
import PizzaCard from "@/components/PizzaCard";

interface PizzaListProps {
  pizzas: Pizza[];
  onAddToCart: (pizza: Pizza, size: number, price: number) => void;
}

export default function PizzaList({ pizzas, onAddToCart }: PizzaListProps) {
  if (pizzas.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 p-10 text-center text-slate-500">
        Пиццы пока нет
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {pizzas.map((pizza) => (
        <PizzaCard key={pizza.id} pizza={pizza} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}
