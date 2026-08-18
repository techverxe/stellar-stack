import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { getCopy } from "@/content/copy";
import { type Locale, type SectionKey, path } from "@/content/i18n";

/** Serialises structured data into the document. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from our own content files, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

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
      <div className="sec-head-main">
        <span className="label label-accent">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {(lede || action) && (
        <div className="sec-head-aside">
          {lede && <p className="lede">{lede}</p>}
          {action}
        </div>
      )}
    </Reveal>
  );
}

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
      <div className="aurora" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="wrap">
        <Reveal>
          <span className="label label-accent">{eyebrow}</span>
          <h1 className="display">{title}</h1>
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

/** The closing call to action used at the bottom of every page. */
export function CtaBand({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  return (
    <section className="cta-band">
      <div className="wrap">
        <Reveal className="cta-band-in">
          <div>
            <span className="label label-accent">{t.nav.contact}</span>
            <h2 className="display">{t.contact.title}</h2>
            <p className="lede">{t.contact.lede}</p>
          </div>
          <div className="cta-band-actions">
            <Link
              href={path(locale, "contact")}
              className="btn btn-primary btn-lg"
            >
              {t.common.bookCall}
            </Link>
            <Link href={path(locale, "offer")} className="btn btn-ghost btn-lg">
              {t.nav.offer}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Small arrow used on cards and inline links. */
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
        strokeWidth="1.6"
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
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
