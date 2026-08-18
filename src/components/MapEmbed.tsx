"use client";

import { useState } from "react";
import { getCopy } from "@/content/copy";
import { site } from "@/content/site";
import type { Locale } from "@/content/i18n";

function Pin() {
  return (
    <svg
      className="map-pin-icon"
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8 1c-2.76 0-5 2.24-5 5 0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle cx="8" cy="6" r="1.7" fill="currentColor" />
    </svg>
  );
}

/**
 * The privacy policy states plainly that this site sets no tracking cookies
 * and needs no cookie banner. A Google Maps iframe loads Google's own
 * scripts and can set Google's own cookies, which would make that claim
 * false the instant it rendered for every visitor to this page.
 *
 * So the map does not load until asked. Nothing from Google is requested
 * on page load; only clicking "Show map" inserts the iframe, and only for
 * that visitor. The external "Open in Google Maps" link stays available
 * either way, since a normal outbound link carries no such cost.
 */
export function MapEmbed({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="map-block">
      <div className="map-card">
        {loaded ? (
          <iframe
            className="map-frame"
            src={`https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=15&output=embed`}
            title={`${site.address.street}, ${site.address.city}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <button
            type="button"
            className="map-placeholder"
            onClick={() => setLoaded(true)}
          >
            <Pin />
            <span className="map-placeholder-address">
              {site.address.street}, {site.address.city}
            </span>
            <span className="btn btn-ghost map-placeholder-btn">
              {t.contact.mapCta}
            </span>
          </button>
        )}
      </div>

      <div className="map-foot">
        {!loaded && <p className="map-note">{t.contact.mapNote}</p>}
        <a
          className="link-arrow"
          href={site.mapsSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.contact.mapExternal}
        </a>
      </div>
    </div>
  );
}
