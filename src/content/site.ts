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
 * Portfolio. `linkable: false` keeps a card visible while its site is down
 * instead of shipping a link to nothing.
 *
 * techverxe.com was verified DOWN on 2026-08-18 (curl returned no response on
 * either protocol; DNS pointed at a VM removed in the 2026-08-08 GCP
 * reorganization, tracked as PORT-Q3), then verified back UP later the same
 * day: HTTP 200, real page content, same IP (35.228.32.97) now actually
 * serving. `linkable` flipped to true on that basis. If it goes down again,
 * flip it back and update this note with the new date.
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
    linkable: true,
    year: "2026",
    image: "/img/work/techverxe.jpeg",
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
export const articleMeta: Record<ArticleId, { date: string }> = {
  "kotisivun-hinta": { date: "2026-08-04" },
  "google-business-profiili": { date: "2026-07-21" },
  "sivuston-nopeus": { date: "2026-07-08" },
  monikielisyys: { date: "2026-06-19" },
  "evasteeton-analytiikka": { date: "2026-06-02" },
};

/**
 * Reading time, COMPUTED from the article that is actually rendered.
 *
 * It used to be a hand-written number in the record above, locale-neutral,
 * and every article claimed 8 or 9 minutes. Measured against the real text
 * they run 1.2 to 2.3 minutes depending on language: an overstatement of four
 * to five times, printed on every article card and article page in all three
 * languages. A number a visitor can check by reading the page is the worst
 * kind to inflate, and a hand-maintained one drifts the moment anyone edits
 * the body.
 *
 * 200 words per minute is the ordinary convention for prose. Rounded up, with
 * a floor of one minute, and computed per locale because the Finnish text is
 * consistently shorter than the English for the same article.
 */
export function readingMinutes(body: ({ h: string } | { p: string })[]): number {
  const words = body
    .map((b) => ("p" in b ? b.p : b.h))
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * Service and industry header images.
 *
 * Real licensed stock photography, same rationale as the article images
 * below: an editorial or sectoral header image is illustrative, and the
 * generated canvas art belongs to the homepage panels where it reads as
 * this brand's own visual language rather than as a stand-in for a photo.
 *
 * Every industry image shows the actual trade (a workshop, a site, a
 * kitchen, a salon, a shop floor, a clinic), because an industry page whose
 * only picture is another laptop tells a plumber nothing about whether this
 * agency understands plumbers.
 *
 * All Unsplash License (free for commercial use, no permission required),
 * each cropped to a common 900x600 so the layout cannot shift per page.
 */
export const serviceImages: Record<ServiceId, string> = {
  verkkosivut: "/img/services/verkkosivut.jpeg",
  verkkokauppa: "/img/services/verkkokauppa.jpeg",
  hakukoneoptimointi: "/img/services/hakukoneoptimointi.jpeg",
  mainonta: "/img/services/mainonta.jpeg",
  sisalto: "/img/services/sisalto.jpeg",
  analytiikka: "/img/services/analytiikka.jpeg",
  sovelluskehitys: "/img/services/sovelluskehitys.jpeg",
  yllapito: "/img/services/yllapito.jpeg",
};

export const industryImages: Record<IndustryId, string> = {
  autoala: "/img/industries/autoala.jpeg",
  rakennus: "/img/industries/rakennus.jpeg",
  kiinteistohuolto: "/img/industries/kiinteistohuolto.jpeg",
  ravintolat: "/img/industries/ravintolat.jpeg",
  kauneus: "/img/industries/kauneus.jpeg",
  kauppa: "/img/industries/kauppa.jpeg",
  asiantuntijat: "/img/industries/asiantuntijat.jpeg",
  terveys: "/img/industries/terveys.jpeg",
};

/**
 * Article header images. Unlike the generated panel artwork below, these are
 * real photographs: licensed stock, not this brand's own canvas art, because
 * an editorial header image is conventionally illustrative rather than
 * documentary, the same way the panels are not. Each is decorative (the
 * card and detail page both mark it `alt=""`, since the surrounding text
 * already carries the accessible content), so no locale-specific alt text
 * is needed.
 *
 * All five are Unsplash License (free for commercial use, no permission
 * required): Jakub Żerdzicki, Anandhu Chandran, Taylor Vick, Joachim
 * Schnürle, Zaqy Al Fattah.
 */
export const articleImages: Record<ArticleId, string> = {
  "kotisivun-hinta": "/img/insights/kotisivun-hinta.jpeg",
  "google-business-profiili": "/img/insights/google-business-profiili.jpeg",
  "sivuston-nopeus": "/img/insights/sivuston-nopeus.jpeg",
  monikielisyys: "/img/insights/monikielisyys.jpeg",
  "evasteeton-analytiikka": "/img/insights/evasteeton-analytiikka.jpeg",
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
 * Photographs, one per why-us panel, in the order the points appear: an
 * agreement in writing for the fixed price, an hourglass for the one-week
 * timeline, a search on a phone for being found, and a small shop counter for
 * keeping what is yours.
 *
 * These replaced a set that was half generated artwork and half amateur
 * Commons snapshots. Talha's objection was that they were not proper stock
 * and that the POINTS themselves carried no customer value; the copy was
 * rewritten with them, so each image now illustrates a specific worry a small
 * business already has rather than decorating a technical boast.
 *
 * All four are Unsplash Licence: free for commercial use, no attribution
 * required, which is why `photoCredits` below is empty. Cropped to a uniform
 * 920x593 so no panel can shift layout against another.
 *
 * alt is deliberately empty on all four: the site's convention is that
 * imagery is decorative and the adjacent panel text carries the meaning.
 */
export const photoCredits: {
  file: string;
  title: string;
  author: string;
  licence: string;
  licenceUrl: string;
  source: string;
}[] = [];

export const panelImages: { src: string; alt: string }[] = [
  { src: "/img/panels/price.jpeg", alt: "" },
  { src: "/img/panels/timeline.jpeg", alt: "" },
  { src: "/img/panels/visibility.jpeg", alt: "" },
  { src: "/img/panels/ownership.jpeg", alt: "" },
];
