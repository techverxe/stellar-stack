import type { Copy } from "./types";
import { site } from "@/content/site";

/**
 * Finnish copy. This is the primary market and the reference version: when a
 * message changes, it changes here first and the other two follow.
 */
export const fi: Copy = {
  nav: {
    services: "Palvelut",
    industries: "Toimialat",
    work: "Referenssit",
    insights: "Artikkelit",
    about: "Meistä",
    contact: "Yhteystiedot",
    offer: "Kampanja",
    menu: "Valikko",
    close: "Sulje",
    languageLabel: "Vaihda kieli",
    skipToContent: "Siirry suoraan sisältöön",
    home: "Etusivu",
  },

  common: {
    readMore: "Lue lisää",
    allServices: "Kaikki palvelut",
    allIndustries: "Kaikki toimialat",
    allWork: "Kaikki referenssit",
    getInTouch: "Ota yhteyttä",
    bookCall: "Varaa maksuton kartoitus",
    viewSite: "Avaa sivusto",
    siteOffline: "Sivusto huollossa",
    backTo: "Takaisin",
    from: "alkaen",
    vatNote: `Hintoihin lisätään alv ${site.vatRate}.`,
    deliveredIn: "Toimitusaika",
    faqTitle: "Usein kysytyt kysymykset",
    relatedServices: "Liittyvät palvelut",
    industriesWeServe: "Toimialat joita palvelemme",
    breadcrumbHome: "Etusivu",
  },

  home: {
    metaTitle: "Stellar Stack | Verkkosivut ja digitaalinen kasvu Turusta",
    metaDescription:
      "Turkulainen digitoimisto, joka rakentaa nopeita verkkosivuja, verkkokauppoja ja hakukonenäkyvyyttä suomalaisille pienyrityksille. Kolme kieltä, kiinteä hinta, viikon toimitus.",
    eyebrow: "Digitoimisto Turusta",
    headline: "Verkkosivut jotka",
    headlineAccent: "tuovat asiakkaita",
    lede: "Rakennamme nopeita, mitattavia verkkosivustoja ja verkkokauppoja suomalaisille pienyrityksille. Ei raskaita järjestelmiä, ei piilokuluja, ei kuukausien odottelua.",
    primaryCta: { label: "Varaa maksuton kartoitus", section: "contact" },
    secondaryCta: { label: "Katso palvelut", section: "services" },
    stats: [
      { value: "7 pv", label: "Tyypillinen toimitusaika" },
      { value: "3", label: "Kieltä vakiona" },
      { value: "<1 s", label: "Latausaika mobiilissa" },
      { value: "100 %", label: "Kiinteä hinta etukäteen" },
    ],
    trustLine: "Toteutuksia terveysteknologiasta paikalliseen huoltoasemaan.",

    servicesEyebrow: "Palvelut",
    servicesTitle: "Kaikki mitä yrityksesi tarvitsee verkossa",
    servicesLede:
      "Aloitat sivustosta ja laajennat sitä mukaa kun liiketoiminta kasvaa. Jokainen palvelu myydään erikseen, joten maksat vain siitä mitä oikeasti tarvitset.",

    industriesEyebrow: "Toimialat",
    industriesTitle: "Tunnemme alasi ennen ensimmäistä palaveria",
    industriesLede:
      "Kampaamon ja tilitoimiston sivut eivät ratkaise samaa ongelmaa. Rakennamme sen mukaan, miten asiakkaasi oikeasti etsivät ja ottavat yhteyttä.",

    workEyebrow: "Referenssit",
    workTitle: "Työtä joka on tuotannossa",
    workLede:
      "Emme näytä konsepteja emmekä kuvituskuvia. Nämä ovat oikeita sivustoja, jotka palvelevat oikeita asiakkaita juuri nyt.",

    processEyebrow: "Näin se etenee",
    processTitle: "Neljä vaihetta, ei yllätyksiä",
    processLede:
      "Tiedät koko ajan missä mennään ja mitä seuraavaksi tapahtuu. Sinulta kuluu koko projektiin tyypillisesti alle kaksi tuntia.",
    processSteps: [
      {
        step: "01",
        title: "Kartoitus",
        body: "Puolen tunnin puhelu tai tapaaminen Turussa. Käymme läpi mitä teet, kenelle myyt ja mitä sivustolta pitää saada irti. Saat kirjallisen ehdotuksen ja kiinteän hinnan.",
      },
      {
        step: "02",
        title: "Sisältö ja rakenne",
        body: "Kirjoitamme tekstit ja rakennamme sivukartan puhelun pohjalta. Sinä kommentoit, me korjaamme. Kuvat otetaan omistasi tai hankimme ne.",
      },
      {
        step: "03",
        title: "Toteutus",
        body: "Rakennamme sivuston ja näytät sen sinulle esikatselulinkin kautta. Kaikki korjaukset kuuluvat hintaan ennen julkaisua.",
      },
      {
        step: "04",
        title: "Julkaisu ja ylläpito",
        body: "Viemme sivuston verkkotunnuksellesi, kytkemme mittauksen ja hoidamme päivitykset. Sinä keskityt työhösi.",
      },
    ],

    whyEyebrow: "Miksi me",
    whyTitle: "Pieni toimisto, iso tekninen tausta",
    whyLede:
      "Stellar Stack rakentuu samalle tekniselle pohjalle kuin ne ohjelmistotuotteet, joita tiimimme kehittää päivätyökseen. Saat saman laadun pienyrityksen budjetilla.",
    whyPoints: [
      {
        title: "Nopeus on ominaisuus",
        body: "Sivustot rakennetaan staattisiksi tiedostoiksi, ei raskaaksi julkaisujärjestelmäksi. Se tarkoittaa alle sekunnin latausaikoja myös mobiiliverkossa ja parempaa sijoitusta Googlessa.",
      },
      {
        title: "Kolme kieltä vakiona",
        body: "Suomi, ruotsi ja englanti kuuluvat perustoimitukseen. Se on Suomessa poikkeuksellista ja avaa asiakaskunnan, jota kilpailijasi eivät tavoita.",
      },
      {
        title: "Sinä omistat kaiken",
        body: "Verkkotunnus, sisältö ja lähdekoodi ovat sinun. Jos haluat vaihtaa toimittajaa, saat kaiken mukaasi. Ei lukitusta, ei lunnaita.",
      },
      {
        title: "Paikallinen kumppani",
        body: "Toimisto on Turussa ja vastaamme suomeksi. Voit soittaa ja tavata ihmisen, joka oikeasti rakensi sivustosi.",
      },
    ],

    offerBannerTitle: `Uusi sivusto ${site.offer.setup} eurolla`,
    offerBannerBody: `Aloituskampanja pienyrityksille: valmis monikielinen sivusto viikossa, ylläpito ${site.offer.monthly} euroa kuukaudessa. Ei sitoutumisaikaa.`,
    offerBannerCta: "Katso mitä kampanja sisältää",
  },

  services: {
    metaTitle: "Palvelut | Stellar Stack",
    metaDescription:
      "Verkkosivut, verkkokauppa, hakukoneoptimointi, digimainonta, sisällöntuotanto, analytiikka, sovelluskehitys ja ylläpito suomalaisille pienyrityksille.",
    eyebrow: "Palvelut",
    title: "Palvelut jotka maksavat itsensä takaisin",
    lede: "Kahdeksan palvelua, jotka voi ostaa yksitellen tai yhdessä. Kaikki hinnoitellaan etukäteen, eikä mikään niistä sido sinua pitkään sopimukseen.",
  },

  industries: {
    metaTitle: "Toimialat | Stellar Stack",
    metaDescription:
      "Verkkosivut autoalalle, rakennusalalle, ravintoloille, kaupoille, asiantuntijayrityksille ja terveysalan toimijoille Turussa ja koko Suomessa.",
    eyebrow: "Toimialat",
    title: "Rakennamme alallesi, emme yleisesti",
    lede: "Jokaisella alalla on oma tapansa hankkia asiakkaita. Alta näet, mitä juuri sinun alallasi sivustolta oikeasti vaaditaan.",
    segments: {
      trades: "Rakentaminen ja tekninen ala",
      hospitality: "Palvelut ja kauppa",
      professional: "Asiantuntijapalvelut",
      health: "Terveys ja hyvinvointi",
    },
  },

  work: {
    metaTitle: "Referenssit | Stellar Stack",
    metaDescription:
      "Tuotannossa olevia verkkosivustoja: Tikanmaan Huoltoasema, Futuuri ja Techverxe. Oikeita toteutuksia, ei konsepteja.",
    eyebrow: "Referenssit",
    title: "Toteutuksia jotka ovat tuotannossa",
    lede: "Jokainen alla oleva sivusto on rakennettu alusta asti ja on käytössä juuri nyt. Voit avata ne ja katsoa itse.",
    challengeLabel: "Lähtötilanne",
    approachLabel: "Ratkaisu",
    outcomeLabel: "Lopputulos",
    stackLabel: "Teknologiat",
    projectUrlLabel: "Projektin osoite",
  },

  insights: {
    metaTitle: "Artikkelit | Stellar Stack",
    metaDescription:
      "Käytännön kirjoituksia verkkosivuista, hakunäkyvyydestä ja mittaamisesta suomalaisille pienyrityksille.",
    eyebrow: "Artikkelit",
    title: "Vastauksia kysymyksiin joita asiakkaat oikeasti kysyvät",
    lede: "Emme kirjoita siksi, että jotain pitäisi julkaista. Nämä ovat ne kysymykset, jotka tulevat vastaan lähes jokaisessa ensimmäisessä puhelussa.",
    readTime: "min lukuaika",
    published: "Julkaistu",
    backToIndex: "Kaikki artikkelit",
    moreArticles: "Lue myös",
  },

  about: {
    metaTitle: "Meistä | Stellar Stack",
    metaDescription:
      "Stellar Stack on turkulainen digitoimisto, joka rakentaa nopeita monikielisiä verkkosivuja suomalaisille pienyrityksille.",
    eyebrow: "Meistä",
    title: "Turkulainen digitoimisto, ohjelmistotalon taustalla",
    lede: "Teemme pienyrityksille sen, minkä isot yritykset ostavat kalliilta konsulttitaloilta: nopean, mitattavan ja huolellisesti rakennetun verkkopalvelun.",
    story: [
      "Stellar Stack syntyi yksinkertaisesta havainnosta. Suomalainen pienyrittäjä maksaa usein tuhansia euroja sivustosta, joka latautuu hitaasti, ei näy Googlessa eikä ole päivitettävissä ilman että toimittajalle soitetaan ja laskutetaan tunneittain.",
      "Samaan aikaan sama tiimi rakentaa isoille asiakkaille ohjelmistoja, joissa nopeus, saavutettavuus ja mitattavuus ovat itsestäänselvyyksiä. Se osaaminen ei katoa mihinkään, kun asiakkaana on kolmen hengen huoltoasema. Se vain paketoidaan eri tavalla.",
      "Siksi rakennamme jokaisen sivuston samalla tekniikalla riippumatta asiakkaan koosta: staattinen julkaisu, kolme kieltä, mitattu suorituskyky ja koodi, jonka asiakas omistaa. Erona on laajuus ja hinta, ei laatu.",
      "Toimimme Turusta käsin. Se tarkoittaa, että voit tavata meidät kasvotusten, saada vastauksen suomeksi ja tietää kuka sivustosi rakensi.",
    ],
    valuesTitle: "Miten toimimme",
    values: [
      {
        title: "Hinta kerrotaan ennen työtä",
        body: "Saat kiinteän hinnan kirjallisena ennen kuin mitään aloitetaan. Jos laajuus muuttuu kesken projektin, siitä sovitaan erikseen eikä sitä laskuteta jälkikäteen yllätyksenä.",
      },
      {
        title: "Emme myy mitä et tarvitse",
        body: "Jos kolmen sivun sivusto riittää, sanomme sen. Emme myy verkkokauppaa yritykselle, joka ei myy verkossa, emmekä kuukausiraportointia yritykselle, jolla ei ole mitään raportoitavaa.",
      },
      {
        title: "Rehellisyys referensseissä",
        body: "Näytämme vain oikeita, tuotannossa olevia toteutuksia. Sivuillamme ei ole keksittyjä asiakkaita, lainattuja logoja eikä lukuja joita emme voi näyttää toteen.",
      },
      {
        title: "Työ jää sinulle",
        body: "Verkkotunnus rekisteröidään sinun nimiisi, sisältö on sinun ja lähdekoodi luovutetaan pyydettäessä. Yhteistyön pitää jatkua siksi että se toimii, ei siksi että olet lukossa.",
      },
    ],
    localTitle: "Turku ja koko Suomi",
    localBody:
      "Toimipisteemme on Turun keskustassa, ja tapaamme mielellämme kasvotusten Varsinais-Suomen alueella. Projektit hoituvat kuitenkin yhtä hyvin etänä, ja meillä on asiakkaita ympäri Suomen.",
    areasTitle: "Toiminta-alue",
    areas: [
      "Turku ja Kaarina",
      "Raisio ja Naantali",
      "Salo ja Paimio",
      "Varsinais-Suomi",
      "Koko Suomi etänä",
    ],
  },

  contact: {
    metaTitle: "Yhteystiedot | Stellar Stack",
    metaDescription: `Ota yhteyttä: ${site.email}, ${site.phoneDisplay}. Toimisto ${site.address.street}, ${site.address.postalCode} ${site.address.city}.`,
    eyebrow: "Yhteystiedot",
    title: "Kerro mitä olet rakentamassa",
    lede: "Vastaamme yleensä saman arkipäivän aikana. Maksuton kartoitus kestää noin puoli tuntia, eikä se sido sinua mihinkään.",
    formTitle: "Lähetä viesti",
    formNote:
      "Lomake avaa sähköpostiohjelmasi valmiiksi täytetyllä viestillä. Voit myös soittaa tai kirjoittaa suoraan.",
    fields: {
      name: "Nimi",
      company: "Yritys",
      email: "Sähköposti",
      phone: "Puhelin",
      service: "Mistä on kyse",
      servicePlaceholder: "Valitse aihe",
      message: "Viesti",
      messagePlaceholder:
        "Kerro lyhyesti mitä yrityksesi tekee ja mitä sivustolta odotat.",
      submit: "Lähetä viesti",
    },
    directTitle: "Suorat yhteystiedot",
    addressLabel: "Toimisto",
    emailLabel: "Sähköposti",
    phoneLabel: "Puhelin",
    hoursLabel: "Tavoitat meidät",
    hours: "Maanantaista perjantaihin klo 9 to 17",
    responseNote: "Vastaamme yleensä muutamassa tunnissa arkisin.",
  },

  offer: {
    metaTitle: `Kampanja: uusi sivusto ${site.offer.setup} € | Stellar Stack`,
    metaDescription: `Monikielinen yrityssivusto ${site.offer.setup} eurolla ja ylläpito ${site.offer.monthly} euroa kuukaudessa. Toimitus noin viikossa, ei sitoutumisaikaa.`,
    eyebrow: "Aloituskampanja",
    headline: "Koko sivusto valmiina viikossa",
    lede: "Tämä on kiinteähintainen paketti pienyrityksille, jotka tarvitsevat toimivan sivuston nopeasti. Sama tekniikka ja sama laatu kuin isommissa projekteissamme, rajattuna laajuuteen jonka saa valmiiksi viikossa.",
    priceLabel: "Kertamaksu",
    priceSuffix: "sisältää koko toteutuksen",
    regularLabel: "Normaalisti",
    monthlyLabel: "Ylläpito",
    monthlySuffix: "kuukaudessa, ei määräaikaa",
    includedTitle: "Hintaan sisältyy",
    included: [
      "Jopa viisi sivua: etusivu, palvelut, referenssit, meistä ja yhteystiedot",
      "Kaikki kolmella kielellä: suomi, ruotsi ja englanti",
      "Tekstien kirjoittaminen puhelun pohjalta, et kirjoita niitä itse",
      "Mobiilioptimointi ja saavutettavuustarkistus",
      "Yhteydenottolomake, joka ohjautuu sähköpostiisi",
      "Google Business -profiilin tarkistus ja korjaus",
      "Hakukoneiden perusoptimointi ja sivukartta",
      "Kävijämittaus ilman evästebannerin pakkoa",
      "Verkkotunnuksen ja sähköpostin käyttöönotto",
      "SSL-varmenne ja suomalainen palvelinsijainti",
    ],
    notIncludedTitle: "Ei sisälly, hinnoitellaan erikseen",
    notIncluded: [
      "Verkkokauppa ja maksunvälitys",
      "Ajanvarausjärjestelmä ja kalenterisynkronointi",
      "Valokuvaus ja videotuotanto",
      "Jatkuva mainonta tai hakukoneoptimointi",
      "Yli viiden sivun laajuus",
    ],
    timelineTitle: "Viikko käytännössä",
    timeline: [
      {
        day: "Päivä 1",
        title: "Kartoitus",
        body: "Puolen tunnin puhelu. Käymme läpi liiketoiminnan, asiakkaat ja tavoitteet. Sen jälkeen sinulta ei tarvita juuri mitään.",
      },
      {
        day: "Päivä 2 to 3",
        title: "Sisältö",
        body: "Kirjoitamme tekstit kolmella kielellä ja kokoamme kuvat. Saat ne kommentoitavaksi.",
      },
      {
        day: "Päivä 4 to 5",
        title: "Toteutus",
        body: "Rakennamme sivuston ja lähetämme esikatselulinkin. Korjaamme kaiken mitä haluat muuttaa.",
      },
      {
        day: "Päivä 6 to 7",
        title: "Julkaisu",
        body: "Verkkotunnus, sähköposti, mittaus ja hakukoneilmoitukset kuntoon. Sivusto on julkinen.",
      },
    ],
    guaranteeTitle: "Jos et ole tyytyväinen",
    guaranteeBody:
      "Esikatselu näytetään sinulle ennen kuin mitään laskutetaan. Jos et esikatselun jälkeen halua jatkaa, projekti päättyy siihen eikä laskua tule.",
    cta: "Varaa maksuton kartoitus",
    faq: [
      {
        q: "Onko hinta oikeasti kiinteä?",
        a: `Kyllä. ${site.offer.setup} euroa kattaa koko toteutuksen edellä kuvatussa laajuudessa. Ainoa tapa jolla hinta muuttuu on se, että sinä haluat jotain mikä on listattu kohdassa "ei sisälly", ja siitä sovitaan erikseen kirjallisesti etukäteen.`,
      },
      {
        q: "Mitä ylläpito sisältää?",
        a: `${site.offer.monthly} euroa kuukaudessa kattaa palvelintilan, SSL-varmenteen, varmuuskopiot, tietoturvapäivitykset, seurannan ja pienet sisältömuutokset kuten hintojen, aukioloaikojen tai yhteystietojen päivitykset. Irtisanomisaika on yksi kuukausi.`,
      },
      {
        q: "Tarvitseeko minun kirjoittaa tekstit?",
        a: "Ei. Kirjoitamme ne puhelun pohjalta ja lähetämme sinulle tarkistettavaksi. Useimmilta asiakkailta kuluu koko projektiin alle kaksi tuntia omaa aikaa.",
      },
      {
        q: "Entä jos minulla on jo sivusto?",
        a: "Sekin käy. Siirrämme sisällön, säilytämme vanhat osoitteet uudelleenohjauksilla niin ettei Google-näkyvyys katoa, ja julkaisemme uuden version samaan verkkotunnukseen.",
      },
      {
        q: "Omistanko sivuston?",
        a: "Kyllä. Verkkotunnus rekisteröidään sinun nimiisi, sisältö on sinun ja lähdekoodi luovutetaan pyydettäessä. Jos lopetat ylläpidon, saat sivuston mukaasi.",
      },
      {
        q: "Miksi ruotsi ja englanti kuuluvat hintaan?",
        a: "Koska Suomessa se on harvinaista ja se maksaa itsensä takaisin. Rakennamme kielituen sivuston pohjalle joka tapauksessa, joten kahden lisäkielen mukaan ottaminen ei kaksinkertaista työtä.",
      },
    ],
    smallPrint: `Hintoihin lisätään alv ${site.vatRate}. Kampanjahinta koskee uusia asiakkaita ja edellä kuvattua laajuutta. Normaali hinta vastaavalle toteutukselle on ${site.offer.setupRegular} euroa.`,
  },

  privacy: {
    metaTitle: "Tietosuojaseloste | Stellar Stack",
    metaDescription:
      "Miten Stellar Stack käsittelee henkilötietoja verkkosivustollaan ja asiakassuhteissa.",
    title: "Tietosuojaseloste",
    updated: "Päivitetty 18.8.2026",
    sections: [
      {
        heading: "Rekisterinpitäjä",
        body: [
          `${site.name}, ${site.address.street}, ${site.address.postalCode} ${site.address.city}. Tietosuoja-asioissa voit olla yhteydessä osoitteeseen ${site.email} tai numeroon ${site.phoneDisplay}.`,
        ],
      },
      {
        heading: "Mitä tietoja keräämme",
        body: [
          "Keräämme vain ne tiedot, jotka annat itse ottaessasi yhteyttä: nimen, yrityksen, sähköpostiosoitteen, puhelinnumeron ja viestin sisällön.",
          "Emme kerää tietoja kolmansilta osapuolilta emmekä osta markkinointilistoja.",
        ],
      },
      {
        heading: "Mihin tietoja käytetään",
        body: [
          "Yhteydenottoihin vastaamiseen, tarjousten laatimiseen ja asiakassuhteen hoitamiseen. Käsittelyn peruste on sopimuksen valmistelu tai oikeutettu etu vastata yhteydenottoosi.",
          "Emme käytä yhteydenottotietoja markkinointiin ilman erillistä suostumustasi emmekä luovuta niitä eteenpäin markkinointitarkoituksiin.",
        ],
      },
      {
        heading: "Evästeet ja kävijämittaus",
        body: [
          "Sivusto ei käytä seurantaevästeitä eikä mainosverkostojen seurantaa. Kävijämäärien seuranta toteutetaan tavalla, joka ei tallenna evästeitä eikä yksilöi kävijää.",
          "Tästä syystä sivustolla ei ole evästebanneria: sellaiselle ei ole tarvetta, kun seurantaevästeitä ei aseteta.",
        ],
      },
      {
        heading: "Säilytysaika",
        body: [
          "Yhteydenotot säilytetään enintään kaksi vuotta viimeisestä yhteydenotosta, minkä jälkeen ne poistetaan. Asiakassuhteeseen liittyvät tiedot säilytetään kirjanpitolain edellyttämän ajan.",
        ],
      },
      {
        heading: "Tietojen sijainti ja siirrot",
        body: [
          "Sivusto ja siihen liittyvät tiedot sijaitsevat Euroopan unionin alueella. Emme siirrä henkilötietoja EU:n tai ETA:n ulkopuolelle.",
        ],
      },
      {
        heading: "Oikeutesi",
        body: [
          "Sinulla on oikeus tarkastaa itseäsi koskevat tiedot, pyytää niiden oikaisemista tai poistamista, vastustaa käsittelyä ja tehdä valitus tietosuojavaltuutetun toimistolle.",
          `Pyynnöt osoitetaan sähköpostitse osoitteeseen ${site.email}. Vastaamme kuukauden kuluessa.`,
        ],
      },
    ],
  },

  footer: {
    tagline:
      "Nopeita monikielisiä verkkosivuja ja digitaalista kasvua suomalaisille pienyrityksille. Turusta koko Suomeen.",
    servicesTitle: "Palvelut",
    companyTitle: "Yritys",
    contactTitle: "Yhteystiedot",
    rights: "Kaikki oikeudet pidätetään.",
    businessIdPending: "Y-tunnus rekisteröinnissä",
  },

  notFound: {
    title: "Sivua ei löytynyt",
    body: "Etsimääsi sivua ei ole tai se on siirretty. Palaa etusivulle tai ota yhteyttä, niin autamme.",
    cta: "Palaa etusivulle",
  },

  serviceCopy: {
    verkkosivut: {
      name: "Verkkosivut",
      tagline:
        "Nopea, monikielinen yrityssivusto joka muuttaa kävijät yhteydenotoiksi.",
      intro:
        "Yrityssivusto on useimmiten ensimmäinen paikka, jossa asiakas päättää soittaako hän sinulle vai kilpailijalle. Rakennamme sivuston, joka latautuu alle sekunnissa, toimii puhelimessa yhtä hyvin kuin koneella ja kertoo kolmella kielellä miksi sinut kannattaa valita.",
      priceHint: `alkaen ${site.offer.setup} €`,
      deliverables: [
        "Sivukartta ja rakenne liiketoimintasi mukaan",
        "Tekstien kirjoittaminen suomeksi, ruotsiksi ja englanniksi",
        "Responsiivinen toteutus kaikille päätelaitteille",
        "Saavutettavuustarkistus WCAG-kriteerejä vasten",
        "Yhteydenottolomakkeet ja puhelinlinkit",
        "Hakukoneiden perusoptimointi ja rakenteinen data",
        "Julkaisu, verkkotunnus ja SSL-varmenne",
      ],
      sections: [
        {
          title: "Miksi staattinen toteutus",
          body: "Useimmat suomalaiset pienyritysten sivut pyörivät julkaisujärjestelmällä, joka kokoaa sivun uudelleen jokaisella latauksella ja vaatii jatkuvia tietoturvapäivityksiä. Me rakennamme sivut valmiiksi tiedostoiksi. Palvelin lähettää ne sellaisenaan, mikä tarkoittaa nopeampaa latausta, pienempää hyökkäyspintaa ja halvempaa ylläpitoa.",
        },
        {
          title: "Kolme kieltä ei ole lisäosa",
          body: "Kielituki rakennetaan sivuston pohjalle heti alusta, ei liimata päälle jälkikäteen. Jokainen sivu saa oman osoitteensa kullakin kielellä, oikean kielimerkinnän ja hakukoneille kerrotut kieliversiot. Ruotsinkielinen asiakas löytää sinut ruotsiksi.",
        },
        {
          title: "Mitattavuus alusta asti",
          body: "Sivustolle kytketään kävijämittaus, joka kertoo mitkä sivut tuovat yhteydenottoja ja mistä kävijät tulevat. Toteutus ei aseta seurantaevästeitä, joten evästebanneria ei tarvita eikä mittaus katoa siihen että kävijä klikkaa banneria pois.",
        },
      ],
      faq: [
        {
          q: "Kuinka kauan toteutus kestää?",
          a: `Kampanjapaketti valmistuu noin viikossa. Laajemmat sivustot vievät kahdesta neljään viikkoa riippuen sivumäärästä ja siitä, kuinka nopeasti saamme sisällöt ja kuvat.`,
        },
        {
          q: "Voinko päivittää sisältöä itse?",
          a: "Pienet muutokset kuten hinnat, aukioloajat ja yhteystiedot kuuluvat ylläpitoon: lähetät viestin ja me teemme ne. Jos haluat päivittää itse, rakennamme kevyen hallintanäkymän erikseen hinnoiteltuna.",
        },
        {
          q: "Mitä tapahtuu vanhalle sivustolleni?",
          a: "Siirrämme sisällön ja teemme uudelleenohjaukset vanhoista osoitteista uusiin, jolloin Googlessa jo ansaittu näkyvyys säilyy. Vanha sivusto voidaan pitää pystyssä kunnes uusi on hyväksytty.",
        },
      ],
      metaTitle: "Verkkosivut yrityksille | Stellar Stack",
      metaDescription:
        "Nopeat monikieliset yrityssivut suomalaisille pienyrityksille. Staattinen toteutus, saavutettavuus ja hakukoneoptimointi vakiona.",
    },

    verkkokauppa: {
      name: "Verkkokauppa",
      tagline: "Myy verkossa ilman raskasta alustaa ja kuukausimaksujen suota.",
      intro:
        "Verkkokauppa ei tarvitse olla monimutkainen projekti. Rakennamme kaupan, joka on nopea, jonka maksut toimivat suomalaisilla maksutavoilla ja jonka tuotteita pystyt hallitsemaan ilman koulutusta.",
      priceHint: "alkaen 2 400 €",
      deliverables: [
        "Tuotekatalogi ja kategoriarakenne",
        "Ostoskori ja kassaprosessi",
        "Suomalaiset maksutavat: verkkopankit, kortit ja MobilePay",
        "Toimitustavat ja postin noutopistevalinta",
        "Tilausvahvistukset ja asiakasviestit sähköpostilla",
        "Varastosaldot ja tuotteiden hallinta",
        "Verkkokaupan mittaus ja myyntiraportointi",
      ],
      sections: [
        {
          title: "Oikea kokoluokka",
          body: "Kolmenkymmenen tuotteen verkkokauppa ei tarvitse samaa alustaa kuin kolmentuhannen. Valitsemme ratkaisun tuotemääräsi ja tilausvolyymisi mukaan, jolloin et maksa ominaisuuksista joita et koskaan käytä.",
        },
        {
          title: "Kassa joka ei karkota",
          body: "Suurin osa verkkokaupan menetetystä myynnistä tapahtuu kassalla. Rakennamme kassan, joka toimii puhelimessa, ei pakota rekisteröitymään ja näyttää toimituskulut ennen viimeistä vaihetta.",
        },
        {
          title: "Myös tuotteet löytyvät Googlesta",
          body: "Jokainen tuotesivu saa rakenteisen datan, jolloin hinta ja saatavuus voivat näkyä suoraan hakutuloksissa. Tuotesyöte voidaan kytkeä Google Shoppingiin, jos haluat mainostaa tuotteita.",
        },
      ],
      faq: [
        {
          q: "Mitkä maksutavat ovat mahdollisia?",
          a: "Suomalaiset verkkopankit, maksukortit, MobilePay ja lasku- tai osamaksupalvelut suomalaisten maksunvälittäjien kautta. Maksunvälittäjän sopimus tehdään sinun nimiisi.",
        },
        {
          q: "Voinko yhdistää kaupan kassajärjestelmääni?",
          a: "Useimmiten kyllä, jos kassajärjestelmässäsi on rajapinta. Tarkistamme sen kartoituksessa ennen kuin lupaamme mitään.",
        },
      ],
      metaTitle: "Verkkokauppa pienyritykselle | Stellar Stack",
      metaDescription:
        "Nopea verkkokauppa suomalaisilla maksutavoilla. Oikean kokoluokan ratkaisu ilman turhia kuukausimaksuja.",
    },

    hakukoneoptimointi: {
      name: "Hakukoneoptimointi",
      tagline: "Löydy silloin kun asiakas etsii palveluasi omalta alueeltasi.",
      intro:
        "Paikallinen hakunäkyvyys on pienyritykselle usein tuottavin markkinointikanava, koska hakija on jo ostoaikeissa. Työ jakautuu kahteen: sivuston tekninen kunto ja Google Business -profiilin hoitaminen.",
      priceHint: "alkaen 390 €/kk",
      deliverables: [
        "Hakusanakartoitus omalta toimialalta ja alueelta",
        "Google Business -profiilin optimointi ja ylläpito",
        "Sivuston tekninen tarkistus ja korjaukset",
        "Sivukohtaiset otsikot ja kuvaukset",
        "Paikallishakuun kohdennettu sisältö",
        "Arvostelujen kerääminen ja hallinta",
        "Kuukausiraportti sijoituksista ja liikenteestä",
      ],
      sections: [
        {
          title: "Paikallishaku ratkaisee",
          body: "Kun joku hakee autokorjaamoa Turussa, Google näyttää ensin kartan ja kolme yritystä. Sinne pääseminen riippuu Google Business -profiilin täydellisyydestä, arvostelumäärästä ja siitä että sivustollasi on oikeat tiedot oikeassa muodossa. Tämä on työtä, joka tuottaa nopeimmin.",
        },
        {
          title: "Tekninen kunto on perusta",
          body: "Hidas sivusto ei sijoitu, eikä sivusto jota Google ei pysty lukemaan kunnolla. Käymme läpi latausnopeuden, mobiilikäytettävyyden, otsikkorakenteen ja rakenteisen datan, ja korjaamme mitä pitää.",
        },
        {
          title: "Rehellinen raportointi",
          body: "Saat kuukausittain raportin, joka kertoo millä hauilla näyt, kuinka moni klikkasi ja kuinka moni otti yhteyttä. Emme raportoi lukuja, joilla ei ole tekemistä myynnin kanssa.",
        },
      ],
      faq: [
        {
          q: "Kuinka nopeasti tulokset näkyvät?",
          a: "Google Business -profiilin korjaukset voivat näkyä muutamassa viikossa. Orgaanisen haun sijoitusten muutokset vievät tyypillisesti kolmesta kuuteen kuukautta. Kukaan rehellinen toimija ei lupaa nopeampaa.",
        },
        {
          q: "Takaatteko ykkössijan?",
          a: "Emme, eikä kukaan voi. Google ei myy sijoituksia eikä kerro algoritmiaan. Voimme luvata työn, joka tunnetusti parantaa näkyvyyttä, ja raportoinnin joka näyttää menikö se niin.",
        },
      ],
      metaTitle: "Hakukoneoptimointi ja paikallinen näkyvyys | Stellar Stack",
      metaDescription:
        "Paikallinen hakukoneoptimointi suomalaisille pienyrityksille. Google Business -profiili, tekninen kunto ja rehellinen raportointi.",
    },

    mainonta: {
      name: "Digimainonta",
      tagline: "Maksettua näkyvyyttä silloin kun orgaaninen ei vielä riitä.",
      intro:
        "Hakukoneoptimointi tuottaa hitaasti mutta kestävästi. Mainonta tuottaa heti mutta vain niin kauan kuin maksat. Useimmiten pienyritys tarvitsee molempia, ja mainonta kannattaa aloittaa siitä hausta, joka on lähimpänä ostopäätöstä.",
      priceHint: "alkaen 290 €/kk + mediabudjetti",
      deliverables: [
        "Kampanjarakenne Google Adsissa tai Metassa",
        "Hakusana- ja kohderyhmämäärittely",
        "Mainostekstit ja kuvamateriaalin ohjeistus",
        "Laskeutumissivut kampanjoille",
        "Konversioseurannan asennus",
        "Budjetin seuranta ja optimointi",
        "Kuukausiraportti kustannuksesta per yhteydenotto",
      ],
      sections: [
        {
          title: "Aloitetaan pienestä",
          body: "Emme suosittele suurta budjettia ennen kuin tiedämme mikä toimii. Ensimmäinen kuukausi on mittausta: mitkä haut tuovat yhteydenottoja ja mitkä polttavat rahaa. Vasta sen jälkeen budjettia kannattaa kasvattaa.",
        },
        {
          title: "Mainos ja sivu kuuluvat yhteen",
          body: "Kallein virhe maksetussa mainonnassa on ohjata klikki etusivulle. Rakennamme kampanjalle oman laskeutumissivun, joka vastaa täsmälleen siihen mitä mainoksessa luvattiin.",
        },
        {
          title: "Mittaus ennen rahaa",
          body: "Konversioseuranta asennetaan ennen ensimmäistäkään euroa. Muuten et tiedä toimiiko mainonta, ja optimointi perustuu arvaukseen.",
        },
      ],
      faq: [
        {
          q: "Paljonko mediabudjettia tarvitaan?",
          a: "Paikalliseen palveluun riittää usein 300 to 800 euroa kuukaudessa aloittaakseen. Kilpaillummilla aloilla tarvitaan enemmän. Kerromme realistisen arvion kartoituksessa toimialasi hintatason perusteella.",
        },
        {
          q: "Kuka omistaa mainostilit?",
          a: "Sinä. Tilit perustetaan sinun nimiisi ja me saamme niihin käyttöoikeuden. Jos yhteistyö päättyy, historia ja data jäävät sinulle.",
        },
      ],
      metaTitle: "Google- ja somemainonta pienyrityksille | Stellar Stack",
      metaDescription:
        "Digimainonta suomalaisille pienyrityksille. Mitattu kampanjarakenne, omat laskeutumissivut ja rehellinen kustannusraportointi.",
    },

    sisalto: {
      name: "Sisällöntuotanto",
      tagline: "Tekstit, kuvat ja kieliversiot jotka myyvät puolestasi.",
      intro:
        "Useimmat pienyritysten sivustot epäonnistuvat tekstissä, eivät tekniikassa. Sivulla lukee mitä yritys tekee, mutta ei sitä miksi asiakkaan kannattaisi valita juuri se. Kirjoitamme tekstit, jotka vastaavat asiakkaan oikeisiin kysymyksiin.",
      priceHint: "alkaen 190 € / sivu",
      deliverables: [
        "Sivukohtaiset myyntitekstit",
        "Käännökset ja lokalisointi suomi, ruotsi ja englanti",
        "Hakusanoihin sovitetut otsikot ja kuvaukset",
        "Blogi- ja artikkelisisältö",
        "Tuotekuvaukset verkkokauppaan",
        "Kuvamateriaalin valinta ja käsittely",
        "Sävyn ja sanaston ohjeistus jatkoa varten",
      ],
      sections: [
        {
          title: "Käännös ei riitä",
          body: "Ruotsinkielinen sivu, joka on käännetty suoraan suomesta, kuulostaa käännökseltä. Lokalisoimme tekstit niin että ne toimivat kohdekielellä, ja ruotsinkieliset versiot kirjoitetaan Suomen ruotsin mukaan, ei Ruotsin.",
        },
        {
          title: "Kirjoitetaan asiakkaan kysymyksistä",
          body: "Aloitamme siitä mitä asiakkaasi oikeasti kysyvät puhelimessa. Ne kysymykset ovat myös ne, joita he kirjoittavat Googleen. Sivu joka vastaa niihin selkeästi sekä myy että sijoittuu.",
        },
      ],
      faq: [
        {
          q: "Tarvitsenko blogia?",
          a: "Useimmat pienyritykset eivät tarvitse. Blogi kannattaa vain jos alallasi on kysymyksiä, joita ihmiset oikeasti hakevat, ja jos pystyt ylläpitämään sitä. Kolme hyvää artikkelia on parempi kuin kaksikymmentä huonoa.",
        },
        {
          q: "Voitteko käyttää olemassa olevia tekstejäni?",
          a: "Kyllä, jos ne ovat käyttökelpoisia. Käymme ne läpi, tiivistämme ja terävöitämme sen sijaan että kirjoittaisimme kaiken alusta. Se on myös halvempaa.",
        },
      ],
      metaTitle: "Sisällöntuotanto ja käännökset | Stellar Stack",
      metaDescription:
        "Myyvät verkkosivutekstit suomeksi, ruotsiksi ja englanniksi. Lokalisointi, hakusanaoptimointi ja tuotekuvaukset.",
    },

    analytiikka: {
      name: "Analytiikka",
      tagline: "Tiedä mikä tuo asiakkaita ja mikä vain kuluttaa budjettia.",
      intro:
        "Ilman mittausta markkinointi on arvailua. Rakennamme mittauksen, joka kertoo mistä yhteydenotot tulevat, ja teemme sen tavalla joka kunnioittaa kävijän yksityisyyttä eikä vaadi evästebanneria.",
      priceHint: "alkaen 490 € kertaluontoisesti",
      deliverables: [
        "Kävijämittauksen asennus ilman seurantaevästeitä",
        "Konversiotavoitteet: soitot, lomakkeet ja sähköpostit",
        "Liikenteen lähteiden erittely",
        "Kampanjatunnisteiden käytännöt",
        "Selkeä kuukausinäkymä ilman turhia lukuja",
        "Tietosuojaselosteen tarkistus mittausta vasten",
      ],
      sections: [
        {
          title: "Yksityisyys ilman evästebanneria",
          body: "Käytämme mittausta, joka ei tallenna evästeitä eikä yksilöi kävijää. Se tarkoittaa ettei evästebanneria tarvita, mikä puolestaan tarkoittaa ettei mittaus katoa siihen että kolme neljäsosaa kävijöistä kieltää seurannan.",
        },
        {
          title: "Kolme lukua riittää",
          body: "Useimmat analytiikkanäkymät hukuttavat käyttäjän mittareihin. Rakennamme näkymän, joka vastaa kolmeen kysymykseen: kuinka moni kävi, mistä he tulivat ja kuinka moni otti yhteyttä.",
        },
      ],
      faq: [
        {
          q: "Onko tämä Google Analytics?",
          a: "Ei oletuksena. Suosittelemme evästeetöntä vaihtoehtoa, joka on Suomessa tietosuojan kannalta selkeämpi. Jos tarvitset Google Analyticsia esimerkiksi mainonnan takia, asennamme senkin ja hoidamme suostumusten hallinnan asianmukaisesti.",
        },
      ],
      metaTitle: "Verkkoanalytiikka ilman evästebanneria | Stellar Stack",
      metaDescription:
        "Evästeetön kävijämittaus ja konversioseuranta suomalaisille pienyrityksille. Tiedä mistä yhteydenotot tulevat.",
    },

    sovelluskehitys: {
      name: "Sovelluskehitys",
      tagline:
        "Ajanvaraus, laskuri tai integraatio kun valmis ratkaisu ei riitä.",
      intro:
        "Joskus liiketoiminta tarvitsee jotain, mitä ei saa valmiina: ajanvarauksen joka osaa alasi säännöt, laskurin joka antaa asiakkaalle hinnan heti, tai yhteyden olemassa olevaan järjestelmääsi. Tämä on se osa, jossa ohjelmistotausta oikeasti näkyy.",
      priceHint: "hinta laajuuden mukaan",
      deliverables: [
        "Ajanvaraus kalenterisynkronoinnilla ja muistutuksilla",
        "Hinta- ja tarjouslaskurit",
        "Lomakkeet ja työnkulut jotka ohjautuvat oikeille ihmisille",
        "Integraatiot toiminnanohjaukseen tai kassajärjestelmään",
        "Asiakasviestintä sähköpostilla ja tekstiviestillä",
        "Ylläpito ja seuranta käyttöönoton jälkeen",
      ],
      sections: [
        {
          title: "Rakennettu oikeasti tuotantoon",
          body: "Tikanmaan Huoltoaseman ajanvaraus varaa vuoron atomisesti niin ettei kahta varausta voi tehdä samaan aikaan, synkronoi Google-kalenteriin, lähettää vahvistuksen sekä asiakkaalle että yrittäjälle ja antaa asiakkaan perua itse. Se on tuotannossa ja käytössä.",
        },
        {
          title: "Aloitetaan pienimmästä toimivasta",
          body: "Emme rakenna järjestelmää, jonka kaikkia ominaisuuksia ei koskaan käytetä. Määrittelemme pienimmän version, joka ratkaisee ongelman, viemme sen tuotantoon ja laajennamme sitä käytön perusteella.",
        },
      ],
      faq: [
        {
          q: "Mitä tällainen maksaa?",
          a: "Riippuu kokonaan laajuudesta. Yksinkertainen ajanvaraus on eri asia kuin integraatio toiminnanohjausjärjestelmään. Teemme kartoituksen ja annamme kiinteän hinnan ennen kuin työtä aloitetaan.",
        },
        {
          q: "Kuka ylläpitää sitä myöhemmin?",
          a: "Me, osana ylläpitosopimusta. Lähdekoodi on kuitenkin sinun, joten voit halutessasi siirtää ylläpidon muualle.",
        },
      ],
      metaTitle: "Räätälöity sovelluskehitys ja integraatiot | Stellar Stack",
      metaDescription:
        "Ajanvaraukset, laskurit ja integraatiot suomalaisille pienyrityksille. Rakennettu tuotantoon, ylläpidetty ja omistettu asiakkaan toimesta.",
    },

    yllapito: {
      name: "Ylläpito ja hosting",
      tagline: "Sivusto pysyy nopeana, turvallisena ja ajan tasalla.",
      intro:
        "Sivusto ei ole projekti vaan jatkuva asia. Ylläpito kattaa palvelimen, varmuuskopiot, tietoturvan, seurannan ja ne pienet muutokset, joita tulee jatkuvasti eteen.",
      priceHint: `${site.offer.monthly} €/kk`,
      deliverables: [
        "Palvelintila EU:n alueella ja SSL-varmenne",
        "Automaattiset varmuuskopiot ja palautus",
        "Tietoturvapäivitykset ja seuranta",
        "Käytettävyysvalvonta ja hälytykset",
        "Pienet sisältömuutokset kuukausihinnassa",
        "Suorituskyvyn seuranta ja optimointi",
        "Tuki suomeksi sähköpostitse ja puhelimitse",
      ],
      sections: [
        {
          title: "Mitä pieni muutos tarkoittaa",
          body: "Hintojen, aukioloaikojen, yhteystietojen, henkilöstön tai palvelukuvausten päivitykset kuuluvat kuukausihintaan. Uusi sivu, uusi kieliversio tai uusi toiminnallisuus on erillinen työ, ja siitä kerrotaan hinta etukäteen.",
        },
        {
          title: "Ei määräaikaa",
          body: "Irtisanomisaika on yksi kuukausi. Emme sido asiakkaita vuosisopimuksilla, koska jos palvelu on hyvää, sitä ei tarvitse pakottaa jatkumaan.",
        },
      ],
      faq: [
        {
          q: "Mitä jos lopetan ylläpidon?",
          a: "Saat sivuston tiedostot ja lähdekoodin mukaasi, ja verkkotunnus on jo valmiiksi sinun nimissäsi. Autamme siirrossa uudelle toimittajalle.",
        },
        {
          q: "Kuinka nopeasti pienet muutokset tehdään?",
          a: "Tyypillisesti saman tai seuraavan arkipäivän aikana. Kiireelliset korjaukset kuten väärä puhelinnumero tai virheellinen hinta hoidetaan heti.",
        },
      ],
      metaTitle: "Verkkosivujen ylläpito ja hosting | Stellar Stack",
      metaDescription: `Verkkosivujen ylläpito ${site.offer.monthly} euroa kuukaudessa: hosting EU:ssa, varmuuskopiot, tietoturva ja pienet sisältömuutokset.`,
    },
  },

  industryCopy: {
    autoala: {
      name: "Autoala ja huoltoasemat",
      tagline: "Korjaamot, huoltoasemat, rengasliikkeet ja autopesut.",
      intro:
        "Autoalalla asiakas etsii harvoin brändiä. Hän etsii lähintä paikkaa, joka pystyy hoitamaan asian nopeasti ja jonka hinnan hän tietää etukäteen. Sivuston tehtävä on vastata näihin kolmeen asiaan ennen kuin hän ehtii soittaa kilpailijalle.",
      problems: [
        "Hinnat puuttuvat sivustolta, joten asiakas soittaa sille joka ne kertoo",
        "Ajanvaraus hoituu vain puhelimella, mikä kaataa työn vastaanoton päälle",
        "Google Business -profiili on vajaa tai aukioloajat ovat väärin",
        "Sivusto ei toimi puhelimessa, vaikka lähes kaikki haut tehdään sieltä",
      ],
      solutions: [
        {
          title: "Hinnasto joka on oikeasti näkyvissä",
          body: "Rakennamme palveluhinnaston, joka näyttää hinnat ajoneuvoluokittain ja jota päivitetään yhdellä viestillä. Asiakas näkee hinnan heti eikä joudu soittamaan kysyäkseen.",
        },
        {
          title: "Ajanvaraus joka vähentää puheluita",
          body: "Asiakas valitsee palvelun, ajoneuvon ja vapaan ajan itse. Varaus menee suoraan kalenteriisi, molemmat saavat vahvistuksen ja asiakas voi perua itse ilman että kukaan soittaa.",
        },
        {
          title: "Paikallishaku kuntoon",
          body: "Google Business -profiili, aukioloajat, kuvat ja arvostelut ovat autoalalla usein tärkeämpiä kuin itse sivusto. Hoidamme molemmat ja pidämme ne yhdenmukaisina.",
        },
      ],
      essentials: [
        "Palveluhinnasto ajoneuvoluokittain",
        "Verkkoajanvaraus kalenterisynkronoinnilla",
        "Aukioloajat myös poikkeuspäiville",
        "Ajo-ohje ja kartta",
        "Renkaiden kausisäilytys ja hinnat",
        "Katsastuspalvelut ja määräaikaishuollot",
        "Yhteydenotto yhdellä painalluksella mobiilissa",
      ],
      metaTitle: "Verkkosivut korjaamolle ja huoltoasemalle | Stellar Stack",
      metaDescription:
        "Verkkosivut autoalalle: hinnasto, verkkoajanvaraus ja paikallinen hakunäkyvyys. Toteutuksia tuotannossa.",
    },

    rakennus: {
      name: "Rakennus, LVI ja sähkö",
      tagline: "Rakennusliikkeet, putkiasennus, sähköurakointi ja remontointi.",
      intro:
        "Rakennusalalla luottamus ratkaisee. Asiakas päästää sinut kotiinsa ja maksaa merkittävän summan, joten hän haluaa nähdä työnjälkeä, tietää että olet luotettava sopimuskumppani ja saada tarjouksen ilman kolmea puhelua.",
      problems: [
        "Ei kuvia valmiista töistä, jolloin laatua ei voi arvioida",
        "Tarjouspyyntö vaatii soittamisen kesken työpäivän",
        "Luotettavuutta ei todisteta millään: ei tilaajavastuutietoja, ei referenssejä",
        "Sivusto ei kerro millä alueella toimitaan",
      ],
      solutions: [
        {
          title: "Työnäytteet jotka myyvät",
          body: "Rakennamme referenssigallerian, jossa jokainen kohde kertoo mitä tehtiin, missä ja kuinka kauan meni. Ennen ja jälkeen -kuvat myyvät rakennusalalla paremmin kuin mikään teksti.",
        },
        {
          title: "Tarjouspyyntö joka kysyy oikeat asiat",
          body: "Lomake kysyy kohteen tyypin, laajuuden, aikataulun ja kuvat, jolloin pystyt antamaan hinta-arvion vastaamatta ensin kymmentä tarkentavaa kysymystä.",
        },
        {
          title: "Luottamus todistetaan",
          body: "Tilaajavastuutiedot, vakuutukset, pätevyydet ja kotitalousvähennyksen ohjeistus näkyvät sivustolla. Ne ovat asioita, joita asiakas etsii ja joiden puuttuminen karsii sinut pois.",
        },
      ],
      essentials: [
        "Referenssigalleria kohteittain",
        "Tarjouspyyntölomake kuvien liittämisellä",
        "Toiminta-alue kartalla",
        "Tilaajavastuu ja vakuutustiedot",
        "Kotitalousvähennyksen laskuri tai ohje",
        "Pätevyydet ja sertifikaatit",
        "Päivystysnumero jos sellainen on",
      ],
      metaTitle:
        "Verkkosivut rakennusalalle ja LVI-yrityksille | Stellar Stack",
      metaDescription:
        "Verkkosivut rakennus-, LVI- ja sähköalan yrityksille: referenssigalleria, tarjouspyyntö ja tilaajavastuutiedot.",
    },

    kiinteistohuolto: {
      name: "Siivous ja kiinteistöhuolto",
      tagline: "Siivousliikkeet, kiinteistöhuolto, piha- ja viherpalvelut.",
      intro:
        "Siivous ja kiinteistöhuolto myydään sopimuksina, ei kertaostoina. Sivuston tehtävä on kertoa selkeästi mitä sopimus sisältää, kenelle se sopii ja mitä se maksaa, jotta oikeat asiakkaat ottavat yhteyttä ja väärät eivät.",
      problems: [
        "Palvelupaketit ovat epäselviä, joten jokainen tarjous tehdään alusta",
        "Yrityssiivous ja kotisiivous sekoittuvat samalle sivulle",
        "Hinnoittelumalli ei käy ilmi, mikä tuo vääriä yhteydenottoja",
        "Ei tapaa erottua kymmenestä samannäköisestä kilpailijasta",
      ],
      solutions: [
        {
          title: "Selkeät palvelupaketit",
          body: "Erottelemme kotitalous- ja yritysasiakkaat omiksi poluikseen ja kuvaamme jokaisen paketin sisällön ja hinnoitteluperusteen. Se karsii yhteydenotot, joista ei koskaan tulisi asiakkaita.",
        },
        {
          title: "Hinta-arvio ilman puhelua",
          body: "Neliömäärään tai huonemäärään perustuva laskuri antaa asiakkaalle suuntaa antavan hinnan heti. Se lisää yhteydenottoja ja vähentää turhia tarjouspyyntöjä.",
        },
        {
          title: "Luotettavuus näkyviin",
          body: "Siivousalalla asiakas antaa avaimet kotiinsa tai toimistoonsa. Henkilöstön esittely, taustatarkistukset, vakuutukset ja sopimusehdot rakentavat luottamuksen ennen ensimmäistä puhelua.",
        },
      ],
      essentials: [
        "Erilliset polut yritys- ja kotiasiakkaille",
        "Palvelupakettien sisältö ja hinnoitteluperuste",
        "Hinta-arviolaskuri",
        "Toiminta-alue ja vasteajat",
        "Vakuutukset ja sopimusehdot",
        "Kotitalousvähennyksen ohjeistus",
        "Kausipalvelut kuten lumityöt ja pihanhoito",
      ],
      metaTitle:
        "Verkkosivut siivousalalle ja kiinteistöhuoltoon | Stellar Stack",
      metaDescription:
        "Verkkosivut siivousliikkeille ja kiinteistöhuollolle: selkeät palvelupaketit, hinta-arviolaskuri ja sopimusasiakkaiden hankinta.",
    },

    ravintolat: {
      name: "Ravintolat ja kahvilat",
      tagline: "Ravintolat, kahvilat, lounaspaikat ja pitopalvelut.",
      intro:
        "Ravintola-alalla asiakas päättää nopeasti ja puhelimella. Hän haluaa tietää kolme asiaa: onko auki, mitä on tarjolla ja miten sinne pääsee. Kaikki muu on toissijaista.",
      problems: [
        "Ruokalista on PDF-tiedostona, joka ei aukea puhelimessa kunnolla",
        "Lounaslista päivittyy viikoittain, mutta sivustolla lukee viime kuun lista",
        "Aukioloajat ovat eri sivustolla ja Googlessa",
        "Pöytävaraus vaatii soittamisen kesken ruuhkan",
      ],
      solutions: [
        {
          title: "Ruokalista joka toimii puhelimessa",
          body: "Ruokalista rakennetaan sivuksi eikä PDF-tiedostoksi. Se latautuu heti, on luettavissa puhelimella, näkyy Googlessa ja on päivitettävissä yhdellä viestillä.",
        },
        {
          title: "Lounaslista joka pysyy ajan tasalla",
          body: "Viikoittain vaihtuva lounaslista on nopeasti päivitettävissä ja se voidaan julkaista samalla kertaa sivustolle ja sosiaaliseen mediaan. Vanha lista karkottaa asiakkaita.",
        },
        {
          title: "Varaus ja tilaus ilman puhelua",
          body: "Pöytävaraus tai tilausjärjestelmä pitopalvelulle, joka menee suoraan kalenteriisi. Vähemmän puheluita ruuhka-aikaan, enemmän varauksia iltaisin kun kukaan ei vastaa puhelimeen.",
        },
      ],
      essentials: [
        "Ruokalista sivuna, ei PDF-tiedostona",
        "Lounaslista viikoittaisella päivityksellä",
        "Aukioloajat myös juhlapyhille",
        "Pöytävaraus tai tilauslomake",
        "Allergeenit ja erikoisruokavaliot",
        "Kuvat ruoasta ja tilasta",
        "Kartta, pysäköinti ja esteettömyys",
      ],
      metaTitle: "Verkkosivut ravintolalle ja kahvilalle | Stellar Stack",
      metaDescription:
        "Verkkosivut ravintoloille ja kahviloille: ruokalista sivuna, ajantasainen lounaslista ja pöytävaraus.",
    },

    kauneus: {
      name: "Kauneus ja hyvinvointi",
      tagline: "Kampaamot, parturit, kauneushoitolat, kuntosalit ja studiot.",
      intro:
        "Kauneus- ja hyvinvointialalla myynti tapahtuu ajanvarauksessa. Jos asiakas ei pysty varaamaan aikaa silloin kun hän ajattelee asiaa, hän ei varaa lainkaan. Illalla ja viikonloppuna puhelimeen ei vastaa kukaan.",
      problems: [
        "Ajanvaraus vain puhelimitse, jolloin ilta-asiakkaat menetetään",
        "Hinnasto puuttuu tai on epäselvä, mikä nostaa kynnystä",
        "Työnäytteitä ei näytetä, vaikka ala on täysin visuaalinen",
        "Uudet asiakkaat eivät tiedä ketä he ovat tulossa tapaamaan",
      ],
      solutions: [
        {
          title: "Ajanvaraus joka on auki aina",
          body: "Asiakas valitsee palvelun, tekijän ja ajan silloin kun hänelle sopii. Varaus synkronoituu kalenteriisi ja muistutus lähtee automaattisesti, mikä vähentää saapumatta jääneitä aikoja.",
        },
        {
          title: "Hinnasto ilman kysymyksiä",
          body: "Palvelut ja hinnat näkyvät selkeästi, tarvittaessa keston ja tekijätason mukaan. Läpinäkyvä hinnasto laskee kynnystä varata uudelta paikalta.",
        },
        {
          title: "Työnäytteet ja tekijät esiin",
          body: "Galleria valmiista töistä ja lyhyt esittely jokaisesta tekijästä. Asiakas valitsee usein ihmisen, ei liikkeen, ja tämä on ala jossa se näkyy suoraan varauksissa.",
        },
      ],
      essentials: [
        "Verkkoajanvaraus tekijän mukaan",
        "Hinnasto palveluittain ja kestoineen",
        "Galleria valmiista töistä",
        "Tekijöiden esittelyt",
        "Lahjakortit ja kampanjat",
        "Peruutusehdot selkeästi",
        "Sijainti, pysäköinti ja kulkuohje",
      ],
      metaTitle: "Verkkosivut kampaamolle ja hoitolalle | Stellar Stack",
      metaDescription:
        "Verkkosivut kauneus- ja hyvinvointialalle: verkkoajanvaraus, selkeä hinnasto ja galleria valmiista töistä.",
    },

    kauppa: {
      name: "Kauppa ja verkkokauppa",
      tagline: "Erikoisliikkeet, vähittäiskauppa ja verkossa myyvät yritykset.",
      intro:
        "Pieni erikoisliike kilpailee verkkojättejä vastaan, eikä se voita hinnalla. Se voittaa valikoimalla, asiantuntemuksella ja sillä että tavaran saa heti. Sivuston tehtävä on tehdä nuo kolme asiaa näkyviksi.",
      problems: [
        "Valikoimaa ei näy verkossa, joten asiakas ei tiedä kannattaako tulla",
        "Saatavuutta ei voi tarkistaa etukäteen",
        "Verkkokauppa on liian raskas ja kallis pieneen valikoimaan",
        "Asiantuntemus ei välity mitenkään",
      ],
      solutions: [
        {
          title: "Valikoima näkyviin ilman täyttä verkkokauppaa",
          body: "Tuoteluettelo, jossa näkyvät tuotteet, hinnat ja saatavuus, mutta ostaminen tapahtuu myymälässä. Se on murto-osa verkkokaupan hinnasta ja tuo asiakkaita ovesta sisään.",
        },
        {
          title: "Verkkokauppa kun se kannattaa",
          body: "Jos verkkomyynti on oikeasti tavoite, rakennamme kaupan suomalaisilla maksutavoilla ja noutopistetoimituksilla. Mutta sanomme suoraan jos arvioimme ettei se kannata.",
        },
        {
          title: "Asiantuntemus erottautumiskeinona",
          body: "Ostajan oppaat, vertailut ja huolto-ohjeet ovat sisältöä, jota verkkojätit eivät tuota ja jota ihmiset hakevat Googlesta. Se tuo liikennettä ja rakentaa luottamusta.",
        },
      ],
      essentials: [
        "Tuoteluettelo hinnoin ja saatavuustiedoin",
        "Verkkokauppa suomalaisilla maksutavoilla",
        "Varaa ja nouda myymälästä",
        "Ostajan oppaat ja vertailut",
        "Aukioloajat ja sijainti",
        "Kampanjat ja sesonkituotteet",
        "Huolto- ja takuuasiat",
      ],
      metaTitle:
        "Verkkosivut ja verkkokauppa erikoisliikkeelle | Stellar Stack",
      metaDescription:
        "Verkkosivut ja verkkokauppa vähittäiskaupalle: tuoteluettelo, saatavuus, noutopalvelu ja suomalaiset maksutavat.",
    },

    asiantuntijat: {
      name: "Asiantuntijapalvelut",
      tagline:
        "Tilitoimistot, lakiasiaintoimistot, konsultit ja kiinteistönvälitys.",
      intro:
        "Asiantuntijapalvelussa asiakas ostaa luottamusta, ei tuotetta. Hän ei voi arvioida työn laatua etukäteen, joten hän arvioi kaiken muun: kuka olet, keitä olet auttanut ja kuulostatko siltä että ymmärrät hänen tilanteensa.",
      problems: [
        "Sivusto puhuu palveluista mutta ei ihmisistä",
        "Ei mitään keinoa arvioida osaamista ennen yhteydenottoa",
        "Hinnoittelu on täysin piilossa, mikä nostaa kynnystä",
        "Samat geneeriset tekstit kuin jokaisella kilpailijalla",
      ],
      solutions: [
        {
          title: "Ihmiset ensin",
          body: "Asiantuntijoiden esittelyt, taustat ja erikoisalat näkyviin. Asiakas valitsee ihmisen. Kasvoton toimisto häviää nimetylle asiantuntijalle lähes aina.",
        },
        {
          title: "Osaaminen todistetaan sisällöllä",
          body: "Selkeät artikkelit alasi kysymyksistä toimivat kahdesti: ne tuovat hakuliikennettä ja ne todistavat osaamisen ennen ensimmäistä tapaamista. Yksi hyvä artikkeli aiheesta jota ihmiset hakevat on tehokkaampi kuin kymmenen palvelusivua.",
        },
        {
          title: "Hinnoittelun avaaminen",
          body: "Kaikkea ei voi hinnoitella etukäteen, mutta jotain voi: tuntihinnan haarukka, kiinteähintaiset peruspalvelut tai maksuton alkukartoitus. Jokainen näistä laskee kynnystä ottaa yhteyttä.",
        },
      ],
      essentials: [
        "Asiantuntijoiden esittelyt ja erikoisalat",
        "Palvelukuvaukset asiakastilanteittain",
        "Artikkelit ja oppaat",
        "Hinnoitteluperiaatteet tai hintahaarukka",
        "Maksuton alkukartoitus ja ajanvaraus",
        "Toimeksiantoprosessin kuvaus",
        "Tietoturva ja salassapito",
      ],
      metaTitle:
        "Verkkosivut tilitoimistolle ja asiantuntijayritykselle | Stellar Stack",
      metaDescription:
        "Verkkosivut asiantuntijapalveluille: asiantuntijaesittelyt, sisältömarkkinointi ja luottamusta rakentava rakenne.",
    },

    terveys: {
      name: "Terveys ja hyvinvointi",
      tagline: "Hammaslääkärit, fysioterapia, klinikat ja eläinlääkärit.",
      intro:
        "Terveysalalla asiakas on usein huolissaan ja etsii apua nopeasti. Sivuston pitää olla rauhallinen, selkeä ja helppo, ja ajanvarauksen pitää toimia ilman että hän joutuu selittämään asiaansa puhelimessa jonottaen.",
      problems: [
        "Ajanvaraus vain puhelinaikoina, jolloin kiireinen asiakas menetetään",
        "Hinnat ja Kela-korvaukset ovat epäselviä",
        "Ei tietoa siitä mitä vastaanotolla tapahtuu, mikä lisää kynnystä",
        "Henkilöstön pätevyydet eivät näy",
      ],
      solutions: [
        {
          title: "Ajanvaraus ilman puhelinjonoa",
          body: "Asiakas varaa ajan hoitotyypin ja ammattilaisen mukaan silloin kun hän ajattelee asiaa. Muistutus vähentää peruuttamatta jääneitä aikoja, mikä on suoraan rahaa.",
        },
        {
          title: "Hinnat ja korvaukset selväksi",
          body: "Hinnasto ja se, mitä Kela korvaa ja paljonko jää maksettavaksi. Tämä on ala, jolla epäselvä hinta estää yhteydenoton useammin kuin korkea hinta.",
        },
        {
          title: "Ensimmäinen käynti ennakoitavaksi",
          body: "Kuvaus siitä mitä ensimmäisellä käynnillä tapahtuu, kauanko se kestää ja mitä pitää ottaa mukaan. Se laskee kynnystä varata merkittävästi, erityisesti hammashoidossa.",
        },
      ],
      essentials: [
        "Verkkoajanvaraus hoitotyypeittäin",
        "Hinnasto ja Kela-korvaukset",
        "Ammattilaisten pätevyydet ja erikoisalat",
        "Ensimmäisen käynnin kuvaus",
        "Peruutusehdot ja päivystys",
        "Esteettömyys ja pysäköinti",
        "Tietosuoja ja potilastietojen käsittely",
      ],
      metaTitle: "Verkkosivut hammaslääkärille ja klinikalle | Stellar Stack",
      metaDescription:
        "Verkkosivut terveysalan toimijoille: verkkoajanvaraus, selkeä hinnasto Kela-korvauksineen ja luottamusta rakentava sisältö.",
    },
  },

  projectCopy: {
    "tikanmaan-huoltoasema": {
      client: "Tikanmaan Huoltoasema",
      sector: "Autoala ja huoltoasema",
      summary:
        "Kolmikielinen sivusto ja verkkoajanvaraus perinteiselle huoltoasemalle. Varaus synkronoituu kalenteriin ja lähettää vahvistukset automaattisesti.",
      challenge:
        "Huoltoasemalla ei ollut lainkaan toimivaa verkkonäkyvyyttä, ja jokainen ajanvaraus hoidettiin puhelimitse kesken työn. Puhelut keskeyttivät korjaamotyön, iltaisin ja viikonloppuisin tulevat varaukset menetettiin kokonaan, ja palveluiden hinnat piti kertoa erikseen jokaiselle soittajalle.",
      approach:
        "Rakensimme kolmikielisen sivuston, jossa on täydellinen palveluhinnasto ajoneuvoluokittain, ja sen päälle verkkoajanvarauksen. Asiakas valitsee palvelun, ajoneuvon ja vapaan ajan, varaus lukitaan atomisesti niin ettei päällekkäisiä varauksia synny, se synkronoituu Google-kalenteriin muistutuksineen ja vahvistusviesti lähtee sekä asiakkaalle että yrittäjälle. Asiakas voi perua ajan itse, jolloin vuoro vapautuu automaattisesti.",
      outcome:
        "Sivusto on tuotannossa 63 sivulla kolmella kielellä ja latautuu alle sekunnissa. Ajanvaraus toimii päästä päähän ja ottaa vastaan varauksia myös silloin kun kukaan ei ole vastaamassa puhelimeen. Hinnasto on julkinen, joten hintakyselyt puhelimessa vähenivät.",
      metricLabels: {
        pages: "Sivua tuotannossa",
        languages: "Kieliversiota",
        loadTime: "Latausaika mobiilissa",
      },
      metaTitle: "Tikanmaan Huoltoasema | Referenssi | Stellar Stack",
      metaDescription:
        "Kolmikielinen sivusto ja verkkoajanvaraus huoltoasemalle. Kalenterisynkronointi, automaattiset vahvistukset ja itsepalveluperuutus.",
    },

    futuuri: {
      client: "Futuuri",
      sector: "Terveysteknologia",
      summary:
        "Yrityssivusto terveysteknologiayhtiölle, joka kehittää tekoälyavusteista kuvantamisen analytiikkaa.",
      challenge:
        "Futuuri myy terveydenhuollon organisaatioille, joilla on poikkeuksellisen korkea vaatimustaso uskottavuudelle ja tietosuojalle. Sivuston piti kertoa teknisesti vaativasta tuotteesta niin, että sen ymmärtää sekä lääkäri että hankinnasta päättävä johtaja, ja tehdä se kolmella kielellä.",
      approach:
        "Rakensimme selkeän ja rauhallisen sivuston, joka erottelee tuotteen eri käyttötapaukset omiksi poluikseen ja kertoo tietosuojan sekä EU-tietosijainnin näkyvästi eikä alaviitteenä. Rakenne on tehty niin, että uusia tuotealueita voi lisätä ilman että sivustoa suunnitellaan uudelleen.",
      outcome:
        "Sivusto on tuotannossa osoitteessa futuuri.co ja toimii yhtiön ensisijaisena myyntimateriaalina. Rakenne on kestänyt tuotevalikoiman laajentumisen ilman uudelleensuunnittelua.",
      metricLabels: {
        modalities: "Tuotealuetta",
        dataResidency: "Tietojen sijainti",
        languages: "Kieliversiota",
      },
      metaTitle: "Futuuri | Referenssi | Stellar Stack",
      metaDescription:
        "Yrityssivusto terveysteknologiayhtiölle. Selkeä rakenne vaativalle B2B-myynnille, kolme kieltä ja näkyvä tietosuoja.",
    },

    techverxe: {
      client: "Techverxe",
      sector: "Ohjelmistokehitys",
      summary:
        "Yrityssivusto ohjelmistokehitystoimistolle, joka välittää senioritason kehittäjiä asiakkaiden tiimeihin.",
      challenge:
        "Techverxe myy osaamista, ei tuotetta, joten sivuston piti tehdä abstraktista palvelusta konkreettinen. Ostaja on tekninen johtaja, joka arvioi uskottavuutta sekunneissa ja huomaa heti jos sivusto on koottu valmiista teemasta.",
      approach:
        "Rakensimme sivuston, joka johtaa teknologiaosaamisella ja käytännön prosessilla sen sijaan että myisi yleisiä lupauksia. Rakenne tekee näkyväksi mitä toimeksiannon aloittaminen käytännössä vaatii ja millä aikataululla kehittäjä on tuottava.",
      outcome:
        "Sivusto toimii toimiston ensisijaisena myyntimateriaalina ja lähtökohtana ulospäin suuntautuvalle myynnille. Huomio: sivusto on parhaillaan huollossa palvelinympäristön uudelleenjärjestelyn takia, joten linkki ei toistaiseksi avaudu.",
      metricLabels: {
        offices: "Toimipistettä",
        onboarding: "Kehittäjä tuottavana",
        stacks: "Teknologiapinoa",
      },
      metaTitle: "Techverxe | Referenssi | Stellar Stack",
      metaDescription:
        "Yrityssivusto ohjelmistokehitystoimistolle. Tekninen uskottavuus, selkeä prosessi ja konkreettinen palvelulupaus.",
    },
  },

  articleCopy: {
    "kotisivun-hinta": {
      title: "Mitä kotisivut oikeasti maksavat Suomessa",
      excerpt:
        "Miksi tarjoukset heittelevät 500 eurosta 15 000 euroon, ja mistä ero oikeasti syntyy.",
      category: "Hinnoittelu",
      body: [
        { p: "Kysytyin kysymys ensimmäisessä puhelussa on aina sama: paljonko sivusto maksaa. Rehellinen vastaus on, että hinta vaihtelee Suomessa niin paljon, että pelkkä luku ei kerro mitään ilman selitystä siitä, mitä siihen sisältyy." },
        { h: "Mistä ero syntyy" },
        { p: "Halvimmassa päässä ostat käytännössä valmiin teeman, johon vaihdetaan logo ja tekstit. Se on nopea ja se toimii, mutta sivusto näyttää samalta kuin tuhannet muut, eikä sitä ole rakennettu sinun asiakkaidesi polkua ajatellen." },
        { p: "Keskihinnassa maksat siitä, että joku miettii rakenteen liiketoimintasi mukaan, kirjoittaa tekstit ja rakentaa sivuston niin että se latautuu nopeasti ja löytyy Googlesta. Suurin osa työstä on tässä haarukassa muuta kuin koodia." },
        { p: "Kalleimmassa päässä on yleensä jotain toiminnallista: verkkokauppa, ajanvaraus, integraatio johonkin olemassa olevaan järjestelmään. Silloin hinta ei ole enää sivumäärästä kiinni vaan siitä, kuinka monta erikoistapausta pitää ratkaista." },
        { h: "Mitä kannattaa kysyä tarjouksesta" },
        { p: "Kysy kolme asiaa: kuka kirjoittaa tekstit, kuka omistaa verkkotunnuksen ja lähdekoodin, ja mitä ylläpito maksaa vuodessa. Nämä kolme erottavat tarjoukset toisistaan luotettavammin kuin itse kertahinta." },
        { p: "Erityisesti tekstit. Moni edullinen tarjous olettaa, että toimitat tekstit itse. Se on täysin kelvollinen malli, mutta jos et ehdi kirjoittaa niitä, projekti seisoo kuukausia ja halvasta tarjouksesta tulee kallis." },
      ],
      metaTitle: "Mitä kotisivut maksavat Suomessa | Stellar Stack",
      metaDescription:
        "Miksi kotisivutarjoukset vaihtelevat 500 eurosta 15 000 euroon ja mitä tarjouksesta kannattaa kysyä ennen valintaa.",
    },
    "google-business-profiili": {
      title: "Google Business -profiili on paikallisyrityksen tärkein sivu",
      excerpt:
        "Useimmiten se näkyy asiakkaalle ennen kotisivuasi, ja useimmiten se on puutteellinen.",
      category: "Hakunäkyvyys",
      body: [
        { p: "Kun joku hakee palveluasi omalta alueeltaan, Google näyttää ensin kartan ja kolme yritystä. Vasta sen alla tulevat tavalliset hakutulokset. Käytännössä se tarkoittaa, että Google Business -profiilisi on useammin ensimmäinen kohtaaminen kuin kotisivusi." },
        { h: "Mitä profiilissa pitää olla kunnossa" },
        { p: "Täydelliset perustiedot: nimi, osoite ja puhelinnumero täsmälleen samassa muodossa kuin sivustollasi. Ristiriita näiden välillä on yleisin yksittäinen syy siihen, ettei yritys näy paikallishaussa niin hyvin kuin voisi." },
        { p: "Aukioloajat myös poikkeuspäiville. Väärä tieto juhlapyhänä ei ainoastaan menetä sen päivän asiakkaita, se myös tuottaa negatiivisia arvosteluja, jotka jäävät näkyviin vuosiksi." },
        { p: "Kuvia, jotka on otettu itse. Kuvapankkikuva tunnistetaan ja se laskee luottamusta. Puhelimella otettu kuva oikeasta toimitilasta toimii paremmin kuin ammattikuva jostain muualta." },
        { h: "Arvostelut ratkaisevat enemmän kuin tekstit" },
        { p: "Arvostelujen määrä ja tuoreus vaikuttavat siihen, näytkö kartalla lainkaan. Yksinkertaisin toimiva tapa on pyytää arvostelua siinä hetkessä, kun asiakas on juuri kiittänyt hyvästä työstä. Linkki suoraan arvostelulomakkeeseen nostaa vastausprosenttia huomattavasti." },
        { p: "Vastaa myös kaikkiin arvosteluihin, myös huonoihin. Asiallinen vastaus kielteiseen arvosteluun vakuuttaa lukijan useammin kuin pelkät viiden tähden arviot." },
      ],
      metaTitle: "Google Business -profiilin optimointi | Stellar Stack",
      metaDescription:
        "Miten paikallisyritys saa Google Business -profiilinsa kuntoon: perustiedot, aukioloajat, kuvat ja arvostelut.",
    },
    "sivuston-nopeus": {
      title: "Miksi hidas sivusto maksaa sinulle asiakkaita",
      excerpt:
        "Latausnopeus ei ole tekninen yksityiskohta vaan suoraan yhteydenottojen määrä.",
      category: "Tekniikka",
      body: [
        { p: "Suurin osa pienyritysten sivustoista Suomessa latautuu mobiilissa useita sekunteja. Se kuulostaa pieneltä, mutta jokainen lisäsekunti karsii kävijöitä, ja karsiutuvat ovat juuri niitä jotka tulivat hakutuloksesta eivätkä tunne yritystäsi ennestään." },
        { h: "Mistä hitaus yleensä johtuu" },
        { p: "Tavallisin syy ei ole palvelin vaan kuvat. Suoraan kamerasta ladattu kuva voi olla viisi megatavua, ja sivulla voi olla niitä kymmenen. Oikeaan kokoon skaalattuna ja nykyaikaisessa muodossa sama kuva on murto-osan siitä eikä eroa näy silmällä." },
        { p: "Toinen tavallinen syy on liuta lisäosia, joista jokainen lataa oman koodinsa. Moni niistä on asennettu kerran johonkin tarpeeseen, joka on jo unohtunut, mutta ne latautuvat edelleen jokaisella sivulatauksella." },
        { h: "Miten sen voi todeta itse" },
        { p: "Avaa sivustosi puhelimella mobiiliverkossa, ei kotiverkon wifissä. Se on lähempänä sitä, miten asiakas sen oikeasti kokee. Jos joudut odottamaan, asiakaskin joutuu." },
        { p: "Nopeus vaikuttaa myös hakukonesijoitukseen suoraan, joten korjaus maksaa itsensä takaisin kahdesti: useampi kävijä jää, ja useampi kävijä ylipäätään löytää sivustolle." },
      ],
      metaTitle: "Verkkosivujen nopeus ja sen vaikutus | Stellar Stack",
      metaDescription:
        "Miksi hidas sivusto menettää asiakkaita, mistä hitaus yleensä johtuu ja miten voit todeta ongelman itse.",
    },
    monikielisyys: {
      title: "Kannattaako sivusto tehdä myös ruotsiksi ja englanniksi",
      excerpt:
        "Suomessa yllättävän harva pienyritys tekee sen, mikä on juuri siksi mahdollisuus.",
      category: "Kasvu",
      body: [
        { p: "Lähes jokainen suomalainen pienyritys julkaisee sivustonsa vain suomeksi. Se on ymmärrettävää, mutta se jättää kaksi asiakasryhmää kokonaan tavoittamatta: ruotsinkieliset ja Suomessa asuvat tai vierailevat englanninkieliset." },
        { h: "Milloin se kannattaa" },
        { p: "Ruotsi kannattaa lähes aina rannikolla ja Turun seudulla. Ruotsinkielinen asiakas hakee palvelua omalla kielellään, ja jos kilpailijasi eivät näy niillä hauilla, kilpailu on käytännössä olematon." },
        { p: "Englanti kannattaa jos alueellasi on kansainvälisiä työntekijöitä, opiskelijoita tai matkailijoita. Autokorjaamolle, hammaslääkärille ja ravintolalle tämä on usein merkittävä ryhmä, joka valitsee sen paikan jonka palvelun ymmärtää." },
        { h: "Mitä se maksaa" },
        { p: "Kysymys ei ole käännöskuluista vaan siitä, onko sivusto rakennettu kielten varaan alusta asti. Jos on, lisäkielen kustannus on pieni. Jos ei ole, se on käytännössä uusi projekti, ja siksi moni toimittaja hinnoittelee sen kalliiksi." },
        { p: "Kysy siis tarjousvaiheessa, mitä toinen kieli maksaa myöhemmin. Vastaus kertoo enemmän toteutuksen laadusta kuin useimmat muut kysymykset." },
      ],
      metaTitle: "Monikielinen sivusto suomalaiselle yritykselle | Stellar Stack",
      metaDescription:
        "Milloin ruotsin- ja englanninkielinen versio kannattaa, kenelle se tuo asiakkaita ja mistä sen hinta oikeasti muodostuu.",
    },
    "evasteeton-analytiikka": {
      title: "Kävijämittaus ilman evästebanneria",
      excerpt:
        "Banneri ärsyttää kävijää ja rikkoo mittauksen. Useimmiten sitä ei tarvita lainkaan.",
      category: "Mittaus",
      body: [
        { p: "Evästebanneri on Suomessa niin tavallinen, että sitä pidetään pakollisena. Se ei ole. Banneri vaaditaan siksi, että sivusto asettaa seurantaevästeitä. Jos niitä ei aseteta, banneria ei tarvita." },
        { h: "Miksi bannerista kannattaa päästä eroon" },
        { p: "Ensinnäkin se on ensimmäinen asia jonka kävijä näkee, ja se pyytää häntä tekemään päätöksen ennen kuin hän on nähnyt mitään sisältöä. Se ei ole hyvä ensivaikutelma." },
        { p: "Toiseksi se rikkoo juuri sen mittauksen, jonka takia se asennettiin. Kun suuri osa kävijöistä kieltää seurannan, analytiikka näyttää vain osan liikenteestä, ja päätöksiä tehdään vaillinaisen datan pohjalta." },
        { h: "Mitä tilalle" },
        { p: "On olemassa mittausratkaisuja, jotka eivät tallenna evästeitä eivätkä yksilöi kävijää. Ne kertovat kuinka moni kävi, mistä he tulivat ja mitkä sivut johtivat yhteydenottoon. Käytännössä se on kaikki mitä pienyritys tarvitsee." },
        { p: "Google Analyticsia tarvitaan lähinnä silloin, kun teet maksettua mainontaa ja haluat mitata kampanjoiden tuloksia sen omilla työkaluilla. Silloinkin suostumusten hallinta pitää tehdä kunnolla, ei pelkällä bannerilla joka ei oikeasti estä mitään." },
      ],
      metaTitle: "Evästeetön kävijämittaus | Stellar Stack",
      metaDescription:
        "Miksi evästebanneri usein on tarpeeton, miten se rikkoo mittauksen ja mitä sen tilalle kannattaa ottaa.",
    },
  },
};
