import { business } from "@/content/business";

export function LocalPresence() {
  return (
    <section id="paikallisuus" className="band local-section">
      <div className="wrap">
        <div className="split">
          <div>
            <span className="label label-blue">Paikallisuus & Luottamus</span>
            <h2 className="display">
              Turkulainen kumppani pienyrittäjän tukena
            </h2>
            <p>
              Tiedämme, että verkkosivuprojektit saattavat usein tuntua
              monimutkaisilta ja aikaa vieviltä. Meidän kanssamme asioit ilman
              jargon-kieltä tai turhaa byrokratiaa.
            </p>
            <p>
              Toimimme Turussa ja palvelemme pienyrityksiä, ammatinharjoittajia
              ja paikallisia palveluntarjoajia koko Varsinais-Suomen alueella
              ja etänä ympäri Suomea.
            </p>

            <ul className="tick-list" role="list">
              <li>
                <span className="label">01</span>
                <span>
                  <strong>Suora yhteys tekijään:</strong> Puhut suoraan
                  sivustosi rakentajan kanssa.
                </span>
              </li>
              <li>
                <span className="label">02</span>
                <span>
                  <strong>Ei yllätyksiä laskutuksessa:</strong> Hinta sovitaan
                  etukäteen ja se pitää.
                </span>
              </li>
              <li>
                <span className="label">03</span>
                <span>
                  <strong>Nopea ja joustava palvelu:</strong> Muutokset ja
                  päivitykset hoituvat nopeasti.
                </span>
              </li>
            </ul>
          </div>

          <div className="local-card">
            <div className="local-card-inner">
              <span className="label label-blue">Toimipiste</span>
              <h3>Turku, Suomi</h3>
              <p className="local-desc">
                Suomalainen asiantuntemus, nopeat yhteydet ja paikallinen
                ymmärrys alueen yrittäjien tarpeista.
              </p>
              <div className="local-meta">
                <div>
                  <span className="label">Sähköposti</span>
                  <strong>{business.email}</strong>
                </div>
                <div>
                  <span className="label">Alue</span>
                  <strong>Turku &amp; Koko Suomi</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
