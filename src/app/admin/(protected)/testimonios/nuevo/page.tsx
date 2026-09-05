import { TestimonialForm } from "../TestimonialForm";
import { createTestimonial } from "../actions";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="text-2xl font-black text-petrol">Nuevo testimonio</h1>
      <div className="mt-6">
        <TestimonialForm
          action={createTestimonial}
          submitLabel="Crear testimonio"
        />
      </div>
    </div>
  );
}
