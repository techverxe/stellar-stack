import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { WaveField } from "@/components/WaveField";
import { getCopy } from "@/content/copy";
import { type Locale, type SectionKey, path } from "@/content/i18n";

/** Serialises structured data into the document. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Built from our own content files, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Eyebrow, then a large light heading, then an optional lede. Left aligned and
 * generously spaced. `action` puts a link on the right of the heading row.
 */
export function SectionHead({
  eyebrow,
  title,
  lede,
  action,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  action?: ReactNode;
}) {
  return (
    <Reveal className="sec-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="h-sec">{title}</h2>
      {(lede || action) && (
        /* Lede first, then the action. An earlier version put the action
           beside the heading in a flex row, which wrapped the moment a
           heading ran to two lines and left the link stranded mid-block. */
        <div className="sec-head-row">
          {lede && <p className="lede">{lede}</p>}
          {action}
        </div>
      )}
    </Reveal>
  );
}

/**
 * Inner-page hero. Same dark treatment as the homepage hero so the header's
 * transparent-over-dark state is correct on every route, just shorter and
 * without the full wave field.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <WaveField />
      <div className="wrap">
        <Reveal>
          <span className="eyebrow eyebrow-inv">{eyebrow}</span>
          <h1 className="h-sec">{title}</h1>
          <p className="lede lede-lg">{lede}</p>
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export function Breadcrumbs({
  locale,
  trail,
}: {
  locale: Locale;
  trail: { label: string; section?: SectionKey; slug?: string }[];
}) {
  const t = getCopy(locale);
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol role="list">
        <li>
          <Link href={path(locale)}>{t.common.breadcrumbHome}</Link>
        </li>
        {trail.map((item, i) => (
          <li key={i}>
            {i === trail.length - 1 ? (
              <span aria-current="page">{item.label}</span>
            ) : (
              <Link href={path(locale, item.section, item.slug)}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** The dark closing call to action used at the bottom of every page. */
export function CtaBand({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  return (
    <section className="band">
      <div className="wrap">
        <Reveal className="cta-band">
          <div>
            <span className="eyebrow eyebrow-inv">{t.nav.contact}</span>
            <h2 className="h-panel">{t.contact.title}</h2>
            <p>{t.contact.lede}</p>
          </div>
          <div className="cta-actions">
            <Link href={path(locale, "contact")} className="btn btn-primary">
              {t.common.bookCall}
            </Link>
            <Link href={path(locale, "offer")} className="btn btn-ghost-inv">
              {t.nav.offer}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Arrow() {
  return (
    <svg
      className="arrow"
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2 8h11M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Check() {
  return (
    <svg
      className="check"
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 8.5l3.2 3.2L13 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
