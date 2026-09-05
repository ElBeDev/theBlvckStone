// Carga contenido de demostración (inventado, no son clientes reales) para
// poder mostrar el sitio con datos en vez de estados "pendiente". Reemplazar
// por contenido real antes del lanzamiento público, sobre todo testimonios.
// Idempotente: se puede volver a correr sin duplicar filas.
import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL no está definida.");
  process.exit(1);
}

const sql = postgres(DATABASE_URL, { prepare: false });

const products = [
  // Energía limpia
  {
    slug: "auxsol-bess-100",
    locale: "es",
    category: "energia-limpia",
    title: "AUXSOL BESS 100, almacenamiento comercial",
    description:
      "Sistema de almacenamiento de energía de 100 kWh para comercios e industria ligera. Integra baterías LFP de alta densidad con gestión inteligente de carga y descarga.",
    specs:
      "Capacidad: 100 kWh\nQuímica: LFP (Litio-Ferrofosfato)\nCiclos de vida: más de 6,000 al 80% DoD\nProtección: IP65\nCertificaciones: UL 9540, IEC 62619\nGarantía: 10 años",
  },
  {
    slug: "auxsol-bess-100",
    locale: "en",
    category: "energia-limpia",
    title: "AUXSOL BESS 100, commercial energy storage",
    description:
      "100 kWh energy storage system for commercial and light-industrial use. Combines high-density LFP batteries with smart charge and discharge management.",
    specs:
      "Capacity: 100 kWh\nChemistry: LFP (Lithium Iron Phosphate)\nCycle life: over 6,000 at 80% DoD\nProtection: IP65\nCertifications: UL 9540, IEC 62619\nWarranty: 10 years",
  },
  {
    slug: "auxsol-inverter-350kw",
    locale: "es",
    category: "energia-limpia",
    title: "AUXSOL Inversor Utility-Scale 350 kW",
    description:
      "Inversor de alta eficiencia para proyectos solares utility-scale y grandes instalaciones industriales, con monitoreo remoto y comisionamiento asistido.",
    specs:
      "Potencia nominal: 350 kW\nEficiencia máxima: 99.02%\nEntradas MPPT: 12\nCertificaciones: IEC 62109, ANSI C62.41\nGarantía: 10 años, extensible a 15",
  },
  {
    slug: "auxsol-inverter-350kw",
    locale: "en",
    category: "energia-limpia",
    title: "AUXSOL Utility-Scale Inverter 350 kW",
    description:
      "High-efficiency inverter for utility-scale solar projects and large industrial installations, with remote monitoring and assisted commissioning.",
    specs:
      "Rated power: 350 kW\nPeak efficiency: 99.02%\nMPPT inputs: 12\nCertifications: IEC 62109, ANSI C62.41\nWarranty: 10 years, extendable to 15",
  },
  {
    slug: "auxsol-panel-550w",
    locale: "es",
    category: "energia-limpia",
    title: "Panel Solar AUXSOL Mono PERC 550 W",
    description:
      "Panel monocristalino de alta eficiencia para instalaciones residenciales y comerciales, con marco reforzado para resistir condiciones climáticas extremas.",
    specs:
      "Potencia: 550 W\nEficiencia: 21.3%\nCélulas: Monocristalinas PERC (144)\nGarantía de producto: 12 años\nGarantía de rendimiento: 25 años (lineal)",
  },
  {
    slug: "auxsol-panel-550w",
    locale: "en",
    category: "energia-limpia",
    title: "AUXSOL Mono PERC 550 W Solar Panel",
    description:
      "High-efficiency monocrystalline panel for residential and commercial installations, with a reinforced frame built for extreme weather.",
    specs:
      "Power: 550 W\nEfficiency: 21.3%\nCells: Monocrystalline PERC (144)\nProduct warranty: 12 years\nPerformance warranty: 25 years (linear)",
  },
  // Electromovilidad
  {
    slug: "bedrock-et5-pickup",
    locale: "es",
    category: "electromovilidad",
    title: "Camioneta Eléctrica Bedrock ET5",
    description:
      "Pickup 100% eléctrica de trabajo pesado, diseñada para flotas comerciales que buscan reducir costos operativos sin sacrificar capacidad de carga.",
    specs:
      "Autonomía: 320 km (WLTP)\nCapacidad de carga: 1.2 toneladas\nCarga rápida DC: 20 a 80% en 35 min\nGarantía de batería: 8 años o 200,000 km",
  },
  {
    slug: "bedrock-et5-pickup",
    locale: "en",
    category: "electromovilidad",
    title: "Bedrock ET5 Electric Pickup",
    description:
      "Heavy-duty 100% electric pickup built for commercial fleets looking to cut operating costs without sacrificing payload.",
    specs:
      "Range: 320 km (WLTP)\nPayload: 1.2 tonnes\nDC fast charging: 20 to 80% in 35 min\nBattery warranty: 8 years or 200,000 km",
  },
  {
    slug: "bedrock-van7-cargo",
    locale: "es",
    category: "electromovilidad",
    title: "Van de Carga Eléctrica Bedrock Van 7",
    description:
      "Van de carga eléctrica ideal para logística de última milla y distribución urbana, con bajo costo de operación y cero emisiones.",
    specs:
      "Autonomía: 280 km (WLTP)\nVolumen de carga: 7 m³\nCarga rápida DC: 20 a 80% en 40 min\nGarantía de batería: 8 años o 160,000 km",
  },
  {
    slug: "bedrock-van7-cargo",
    locale: "en",
    category: "electromovilidad",
    title: "Bedrock Van 7 Electric Cargo Van",
    description:
      "Electric cargo van built for last-mile logistics and urban distribution, with low operating costs and zero emissions.",
    specs:
      "Range: 280 km (WLTP)\nCargo volume: 7 m³\nDC fast charging: 20 to 80% in 40 min\nBattery warranty: 8 years or 160,000 km",
  },
  {
    slug: "estacion-carga-dc-120kw",
    locale: "es",
    category: "electromovilidad",
    title: "Estación de Carga DC 120 kW",
    description:
      "Infraestructura de carga rápida para flotas y corredores logísticos, compatible con los principales estándares de carga del mercado.",
    specs:
      "Potencia: 120 kW\nConectores: CCS2, GB/T\nCarga simultánea: 2 vehículos\nComisionamiento remoto incluido",
  },
  {
    slug: "estacion-carga-dc-120kw",
    locale: "en",
    category: "electromovilidad",
    title: "120 kW DC Charging Station",
    description:
      "Fast-charging infrastructure for fleets and logistics corridors, compatible with the market's leading charging standards.",
    specs:
      "Power: 120 kW\nConnectors: CCS2, GB/T\nSimultaneous charging: 2 vehicles\nRemote commissioning included",
  },
  // Financiamiento
  {
    slug: "credito-equipamiento-solar",
    locale: "es",
    category: "financiamiento",
    title: "Crédito Equipamiento Solar",
    description:
      "Financiamiento diseñado para la adquisición de paneles solares, inversores y sistemas de almacenamiento, con plazos flexibles alineados al ahorro generado.",
    specs:
      "Plazos: 12 a 60 meses\nMonto: desde $200,000 MXN\nRequisitos: antigüedad de la empresa, estados financieros\nAprobación preliminar: 5 días hábiles",
  },
  {
    slug: "credito-equipamiento-solar",
    locale: "en",
    category: "financiamiento",
    title: "Solar Equipment Financing",
    description:
      "Financing designed for acquiring solar panels, inverters and storage systems, with flexible terms aligned to the savings they generate.",
    specs:
      "Terms: 12 to 60 months\nAmount: from $200,000 MXN\nRequirements: company track record, financial statements\nPreliminary approval: 5 business days",
  },
  {
    slug: "arrendamiento-flotas-electricas",
    locale: "es",
    category: "financiamiento",
    title: "Arrendamiento de Flotas Eléctricas",
    description:
      "Esquema de arrendamiento puro o financiero para renovar flotas comerciales con vehículos eléctricos, sin comprometer el capital de trabajo.",
    specs:
      "Plazos: 24 a 48 meses\nMantenimiento preventivo: opcional\nAplica a: compras de 3 o más unidades",
  },
  {
    slug: "arrendamiento-flotas-electricas",
    locale: "en",
    category: "financiamiento",
    title: "Electric Fleet Leasing",
    description:
      "Operating or finance lease structure to renew commercial fleets with electric vehicles, without tying up working capital.",
    specs:
      "Terms: 24 to 48 months\nPreventive maintenance: optional\nApplies to: purchases of 3 or more units",
  },
  {
    slug: "linea-capital-de-trabajo",
    locale: "es",
    category: "financiamiento",
    title: "Línea de Capital de Trabajo para Proyectos de Energía",
    description:
      "Línea revolvente para cubrir necesidades de capital de trabajo durante la ejecución de proyectos de energía limpia o electromovilidad.",
    specs:
      "Monto: hasta $5,000,000 MXN\nDisposición: bajo demanda\nTasa: preferencial para clientes con proyecto AUXSOL activo",
  },
  {
    slug: "linea-capital-de-trabajo",
    locale: "en",
    category: "financiamiento",
    title: "Working Capital Line for Energy Projects",
    description:
      "Revolving line of credit to cover working capital needs while executing clean energy or electromobility projects.",
    specs:
      "Amount: up to $5,000,000 MXN\nDraw: on demand\nRate: preferential for clients with an active AUXSOL project",
  },
];

