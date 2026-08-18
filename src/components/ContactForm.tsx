"use client";

import { useState } from "react";
import { getCopy } from "@/content/copy";
import { serviceIds } from "@/content/site";
import type { Locale } from "@/content/i18n";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * POSTs to /api/contact, which nginx proxies to server/index.mjs
 * (stellar-contact.service) once that infra exists -- see infra/deploy.sh
 * and infra/stellar-contact.service. Until stellarstack.fi is registered
 * and a droplet is provisioned (TVX-Q5/Q6), there is nowhere for this
 * request to land: a real visitor submitting this form today would see the
 * error state below, with the errorNote's mailto fallback as the honest
 * way out. This is expected, not a bug in this component.
 */
export function ContactForm({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: get("name"),
          company: get("company"),
          email: get("email"),
          phone: get("phone"),
          service: get("service"),
          message: get("message"),
          locale,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const noteText =
    status === "sent"
      ? t.contact.successNote
      : status === "error"
        ? t.contact.errorNote
        : t.contact.formNote;

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

      <button
        type="submit"
        className="btn btn-primary btn-lg"
        disabled={status === "sending"}
      >
        {status === "sending" ? t.contact.sending : t.contact.fields.submit}
      </button>

      <p
        className={`form-note${status === "error" ? " form-note-error" : ""}`}
        role={status === "sent" || status === "error" ? "status" : undefined}
      >
        {noteText}
      </p>
    </form>
  );
}
