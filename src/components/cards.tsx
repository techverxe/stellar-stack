import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Arrow } from "@/components/ui";
import { getCopy } from "@/content/copy";
import {
  type IndustryId,
  type ServiceId,
  type Project,
  projects,
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
          <span className="work-art-glow" />
          <span className="work-art-initial">{copy.client.charAt(0)}</span>
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
    <ul className="grid grid-3" role="list">
      {projects.map((p, i) => (
        <WorkCard key={p.id} locale={locale} project={p} index={i} />
      ))}
    </ul>
  );
}
