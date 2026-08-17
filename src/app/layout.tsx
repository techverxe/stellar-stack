import type { Metadata } from "next";
import { fontVars } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Stellar Stack | Nykyaikaiset kotisivut pienyrityksille Turusta",
  description:
    "Uusi kotisivu yrityksellesi viikossa selkeällä kiinteällä hinnalla (690 €) ja huolettomalla ylläpidolla (39 €/kk). Paikallinen kumppani Turussa.",
  metadataBase: new URL("https://stellarstack.fi"),
  openGraph: {
    title: "Stellar Stack | Nykyaikaiset kotisivut pienyrityksille",
    description:
      "Avaimet käteen -kotisivut 690 € + ylläpito 39 €/kk. Nykyaikainen, mobiilioptimoitu ja nopeasti latautuva verkkosivusto.",
    url: "https://stellarstack.fi",
    siteName: "Stellar Stack",
    locale: "fi_FI",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi" className={fontVars}>
      <body>
        <a href="#main" className="skip">
          Siirry suoraan sisältöön
        </a>
        {children}
      </body>
    </html>
  );
}
