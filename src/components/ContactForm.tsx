"use client";

import { useState } from "react";
import { getCopy } from "@/content/copy";
import { site, serviceIds } from "@/content/site";
import type { Locale } from "@/content/i18n";

/**
 * The site is a static export with no server, so there is nowhere to POST to.
 * Rather than ship a form that silently does nothing (the usual failure on
 * static marketing sites), this composes a mailto: with the fields filled in
 * and hands off to the visitor's mail client. It always works, needs no API
 * key, and the visitor can see exactly what is being sent.
 *
 * When a booking or CRM endpoint is added later, only `handleSubmit` changes.
 */
export function ContactForm({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const subject = `${site.name}: ${get("service") || t.contact.fields.message} (${get("company") || get("name")})`;
    const lines = [
      `${t.contact.fields.name}: ${get("name")}`,
      `${t.contact.fields.company}: ${get("company")}`,
      `${t.contact.fields.email}: ${get("email")}`,
      `${t.contact.fields.phone}: ${get("phone")}`,
      `${t.contact.fields.service}: ${get("service")}`,
      "",
      get("message"),
    ];

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label className="field">
          <span>{t.contact.fields.name}</span>
          <input type="text" name="name" required autoComplete="name" />
        </label>
        <label className="field">
          <span>{t.contact.fields.company}</span>
          <input type="text" name="company" autoComplete="organization" />
        </label>
      </div>

      <div className="form-row">
        <label className="field">
          <span>{t.contact.fields.email}</span>
          <input type="email" name="email" required autoComplete="email" />
        </label>
        <label className="field">
          <span>{t.contact.fields.phone}</span>
          <input type="tel" name="phone" autoComplete="tel" />
        </label>
      </div>

      <label className="field">
        <span>{t.contact.fields.service}</span>
        <select name="service" defaultValue="">
          <option value="" disabled>
            {t.contact.fields.servicePlaceholder}
          </option>
          {serviceIds.map((id) => (
            <option key={id} value={t.serviceCopy[id].name}>
              {t.serviceCopy[id].name}
            </option>
          ))}
          <option value={t.nav.offer}>{t.nav.offer}</option>
        </select>
      </label>

      <label className="field">
        <span>{t.contact.fields.message}</span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder={t.contact.fields.messagePlaceholder}
        />
      </label>

      <button type="submit" className="btn btn-primary btn-lg">
        {t.contact.fields.submit}
      </button>

      <p className="form-note" role={sent ? "status" : undefined}>
        {t.contact.formNote}
      </p>
    </form>
  );
}
