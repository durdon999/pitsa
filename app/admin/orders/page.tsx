"use client";

import Link from "next/link";
import { useCallback, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import useAdminStore from "@/store/adminStore";
import AdminOrders from "@/components/admin/AdminOrders";
import { getOrders, updateOrder } from "@/lib/orderActions";

export default function AdminOrdersPage() {
  const isAdmin = useAdminStore((state) => state.isAdmin);
  const orders = useAdminStore((state) => state.orders);
  const loading = useAdminStore((state) => state.loading);
  const setOrders = useAdminStore((state) => state.setOrders);
  const setLoading = useAdminStore((state) => state.setLoading);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch {
      toast.error("Buyurtmalarni yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  }, [setOrders, setLoading]);

  useEffect(() => {
    if (isAdmin) {
      loadOrders();
    }
  }, [isAdmin, loadOrders]);

  const pendingOrders = orders.filter((order) => !order.delivered);

  const handleMarkDelivered = async (id: number) => {
    setLoading(true);
    const order = orders.find((item) => item.id === id);
    if (!order) {
      toast.error("Buyurtma topilmadi");
      setLoading(false);
      return;
    }

    try {
      await updateOrder(id, {
        ...order,
        delivered: true,
      });
      toast.success("Buyurtma yetkazildi deb belgilandi");
      await loadOrders();
    } catch {
      toast.error("Buyurtmalar holatini yangilashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold">Admin ruxsati yo&apos;q</h1>
        <p className="mt-2 text-slate-500">
          Iltimos admin sahifasiga kirib, buyurtmalarni ko&apos;ring.
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
            <h2 className="text-2xl font-semibold">Buyurtmalar</h2>
            <p className="text-sm text-slate-500">
              Bu yerda kutayotgan buyurtmalarni ko&apos;rish va yetkazilgan deb
              belgilash mumkin.
            </p>
          </div>
          <div className="rounded-3xl bg-orange-100 px-4 py-2 text-sm text-orange-700">
            {pendingOrders.length} ta kutayotgan
          </div>
        </div>
      </section>

      <AdminOrders
        orders={pendingOrders}
        isLoading={loading}
        onMarkDelivered={handleMarkDelivered}
      />
    </div>
  );
}
