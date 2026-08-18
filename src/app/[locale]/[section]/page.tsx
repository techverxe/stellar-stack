import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import { ContactForm } from "@/components/ContactForm";
import { PageHero, CtaBand, JsonLd, Check, Arrow } from "@/components/ui";
import { ServiceCard, IndustryCard, WorkGrid } from "@/components/cards";
import { getCopy } from "@/content/copy";
import { serviceIds, industryIds, industrySegment, site } from "@/content/site";
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

  const t = getCopy(locale);

  return (
    <>
      <Header locale={locale} section={section} />
      <main id="main">
        {section === "services" && <ServicesBody locale={locale} />}
        {section === "industries" && <IndustriesBody locale={locale} />}
        {section === "work" && <WorkBody locale={locale} />}
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
          <ul className="grid grid-3" role="list">
            {serviceIds.map((id, i) => (
              <ServiceCard key={id} locale={locale} id={id} index={i} />
            ))}
          </ul>
          <p className="vat-note label">{t.common.vatNote}</p>
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
          {segments.map((seg) => {
            const ids = industryIds.filter((id) => industrySegment[id] === seg);
            if (ids.length === 0) return null;
            return (
              <div className="seg" key={seg}>
                <Reveal>
                  <h2 className="seg-title">
                    <span className="label label-accent">
                      {t.industries.segments[seg]}
                    </span>
                  </h2>
                </Reveal>
                <ul className="grid grid-3" role="list">
                  {ids.map((id, i) => (
                    <IndustryCard key={id} locale={locale} id={id} index={i} />
                  ))}
                </ul>
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
            <h2 className="label label-accent">{t.about.localTitle}</h2>
            <p>{t.about.localBody}</p>
            <h3 className="label">{t.about.areasTitle}</h3>
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

      <section className="band band-alt">
        <div className="wrap">
          <Reveal>
            <h2 className="display sec-title">{t.about.valuesTitle}</h2>
          </Reveal>
          <ul className="grid grid-2" role="list">
            {t.about.values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 70}>
                <div className="feature">
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </div>
              </Reveal>
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
          <Reveal className="contact-form-col">
            <h2 className="sec-title">{t.contact.formTitle}</h2>
            <ContactForm locale={locale} />
          </Reveal>

          <Reveal className="contact-info-col" delay={100}>
            <h2 className="sec-title">{t.contact.directTitle}</h2>
            <dl className="contact-dl">
              <div>
                <dt className="label">{t.contact.emailLabel}</dt>
                <dd>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
              <div>
                <dt className="label">{t.contact.phoneLabel}</dt>
                <dd>
                  <a href={`tel:${site.phoneE164}`}>{site.phoneDisplay}</a>
                </dd>
              </div>
              <div>
                <dt className="label">{t.contact.addressLabel}</dt>
                <dd>
                  <address>
                    {site.address.street}
                    <br />
                    {site.address.postalCode} {site.address.city}
                  </address>
                </dd>
              </div>
              <div>
                <dt className="label">{t.contact.hoursLabel}</dt>
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
                <span className="label">
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

      <section className="page-hero offer-hero">
        <div className="aurora" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="wrap">
          <Reveal>
            <span className="pill">
              <span className="pip" aria-hidden="true" />
              {t.offer.eyebrow}
            </span>
            <h1 className="display">{t.offer.headline}</h1>
            <p className="lede lede-lg">{t.offer.lede}</p>
          </Reveal>

          <Reveal delay={140} className="price-cards">
            <div className="price-card is-lead">
              <span className="label">{t.offer.priceLabel}</span>
              <span className="price-big display">
                {site.offer.setup}
                <span className="cur">&euro;</span>
              </span>
              <span className="price-was">
                {t.offer.regularLabel} {site.offer.setupRegular} &euro;
              </span>
              <p>{t.offer.priceSuffix}</p>
              <Link
                href={path(locale, "contact")}
                className="btn btn-primary btn-lg"
              >
                {t.offer.cta}
              </Link>
            </div>
            <div className="price-card">
              <span className="label">{t.offer.monthlyLabel}</span>
              <span className="price-big display">
                {site.offer.monthly}
                <span className="cur">&euro;</span>
              </span>
              <p>{t.offer.monthlySuffix}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="band">
        <div className="wrap incl-grid">
          <Reveal>
            <h2 className="sec-title">{t.offer.includedTitle}</h2>
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
            <h2 className="sec-title">{t.offer.notIncludedTitle}</h2>
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

      <section className="band band-alt">
        <div className="wrap">
          <Reveal>
            <h2 className="display sec-title">{t.offer.timelineTitle}</h2>
          </Reveal>
          <ol className="steps" role="list">
            {t.offer.timeline.map((s, i) => (
              <Reveal as="li" key={s.day} delay={i * 80}>
                <span className="step-num label label-accent">{s.day}</span>
                <h3>{s.title}</h3>
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
      <section className="page-hero page-hero-sm">
        <div className="wrap">
          <h1 className="display">{t.privacy.title}</h1>
          <p className="label">{t.privacy.updated}</p>
        </div>
      </section>
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
