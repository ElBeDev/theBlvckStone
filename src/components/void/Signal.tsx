import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Link } from "@/i18n/navigation";

// The one signal on the page: amber, square, large.
export function Signal({
  href = "/contacto",
  label,
  size = "lg",
}: {
  href?: string;
  label: string;
  size?: "lg" | "md";
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-3 bg-signal font-bold text-void transition-transform hover:-translate-y-0.5 active:translate-y-0 ${
        size === "lg" ? "px-8 py-5 text-lg md:text-xl" : "px-6 py-3.5 text-base"
      }`}
    >
      {label}
      <ArrowRight size={size === "lg" ? 24 : 18} weight="bold" />
    </Link>
  );
}
