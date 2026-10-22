import Link from "next/link";
import "./globals.css";

export default function RootNotFound() {
  return (
    <html lang="es">
      <body className="flex min-h-screen items-center justify-center bg-ivory px-5 text-center font-sans">
        <div className="max-w-md">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal">404</p>
          <h1 className="mt-4 text-3xl font-black tracking-tighter text-petrol">
            Página no encontrada
          </h1>
          <p className="mt-4 text-carbon/75">
            La página que buscas no existe o cambió de lugar.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-amber px-6 py-3 font-bold text-petrol"
          >
            Volver al inicio
          </Link>
        </div>
      </body>
    </html>
  );
}
