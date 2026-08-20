import type { Copy } from "./types";
import { site } from "@/content/site";

/**
 * Swedish copy, written in Finland Swedish rather than Sweden Swedish:
 * "kotitalousvähennys" is hushållsavdrag, FPA rather than Försäkringskassan,
 * and the terminology follows what a Swedish-speaking business owner in
 * Åboland would actually use.
 */
export const sv: Copy = {
  nav: {
    services: "Tjänster",
    industries: "Branscher",
    work: "Referenser",
    insights: "Artiklar",
    about: "Om oss",
    contact: "Kontakt",
    offer: "Kampanj",
    menu: "Meny",
    close: "Stäng",
    languageLabel: "Byt språk",
    skipToContent: "Gå direkt till innehållet",
    home: "Startsida",
  },

  common: {
    readMore: "Läs mer",
    allServices: "Alla tjänster",
    allIndustries: "Alla branscher",
    allWork: "Alla referenser",
    getInTouch: "Kontakta oss",
    bookCall: "Boka en kostnadsfri kartläggning",
    viewSite: "Öppna webbplatsen",
    siteOffline: "Webbplatsen är under underhåll",
    backTo: "Tillbaka till",
    from: "från",
    vatNote: `Priserna är exklusive moms ${site.vatRate}.`,
    deliveredIn: "Leveranstid",
    faqTitle: "Vanliga frågor",
    relatedServices: "Relaterade tjänster",
    industriesWeServe: "Branscher vi arbetar med",
    breadcrumbHome: "Startsida",
  },

  home: {
    metaTitle: "Stellar Stack | Webbplatser och digital tillväxt från Åbo",
    metaDescription:
      "En digitalbyrå i Åbo som bygger snabba webbplatser, webbutiker och söksynlighet för finländska småföretag. Tre språk, fast pris, leverans på en vecka.",
    eyebrow: "Digitalbyrå i Åbo",
    headline: "Webbplatser som",
    headlineAccent: "ger kunder",
    lede: "Vi bygger snabba och mätbara webbplatser och webbutiker för finländska småföretag. Inga tunga system, inga dolda kostnader, ingen väntan i månader.",
    primaryCta: {
      label: "Boka en kostnadsfri kartläggning",
      section: "contact",
    },
    secondaryCta: { label: "Se tjänsterna", section: "services" },
    stats: [
      { value: "7 d", label: "Typisk leveranstid" },
      { value: "3", label: "Språk som standard" },
      { value: "<1 s", label: "Laddningstid i mobilen" },
      { value: `${site.offer.setup} €`, label: "Fast pris, avtalat på förhand" },
    ],
    trustLine: "Från hälsoteknologi till den lokala servicestationen.",

    servicesEyebrow: "Tjänster",
    servicesTitle: "Allt ditt företag behöver på nätet",
    servicesLede:
      "Du börjar med webbplatsen och bygger ut den när verksamheten växer. Varje tjänst säljs separat, så du betalar bara för det du verkligen behöver.",

    industriesEyebrow: "Branscher",
    industriesTitle: "Vi känner din bransch före första mötet",
    industriesLede:
      "En frisersalong och en bokföringsbyrå löser inte samma problem. Vi bygger utifrån hur dina kunder faktiskt söker och tar kontakt.",

    workEyebrow: "Referenser",
    workTitle: "Arbete som är i produktion",
    workLede:
      "Inga koncept och inga bildbanksmockuper. Det här är riktiga webbplatser som betjänar riktiga kunder just nu.",

    processEyebrow: "Så går det till",
    processTitle: "Fyra steg, inga överraskningar",
    processLede:
      "Du vet hela tiden var projektet står och vad som händer härnäst. För de flesta kunder går det åt under två timmar av egen tid.",
    processSteps: [
      {
        step: "01",
        title: "Kartläggning",
        body: "Ett samtal på en halvtimme eller ett möte i Åbo. Vi går igenom vad du gör, vem du säljer till och vad webbplatsen ska åstadkomma. Du får ett skriftligt förslag och ett fast pris.",
      },
      {
        step: "02",
        title: "Innehåll och struktur",
        body: "Vi skriver texterna och bygger sidkartan utifrån samtalet. Du kommenterar, vi korrigerar. Bilderna kommer från dina egna eller så skaffar vi dem.",
      },
      {
        step: "03",
        title: "Genomförande",
        body: "Vi bygger webbplatsen och skickar en förhandsgranskningslänk. Alla ändringar ingår i priset före publicering.",
      },
      {
        step: "04",
        title: "Publicering och underhåll",
        body: "Vi flyttar webbplatsen till din domän, kopplar in mätningen och sköter uppdateringarna. Du får återgå till ditt eget arbete.",
      },
    ],

    whyEyebrow: "Varför vi",
    whyTitle: "En liten byrå med tung teknisk bakgrund",
    whyLede:
      "Stellar Stack bygger på samma tekniska grund som de programvaruprodukter vårt team utvecklar i sitt dagliga arbete. Du får samma kvalitet med ett småföretags budget.",
    whyPoints: [
      {
        title: "Offerten fördubblas inte på vägen",
        body: `${site.offer.setup} euro för lanseringen och ${site.offer.monthly} euro i månaden efter det. Priset står på sidan redan innan du ringer, och det ändras inte under arbetets gång.`,
      },
      {
        title: "Inte ännu ett projekt som drar ut i månader",
        body: "En vecka från första samtalet till en publicerad webbplats, på alla tre språken. Du förlorar inga kontakter medan bygget drar ut på tiden.",
      },
      {
        title: "Du blir inte osynlig för halva marknaden",
        body: "Finska, svenska och engelska ingår i grundleveransen, så du syns i sökningar där dina konkurrenter aldrig syns.",
      },
      {
        title: "Du blir inte gisslan hos din egen leverantör",
        body: "Domänen, innehållet och källkoden är dina. Byt leverantör när du vill och ta med dig allt.",
      },
    ],

    offerBannerTitle: `En ny webbplats för ${site.offer.setup} euro`,
    offerBannerBody: `Startkampanj för småföretag: en färdig flerspråkig webbplats på en vecka, underhåll ${site.offer.monthly} euro i månaden. Ingen bindningstid.`,
    offerBannerCta: "Se vad kampanjen innehåller",
  },

  services: {
    metaTitle: "Tjänster | Stellar Stack",
    metaDescription:
      "Webbplatser, webbutik, sökmotoroptimering, digital annonsering, innehåll, analys, applikationsutveckling och underhåll för finländska småföretag.",
    eyebrow: "Tjänster",
    title: "Tjänster som betalar sig själva",
    lede: "Åtta tjänster som kan köpas var för sig eller tillsammans. Allt prissätts på förhand och inget binder dig till ett långt avtal.",
  },

  industries: {
    metaTitle: "Branscher | Stellar Stack",
    metaDescription:
      "Webbplatser för bilbranschen, byggbranschen, restauranger, handel, expertföretag och hälsovårdsaktörer i Åbo och hela Finland.",
    eyebrow: "Branscher",
    title: "Vi bygger för din bransch, inte allmänt",
    lede: "Varje bransch skaffar kunder på sitt eget sätt. Nedan ser du vad en webbplats i just din bransch faktiskt måste klara av.",
    segments: {
      trades: "Byggande och tekniska branscher",
      hospitality: "Tjänster och handel",
      professional: "Experttjänster",
      health: "Hälsa och välbefinnande",
    },
  },

  work: {
    metaTitle: "Referenser | Stellar Stack",
    metaDescription:
      "Webbplatser i produktion: Tikanmaan Huoltoasema, Futuuri och Techverxe. Riktiga genomföranden, inte koncept.",
    eyebrow: "Referenser",
    title: "Genomföranden som är i produktion",
    lede: "Varje webbplats nedan är byggd från grunden och används just nu. Du kan öppna dem och bedöma själv.",
    challengeLabel: "Utgångsläget",
    approachLabel: "Lösningen",
    outcomeLabel: "Resultatet",
    stackLabel: "Teknik",
    projectUrlLabel: "Projektets adress",
  },

  insights: {
    metaTitle: "Artiklar | Stellar Stack",
    metaDescription:
      "Praktiska texter om webbplatser, söksynlighet och mätning för finländska småföretag.",
    eyebrow: "Artiklar",
    title: "Svar på de frågor kunderna faktiskt ställer",
    lede: "Vi skriver inte för att något måste publiceras. Det här är de frågor som dyker upp i nästan varje första samtal.",
    readTime: "min lästid",
    published: "Publicerad",
    backToIndex: "Alla artiklar",
    moreArticles: "Läs också",
  },

  about: {
    metaTitle: "Om oss | Stellar Stack",
    metaDescription:
      "Stellar Stack är en digitalbyrå i Åbo som bygger snabba flerspråkiga webbplatser för finländska småföretag.",
    eyebrow: "Om oss",
    title: "En digitalbyrå i Åbo med ett mjukvaruhus bakom sig",
    lede: "Vi gör för småföretag det som stora bolag köper av dyra konsultbyråer: en snabb, mätbar och omsorgsfullt byggd webbnärvaro.",
    story: [
      "Stellar Stack uppstod ur en enkel iakttagelse. En finländsk småföretagare betalar ofta tusentals euro för en webbplats som laddar långsamt, inte syns i Google och inte går att uppdatera utan att man ringer leverantören och blir fakturerad per timme.",
      "Samtidigt bygger samma team programvara för större kunder där snabbhet, tillgänglighet och mätbarhet är självklarheter. Den kompetensen försvinner inte för att kunden är en servicestation med tre anställda. Den paketeras bara annorlunda.",
      "Därför bygger vi varje webbplats på samma tekniska grund oberoende av kundens storlek: statisk publicering, tre språk, uppmätt prestanda och kod som kunden äger. Skillnaden ligger i omfattning och pris, inte i kvalitet.",
      "Vi arbetar från Åbo. Det betyder att du kan träffa oss personligen, få svar på ditt eget språk och veta vem som byggde din webbplats.",
    ],
    valuesTitle: "Så arbetar vi",
    values: [
      {
        title: "Priset avtalas före arbetet",
        body: "Du får ett fast pris skriftligt innan något påbörjas. Om omfattningen ändras under projektet avtalas det separat, aldrig som en efterhandsöverraskning på fakturan.",
      },
      {
        title: "Vi säljer inte det du inte behöver",
        body: "Om en webbplats på tre sidor räcker säger vi det. Vi säljer inte en webbutik till ett företag som inte säljer på nätet, och inte månadsrapportering till ett företag som inte har något att rapportera.",
      },
      {
        title: "Ärlighet i referenserna",
        body: "Vi visar bara riktiga genomföranden som är i produktion. Här finns inga påhittade kunder, inga lånade logotyper och inga siffror vi inte kan belägga.",
      },
      {
        title: "Arbetet stannar hos dig",
        body: "Domänen registreras i ditt namn, innehållet är ditt och källkoden överlämnas på begäran. Samarbetet ska fortsätta för att det fungerar, inte för att du är inlåst.",
      },
    ],
    localTitle: "Åbo och hela Finland",
    localBody:
      "Vårt team bor i Åbo, så vi träffas gärna personligen i Egentliga Finland. Arbetet görs på distans, och vi har kunder runt om i landet.",
    areasTitle: "Verksamhetsområde",
    areas: [
      "Åbo och S:t Karins",
      "Reso och Nådendal",
      "Salo och Pemar",
      "Egentliga Finland",
      "Hela Finland på distans",
    ],
  },

  contact: {
    metaTitle: "Kontakt | Stellar Stack",
    metaDescription: `Kontakta oss: ${site.email}, ${site.phoneDisplay}. Plats ${site.address.street}, ${site.address.postalCode} ${site.address.city}.`,
    eyebrow: "Kontakt",
    title: "Berätta vad du håller på att bygga",
    lede: "Vi svarar oftast samma vardag. Den kostnadsfria kartläggningen tar ungefär en halvtimme och binder dig inte till något.",
    formTitle: "Skicka ett meddelande",
    formNote: "Vi läser varje meddelande och svarar direkt.",
    sending: "Skickar...",
    successNote: "Tack, ditt meddelande har tagits emot. Vi svarar snart.",
    errorNote:
      "Det gick inte att skicka just nu. Skriv direkt till moi@stellarstack.fi.",
    fields: {
      name: "Namn",
      company: "Företag",
      email: "E-post",
      phone: "Telefon",
      service: "Vad gäller saken",
      servicePlaceholder: "Välj ämne",
      message: "Meddelande",
      messagePlaceholder:
        "Berätta kort vad ditt företag gör och vad du förväntar dig av webbplatsen.",
      submit: "Skicka meddelande",
    },
    directTitle: "Direkta kontaktuppgifter",
    addressLabel: "Plats",
    emailLabel: "E-post",
    phoneLabel: "Telefon",
    hoursLabel: "Du når oss",
    hours: "Måndag till fredag kl. 9 till 17",
    responseNote: "Vi svarar oftast inom några timmar på vardagar.",
    mapCta: "Visa karta",
    mapNote: "Kartan laddas från Google Maps först när du klickar här.",
    mapExternal: "Öppna i Google Maps",
  },

  offer: {
    metaTitle: `Kampanj: ny webbplats för ${site.offer.setup} € | Stellar Stack`,
    metaDescription: `En flerspråkig företagswebbplats för ${site.offer.setup} euro och underhåll för ${site.offer.monthly} euro i månaden. Leverans på cirka en vecka, ingen bindningstid.`,
    eyebrow: "Startkampanj",
    headline: "Hela webbplatsen färdig på en vecka",
    lede: "Det här är ett paket med fast pris för småföretag som behöver en fungerande webbplats snabbt. Samma teknik och samma kvalitet som i våra större projekt, avgränsat till det som verkligen hinner bli färdigt på en vecka.",
    priceLabel: "Engångsavgift",
    priceSuffix: "täcker hela genomförandet",
    regularLabel: "Normalt",
    monthlyLabel: "Underhåll",
    monthlySuffix: "i månaden, ingen bindningstid",
    includedTitle: "I priset ingår",
    included: [
      "Upp till fem sidor: startsida, tjänster, referenser, om oss och kontakt",
      "Alla tre språk: finska, svenska och engelska",
      "Textproduktion utifrån vårt samtal, du skriver dem inte själv",
      "Mobiloptimering och tillgänglighetskontroll",
      "Kontaktformulär som går till din e-post",
      "Genomgång och korrigering av Google Business-profilen",
      "Grundläggande sökmotoroptimering och sidkarta",
      "Besökarmätning utan tvingande kakbanner",
      "Ibruktagande av domän och e-post",
      "SSL-certifikat och serverplacering inom EU",
    ],
    notIncludedTitle: "Ingår inte, prissätts separat",
    notIncluded: [
      "Webbutik och betalningsförmedling",
      "Tidsbokningssystem och kalendersynkronisering",
      "Fotografering och videoproduktion",
      "Löpande annonsering eller sökmotoroptimering",
      "Omfattning utöver fem sidor",
    ],
    timelineTitle: "Veckan i praktiken",
    timeline: [
      {
        day: "Dag 1",
        title: "Kartläggning",
        body: "Ett samtal på en halvtimme. Vi går igenom verksamheten, kunderna och målen. Efter det behöver vi nästan ingenting av dig.",
      },
      {
        day: "Dag 2 till 3",
        title: "Innehåll",
        body: "Vi skriver texterna på tre språk och sammanställer bilderna. Du får dem för kommentarer.",
      },
      {
        day: "Dag 4 till 5",
        title: "Genomförande",
        body: "Vi bygger webbplatsen och skickar en förhandsgranskningslänk. Vi korrigerar allt du vill ändra.",
      },
      {
        day: "Dag 6 till 7",
        title: "Publicering",
        body: "Domän, e-post, mätning och anmälan till sökmotorerna. Webbplatsen blir offentlig.",
      },
    ],
    guaranteeTitle: "Om du inte är nöjd",
    guaranteeBody:
      "Du ser förhandsgranskningen innan något faktureras. Om du efter den inte vill fortsätta avslutas projektet där och ingen faktura kommer.",
    cta: "Boka en kostnadsfri kartläggning",
    faq: [
      {
        q: "Är priset verkligen fast?",
        a: `Ja. ${site.offer.setup} euro täcker hela genomförandet i den omfattning som beskrivs ovan. Det enda som ändrar priset är om du vill ha något ur listan över det som inte ingår, och det avtalas separat och skriftligt på förhand.`,
      },
      {
        q: "Vad innehåller underhållet?",
        a: `${site.offer.monthly} euro i månaden täcker serverutrymme, SSL-certifikat, säkerhetskopior, säkerhetsuppdateringar, övervakning och små innehållsändringar som priser, öppettider eller kontaktuppgifter. Uppsägningstiden är en månad.`,
      },
      {
        q: "Måste jag skriva texterna?",
        a: "Nej. Vi skriver dem utifrån samtalet och skickar dem till dig för granskning. För de flesta kunder går det åt under två timmar av egen tid till hela projektet.",
      },
      {
        q: "Vad händer om jag redan har en webbplats?",
        a: "Det går bra. Vi flyttar innehållet, behåller de gamla adresserna med omdirigeringar så att den synlighet du redan har i Google inte försvinner, och publicerar den nya versionen på samma domän.",
      },
      {
        q: "Äger jag webbplatsen?",
        a: "Ja. Domänen registreras i ditt namn, innehållet är ditt och källkoden överlämnas på begäran. Om du avslutar underhållet tar du webbplatsen med dig.",
      },
      {
        q: "Varför ingår svenska och engelska i priset?",
        a: "För att det är ovanligt i Finland och för att det betalar sig. Vi bygger in språkstödet i grunden ändå, så två extra språk fördubblar inte arbetet.",
      },
    ],
    smallPrint: `Priserna är exklusive moms ${site.vatRate}. Kampanjpriset gäller nya kunder och den omfattning som beskrivs ovan. Normalpriset för ett motsvarande genomförande är ${site.offer.setupRegular} euro.`,
  },

  privacy: {
    metaTitle: "Dataskyddsbeskrivning | Stellar Stack",
    metaDescription:
      "Hur Stellar Stack behandlar personuppgifter på sin webbplats och i kundrelationer.",
    title: "Dataskyddsbeskrivning",
    updated: "Uppdaterad 18.8.2026",
    creditsHeading: "Bildkällor",
    creditsIntro:
      "En del av fotografierna på den här webbplatsen används med Creative Commons-licens och krediteras nedan. Övriga bilder är våra egna eller används med Unsplash-licensen, som inte kräver någon källhänvisning.",
    sections: [
      {
        heading: "Personuppgiftsansvarig",
        body: [
          `${site.name}, ${site.address.street}, ${site.address.postalCode} ${site.address.city}. I dataskyddsfrågor kan du kontakta ${site.email} eller ${site.phoneDisplay}.`,
        ],
      },
      {
        heading: "Vilka uppgifter vi samlar in",
        body: [
          "Vi samlar bara in det du själv uppger när du kontaktar oss: namn, företag, e-postadress, telefonnummer och meddelandets innehåll.",
          "Vi hämtar inte uppgifter från tredje parter och vi köper inte marknadsföringslistor.",
        ],
      },
      {
        heading: "Vad uppgifterna används till",
        body: [
          "För att besvara din förfrågan, utarbeta offerter och sköta kundrelationen. Grunden för behandlingen är förberedelse av avtal eller det berättigade intresset att svara dig.",
          "Vi använder inte kontaktuppgifter för marknadsföring utan ditt separata samtycke och vi lämnar dem inte vidare för marknadsföringsändamål.",
        ],
      },
      {
        heading: "Kakor och besökarmätning",
        body: [
          "Webbplatsen använder inga spårningskakor och ingen spårning från annonsnätverk. Besökarmätningen genomförs på ett sätt som varken lagrar kakor eller identifierar enskilda besökare.",
          "Därför finns ingen kakbanner på webbplatsen: en sådan behövs inte när inga spårningskakor sätts.",
          "På kontaktsidan kan du välja att öppna en interaktiv karta. Kartan laddas inte automatiskt: den hämtas från Google först när du klickar på knappen avsedd för det, och endast då kan Google sätta sina egna kakor.",
        ],
      },
      {
        heading: "Lagringstid",
        body: [
          "Kontakter sparas i högst två år från den senaste kontakten och raderas därefter. Uppgifter som hör till en kundrelation sparas den tid bokföringslagen kräver.",
        ],
      },
      {
        heading: "Placering och överföringar",
        body: [
          "Webbplatsen och tillhörande uppgifter finns inom Europeiska unionen. Vi överför inte personuppgifter utanför EU eller EES.",
        ],
      },
      {
        heading: "Dina rättigheter",
        body: [
          "Du har rätt att granska uppgifter som gäller dig, begära rättelse eller radering, motsätta dig behandling och lämna in klagomål till dataombudsmannens byrå.",
          `Begäranden riktas till ${site.email}. Vi svarar inom en månad.`,
        ],
      },
    ],
  },

  footer: {
    tagline:
      "Snabba flerspråkiga webbplatser och digital tillväxt för finländska småföretag. Från Åbo till hela Finland.",
    servicesTitle: "Tjänster",
    companyTitle: "Företag",
    contactTitle: "Kontakt",
    rights: "Alla rättigheter förbehållna.",
    businessIdPending: "",
  },

  notFound: {
    title: "Sidan hittades inte",
    body: "Sidan du söker finns inte eller har flyttats. Gå tillbaka till startsidan eller kontakta oss så hjälper vi till.",
    cta: "Tillbaka till startsidan",
  },

  serviceCopy: {
    verkkosivut: {
      name: "Webbplatser",
      tagline:
        "En snabb, flerspråkig företagswebbplats som omvandlar besökare till kontakter.",
      intro:
        "För de flesta företag är webbplatsen det första stället där kunden avgör om hen ringer dig eller din konkurrent. Vi bygger en webbplats som laddar på under en sekund, fungerar lika bra i telefonen som på datorn och berättar på tre språk varför du är rätt val.",
      priceHint: `från ${site.offer.setup} €`,
      deliverables: [
        "Sidkarta och struktur utifrån din verksamhet",
        "Textproduktion på finska, svenska och engelska",
        "Responsiv lösning för alla enheter",
        "Tillgänglighetskontroll mot WCAG-kriterierna",
        "Kontaktformulär och telefonlänkar",
        "Grundläggande sökmotoroptimering och strukturerad data",
        "Publicering, domän och SSL-certifikat",
      ],
      sections: [
        {
          title: "Varför en statisk lösning",
          body: "De flesta finländska småföretagswebbplatser drivs av ett publiceringssystem som sätter ihop sidan på nytt vid varje laddning och kräver ständiga säkerhetsuppdateringar. Vi bygger sidorna färdiga som filer. Servern skickar dem som de är, vilket ger snabbare laddning, mindre angreppsyta och billigare underhåll.",
        },
        {
          title: "Tre språk är inte ett tillägg",
          body: "Språkstödet byggs in i grunden från början i stället för att limmas på i efterhand. Varje sida får en egen adress på varje språk, korrekt språkmärkning och rätt signaler till sökmotorerna. En svenskspråkig kund hittar dig på svenska.",
        },
        {
          title: "Mätbarhet från första dagen",
          body: "Webbplatsen får en besökarmätning som visar vilka sidor som ger kontakter och varifrån besökarna kommer. Lösningen sätter inga spårningskakor, så ingen kakbanner behövs och mätningen försvinner inte när besökaren klickar bort bannern.",
        },
      ],
      faq: [
        {
          q: "Hur länge tar genomförandet?",
          a: "Kampanjpaketet blir färdigt på ungefär en vecka. Större webbplatser tar två till fyra veckor beroende på antalet sidor och hur snabbt vi får innehåll och bilder.",
        },
        {
          q: "Kan jag uppdatera innehållet själv?",
          a: "Små ändringar som priser, öppettider och kontaktuppgifter ingår i underhållet: du skickar ett meddelande och vi gör dem. Vill du uppdatera själv bygger vi en lätt administrationsvy, prissatt separat.",
        },
        {
          q: "Vad händer med min gamla webbplats?",
          a: "Vi flyttar innehållet och gör omdirigeringar från de gamla adresserna till de nya, så att den synlighet du redan förtjänat i Google bevaras. Den gamla webbplatsen kan stå kvar tills den nya är godkänd.",
        },
      ],
      metaTitle: "Webbplatser för företag | Stellar Stack",
      metaDescription:
        "Snabba flerspråkiga företagswebbplatser för finländska småföretag. Statisk lösning, tillgänglighet och sökmotoroptimering som standard.",
    },

    verkkokauppa: {
      name: "Webbutik",
      tagline:
        "Sälj på nätet utan en tung plattform och ett träsk av månadsavgifter.",
      intro:
        "En webbutik behöver inte vara ett komplicerat projekt. Vi bygger en butik som är snabb, vars betalningar fungerar med finländska betalsätt och vars produkter du kan hantera utan utbildning.",
      priceHint: "från 2 400 €",
      deliverables: [
        "Produktkatalog och kategoristruktur",
        "Varukorg och kassaprocess",
        "Finländska betalsätt: nätbanker, kort och MobilePay",
        "Leveranssätt och val av avhämtningsställe",
        "Orderbekräftelser och kundmeddelanden",
        "Lagersaldon och produkthantering",
        "Mätning och försäljningsrapportering",
      ],
      sections: [
        {
          title: "Rätt storleksklass",
          body: "En webbutik med trettio produkter behöver inte samma plattform som en med tretusen. Vi väljer lösning utifrån ditt sortiment och din ordervolym, så att du inte betalar för funktioner du aldrig använder.",
        },
        {
          title: "En kassa som inte skrämmer bort",
          body: "Största delen av den förlorade försäljningen i en webbutik försvinner i kassan. Vi bygger en kassa som fungerar i telefonen, inte tvingar fram registrering och visar leveranskostnaderna före sista steget.",
        },
        {
          title: "Produkterna hittas också i Google",
          body: "Varje produktsida får strukturerad data, så att pris och tillgänglighet kan synas direkt i sökresultaten. Produktflödet kan kopplas till Google Shopping om du vill annonsera.",
        },
      ],
      faq: [
        {
          q: "Vilka betalsätt är möjliga?",
          a: "Finländska nätbanker, betalkort, MobilePay samt faktura- och delbetalningstjänster via finländska betalningsförmedlare. Avtalet med förmedlaren görs i ditt namn.",
        },
        {
          q: "Kan butiken kopplas till mitt kassasystem?",
          a: "Oftast ja, om ditt system har ett gränssnitt. Vi kontrollerar det i kartläggningen innan vi lovar något.",
        },
      ],
      metaTitle: "Webbutik för småföretag | Stellar Stack",
      metaDescription:
        "En snabb webbutik med finländska betalsätt. Rätt storleksklass för ditt sortiment, utan onödiga månadsavgifter.",
    },

    hakukoneoptimointi: {
      name: "Sökmotoroptimering",
      tagline: "Bli hittad när kunden söker din tjänst i ditt område.",
      intro:
        "Lokal söksynlighet är ofta den lönsammaste marknadsföringskanalen ett småföretag har, eftersom den som söker redan är nära ett köp. Arbetet delas i två: webbplatsens tekniska skick och skötseln av Google Business-profilen.",
      priceHint: "från 390 €/mån",
      deliverables: [
        "Sökordskartläggning för din bransch och ditt område",
        "Optimering och skötsel av Google Business-profilen",
        "Teknisk granskning av webbplatsen och korrigeringar",
        "Sidspecifika rubriker och beskrivningar",
        "Innehåll riktat mot lokal sökning",
        "Insamling och hantering av recensioner",
        "Månadsrapport om placeringar och trafik",
      ],
      sections: [
        {
          title: "Den lokala sökningen avgör",
          body: "När någon söker en bilverkstad i Åbo visar Google först en karta och tre företag. Att komma dit beror på hur fullständig din Google Business-profil är, hur många recensioner du har och om din webbplats har rätt uppgifter i rätt format. Det här är det arbete som ger snabbast avkastning.",
        },
        {
          title: "Tekniskt skick är grunden",
          body: "En långsam webbplats placerar sig inte, och inte heller en webbplats som Google inte kan läsa ordentligt. Vi går igenom laddningshastighet, mobilanvändbarhet, rubrikstruktur och strukturerad data, och korrigerar det som behövs.",
        },
        {
          title: "Ärlig rapportering",
          body: "Varje månad får du en rapport om vilka sökningar du syns på, hur många som klickade och hur många som tog kontakt. Vi rapporterar inte siffror som inte har med försäljning att göra.",
        },
      ],
      faq: [
        {
          q: "Hur snabbt syns resultaten?",
          a: "Korrigeringar i Google Business-profilen kan synas inom några veckor. Förändringar i den organiska sökningens placeringar tar vanligtvis tre till sex månader. Ingen seriös aktör lovar snabbare.",
        },
        {
          q: "Garanterar ni förstaplatsen?",
          a: "Nej, och det kan ingen. Google säljer inte placeringar och offentliggör inte sin algoritm. Vi kan lova arbete som bevisligen förbättrar synligheten, och rapportering som visar om det gjorde det.",
        },
      ],
      metaTitle: "Sökmotoroptimering och lokal synlighet | Stellar Stack",
      metaDescription:
        "Lokal sökmotoroptimering för finländska småföretag. Google Business-profil, tekniskt skick och ärlig rapportering.",
    },

    mainonta: {
      name: "Digital annonsering",
      tagline: "Köpt synlighet medan den organiska ännu byggs upp.",
      intro:
        "Sökmotoroptimering ger avkastning långsamt men varaktigt. Annonsering ger den genast men bara så länge du betalar. Oftast behöver ett småföretag båda, och annonseringen lönar sig att starta med de sökningar som ligger närmast ett köpbeslut.",
      priceHint: "från 290 €/mån plus mediebudget",
      deliverables: [
        "Kampanjstruktur i Google Ads eller Meta",
        "Sökords- och målgruppsdefinition",
        "Annonstexter och riktlinjer för bildmaterial",
        "Landningssidor för kampanjerna",
        "Installation av konverteringsmätning",
        "Budgetuppföljning och optimering",
        "Månadsrapport om kostnad per kontakt",
      ],
      sections: [
        {
          title: "Vi börjar smått",
          body: "Vi rekommenderar inte en stor budget innan vi vet vad som fungerar. Den första månaden är mätning: vilka sökningar ger kontakter och vilka bränner pengar. Först därefter lönar det sig att öka budgeten.",
        },
        {
          title: "Annonsen och sidan hör ihop",
          body: "Det dyraste misstaget i köpt annonsering är att styra klicket till startsidan. Vi bygger en egen landningssida för kampanjen som svarar exakt på det annonsen lovade.",
        },
        {
          title: "Mätning före pengar",
          body: "Konverteringsmätningen installeras innan den första euron spenderas. Annars vet du inte om annonseringen fungerar, och optimeringen bygger på gissningar.",
        },
      ],
      faq: [
        {
          q: "Hur mycket mediebudget behövs?",
          a: "För en lokal tjänst räcker ofta 300 till 800 euro i månaden för att komma igång. Mer konkurrensutsatta branscher kräver mer. Vi ger en realistisk uppskattning i kartläggningen utifrån prisnivån i din bransch.",
        },
        {
          q: "Vem äger annonskontona?",
          a: "Du. Kontona skapas i ditt namn och vi får åtkomst till dem. Om samarbetet upphör stannar historiken och datan hos dig.",
        },
      ],
      metaTitle:
        "Google- och sociala medier-annonsering för småföretag | Stellar Stack",
      metaDescription:
        "Digital annonsering för finländska småföretag. Mätt kampanjstruktur, egna landningssidor och ärlig kostnadsrapportering.",
    },

    sisalto: {
      name: "Innehållsproduktion",
      tagline: "Texter, bilder och språkversioner som säljer åt dig.",
      intro:
        "De flesta småföretagswebbplatser misslyckas med texten, inte med tekniken. På sidan står vad företaget gör, men inte varför kunden borde välja just det. Vi skriver texter som svarar på kundens riktiga frågor.",
      priceHint: "från 190 € per sida",
      deliverables: [
        "Säljande texter per sida",
        "Översättning och lokalisering till finska, svenska och engelska",
        "Rubriker och beskrivningar anpassade till sökorden",
        "Blogg- och artikelinnehåll",
        "Produktbeskrivningar för webbutiken",
        "Val och bearbetning av bildmaterial",
        "Riktlinjer för tonfall och terminologi framöver",
      ],
      sections: [
        {
          title: "Översättning räcker inte",
          body: "En svensk sida som är översatt rakt av från finska låter som en översättning. Vi lokaliserar texterna så att de fungerar på målspråket, och de svenska versionerna skrivs på finlandssvenska, inte rikssvenska.",
        },
        {
          title: "Vi skriver utifrån kundens frågor",
          body: "Vi börjar med det dina kunder faktiskt frågar i telefon. Det är också det de skriver in i Google. En sida som svarar tydligt på det både säljer och placerar sig.",
        },
      ],
      faq: [
        {
          q: "Behöver jag en blogg?",
          a: "De flesta småföretag behöver inte det. En blogg lönar sig bara om din bransch har frågor som folk verkligen söker på och om du orkar upprätthålla den. Tre bra artiklar är bättre än tjugo svaga.",
        },
        {
          q: "Kan ni använda mina befintliga texter?",
          a: "Ja, om de är användbara. Vi går igenom dem, komprimerar och skärper i stället för att skriva allt från början. Det är också billigare.",
        },
      ],
      metaTitle: "Innehållsproduktion och översättningar | Stellar Stack",
      metaDescription:
        "Säljande webbtexter på finska, svenska och engelska. Lokalisering, sökordsoptimering och produktbeskrivningar.",
    },

    analytiikka: {
      name: "Analys",
      tagline: "Vet vad som ger kunder och vad som bara förbrukar budget.",
      intro:
        "Utan mätning är marknadsföring gissningar. Vi bygger en mätning som visar varifrån kontakterna kommer, och vi gör det på ett sätt som respekterar besökarens integritet och inte kräver någon kakbanner.",
      priceHint: "från 490 € som engångsarbete",
      deliverables: [
        "Installation av besökarmätning utan spårningskakor",
        "Konverteringsmål: samtal, formulär och e-post",
        "Uppdelning av trafikkällor",
        "Praxis för kampanjmärkning",
        "En tydlig månadsvy utan onödiga siffror",
        "Granskning av dataskyddsbeskrivningen mot mätningen",
      ],
      sections: [
        {
          title: "Integritet utan kakbanner",
          body: "Vi använder en mätning som varken lagrar kakor eller identifierar besökaren. Det betyder att ingen kakbanner behövs, vilket i sin tur betyder att mätningen inte försvinner för att tre fjärdedelar av besökarna nekar spårning.",
        },
        {
          title: "Tre siffror räcker",
          body: "De flesta analysvyer dränker användaren i mätvärden. Vi bygger en vy som svarar på tre frågor: hur många besökte, varifrån kom de och hur många tog kontakt.",
        },
      ],
      faq: [
        {
          q: "Är det här Google Analytics?",
          a: "Inte som standard. Vi rekommenderar ett kakfritt alternativ som är tydligare ur finländskt dataskyddsperspektiv. Behöver du Google Analytics, till exempel för annonseringens skull, installerar vi även det och sköter samtyckeshanteringen korrekt.",
        },
      ],
      metaTitle: "Webbanalys utan kakbanner | Stellar Stack",
      metaDescription:
        "Kakfri besökarmätning och konverteringsuppföljning för finländska småföretag. Vet varifrån kontakterna kommer.",
    },

    sovelluskehitys: {
      name: "Applikationsutveckling",
      tagline:
        "Tidsbokning, kalkylator eller integration när färdiga lösningar inte räcker.",
      intro:
        "Ibland behöver verksamheten något som inte finns färdigt: en tidsbokning som förstår din branschs regler, en kalkylator som ger kunden ett pris direkt, eller en koppling till ett system du redan använder. Det är här den tekniska bakgrunden verkligen märks.",
      priceHint: "pris enligt omfattning",
      deliverables: [
        "Tidsbokning med kalendersynkronisering och påminnelser",
        "Pris- och offertkalkylatorer",
        "Formulär och arbetsflöden som styrs till rätt personer",
        "Integrationer till affärssystem eller kassasystem",
        "Kundkommunikation via e-post och sms",
        "Underhåll och övervakning efter ibruktagandet",
      ],
      sections: [
        {
          title: "Byggt för verklig produktion",
          body: "Tidsbokningen hos Tikanmaan Huoltoasema låser en tid atomiskt så att två bokningar inte kan hamna på samma tidpunkt, synkroniserar till Google Kalender, skickar bekräftelse till både kunden och företagaren och låter kunden avboka själv. Den är i produktion och i dagligt bruk.",
        },
        {
          title: "Vi börjar med det minsta som fungerar",
          body: "Vi bygger inte ett system vars alla funktioner aldrig används. Vi definierar den minsta version som löser problemet, tar den i produktion och bygger ut den utifrån den verkliga användningen.",
        },
      ],
      faq: [
        {
          q: "Vad kostar något sådant?",
          a: "Det beror helt på omfattningen. En enkel tidsbokning är något annat än en integration till ett affärssystem. Vi gör en kartläggning och ger ett fast pris innan arbetet påbörjas.",
        },
        {
          q: "Vem underhåller den senare?",
          a: "Vi, som en del av underhållsavtalet. Källkoden är dock din, så du kan flytta underhållet någon annanstans om du vill.",
        },
      ],
      metaTitle:
        "Skräddarsydd applikationsutveckling och integrationer | Stellar Stack",
      metaDescription:
        "Tidsbokningar, kalkylatorer och integrationer för finländska småföretag. Byggt för produktion, underhållet och ägt av kunden.",
    },

    yllapito: {
      name: "Underhåll och hosting",
      tagline: "Webbplatsen förblir snabb, säker och uppdaterad.",
      intro:
        "En webbplats är inte ett projekt utan något fortlöpande. Underhållet täcker servern, säkerhetskopiorna, informationssäkerheten, övervakningen och de små ändringar som ständigt dyker upp.",
      priceHint: `${site.offer.monthly} €/mån`,
      deliverables: [
        "Serverutrymme inom EU och SSL-certifikat",
        "Automatiska säkerhetskopior och återställning",
        "Säkerhetsuppdateringar och övervakning",
        "Tillgänglighetsövervakning och larm",
        "Små innehållsändringar inom månadspriset",
        "Uppföljning och optimering av prestanda",
        "Stöd via e-post och telefon",
      ],
      sections: [
        {
          title: "Vad en liten ändring betyder",
          body: "Uppdateringar av priser, öppettider, kontaktuppgifter, personal eller tjänstebeskrivningar ingår i månadspriset. En ny sida, en ny språkversion eller ny funktionalitet är separat arbete som prissätts på förhand.",
        },
        {
          title: "Ingen bindningstid",
          body: "Uppsägningstiden är en månad. Vi binder inte kunder med årsavtal, för om tjänsten är bra behöver den inte tvingas att fortsätta.",
        },
      ],
      faq: [
        {
          q: "Vad händer om jag avslutar underhållet?",
          a: "Du får med dig webbplatsens filer och källkoden, och domänen är redan registrerad i ditt namn. Vi hjälper till med överföringen till en ny leverantör.",
        },
        {
          q: "Hur snabbt görs små ändringar?",
          a: "Vanligtvis samma eller följande vardag. Brådskande korrigeringar som ett fel telefonnummer eller ett felaktigt pris åtgärdas genast.",
        },
      ],
      metaTitle: "Underhåll och hosting av webbplatser | Stellar Stack",
      metaDescription: `Underhåll av webbplatser för ${site.offer.monthly} euro i månaden: hosting inom EU, säkerhetskopior, informationssäkerhet och små innehållsändringar.`,
    },
  },

  industryCopy: {
    autoala: {
      name: "Bilbranschen och servicestationer",
      tagline: "Verkstäder, servicestationer, däckfirmor och biltvättar.",
      intro:
        "Inom bilbranschen söker kunden sällan ett varumärke. Hen söker det närmaste stället som kan sköta saken snabbt och vars pris hen känner till på förhand. Webbplatsens uppgift är att svara på de tre sakerna innan hen hinner ringa konkurrenten.",
      problems: [
        "Priserna saknas på webbplatsen, så kunden ringer den som anger dem",
        "Tidsbokning sker bara per telefon, vilket landar på den som sköter mottagningen",
        "Google Business-profilen är bristfällig eller öppettiderna är fel",
        "Webbplatsen fungerar inte i telefonen, trots att nästan alla sökningar görs där",
      ],
      solutions: [
        {
          title: "En prislista som faktiskt syns",
          body: "Vi bygger en tjänsteprislista som visar priserna per fordonsklass och som uppdateras med ett enda meddelande. Kunden ser priset genast i stället för att behöva ringa och fråga.",
        },
        {
          title: "Tidsbokning som minskar samtalen",
          body: "Kunden väljer själv tjänst, fordon och ledig tid. Bokningen går direkt in i din kalender, båda får en bekräftelse och kunden kan avboka själv utan att någon behöver svara i telefon.",
        },
        {
          title: "Den lokala sökningen i skick",
          body: "I den här branschen är Google Business-profilen, öppettiderna, bilderna och recensionerna ofta viktigare än själva webbplatsen. Vi sköter båda och håller dem samstämmiga.",
        },
      ],
      essentials: [
        "Tjänsteprislista per fordonsklass",
        "Tidsbokning på nätet med kalendersynkronisering",
        "Öppettider även för avvikande dagar",
        "Köranvisning och karta",
        "Säsongsförvaring av däck och priser",
        "Besiktningstjänster och periodiska serviceåtgärder",
        "Kontakt med ett tryck i mobilen",
      ],
      metaTitle:
        "Webbplatser för verkstäder och servicestationer | Stellar Stack",
      metaDescription:
        "Webbplatser för bilbranschen: prislista, tidsbokning på nätet och lokal söksynlighet. Genomföranden redan i produktion.",
    },

    rakennus: {
      name: "Bygg, VVS och el",
      tagline: "Byggföretag, rörinstallation, elentreprenad och renovering.",
      intro:
        "Inom byggbranschen avgör förtroendet. Kunden släpper in dig i sitt hem och betalar en betydande summa, så hen vill se färdigt arbete, veta att du är en pålitlig avtalspart och få en offert utan tre telefonsamtal.",
      problems: [
        "Inga bilder på färdiga arbeten, så kvaliteten går inte att bedöma",
        "Offertförfrågan kräver att man ringer mitt under arbetsdagen",
        "Ingenting styrker tillförlitligheten: inga beställaransvarsuppgifter, inga referenser",
        "Webbplatsen berättar inte inom vilket område ni arbetar",
      ],
      solutions: [
        {
          title: "Arbetsprover som säljer",
          body: "Vi bygger ett referensgalleri där varje objekt berättar vad som gjordes, var och hur lång tid det tog. Före- och efterbilder säljer i den här branschen bättre än någon text.",
        },
        {
          title: "En offertförfrågan som frågar rätt saker",
          body: "Formuläret frågar efter objektets typ, omfattning, tidtabell och bilder, så att du kan ge en prisuppskattning utan att först besvara tio preciserande frågor.",
        },
        {
          title: "Tillförlitligheten bevisas",
          body: "Beställaransvarsuppgifter, försäkringar, behörigheter och anvisningar om hushållsavdraget syns på webbplatsen. Det är sådant kunden söker efter och vars frånvaro sållar bort dig.",
        },
      ],
      essentials: [
        "Referensgalleri per objekt",
        "Offertförfrågan med möjlighet att bifoga bilder",
        "Verksamhetsområde på karta",
        "Beställaransvar och försäkringsuppgifter",
        "Kalkylator eller anvisning för hushållsavdraget",
        "Behörigheter och certifikat",
        "Journummer om ni har ett",
      ],
      metaTitle:
        "Webbplatser för byggbranschen och VVS-företag | Stellar Stack",
      metaDescription:
        "Webbplatser för bygg-, VVS- och elbranschen: referensgalleri, offertförfrågan och beställaransvarsuppgifter.",
    },

    kiinteistohuolto: {
      name: "Städning och fastighetsskötsel",
      tagline: "Städfirmor, fastighetsskötsel, gårds- och grönytetjänster.",
      intro:
        "Städning och fastighetsskötsel säljs som avtal, inte som engångsköp. Webbplatsens uppgift är att tydligt berätta vad avtalet innehåller, för vem det passar och vad det kostar, så att rätt kunder tar kontakt och fel kunder inte gör det.",
      problems: [
        "Tjänstepaketen är otydliga, så varje offert görs från början",
        "Företagsstädning och hemstädning blandas på samma sida",
        "Prissättningsmodellen framgår inte, vilket ger fel slags kontakter",
        "Inget sätt att skilja sig från tio likadana konkurrenter",
      ],
      solutions: [
        {
          title: "Tydliga tjänstepaket",
          body: "Vi separerar hushålls- och företagskunder till egna spår och beskriver varje pakets innehåll och prissättningsgrund. Det gallrar bort kontakter som aldrig skulle ha blivit kunder.",
        },
        {
          title: "Prisuppskattning utan telefonsamtal",
          body: "En kalkylator som utgår från kvadratmeter eller antal rum ger kunden ett riktgivande pris direkt. Det ökar antalet kontakter och minskar onödiga offertförfrågningar.",
        },
        {
          title: "Tillförlitligheten synlig",
          body: "I den här branschen lämnar kunden ifrån sig nycklarna till sitt hem eller kontor. Personalpresentationer, bakgrundskontroller, försäkringar och avtalsvillkor bygger förtroendet före det första samtalet.",
        },
      ],
      essentials: [
        "Separata spår för företags- och hushållskunder",
        "Tjänstepaketens innehåll och prissättningsgrund",
        "Kalkylator för prisuppskattning",
        "Verksamhetsområde och responstider",
        "Försäkringar och avtalsvillkor",
        "Anvisningar om hushållsavdraget",
        "Säsongstjänster som snöarbete och gårdsskötsel",
      ],
      metaTitle:
        "Webbplatser för städbranschen och fastighetsskötsel | Stellar Stack",
      metaDescription:
        "Webbplatser för städfirmor och fastighetsskötsel: tydliga tjänstepaket, priskalkylator och anskaffning av avtalskunder.",
    },

    ravintolat: {
      name: "Restauranger och kaféer",
      tagline: "Restauranger, kaféer, lunchställen och cateringtjänster.",
      intro:
        "Inom restaurangbranschen bestämmer sig kunden snabbt och i telefonen. Hen vill veta tre saker: är det öppet, vad serveras och hur tar man sig dit. Allt annat är sekundärt.",
      problems: [
        "Matlistan är en PDF-fil som inte öppnas ordentligt i telefonen",
        "Lunchlistan byts varje vecka men på webbplatsen står förra månadens lista",
        "Öppettiderna är olika på webbplatsen och i Google",
        "Bordsbokning kräver att man ringer mitt i rusningen",
      ],
      solutions: [
        {
          title: "En matlista som fungerar i telefonen",
          body: "Matlistan byggs som en sida, inte som en PDF-fil. Den laddar genast, går att läsa i telefonen, syns i Google och kan uppdateras med ett meddelande.",
        },
        {
          title: "En lunchlista som hålls aktuell",
          body: "Den veckovis växlande lunchlistan är snabb att uppdatera och kan publiceras på webbplatsen och i sociala medier samtidigt. En gammal lista skrämmer bort kunder.",
        },
        {
          title: "Bokning och beställning utan samtal",
          body: "Bordsbokning, eller ett beställningssystem för catering, som går direkt in i din kalender. Färre samtal under rusningen och fler bokningar på kvällen när ingen svarar i telefon.",
        },
      ],
      essentials: [
        "Matlista som sida, inte som PDF-fil",
        "Lunchlista med veckovis uppdatering",
        "Öppettider även för helgdagar",
        "Bordsbokning eller beställningsformulär",
        "Allergener och specialdieter",
        "Bilder på maten och lokalen",
        "Karta, parkering och tillgänglighet",
      ],
      metaTitle: "Webbplatser för restauranger och kaféer | Stellar Stack",
      metaDescription:
        "Webbplatser för restauranger och kaféer: matlista som sida, en alltid aktuell lunchlista och bordsbokning.",
    },

    kauneus: {
      name: "Skönhet och välbefinnande",
      tagline: "Frisersalonger, barberare, skönhetssalonger, gym och studior.",
      intro:
        "Inom skönhet och välbefinnande sker försäljningen vid tidsbokningen. Om kunden inte kan boka i det ögonblick hen tänker på saken, bokar hen inte alls. På kvällen och under veckoslutet svarar ingen i telefon.",
      problems: [
        "Tidsbokning bara per telefon, så kvällskunderna går förlorade",
        "Prislistan saknas eller är otydlig, vilket höjer tröskeln",
        "Inga arbetsprover visas, trots att branschen är helt visuell",
        "Nya kunder vet inte vem de kommer för att träffa",
      ],
      solutions: [
        {
          title: "Tidsbokning som alltid är öppen",
          body: "Kunden väljer tjänst, utförare och tid när det passar hen. Bokningen synkroniseras till din kalender och en påminnelse går ut automatiskt, vilket minskar uteblivna tider.",
        },
        {
          title: "Priser utan att behöva fråga",
          body: "Tjänster och priser visas tydligt, vid behov enligt längd och utförarnivå. En transparent prislista sänker tröskeln att boka på ett nytt ställe.",
        },
        {
          title: "Arbeten och människor fram",
          body: "Ett galleri med färdiga arbeten och en kort presentation av varje utförare. Kunden väljer ofta en människa, inte en salong, och det här är en bransch där det syns direkt i bokningarna.",
        },
      ],
      essentials: [
        "Tidsbokning på nätet per utförare",
        "Prislista per tjänst och längd",
        "Galleri med färdiga arbeten",
        "Presentationer av utförarna",
        "Presentkort och kampanjer",
        "Avbokningsvillkoren tydligt angivna",
        "Läge, parkering och vägbeskrivning",
      ],
      metaTitle:
        "Webbplatser för frisersalonger och skönhetssalonger | Stellar Stack",
      metaDescription:
        "Webbplatser för skönhet och välbefinnande: tidsbokning på nätet, en tydlig prislista och ett galleri med färdiga arbeten.",
    },

    kauppa: {
      name: "Handel och webbutik",
      tagline: "Specialbutiker, detaljhandel och företag som säljer på nätet.",
      intro:
        "En liten specialbutik konkurrerar mot nätjättar och vinner inte på pris. Den vinner på sortiment, sakkunskap och på att varan finns här och nu. Webbplatsens uppgift är att göra de tre sakerna synliga.",
      problems: [
        "Sortimentet syns inte på nätet, så kunden vet inte om det lönar sig att komma",
        "Tillgängligheten går inte att kontrollera på förhand",
        "En full webbutik är för tung och dyr för ett litet sortiment",
        "Sakkunskapen förmedlas inte alls",
      ],
      solutions: [
        {
          title: "Sortimentet synligt utan en full webbutik",
          body: "En produktkatalog som visar produkter, priser och tillgänglighet, där köpet sker i butiken. Det kostar en bråkdel av en webbutik och får folk att komma genom dörren.",
        },
        {
          title: "Webbutik när det lönar sig",
          body: "Om nätförsäljning verkligen är målet bygger vi en butik med finländska betalsätt och leverans till avhämtningsställe. Men vi säger rakt ut om vi bedömer att det inte lönar sig.",
        },
        {
          title: "Sakkunskap som konkurrensfördel",
          body: "Köpguider, jämförelser och skötselanvisningar är innehåll som nätjättarna inte producerar och som folk söker på i Google. Det ger trafik och bygger förtroende.",
        },
      ],
      essentials: [
        "Produktkatalog med priser och tillgänglighet",
        "Webbutik med finländska betalsätt",
        "Reservera och hämta i butiken",
        "Köpguider och jämförelser",
        "Öppettider och läge",
        "Kampanjer och säsongsprodukter",
        "Service- och garantifrågor",
      ],
      metaTitle: "Webbplatser och webbutik för specialbutiker | Stellar Stack",
      metaDescription:
        "Webbplatser och webbutiker för detaljhandeln: produktkatalog, tillgänglighet, avhämtningstjänst och finländska betalsätt.",
    },

    asiantuntijat: {
      name: "Experttjänster",
      tagline:
        "Bokföringsbyråer, advokatbyråer, konsulter och fastighetsförmedling.",
      intro:
        "I en experttjänst köper kunden förtroende, inte en produkt. Hen kan inte bedöma arbetets kvalitet på förhand, så hen bedömer allt annat: vem du är, vilka du har hjälpt och om du låter som om du förstår hens situation.",
      problems: [
        "Webbplatsen talar om tjänster men inte om människor",
        "Inget sätt att bedöma kompetensen innan man tar kontakt",
        "Prissättningen är helt dold, vilket höjer tröskeln",
        "Samma generiska texter som alla konkurrenter har",
      ],
      solutions: [
        {
          title: "Människorna först",
          body: "Presentationer, bakgrunder och specialområden för varje expert. Kunden väljer en människa. En ansiktslös byrå förlorar mot en namngiven expert nästan varje gång.",
        },
        {
          title: "Kompetensen bevisas med innehåll",
          body: "Tydliga artiklar om de verkliga frågorna i din bransch gör två saker: de ger söktrafik och de bevisar kompetensen före det första mötet. En bra artikel om något folk faktiskt söker på är effektivare än tio tjänstesidor.",
        },
        {
          title: "Att öppna upp prissättningen",
          body: "Allt kan inte prissättas på förhand, men något kan: ett timprisintervall, bastjänster med fast pris eller en kostnadsfri inledande kartläggning. Var och en av dem sänker tröskeln att ta kontakt.",
        },
      ],
      essentials: [
        "Expertpresentationer och specialområden",
        "Tjänstebeskrivningar per kundsituation",
        "Artiklar och guider",
        "Prissättningsprinciper eller prisintervall",
        "Kostnadsfri inledande kartläggning och tidsbokning",
        "Beskrivning av hur ett uppdrag löper",
        "Informationssäkerhet och sekretess",
      ],
      metaTitle:
        "Webbplatser för bokföringsbyråer och expertföretag | Stellar Stack",
      metaDescription:
        "Webbplatser för experttjänster: expertpresentationer, innehållsmarknadsföring och en struktur som bygger förtroende.",
    },

    terveys: {
      name: "Hälsa och välbefinnande",
      tagline: "Tandläkare, fysioterapi, kliniker och veterinärer.",
      intro:
        "Inom hälsobranschen är kunden ofta orolig och söker hjälp snabbt. Webbplatsen ska vara lugn, tydlig och lätt, och tidsbokningen ska fungera utan att hen behöver förklara sitt ärende i en telefonkö.",
      problems: [
        "Tidsbokning bara under telefontider, vilket förlorar den upptagna kunden",
        "Priserna och FPA-ersättningarna är otydliga",
        "Ingen information om vad som händer på mottagningen, vilket höjer tröskeln",
        "Personalens behörigheter syns inte",
      ],
      solutions: [
        {
          title: "Tidsbokning utan telefonkö",
          body: "Kunden bokar tid enligt behandlingstyp och yrkesperson i det ögonblick hen tänker på saken. En påminnelse minskar uteblivna tider, vilket är pengar direkt.",
        },
        {
          title: "Priser och ersättningar klargjorda",
          body: "Prislistan samt vad FPA ersätter och hur mycket som blir kvar att betala. Det här är en bransch där ett otydligt pris hindrar kontakt oftare än ett högt pris gör.",
        },
        {
          title: "Ett förutsägbart första besök",
          body: "En beskrivning av vad som händer vid det första besöket, hur länge det tar och vad man ska ta med sig. Det sänker tröskeln att boka betydligt, särskilt inom tandvården.",
        },
      ],
      essentials: [
        "Tidsbokning på nätet per behandlingstyp",
        "Prislista med FPA-ersättningar",
        "Yrkespersonernas behörigheter och specialområden",
        "Beskrivning av det första besöket",
        "Avbokningsvillkor och jour",
        "Tillgänglighet och parkering",
        "Dataskydd och hantering av patientuppgifter",
      ],
      metaTitle: "Webbplatser för tandläkare och kliniker | Stellar Stack",
      metaDescription:
        "Webbplatser för hälsovårdsaktörer: tidsbokning på nätet, en tydlig prislista med FPA-ersättningar och förtroendebyggande innehåll.",
    },
  },

  projectCopy: {
    "tikanmaan-huoltoasema": {
      client: "Tikanmaan Huoltoasema",
      sector: "Bilbransch och servicestation",
      summary:
        "En trespråkig webbplats och tidsbokning på nätet för en traditionell servicestation. Bokningen synkroniseras till kalendern och bekräftelserna går ut automatiskt.",
      challenge:
        "Servicestationen hade ingen fungerande webbnärvaro alls, och varje tidsbokning sköttes per telefon mitt i arbetet. Samtalen avbröt verkstadsarbetet, bokningar som kom på kvällen eller under veckoslutet gick helt förlorade, och tjänsternas priser måste anges separat till varje som ringde.",
      approach:
        "Vi byggde en trespråkig webbplats med en fullständig tjänsteprislista per fordonsklass, och ovanpå den en tidsbokning på nätet. Kunden väljer tjänst, fordon och ledig tid, bokningen låses atomiskt så att överlappande bokningar inte kan uppstå, den synkroniseras till Google Kalender med påminnelse och en bekräftelse går till både kunden och företagaren. Kunden kan avboka själv, varvid tiden frigörs automatiskt.",
      outcome:
        "Webbplatsen är i produktion med 63 sidor på tre språk och laddar på under en sekund. Tidsbokningen fungerar från början till slut och tar emot bokningar också då ingen finns tillgänglig för att svara i telefon. Prislistan är offentlig, så prisförfrågningarna per telefon minskade.",
      metricLabels: {
        pages: "Sidor i produktion",
        languages: "Språkversioner",
        loadTime: "Laddningstid i mobilen",
      },
      metaTitle: "Tikanmaan Huoltoasema | Referens | Stellar Stack",
      metaDescription:
        "En trespråkig webbplats och tidsbokning på nätet för en servicestation. Kalendersynkronisering, automatiska bekräftelser och självbetjäningsavbokning.",
    },

    futuuri: {
      client: "Futuuri",
      sector: "Hälsoteknologi",
      summary:
        "En företagswebbplats för ett hälsoteknologibolag som utvecklar AI-assisterad bildanalys.",
      challenge:
        "Futuuri säljer till hälsovårdsorganisationer som har exceptionellt höga krav på trovärdighet och dataskydd. Webbplatsen måste beskriva en tekniskt krävande produkt så att både läkaren och den chef som beslutar om upphandlingen förstår den, och göra det på tre språk.",
      approach:
        "Vi byggde en tydlig och lugn webbplats som delar upp produktens användningsfall i egna spår och anger dataskyddet och EU-dataplaceringen synligt i stället för i en fotnot. Strukturen är gjord så att nya produktområden kan läggas till utan att webbplatsen designas om.",
      outcome:
        "Webbplatsen är i produktion på futuuri.co och fungerar som bolagets primära säljmaterial. Strukturen har klarat en växande produktportfölj utan omdesign.",
      metricLabels: {
        modalities: "Produktområden",
        dataResidency: "Uppgifternas placering",
        languages: "Språkversioner",
      },
      metaTitle: "Futuuri | Referens | Stellar Stack",
      metaDescription:
        "En företagswebbplats för ett hälsoteknologibolag. Tydlig struktur för krävande B2B-försäljning, tre språk och synligt dataskydd.",
    },

    techverxe: {
      client: "Techverxe",
      sector: "Programvaruutveckling",
      summary:
        "En företagswebbplats för en programvarubyrå som placerar seniora utvecklare i kundernas team.",
      challenge:
        "Techverxe säljer kompetens, inte en produkt, så webbplatsen måste göra en abstrakt tjänst konkret. Köparen är en teknisk chef som bedömer trovärdigheten på sekunder och genast märker om webbplatsen är byggd på ett färdigt tema.",
      approach:
        "Vi byggde en webbplats som leder med teknisk kompetens och en praktisk process i stället för allmänna löften. Strukturen gör synligt vad det i praktiken kräver att inleda ett uppdrag och hur snabbt en utvecklare blir produktiv.",
      outcome:
        "Webbplatsen fungerar som byråns primära säljmaterial och utgångspunkt för utgående försäljning. Den flyttades till en ny servermiljö under 2026 och är åter i produktion på egen infrastruktur.",
      metricLabels: {
        offices: "Kontor",
        onboarding: "Utvecklare produktiv på",
        stacks: "Teknikstackar",
      },
      metaTitle: "Techverxe | Referens | Stellar Stack",
      metaDescription:
        "En företagswebbplats för en programvarubyrå. Teknisk trovärdighet, en tydlig process och ett konkret tjänstelöfte.",
    },
  },

  articleCopy: {
    "kotisivun-hinta": {
      title: "Vad kostar en webbplats egentligen i Finland",
      excerpt:
        "Varför offerterna svänger mellan 500 och 15 000 euro, och var skillnaden faktiskt uppstår.",
      category: "Prissättning",
      body: [
        { p: "Den vanligaste frågan i ett första samtal är alltid densamma: vad kostar en webbplats. Det ärliga svaret är att offerterna i Finland rör sig från några hundra euro till långt över tiotusen, och siffran i sig säger ingenting förrän du vet vad som ligger bakom den." },
        { h: "Vad prisklasserna faktiskt ger" },
        { p: "I den billigaste änden köper du en färdig mall där din logotyp och din text byts in. Det går fort och det fungerar. Webbplatsen kommer att se ut som tusen andra, strukturen är den som mallens skapare en gång bestämde, och texterna skriver du nästan alltid själv." },
        { p: "I mellanskiktet betalar du för att någon tänker igenom strukturen kring din verksamhet, skriver texterna och bygger webbplatsen så att den laddar snabbt och går att hitta. Det mesta av arbetet i den här klassen är inte kod. Det är besluten om vad som står på vilken sida och i vilken ordning." },
        { p: "I den dyraste änden finns oftast något funktionellt: en webbutik, ett bokningssystem, en koppling till ett system du redan kör. Då slutar priset bero på antalet sidor och börjar bero på hur många specialfall som måste lösas." },
        { h: "Tre frågor som skiljer offerter åt" },
        { p: "Fråga vem som skriver texterna. Den enda frågan förklarar fler prisskillnader än någon annan. En billig offert utgår oftast från att du levererar texten själv, vilket är en fullt fungerande modell ända fram till den stund du inte hinner och projektet står stilla i tre månader." },
        { p: "Fråga i vems namn domänen och källkoden står. Domänen ska stå i ditt namn, inte leverantörens. Står den i deras betyder ett byte senare att du ber ett företag du just lämnat om en tjänst." },
        { p: "Fråga vad det kostar per år efter lanseringen. Den siffran saknas i de flesta offerter och det är just den som avgör vad ägandet verkligen kostar." },
        { h: "Kostnaderna som dyker upp år två" },
        { p: "En fi-domän kostar en liten årsavgift. Driften kostar löpande även när ingenting förändras. Om webbplatsen körs på ett publiceringssystem behöver den säkerhetsuppdateringar, för ett ouppdaterat tillägg är den enklaste vägen in i ditt företag för någon som inte är kund." },
        { p: "En statisk webbplats tar bort det mesta av detta: inget att lappa, ingen inloggningssida att angripa, och att driva en handfull filer kostar en bråkdel av en databasdriven plattform. Vilket svaret än blir, be om det skriftligt före påskrift, inte efter." },
        { h: "Fast pris eller timdebitering" },
        { p: "En timoffert kan se billigare ut på papperet och bli dyrare till slut, eftersom varje extra önskemål är en ny rad och ingen vet totalsumman förrän fakturan kommer. Ett fast pris tvingar leverantören att tänka igenom omfattningen före start, och det är precis det samtal du vill ha ändå." },
        { p: "Haken är att ett fast pris bara skyddar dig om omfattningen skrevs ner. En offert på en rad, ny webbplats, 900 euro, skyddar ingen. Be om en beskrivning som anger antalet sidor, språken, vad som räknas som en ändring och vad som räknas som nytt arbete." },
        { h: "Hur en rättvis offert ser ut" },
        { p: "Den namnger sidorna. Den säger vem som skriver texten och vem som levererar bilderna. Den anger språken. Den säger hur många ändringsrundor som ingår och vad som händer efter dem. Den ger årskostnaden efter lanseringen. Den säger i vems namn domänen, innehållet och koden står." },
        { p: "Gör en offert det kan du jämföra den ärligt med en annan som gör detsamma. Gör den inte det jämför du två tal som beskriver olika saker." },
        { h: "En sak som är värd att betala för" },
        { p: "Oavsett prisklass, betala för strukturssamtalet. Skillnaden mellan en webbplats som ger förfrågningar och en som bara finns är sällan formgivningen. Den ligger i om någon har rett ut vad en kund behöver se, och i vilken ordning, innan hen bestämmer sig för att ringa." },
      ],
      metaTitle: "Vad kostar en webbplats i Finland | Stellar Stack",
      metaDescription:
        "Varför offerter på webbplatser varierar mellan 500 och 15 000 euro och vad du bör fråga innan du väljer.",
    },
    "google-business-profiili": {
      title: "Google Business-profilen är lokalföretagets viktigaste sida",
      excerpt:
        "Oftast syns den för kunden före din webbplats, och oftast är den bristfällig.",
      category: "Söksynlighet",
      body: [
        { p: "För ett lokalt företag är Google Business-profilen ofta värd mer än webbplatsen, eftersom det är den som syns i kartresultaten innan någon scrollar till de vanliga länkarna. Den är dessutom gratis, vilket gör det till en dyr vana att lämna den halvfärdig." },
        { h: "Google berättar själv vad rankningen bygger på" },
        { p: "Google anger tre faktorer för lokala resultat: relevans, avstånd och synlighet. Lokalen kan du inte flytta, så avståndet är givet. Relevans är hur väl din profil motsvarar det någon sökte på. Synlighet är hur känt företaget verkar vara, vilket inkluderar omdömen och omnämnanden på andra håll." },
        { p: "I praktiken ligger nästan allt arbete du kan göra i relevans och synlighet, och båda går att få i skick på en eftermiddag och sedan hålla vid liv." },
        { h: "Huvudkategorin gör det tyngsta arbetet" },
        { p: "Det mest avgörande enskilda fältet är huvudkategorin. Ett företag registrerat som bilverkstad beter sig annorlunda än ett registrerat som biltillbehörsbutik, och fel val utesluter dig tyst från precis de sökningar du bryr dig om." },
        { p: "Välj den huvudkategori som namnger det du huvudsakligen gör och lägg resten som sekundära kategorier. Titta på vad de tre främsta företagen i ditt område använder, för den listan visar vilka kategorier Google faktiskt kopplar till sökningen." },
        { h: "Fälten som de flesta lämnar tomma" },
        { p: "Tjänster, var och en med en kort beskrivning. Öppettider, inklusive avvikande tider för midsommar, jul och de veckor du håller stängt, för en profil som påstår att du har öppet när du har stängt producerar ett argt omdöme i taget." },
        { p: "Fotografier på de riktiga lokalerna, teamet och arbetet, inte stockbilder. Adressen i exakt samma form som på webbplatsen och fakturorna. Ett telefonnummer där en människa svarar. En länk till just den sida som motsvarar tjänsten, inte alltid till startsidan." },
        { h: "Omdömen, utan att köpa ett enda" },
        { p: "Fråga i det ögonblick kunden är som nöjdast, oftast när hen hämtar arbetet eller betalar. Fråga personligen eller med en kort länk efteråt. Erbjud ingenting i utbyte, köp inga omdömen och fråga inte hela listan på en gång." },
        { p: "Svara på varje omdöme, även de dåliga, kort och utan att tvista. Svaret är inte till den som klagade. Det är till nästa kund som läser det och funderar på om du är ett företag som hanterar ett problem lugnt." },
        { h: "Håll namn, adress och nummer identiska överallt" },
        { p: "Företagets namn, adress och telefonnummer ska vara exakt desamma i profilen, på webbplatsen, på fakturorna och i varje katalog som listar dig. Inte Gatan 5 på ett ställe och Gatan 5 A på ett annat. Inkonsekvens gör det svårare för Google att vara säker på att posterna gäller samma företag." },
        { h: "Vad du kontrollerar en gång i månaden" },
        { p: "Fyra saker, och det tar tio minuter. Stämmer öppettiderna fortfarande, inklusive avvikelserna. Har några nya omdömen blivit obesvarade. Har någon föreslagit en ändring i dina uppgifter, för vem som helst kan föreslå och Google godkänner ibland. Är bilderna fortfarande aktuella." },
        { h: "Vad den inte gör" },
        { p: "Inte ens en komplett profil lyfter dig till första plats om tre konkurrenter ligger närmare den som söker och har dubbelt så många omdömen. Den får dig med i tävlingen, och just den delen styr du över. Lovar någon en garanterad placering i kartresultaten lovar hen något som inte går att leverera." },
      ],
      metaTitle: "Optimering av Google Business-profilen | Stellar Stack",
      metaDescription:
        "Hur ett lokalföretag får ordning på sin Google Business-profil: grunduppgifter, öppettider, bilder och recensioner.",
    },
    "sivuston-nopeus": {
      title: "Varför en långsam webbplats kostar dig kunder",
      excerpt:
        "Laddningstid är ingen teknisk detalj utan direkt antalet kontakter.",
      category: "Teknik",
      body: [
        { p: "Hastighet är ingen teknisk detalj. Det är antalet människor som orkar vänta på din sida i stället för att gå tillbaka till sökresultaten, och de som lämnar är precis de som inte kände till ditt företag sedan tidigare." },
        { h: "Vad Google faktiskt mäter" },
        { p: "Google publicerar sina gränsvärden, så du behöver inte gissa. Largest Contentful Paint, ögonblicket då huvudinnehållet syns, bör vara under 2,5 sekunder. Interaction to Next Paint, fördröjningen innan sidan svarar på en tryckning, bör vara under 200 millisekunder. Cumulative Layout Shift, hur mycket sidan hoppar medan den laddas, bör hållas under 0,1." },
        { p: "De tre talen samlas in från riktiga besök i Chrome, inte från ett laboratorietest. Därför kan en webbplats få bra poäng på en utvecklares dator och dåliga i verkligheten. Det är fältdatan som räknas." },
        { h: "Så kontrollerar du det själv på fem minuter" },
        { p: "Öppna pagespeed.web.dev, klistra in din adress och läs mobilfliken först, för det är där merparten av dina besökare finns. Om det visas fältdata högst upp är det riktiga Chrome-användare på din webbplats, och det är den delen som är värd att lita på. Laboratoriepoängen under är ett diagnosverktyg, inte en dom." },
        { p: "Gör sedan samma sak för hand: öppna din webbplats i telefonen via mobilnätet, inte hemmets wifi, och från kallstart. Om du får vänta får kunden också det, och ingen poängsiffra ändrar på det." },
        { h: "Bilderna är nästan alltid orsaken" },
        { p: "Den vanligaste orsaken är inte servern utan fotografierna. En bild rakt från telefonens kamera kan väga fyra eller fem megabyte, och en sida kan bära tio av dem. Skalad till den storlek den faktiskt visas i och sparad som WebP är samma bild en bråkdel av det, och skillnaden syns inte för ögat." },
        { p: "Tre åtgärder täcker det mesta. Exportera bilden i den bredd den verkligen visas i, inte bredare. Använd WebP eller AVIF i stället för kamerans JPEG. Ge varje bild en bredd och höjd i koden så att webbläsaren reserverar utrymmet och texten inte hoppar när bilden kommer. Det är just det hoppandet som Cumulative Layout Shift mäter." },
        { h: "Typsnitt, tillägg och allt som laddas någon annanstans ifrån" },
        { p: "En sida som hämtar sitt typsnitt från en utomstående server gör en extra förfrågan till ett företag som inte har något med ditt att göra, och texten ritas oftast inte ut förrän den är klar. När typsnittet serveras från din egen domän försvinner förfrågan helt." },
        { p: "Detsamma gäller allt inbäddat: en chattbubbla, en bokningskalender, ett socialt flöde, en karta. Var och en är en liten webbplats som laddas inuti din, med en egen budget som läggs till din totaltid oavsett om besökaren använder den. En karta som laddas först vid ett klick kostar ingenting för den som aldrig klickar." },
        { h: "Varför plattformen sätter taket" },
        { p: "En sida byggd av statiska filer kan serveras på millisekunder, eftersom ingen databasfråga och ingen rendering på servern sker i det ögonblick någon besöker den. Ett publiceringssystem gör samma arbete vid varje förfrågan om det inte medvetet har cachats, och de flesta installationer hos småföretag har inte det." },
        { p: "Det här är inget argument mot varje plattform. Det är ett argument för att fråga, innan bygget börjar, vad som faktiskt händer på servern när en besökare laddar sidan. Det svaret förutsäger din laddningstid bättre än nästan något annat i en offert." },
        { h: "Vad som inte är värt din tid" },
        { p: "Att jaga hundra poäng är inte värt det. Skillnaden mellan 92 och 100 är osynlig för kunden, medan skillnaden mellan fyra sekunder och en sekund är hela saken. Fixa bilderna, ta bort de inbäddningar du inte använder, servera typsnitten själv, och sluta där." },
        { p: "Hastighet påverkar dessutom sökrankningen direkt, så arbetet betalar sig två gånger: fler av dem som kommer stannar, och fler hittar över huvud taget fram." },
      ],
      metaTitle: "Webbplatsens hastighet och dess betydelse | Stellar Stack",
      metaDescription:
        "Varför en långsam webbplats tappar kunder, vad långsamheten oftast beror på och hur du konstaterar problemet själv.",
    },
    monikielisyys: {
      title: "Lönar det sig att göra webbplatsen också på svenska och engelska",
      excerpt:
        "I Finland gör förvånansvärt få småföretag det, vilket är just därför en möjlighet.",
      category: "Tillväxt",
      body: [
        { p: "Nästan varje finländskt småföretag publicerar sin webbplats bara på finska. Det är ett begripligt förval, och det lämnar två grupper onådda: svenskspråkiga, och de engelskspråkiga som bor i eller besöker Finland. Båda söker redan efter det du säljer." },
        { h: "När svenska lönar sig och när den inte gör det" },
        { p: "Svenska är ett officiellt språk i Finland, och talarna är inte jämnt fördelade. De är koncentrerade till kusten: Österbotten, Åbolands skärgård och delar av Nyland. Verkar du i de områdena betalar sig en svensk version. Driver du en verkstad i inlandet utan en enda svenskspråkig kund gör den det inte, och ingen borde sälja den till dig." },
        { p: "Testet är enkelt. Sköter människor i ditt område sina vardagsärenden på svenska. Om ja är språket ingen dekoration utan skillnaden mellan att komma i fråga och att inte hittas alls." },
        { h: "Engelska är en annan sak" },
        { p: "Engelska vinner sällan en lokal kund som redan kan finska. Den vinner dem som inte alls kan läsa den finska sidan: inflyttade, studerande, säsongsarbetare, turister och det växande antal människor som arbetar i Finland på engelska. För en restaurang, en verkstad, en klinik eller en bokföringsbyrå i en universitetsstad är den gruppen inte liten." },
        { h: "Varför en sida med en översättningsknapp inte räcker" },
        { p: "Webbläsarens översättningsknapp hjälper en besökare som redan har hittat dig. Den gör ingenting för den som aldrig hittade, eftersom det inte finns någonting på svenska eller engelska för en sökmotor att indexera från början." },
        { p: "Varje språk behöver sin egen adress. Inte en sida som byter text, utan stellarstack.fi snedstreck sv snedstreck och stellarstack.fi snedstreck en snedstreck, var och en med egen titel, egen beskrivning och egen brödtext. Det är just det som gör sidan behörig att över huvud taget visas när någon söker på det språket." },
        { h: "Den tekniska delen kort" },
        { p: "Tre saker avgör. Varje version har en egen adress. Varje sida anger sitt språk i koden, så att både en skärmläsare och en sökmotor vet vad de läser. Och versionerna pekar på varandra med hreflang-länkar, vilket talar om för Google att det rör sig om samma sida på olika språk och inte om innehåll som konkurrerar med sig självt." },
        { p: "Sökmotorer behandlar varje språkversion som en egen sida som hittas på sina egna villkor. Därför måste också metadatan skrivas för det språket, inte bara brödtexten, i stället för att översättas ord för ord från finskan." },
        { h: "Översättning är inte lokalisering" },
        { p: "En svensk sida översatt rakt av från finska låter som en översättning, och läsaren märker det inom en mening. Termerna måste vara de som faktiskt används i Finland: FPA och inte Försäkringskassan, och de finländska institutionerna med de namn finlandssvenskar själva använder." },
        { p: "Det betyder mer än det låter. Fel gjort signalerar att sidan producerats för sökmotorer och inte för läsaren, vilket är motsatsen till det intryck du betalade för." },
        { h: "Vad som ska översättas först" },
        { p: "Inte allt. Börja med de sidor som avgör ett köp: startsidan, de tjänster du faktiskt vill ha mer av, och kontakt. Låt bloggen vara på finska tills det finns skäl att göra annorlunda." },
        { p: "En webbplats på fem sidor på tre språk slår en på tjugo sidor på ett, om de fem sidorna är de kunden läser innan hen ringer." },
        { h: "Och kostnaden" },
        { p: "Två extra språk fördubblar inte arbetet när språklagret är byggt in i grunden från början. De fördubblar det ungefär om de limmas på två år senare, för då förutsätter strukturen, navigationen och varje intern länk ett enda språk." },
        { p: "Det är det verkliga skälet att bestämma saken i början även om du publicerar bara på finska dag ett: bygg så att de två andra kan läggas till senare utan att webbplatsen måste byggas om kring dem." },
      ],
      metaTitle: "Flerspråkig webbplats för finländska företag | Stellar Stack",
      metaDescription:
        "När en svensk och engelsk version lönar sig, vem den ger kunder och vad priset egentligen består av.",
    },
    "evasteeton-analytiikka": {
      title: "Besökarmätning utan kakbanner",
      excerpt:
        "Bannern irriterar besökaren och förstör mätningen. Oftast behövs den inte alls.",
      category: "Mätning",
      body: [
        { p: "De flesta småföretags webbplatser bär en kakbanner för att någon sade att det måste finnas en, och bannern förstör sedan tyst en stor del av den mätning den installerades för att skydda. Det finns en väg ut, och den är enklare än bannern." },
        { h: "Varifrån bannerkravet faktiskt kommer" },
        { p: "Skyldigheten handlar inte om dataskydd i allmänhet. Den kommer från reglerna om att lagra information på besökarens enhet, som i Finland finns i lagstiftningen om elektronisk kommunikation vid sidan av dataskyddsförordningen. Att lagra något som inte är nödvändigt för tjänsten, vilket en analyskaka är, kräver samtycke." },
        { p: "Läs samma sak baklänges så framträder svaret. Kravet fäster vid att lagra något på enheten. Mätning som inte lagrar något utlöser det inte." },
        { h: "Vad du förlorar på att fråga" },
        { p: "Varje besökare som tackar nej försvinner ur dina siffror, och de som tackar nej är inget slumpmässigt urval. Kvar blir en rapport som beskriver den delmängd som är mest positiv till spårning, och utifrån den fattas beslut för alla besökare." },
        { p: "Du betalar för bannern också i kontakter. Den täcker sidan i precis det ögonblick en förstagångsbesökare avgör om hen stannar, och på den lilla skärmen täcker den proportionellt mer." },
        { h: "Vad kakfri mätning ger" },
        { p: "Sidvisningar per sida. Varifrån besökarna kom: sökning, länk, annons eller direkt inskrivet. Vilken enhet. Vilket land. Hur många som nådde kontaktsidan och hur många som skickade formuläret." },
        { p: "Det är ärligt talat allt ett småföretag behöver för att avgöra något. De tre frågor som är värda att besvara är hur många som besökte, varifrån de kom och hur många som hörde av sig. Allt annat på en vanlig instrumentpanel är dekoration." },
        { h: "Vad den inte ger" },
        { p: "Inga enskilda besökarresor och ingen identitet över besök, så du kan inte säga att just den här personen återkom tre gånger före köpet. Inga målgrupper för återmarknadsföring, eftersom de bygger på just den identifierare du valt att inte lagra." },
        { p: "Om din verksamhet vilar på återmarknadsföring behöver du samtyckesflödet och bannern, och det är ett fullt rimligt byte. Gör det medvetet och inte som förval." },
        { h: "Vilka alternativ som finns" },
        { p: "Plausible, Fathom och Umami är analysverktyg byggda kakfria från början, som tjänst eller på egen server. Matomo kan köras på egen server och konfigureras utan kakor. Var och en håller datan i Europa om du väljer EU-drift, vilket tar bort en separat fråga om överföringar utanför EU." },
        { p: "De praktiska skillnaderna är små för ett småföretag. Välj ett, behåll det, och lägg uppmärksamheten på vad du gör med siffrorna." },
        { h: "Mät det som är värt pengar" },
        { p: "Besökarantalet är inte målet. Kontakterna är det. Därför är den viktigaste inställningen målen: ett skickat kontaktformulär, ett klick på telefonnumret, ett klick på e-postadressen. De tre visar om sidan gör sitt jobb." },
        { p: "Märk sedan dina kampanjer konsekvent, så att annonsen, nyhetsbrevet och den tryckta QR-koden inte alla kommer in som direkttrafik. Utan det är varje kanaljämförelse en gissning." },
        { h: "En sak att göra den här veckan" },
        { p: "Öppna din analys och försök besvara en fråga: vilken sida gav dina tio senaste förfrågningar. Syns svaret inte på en minut är mätningen byggd för rapportering och inte för beslut, och det är värt att åtgärda innan du köper mer trafik." },
      ],
      metaTitle: "Kakfri besökarmätning | Stellar Stack",
      metaDescription:
        "Varför kakbannern ofta är onödig, hur den förstör mätningen och vad man bör ta i stället.",
    },
  },
};
