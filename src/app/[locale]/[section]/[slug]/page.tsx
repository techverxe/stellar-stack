import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { WaveField } from "@/components/WaveField";
import { Faq } from "@/components/Faq";
import { Breadcrumbs, CtaBand, JsonLd, Check, Arrow } from "@/components/ui";
import {
  ServicePanel,
  IndustryPanel,
  ArticleCard,
} from "@/components/cards";
import { getCopy } from "@/content/copy";
import {
  serviceIds,
  industryIds,
  industrySegment,
  projects,
  articleIds,
  articleMeta,
  readingMinutes,
  articleImages,
  serviceImages,
  industryImages,
  type ServiceId,
  type IndustryId,
  type ArticleId,
} from "@/content/site";
import {
  locales,
  sectionSlugs,
  sectionFromSlug,
  type Locale,
  isLocale,
  path,
} from "@/content/i18n";
import { buildMetadata, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";

/**
 * Detail pages for the three sections that have children. Slugs are the
 * locale-neutral ids from site.ts, so `/fi/palvelut/verkkosivut/` and
 * `/en/services/verkkosivut/` are the same page in two languages. Translating
 * the slug too would double the URL surface for no SEO gain and break the
 * language switcher's ability to map a page to its counterpart.
 */

export function generateStaticParams() {
  const params: { locale: string; section: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of serviceIds) {
      params.push({ locale, section: sectionSlugs.services[locale], slug });
    }
    for (const slug of industryIds) {
      params.push({ locale, section: sectionSlugs.industries[locale], slug });
    }
    for (const project of projects) {
      params.push({
        locale,
        section: sectionSlugs.work[locale],
        slug: project.id,
      });
    }
    for (const slug of articleIds) {
      params.push({ locale, section: sectionSlugs.insights[locale], slug });
    }
  }
  return params;
}

export const dynamicParams = false;

function resolve(rawLocale: string, rawSection: string) {
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "fi";
  return { locale, section: sectionFromSlug(locale, rawSection) };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; section: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, section: rawSection, slug } = await params;
  const { locale, section } = resolve(rawLocale, rawSection);
  if (!section) return {};
  const t = getCopy(locale);

  if (section === "services" && slug in t.serviceCopy) {
    const s = t.serviceCopy[slug as ServiceId];
    return buildMetadata({
      locale,
      section,
      slug,
      title: s.metaTitle,
      description: s.metaDescription,
    });
  }
  if (section === "industries" && slug in t.industryCopy) {
    const i = t.industryCopy[slug as IndustryId];
    return buildMetadata({
      locale,
      section,
      slug,
      title: i.metaTitle,
      description: i.metaDescription,
    });
  }
  if (section === "insights" && slug in t.articleCopy) {
    const a = t.articleCopy[slug];
    return buildMetadata({
      locale,
      section,
      slug,
      title: a.metaTitle,
      description: a.metaDescription,
    });
  }
  if (section === "work" && slug in t.projectCopy) {
    const p = t.projectCopy[slug];
    return buildMetadata({
      locale,
      section,
      slug,
      title: p.metaTitle,
      description: p.metaDescription,
    });
  }
  return {};
}

