type Product = {
  id: number;
  slug: string;
  title: string;
  description: string;
  specs: string | null;
  imageUrl: string | null;
};

export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="overflow-hidden rounded-2xl border border-mist bg-white shadow-sm"
        >
          {item.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-48 w-full object-cover"
            />
          )}
          <div className="p-6">
            <h3 className="text-lg font-bold text-carbon">{item.title}</h3>
            <p className="mt-2 text-sm text-stone">{item.description}</p>
            {item.specs && (
              <p className="mt-3 whitespace-pre-line text-xs text-stone/80">
                {item.specs}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
