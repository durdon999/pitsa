"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pizza } from "@/types/pizza";

interface AdminPizzaCardProps {
  pizza: Pizza;
  onDelete: (id: number) => void;
  onEdit: (pizza: Pizza) => void;
}

export default function AdminPizzaCard({
  pizza,
  onDelete,
  onEdit,
}: AdminPizzaCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <Image
        src={pizza.imageUrl}
        alt={pizza.name}
        width={400}
        height={176}
        className="h-44 w-full object-cover"
      />
      <div className="space-y-4 p-4">
        <div>
          <h3 className="text-xl font-semibold">{pizza.name}</h3>
          <p className="mt-1 text-sm text-slate-500">
            {pizza.types.join(", ")}
          </p>
        </div>
        <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
          <span className="rounded-2xl bg-slate-50 px-3 py-2">
            цена: {pizza.price} ₽
          </span>
          <span className="rounded-2xl bg-slate-50 px-3 py-2">
            Р&apos;азмеры: {pizza.sizes.join(", ")} см
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" className="flex-1" onClick={() => onEdit(pizza)}>
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex-1"
            onClick={() => onDelete(pizza.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </article>
  );
}
