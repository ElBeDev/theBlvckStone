import Image from "next/image";

// Site photography lives in public/images/site. Each slot is addressed by a
// seed so components stay decoupled from file names. The duotone wrapper
// unifies every photo as brand texture. Service photos are stored per product
// (products.image_url) and fall back to their category image.
const SITE_IMAGES: Record<string, string> = {
  "blvckstone-hero-energy": "hero",
  "blvckstone-solar-field": "bento-energia",
  "blvckstone-electric-truck": "bento-ev",
  "blvckstone-industrial-building": "bento-construccion",
  "blvckstone-residencial": "vertical-residencial",
  "blvckstone-comercial": "vertical-comercial",
  "blvckstone-industrial": "vertical-industrial",
  "blvckstone-flotas": "vertical-flotas",
  "blvckstone-solar": "cat-energia",
  "blvckstone-ev": "cat-electromovilidad",
  "blvckstone-finance": "cat-financiamiento",
  "blvckstone-construccion": "cat-construccion",
  "blvckstone-fiscal": "cat-estrategia-fiscal",
  "blvckstone-team-industrial": "nosotros",
  "post-senales-necesitas-bess": "blog-bess",
  "post-signs-you-need-bess": "blog-bess",
  "post-electromovilidad-flotas-mexico": "blog-flotas",
  "post-electromobility-fleets-mexico": "blog-flotas",
  "post-financiar-proyecto-energia-limpia": "blog-financiamiento",
  "post-financing-clean-energy-project": "blog-financiamiento",
};

export function siteImage(seed: string) {
  return `/images/site/${SITE_IMAGES[seed] ?? "cat-energia"}.jpg`;
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
