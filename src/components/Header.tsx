"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { business } from "@/content/business";

export function Header() {
  const [stuck, setStuck] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setStuck(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`hdr ${stuck ? "stuck" : ""}`}>
      <div className="wrap hdr-in">
        <Link href="/" className="mark" aria-label="Stellar Stack - Etusivu">
          <span className="mark-bar" aria-hidden="true" />
          <span className="mark-txt">
            <span className="display">{business.name}</span>
            <span className="label">Kotisivut pienyrityksille</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Päävalikko">
          <a href="#palvelut">Palvelut</a>
          <a href="#hinnasto">Hinnasto</a>
          <a href="#tyot">Referenssit</a>
          <a href="#paikallisuus">Turku</a>
          <a href="#yhteystiedot">Ota yhteyttä</a>
        </nav>

        <div className="hdr-right">
          <a href="#yhteystiedot" className="cta">
            <span className="dot" aria-hidden="true" />
            <span>Ota yhteyttä</span>
          </a>

          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Avaa valikko"
          >
            <span className="hamburger-icon" aria-hidden="true" />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <nav aria-label="Mobiilivalikko">
            <a href="#palvelut" onClick={() => setMobileMenuOpen(false)}>
              Palvelut
            </a>
            <a href="#hinnasto" onClick={() => setMobileMenuOpen(false)}>
              Hinnasto
            </a>
            <a href="#tyot" onClick={() => setMobileMenuOpen(false)}>
              Referenssit
            </a>
            <a href="#paikallisuus" onClick={() => setMobileMenuOpen(false)}>
              Turku
            </a>
            <a href="#yhteystiedot" onClick={() => setMobileMenuOpen(false)}>
              Ota yhteyttä
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
