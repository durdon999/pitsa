"use client";

import { Pizza } from "@/types/pizza";
import AdminPizzaCard from "@/components/AdminPizzaCard";

interface AdminPizzaListProps {
  pizzas: Pizza[];
  isLoading: boolean;
  onDelete: (id: number) => void;
  onEdit: (pizza: Pizza) => void;
}

export default function AdminPizzaList({
  pizzas,
  isLoading,
  onDelete,
  onEdit,
}: AdminPizzaListProps) {
  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-200 p-8 text-center text-slate-500">
       “Загрузка..
      </div>
    );
  }

  if (pizzas.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 p-8 text-center text-slate-500">
       Пока товара нет
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {pizzas.map((pizza) => (
        <AdminPizzaCard
          key={pizza.id}
          pizza={pizza}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
