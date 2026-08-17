import { services } from "@/content/business";

export function Services() {
  return (
    <section id="palvelut" className="band services-section">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="label label-blue">Palvelumme</span>
            <h2 className="display">Selkeät palvelut pienyrityksen kasvuun</h2>
          </div>
          <p>
            Et tarvitse kalliita konsultteja tai satojen sivujen määrittelyjä.
            Rakennamme toimivat, ammattimaiset kotisivut selkeällä
            kiinteällä hinnalla.
          </p>
        </div>

        <div className="trio">
          {services.map((svc) => (
            <div key={svc.id} className="service-card">
              <div className="service-header">
                <span className="label label-blue">{svc.price}</span>
                <h3>{svc.title}</h3>
                <p>{svc.description}</p>
              </div>

              <ul className="service-features" role="list">
                {svc.features.map((feat, idx) => (
                  <li key={idx}>
                    <span className="feature-check" aria-hidden="true">
                      ✓
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="service-footer">
                <a href="#yhteystiedot" className="service-link">
                  Kysy lisää palvelusta &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
