import Link from "next/link";
import { getCopy } from "@/content/copy";
import { site, serviceIds } from "@/content/site";
import { type Locale, path } from "@/content/i18n";

/**
 * Dark footer built from a row of rounded cards that sit UP into the white
 * section above, with the dark ground continuing behind and below them. The
 * lift is a transform plus a negative margin so it costs no layout space.
 */
export function Footer({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const year = 2026;

  const country =
    locale === "fi" ? "Suomi" : locale === "sv" ? "Finland" : "Finland";

  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-cards">
          <div className="ftr-card">
            <p className="ftr-tagline">{t.footer.tagline}</p>
            <address>
              <a
                href={site.mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.address.street}
              </a>
              <br />
              {site.address.postalCode} {site.address.city}
              <br />
              {country}
              <br />
              <br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <br />
              <a href={`tel:${site.phoneE164}`}>{site.phoneDisplay}</a>
            </address>
          </div>

          <div className="ftr-card">
            <h2>{t.footer.servicesTitle}</h2>
            <ul role="list">
              {serviceIds.slice(0, 5).map((id) => (
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

          <div className="ftr-card">
            <h2>{t.nav.industries}</h2>
            <ul role="list">
              <li>
                <Link href={path(locale, "industries")}>
                  {t.common.allIndustries}
                </Link>
              </li>
              <li>
                <Link href={path(locale, "work")}>{t.nav.work}</Link>
              </li>
              <li>
                <Link href={path(locale, "offer")}>{t.nav.offer}</Link>
              </li>
            </ul>
          </div>

          <div className="ftr-card">
            <h2>{t.footer.companyTitle}</h2>
            <ul role="list">
              <li>
                <Link href={path(locale, "about")}>{t.nav.about}</Link>
              </li>
              <li>
                <Link href={path(locale, "contact")}>{t.nav.contact}</Link>
              </li>
              <li>
                <Link href={path(locale, "privacy")}>{t.privacy.title}</Link>
              </li>
              <li>
                <a
                  href={site.social.linkedin}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="ftr-bottom">
          <p>
            {site.name}, {t.footer.rights} {year}
          </p>
          {t.footer.businessIdPending && <p>{t.footer.businessIdPending}</p>}
        </div>
      </div>
    </footer>
  );
}
