import Link from "next/link";
import "./globals.css";

export default function RootNotFound() {
  return (
    <html lang="es">
      <body className="flex min-h-screen items-center bg-void px-6 text-ink-0">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="v-display max-w-[14ch] text-5xl md:text-7xl">Página no encontrada</h1>
          <p className="mt-8 max-w-[46ch] text-xl text-ink-1">La página que buscas no existe o cambió de lugar.</p>
          <Link href="/" className="mt-12 inline-block text-lg font-bold text-signal">
            Volver al inicio
          </Link>
        </div>
      </body>
    </html>
  );
}
