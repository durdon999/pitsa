import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-lg sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-600">
              Admin panel
            </p>
            <h1 className="mt-2 text-3xl font-semibold">Next Pizza Admin</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/dashboard">
              <Button size="sm" variant="outline">
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/orders">
              <Button size="sm" variant="outline">
                Buyurtmalar
              </Button>
            </Link>
            <Link href="/admin/delivered">
              <Button size="sm" variant="outline">
                Yetkazilganlar
              </Button>
            </Link>
            <Link href="/">
              <Button size="sm" variant="ghost">
                Bosh sahifa
              </Button>
            </Link>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
