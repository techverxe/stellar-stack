import { business } from "@/content/business";

export function Pricing() {
  return (
    <section id="hinnasto" className="band pricing-section">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="label label-blue">Läpinäkyvä Hinnoittelu</span>
            <h2 className="display">Ei piilokuluja. Ei monimutkaisia sopimuksia.</h2>
          </div>
          <p>
            Saat heti tietää, mitä kotisivut maksavat. Kertamaksu sivuston
            toteutuksesta ja edullinen kuukausimaksu huolettomasta ylläpidosta.
          </p>
        </div>

        <div className="pricing-grid">
          {/* Main Setup Plan */}
          <div className="price-card highlight">
            <div className="price-badge">Suosituin paketti</div>
            <div className="price-header">
              <span className="label">Uusi kotisivusto</span>
              <div className="price-amount">
                <span className="currency">690 €</span>
                <span className="term">/ kertamaksu</span>
              </div>
              <p className="price-desc">
                Kaikki mitä tarvitset nykyaikaiseen verkkonäkyvyyteen.
              </p>
            </div>

            <ul className="price-list" role="list">
              <li>
                <strong>Valmis sivustorakenne:</strong> Etusivu, palvelut, meistä ja yhteydenotto
              </li>
              <li>
                <strong>Täysin mobiilioptimoitu:</strong> Toimii täydellisesti puhelimella, tabletilla ja tietokoneella
              </li>
              <li>
                <strong>Hakukoneystävällinen:</strong> Teknisesti optimoitu löytymään Google-hauissa
              </li>
              <li>
                <strong>Selkeät yhteydenottolomakkeet:</strong> Tarjouspyynnöt suoraan sähköpostiisi
              </li>
              <li>
                <strong>Fast delivery:</strong> Valmis sivusto testattavaksi noin viikossa
              </li>
            </ul>

            <a href="#yhteystiedot" className="cta price-cta">
              <span className="dot" aria-hidden="true" />
              <span>Tilaa sivusto 690 €</span>
            </a>
          </div>

          {/* Monthly Maintenance Plan */}
          <div className="price-card">
            <div className="price-header">
              <span className="label">Ylläpito & Hosting</span>
              <div className="price-amount">
                <span className="currency">39 €</span>
                <span className="term">/ kk</span>
              </div>
              <p className="price-desc">
                Pidämme verkkosivusi aina nopeana, turvallisena ja toiminnassa.
              </p>
            </div>

            <ul className="price-list" role="list">
              <li>
                <strong>Suomalainen palvelin & SSL:</strong> Turvallinen HTTPS-yhteys ja nopea latausaika
              </li>
              <li>
                <strong>Sisältöpäivitykset:</strong> Pienet teksti- ja kuvamuutokset sisältyvät hintaan
              </li>
              <li>
                <strong>Tietoturva & varmuuskopiot:</strong> Jatkuva valvonta ja automaattiset varmuuskopiot
              </li>
              <li>
                <strong>Ilman sitoutumista:</strong> Irtisanomisaika 1 kuukausi, ei määräaikaisuutta
              </li>
            </ul>

            <a href="#yhteystiedot" className="cta cta-ghost price-cta">
              <span>Kysy lisätietoja ylläpidosta</span>
            </a>
          </div>
        </div>

        <div className="vat-note">
          <p className="label">{business.pricing.vatNote}</p>
        </div>
      </div>
    </section>
  );
}
