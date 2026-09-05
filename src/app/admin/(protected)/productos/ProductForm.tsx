const inputClasses =
  "mt-1 w-full rounded-lg border border-stone/30 px-4 py-2 focus:border-turquoise focus:outline-none";
const labelClasses = "block text-sm font-bold";

export function ProductForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: {
    slug: string;
    locale: string;
    title: string;
    description: string;
    specs: string | null;
    imageUrl: string | null;
  };
  submitLabel: string;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className={labelClasses}>
            Título
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={defaultValues?.title}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="slug" className={labelClasses}>
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            required
            defaultValue={defaultValues?.slug}
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="locale" className={labelClasses}>
          Idioma
        </label>
        <select
          id="locale"
          name="locale"
          defaultValue={defaultValues?.locale ?? "es"}
          className={inputClasses}
        >
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </div>

      <div>
        <label htmlFor="description" className={labelClasses}>
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          required
          defaultValue={defaultValues?.description}
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="specs" className={labelClasses}>
          Especificaciones técnicas
        </label>
        <textarea
          id="specs"
          name="specs"
          rows={4}
          defaultValue={defaultValues?.specs ?? ""}
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="imageFile" className={labelClasses}>
          Imagen
        </label>
        {defaultValues?.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={defaultValues.imageUrl}
            alt=""
            className="mb-2 h-24 w-24 rounded-lg object-cover"
          />
        )}
        <input
          id="imageFile"
          name="imageFile"
          type="file"
          accept="image/*"
          className={inputClasses}
        />
        <p className="mt-1 text-xs text-stone">
          Sube un archivo para reemplazar la imagen actual, o pega una URL
          abajo.
        </p>
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
          placeholder="https://..."
          defaultValue={defaultValues?.imageUrl ?? ""}
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
