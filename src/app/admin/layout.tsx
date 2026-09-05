import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin — The Blvck Stone",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full bg-mist font-sans text-carbon">
        {children}
      </body>
    </html>
  );
}
