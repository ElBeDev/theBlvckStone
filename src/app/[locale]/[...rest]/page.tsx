import { notFound } from "next/navigation";

// Unknown paths under a locale land here so the locale's not-found page
// renders inside the site layout (header, footer, fonts) instead of the
// bare root fallback.
export default function CatchAllPage() {
  notFound();
}
