import { PhotoPlane } from "./PhotoPlane";

// Every interior page opens the same way: one giant line, one paragraph,
// and when the page has a subject, its photo as the rear plane.
export function PageTitle({
  title,
  text,
  image,
  children,
}: {
  title: string;
  text?: string;
  image?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate">
      {image && <PhotoPlane src={image} depth={3} priority />}
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
        <h1 data-depth={0} className="v-display max-w-[16ch] text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          {title}
        </h1>
        {text && (
          <p className="v-body mt-8 max-w-[46ch] text-xl leading-snug text-ink-1 md:text-2xl">{text}</p>
        )}
        {children}
      </div>
    </section>
  );
}
