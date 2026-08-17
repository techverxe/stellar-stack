export function WorkSection() {
  return (
    <section id="tyot" className="band work-section">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="label label-blue">Työmme & Referenssit</span>
            <h2 className="display">Asiakastöitämme</h2>
          </div>
          <p>
            Suosimme rehellisyyttä. Julkaisemme täällä ensimmäiset
            asiakasreferenssimme heti toteutusten valmistuttua.
          </p>
        </div>

        <div className="empty-work-card">
          <div className="empty-work-icon" aria-hidden="true">
            ✦
          </div>
          <h3>Ensimmäiset asiakasprojektit työn alla</h3>
          <p>
            Rakennamme parhaillaan uusia verkkosivustoja varsinaissuomalaisille
            pienyrityksille. Tähän osioon päivitetään valmiit asiakastöiden
            esittelyt piakkoin.
          </p>
          <div className="empty-work-action">
            <p className="label">
              Haluatko yrityksesi ensimmäisten referenssien joukkoon?
            </p>
            <a href="#yhteystiedot" className="cta cta-ghost">
              <span>Ota yhteyttä ja kysy aloitustarjousta</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
