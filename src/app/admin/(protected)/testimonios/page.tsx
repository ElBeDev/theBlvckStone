import Link from "next/link";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { deleteTestimonial } from "./actions";

export default async function AdminTestimonialsPage() {
  if (!db) {
    return (
      <p className="text-stone">
        Base de datos no configurada. Define <code>DATABASE_URL</code> para
        activar esta sección.
      </p>
    );
  }

  const items = await db.select().from(testimonials);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-petrol">Testimonios</h1>
        <Link
          href="/admin/testimonios/nuevo"
          className="rounded-full bg-amber px-4 py-2 text-sm font-bold text-petrol hover:opacity-90"
        >
          Nuevo testimonio
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {items.length === 0 && (
          <p className="text-stone">Todavía no hay testimonios cargados.</p>
        )}
        {items.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm"
          >
            <div>
              <p className="font-bold text-carbon">{testimonial.name}</p>
              <p className="text-sm text-stone">
                {[testimonial.role, testimonial.company]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm font-bold">
              <Link
                href={`/admin/testimonios/${testimonial.id}`}
                className="text-turquoise"
              >
                Editar
              </Link>
              <form action={deleteTestimonial.bind(null, testimonial.id)}>
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
