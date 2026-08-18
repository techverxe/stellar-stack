import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { WaveField } from "@/components/WaveField";
import { SectionHead, CtaBand, Arrow } from "@/components/ui";
import {
  StaggerList,
  ServicePanel,
  IndustryPanel,
  WorkGrid,
} from "@/components/cards";
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
        {/* Hero: dark, full bleed, bottom aligned over the animated field. */}
        <section className="hero">
          <WaveField />
          <div className="wrap hero-in">
            <Reveal>
              <span className="eyebrow eyebrow-inv">{site.name}</span>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="h-hero">
                {t.home.headline} {t.home.headlineAccent}
              </h1>
            </Reveal>

            <Reveal delay={170}>
              <p className="lede lede-lg">{t.home.lede}</p>
            </Reveal>

            <Reveal delay={250}>
              <Link
                href={path(locale, t.home.primaryCta.section)}
                className="btn btn-primary"
              >
                {t.home.primaryCta.label}
              </Link>
            </Reveal>

            <Reveal delay={330}>
              <p className="hero-foot">
                {t.home.eyebrow} &middot; {site.address.city}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Why us, as staggered pale panels. */}
        <section className="band">
          <div className="wrap">
            <SectionHead
              eyebrow={t.home.whyEyebrow}
              title={t.home.whyTitle}
              lede={t.home.whyLede}
            />
            <StaggerList>
              {t.home.whyPoints.map((p, i) => (
                <Reveal as="li" key={p.title} delay={(i % 2) * 60}>
                  <div className="panel">
                    <h3 className="h-card">{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </StaggerList>
          </div>
        </section>

        {/* Featured work. */}
        <section className="band band-panel" id="work">
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

        {/* Services. */}
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
            <StaggerList>
              {serviceIds.map((id, i) => (
                <ServicePanel key={id} locale={locale} id={id} index={i} />
              ))}
            </StaggerList>
          </div>
        </section>

        {/* The offer, as a dark inset band. */}
        <section className="band-tight">
          <div className="wrap">
            <Reveal className="offer-band">
              <div>
                <span className="eyebrow eyebrow-inv">{t.offer.eyebrow}</span>
                <h2 className="h-panel">{t.home.offerBannerTitle}</h2>
                <p>{t.home.offerBannerBody}</p>
              </div>
              <div className="offer-band-price">
                <span className="price-big">
                  {site.offer.setup}
                  <span className="cur">&euro;</span>
                </span>
                <span className="eyebrow eyebrow-inv">
                  {t.offer.priceSuffix}
                </span>
                <Link href={path(locale, "offer")} className="btn btn-primary">
                  {t.home.offerBannerCta}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Industries, as staggered panels. */}
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
            <StaggerList>
              {industryIds.map((id, i) => (
                <IndustryPanel key={id} locale={locale} id={id} index={i} />
              ))}
            </StaggerList>
          </div>
        </section>

        {/* Process, inside one large pale panel with ruled items. */}
        <section className="band-tight">
          <div className="wrap">
            <Reveal className="feature-panel">
              <span className="eyebrow">{t.home.processEyebrow}</span>
              <h2 className="h-panel" style={{ marginTop: 18 }}>
                {t.home.processTitle}
              </h2>
              <p className="lede">{t.home.processLede}</p>
              <ul className="rule-grid" role="list">
                {t.home.processSteps.map((s) => (
                  <li key={s.step} className="rule-item">
                    <h3 className="h-card">{s.title}</h3>
                    <p>{s.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <CtaBand locale={locale} />
      </main>

      <Footer locale={locale} />
    </>
  );
}
