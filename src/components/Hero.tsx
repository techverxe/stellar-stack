"use client";

import { useState } from "react";
import { business, heroCopyOptions } from "@/content/business";

export function Hero() {
  const [selectedCopyIndex, setSelectedCopyIndex] = useState(0);
  const activeCopy = heroCopyOptions[selectedCopyIndex];

  return (
    <section className="hero">
      <div className="hero-scrim" />
      <div className="wrap hero-in">
        <div className="hero-badge">
          <span className="live" aria-hidden="true" />
          <span className="label label-blue">Paikallinen kumppani Turussa</span>
        </div>

        <h1 className="display">{activeCopy.headline}</h1>

        <p className="lede">{activeCopy.subheadline}</p>

        <div className="hero-actions">
          <a href="#yhteystiedot" className="cta">
            <span className="dot" aria-hidden="true" />
            <span>Pyydä ilmainen kartoitus</span>
          </a>
          <a href="#hinnasto" className="cta cta-ghost">
            <span>Katso hinnasto (690 €)</span>
          </a>
        </div>

        {/* Copy variation switcher */}
        <div className="copy-variant-bar">
          <span className="label">Otsikkovaihtoehdot:</span>
          {heroCopyOptions.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`variant-btn ${idx === selectedCopyIndex ? "active" : ""}`}
              onClick={() => setSelectedCopyIndex(idx)}
              aria-label={`Otsikkovaihtoehto ${idx + 1}`}
            >
              Versio {idx + 1}
            </button>
          ))}
        </div>

        <div className="hero-highlights">
          <div className="highlight-item">
            <span className="label">Toimitusaika</span>
            <strong>Noin 1 viikko</strong>
          </div>
          <div className="highlight-item">
            <span className="label">Aloitusmaksu</span>
            <strong className="price-tag">690 €</strong>
          </div>
          <div className="highlight-item">
            <span className="label">Ylläpito</span>
            <strong>39 €/kk</strong>
          </div>
          <div className="highlight-item">
            <span className="label">Sitoutuminen</span>
            <strong>Ei määräaikaa</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
