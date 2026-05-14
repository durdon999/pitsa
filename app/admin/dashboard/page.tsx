"use client";

import Link from "next/link";
import { useCallback, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import useAdminStore from "@/store/adminStore";
import AdminPizzaForm from "@/components/AdminPizzaForm";
import AdminPizzaList from "@/components/AdminPizzaList";
import { getPizzas, createPizza, deletePizza } from "@/lib/pizzaActions";

export default function AdminDashboardPage() {
  const isAdmin = useAdminStore((state) => state.isAdmin);
  const pizzas = useAdminStore((state) => state.pizzas);
  const loading = useAdminStore((state) => state.loading);
  const setPizzas = useAdminStore((state) => state.setPizzas);
  const setLoading = useAdminStore((state) => state.setLoading);

  const loadPizzas = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPizzas();
      setPizzas(data);
    } catch {
      toast.error("Pizza ma'lumotlarini yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  }, [setPizzas, setLoading]);

  useEffect(() => {
    if (isAdmin) {
      loadPizzas();
    }
  }, [isAdmin, loadPizzas]);

  const handleCreatePizza = async (data: {
    name: string;
    price: number;
    imageUrl: string;
    types: string[];
  }) => {
    setLoading(true);
    try {
      await createPizza({
        ...data,
        sizes: [26, 30, 40],
        rating: 4.4,
        sold: 0,
      });
      toast.success("Yangi pizza qo'shildi");
      await loadPizzas();
    } catch {
      toast.error("Pizza qo'shishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePizza = async (id: number) => {
    setLoading(true);
    try {
      await deletePizza(id);
      toast.success("Pizza o'chirildi");
      await loadPizzas();
    } catch {
      toast.error("Pizza o'chirishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold">Admin ruxsati yo&apos;q</h1>
        <p className="mt-2 text-slate-500">
          Iltimos admin sahifasiga kirib, keyin dashboardni oching.
        </p>
        <Link href="/admin">
          <button className="mt-6 rounded-3xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600">
            Admin sahifaga qaytish
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Toaster position="top-center" />
      <section className="rounded-3xl bg-white p-6 shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Dashboard</h2>
            <p className="text-sm text-slate-500">
              Bu yerda pizza catalogni ko&apos;rish, qo&apos;shish va
              o&apos;chirish mumkin.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-100 px-4 py-2 text-sm text-slate-600">
            {pizzas.length} ta pizza
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_0.85fr]">
        <div className="space-y-6 rounded-3xl bg-white p-6 shadow-lg">
          <AdminPizzaList
            pizzas={pizzas}
            isLoading={loading}
            onDelete={handleDeletePizza}
            onEdit={() => toast("Tahrirlash funksiyasi hali mavjud emas")}
          />
        </div>

        <AdminPizzaForm onCreate={handleCreatePizza} />
      </div>
    </div>
  );
}
