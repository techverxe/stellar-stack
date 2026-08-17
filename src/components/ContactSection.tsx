"use client";

import { useState } from "react";
import { business } from "@/content/business";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="yhteystiedot" className="band contact-section">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="label label-blue">Ota yhteyttä</span>
            <h2 className="display">Pyydä ilmainen kartoitus kotisivuistasi</h2>
          </div>
          <p>
            Jätä yhteystietosi alla olevalla lomakkeella tai lähetä sähköpostia
            osoitteeseen <strong>{business.email}</strong>. Vastaamme 24 tunnin
            kuluessa!
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info-card">
            <h3>Aloitetaanko uusi projekti?</h3>
            <p>
              Olipa kyseessä täysin uusi verkkosivusto tai vanhojen sivujen
              uudistus, autamme mielellämme eteenpäin.
            </p>

            <div className="info-item">
              <span className="label">Sähköposti</span>
              <a href={`mailto:${business.email}`} className="info-link">
                {business.email}
              </a>
            </div>

            <div className="info-item">
              <span className="label">Sijainti</span>
              <strong>Turku, Suomi</strong>
            </div>

            <div className="info-item">
              <span className="label">Toimitusaika</span>
              <strong>Sivusto valmiina n. 1 viikossa</strong>
            </div>
          </div>

          <div className="form-card">
            {submitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Kiitos yhteydenotostasi!</h3>
                <p>
                  Viestisi on vastaanotettu. Otamme sinuun yhteyttä mahdollisimman
                  pian (viimeistään seuraavana arkipäivänä).
                </p>
                <button
                  type="button"
                  className="cta cta-ghost"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      company: "",
                      message: "",
                    });
                  }}
                >
                  Lähetä uusi viesti
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="label">
                      Nimi *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="Matti Meikäläinen"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="label">
                      Sähköposti *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="matti@yritys.fi"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone" className="label">
                      Puhelinnumero
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="040 123 4567"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="company" className="label">
                      Yrityksen nimi / Nykyinen verkkosivu
                    </label>
                    <input
                      type="text"
                      id="company"
                      placeholder="Yritys Oy / yritys.fi"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="label">
                    Miten voimme auttaa?
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Kerro lyhyesti toimialastasi tai toiveistasi kotisivujen suhteen..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>

                <button type="submit" className="cta form-submit">
                  <span className="dot" aria-hidden="true" />
                  <span>Lähetä tarjouspyyntö</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
