import type { IndustryId, ServiceId } from "@/content/site";
import type { SectionKey } from "@/content/i18n";

/**
 * The full copy contract. Every locale file implements this exact shape, so a
 * missing translation is a TypeScript error rather than a blank section that
 * only shows up when somebody visits the Swedish site.
 */

export interface Cta {
  label: string;
  /** Section to link to. Omit for an on-page anchor given by `anchor`. */
  section?: SectionKey;
  anchor?: string;
}

export interface Feature {
  title: string;
  body: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ServiceCopy {
  name: string;
  /** One line, used on cards and in nav menus. */
  tagline: string;
  /** Shown under the H1 on the detail page. */
  intro: string;
  priceHint: string;
  /** What is actually delivered. */
  deliverables: string[];
  /** Why it matters, longer form, for the detail page. */
  sections: Feature[];
  faq: FaqItem[];
  metaTitle: string;
  metaDescription: string;
}

export interface IndustryCopy {
  name: string;
  tagline: string;
  intro: string;
  /** The problems this industry actually has with its web presence. */
  problems: string[];
  /** What we build for them. */
  solutions: Feature[];
  /** Concrete examples of pages or features this industry needs. */
  essentials: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface ProjectCopy {
  client: string;
  sector: string;
  summary: string;
  /** Detail page narrative. */
  challenge: string;
  approach: string;
  outcome: string;
  /** Labels for the three metrics defined in site.ts. */
  metricLabels: Record<string, string>;
  metaTitle: string;
  metaDescription: string;
}

export interface Copy {
  /** Global chrome. */
  nav: {
    services: string;
    industries: string;
    work: string;
    about: string;
    contact: string;
    offer: string;
    menu: string;
    close: string;
    languageLabel: string;
    skipToContent: string;
    home: string;
  };

  common: {
    readMore: string;
    allServices: string;
    allIndustries: string;
    allWork: string;
    getInTouch: string;
    bookCall: string;
    viewSite: string;
    siteOffline: string;
    backTo: string;
    from: string;
    vatNote: string;
    deliveredIn: string;
    faqTitle: string;
    relatedServices: string;
    industriesWeServe: string;
    breadcrumbHome: string;
  };

  home: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    lede: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    stats: { value: string; label: string }[];
    trustLine: string;

    servicesEyebrow: string;
    servicesTitle: string;
    servicesLede: string;

    industriesEyebrow: string;
    industriesTitle: string;
    industriesLede: string;

    workEyebrow: string;
    workTitle: string;
    workLede: string;

    processEyebrow: string;
    processTitle: string;
    processLede: string;
    processSteps: { step: string; title: string; body: string }[];

    whyEyebrow: string;
    whyTitle: string;
    whyLede: string;
    whyPoints: Feature[];

    offerBannerTitle: string;
    offerBannerBody: string;
    offerBannerCta: string;
  };

  services: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lede: string;
  };

  industries: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lede: string;
    segments: Record<
      "trades" | "hospitality" | "professional" | "health",
      string
    >;
  };

  work: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lede: string;
    challengeLabel: string;
    approachLabel: string;
    outcomeLabel: string;
    stackLabel: string;
    projectUrlLabel: string;
  };

  about: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lede: string;
    story: string[];
    valuesTitle: string;
    values: Feature[];
    localTitle: string;
    localBody: string;
    areasTitle: string;
    areas: string[];
  };

  contact: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lede: string;
    formTitle: string;
    formNote: string;
    fields: {
      name: string;
      company: string;
      email: string;
      phone: string;
      service: string;
      servicePlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
    };
    directTitle: string;
    addressLabel: string;
    emailLabel: string;
    phoneLabel: string;
    hoursLabel: string;
    hours: string;
    responseNote: string;
  };

  offer: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    headline: string;
    lede: string;
    priceLabel: string;
    priceSuffix: string;
    regularLabel: string;
    monthlyLabel: string;
    monthlySuffix: string;
    includedTitle: string;
    included: string[];
    notIncludedTitle: string;
    notIncluded: string[];
    timelineTitle: string;
    timeline: { day: string; title: string; body: string }[];
    guaranteeTitle: string;
    guaranteeBody: string;
    cta: string;
    faq: FaqItem[];
    smallPrint: string;
  };

  privacy: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    updated: string;
    sections: { heading: string; body: string[] }[];
  };

  footer: {
    tagline: string;
    servicesTitle: string;
    companyTitle: string;
    contactTitle: string;
    rights: string;
    businessIdPending: string;
  };

  notFound: {
    title: string;
    body: string;
    cta: string;
  };

  serviceCopy: Record<ServiceId, ServiceCopy>;
  industryCopy: Record<IndustryId, IndustryCopy>;
  projectCopy: Record<string, ProjectCopy>;
}
