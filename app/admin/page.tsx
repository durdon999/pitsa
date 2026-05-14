"use client";

import { FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import useAdminStore from "@/store/adminStore";

export default function AdminPage() {
  const code = useAdminStore((state) => state.code);
  const login = useAdminStore((state) => state.login);
  const isAdmin = useAdminStore((state) => state.isAdmin);
  const setCode = useAdminStore((state) => state.setCode);
  const router = useRouter();

  useEffect(() => {
    if (isAdmin) {
      router.push("/admin/dashboard");
    }
  }, [isAdmin, router]);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (login(code)) {
      toast.success("✅ Admin panelga kirdingiz");
      setCode("");
      return;
    }
    toast.error("Kodni tekshiring");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 text-slate-900">
      <Toaster position="top-center" />
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-semibold">Admin kirish</h1>
        <p className="mt-2 text-slate-500">
          Admin panelga kirish uchun kodni kiriting.
        </p>
        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <input
            type="password"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Admin kodi"
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-slate-500"
          />
          <Button type="submit" className="w-full">
            Kirish
          </Button>
        </form>
      </div>
    </div>
  );
}
