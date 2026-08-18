/**
 * Locales and URL structure.
 *
 * Finnish is the primary market, so `/fi/` is what the root redirects to.
 * Every locale is prefixed rather than leaving Finnish bare: it keeps the
 * `<html lang>` correct per page, makes hreflang symmetric, and means adding a
 * fourth language later does not move any existing URL.
 *
 * Path segments are translated per locale. A Swedish visitor gets
 * `/sv/tjanster/`, not `/sv/palvelut/`.
 */

export const locales = ["fi", "sv", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fi";

export const localeNames: Record<Locale, string> = {
  fi: "Suomi",
  sv: "Svenska",
  en: "English",
};

/** Short form for the header switcher. */
export const localeShort: Record<Locale, string> = {
  fi: "FI",
  sv: "SV",
  en: "EN",
};

/** BCP 47 tags for <html lang> and Open Graph. */
export const localeTags: Record<Locale, string> = {
  fi: "fi-FI",
  sv: "sv-FI",
  en: "en",
};

export const ogLocales: Record<Locale, string> = {
  fi: "fi_FI",
  sv: "sv_FI",
  en: "en_US",
};

/**
 * The sections of the site. `key` is stable and used everywhere in code; the
 * per-locale value is what appears in the URL.
 */
export const sectionKeys = [
  "services",
  "industries",
  "work",
  "insights",
  "about",
  "contact",
  "offer",
  "privacy",
] as const;

export type SectionKey = (typeof sectionKeys)[number];

export const sectionSlugs: Record<SectionKey, Record<Locale, string>> = {
  services: { fi: "palvelut", sv: "tjanster", en: "services" },
  industries: { fi: "toimialat", sv: "branscher", en: "industries" },
  work: { fi: "referenssit", sv: "referenser", en: "work" },
  insights: { fi: "artikkelit", sv: "artiklar", en: "insights" },
  about: { fi: "meista", sv: "om-oss", en: "about" },
  contact: { fi: "yhteystiedot", sv: "kontakt", en: "contact" },
  offer: { fi: "kampanja", sv: "kampanj", en: "offer" },
  privacy: { fi: "tietosuoja", sv: "dataskydd", en: "privacy" },
};

/** Sections that have child detail pages. */
export const sectionsWithDetail: SectionKey[] = [
  "services",
  "industries",
  "work",
];

/** Reverse lookup: given a locale and a URL segment, which section is it? */
export function sectionFromSlug(
  locale: Locale,
  slug: string,
): SectionKey | null {
  for (const key of sectionKeys) {
    if (sectionSlugs[key][locale] === slug) return key;
  }
  return null;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** `/fi/`, `/sv/palvelut/`, `/en/services/react-app/` and so on. */
export function path(
  locale: Locale,
  section?: SectionKey,
  slug?: string,
): string {
  // Annotated, because inference from the first element would make this
  // Locale[] and reject the section slug on the next line.
  const parts: string[] = [locale];
  if (section) parts.push(sectionSlugs[section][locale]);
  if (slug) parts.push(slug);
  return `/${parts.join("/")}/`;
}

/**
 * Same page in another language. Detail slugs are locale-neutral ids, so only
 * the section segment needs translating.
 */
export function translatePath(
  target: Locale,
  section?: SectionKey,
  slug?: string,
): string {
  return path(target, section, slug);
}
