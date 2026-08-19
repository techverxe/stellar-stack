import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Arrow } from "@/components/ui";
import { getCopy } from "@/content/copy";
import {
  type IndustryId,
  type ServiceId,
  type ArticleId,
  type Project,
  projects,
  serviceIds,
  industryIds,
  articleMeta,
  articleImages,
  serviceImages,
  industryImages,
} from "@/content/site";
import { type Locale, path } from "@/content/i18n";

/**
 * Staggered pale panels: the signature element of this layout. Odd items sit
 * left, even items right, each about 62% of the container width. The alternation
 * is pure CSS (`.stagger > li:nth-child(even)`), so the markup stays a plain
 * ordered list and the pattern cannot drift out of step.
 */
export function StaggerList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="stagger" role="list">
      {children}
    </ul>
  );
}

export function ServicePanel({
  locale,
  id,
  index = 0,
}: {
  locale: Locale;
  id: ServiceId;
  index?: number;
}) {
  const t = getCopy(locale);
  const svc = t.serviceCopy[id];

  return (
    <Reveal as="li" delay={(index % 2) * 60}>
      <Link href={path(locale, "services", id)} className="panel">
        <span className="panel-thumb" aria-hidden="true">
          <img
            src={serviceImages[id]}
            alt=""
            loading="lazy"
            decoding="async"
            width={900}
            height={600}
          />
        </span>
        <h3 className="h-card">{svc.name}</h3>
        <p>{svc.tagline}</p>
        <span className="panel-foot">
          <span className="panel-price">{svc.priceHint}</span>
          <Arrow />
        </span>
      </Link>
    </Reveal>
  );
}

export function IndustryPanel({
  locale,
  id,
  index = 0,
}: {
  locale: Locale;
  id: IndustryId;
  index?: number;
}) {
  const t = getCopy(locale);
  const ind = t.industryCopy[id];

  return (
    <Reveal as="li" delay={(index % 2) * 60}>
      <Link href={path(locale, "industries", id)} className="panel">
        <span className="panel-thumb" aria-hidden="true">
          <img
            src={industryImages[id]}
            alt=""
            loading="lazy"
            decoding="async"
            width={900}
            height={600}
          />
        </span>
        <h3 className="h-card">{ind.name}</h3>
        <p>{ind.tagline}</p>
        <span className="panel-foot">
          <span className="panel-price">{t.common.readMore}</span>
          <Arrow />
        </span>
      </Link>
    </Reveal>
  );
}

/**
 * Work card: a tall art area over a pale footer carrying the client name, a
 * PROJECT URL eyebrow and the domain. The art is a soft accent bloom behind
 * the client's initial rather than a screenshot, because shipping a real
 * screenshot of a site that may change is a maintenance trap, and the
 * Techverxe host is currently down so no screenshot exists for it at all.
 */
export function WorkCard({
  locale,
  project,
  index = 0,
}: {
  locale: Locale;
  project: Project;
  index?: number;
}) {
  const t = getCopy(locale);
  const copy = t.projectCopy[project.id];
  const domain = project.liveUrl.replace(/^https?:\/\//, "");

  return (
    <Reveal as="li" delay={index * 80}>
      <Link
        href={path(locale, "work", project.id)}
        className="work-card"
        style={{ ["--accent" as string]: project.accent }}
      >
        <span className="work-art" aria-hidden="true">
          {project.image ? (
            <img
              src={project.image}
              alt=""
              loading="lazy"
              decoding="async"
              width={828}
              height={637}
            />
          ) : (
            <>
              <span className="work-art-glow" />
              <span className="work-art-initial">{copy.client.charAt(0)}</span>
            </>
          )}
        </span>
        <span className="work-body">
          <h3>{copy.client}</h3>
          <span className="work-summary">{copy.sector}</span>
          <span className="eyebrow">
            {project.linkable ? t.work.projectUrlLabel : t.common.siteOffline}
          </span>
          <span className="work-url">{project.linkable ? domain : "—"}</span>
        </span>
      </Link>
    </Reveal>
  );
}

export function WorkGrid({ locale }: { locale: Locale }) {
  return (
    <ul className="grid grid-work-2" role="list">
      {projects.map((p, i) => (
        <WorkCard key={p.id} locale={locale} project={p} index={i} />
      ))}
    </ul>
  );
}

/**
 * The homepage services block: a divider-separated list of full-width rows,
 * name on the left and an arrow on the right, rather than cards. This is how
 * the reference layout presents its service list, and it scales to any number
 * of services without the ragged last row a grid produces.
 */
export function ServiceRows({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  return (
    <ul className="rows" role="list">
      {serviceIds.map((id, i) => (
        <Reveal as="li" key={id} delay={i * 40}>
          <Link href={path(locale, "services", id)} className="row">
            <span className="row-name">{t.serviceCopy[id].name}</span>
            <span className="row-tagline">{t.serviceCopy[id].tagline}</span>
            <Arrow />
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

/** Same row treatment, used for the industries list. */
export function IndustryRows({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  return (
    <ul className="rows" role="list">
      {industryIds.map((id, i) => (
        <Reveal as="li" key={id} delay={i * 40}>
          <Link href={path(locale, "industries", id)} className="row">
            <span className="row-name">{t.industryCopy[id].name}</span>
            <span className="row-tagline">{t.industryCopy[id].tagline}</span>
            <Arrow />
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

/** Article cards for the insights index and the homepage teaser. */
export function ArticleCard({
  locale,
  id,
  index = 0,
}: {
  locale: Locale;
  id: string;
  index?: number;
}) {
  const t = getCopy(locale);
  const a = t.articleCopy[id];
  const meta = articleMeta[id as ArticleId];
  const image = articleImages[id as ArticleId];
  if (!a) return null;

  return (
    <Reveal as="li" delay={index * 70}>
      <Link href={path(locale, "insights", id)} className="article-card">
        <span className="article-art" aria-hidden="true">
          <img
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            width={900}
            height={600}
          />
        </span>
        <span className="article-card-body">
          <span className="eyebrow">{a.category}</span>
          <h3 className="h-card">{a.title}</h3>
          <p>{a.excerpt}</p>
          <span className="article-foot">
            <span>
              {meta.readMinutes} {t.insights.readTime}
            </span>
            <Arrow />
          </span>
        </span>
      </Link>
    </Reveal>
  );
}
