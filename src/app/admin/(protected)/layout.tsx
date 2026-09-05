import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { logout } from "./actions";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/productos", label: "Productos" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/testimonios", label: "Testimonios" },
  { href: "/admin/configuracion", label: "Configuración" },
];

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl">
      <aside className="w-56 shrink-0 border-r border-black/5 bg-white p-6">
        <p className="mb-8 text-lg font-black text-petrol">Admin</p>
        <nav className="space-y-3 text-sm font-bold text-carbon/75">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block hover:text-turquoise"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logout} className="mt-10">
          <button type="submit" className="text-sm font-bold text-coral">
            Cerrar sesión
          </button>
        </form>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
