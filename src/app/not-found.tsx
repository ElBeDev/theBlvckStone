import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="es">
      <body className="flex min-h-screen items-center justify-center bg-ivory font-sans text-center">
        <div>
          <h1 className="text-3xl font-black text-petrol">404</h1>
          <p className="mt-4 text-stone">
            No encontramos la página que buscas.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-amber px-6 py-3 font-bold text-petrol hover:opacity-90"
          >
            Volver al inicio
          </Link>
        </div>
      </body>
    </html>
  );
}
