import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { TestimonialForm } from "../TestimonialForm";
import { updateTestimonial } from "../actions";

export default async function EditTestimonialPage({
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

  const [testimonial] = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.id, Number(id)));

  if (!testimonial) notFound();

  return (
    <div>
      <h1 className="text-2xl font-black text-petrol">Editar testimonio</h1>
      <div className="mt-6">
        <TestimonialForm
          action={updateTestimonial.bind(null, testimonial.id)}
          defaultValues={testimonial}
          submitLabel="Guardar cambios"
        />
      </div>
    </div>
  );
}
