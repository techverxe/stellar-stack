"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { getCopy } from "@/content/copy";
import { serviceIds, industryIds } from "@/content/site";
import {
  type Locale,
  type SectionKey,
  locales,
  localeNames,
  localeShort,
  path,
} from "@/content/i18n";

/**
 * Floating pill navigation, matching the reference layout: each nav item is
 * its own translucent pill over the dark hero, and the whole bar flips to a
 * solid light treatment once scrolled past it. The flip is a single class on
 * the header; every child restyles from that in CSS rather than in JS.
 *
 * The language switcher links to the SAME page in the other language, not to
 * that language's homepage. Dropping a visitor on the homepage because they
 * changed language is the most common i18n mistake, so the current section and
 * slug are threaded down from the page rather than parsed from the URL, which
 * a static export cannot read at build time anyway.
 */
export function Header({
  locale,
  section,
  slug,
}: {
  locale: Locale;
  section?: SectionKey;
  slug?: string;
}) {
  const t = getCopy(locale);
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Flip once the hero is essentially behind us. A fixed 120px threshold is
    // enough: every page on this site opens with a dark hero taller than that.
    const onScroll = () => setStuck(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  /**
   * Services and Industries open a panel listing their children, matching the
   * reference navigation. Hover opens it on pointer devices; the pill is also
   * a real link, so keyboard and touch users get the index page rather than
   * being trapped behind a menu that needs a hover to reveal.
   */
  const links: {
    key: SectionKey;
    label: string;
    children?: { slug: string; label: string; hint: string }[];
  }[] = [
    {
      key: "services",
      label: t.nav.services,
      children: serviceIds.map((id) => ({
        slug: id,
        label: t.serviceCopy[id].name,
        hint: t.serviceCopy[id].priceHint,
      })),
    },
    {
      key: "industries",
      label: t.nav.industries,
      children: industryIds.map((id) => ({
        slug: id,
        label: t.industryCopy[id].name,
        hint: "",
      })),
    },
    { key: "work", label: t.nav.work },
    { key: "insights", label: t.nav.insights },
    { key: "about", label: t.nav.about },
  ];

  return (
    <header className={`hdr ${stuck ? "is-stuck" : ""}`}>
      <div className="wrap hdr-in">
        <Link href={path(locale)} className="hdr-brand" aria-label={t.nav.home}>
          <Logo />
        </Link>

        <nav className="hdr-nav" aria-label={t.nav.menu}>
          {links.map((link) => (
            <div
              key={link.key}
              className={`nav-item ${link.children ? "has-menu" : ""}`}
            >
              <Link
                href={path(locale, link.key)}
                className={section === link.key ? "is-current" : ""}
                aria-current={section === link.key ? "page" : undefined}
              >
                {link.label}
                {link.children && (
                  <svg viewBox="0 0 12 12" aria-hidden="true" className="caret">
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </Link>

              {link.children && (
                <div className="nav-menu">
                  <ul role="list">
                    {link.children.map((child) => (
                      <li key={child.slug}>
                        <Link href={path(locale, link.key, child.slug)}>
                          <span>{child.label}</span>
                          {child.hint && (
                            <span className="nav-menu-hint">{child.hint}</span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hdr-right">
          <div className="lang" role="group" aria-label={t.nav.languageLabel}>
            {locales.map((l) => (
              <Link
                key={l}
                href={path(l, section, slug)}
                hrefLang={l}
                className={l === locale ? "is-current" : ""}
                aria-current={l === locale ? "true" : undefined}
                title={localeNames[l]}
              >
                {localeShort[l]}
              </Link>
            ))}
          </div>

          <Link
            href={path(locale, "contact")}
            className="btn btn-primary hdr-cta"
          >
            {t.common.getInTouch}
          </Link>

          <button
            type="button"
            className="burger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.nav.close : t.nav.menu}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={`sheet ${menuOpen ? "is-open" : ""}`} hidden={!menuOpen}>
        <nav className="sheet-nav" aria-label={t.nav.menu}>
          {links.map((link) => (
            <Link
              key={link.key}
              href={path(locale, link.key)}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={path(locale, "contact")}
            onClick={() => setMenuOpen(false)}
          >
            {t.nav.contact}
          </Link>
        </nav>
        <div className="sheet-lang">
          <span className="eyebrow eyebrow-faint">{t.nav.languageLabel}</span>
          <div className="lang">
            {locales.map((l) => (
              <Link
                key={l}
                href={path(l, section, slug)}
                hrefLang={l}
                className={l === locale ? "is-current" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {localeNames[l]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
