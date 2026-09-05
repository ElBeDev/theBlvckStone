const inputClasses =
  "mt-1 w-full rounded-lg border border-stone/30 px-4 py-2 focus:border-turquoise focus:outline-none";
const labelClasses = "block text-sm font-bold";

export function TestimonialForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: {
    name: string;
    company: string | null;
    role: string | null;
    quote: string;
    photoUrl: string | null;
  };
  submitLabel: string;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={defaultValues?.name}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="company" className={labelClasses}>
            Empresa
          </label>
          <input
            id="company"
            name="company"
            type="text"
            defaultValue={defaultValues?.company ?? ""}
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="role" className={labelClasses}>
          Cargo
        </label>
        <input
          id="role"
          name="role"
          type="text"
          defaultValue={defaultValues?.role ?? ""}
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="quote" className={labelClasses}>
          Cita
        </label>
        <textarea
          id="quote"
          name="quote"
          rows={4}
          required
          defaultValue={defaultValues?.quote}
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="photoFile" className={labelClasses}>
          Foto
        </label>
        {defaultValues?.photoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={defaultValues.photoUrl}
            alt=""
            className="mb-2 h-20 w-20 rounded-full object-cover"
          />
        )}
        <input
          id="photoFile"
          name="photoFile"
          type="file"
          accept="image/*"
          className={inputClasses}
        />
        <p className="mt-1 text-xs text-carbon/75">
          Sube un archivo para reemplazar la foto actual, o pega una URL
          abajo.
        </p>
        <input
          id="photoUrl"
          name="photoUrl"
          type="text"
          placeholder="https://..."
          defaultValue={defaultValues?.photoUrl ?? ""}
          className={`${inputClasses} mt-2`}
        />
      </div>

      <button
        type="submit"
        className="rounded-full bg-amber px-6 py-3 font-bold text-petrol hover:opacity-90"
      >
        {submitLabel}
      </button>
    </form>
  );
}
