import Link from "next/link";
import "./globals.css";

export default function RootNotFound() {
  return (
    <html lang="es">
      <body className="flex min-h-screen items-center bg-petrol px-6 font-sans text-ink">
        <div className="mx-auto w-full max-w-3xl">
          <h1 className="t-display text-4xl font-black md:text-6xl">Página no encontrada</h1>
          <p className="t-cond mt-5 text-[11px] text-ink-3">404</p>
          <p className="mt-6 max-w-[52ch] text-lg text-ink-2">La página que buscas no existe o cambió de lugar.</p>
          <Link href="/" className="t-cond mt-10 inline-flex border border-rule-strong px-5 py-3 text-[11px] font-bold hover:border-pen hover:text-pen">
            Volver al catálogo
          </Link>
        </div>
      </body>
    </html>
  );
}
