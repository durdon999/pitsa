"use server";

import { type OrderItem, readDb, writeDb } from "@/lib/db";

export async function getOrders(): Promise<OrderItem[]> {
  const db = await readDb();
  return db.orders;
}

export async function createOrder(data: {
  name: string;
  address: string;
  payment: string;
  items: OrderItem["items"];
  total: number;
}): Promise<OrderItem> {
  const db = await readDb();
  const order: OrderItem = {
    id: Date.now(),
    name: String(data.name || "Anonim"),
    address: String(data.address || ""),
    payment: String(data.payment || "Naqd"),
    items: data.items || [],
    total: Number(data.total) || 0,
    date: String(new Date().toLocaleString()),
    delivered: false,
  };
  db.orders.push(order);
  await writeDb(db);
  return order;
}

export async function updateOrder(
  id: number,
  data: Partial<OrderItem>,
): Promise<OrderItem | null> {
  const db = await readDb();
  const order = db.orders.find((item) => item.id === id);
  if (!order) {
    return null;
  }
  Object.assign(order, data);
  await writeDb(db);
  return order;
}

export async function deleteOrder(id: number): Promise<boolean> {
  const db = await readDb();
  const initialLength = db.orders.length;
  db.orders = db.orders.filter((order) => order.id !== id);
  if (db.orders.length < initialLength) {
    await writeDb(db);
    return true;
  }
  return false;
}
