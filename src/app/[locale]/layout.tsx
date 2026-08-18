import type { ReactNode } from "react";
import { fontVars } from "@/lib/fonts";
import { getCopy } from "@/content/copy";
import { locales, localeTags, type Locale, isLocale } from "@/content/i18n";
import { localBusinessJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui";
import "@/styles/globals.css";

/**
 * This IS the root layout. There is no `app/layout.tsx`, which is the
 * documented Next.js pattern for locale-prefixed i18n: it is the only way for
 * `<html lang>` to be correct per page in a static export. A root layout above
 * this one could not see the locale param and would ship `lang="fi"` on the
 * Swedish and English pages.
 */

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "fi";
  const t = getCopy(locale);

  return (
    <html lang={localeTags[locale]} className={fontVars}>
      <head>
        <meta name="theme-color" content="#090d16" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <a href="#main" className="skip">
          {t.nav.skipToContent}
        </a>
        {children}
        <JsonLd data={localBusinessJsonLd(locale, t.home.metaDescription)} />
      </body>
    </html>
  );
}
