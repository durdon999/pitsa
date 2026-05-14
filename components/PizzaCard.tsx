"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pizza } from "@/types/pizza";
import usePizzaCardStore from "@/store/pizzaCardStore";

interface PizzaCardProps {
  pizza: Pizza;
  onAddToCart: (pizza: Pizza, size: number, price: number) => void;
}

const calculatePrice = (basePrice: number, size: number) => {
  if (size === 30) return Math.round(basePrice * 1.2);
  if (size === 40) return Math.round(basePrice * 1.4);
  return basePrice;
};

export default function PizzaCard({ pizza, onAddToCart }: PizzaCardProps) {
  const selectedSize = usePizzaCardStore((state) =>
    state.getSelectedSize(pizza.id, pizza.sizes[0]),
  );
  const setSelectedSize = usePizzaCardStore((state) => state.setSelectedSize);

  const selectedPrice = useMemo(
    () => calculatePrice(pizza.price, selectedSize),
    [pizza.price, selectedSize],
  );

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <Image
        src={pizza.imageUrl}
        alt={pizza.name}
        width={400}
        height={256}
        className="h-64 w-full object-cover"
        loading="eager"
      />
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">{pizza.name}</h2>
            <p className="mt-2 text-sm text-slate-500">
              {pizza.types.join(", ")}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
            {selectedPrice} ₽
          </div>
        </div>
        <p className="text-sm text-slate-600">
           В прошлом месяце было продано   {pizza.sold} штук 
        </p>

        <div className="grid gap-2 sm:grid-cols-3">
          {pizza.sizes.map((size) => (
            <Button
              key={size}
              size="sm"
              variant={selectedSize === size ? "default" : "outline"}
              onClick={() => setSelectedSize(pizza.id, size)}
            >
              {size} см
            </Button>
          ))}
        </div>

        <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
          Выбранный размер:{" "}
          <span className="font-semibold">{selectedSize} см</span>
          <br />
          цена: <span className="font-semibold">{selectedPrice} ₽</span>
        </div>

        <Button
          className="w-full"
          onClick={() => onAddToCart(pizza, selectedSize, selectedPrice)}
        >
          Добавить корзину
        </Button>
      </div>
    </article>
  );
}
