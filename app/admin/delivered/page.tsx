"use client";

import Link from "next/link";
import { useCallback, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import useAdminStore from "@/store/adminStore";
import AdminOrders from "@/components/admin/AdminOrders";
import { getOrders } from "@/lib/orderActions";

export default function AdminDeliveredPage() {
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

  const deliveredOrders = orders.filter((order) => order.delivered);

  if (!isAdmin) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold">Admin ruxsati yo&apos;q</h1>
        <p className="mt-2 text-slate-500">
          Iltimos admin sahifasiga kirib, yetkazilgan buyurtmalarni
          ko&apos;ring.
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
            <h2 className="text-2xl font-semibold">Yetkazilgan buyurtmalar</h2>
            <p className="text-sm text-slate-500">
              Bu yerda yetkazilgan buyurtmalarning ro&apos;yxatini
              ko&apos;rishingiz mumkin.
            </p>
          </div>
          <div className="rounded-3xl bg-green-100 px-4 py-2 text-sm text-green-700">
            {deliveredOrders.length} ta yetkazilgan
          </div>
        </div>
      </section>

      {deliveredOrders.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 p-8 text-center text-slate-500">
          Hozircha yetkazilgan buyurtmalar yo&apos;q.
        </div>
      ) : (
        <AdminOrders
          orders={deliveredOrders}
          isLoading={loading}
          onMarkDelivered={() => {}}
        />
      )}
    </div>
  );
}
