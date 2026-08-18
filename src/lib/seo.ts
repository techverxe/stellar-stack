import type { Metadata } from "next";
import { site } from "@/content/site";
import {
  type Locale,
  type SectionKey,
  locales,
  localeTags,
  ogLocales,
  path,
} from "@/content/i18n";

/**
 * One place that builds page metadata, so canonical URLs and hreflang stay
 * consistent. Every page passes its locale and its position in the route tree
 * and gets the full alternates block back.
 */
export function buildMetadata(opts: {
  locale: Locale;
  title: string;
  description: string;
  section?: SectionKey;
  slug?: string;
  /** Set false on pages that should not be indexed. */
  index?: boolean;
}): Metadata {
  const { locale, title, description, section, slug, index = true } = opts;
  const canonical = `${site.url}${path(locale, section, slug)}`;

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[localeTags[l]] = `${site.url}${path(l, section, slug)}`;
  }
  languages["x-default"] = `${site.url}${path("fi", section, slug)}`;

  return {
    title,
    description,
    metadataBase: new URL(site.url),
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      locale: ogLocales[locale],
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}

/**
 * LocalBusiness structured data. Emitted once per page in the locale layout so
 * search engines get the address, phone and opening hours in a machine
 * readable form, which is what feeds the local pack.
 */
export function localBusinessJsonLd(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#organization`,
    name: site.name,
    description,
    url: `${site.url}${path(locale)}`,
    email: site.email,
    telephone: site.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressCountry: site.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: ["Turku", "Varsinais-Suomi", "Finland"],
    priceRange: "EUR",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    sameAs: [site.social.linkedin],
  };
}

/** Breadcrumb structured data for detail pages. */
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.url}`,
    })),
  };
}

/** FAQ structured data, used on service detail pages and the offer page. */
export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
