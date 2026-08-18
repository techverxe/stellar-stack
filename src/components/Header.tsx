"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { getCopy } from "@/content/copy";
import {
  type Locale,
  type SectionKey,
  locales,
  localeNames,
  localeShort,
  path,
} from "@/content/i18n";

/**
 * The language switcher links to the SAME page in the other language, not to
 * that language's homepage. Dropping a visitor on the homepage because they
 * changed language is the single most common i18n mistake, so the current
 * section and slug are threaded down from the page rather than guessed from
 * the URL (which a static export cannot read reliably at build time anyway).
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
    const onScroll = () => setStuck(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile menu, and let Escape close it.
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

  const links: { key: SectionKey; label: string }[] = [
    { key: "services", label: t.nav.services },
    { key: "industries", label: t.nav.industries },
    { key: "work", label: t.nav.work },
    { key: "offer", label: t.nav.offer },
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
            <Link
              key={link.key}
              href={path(locale, link.key)}
              className={section === link.key ? "is-current" : ""}
              aria-current={section === link.key ? "page" : undefined}
            >
              {link.label}
            </Link>
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
          <span className="label">{t.nav.languageLabel}</span>
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
