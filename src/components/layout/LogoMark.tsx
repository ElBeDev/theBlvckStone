// The brand mark as the client's render shows it: an ascending outlined
// triangle in turquoise interlocked with an inverted outlined triangle in
// stone, rounded corners, soft glow, registered mark.
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`glow ${className}`} aria-hidden="true" fill="none" strokeLinejoin="round" strokeLinecap="round">
      <path
        d="M 42 10 L 68 50 L 54 50 Q 50 50 50 54 L 50 58 L 12 58 Z"
        stroke="var(--color-turquoise)"
        strokeWidth="6"
      />
      <path d="M 50 50 L 92 50 L 71 88 Z" stroke="var(--color-stone)" strokeWidth="6" />
      <circle cx="94" cy="40" r="5" stroke="var(--color-ivory)" strokeWidth="1.5" />
      <text x="94" y="42.5" textAnchor="middle" fontSize="6" fontWeight="700" fill="var(--color-ivory)" fontFamily="Arial, sans-serif">
        R
      </text>
    </svg>
  );
}
