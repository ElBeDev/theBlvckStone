// A giant line riding its baseline, at a declared depth. Lines may run past
// the screen edges; nothing wraps them in a box.
export function Line({
  children,
  depth = 0,
  as: Tag = "p",
  size = "lg",
  bleed = false,
  className = "",
}: {
  children: React.ReactNode;
  depth?: 0 | 1 | 2 | 3;
  as?: "p" | "h1" | "h2" | "h3" | "li";
  size?: "xl" | "lg" | "md";
  bleed?: boolean;
  className?: string;
}) {
  const sizes = {
    xl: "text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[6rem]",
    lg: "text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem]",
    md: "text-3xl sm:text-4xl md:text-5xl",
  };
  return (
    <Tag data-depth={depth} className={`v-display ${sizes[size]} ${bleed ? "bleed" : ""} ${className}`}>
      {children}
    </Tag>
  );
}
