import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema";
import { ProductForm } from "../ProductForm";
import { updateProduct } from "../actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!db) {
    return (
      <p className="text-carbon/75">
        Base de datos no configurada. Define <code>DATABASE_URL</code> para
        activar esta sección.
      </p>
    );
  }

  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, Number(id)));

  if (!product) notFound();

  return (
    <div>
      <h1 className="text-2xl font-black text-petrol">Editar producto</h1>
      <div className="mt-6">
        <ProductForm
          action={updateProduct.bind(null, product.id)}
          defaultValues={product}
          submitLabel="Guardar cambios"
        />
      </div>
    </div>
  );
}
