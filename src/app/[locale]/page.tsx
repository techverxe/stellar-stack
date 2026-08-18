import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { WaveField } from "@/components/WaveField";
import { SectionHead, CtaBand, Arrow } from "@/components/ui";
import { StaggerList, ServiceRows, WorkGrid } from "@/components/cards";
import { getCopy } from "@/content/copy";
import { site, panelImages } from "@/content/site";
import { locales, type Locale, isLocale, path } from "@/content/i18n";
import { buildMetadata } from "@/lib/seo";

/**
 * Section order mirrors the reference layout Talha picked:
 *
 *   1. dark hero over the animated field
 *   2. services as a divider-separated row list, in a pale panel that starts
 *      overlapping the hero
 *   3. why us, as staggered alternating panels
 *   4. featured work, as a three column grid
 *   5. one large ruled panel for the local-advantage argument
 *   6. dark footer
 *
 * One deliberate deviation: the reference marks every section heading as an
 * H1, giving five H1s on one page. Ours uses a single H1 for the hero and H2
 * for sections, which is what the export check enforces. Copying that
 * particular detail would be copying a defect.
 */

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
        {/* 1. Hero */}
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

        {/* 2. Services, as rows inside a panel that laps over the hero. */}
        <section className="overlap-panel" id="services">
          <div className="wrap">
            <div className="feature-panel">
              <Reveal>
                <span className="eyebrow">{t.home.servicesEyebrow}</span>
                <h2 className="h-sec" style={{ marginTop: 18 }}>
                  {t.home.servicesTitle}
                </h2>
                <p className="lede">{t.home.servicesLede}</p>
              </Reveal>
              <ServiceRows locale={locale} />
            </div>
          </div>
        </section>

        {/* 3. Why us, staggered. */}
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
                  <div className="panel panel-media">
                    <div className="panel-copy">
                      <h3 className="h-card">{p.title}</h3>
                      <p>{p.body}</p>
                    </div>
                    {panelImages[i] && (
                      <img
                        className="panel-img"
                        src={panelImages[i].src}
                        alt={panelImages[i].alt}
                        loading="lazy"
                        decoding="async"
                        width={920}
                        height={593}
                      />
                    )}
                  </div>
                </Reveal>
              ))}
            </StaggerList>
          </div>
        </section>

        {/* 4. Featured work. */}
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

        {/* 5. The local-advantage panel, with ruled items. */}
        <section className="band">
          <div className="wrap">
            <Reveal className="feature-panel">
              <span className="eyebrow">{t.home.industriesEyebrow}</span>
              <h2 className="h-panel" style={{ marginTop: 18 }}>
                {t.home.industriesTitle}
              </h2>
              <p className="lede">{t.home.industriesLede}</p>
              <ul className="rule-grid" role="list">
                {t.home.processSteps.map((s) => (
                  <li key={s.step} className="rule-item">
                    <h3 className="h-rule">{s.title}</h3>
                    <p>{s.body}</p>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 44 }}>
                <Link href={path(locale, "industries")} className="link-arrow">
                  {t.common.allIndustries} <Arrow />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <CtaBand locale={locale} />
      </main>

      <Footer locale={locale} />
    </>
  );
}
