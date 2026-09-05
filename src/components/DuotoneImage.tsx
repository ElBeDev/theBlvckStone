import Image from "next/image";

// Placeholder photography until the client provides brand assets.
// Curated Picsum IDs so each slot shows a subject that fits (infrastructure,
// energy, logistics) instead of whatever a random seed returns. The duotone
// wrapper makes them read as brand texture. Swap for real photos later.
const CURATED: Record<string, number> = {
  "blvckstone-hero-energy": 134,
  "blvckstone-solar-field": 137,
  "blvckstone-electric-truck": 84,
  "blvckstone-residencial": 164,
  "blvckstone-comercial": 43,
  "blvckstone-industrial": 101,
  "blvckstone-flotas": 155,
  "blvckstone-solar": 137,
  "blvckstone-ev": 181,
  "blvckstone-finance": 180,
  "blvckstone-team-industrial": 192,
  "post-senales-necesitas-bess": 54,
  "post-signs-you-need-bess": 54,
  "post-electromovilidad-flotas-mexico": 197,
  "post-electromobility-fleets-mexico": 197,
  "post-financiar-proyecto-energia-limpia": 60,
  "post-financing-clean-energy-project": 60,
};

export function placeholderUrl(seed: string, w: number, h: number) {
  const id = CURATED[seed];
  return id
    ? `https://picsum.photos/id/${id}/${w}/${h}`
    : `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

export function placeholderById(id: number, w: number, h: number) {
  return `https://picsum.photos/id/${id}/${w}/${h}`;
}

type Base = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

type Sized = Base & { fill?: false; width: number; height: number };
type Filled = Base & { fill: true; width?: never; height?: never };

export function DuotoneImage(props: Sized | Filled) {
  const { src, alt, className = "", priority = false, sizes } = props;

  return (
    <div className={`duotone ${props.fill ? "" : "relative"} ${className}`}>
      {props.fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={props.width}
          height={props.height}
          priority={priority}
          sizes={sizes}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