const posts = [
  {
    slug: "senales-necesitas-bess",
    locale: "es",
    title: "5 señales de que tu empresa necesita almacenamiento de energía (BESS)",
    excerpt:
      "Si tus recibos de luz suben en horario pico o los apagones te cuestan producción, un sistema BESS puede cambiar la ecuación.",
    body: `## ¿Por qué considerar un BESS?

Un sistema de almacenamiento de energía (BESS) permite a tu empresa guardar energía cuando es barata y usarla cuando más la necesitas. Estas son cinco señales de que es momento de evaluarlo:

1. **Tu tarifa eléctrica tiene cargos por demanda máxima.** Un BESS puede recortar los picos de consumo y reducir ese cargo de forma significativa.
2. **Los apagones o variaciones de voltaje afectan tu producción.** El respaldo de energía evita paros no planeados.
3. **Ya tienes paneles solares, pero generas más de lo que consumes de día.** Almacenar ese excedente para la noche mejora el retorno de tu inversión solar.
4. **Buscas certificaciones de sustentabilidad.** Reducir tu dependencia de la red apoya metas ESG.
5. **Tu crecimiento está limitado por la capacidad eléctrica contratada.** Un BESS puede posponer o evitar una ampliación costosa de infraestructura.

### Cómo dimensionar el sistema correcto

El tamaño ideal depende de tu curva de carga, tarifa y objetivos (respaldo, arbitraje de tarifa, o ambos). En The Blvck Stone hacemos un diagnóstico técnico-económico antes de proponer una solución.

¿Quieres saber si un BESS tiene sentido para tu operación? [Contáctanos](/contacto) y lo revisamos juntos.`,
  },
  {
    slug: "signs-you-need-bess",
    locale: "en",
    title: "5 signs your business needs a BESS",
    excerpt:
      "If your peak-hour electricity bill keeps climbing or blackouts are costing you production, a BESS can change the math.",
    body: `## Why consider a BESS?

A Battery Energy Storage System (BESS) lets your business store energy when it's cheap and use it when you need it most. Here are five signs it's time to evaluate one:

1. **Your electricity rate includes peak demand charges.** A BESS can shave consumption peaks and cut that charge significantly.
2. **Blackouts or voltage swings affect production.** Backup power avoids unplanned downtime.
3. **You already have solar panels but generate more than you use during the day.** Storing that surplus for the night improves your solar ROI.
4. **You're pursuing sustainability certifications.** Reducing grid dependence supports ESG goals.
5. **Your growth is capped by contracted electrical capacity.** A BESS can delay or avoid a costly infrastructure upgrade.

### Sizing the right system

The ideal size depends on your load curve, rate structure and goals (backup, rate arbitrage, or both). At The Blvck Stone we run a technical-economic assessment before proposing a solution.

Want to know if a BESS makes sense for your operation? [Get in touch](/contacto) and we'll review it together.`,
  },
  {
    slug: "electromovilidad-flotas-mexico",
    locale: "es",
    title: "Electromovilidad en México: qué debe saber tu flota antes de dar el salto",
    excerpt:
      "Migrar una flota a eléctrico no es solo comprar camionetas. Es planear infraestructura, rutas y mantenimiento.",
    body: `## El costo total de propiedad cambia las reglas

Una camioneta eléctrica cuesta más al comprarla, pero menos al operarla. Combustible y mantenimiento caen entre 40% y 60% frente a un vehículo de combustión interna, dependiendo del uso.

### Tres cosas que hay que planear antes de migrar

- **Infraestructura de carga.** ¿Cargarás en base, en ruta, o ambas? El dimensionamiento del cargador (AC vs DC) depende del tiempo disponible entre turnos.
- **Rutas y autonomía real.** La autonomía WLTP es un punto de partida, no una garantía. Factores como carga, clima y estilo de manejo la modifican.
- **Mantenimiento y garantía de batería.** Un buen contrato de garantía cubre degradación de batería, no solo defectos de fabricación.

### Empieza con un piloto

Recomendamos migrar entre 10% y 15% de la flota primero, medir resultados reales por 3 a 6 meses, y escalar con datos propios en vez de proyecciones genéricas.

¿Listo para diseñar tu piloto de electromovilidad? [Hablemos](/contacto).`,
  },
  {
    slug: "electromobility-fleets-mexico",
    locale: "en",
    title: "Electromobility in Mexico: what your fleet needs to know before making the switch",
    excerpt:
      "Moving a fleet to electric isn't just buying trucks. It's planning infrastructure, routes and maintenance.",
    body: `## Total cost of ownership changes the math

An electric truck costs more upfront but less to operate. Fuel and maintenance drop 40% to 60% versus an internal combustion vehicle, depending on usage.

### Three things to plan before switching

- **Charging infrastructure.** Will you charge at base, on route, or both? Charger sizing (AC vs DC) depends on the time available between shifts.
- **Routes and real-world range.** WLTP range is a starting point, not a guarantee. Load, weather and driving style all affect it.
- **Maintenance and battery warranty.** A good warranty contract covers battery degradation, not just manufacturing defects.

### Start with a pilot

We recommend migrating 10% to 15% of the fleet first, measuring real results for 3 to 6 months, and scaling with your own data instead of generic projections.

Ready to design your electromobility pilot? [Let's talk](/contacto).`,
  },
  {
    slug: "financiar-proyecto-energia-limpia",
    locale: "es",
    title: "Cómo estructurar el financiamiento de tu proyecto de energía limpia",
    excerpt:
      "El financiamiento correcto puede ser la diferencia entre un proyecto que se paga solo y uno que nunca despega.",
    body: `## El ahorro debe pagar la deuda, no al revés

La regla de oro del financiamiento energético: la mensualidad del crédito debe ser menor al ahorro mensual que genera el proyecto. Así, el proyecto se paga solo desde el primer mes.

### Opciones más comunes

1. **Crédito directo.** El cliente es dueño del activo desde el día uno; mejor para empresas con buen historial crediticio.
2. **Arrendamiento (leasing).** Menor impacto en el balance, pagos mensuales fijos, opción de compra al final del plazo.
3. **Capital de trabajo revolvente.** Para cubrir gastos durante la ejecución del proyecto antes de que empiece a generar ahorro.

### Qué pide un analista de crédito

Estados financieros de los últimos 2 años, antigüedad de la empresa y, en algunos casos, una evaluación técnica del proyecto (para créditos atados a un activo específico).

En The Blvck Stone acompañamos tanto la propuesta técnica como la estructura financiera, para que ambas partes calcen. [Cuéntanos tu proyecto](/contacto).`,
  },
  {
    slug: "financing-clean-energy-project",
    locale: "en",
    title: "How to structure financing for your clean energy project",
    excerpt:
      "The right financing can be the difference between a project that pays for itself and one that never gets off the ground.",
    body: `## Savings should pay the debt, not the other way around

The golden rule of energy financing: the monthly payment should be lower than the monthly savings the project generates. That way the project pays for itself from month one.

### Most common options

1. **Direct credit.** The client owns the asset from day one; best for companies with a solid credit history.
2. **Leasing.** Lower balance-sheet impact, fixed monthly payments, purchase option at the end of the term.
3. **Revolving working capital.** To cover expenses during project execution before savings kick in.

### What a credit analyst asks for

Financial statements from the last 2 years, company track record and, in some cases, a technical assessment of the project (for asset-backed credit).

At The Blvck Stone we support both the technical proposal and the financial structure, so they fit together. [Tell us about your project](/contacto).`,
  },
];

