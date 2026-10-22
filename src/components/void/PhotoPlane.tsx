import Image from "next/image";

// A photo as a rear plane: full bleed, untinted, dimmed toward the void.
export function PhotoPlane({
  src,
  alt = "",
  priority = false,
  depth = 2,
  className = "",
}: {
  src: string;
  alt?: string;
  priority?: boolean;
  depth?: 1 | 2 | 3;
  className?: string;
}) {
  const opacity = depth === 1 ? "opacity-70" : depth === 2 ? "opacity-50" : "opacity-35";
  return (
    <div className={`photo-plane -z-10 ${className}`} aria-hidden={alt === "" ? "true" : undefined}>
      <Image src={src} alt={alt} fill priority={priority} sizes="100vw" className={opacity} />
    </div>
  );
}
