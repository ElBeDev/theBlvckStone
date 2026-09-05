import { Link } from "@/i18n/navigation";

export default function LocaleNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-28 text-center">
      <h1 className="text-3xl font-black text-petrol md:text-4xl">404</h1>
      <p className="mt-4 text-lg text-stone">
        No encontramos la página que buscas.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-amber px-6 py-3 font-bold text-petrol hover:opacity-90 transition-opacity"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
