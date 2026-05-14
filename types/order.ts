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
