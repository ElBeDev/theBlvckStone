const inputClasses =
  "mt-1 w-full rounded-lg border border-stone/30 px-4 py-2 focus:border-turquoise focus:outline-none";
const labelClasses = "block text-sm font-bold";

export function PostForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: {
    slug: string;
    locale: string;
    title: string;
    excerpt: string | null;
    body: string;
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
        <label htmlFor="excerpt" className={labelClasses}>
          Extracto
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          defaultValue={defaultValues?.excerpt ?? ""}
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="body" className={labelClasses}>
          Cuerpo (Markdown)
        </label>
        <textarea
          id="body"
          name="body"
          rows={10}
          required
          defaultValue={defaultValues?.body}
          className={inputClasses}
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
