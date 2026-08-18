import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import { Breadcrumbs, CtaBand, JsonLd, Check, Arrow } from "@/components/ui";
import { ServiceCard, IndustryCard } from "@/components/cards";
import { getCopy } from "@/content/copy";
import {
  serviceIds,
  industryIds,
  industrySegment,
  projects,
  type ServiceId,
  type IndustryId,
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

  const others = serviceIds.filter((s) => s !== id).slice(0, 3);

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

      <section className="page-hero page-hero-sm">
        <div className="aurora" aria-hidden="true">
          <span />
        </div>
        <div className="wrap">
          <Breadcrumbs
            locale={locale}
            trail={[
              { label: t.nav.services, section: "services" },
              { label: svc.name },
            ]}
          />
          <Reveal>
            <span className="label label-accent">{svc.priceHint}</span>
            <h1 className="display">{svc.name}</h1>
            <p className="lede lede-lg">{svc.intro}</p>
            <Link
              href={path(locale, "contact")}
              className="btn btn-primary btn-lg"
            >
              {t.common.bookCall}
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="band">
        <div className="wrap detail-grid">
          <div className="detail-main">
            {svc.sections.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <div className="detail-block">
                  <h2>{s.title}</h2>
                  <p>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <aside className="side-card">
            <h2 className="label label-accent">{t.common.deliveredIn}</h2>
            <ul className="tick-list" role="list">
              {svc.deliverables.map((d) => (
                <li key={d}>
                  <Check />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {svc.faq.length > 0 && (
        <section className="band band-alt">
          <div className="wrap narrow">
            <Faq items={svc.faq} title={t.common.faqTitle} />
          </div>
        </section>
      )}

      <section className="band">
        <div className="wrap">
          <Reveal>
            <h2 className="display sec-title">{t.common.relatedServices}</h2>
          </Reveal>
          <ul className="grid grid-3" role="list">
            {others.map((s, i) => (
              <ServiceCard key={s} locale={locale} id={s} index={i} />
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
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.common.breadcrumbHome, url: path(locale) },
          { name: t.nav.industries, url: path(locale, "industries") },
          { name: ind.name, url: path(locale, "industries", id) },
        ])}
      />

      <section className="page-hero page-hero-sm">
        <div className="aurora" aria-hidden="true">
          <span />
        </div>
        <div className="wrap">
          <Breadcrumbs
            locale={locale}
            trail={[
              { label: t.nav.industries, section: "industries" },
              { label: ind.name },
            ]}
          />
          <Reveal>
            <span className="label label-accent">
              {t.industries.segments[industrySegment[id]]}
            </span>
            <h1 className="display">{ind.name}</h1>
            <p className="lede lede-lg">{ind.intro}</p>
            <Link
              href={path(locale, "contact")}
              className="btn btn-primary btn-lg"
            >
              {t.common.bookCall}
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <Reveal>
            <h2 className="display sec-title">{ind.tagline}</h2>
          </Reveal>
          <ul className="grid grid-2" role="list">
            {ind.problems.map((p, i) => (
              <Reveal as="li" key={p} delay={i * 60}>
                <div className="problem">
                  <span aria-hidden="true" className="problem-mark">
                    !
                  </span>
                  <p>{p}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="band band-alt">
        <div className="wrap detail-grid">
          <div className="detail-main">
            {ind.solutions.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <div className="detail-block">
                  <h2>{s.title}</h2>
                  <p>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <aside className="side-card">
            <h2 className="label label-accent">{ind.name}</h2>
            <ul className="tick-list" role="list">
              {ind.essentials.map((e) => (
                <li key={e}>
                  <Check />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <Reveal>
            <h2 className="display sec-title">{t.common.industriesWeServe}</h2>
          </Reveal>
          <ul className="grid grid-3" role="list">
            {siblings.map((s, i) => (
              <IndustryCard key={s} locale={locale} id={s} index={i} />
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

      <section
        className="page-hero page-hero-sm work-hero"
        style={{ ["--accent" as string]: project.accent }}
      >
        <div className="aurora" aria-hidden="true">
          <span />
        </div>
        <div className="wrap">
          <Breadcrumbs
            locale={locale}
            trail={[
              { label: t.nav.work, section: "work" },
              { label: copy.client },
            ]}
          />
          <Reveal>
            <span className="label label-accent">
              {copy.sector} &middot; {project.year}
            </span>
            <h1 className="display">{copy.client}</h1>
            <p className="lede lede-lg">{copy.summary}</p>

            {project.linkable ? (
              <a
                href={project.liveUrl}
                className="btn btn-primary btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.common.viewSite} <Arrow />
              </a>
            ) : (
              /* The Techverxe host is down after a server move. Showing a dead
                 link would be worse than showing none, so the button becomes a
                 disabled state with an honest label. */
              <span
                className="btn btn-ghost btn-lg is-disabled"
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
                  <strong className="display">{m.value}</strong>
                  <span className="label">{copy.metricLabels[m.key]}</span>
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
                <h2>{t.work.challengeLabel}</h2>
                <p>{copy.challenge}</p>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <div className="detail-block">
                <h2>{t.work.approachLabel}</h2>
                <p>{copy.approach}</p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="detail-block">
                <h2>{t.work.outcomeLabel}</h2>
                <p>{copy.outcome}</p>
              </div>
            </Reveal>
          </div>
          <aside className="side-card">
            <h2 className="label label-accent">{t.work.stackLabel}</h2>
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
              >
                {project.liveUrl.replace("https://", "")} <Arrow />
              </a>
            )}
          </aside>
        </div>
      </section>

      <section className="band band-alt">
        <div className="wrap">
          <Reveal>
            <h2 className="display sec-title">{t.common.allWork}</h2>
          </Reveal>
          <ul className="grid grid-3" role="list">
            {projects
              .filter((p) => p.id !== id)
              .map((p, i) => (
                <Reveal as="li" key={p.id} delay={i * 70}>
                  <Link
                    href={path(locale, "work", p.id)}
                    className="card card-service"
                  >
                    <h3>{t.projectCopy[p.id].client}</h3>
                    <p>{t.projectCopy[p.id].summary}</p>
                    <span className="card-foot">
                      <span className="label label-accent">
                        {t.projectCopy[p.id].sector}
                      </span>
                      <Arrow />
                    </span>
                  </Link>
                </Reveal>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}
