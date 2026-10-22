import type { CSSProperties } from "react";

// Display sizes. Each is the cap per breakpoint from the scale table in
// docs/DISENO_V3.md; the .fit rule shrinks below the cap only when the
// line's longest word would not fit whole.
export const CAPS = {
  hero: "[--cap:2.5rem] sm:[--cap:3.75rem] md:[--cap:4.5rem] lg:[--cap:6rem]",
  page: "[--cap:2.5rem] sm:[--cap:3.75rem] md:[--cap:4.5rem] lg:[--cap:5.5rem]",
  xl: "[--cap:2.5rem] sm:[--cap:3.75rem] md:[--cap:4.5rem] lg:[--cap:6rem]",
  lg: "[--cap:2.25rem] sm:[--cap:3rem] md:[--cap:3.75rem] lg:[--cap:4.5rem]",
  md: "[--cap:1.875rem] sm:[--cap:2.25rem] md:[--cap:3rem]",
} as const;

// The letter count of the longest word, handed to .fit as --fit.
export function fit(text: string): CSSProperties {
  const longest = Math.max(...text.split(/\s+/).map((word) => word.length));
  return { "--fit": longest } as CSSProperties;
}
