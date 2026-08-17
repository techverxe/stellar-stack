/**
 * Stellar Stack - Business Facts
 * Clean facts for Stellar Stack outreach brand site.
 * No Techverxe branding, no fabricated addresses or fake claims.
 */

export const business = {
  name: "Stellar Stack",
  legalName: "Stellar Stack",
  siteUrl: "https://stellarstack.fi",
  email: "moi@stellarstack.fi",

  city: "Turku",
  country: "FI",
  countryName: "Suomi",

  pricing: {
    setupFee: 690,
    monthlyFee: 39,
    currency: "EUR",
    vatNote: "Hintoihin lisätään alv 25,5 %",
  },

  areaServed: ["Turku", "Varsinais-Suomi", "Koko Suomi"],
} as const;

export const heroCopyOptions = [
  {
    headline: "Uusi kotisivu yrityksellesi viikossa – 690 euroa",
    subheadline: "Selkeä kiinteä hinta, mobiilioptimoitu toteutus ja vaivaton ylläpito suomalaiselta asiantuntijalta.",
  },
  {
    headline: "Nykyaikaiset kotisivut pienen yrityksen tarpeisiin",
    subheadline: "Hanki ammattimainen verkkonäkyvyys nopeasti ilman monimutkaisia sopimuksia tai piilokuluja.",
  },
  {
    headline: "Tyylikäs verkkosivusto ja huoleton ylläpito Turusta",
    subheadline: "Valmis sivusto 690 € + ylläpito 39 €/kk. Me huolehdimme tekniikasta, sinä keskityt liiketoimintaasi.",
  },
] as const;

export const services = [
  {
    id: "sivuston-toteutus",
    title: "Uuden kotisivun toteutus",
    price: "690 € (kertamaksu)",
    icon: "Layout",
    description: "Avaimet käteen -ratkaisu pienyrityksille. Suunnittelemme ja toteutamme nykyaikaisen, nopean ja mobiiliystävällisen sivuston.",
    features: [
      "Uniikki ja ammattimainen ulkoasu",
      "Täysin mobiilioptimoitu (sujuva kaikilla laitteilla)",
      "Hakukoneystävällinen rakenne (Google-valmis)",
      "Lomakkeet ja yhteydenottotavat suoraan sähköpostiisi",
      "Nopea toimitus – valmis noin viikossa",
    ],
  },
  {
    id: "yllapito-ja-tuki",
    title: "Kuukausiylläpito & Tuki",
    price: "39 €/kk",
    icon: "ShieldCheck",
    description: "Huoletonta verkkosivujen pitoa. Pidämme sivustosi turvallisena, ajantasaisena ja aina toiminnassa.",
    features: [
      "Luotettava suomalainen hosting & SSL-suojaus",
      "Pienet sisältöpäivitykset sisältyvät kuukausihintaan",
      "Jatkuva tekninen seuranta ja varmuuskopiot",
      "Tietoturvapäivitykset ja suorituskyvyn optimointi",
      "Ei pitkiä sitoutumisaikoja – voit irtisanoa milloin vain",
    ],
  },
  {
    id: "hakukoneoptimointi",
    title: "Hakukoneoptimointi & Kasvu",
    price: "Räätälöidysti tarpeen mukaan",
    icon: "TrendingUp",
    description: "Autamme yritystäsi löytymään paremmin paikallisissa Google-hauissa ja muuttamaan kävijät asiakkaiksi.",
    features: [
      "Google Business -profiilin kunnostus & optimointi",
      "Paikallisen hakunäkyvyyden parantaminen",
      "Sivuston latausnopeuden ja conversion hiominen",
      "Selkeä raportointi ja kehitysehdotukset",
    ],
  },
] as const;
