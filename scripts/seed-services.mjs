// Carga el catálogo real de servicios de The Blvck Stone, armado a partir de
// la carpeta de Drive del proyecto (ver docs/empresas/). Los proveedores son
// internos: el sitio presenta cada servicio como propio, sin nombres de marca.
// Borra los productos de demostración y hace upsert por slug, así que se puede
// volver a correr sin duplicar filas. Los productos creados desde /admin con
// otros slugs no se tocan, y una foto subida desde /admin no se reemplaza.
import postgres from "postgres";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL no está definida.");
  process.exit(1);
}

const sql = postgres(DATABASE_URL, { prepare: false });

const DEMO_SLUGS = [
  "auxsol-bess-100",
  "auxsol-inverter-350kw",
  "auxsol-panel-550w",
  "bedrock-et5-pickup",
  "bedrock-van7-cargo",
  "estacion-carga-dc-120kw",
  "credito-equipamiento-solar",
  "arrendamiento-flotas-electricas",
  "linea-capital-de-trabajo",
].flatMap((slug) => [`${slug}-es`, `${slug}-en`]);

// Cada servicio lleva su versión ES y EN. Las specs son "Etiqueta: valor" por
// línea; el sitio muestra las primeras 6.
const services = [
  // Energía limpia y almacenamiento
  {
    slug: "sistemas-fotovoltaicos",
    category: "energia-limpia",
    es: {
      title: "Sistemas fotovoltaicos para casa, comercio e industria",
      description:
        "Diseñamos e instalamos sistemas solares interconectados, aislados o híbridos a partir de tu consumo real, y gestionamos el contrato de interconexión con CFE.",
      specs:
        "Esquemas: interconectado, aislado e híbrido\nContraprestación CFE: medición neta, facturación neta o venta total\nGeneración distribuida: sistemas menores a 0.5 MW\nGarantía de inversores: 10 años\nCertificaciones: UL, KEMA, ANSI, IEC y NOM-001-SEDE\nComisionamiento: remoto, incluido",
    },
    en: {
      title: "Solar PV systems for homes, businesses and industry",
      description:
        "We design and install grid-tied, off-grid or hybrid solar systems sized to your actual consumption, and handle the interconnection contract with CFE.",
      specs:
        "Configurations: grid-tied, off-grid and hybrid\nCFE schemes: net metering, net billing or total sale\nDistributed generation: systems under 0.5 MW\nInverter warranty: 10 years\nCertifications: UL, KEMA, ANSI, IEC and NOM-001-SEDE\nCommissioning: remote, included",
    },
  },
  {
    slug: "bess-comercial-industrial",
    category: "energia-limpia",
    es: {
      title: "Almacenamiento BESS comercial e industrial",
      description:
        "Baterías detrás del medidor para recortar picos de demanda, mover consumo a horario base y respaldar tu operación ante apagones. Con EMS integrado y sin permiso de generación de la CRE cuando es para autoconsumo.",
      specs:
        "Capacidad: 261 a 418 kWh\nQuímica: LFP, más de 7,000 ciclos\nEficiencia: más de 90% de ida y vuelta\nSeguridad: IEC 62619 y UL 9540A\nAhorro potencial: 25 a 40% en la factura eléctrica\nGarantía: 5 a 10 años",
    },
    en: {
      title: "Commercial and industrial BESS",
      description:
        "Behind-the-meter batteries that shave demand peaks, shift consumption to off-peak hours and keep your operation running through outages. EMS included, and no CRE generation permit needed for self-consumption.",
      specs:
        "Capacity: 261 to 418 kWh\nChemistry: LFP, over 7,000 cycles\nEfficiency: over 90% round trip\nSafety: IEC 62619 and UL 9540A\nPotential savings: 25 to 40% on your power bill\nWarranty: 5 to 10 years",
    },
  },
  {
    slug: "inversores-bess-utility",
    category: "energia-limpia",
    es: {
      title: "Inversores y BESS utility-scale",
      description:
        "Infraestructura para parques solares y grandes consumidores: inversores de más de 350 kW y almacenamiento desde 5 MWh, con monitoreo 24/7 y operación continua mediante EMS.",
      specs:
        "Inversores: más de 350 kW\nAlmacenamiento: más de 5 MWh\nGarantía de inversores: 10 años\nMonitoreo: 24/7 con EMS\nIncidencias: resolución en menos de 48 horas\nProceso: evaluación, permisos, implementación y comisionamiento",
    },
    en: {
      title: "Utility-scale inverters and BESS",
      description:
        "Infrastructure for solar parks and large consumers: inverters above 350 kW and storage from 5 MWh, with 24/7 monitoring and continuous operation through EMS.",
      specs:
        "Inverters: above 350 kW\nStorage: above 5 MWh\nInverter warranty: 10 years\nMonitoring: 24/7 with EMS\nIncidents: resolved in under 48 hours\nProcess: assessment, permits, implementation and commissioning",
    },
  },
  {
    slug: "diagnostico-energetico",
    category: "energia-limpia",
    es: {
      title: "Diagnóstico energético y análisis de recibo CFE",
      description:
        "Revisamos tu recibo de CFE para encontrar cargos por demanda, penalizaciones por factor de potencia y errores de facturación. Con eso dimensionamos la solución y te entregamos una propuesta técnico-económica.",
      specs:
        "Costo: sin costo\nTarifas: GDMTH, GDMTO, GDBT, PDBT, DIST, DIT y residenciales\nFactor de potencia: detección de penalizaciones por debajo de 90%\nEntregable: propuesta técnico-económica con retorno de inversión\nSiguiente paso: roadmap de permisos, instalación y comisionamiento",
    },
    en: {
      title: "Energy assessment and CFE bill review",
      description:
        "We review your CFE bill to find demand charges, power-factor penalties and billing errors. From there we size the solution and deliver a technical and economic proposal.",
      specs:
        "Cost: free\nTariffs: GDMTH, GDMTO, GDBT, PDBT, DIST, DIT and residential\nPower factor: detection of penalties below 90%\nDeliverable: technical and economic proposal with payback\nNext step: roadmap for permits, installation and commissioning",
    },
  },

  // Electromovilidad y flotas
  {
    slug: "van-electrica-carga-grande",
    category: "electromovilidad",
    es: {
      title: "Van eléctrica de carga 3.5 t",
      description:
        "Van 100% eléctrica para logística y última milla, con 5 estrellas Euro NCAP. Frente a una van a gasolina equivalente ahorra cerca de $75,192 MXN al año por unidad recorriendo 3,000 km al mes (cálculo aproximado con precios de mayo de 2025).",
      specs:
        "Volumen de carga: 6.95 a 13 m³\nPeso bruto vehicular: 3,500 kg\nBatería: 49 a 106 kWh\nAutonomía: hasta 551 km en ciudad (WLTC)\nCarga rápida DC: 105 a 150 kW, 20 a 80% en 30 min\nSeguridad: Euro NCAP 5 estrellas",
    },
    en: {
      title: "3.5 t electric cargo van",
      description:
        "100% electric van for logistics and last-mile delivery, rated 5 stars by Euro NCAP. Compared with an equivalent gasoline van it saves about MXN 75,192 per unit per year at 3,000 km a month (approximate, May 2025 prices).",
      specs:
        "Cargo volume: 6.95 to 13 m³\nGross vehicle weight: 3,500 kg\nBattery: 49 to 106 kWh\nRange: up to 551 km city (WLTC)\nDC fast charging: 105 to 150 kW, 20 to 80% in 30 min\nSafety: Euro NCAP 5 stars",
    },
  },
  {
    slug: "van-electrica-compacta",
    category: "electromovilidad",
    es: {
      title: "Van eléctrica compacta de carga",
      description:
        "Van urbana con 10% más volumen que su categoría y 1.5 toneladas de carga útil, pensada para reparto en ciudad con carga en base.",
      specs:
        "Volumen de carga: 5.9 m³\nCarga útil: 1.5 t\nBatería: LFP de 41.86 kWh\nAutonomía: 195 km (WLTC)\nMotor: 50 kW nominal, 100 kW pico\nCarga: DC CCS2 y AC de 6.6 kW",
    },
    en: {
      title: "Compact electric cargo van",
      description:
        "Urban van with 10% more cargo space than its class and a 1.5 tonne payload, built for city delivery with depot charging.",
      specs:
        "Cargo volume: 5.9 m³\nPayload: 1.5 t\nBattery: 41.86 kWh LFP\nRange: 195 km (WLTC)\nMotor: 50 kW rated, 100 kW peak\nCharging: DC CCS2 and 6.6 kW AC",
    },
  },
  {
    slug: "infraestructura-carga",
    category: "electromovilidad",
    es: {
      title: "Infraestructura de carga AC y DC",
      description:
        "Cargadores AC para casa y estacionamientos, y multicargadores DC para flotas, agencias y hubs públicos. Instalación, comisionamiento remoto y soporte técnico local.",
      specs:
        "Residencial: cargadores AC\nComercial: multicargador DC\nHubs públicos: bahías de hasta 240 kW (GB/T) y 120 kW (CCS1)\nGarantía: 2 a 3 años\nComisionamiento: remoto, incluido\nSoporte: incidencias en menos de 48 horas",
    },
    en: {
      title: "AC and DC charging infrastructure",
      description:
        "AC chargers for homes and parking lots, and DC multi-chargers for fleets, dealerships and public hubs. Installation, remote commissioning and local technical support.",
      specs:
        "Residential: AC chargers\nCommercial: DC multi-charger\nPublic hubs: bays up to 240 kW (GB/T) and 120 kW (CCS1)\nWarranty: 2 to 3 years\nCommissioning: remote, included\nSupport: incidents resolved in under 48 hours",
    },
  },
  {
    slug: "estacion-carga-negocio",
    category: "electromovilidad",
    es: {
      title: "Estación de carga DC como negocio",
      description:
        "Evaluamos y montamos tu electrolinera como inversión: corrida financiera con tarifa GDMTH, precio de venta por kWh y horas de uso, y entrega llave en mano con transformador incluido.",
      specs:
        "Ejemplo: estación de 480 kW\nInversión llave en mano: $4,320,000 MXN con transformador\nPrecio de venta: 7.8 MXN por kWh\nUso supuesto: 3.5 horas al día\nTIR estimada: 74% (corrida preliminar)\nMargen neto anual estimado: $3.2 millones MXN",
    },
    en: {
      title: "DC charging station as a business",
      description:
        "We evaluate and build your charging station as an investment: a financial model based on the GDMTH tariff, selling price per kWh and hours of use, delivered turnkey with the transformer included.",
      specs:
        "Example: 480 kW station\nTurnkey investment: MXN 4,320,000 including transformer\nSelling price: MXN 7.8 per kWh\nAssumed use: 3.5 hours a day\nEstimated IRR: 74% (preliminary model)\nEstimated annual net margin: MXN 3.2 million",
    },
  },
  {
    slug: "mantenimiento-flotas-lubricantes",
    category: "electromovilidad",
    es: {
      title: "Mantenimiento de flotas y lubricantes",
      description:
        "Taller mecánico con enfoque preventivo y suministro de aceites, lubricantes y grasas automotrices e industriales, con análisis de aceite usado y asesoría técnica en sitio sin costo.",
      specs:
        "Taller: mecánica correctiva, servicio exprés, eléctrico y A/A, hojalatería y pintura\nLubricantes: aceites automotrices, industriales sintéticos y grasas\nAnálisis de aceite usado: sin costo, laboratorios acreditados EMA\nCalidad: ISO 9001 y aprobación LAPEM (CFE)\nEntrega: urgente en 24 horas en productos de línea\nEquipo de despacho: en comodato",
    },
    en: {
      title: "Fleet maintenance and lubricants",
      description:
        "Preventive-first repair shop plus supply of automotive and industrial oils, lubricants and greases, with free used-oil analysis and on-site technical advice.",
      specs:
        "Workshop: corrective mechanics, express service, electrical and A/C, body and paint\nLubricants: automotive oils, synthetic industrial oils and greases\nUsed-oil analysis: free, EMA-accredited labs\nQuality: ISO 9001 and LAPEM (CFE) approval\nDelivery: urgent 24-hour delivery on stock products\nDispensing equipment: on free loan",
    },
  },

  // Financiamiento, coberturas e inversión
  {
    slug: "arrendamiento-credito-ppa",
    category: "financiamiento",
    es: {
      title: "Arrendamiento, crédito y PPA para proyectos de energía",
      description:
        "Tres formas de pagar tu sistema solar o BESS: arrendamiento fuera de balance, crédito que permite deducir el 100% de la inversión, o contrato de compra de energía donde pagas solo por lo que generas.",
      specs:
        "Arrendamiento: 2 a 6 años, fuera de balance\nCrédito: tasas competitivas y deducción del 100%\nPPA: 10 a 15 años, pagas por la energía generada\nCorrida: TIR, periodo de recuperación y VPN de tu proyecto",
    },
    en: {
      title: "Leasing, credit and PPAs for energy projects",
      description:
        "Three ways to pay for your solar system or BESS: off-balance-sheet leasing, credit that lets you deduct 100% of the investment, or a power purchase agreement where you only pay for what it generates.",
      specs:
        "Leasing: 2 to 6 years, off balance sheet\nCredit: competitive rates and 100% deduction\nPPA: 10 to 15 years, pay for the energy generated\nModel: IRR, payback period and NPV for your project",
    },
  },
  {
    slug: "financiamiento-proyectos-productivos",
    category: "financiamiento",
    es: {
      title: "Financiamiento estructurado para proyectos productivos",
      description:
        "Estructuramos financiamiento a la medida para empresas y personas físicas con actividad empresarial que tienen un proyecto productivo: inmobiliario, agroindustria, alimentos, entretenimiento o capital de trabajo.",
      specs:
        "Para: empresas y PFAE con proyecto productivo\nProductos: factoraje, capital de trabajo, inmobiliario y equity\nGarantía: inmobiliaria, con escritura, predial y avalúo reciente\nInformación financiera: 2 años de estados financieros y declaraciones\nProyecto: resumen ejecutivo y flujo con el monto solicitado",
    },
    en: {
      title: "Structured financing for productive projects",
      description:
        "Tailored financing for companies and self-employed business owners with a productive project: real estate, agribusiness, food, entertainment or working capital.",
      specs:
        "For: companies and business owners with a productive project\nProducts: factoring, working capital, real estate and equity\nCollateral: real estate, with deed, property tax and recent appraisal\nFinancials: 2 years of financial statements and tax returns\nProject: executive summary and cash flow with the requested amount",
    },
  },
  {
    slug: "credito-puente-inmobiliario",
    category: "financiamiento",
    es: {
      title: "Créditos puente con garantía inmobiliaria",
      description:
        "Préstamos de corto plazo garantizados con inmuebles en Estados Unidos y otros países, para compra, desarrollo, construcción, reestructuras o adquisición de terreno. Fondeo en pocos días.",
      specs:
        "Monto: de US$1 millón a más de US$50 millones\nFuera de EUA: desde US$3 millones\nValor del préstamo: hasta 75% en EUA y 50% fuera de EUA\nTasa: desde 6% anual\nComisión: desde 2%\nPlazo: hasta 6 años, sin penalización por prepago",
    },
    en: {
      title: "Real-estate-backed bridge loans",
      description:
        "Short-term loans secured by property in the United States and other countries, for acquisitions, development, construction, workouts or land purchases. Funding in a few days.",
      specs:
        "Amount: from US$1 million to over US$50 million\nOutside the US: from US$3 million\nLoan to value: up to 75% in the US and 50% outside the US\nRate: from 6% a year\nFees: from 2%\nTerm: up to 6 years, no prepayment penalty",
    },
  },
  {
    slug: "coberturas-financieras",
    category: "financiamiento",
    es: {
      title: "Coberturas financieras para empresas",
      description:
        "Protege tu margen contra la volatilidad del tipo de cambio, las tasas de interés y el precio de las materias primas con estrategias en mercados de futuros y opciones. Ideal si compras insumos en volumen o en el extranjero.",
      specs:
        "Divisas: fija el tipo de cambio de tus operaciones\nTasa de interés: fija la tasa de una deuda variable\nCommodities: granos, petróleo, metales, ganado, alimentos y energía\nMercado: CME (Chicago Mercantile Exchange)\nEquipo: operadores certificados Series 3 (NFA)",
    },
    en: {
      title: "Financial hedging for companies",
      description:
        "Protect your margin from swings in exchange rates, interest rates and commodity prices with futures and options strategies. Built for companies that buy inputs in volume or abroad.",
      specs:
        "Currencies: lock the exchange rate on your operations\nInterest rates: fix the rate on variable-rate debt\nCommodities: grains, oil, metals, cattle, food and energy\nMarket: CME (Chicago Mercantile Exchange)\nTeam: Series 3 (NFA) certified traders",
    },
  },
  {
    slug: "blindaje-combustible",
    category: "financiamiento",
    es: {
      title: "Blindaje de precio de combustible",
      description:
        "Cobertura para gasolineras, gaseras y transportistas que fija el costo del combustible en mercados internacionales. Nuestra utilidad depende de la tuya: cobramos un porcentaje de la ganancia que genera la cobertura.",
      specs:
        "Para: gasolineras, gaseras y empresas de transporte\nMercado: CME (Chicago)\nResultados: 70% de las coberturas generan utilidad\nCosto promedio de la cobertura: 6%\nHonorario: 20% de la utilidad generada\nControl de riesgo: VaR, toma de utilidad y stop-loss",
    },
    en: {
      title: "Fuel price hedge",
      description:
        "A hedge for gas stations, LP gas distributors and transport companies that locks fuel costs on international exchanges. We only win when you do: our fee is a share of the profit the hedge generates.",
      specs:
        "For: gas stations, LP gas distributors and transport companies\nMarket: CME (Chicago)\nTrack record: 70% of hedges generate a profit\nAverage hedge cost: 6%\nFee: 20% of the profit generated\nRisk control: VaR, take-profit and stop-loss",
    },
  },
  {
    slug: "inversion-tasa-fija",
    category: "financiamiento",
    es: {
      title: "Inversión a tasa fija",
      description:
        "Para personas físicas que buscan diversificar sus ingresos con un rendimiento fijo mensual. El capital se opera con instrumentos financieros derivados en mercados internacionales, con control de riesgo y stop-loss. Todo instrumento derivado conlleva riesgo.",
      specs:
        "Rendimiento: 5% mensual en MXN (60% anual), pagado cada mes\nMonto: de $100,000 a $300,000 MXN\nMontos mayores: desde $301,000 MXN a la misma tasa\nPlazo: 6, 12 o 18 meses\nRequisitos: INE o pasaporte, comprobante de domicilio y datos bancarios\nContratación: convenio de inversión",
    },
    en: {
      title: "Fixed-rate investment",
      description:
        "For individuals looking to diversify their income with a fixed monthly return. Capital is traded with financial derivatives on international markets, with risk control and stop-loss. Every derivative instrument carries risk.",
      specs:
        "Return: 5% a month in MXN (60% a year), paid monthly\nAmount: MXN 100,000 to 300,000\nLarger amounts: from MXN 301,000 at the same rate\nTerm: 6, 12 or 18 months\nRequirements: ID or passport, proof of address and bank details\nContract: investment agreement",
    },
  },

  // Construcción e infraestructura industrial
  {
    slug: "cubiertas-fachadas-metalicas",
    category: "construccion",
    es: {
      title: "Cubiertas y fachadas metálicas",
      description:
        "Suministro e instalación de cubiertas metálicas de alto desempeño para naves industriales y comerciales, desde techo nuevo hasta re-techado sobre la cubierta existente, con herrería estructural incluida.",
      specs:
        "Sistemas engargolados: KR-18 y KR-24\nSistemas tradicionales: R-101 y fachadas R-103\nOtros sistemas: autosoportantes, termoacústicos y paneles aislados\nHerrería: suministro y colocación de herrería industrial\nSeguridad: personal con DC-3 para alturas, corte y soldadura\nRespaldo: obra afianzada",
    },
    en: {
      title: "Metal roofing and facades",
      description:
        "Supply and installation of high-performance metal roofing for industrial and commercial buildings, from new roofs to re-roofing over the existing deck, with structural steelwork included.",
      specs:
        "Standing seam systems: KR-18 and KR-24\nTraditional systems: R-101 and R-103 facades\nOther systems: self-supporting, thermo-acoustic and insulated panels\nSteelwork: supply and installation of industrial steelwork\nSafety: DC-3 certified crews for work at height, cutting and welding\nAssurance: bonded projects",
    },
  },
  {
    slug: "impermeabilizacion-mantenimiento-cubiertas",
    category: "construccion",
    es: {
      title: "Impermeabilización, iluminación natural y mantenimiento de cubiertas",
      description:
        "Prolonga la vida de tu techo y baja la temperatura interior con impermeabilización parcial o total, domos y lámina translúcida, ventilación por gravedad y pólizas de mantenimiento preventivo.",
      specs:
        "Impermeabilización: parcial, total o sobre la existente\nIluminación natural: domos y lámina translúcida\nVentilación: sistemas por gravedad\nMantenimiento: diagnóstico, correctivo, preventivo y pólizas\nCapacitación: planes para el equipo de planta",
    },
    en: {
      title: "Waterproofing, daylighting and roof maintenance",
      description:
        "Extend the life of your roof and lower indoor temperatures with partial or full waterproofing, skylights and translucent sheeting, gravity ventilation and preventive maintenance contracts.",
      specs:
        "Waterproofing: partial, full or over the existing layer\nDaylighting: skylights and translucent sheeting\nVentilation: gravity systems\nMaintenance: diagnosis, corrective, preventive and service contracts\nTraining: programs for plant staff",
    },
  },
  {
    slug: "naves-membrana-tensada",
    category: "construccion",
    es: {
      title: "Naves industriales de membrana tensada",
      description:
        "Edificios de estructura de aluminio y membrana arquitectónica tensada, disponibles de inventario y listos en una fracción del tiempo de una nave tradicional. Se pueden reubicar o rentar a corto plazo.",
      specs:
        "Estructura: aluminio extruido, sin óxido, un tercio del peso del acero\nMontaje: hasta 185 m² por día\nCimentación: no requerida en estructuras de hasta 49 m de ancho\nAislamiento: hasta R-30, para climas de -50 °C a +50 °C\nGarantía de membrana: 12, 15 o 20 años prorrateada según tipo\nUsos: almacenes, logística, aviación, puertos, minería y granel",
    },
    en: {
      title: "Tensioned membrane industrial buildings",
      description:
        "Aluminum-frame buildings with tensioned architectural membrane, available from inventory and ready in a fraction of the time of a conventional building. They can be relocated or leased short term.",
      specs:
        "Structure: extruded aluminum, rustproof, a third of the weight of steel\nErection: up to 2,000 sq ft (185 m²) a day\nFoundations: not required on structures up to 160 ft (49 m) wide\nInsulation: up to R-30, for climates from -50 °C to +50 °C\nMembrane warranty: 12, 15 or 20 years pro rata by type\nUses: warehousing, logistics, aviation, ports, mining and bulk storage",
    },
  },
  {
    slug: "recubrimiento-termico",
    category: "construccion",
    es: {
      title: "Recubrimiento térmico e impermeabilizante",
      description:
        "Recubrimiento cerámico base agua que refleja la radiación solar y baja la temperatura interior de techos, muros, secadores y cámaras frías. No requiere sandblast y en pruebas universitarias redujo 7.4% la temperatura interior en verano.",
      specs:
        "Rendimiento: 38 m² por cubeta de 19 L\nReflexión UV: 92%\nDiferencial de temperatura: alrededor de 30%\nElasticidad: 500%\nCertificaciones: NSF R2 grado alimenticio, ASTM y SGS\nVida útil del techo: hasta 5 años adicionales",
    },
    en: {
      title: "Thermal and waterproofing coating",
      description:
        "Water-based ceramic coating that reflects solar radiation and lowers indoor temperatures on roofs, walls, dryers and cold rooms. No sandblasting needed, and university testing showed a 7.4% lower indoor temperature in summer.",
      specs:
        "Coverage: 38 m² per 19 L pail\nUV reflection: 92%\nTemperature differential: around 30%\nElasticity: 500%\nCertifications: NSF R2 food grade, ASTM and SGS\nRoof life: up to 5 extra years",
    },
  },
  {
    slug: "recubrimientos-industriales",
    category: "construccion",
    es: {
      title: "Recubrimientos anticorrosivos, antiderrapantes e ignífugos",
      description:
        "Línea de recubrimientos industriales base agua, no tóxicos y sin COV para estructuras metálicas, pisos, tuberías y equipos expuestos a corrosión, ácidos, salinidad o fuego. Se aplican con equipo airless.",
      specs:
        "Anticorrosivo: 55 m² por cubeta, encapsula el óxido, hasta 320 °C\nPrimario sellador: 70 m² por cubeta, 700% de elongación\nAntiderrapante: tráfico peatonal y uso marino\nAislante térmico: equipos, tuberías y calderas hasta 800 °C\nIgnífugo: resiste flama directa hasta 2,000 °C\nPresentación: cubeta de 19 L, 3 años de vida de anaquel",
    },
    en: {
      title: "Anti-corrosion, anti-slip and fireproof coatings",
      description:
        "A line of water-based, non-toxic, VOC-free industrial coatings for steel structures, floors, pipes and equipment exposed to corrosion, acids, salinity or fire. Applied with airless equipment.",
      specs:
        "Anti-corrosion: 55 m² per pail, encapsulates rust, up to 320 °C\nPrimer sealer: 70 m² per pail, 700% elongation\nAnti-slip: foot traffic and marine use\nThermal insulation: equipment, pipes and boilers up to 800 °C\nFireproofing: withstands direct flame up to 2,000 °C\nPackaging: 19 L pail, 3-year shelf life",
    },
  },
  {
    slug: "proteccion-pavimentos",
    category: "construccion",
    es: {
      title: "Protección de pavimentos y estacionamientos",
      description:
        "Tratamientos superficiales con nanotecnología, polímeros y cerámicos que protegen, impermeabilizan y renuevan el asfalto de estacionamientos, aeropuertos y carreteras, con acabado negro satinado y mejor agarre en superficie mojada.",
      specs:
        "Recubrimiento de alto desempeño: pavimento nuevo desde 20 días o en buen estado\nProtección con fibras cerámicas: recupera finos y agregado expuesto\nSuperficies de alta fricción: bajo proyecto\nAgregado: basalto negro triturado de importación\nBeneficios: contra oxidación, filtración de agua y desgaste\nApertura al tráfico: en cuanto seca al tacto",
    },
    en: {
      title: "Pavement and parking lot protection",
      description:
        "Surface treatments with nanotechnology, polymers and ceramics that protect, waterproof and renew asphalt in parking lots, airports and highways, with a satin black finish and better grip on wet surfaces.",
      specs:
        "High-performance coating: new pavement after 20 days or pavement in good condition\nCeramic-fiber protection: restores lost fines and exposed aggregate\nHigh-friction surfacing: by project\nAggregate: imported crushed black basalt\nBenefits: against oxidation, water ingress and wear\nOpen to traffic: as soon as it is dry to the touch",
    },
  },
  {
    slug: "proyectos-ferroviarios",
    category: "construccion",
    es: {
      title: "Proyectos ferroviarios llave en mano",
      description:
        "Soluciones para la última milla ferroviaria: estudio de demanda, diseño y construcción de terminales y espuelas, operación de terminales, equipo tractivo y capacitación certificada de tripulaciones.",
      specs:
        "Diseño: estudio de demanda y competencia, layout y plan maestro\nOperación: terminales de vehículos, hidrocarburos y alimentos\nTrazabilidad: software de patio en tiempo real\nEquipo tractivo: venta y renta de locomotoras y remolcadores\nCapacitación: cursos registrados ante STyPS y ARTF/SCT\nCobertura: Norte y Centroamérica",
    },
    en: {
      title: "Turnkey rail projects",
      description:
        "Last-mile rail solutions: demand studies, design and construction of terminals and spurs, terminal operation, motive power and certified crew training.",
      specs:
        "Design: demand and competitor study, layout and master plan\nOperation: finished-vehicle, hydrocarbon and food terminals\nTraceability: real-time yard software\nMotive power: sale and rental of locomotives and switchers\nTraining: courses registered with STyPS and ARTF/SCT\nCoverage: North and Central America",
    },
  },
  {
    slug: "piedra-sinterizada",
    category: "construccion",
    es: {
      title: "Piedra sinterizada de gran formato",
      description:
        "Placas de piedra tecnológica con apariencia de mármol, granito o cuarzo para pisos, muros, fachadas, cubiertas de cocina y mobiliario. Resiste rayones, manchas, calor y corrosión, y no requiere mantenimiento.",
      specs:
        "Espesor: 3 a 15 mm\nFormato: ultra gran formato\nDiseño: hasta 4 secuencias de cara para vetas continuas\nResistencia: rayones, manchas, desgaste, corrosión y altas temperaturas\nInstalación: como porcelanato de gran formato, con resina epóxica o pegazulejo\nUsos: residencial, hoteles, oficinas y plazas comerciales",
    },
    en: {
      title: "Large-format sintered stone",
      description:
        "Engineered stone slabs with the look of marble, granite or quartz for floors, walls, facades, kitchen countertops and furniture. Resistant to scratches, stains, heat and corrosion, with no maintenance needed.",
      specs:
        "Thickness: 3 to 15 mm\nFormat: ultra large format\nDesign: up to 4 face sequences for continuous veining\nResistance: scratches, stains, wear, corrosion and high temperatures\nInstallation: like large-format porcelain, with epoxy or tile adhesive\nUses: residential, hotels, offices and shopping centers",
    },
  },
  {
    slug: "cocinas-mobiliario",
    category: "construccion",
    es: {
      title: "Cocinas y mobiliario a la medida",
      description:
        "Fabricación nacional de cocinas, alacenas, lavanetas y piezas especiales en acabado laca o vidrio, a partir de tus planos. Ideal para desarrollos residenciales y proyectos de interiorismo.",
      specs:
        "Líneas: cocinas, alacenas, lavanetas y cajones\nAcabados: laca y vidrio\nEspecialidades: piezas fuera de catálogo aprobadas por ingeniería\nGarantía: limitada contra defectos de fabricación, uso interior\nCondiciones: pago del 100% y contrato firmado antes de producción\nPrecios: LAB fábrica, sin flete ni instalación",
    },
    en: {
      title: "Custom kitchens and furniture",
      description:
        "Mexican-made kitchens, wall cabinets, vanities and special pieces in lacquer or glass finishes, built from your drawings. A fit for residential developments and interior design projects.",
      specs:
        "Lines: kitchens, wall cabinets, vanities and drawers\nFinishes: lacquer and glass\nSpecials: off-catalog pieces approved by engineering\nWarranty: limited, against manufacturing defects, indoor use\nTerms: 100% payment and signed contract before production\nPricing: ex-factory, freight and installation not included",
    },
  },
  {
    slug: "certificacion-leed-edge",
    category: "construccion",
    es: {
      title: "Certificación de edificación sustentable LEED y EDGE",
      description:
        "Acompañamos a tu nave o edificio en la certificación LEED o EDGE para reducir el consumo de energía y agua, cumplir metas ESG y aumentar el valor del inmueble.",
      specs:
        "LEED: mínimo 40 puntos, al menos 30% menos energía y agua\nEDGE: 20% menos agua, energía y energía incorporada en materiales\nNiveles EDGE: Certified, Advanced (40%) y Zero Carbon (100%)\nOtras credenciales: ARC y WELL\nMercado: más de 681 proyectos industriales certificados en México",
    },
    en: {
      title: "LEED and EDGE sustainable building certification",
      description:
        "We guide your plant or building through LEED or EDGE certification to cut energy and water use, meet ESG goals and raise the value of the property.",
      specs:
        "LEED: at least 40 points, at least 30% less energy and water\nEDGE: 20% less water, energy and embodied energy in materials\nEDGE levels: Certified, Advanced (40%) and Zero Carbon (100%)\nOther credentials: ARC and WELL\nMarket: over 681 certified industrial projects in Mexico",
    },
  },

  // Estrategia fiscal y laboral
  {
    slug: "deduccion-inmediata-energia",
    category: "estrategia-fiscal",
    es: {
      title: "Deducción inmediata de inversiones en energía renovable",
      description:
        "La maquinaria y equipo para generar energía renovable es 100% deducible en el primer año conforme a la LISR, siempre que opere al menos 5 años. Estructuramos tu proyecto para aprovecharlo.",
      specs:
        "Fundamento: LISR art. 34, fracción XIII\nDeducción: hasta 100% en el primer ejercicio\nCondición: el equipo debe operar al menos 5 años\nInversiones periféricas: deducibles como parte del activo\nAnticipos: deducibles en el ejercicio en que se pagan\nFlexibilidad: puedes elegir un porcentaje menor para cuidar tu coeficiente de utilidad",
    },
    en: {
      title: "Immediate deduction for renewable energy investments",
      description:
        "Under Mexico's income tax law, renewable generation equipment is 100% deductible in the first year as long as it operates for at least 5 years. We structure your project to take advantage of it.",
      specs:
        "Legal basis: LISR art. 34, section XIII\nDeduction: up to 100% in the first fiscal year\nCondition: the equipment must operate for at least 5 years\nPeripheral investments: deductible as part of the asset\nAdvance payments: deductible in the year they are paid\nFlexibility: you can choose a lower rate to manage your profit coefficient",
    },
  },
  {
    slug: "programa-productividad",
    category: "estrategia-fiscal",
    es: {
      title: "Programa de productividad y economía social",
      description:
        "Un esquema pactado en el contrato colectivo que otorga a tus colaboradores apoyos ligados a su productividad, administrados por una asociación civil con trazabilidad, materialidad y certeza jurídica. Mejora la retención de talento y optimiza el costo social.",
      specs:
        "Base legal: LFT, LSS art. 27-VIII, LISR arts. 93-XI y 79-XIII y Ley de Economía Social y Solidaria\nPara la empresa: deducibilidad del ISR y optimización de cuotas IMSS\nPara colaboradores: caja de ahorro, seguros, educación, salud y transporte\nAdministración: comisión mixta constituida como A.C.\nProceso: constitución, ejecución con indicadores y dictamen de resultados\nComprobación: CFDI en cada pago",
    },
    en: {
      title: "Productivity and social economy program",
      description:
        "A program agreed in the collective bargaining agreement that gives your staff productivity-linked benefits, managed by a non-profit association with traceability, substance and legal certainty. It improves talent retention and optimizes social security costs.",
      specs:
        "Legal basis: LFT, LSS art. 27-VIII, LISR arts. 93-XI and 79-XIII and the Social and Solidarity Economy Law\nFor the company: income tax deductibility and optimized IMSS contributions\nFor staff: savings fund, insurance, education, health and transport\nManagement: joint committee set up as a non-profit association\nProcess: setup, execution with KPIs and results report\nCompliance: CFDI for every payment",
    },
  },
  {
    slug: "administracion-nomina",
    category: "estrategia-fiscal",
    es: {
      title: "Administración y maquila de nómina",
      description:
        "Operamos tu nómina de punta a punta, con timbrado y cumplimiento, atención personalizada en sitio y soluciones a la medida de tu plantilla.",
      specs:
        "Servicios: administración de nómina y maquila de nómina\nTimbrado: CFDI de nómina patrón-obrero\nAtención: personal implant en tu empresa\nServicios corporativos: administrativos, financieros y estratégicos",
    },
    en: {
      title: "Payroll administration and outsourcing",
      description:
        "We run your payroll end to end, with CFDI stamping and compliance, on-site personalized service and solutions tailored to your workforce.",
      specs:
        "Services: payroll administration and payroll processing\nStamping: employer-employee payroll CFDI\nService: on-site implant staff at your company\nCorporate services: administrative, financial and strategic",
    },
  },
  {
    slug: "servicios-sindicales",
    category: "estrategia-fiscal",
    es: {
      title: "Representación sindical y contratos colectivos",
      description:
        "Consultoría e implementación para la legitimación de contratos colectivos y la constancia de representatividad, con representación sindical a nivel nacional.",
      specs:
        "Legitimación: de contratos colectivos de trabajo\nConstancia: de representatividad de mayoría\nRepresentación: sindical a nivel nacional\nModalidad: consultoría, implementación y acompañamiento",
    },
    en: {
      title: "Union representation and collective agreements",
      description:
        "Consulting and implementation for collective bargaining agreement legitimation and majority representation certificates, with nationwide union representation.",
      specs:
        "Legitimation: of collective bargaining agreements\nCertificate: of majority representation\nRepresentation: nationwide union representation\nScope: consulting, implementation and ongoing support",
    },
  },
];

async function main() {
  const deleted = await sql`
    delete from products where slug in ${sql(DEMO_SLUGS)} returning slug
  `;

  let count = 0;
  for (const s of services) {
    for (const locale of ["es", "en"]) {
      const c = s[locale];
      await sql`
        insert into products (slug, locale, category, title, description, specs, image_url)
        values (${s.slug + "-" + locale}, ${locale}, ${s.category}, ${c.title}, ${c.description}, ${c.specs}, ${`/images/servicios/${s.slug}.jpg`})
        on conflict (slug) do update set
          locale = excluded.locale,
          category = excluded.category,
          title = excluded.title,
          description = excluded.description,
          specs = excluded.specs,
          image_url = coalesce(products.image_url, excluded.image_url),
          updated_at = now()
      `;
      count++;
    }
  }

  console.log(`Removed ${deleted.length} demo products, seeded ${count} services.`);
  await sql.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
