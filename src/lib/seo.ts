import type { Metadata } from "next";
import { business } from "@/content/business";

export const abs = (p: string) => new URL(p, business.siteUrl).toString();

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": abs("/#business"),
    name: business.name,
    url: business.siteUrl,
    email: business.email,
    description: "Nykyaikaiset kotisivut ja ylläpito pienyrityksille Turussa.",
    priceRange: "EUR 690",
    currenciesAccepted: "EUR",
    address: {
      "@type": "PostalAddress",
      addressLocality: business.city,
      addressCountry: business.country,
    },
    areaServed: business.areaServed.map((n) => ({ "@type": "City", name: n })),
  };
}
