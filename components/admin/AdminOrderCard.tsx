"use client";

import { Button } from "@/components/ui/button";
import { OrderItem } from "@/types/order";

interface AdminOrderCardProps {
  order: OrderItem;
  onMarkDelivered: (id: number) => void;
}

export default function AdminOrderCard({
  order,
  onMarkDelivered,
}: AdminOrderCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold">{order.name}</h3>
          <p className="text-sm text-slate-500">{order.address}</p>
        </div>
        <div className="space-y-2 text-right text-sm text-slate-500">
          <div>{order.payment}</div>
          <div>{order.date}</div>
          <div>{order.delivered ? "Yetkazilgan" : "Qabul qilingan"}</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
        {order.items.map((item) => (
          <span
            key={`${item.id}-${item.size}`}
            className="rounded-full bg-slate-100 px-3 py-1"
          >
            {item.name} ({item.size} см) x{item.quantity}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-base font-semibold">Общая сумма: {order.total} ₽</div>
        {!order.delivered && (
          <Button variant="secondary" onClick={() => onMarkDelivered(order.id)}>
            “Отметить как доставлено”

          </Button>
        )}
      </div>
    </article>
  );
}
