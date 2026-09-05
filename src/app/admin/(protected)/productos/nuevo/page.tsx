import { ProductForm } from "../ProductForm";
import { createProduct } from "../actions";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-black text-petrol">Nuevo producto</h1>
      <div className="mt-6">
        <ProductForm action={createProduct} submitLabel="Crear producto" />
      </div>
    </div>
  );
}
