// Section opener on the catalog's rule grid: title on the left, an optional
// note on the right margin. No kicker above and no running number.
export function SectionHead({
  title,
  note,
  as: Tag = "h2",
}: {
  title: string;
  note?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="rule-t flex flex-col gap-2 pt-4 pb-6 md:flex-row md:items-baseline md:justify-between md:gap-8">
      <Tag className="t-wide text-2xl font-black text-ink md:text-3xl">{title}</Tag>
      {note && <p className="t-cond text-[11px] text-ink-3">{note}</p>}
    </div>
  );
}
