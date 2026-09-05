// Built to the brand brief's description (ascending outline triangle in
// turquoise interlocked with an inverted filled triangle in stone, rounded
// corners). Replace with the official logo file when the client provides it.
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      fill="none"
      strokeLinejoin="round"
    >
      <path
        d="M14 34 L26 12 L38 34 Z"
        fill="var(--color-stone)"
        opacity="0.9"
      />
      <path
        d="M2 30 L14 8 L26 30 Z"
        stroke="var(--color-turquoise)"
        strokeWidth="3"
      />
    </svg>
  );
}