export default async function DetailPage({
  params,
}: {
  params: Promise<{ locale: string; section: string; slug: string }>;
}) {
  const { locale: rawLocale, section: rawSection, slug } = await params;
  const { locale, section } = resolve(rawLocale, rawSection);
  if (!section) notFound();

  return (
    <>
      <Header locale={locale} section={section} slug={slug} />
      <main id="main">
        {section === "services" && (
          <ServiceDetail locale={locale} id={slug as ServiceId} />
        )}
        {section === "industries" && (
          <IndustryDetail locale={locale} id={slug as IndustryId} />
        )}
        {section === "work" && <WorkDetail locale={locale} id={slug} />}
        {section === "insights" && <ArticleDetail locale={locale} id={slug} />}
        <CtaBand locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}

/* ------------------------------------------------------------------ */

function ServiceDetail({ locale, id }: { locale: Locale; id: ServiceId }) {
  const t = getCopy(locale);
  const svc = t.serviceCopy[id];
  if (!svc) notFound();

  const others = serviceIds.filter((s) => s !== id).slice(0, 4);

  return (
    <>
      <JsonLd data={faqJsonLd(svc.faq)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.common.breadcrumbHome, url: path(locale) },
          { name: t.nav.services, url: path(locale, "services") },
          { name: svc.name, url: path(locale, "services", id) },
        ])}
      />

      <section className="page-hero">
        <WaveField />
        <div className="wrap">
          <Breadcrumbs
            locale={locale}
            trail={[
              { label: t.nav.services, section: "services" },
              { label: svc.name },
            ]}
          />
          <Reveal>
            <span className="eyebrow eyebrow-inv">{svc.priceHint}</span>
            <h1 className="h-sec">{svc.name}</h1>
            <p className="lede lede-lg">{svc.intro}</p>
            <Link href={path(locale, "contact")} className="btn btn-primary">
              {t.common.bookCall}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Band 2. A light panel offset to the right with the photograph
          breaking out of its left edge, and the approach stated as a stacked
          list beside it. Measured off the reference's own service page, which
          runs panel 944@432 with a 558 square image at x=65 overlapping it;
          ours keeps the composition and the proportions without copying a
          single word of theirs. */}
      <section className="band band-tight">
        <div className="wrap">
          <div className="offset-panel">
            <span className="offset-panel-art" aria-hidden="true">
              <img
                src={serviceImages[id]}
                alt=""
                loading="lazy"
                decoding="async"
                width={900}
                height={600}
              />
            </span>
            <div className="offset-panel-body">
              <Reveal>
                <h2 className="h-sec">{t.serviceDetail.approachTitle}</h2>
              </Reveal>
              <ul className="offset-list" role="list">
                {svc.sections.map((sec, i) => (
                  <Reveal as="li" key={sec.title} delay={i * 70}>
                    <h3 className="h-card">{sec.title}</h3>
                    <p>{sec.body}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Band 3. The deliverables as a named capabilities grid rather than a
          sidebar tick list. The reference gives this its own full-width band
          with a section heading and a two-column grid; a sidebar buried the
          same content next to the prose. */}
      <section className="band band-tight">
        <div className="wrap">
          <Reveal>
            <h2 className="h-sec">{t.serviceDetail.capabilitiesTitle}</h2>
          </Reveal>
          <ul className="cap-grid" role="list">
            {svc.deliverables.map((d, i) => (
              <Reveal as="li" key={d} delay={(i % 2) * 60}>
                <Check />
                <span>{d}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Band 4. A pricing panel, text left and artwork right, which the
          reference carries on every service page and we did not carry at all.
          It is also the question every visitor actually has. */}
      <section className="band band-tight">
        <div className="wrap">
          <div className="price-panel">
            <div className="price-panel-body">
              <Reveal>
                <span className="eyebrow">{svc.priceHint}</span>
                <h2 className="h-sec">{t.serviceDetail.pricingTitle}</h2>
                <p className="lede">{t.serviceDetail.pricingBody}</p>
                <p className="price-note">{t.serviceDetail.pricingNote}</p>
                <Link href={path(locale, "contact")} className="btn btn-primary">
                  {t.common.bookCall}
                </Link>
              </Reveal>
            </div>
            <span className="price-panel-art" aria-hidden="true">
              <img
                src={articleImages["kotisivun-hinta"]}
                alt=""
                loading="lazy"
                decoding="async"
                width={900}
                height={600}
              />
            </span>
          </div>
        </div>
      </section>

      {svc.faq.length > 0 && (
        <section className="band band-panel">
          <div className="wrap narrow">
            <Faq items={svc.faq} title={t.common.faqTitle} />
          </div>
        </section>
      )}

      <section className="band">
        <div className="wrap">
          <Reveal>
            <h2 className="h-sec" style={{ marginBottom: 48 }}>
              {t.common.relatedServices}
            </h2>
          </Reveal>
          <ul className="grid grid-2" role="list">
            {others.map((s, i) => (
              <ServicePanel key={s} locale={locale} id={s} index={i} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function IndustryDetail({ locale, id }: { locale: Locale; id: IndustryId }) {
  const t = getCopy(locale);
  const ind = t.industryCopy[id];
  if (!ind) notFound();

  const siblings = industryIds
    .filter((i) => i !== id && industrySegment[i] === industrySegment[id])
    .concat(
      industryIds.filter(
        (i) => i !== id && industrySegment[i] !== industrySegment[id],
      ),
    )
    .slice(0, 4);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.common.breadcrumbHome, url: path(locale) },
          { name: t.nav.industries, url: path(locale, "industries") },
          { name: ind.name, url: path(locale, "industries", id) },
        ])}
      />

      <section className="page-hero">
        <WaveField />
        <div className="wrap">
          <Breadcrumbs
            locale={locale}
            trail={[
              { label: t.nav.industries, section: "industries" },
              { label: ind.name },
            ]}
          />
          <Reveal>
            <span className="eyebrow eyebrow-inv">
              {t.industries.segments[industrySegment[id]]}
            </span>
            <h1 className="h-sec">{ind.name}</h1>
            <p className="lede lede-lg">{ind.intro}</p>
            <Link href={path(locale, "contact")} className="btn btn-primary">
              {t.common.bookCall}
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="band band-tight">
        <div className="wrap">
          <Reveal>
            <h2 className="h-sec" style={{ marginBottom: 48 }}>
              {ind.tagline}
            </h2>
          </Reveal>
          <ul className="rule-grid" role="list" style={{ marginTop: 0 }}>
            {ind.problems.map((p) => (
              <li key={p} className="rule-item">
                <p>{p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Same offset composition as the service pages: the photograph breaks
          out of a right-offset panel and the answers sit beside it. The
          industry pages carried the identical sidebar-and-prose layout the
          service pages did, and the reference gives both this treatment. */}
      <section className="band band-tight">
        <div className="wrap">
          <div className="offset-panel">
            <span className="offset-panel-art" aria-hidden="true">
              <img
                src={industryImages[id]}
                alt=""
                loading="lazy"
                decoding="async"
                width={900}
                height={600}
              />
            </span>
            <div className="offset-panel-body">
              <Reveal>
                <h2 className="h-sec">{t.serviceDetail.approachTitle}</h2>
              </Reveal>
              <ul className="offset-list" role="list">
                {ind.solutions.map((sol, i) => (
                  <Reveal as="li" key={sol.title} delay={i * 70}>
                    <h3 className="h-card">{sol.title}</h3>
                    <p>{sol.body}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="band band-tight">
        <div className="wrap">
          <Reveal>
            <h2 className="h-sec">{t.serviceDetail.capabilitiesTitle}</h2>
          </Reveal>
          <ul className="cap-grid" role="list">
            {ind.essentials.map((e, i) => (
              <Reveal as="li" key={e} delay={(i % 2) * 60}>
                <Check />
                <span>{e}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <Reveal>
            <h2 className="h-sec" style={{ marginBottom: 48 }}>
              {t.common.industriesWeServe}
            </h2>
          </Reveal>
          <ul className="grid grid-2" role="list">
            {siblings.map((s, i) => (
              <IndustryPanel key={s} locale={locale} id={s} index={i} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function WorkDetail({ locale, id }: { locale: Locale; id: string }) {
  const t = getCopy(locale);
  const project = projects.find((p) => p.id === id);
  const copy = t.projectCopy[id];
  if (!project || !copy) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.common.breadcrumbHome, url: path(locale) },
          { name: t.nav.work, url: path(locale, "work") },
          { name: copy.client, url: path(locale, "work", id) },
        ])}
      />

      <section className="page-hero">
        <WaveField />
        <div className="wrap">
          <Breadcrumbs
            locale={locale}
            trail={[
              { label: t.nav.work, section: "work" },
              { label: copy.client },
            ]}
          />
          <Reveal>
            <span className="eyebrow eyebrow-inv">
              {copy.sector} &middot; {project.year}
            </span>
            <h1 className="h-sec">{copy.client}</h1>
            <p className="lede lede-lg">{copy.summary}</p>

            {project.linkable ? (
              <a
                href={project.liveUrl}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.common.viewSite} <Arrow />
              </a>
            ) : (
              /* The Techverxe host is down after a server move. Showing a dead
                 link would be worse than showing none, so the control becomes a
                 disabled state with an honest label. */
              <span
                className="btn btn-ghost-inv is-disabled"
                aria-disabled="true"
              >
                {t.common.siteOffline}
              </span>
            )}
          </Reveal>

          <Reveal delay={140}>
            <ul className="metrics-row" role="list">
              {project.metrics.map((m) => (
                <li key={m.key}>
                  <strong>{m.value}</strong>
                  <span className="eyebrow">{copy.metricLabels[m.key]}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="band">
        <div className="wrap detail-grid">
          <div className="detail-main">
            <Reveal>
              <div className="detail-block">
                <h2 className="h-card">{t.work.challengeLabel}</h2>
                <p>{copy.challenge}</p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="detail-block">
                <h2 className="h-card">{t.work.approachLabel}</h2>
                <p>{copy.approach}</p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="detail-block">
                <h2 className="h-card">{t.work.outcomeLabel}</h2>
                <p>{copy.outcome}</p>
              </div>
            </Reveal>
          </div>
          <aside className="side-card">
            <span className="eyebrow">{t.work.stackLabel}</span>
            <ul className="chips" role="list">
              {project.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            {project.linkable && (
              <a
                href={project.liveUrl}
                className="link-arrow"
                target="_blank"
                rel="noopener noreferrer"
                style={{ alignSelf: "flex-start" }}
              >
                {project.liveUrl.replace("https://", "")} <Arrow />
              </a>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}

function ArticleDetail({ locale, id }: { locale: Locale; id: string }) {
  const t = getCopy(locale);
  const a = t.articleCopy[id];
  const meta = articleMeta[id as ArticleId];
  if (!a || !meta) notFound();

  const others = articleIds.filter((x) => x !== id).slice(0, 3);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.common.breadcrumbHome, url: path(locale) },
          { name: t.nav.insights, url: path(locale, "insights") },
          { name: a.title, url: path(locale, "insights", id) },
        ])}
      />

      <section className="page-hero">
        <WaveField />
        <div className="wrap">
          <Breadcrumbs
            locale={locale}
            trail={[
              { label: t.nav.insights, section: "insights" },
              { label: a.category },
            ]}
          />
          <Reveal>
            <span className="eyebrow eyebrow-inv">{a.category}</span>
            <h1 className="h-sec">{a.title}</h1>
            <p className="lede lede-lg">{a.excerpt}</p>
            <p className="article-meta">
              {t.insights.published} {meta.date} &middot; {readingMinutes(a.body)}{" "}
              {t.insights.readTime}
            </p>
          </Reveal>
        </div>
      </section>

      <div className="wrap narrow article-banner-wrap">
        <span className="article-banner" aria-hidden="true">
          <img
            src={articleImages[id as ArticleId]}
            alt=""
            loading="lazy"
            decoding="async"
            width={900}
            height={600}
          />
        </span>
      </div>

      <section className="band">
        <div className="wrap narrow">
          <article className="prose article-body">
            {a.body.map((block, i) =>
              "h" in block ? (
                <h2 key={i}>{block.h}</h2>
              ) : (
                <p key={i}>{block.p}</p>
              ),
            )}
          </article>
        </div>
      </section>

      <section className="band band-panel">
        <div className="wrap">
          <Reveal>
            <h2 className="h-sec" style={{ marginBottom: 48 }}>
              {t.insights.moreArticles}
            </h2>
          </Reveal>
          <ul className="grid grid-3" role="list">
            {others.map((x, i) => (
              <ArticleCard key={x} locale={locale} id={x} index={i} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
