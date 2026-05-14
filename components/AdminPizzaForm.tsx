"use client";

import { Button } from "@/components/ui/button";
import usePizzaFormStore from "@/store/pizzaFormStore";

interface AdminPizzaFormProps {
  onCreate: (data: {
    name: string;
    price: number;
    imageUrl: string;
    types: string[];
  }) => Promise<void>;
}

export default function AdminPizzaForm({ onCreate }: AdminPizzaFormProps) {
  const name = usePizzaFormStore((state) => state.name);
  const price = usePizzaFormStore((state) => state.price);
  const imageUrl = usePizzaFormStore((state) => state.imageUrl);
  const typeInput = usePizzaFormStore((state) => state.typeInput);
  const isSubmitting = usePizzaFormStore((state) => state.isSubmitting);
  const setName = usePizzaFormStore((state) => state.setName);
  const setPrice = usePizzaFormStore((state) => state.setPrice);
  const setImageUrl = usePizzaFormStore((state) => state.setImageUrl);
  const setTypeInput = usePizzaFormStore((state) => state.setTypeInput);
  const setIsSubmitting = usePizzaFormStore((state) => state.setIsSubmitting);
  const resetForm = usePizzaFormStore((state) => state.resetForm);

  const handleSubmit = async () => {
    if (!name.trim() || !price.trim() || !imageUrl.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onCreate({
        name: name.trim(),
        price: Number(price),
        imageUrl: imageUrl.trim(),
        types: [typeInput],
      });
      resetForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">
      <h2 className="text-2xl font-semibold">Добавить новую пиццу
</h2>
      <div className="mt-6 space-y-4">
        <label className="block space-y-2 text-sm text-slate-700">
          Название пиццы
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-slate-500"
            placeholder="Masalan: Сырная"
          />
        </label>
        <label className="block space-y-2 text-sm text-slate-700">
          Narxi
          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-slate-500"
            placeholder="Masalan: 420"
            type="number"
          />
        </label>
        <label className="block space-y-2 text-sm text-slate-700">
          Rasm URL
          <input
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-slate-500"
            placeholder="https://..."
          />
        </label>
        <label className="block space-y-2 text-sm text-slate-700">
          Turi
          <select
            value={typeInput}
            onChange={(event) => setTypeInput(event.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-slate-500"
          >
            <option>Мясные</option>
            <option>Вегетарианская</option>
            <option>Гриль</option>
            <option>Острые</option>
            <option>Закрытые</option>
          </select>
        </label>
        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={isSubmitting}
        >
         Добавить пиццу
        </Button>
      </div>
    </div>
  );
}
