"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import useStore from "@/store/useStore";
import useCartFormStore from "@/store/cartFormStore";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/lib/orderActions";

export default function CartPage() {
  const cart = useStore((state) => state.cart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const clearCart = useStore((state) => state.clearCart);

  const name = useCartFormStore((state) => state.name);
  const address = useCartFormStore((state) => state.address);
  const payment = useCartFormStore((state) => state.payment);
  const isSubmitting = useCartFormStore((state) => state.isSubmitting);
  const setName = useCartFormStore((state) => state.setName);
  const setAddress = useCartFormStore((state) => state.setAddress);
  const setPayment = useCartFormStore((state) => state.setPayment);
  const setIsSubmitting = useCartFormStore((state) => state.setIsSubmitting);
  const resetForm = useCartFormStore((state) => state.resetForm);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  const handleOrder = async () => {
    if (!name.trim() || !address.trim()) {
      return toast.error("Iltimos ismingiz va manzilingizni kiriting");
    }

    if (cart.length === 0) {
      return toast.error("Savatcha bo'sh");
    }

    try {
      setIsSubmitting(true);
      await createOrder({
        name,
        address,
        payment,
        items: cart,
        total,
      });
      toast.success("Buyurtma qabul qilindi!");
      clearCart();
      resetForm();
    } catch {
      toast.error("Buyurtma yuborishda xatolik yuz berdi");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 text-slate-900">
      <Toaster position="top-center" />
      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-6 shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Savatcha</h1>
            <p className="text-sm text-slate-500">
              Buyurtma ma&apos;lumotlarini kiritib, savatchangizni tasdiqlang.
            </p>
          </div>
          <Link href="/">
            <Button variant="outline">Pizza sahifasiga qaytish</Button>
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-300 p-14 text-center text-slate-500">
            Savatcha bo&apos;sh. Iltimos asosiy sahifaga qaytib pitsa
            qo&apos;shing.
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.7fr_1fr]">
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex flex-col gap-4 rounded-3xl border border-slate-200 p-4 sm:flex-row sm:items-center"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={112}
                    height={112}
                    className="h-28 w-28 rounded-3xl object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-sm text-slate-500">
                      Tip: {item.types.join(", ")}
                    </p>
                    <p className="text-sm text-slate-500">
                      Hajmi: {item.size} sm
                    </p>
                    <p className="mt-2 font-semibold">Narxi: {item.price} ₽</p>
                  </div>
                  <div className="flex flex-col gap-2 rounded-3xl bg-slate-100 p-3 text-right">
                    <div className="flex items-center justify-between gap-2 text-sm text-slate-700">
                      <span>Soni:</span>
                      <span>{item.quantity}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity - 1)
                        }
                      >
                        -
                      </Button>
                      <div className="flex items-center justify-center rounded-2xl bg-white text-sm font-semibold">
                        {item.quantity}
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromCart(item.id, item.size)}
                    >
                      O&apos;chirish
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6 rounded-3xl bg-slate-100 p-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Buyurtma</h2>
                <p className="text-sm text-slate-500">
                  Ism va manzilni kiriting.
                </p>
              </div>
              <label className="block space-y-2 text-sm text-slate-700">
                Ism
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-500"
                  placeholder="Ismingiz"
                />
              </label>
              <label className="block space-y-2 text-sm text-slate-700">
                Manzil
                <input
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-500"
                  placeholder="Manzilingiz"
                />
              </label>
              <label className="block space-y-2 text-sm text-slate-700">
                To&apos;lov turi
                <select
                  value={payment}
                  onChange={(event) => setPayment(event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-500"
                >
                  <option value="Naqd">Naqd</option>
                  <option value="Karta">Karta</option>
                </select>
              </label>
              <div className="rounded-3xl bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Jami pitsa</span>
                  <span>{cart.length} ta</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xl font-semibold">
                  <span>Umumiy summa</span>
                  <span>{total} ₽</span>
                </div>
              </div>
              <Button
                onClick={handleOrder}
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Yuborilmoqda..." : "Buyurtmani tasdiqlash"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