// Nombres y empresas ficticios, solo para demo. Reemplazar por testimonios
// reales autorizados por el cliente antes del lanzamiento público.
const testimonials = [
  {
    name: "Roberto Salinas",
    company: "Grupo Industrial Altamira",
    role: "Director de Operaciones",
    quote:
      "Instalaron nuestro sistema BESS en tiempo récord y el soporte técnico local marcó la diferencia: resolvieron una incidencia en menos de 24 horas.",
  },
  {
    name: "Mariana Cordero",
    company: "Transportes del Bajío",
    role: "Gerente de Flota",
    quote:
      "Migramos 8 unidades a eléctrico con Bedrock y el ahorro en combustible se notó desde el primer mes. El financiamiento fue mucho más simple de lo que esperábamos.",
  },
  {
    name: "Fernando Ibarra",
    company: "Constructora Peninsular",
    role: "Director de Finanzas",
    quote:
      "El esquema de arrendamiento que nos propusieron se ajustó exactamente al flujo de caja del proyecto. Cero sorpresas.",
  },
  {
    name: "Daniela Reyes",
    company: "Agroindustrias del Norte",
    role: "CEO",
    quote:
      "Buscábamos reducir nuestra dependencia de la red y el equipo de The Blvck Stone diseñó una solución a la medida, no un paquete genérico.",
  },
];

