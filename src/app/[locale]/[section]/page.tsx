import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import { ContactForm } from "@/components/ContactForm";
import { PageHero, CtaBand, JsonLd, Check, Arrow } from "@/components/ui";
import {
  StaggerList,
  ServicePanel,
  IndustryPanel,
  WorkGrid,
  ArticleCard,
} from "@/components/cards";
import { getCopy } from "@/content/copy";
import {
  serviceIds,
  industryIds,
  industrySegment,
  articleIds,
  site,
} from "@/content/site";
import {
  locales,
  sectionKeys,
  sectionSlugs,
  sectionFromSlug,
  type Locale,
  type SectionKey,
  isLocale,
  path,
} from "@/content/i18n";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

/**
 * One file renders all seven top-level sections. They share a header, a hero
 * and a closing call to action, and differ only in the body, so splitting them
 * into seven near-identical route files would duplicate the chrome seven times
 * and let the versions drift apart.
 */

export function generateStaticParams() {
  const params: { locale: string; section: string }[] = [];
  for (const locale of locales) {
    for (const key of sectionKeys) {
      params.push({ locale, section: sectionSlugs[key][locale] });
    }
  }
  return params;
}

export const dynamicParams = false;

function resolve(rawLocale: string, rawSection: string) {
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "fi";
  const section = sectionFromSlug(locale, rawSection);
  return { locale, section };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; section: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, section: rawSection } = await params;
  const { locale, section } = resolve(rawLocale, rawSection);
  if (!section) return {};
  const t = getCopy(locale);

  const meta: Record<SectionKey, { title: string; description: string }> = {
    services: {
      title: t.services.metaTitle,
      description: t.services.metaDescription,
    },
    industries: {
      title: t.industries.metaTitle,
      description: t.industries.metaDescription,
    },
    work: { title: t.work.metaTitle, description: t.work.metaDescription },
    insights: {
      title: t.insights.metaTitle,
      description: t.insights.metaDescription,
    },
    about: { title: t.about.metaTitle, description: t.about.metaDescription },
    contact: {
      title: t.contact.metaTitle,
      description: t.contact.metaDescription,
    },
    offer: { title: t.offer.metaTitle, description: t.offer.metaDescription },
    privacy: {
      title: t.privacy.metaTitle,
      description: t.privacy.metaDescription,
    },
  };

  return buildMetadata({
    locale,
    section,
    title: meta[section].title,
    description: meta[section].description,
  });
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ locale: string; section: string }>;
}) {
  const { locale: rawLocale, section: rawSection } = await params;
  const { locale, section } = resolve(rawLocale, rawSection);
  if (!section) notFound();

  return (
    <>
      <Header locale={locale} section={section} />
      <main id="main">
        {section === "services" && <ServicesBody locale={locale} />}
        {section === "industries" && <IndustriesBody locale={locale} />}
        {section === "work" && <WorkBody locale={locale} />}
        {section === "insights" && <InsightsBody locale={locale} />}
        {section === "about" && <AboutBody locale={locale} />}
        {section === "contact" && <ContactBody locale={locale} />}
        {section === "offer" && <OfferBody locale={locale} />}
        {section === "privacy" && <PrivacyBody locale={locale} />}
        {section !== "privacy" && section !== "contact" && (
          <CtaBand locale={locale} />
        )}
      </main>
      <Footer locale={locale} />
    </>
  );
}

/* ------------------------------------------------------------------ */

