export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="bg-petrol px-6 py-20 text-ivory">
      <div className="mx-auto max-w-4xl">
        {eyebrow && (
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-turquoise">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl font-black md:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg text-mist">{description}</p>
        )}
      </div>
    </div>
  );
}