async function main() {
  for (const p of products) {
    await sql`
      insert into products (slug, locale, category, title, description, specs)
      values (${p.slug + "-" + p.locale}, ${p.locale}, ${p.category}, ${p.title}, ${p.description}, ${p.specs})
      on conflict (slug) do update set
        locale = excluded.locale,
        category = excluded.category,
        title = excluded.title,
        description = excluded.description,
        specs = excluded.specs,
        updated_at = now()
    `;
  }

  for (const post of posts) {
    await sql`
      insert into posts (slug, locale, title, excerpt, body)
      values (${post.slug}, ${post.locale}, ${post.title}, ${post.excerpt}, ${post.body})
      on conflict (slug) do update set
        locale = excluded.locale,
        title = excluded.title,
        excerpt = excluded.excerpt,
        body = excluded.body
    `;
  }

  for (const t of testimonials) {
    await sql`
      insert into testimonials (name, company, role, quote)
      select ${t.name}, ${t.company}, ${t.role}, ${t.quote}
      where not exists (select 1 from testimonials where name = ${t.name})
    `;
    await sql`
      update testimonials set company = ${t.company}, role = ${t.role}, quote = ${t.quote}
      where name = ${t.name}
    `;
  }

  console.log(
    `Seeded ${products.length} products, ${posts.length} posts, ${testimonials.length} testimonials.`,
  );
  await sql.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
