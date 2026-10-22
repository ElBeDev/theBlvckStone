import { CAPS, fit } from "./fit";

// A giant line riding its baseline, at a declared depth. Lines stay inside
// the container and wrap (they once ran past the edges and got clipped),
// sized so their longest word fits whole; nothing wraps them in a box.
export function Line({
  children,
  depth = 0,
  as: Tag = "p",
  size = "lg",
  className = "",
}: {
  children: string;
  depth?: 0 | 1 | 2 | 3;
  as?: "p" | "h1" | "h2" | "h3" | "li";
  size?: "xl" | "lg" | "md";
  className?: string;
}) {
  return (
    <Tag data-depth={depth} style={fit(children)} className={`v-display fit ${CAPS[size]} ${className}`}>
      {children}
    </Tag>
  );
}
