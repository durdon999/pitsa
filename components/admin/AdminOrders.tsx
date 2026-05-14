"use client";

import { OrderItem  } from "@/types/order";
import AdminOrderCard from "@/components/admin/AdminOrderCard";

interface AdminOrdersProps {
  orders: OrderItem[];
  isLoading: boolean;
  onMarkDelivered: (id: number) => void;
}

export default function AdminOrders({
  orders,
  isLoading,
  onMarkDelivered,
}: AdminOrdersProps) {
  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-200 p-8 text-center text-slate-500">
        Загрузить...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 p-8 text-center text-slate-500">
        Заказов нет
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <AdminOrderCard
          key={order.id}
          order={order}
          onMarkDelivered={onMarkDelivered}
        />
      ))}
    </div>
  );
}
