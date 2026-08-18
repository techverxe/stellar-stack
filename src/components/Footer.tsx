import Link from "next/link";
import { Logo } from "@/components/Logo";
import { getCopy } from "@/content/copy";
import { site, serviceIds } from "@/content/site";
import { type Locale, path } from "@/content/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const year = 2026;

  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-top">
          <div className="ftr-brand">
            <Logo />
            <p>{t.footer.tagline}</p>
            <a
              href={site.social.linkedin}
              className="ftr-social"
              rel="noopener noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
          </div>

          <div className="ftr-col">
            <h2 className="label">{t.footer.servicesTitle}</h2>
            <ul role="list">
              {serviceIds.slice(0, 6).map((id) => (
                <li key={id}>
                  <Link href={path(locale, "services", id)}>
                    {t.serviceCopy[id].name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={path(locale, "services")}>
                  {t.common.allServices}
                </Link>
              </li>
            </ul>
          </div>

          <div className="ftr-col">
            <h2 className="label">{t.footer.companyTitle}</h2>
            <ul role="list">
              <li>
                <Link href={path(locale, "about")}>{t.nav.about}</Link>
              </li>
              <li>
                <Link href={path(locale, "industries")}>
                  {t.nav.industries}
                </Link>
              </li>
              <li>
                <Link href={path(locale, "work")}>{t.nav.work}</Link>
              </li>
              <li>
                <Link href={path(locale, "offer")}>{t.nav.offer}</Link>
              </li>
              <li>
                <Link href={path(locale, "privacy")}>{t.privacy.title}</Link>
              </li>
            </ul>
          </div>

          <div className="ftr-col">
            <h2 className="label">{t.footer.contactTitle}</h2>
            <ul role="list" className="ftr-contact">
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={`tel:${site.phoneE164}`}>{site.phoneDisplay}</a>
              </li>
              <li>
                <address>
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city}
                  <br />
                  {locale === "fi"
                    ? "Suomi"
                    : locale === "sv"
                      ? "Finland"
                      : "Finland"}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="ftr-bottom">
          <p>
            &copy; {year} {site.name}. {t.footer.rights}
          </p>
          <p className="label">{t.footer.businessIdPending}</p>
        </div>
      </div>
    </footer>
  );
}
