/**
 * Stellar Stack - locale-neutral business facts.
 *
 * Everything in this file is a FACT, not copy. Translated prose lives in
 * `src/content/copy/{fi,sv,en}.ts`. Anything here that turns out to be wrong
 * is wrong on all three language versions at once, so it is the one file to
 * check before a release.
 */

export const site = {
  name: "Stellar Stack",
  legalName: "Stellar Stack",
  url: "https://stellarstack.fi",

  email: "moi@stellarstack.fi",

  /** Display form, Finnish convention. */
  phoneDisplay: "041 723 0960",
  /** E.164, used for tel: links and structured data. */
  phoneE164: "+358417230960",

  address: {
    street: "Hämeenkatu 09",
    postalCode: "20500",
    city: "Turku",
    countryCode: "FI",
  },

  /** Turku city centre, used for the map embed and LocalBusiness geo. */
  geo: { lat: 60.4518, lng: 22.2666 },

  /**
   * One search URL, reused everywhere the address links out (footer, about
   * page, contact page), so a change to the address only has one call site
   * to update instead of three independently-built query strings.
   */
  get mapsSearchUrl() {
    const q = encodeURIComponent(
      `${this.address.street}, ${this.address.postalCode} ${this.address.city}`,
    );
    return `https://www.google.com/maps/search/?api=1&query=${q}`;
  },

  social: {
    linkedin: "https://www.linkedin.com/company/stellarstack",
  },

  /**
   * The campaign offer. Lives here rather than in copy because the numbers
   * must never drift between the three language versions.
   */
  offer: {
    setup: 699,
    monthly: 39,
    currency: "EUR",
    /** Normal price the campaign is discounted from. */
    setupRegular: 1490,
    deliveryDays: 7,
  },

  vatRate: "25,5 %",
} as const;

/**
 * Portfolio. `liveUrl` is checked at build time by scripts/link-check.mjs, and
 * `linkable: false` keeps a card visible while its site is down instead of
 * shipping a link to nothing.
 *
 * techverxe.com was verified DOWN on 2026-08-18 (curl returns no response;
 * DNS points at a VM removed in the 2026-08-08 GCP reorganization, tracked as
 * PORT-Q3). Flip `linkable` back to true once that host serves again.
 */
export const projects = [
  {
    id: "tikanmaan-huoltoasema",
    liveUrl: "https://tikanmaanhuoltoasema.com",
    linkable: true,
    year: "2026",
    image: "/img/work/tikanmaan.jpeg",
    accent: "#83d6c4",
    stack: [
      "Next.js",
      "Static export",
      "nginx",
      "Google Calendar API",
      "Resend",
    ],
    metrics: [
      { value: "63", key: "pages" },
      { value: "3", key: "languages" },
      { value: "<1s", key: "loadTime" },
    ],
  },
  {
    id: "futuuri",
    liveUrl: "https://futuuri.co",
    linkable: true,
    year: "2026",
    image: "/img/work/futuuri.jpeg",
    accent: "#7fcbbd",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "GCP"],
    metrics: [
      { value: "2", key: "modalities" },
      { value: "EU", key: "dataResidency" },
      { value: "3", key: "languages" },
    ],
  },
  {
    id: "techverxe",
    liveUrl: "https://techverxe.com",
    linkable: false,
    year: "2026",
    image: null,
    accent: "#93ddcd",
    stack: ["Next.js", "TypeScript", "GCP"],
    metrics: [
      { value: "2", key: "offices" },
      { value: "72h", key: "onboarding" },
      { value: "8+", key: "stacks" },
    ],
  },
] as const;

export type Project = (typeof projects)[number];

/** Service ids. Copy for each lives per-locale, keyed by these ids. */
export const serviceIds = [
  "verkkosivut",
  "verkkokauppa",
  "hakukoneoptimointi",
  "mainonta",
  "sisalto",
  "analytiikka",
  "sovelluskehitys",
  "yllapito",
] as const;

export type ServiceId = (typeof serviceIds)[number];

/** Industry ids, covering the four outreach segments. */
export const industryIds = [
  "autoala",
  "rakennus",
  "kiinteistohuolto",
  "ravintolat",
  "kauneus",
  "kauppa",
  "asiantuntijat",
  "terveys",
] as const;

export type IndustryId = (typeof industryIds)[number];

/** Which of the four outreach segments each industry belongs to. */
export const industrySegment: Record<
  IndustryId,
  "trades" | "hospitality" | "professional" | "health"
> = {
  autoala: "trades",
  rakennus: "trades",
  kiinteistohuolto: "trades",
  ravintolat: "hospitality",
  kauneus: "hospitality",
  kauppa: "hospitality",
  asiantuntijat: "professional",
  terveys: "health",
};

/** Insight article ids. Copy for each lives per-locale, keyed by these ids. */
export const articleIds = [
  "kotisivun-hinta",
  "google-business-profiili",
  "sivuston-nopeus",
  "monikielisyys",
  "evasteeton-analytiikka",
] as const;

export type ArticleId = (typeof articleIds)[number];

/** Publication dates, locale-neutral so all three versions agree. */
export const articleMeta: Record<ArticleId, { date: string; readMinutes: number }> = {
  "kotisivun-hinta": { date: "2026-08-04", readMinutes: 6 },
  "google-business-profiili": { date: "2026-07-21", readMinutes: 5 },
  "sivuston-nopeus": { date: "2026-07-08", readMinutes: 4 },
  monikielisyys: { date: "2026-06-19", readMinutes: 5 },
  "evasteeton-analytiikka": { date: "2026-06-02", readMinutes: 4 },
};

/**
 * Imagery for the four staggered homepage panels, in order.
 *
 * Generated rather than photographed or bought: each piece is drawn on a
 * canvas in the site's own palette (near-black navy ground, cool blue-white
 * particles, mint accent) by `scripts/artgen.html`, then screenshotted at 2x
 * and downscaled. That keeps the imagery visually continuous with the hero's
 * point-cloud terrain instead of looking like stock dropped into a slot, and
 * it carries no licence at all.
 *
 * Each maps to its panel's argument: a wave sheared into motion streaks for
 * speed, three offset grids for the three languages, a self-contained
 * isometric lattice for ownership, and concentric signal rings over a ground
 * plane for the local-partner point.
 *
 * To re-render: serve scripts/artgen.html and screenshot ?art=1..4 at
 * 1840x1186, then downscale to 920 wide.
 */
export const panelImages: { src: string; alt: string }[] = [
  { src: "/img/panels/speed.jpeg", alt: "" },
  { src: "/img/panels/languages.jpeg", alt: "" },
  { src: "/img/panels/ownership.jpeg", alt: "" },
  { src: "/img/panels/local.jpeg", alt: "" },
];
