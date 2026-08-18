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

export function ServiceCard({
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
    <Reveal as="li" delay={index * 60}>
      <Link href={path(locale, "services", id)} className="card card-service">
        <span className="card-num label">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3>{svc.name}</h3>
        <p>{svc.tagline}</p>
        <span className="card-foot">
          <span className="label label-accent">{svc.priceHint}</span>
          <Arrow />
        </span>
      </Link>
    </Reveal>
  );
}

export function IndustryCard({
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
    <Reveal as="li" delay={index * 60}>
      <Link
        href={path(locale, "industries", id)}
        className="card card-industry"
      >
        <h3>{ind.name}</h3>
        <p>{ind.tagline}</p>
        <span className="card-foot">
          <span className="label">{t.common.readMore}</span>
          <Arrow />
        </span>
      </Link>
    </Reveal>
  );
}

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

  return (
    <Reveal as="li" delay={index * 80}>
      <Link
        href={path(locale, "work", project.id)}
        className="card card-work"
        style={{ ["--accent" as string]: project.accent }}
      >
        <span className="card-work-art" aria-hidden="true">
          <span className="card-work-glow" />
          <span className="card-work-initial">{copy.client.charAt(0)}</span>
        </span>
        <span className="card-work-body">
          <span className="label label-accent">{copy.sector}</span>
          <h3>{copy.client}</h3>
          <p>{copy.summary}</p>
          <span className="card-metrics">
            {project.metrics.map((m) => (
              <span key={m.key}>
                <strong>{m.value}</strong>
                <span className="label">{copy.metricLabels[m.key]}</span>
              </span>
            ))}
          </span>
        </span>
      </Link>
    </Reveal>
  );
}

export function WorkGrid({ locale }: { locale: Locale }) {
  return (
    <ul className="grid grid-work" role="list">
      {projects.map((p, i) => (
        <WorkCard key={p.id} locale={locale} project={p} index={i} />
      ))}
    </ul>
  );
}
