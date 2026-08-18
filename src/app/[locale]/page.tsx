import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { SectionHead, CtaBand, Arrow } from "@/components/ui";
import { ServiceCard, IndustryCard, WorkGrid } from "@/components/cards";
import { getCopy } from "@/content/copy";
import { serviceIds, industryIds, site } from "@/content/site";
import { locales, type Locale, isLocale, path } from "@/content/i18n";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "fi";
  const t = getCopy(locale);
  return buildMetadata({
    locale,
    title: t.home.metaTitle,
    description: t.home.metaDescription,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "fi";
  const t = getCopy(locale);

  return (
    <>
      <Header locale={locale} />

      <main id="main">
        {/* Hero */}
        <section className="hero">
          <div className="aurora" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="grid-lines" aria-hidden="true" />

          <div className="wrap hero-in">
            <Reveal>
              <span className="pill">
                <span className="pip" aria-hidden="true" />
                {t.home.eyebrow}
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="display hero-title">
                {t.home.headline}{" "}
                <span className="accent-text">{t.home.headlineAccent}</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="lede lede-lg">{t.home.lede}</p>
            </Reveal>

            <Reveal delay={240} className="hero-actions">
              <Link
                href={path(locale, t.home.primaryCta.section)}
                className="btn btn-primary btn-lg"
              >
                {t.home.primaryCta.label}
              </Link>
              <Link
                href={path(locale, t.home.secondaryCta.section)}
                className="btn btn-ghost btn-lg"
              >
                {t.home.secondaryCta.label}
              </Link>
            </Reveal>

            <Reveal delay={320}>
              <ul className="stats" role="list">
                {t.home.stats.map((s) => (
                  <li key={s.label}>
                    <strong className="display">{s.value}</strong>
                    <span className="label">{s.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Services */}
        <section className="band" id="services">
          <div className="wrap">
            <SectionHead
              eyebrow={t.home.servicesEyebrow}
              title={t.home.servicesTitle}
              lede={t.home.servicesLede}
              action={
                <Link href={path(locale, "services")} className="link-arrow">
                  {t.common.allServices} <Arrow />
                </Link>
              }
            />
            <ul className="grid grid-4" role="list">
              {serviceIds.map((id, i) => (
                <ServiceCard key={id} locale={locale} id={id} index={i} />
              ))}
            </ul>
          </div>
        </section>

        {/* Work */}
        <section className="band band-alt" id="work">
          <div className="wrap">
            <SectionHead
              eyebrow={t.home.workEyebrow}
              title={t.home.workTitle}
              lede={t.home.workLede}
              action={
                <Link href={path(locale, "work")} className="link-arrow">
                  {t.common.allWork} <Arrow />
                </Link>
              }
            />
            <WorkGrid locale={locale} />
          </div>
        </section>

        {/* Industries */}
        <section className="band" id="industries">
          <div className="wrap">
            <SectionHead
              eyebrow={t.home.industriesEyebrow}
              title={t.home.industriesTitle}
              lede={t.home.industriesLede}
              action={
                <Link href={path(locale, "industries")} className="link-arrow">
                  {t.common.allIndustries} <Arrow />
                </Link>
              }
            />
            <ul className="grid grid-4" role="list">
              {industryIds.map((id, i) => (
                <IndustryCard key={id} locale={locale} id={id} index={i} />
              ))}
            </ul>
          </div>
        </section>

        {/* Process */}
        <section className="band band-alt">
          <div className="wrap">
            <SectionHead
              eyebrow={t.home.processEyebrow}
              title={t.home.processTitle}
              lede={t.home.processLede}
            />
            <ol className="steps" role="list">
              {t.home.processSteps.map((s, i) => (
                <Reveal as="li" key={s.step} delay={i * 80}>
                  <span className="step-num display">{s.step}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Offer banner */}
        <section className="band">
          <div className="wrap">
            <Reveal className="offer-banner">
              <div className="offer-banner-copy">
                <span className="label label-accent">{t.offer.eyebrow}</span>
                <h2 className="display">{t.home.offerBannerTitle}</h2>
                <p>{t.home.offerBannerBody}</p>
              </div>
              <div className="offer-banner-price">
                <span className="price-big display">
                  {site.offer.setup}
                  <span className="cur">&euro;</span>
                </span>
                <span className="label">{t.offer.priceSuffix}</span>
                <Link href={path(locale, "offer")} className="btn btn-primary">
                  {t.home.offerBannerCta}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Why us */}
        <section className="band band-alt">
          <div className="wrap">
            <SectionHead
              eyebrow={t.home.whyEyebrow}
              title={t.home.whyTitle}
              lede={t.home.whyLede}
            />
            <ul className="grid grid-2" role="list">
              {t.home.whyPoints.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 70}>
                  <div className="feature">
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <CtaBand locale={locale} />
      </main>

      <Footer locale={locale} />
    </>
  );
}