function ServicesBody({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  return (
    <>
      <PageHero
        eyebrow={t.services.eyebrow}
        title={t.services.title}
        lede={t.services.lede}
      />
      <section className="band">
        <div className="wrap">
          <StaggerList>
            {serviceIds.map((id, i) => (
              <ServicePanel key={id} locale={locale} id={id} index={i} />
            ))}
          </StaggerList>
          <p className="vat-note">{t.common.vatNote}</p>
        </div>
      </section>
    </>
  );
}

function IndustriesBody({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const segments = ["trades", "hospitality", "professional", "health"] as const;

  return (
    <>
      <PageHero
        eyebrow={t.industries.eyebrow}
        title={t.industries.title}
        lede={t.industries.lede}
      />
      <section className="band">
        <div className="wrap">
          {segments.map((seg, si) => {
            const ids = industryIds.filter((id) => industrySegment[id] === seg);
            if (ids.length === 0) return null;
            return (
              <div className="seg" key={seg} style={{ marginBottom: 56 }}>
                <Reveal>
                  <h2
                    className="eyebrow"
                    style={{ display: "block", marginBottom: 20 }}
                  >
                    {t.industries.segments[seg]}
                  </h2>
                </Reveal>
                <StaggerList>
                  {ids.map((id, i) => (
                    <IndustryPanel
                      key={id}
                      locale={locale}
                      id={id}
                      index={i + si}
                    />
                  ))}
                </StaggerList>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

function WorkBody({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  return (
    <>
      <PageHero
        eyebrow={t.work.eyebrow}
        title={t.work.title}
        lede={t.work.lede}
      />
      <section className="band">
        <div className="wrap">
          <WorkGrid locale={locale} />
        </div>
      </section>
    </>
  );
}

function InsightsBody({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  return (
    <>
      <PageHero
        eyebrow={t.insights.eyebrow}
        title={t.insights.title}
        lede={t.insights.lede}
      />
      <section className="band">
        <div className="wrap">
          <ul className="grid grid-3" role="list">
            {articleIds.map((id, i) => (
              <ArticleCard key={id} locale={locale} id={id} index={i} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function AboutBody({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  return (
    <>
      <PageHero
        eyebrow={t.about.eyebrow}
        title={t.about.title}
        lede={t.about.lede}
      />

      <section className="band">
        <div className="wrap prose-wrap">
          <div className="prose">
            {t.about.story.map((p, i) => (
              <Reveal key={i} delay={i * 50}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <aside className="side-card">
            <span className="eyebrow">{t.about.localTitle}</span>
            <p className="muted">{t.about.localBody}</p>
            <span className="eyebrow eyebrow-faint">{t.about.areasTitle}</span>
            <ul role="list" className="tick-list">
              {t.about.areas.map((a) => (
                <li key={a}>
                  <Check />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
            <address className="side-address">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
              <br />
              <a href={`tel:${site.phoneE164}`}>{site.phoneDisplay}</a>
              <br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </address>
          </aside>
        </div>
      </section>

      <section className="band band-panel">
        <div className="wrap">
          <Reveal>
            <h2 className="h-sec" style={{ marginBottom: 48 }}>
              {t.about.valuesTitle}
            </h2>
          </Reveal>
          <ul className="rule-grid" role="list" style={{ marginTop: 0 }}>
            {t.about.values.map((v) => (
              <li key={v.title} className="rule-item">
                <h3 className="h-card">{v.title}</h3>
                <p>{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function ContactBody({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const mapQuery = encodeURIComponent(
    `${site.address.street}, ${site.address.postalCode} ${site.address.city}`,
  );

  return (
    <>
      <PageHero
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        lede={t.contact.lede}
      />

      <section className="band">
        <div className="wrap contact-grid">
          <Reveal>
            <h2 className="h-panel" style={{ marginBottom: 28 }}>
              {t.contact.formTitle}
            </h2>
            <ContactForm locale={locale} />
          </Reveal>

          <Reveal delay={100}>
            <h2 className="h-panel" style={{ marginBottom: 28 }}>
              {t.contact.directTitle}
            </h2>
            <dl className="contact-dl">
              <div>
                <dt className="eyebrow eyebrow-faint">
                  {t.contact.emailLabel}
                </dt>
                <dd>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow eyebrow-faint">
                  {t.contact.phoneLabel}
                </dt>
                <dd>
                  <a href={`tel:${site.phoneE164}`}>{site.phoneDisplay}</a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow eyebrow-faint">
                  {t.contact.addressLabel}
                </dt>
                <dd>
                  <address>
                    {site.address.street}
                    <br />
                    {site.address.postalCode} {site.address.city}
                  </address>
                </dd>
              </div>
              <div>
                <dt className="eyebrow eyebrow-faint">
                  {t.contact.hoursLabel}
                </dt>
                <dd>{t.contact.hours}</dd>
              </div>
            </dl>
            <p className="muted">{t.contact.responseNote}</p>

            <a
              className="map-card"
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="map-grid" aria-hidden="true" />
              <span className="map-pin" aria-hidden="true" />
              <span className="map-label">
                <strong>
                  {site.address.street}, {site.address.city}
                </strong>
                <span className="eyebrow">
                  {t.common.viewSite} <Arrow />
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function OfferBody({ locale }: { locale: Locale }) {
  const t = getCopy(locale);

  return (
    <>
      <JsonLd data={faqJsonLd(t.offer.faq)} />

      <PageHero
        eyebrow={t.offer.eyebrow}
        title={t.offer.headline}
        lede={t.offer.lede}
      >
        <div className="price-cards">
          <div className="price-card is-lead">
            <span className="eyebrow">{t.offer.priceLabel}</span>
            <span className="price-big">
              {site.offer.setup}
              <span className="cur">&euro;</span>
            </span>
            <span className="price-was">
              {t.offer.regularLabel} {site.offer.setupRegular} &euro;
            </span>
            <p>{t.offer.priceSuffix}</p>
            <Link href={path(locale, "contact")} className="btn btn-dark">
              {t.offer.cta}
            </Link>
          </div>
          <div className="price-card">
            <span className="eyebrow">{t.offer.monthlyLabel}</span>
            <span className="price-big">
              {site.offer.monthly}
              <span className="cur">&euro;</span>
            </span>
            <p>{t.offer.monthlySuffix}</p>
          </div>
        </div>
      </PageHero>

      <section className="band">
        <div className="wrap incl-grid">
          <Reveal>
            <h2 className="h-panel" style={{ marginBottom: 28 }}>
              {t.offer.includedTitle}
            </h2>
            <ul className="tick-list" role="list">
              {t.offer.included.map((item) => (
                <li key={item}>
                  <Check />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="h-panel" style={{ marginBottom: 28 }}>
              {t.offer.notIncludedTitle}
            </h2>
            <ul className="cross-list" role="list">
              {t.offer.notIncluded.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">&ndash;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="guarantee">
              <h3>{t.offer.guaranteeTitle}</h3>
              <p>{t.offer.guaranteeBody}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="band band-panel">
        <div className="wrap">
          <Reveal>
            <h2 className="h-sec" style={{ marginBottom: 48 }}>
              {t.offer.timelineTitle}
            </h2>
          </Reveal>
          <ol className="steps" role="list">
            {t.offer.timeline.map((s, i) => (
              <Reveal as="li" key={s.day} delay={i * 80}>
                <span className="eyebrow">{s.day}</span>
                <h3 className="h-card">{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="band">
        <div className="wrap narrow">
          <Faq items={t.offer.faq} title={t.common.faqTitle} />
          <p className="small-print">{t.offer.smallPrint}</p>
        </div>
      </section>
    </>
  );
}

function PrivacyBody({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  return (
    <>
      <PageHero
        eyebrow={t.privacy.updated}
        title={t.privacy.title}
        lede={t.privacy.metaDescription}
      />
      <section className="band">
        <div className="wrap narrow">
          <div className="prose">
            {t.privacy.sections.map((s) => (
              <div key={s.heading}>
                <h2>{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
