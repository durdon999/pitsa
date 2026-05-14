"use server";

import { type PizzaItem, readDb, writeDb } from "@/lib/db";

export async function getPizzas(): Promise<PizzaItem[]> {
  const db = await readDb();
  return db.pizzas;
}

export async function createPizza(data: {
  name: string;
  price: number;
  imageUrl: string;
  types: string[];
  sizes: number[];
  rating: number;
  sold: number;
}): Promise<PizzaItem> {
  const db = await readDb();
  const pizza: PizzaItem = {
    id: Date.now(),
    name: String(data.name || "Без названия"),
    imageUrl: String(data.imageUrl || ""),
    types: data.types || ["Мясные"],
    sizes: data.sizes || [26, 30, 40],
    price: Number(data.price) || 0,
    rating: Number(data.rating) || 4.5,
    sold: Number(data.sold) || 0,
  };
  db.pizzas.push(pizza);
  await writeDb(db);
  return pizza;
}

export async function deletePizza(id: number): Promise<boolean> {
  const db = await readDb();
  const initialLength = db.pizzas.length;
  db.pizzas = db.pizzas.filter((pizza) => pizza.id !== id);
  if (db.pizzas.length < initialLength) {
    await writeDb(db);
    return true;
  }
  return false;
}

export async function updatePizza(
  id: number,
  data: Partial<PizzaItem>,
): Promise<PizzaItem | null> {
  const db = await readDb();
  const pizza = db.pizzas.find((item) => item.id === id);
  if (!pizza) {
    return null;
  }
  Object.assign(pizza, data);
  await writeDb(db);
  return pizza;
}
