import Link from "next/link";
import { db } from "@/db";
import { products } from "@/db/schema";
import { deleteProduct } from "./actions";

export default async function AdminProductsPage() {
  if (!db) {
    return (
      <p className="text-carbon/75">
        Base de datos no configurada. Define <code>DATABASE_URL</code> para
        activar esta sección.
      </p>
    );
  }

  const items = await db.select().from(products);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-petrol">Productos</h1>
        <Link
          href="/admin/productos/nuevo"
          className="rounded-full bg-amber px-4 py-2 text-sm font-bold text-petrol hover:opacity-90"
        >
          Nuevo producto
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {items.length === 0 && (
          <p className="text-carbon/75">Todavía no hay productos cargados.</p>
        )}
        {items.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm"
          >
            <div>
              <p className="font-bold text-carbon">
                {product.title}{" "}
                <span className="text-xs font-normal text-carbon/75">
                  /{product.locale} · {product.category}
                </span>
              </p>
              <p className="text-sm text-carbon/75">{product.slug}</p>
            </div>
            <div className="flex items-center gap-4 text-sm font-bold">
              <Link
                href={`/admin/productos/${product.id}`}
                className="text-turquoise"
              >
                Editar
              </Link>
              <form action={deleteProduct.bind(null, product.id)}>
                <button type="submit" className="text-coral">
                  Eliminar
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
