"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import PizzaList from "@/components/PizzaList";
import useStore from "@/store/useStore";
import useAppStore from "@/store/appStore";
import { Pizza } from "@/types/pizza";
import { getPizzas } from "@/lib/pizzaActions";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

export default function HomePage() {
  const pizzas = useAppStore((state) => state.pizzas);
  const selectedCategory = useAppStore((state) => state.selectedCategory);
  const sortType = useAppStore((state) => state.sortType);
  const isLoading = useAppStore((state) => state.isLoading);
  const setPizzas = useAppStore((state) => state.setPizzas);
  const setSelectedCategory = useAppStore((state) => state.setSelectedCategory);
  const setSortType = useAppStore((state) => state.setSortType);
  const setIsLoading = useAppStore((state) => state.setIsLoading);

  const cart = useStore((state) => state.cart);
  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    const loadPizzas = async () => {
      setIsLoading(true);
      try {
        const data = await getPizzas();
        setPizzas(data);
      } catch {
        toast.error("Pizza ma'lumotlarini yuklab bo'lmadi");
      } finally {
        setIsLoading(false);
      }
    };

    loadPizzas();
  }, [setPizzas, setIsLoading]);

  const filteredPizzas = useMemo(() => {
    return selectedCategory === 0
      ? pizzas
      : pizzas.filter((pizza) =>
          pizza.types.includes(categories[selectedCategory]),
        );
  }, [pizzas, selectedCategory]);

  const sortedPizzas = useMemo(() => {
    const list = [...filteredPizzas];
    if (sortType === "alphabet") {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortType === "popular") {
      return list.sort((a, b) => b.sold - a.sold);
    }
    return list;
  }, [filteredPizzas, sortType]);

  const handleAddToCart = (pizza: Pizza, size: number, price: number) => {
    addToCart({
      id: pizza.id,
      name: pizza.name,
      imageUrl: pizza.imageUrl,
      size,
      price,
      quantity: 1,
      types: pizza.types,
    });
    toast.success(`${pizza.name} savatchaga qo'shildi!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <Toaster position="top-center" />
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-lg sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-600">
              Next Pizza
            </p>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">
              Заказать пиццу
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              {/* Next.js, TypeScript, Zustand, Axios, Tailwind CSS, Shadcn UI va
              React Hot Toast bilan yozilgan pizza doʻkoni. */}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <div className="rounded-3xl bg-slate-100 px-4 py-3 text-slate-700">
              корзина:{" "}
              <span className="font-semibold text-slate-900">
                {cart.length}
              </span>{" "}
              продукты
            </div>
            <Link href="/cart">
              <Button>Перейти в корзину&apos;</Button>
            </Link>
          </div>
        </header>

        <section className="grid gap-4 rounded-3xl bg-white p-6 shadow-lg">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <Button
                  key={category}
                  variant={selectedCategory === index ? "default" : "outline"}
                  onClick={() => setSelectedCategory(index)}
                >
                  {category}
                </Button>
              ))}
            </div>
            <select
              value={sortType}
              onChange={(event) => setSortType(event.target.value)}
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition hover:border-slate-300"
            >
              <option value="default">Сортировка</option>
              <option value="alphabet">По алфавиту&apos;</option>
              <option value="popular">По популярности&apos;</option>
            </select>
          </div>

          {isLoading ? (
            <div className="rounded-3xl border border-slate-200 p-10 text-center text-slate-500">
             Загрузка...
            </div>
          ) : (
            <PizzaList pizzas={sortedPizzas} onAddToCart={handleAddToCart} />
          )}
        </section>
      </div>
    </div>
  );
}
