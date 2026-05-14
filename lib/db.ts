import fs from "fs/promises";
import path from "path";

export interface PizzaItem {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  sizes: number[];
  price: number;
  rating: number;
  sold: number;
}

export interface OrderItem {
  id: number;
  name: string;
  address: string;
  payment: string;
  items: {
    id: number;
    name: string;
    size: number;
    price: number;
    quantity: number;
    types: string[];
  }[];
  total: number;
  date: string;
  delivered?: boolean;
}

export interface DbSchema {
  pizzas: PizzaItem[];
  orders: OrderItem[];
}

const dbPath = path.join(process.cwd(), "db.json");

export async function readDb() {
  const raw = await fs.readFile(dbPath, "utf8");
  return JSON.parse(raw) as DbSchema;
}

export async function writeDb(data: DbSchema) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf8");
}
