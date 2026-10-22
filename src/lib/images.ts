// Site photography lives in public/images/site; slots are addressed by seed
// so pages stay decoupled from file names. Service photos live per product
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
  "blvckstone-energia-limpia": "cat-energia",
  "blvckstone-electromovilidad": "cat-electromovilidad",
  "blvckstone-financiamiento": "cat-financiamiento",
  "blvckstone-estrategia-fiscal": "cat-estrategia-fiscal",
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
