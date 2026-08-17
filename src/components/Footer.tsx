import Link from "next/link";
import { business } from "@/content/business";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap footer-in">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="display">{business.name}</span>
            <p className="footer-desc">
              Nykyaikaiset, nopeasti latautuvat kotisivut ja huoleton ylläpito
              pienyrityksille. Paikallinen kumppani Turussa.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <span className="label label-blue">Navigaatio</span>
              <ul>
                <li>
                  <a href="#palvelut">Palvelut</a>
                </li>
                <li>
                  <a href="#hinnasto">Hinnasto</a>
                </li>
                <li>
                  <a href="#tyot">Referenssit</a>
                </li>
                <li>
                  <a href="#paikallisuus">Turku</a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <span className="label label-blue">Yhteystiedot</span>
              <ul>
                <li>
                  <a href={`mailto:${business.email}`}>{business.email}</a>
                </li>
                <li>
                  <span>Turku, Suomi</span>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <span className="label label-blue">Tiedot</span>
              <ul>
                <li>
                  <Link href="/tietosuoja">Tietosuojaseloste</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} {business.name}. Kaikki oikeudet pidätetään.</p>
          <p className="label">Suomalaista ammattitaitoa pienyrittäjän parhaaksi</p>
        </div>
      </div>
    </footer>
  );
}
