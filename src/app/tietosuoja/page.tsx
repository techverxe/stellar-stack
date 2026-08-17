import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { business } from "@/content/business";

export default function TietosuojaPage() {
  return (
    <>
      <Header />
      <main id="main" className="band pagehead">
        <div className="wrap">
          <span className="label label-blue">Tietosuoja</span>
          <h1 className="display">Tietosuojaseloste</h1>
          <p className="lede">
            Stellar Stack noudattaa henkilötietojen käsittelyssä
            EU:n yleistä tietosuoja-asetusta (GDPR) sekä Suomen lainsäädäntöä.
          </p>

          <div className="legal-content">
            <h2>1. Rekisterinpitäjä</h2>
            <p>
              Stellar Stack<br />
              Sähköposti: {business.email}<br />
              Toimipaikka: Turku, Suomi
            </p>

            <h2>2. Kerättävät henkilötiedot ja käyttötarkoitus</h2>
            <p>
              Keräämme ainoastaan henkilötietoja, jotka annat meille vapaaehtoisesti
              yhteydenottolomakkeen tai sähköpostin kautta (kuten nimi, sähköposti,
              puhelinnumero ja yrityksen nimi).
            </p>
            <p>
              Tietoja käytetään yksinomaan asiakaspalveluun, tarjouspyyntöihin
              vastaamiseen ja mahdollisen asiakassuhteen hoitamiseen.
            </p>

            <h2>3. Tietojen luovutus ja siirto</h2>
            <p>
              Emme myy, vuokraa tai luovuta henkilötietojasi kolmansille osapuolille
              markkinointitarkoituksiin.
            </p>

            <h2>4. Evästeet (Cookies)</h2>
            <p>
              Sivustomme on rakennettu staattisesti eikä käytä seuranta- tai
              mainosevästeitä.
            </p>

            <h2>5. Rekisteröidyn oikeudet</h2>
            <p>
              Sinulla on oikeus tarkastaa sinusta tallennetut henkilötiedot, pyytää
              virheellisten tietojen oikaisua tai tietojesi poistamista. Voit
              ottaa yhteyttä sähköpostitse: {business.email}.
            </p>

            <div className="legal-back">
              <Link href="/" className="cta cta-ghost">
                &larr; Takaisin etusivulle
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
