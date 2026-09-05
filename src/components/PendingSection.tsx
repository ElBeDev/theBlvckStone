export function PendingSection({ text }: { text: string }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center text-stone">
      <p>{text}</p>
    </div>
  );
}
