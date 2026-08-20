import type { Copy } from "./types";
import { site } from "@/content/site";

/**
 * English copy. Written for international founders and non-Finnish-speaking
 * business owners operating in Finland, so it explains Finnish specifics
 * (Kela, kotitalousvähennys, Y-tunnus) rather than assuming them.
 */
export const en: Copy = {
  nav: {
    services: "Services",
    industries: "Industries",
    work: "Work",
    insights: "Insights",
    about: "About",
    contact: "Contact",
    offer: "Offer",
    menu: "Menu",
    close: "Close",
    languageLabel: "Change language",
    skipToContent: "Skip to content",
    home: "Home",
  },

  common: {
    readMore: "Read more",
    allServices: "All services",
    allIndustries: "All industries",
    allWork: "All work",
    getInTouch: "Get in touch",
    bookCall: "Book a free consultation",
    viewSite: "Visit site",
    siteOffline: "Site under maintenance",
    backTo: "Back to",
    from: "from",
    vatNote: `Prices exclude VAT ${site.vatRate}.`,
    deliveredIn: "Delivery time",
    faqTitle: "Frequently asked questions",
    relatedServices: "Related services",
    industriesWeServe: "Industries we serve",
    breadcrumbHome: "Home",
  },

  home: {
    metaTitle: "Stellar Stack | Web development and digital growth from Turku",
    metaDescription:
      "A Turku-based digital studio building fast websites, online stores and search visibility for small businesses in Finland. Three languages, fixed pricing, one week delivery.",
    eyebrow: "Digital studio in Turku",
    headline: "Websites that",
    headlineAccent: "bring customers",
    lede: "We build fast, measurable websites and online stores for small businesses in Finland. No heavy platforms, no hidden costs, no waiting months for a launch.",
    primaryCta: { label: "Book a free consultation", section: "contact" },
    secondaryCta: { label: "See services", section: "services" },
    stats: [
      { value: "7 d", label: "Typical delivery time" },
      { value: "3", label: "Languages as standard" },
      { value: "<1 s", label: "Mobile load time" },
      { value: `${site.offer.setup} €`, label: "Fixed price, agreed up front" },
    ],
    trustLine: "From health technology to the local service station.",

    servicesEyebrow: "Services",
    servicesTitle: "Everything your business needs online",
    servicesLede:
      "Start with the site and add to it as the business grows. Every service is sold separately, so you only pay for what you actually need.",

    industriesEyebrow: "Industries",
    industriesTitle: "We know your field before the first meeting",
    industriesLede:
      "A salon and an accounting firm are not solving the same problem. We build around how your customers actually search and get in touch.",

    workEyebrow: "Work",
    workTitle: "Work that is in production",
    workLede:
      "No concepts and no stock mockups. These are real sites serving real customers right now.",

    processEyebrow: "How it works",
    processTitle: "Four steps, no surprises",
    processLede:
      "You always know where the project stands and what happens next. Most clients spend under two hours of their own time on the whole thing.",
    processSteps: [
      {
        step: "01",
        title: "Consultation",
        body: "A half-hour call or a meeting in Turku. We go through what you do, who you sell to and what the site has to deliver. You get a written proposal and a fixed price.",
      },
      {
        step: "02",
        title: "Content and structure",
        body: "We write the copy and build the sitemap from that call. You comment, we revise. Images come from yours or we source them.",
      },
      {
        step: "03",
        title: "Build",
        body: "We build the site and send you a preview link. Every revision is included in the price before launch.",
      },
      {
        step: "04",
        title: "Launch and care",
        body: "We move the site onto your domain, connect measurement and handle updates. You get back to your actual job.",
      },
    ],

    whyEyebrow: "Why us",
    whyTitle: "A small studio with a serious engineering background",
    whyLede:
      "Stellar Stack is built on the same technical foundation as the software products our team ships in its day job. You get that quality on a small business budget.",
    whyPoints: [
      {
        title: "No quote that doubles halfway through",
        body: `${site.offer.setup} euros to launch and ${site.offer.monthly} a month after that. The number is on the page before you call, and it does not move once the work starts.`,
      },
      {
        title: "Not another project that drags on for months",
        body: "A week from the first call to a site that is live, in all three languages. You stop losing enquiries while a build runs late.",
      },
      {
        title: "Not invisible to half your market",
        body: "Finnish, Swedish and English are part of the base delivery, so you turn up in searches your competitors never appear in.",
      },
      {
        title: "Not held hostage by your own supplier",
        body: "The domain, the content and the source code are yours. Change supplier whenever you like and take all of it with you.",
      },
    ],

    offerBannerTitle: `A new website for ${site.offer.setup} euros`,
    offerBannerBody: `Launch offer for small businesses: a complete multilingual site in a week, care plan ${site.offer.monthly} euros a month. No lock-in period.`,
    offerBannerCta: "See what the offer includes",
  },

  services: {
    metaTitle: "Services | Stellar Stack",
    metaDescription:
      "Websites, e-commerce, search optimisation, digital advertising, content, analytics, custom development and hosting for small businesses in Finland.",
    eyebrow: "Services",
    title: "Services that pay for themselves",
    lede: "Eight services you can buy individually or together. Everything is priced up front and none of it locks you into a long contract.",
  },

  industries: {
    metaTitle: "Industries | Stellar Stack",
    metaDescription:
      "Websites for the automotive trade, construction, restaurants, retail, professional services and healthcare providers in Turku and across Finland.",
    eyebrow: "Industries",
    title: "We build for your field, not in general",
    lede: "Every industry acquires customers differently. Below is what a site in your field actually has to do.",
    segments: {
      trades: "Construction and technical trades",
      hospitality: "Services and retail",
      professional: "Professional services",
      health: "Health and wellbeing",
    },
  },

  work: {
    metaTitle: "Work | Stellar Stack",
    metaDescription:
      "Websites in production: Tikanmaan Huoltoasema, Futuuri and Techverxe. Real builds, not concepts.",
    eyebrow: "Work",
    title: "Builds that are in production",
    lede: "Every site below was built from scratch and is in use right now. You can open them and judge for yourself.",
    challengeLabel: "The situation",
    approachLabel: "What we built",
    outcomeLabel: "The result",
    stackLabel: "Technology",
    projectUrlLabel: "Project URL",
  },

  insights: {
    metaTitle: "Insights | Stellar Stack",
    metaDescription:
      "Practical writing on websites, search visibility and measurement for small businesses in Finland.",
    eyebrow: "Insights",
    title: "Answers to the questions clients actually ask",
    lede: "We do not write because something has to be published. These are the questions that come up in almost every first call.",
    readTime: "min read",
    published: "Published",
    backToIndex: "All articles",
    moreArticles: "Read next",
  },

  about: {
    metaTitle: "About | Stellar Stack",
    metaDescription:
      "Stellar Stack is a Turku-based digital studio building fast multilingual websites for small businesses in Finland.",
    eyebrow: "About",
    title: "A Turku digital studio with a software house behind it",
    lede: "We do for small businesses what large companies buy from expensive consultancies: a fast, measurable, carefully engineered web presence.",
    story: [
      "Stellar Stack started from a simple observation. A Finnish small business owner often pays thousands of euros for a site that loads slowly, does not appear in Google, and cannot be updated without calling the supplier and being billed by the hour.",
      "Meanwhile the same team builds software for larger clients where speed, accessibility and measurability are taken for granted. That capability does not disappear when the client is a three-person service station. It just gets packaged differently.",
      "So we build every site on the same technical foundation regardless of client size: static publishing, three languages, measured performance and code the client owns. The difference is scope and price, not quality.",
      "We work out of Turku. That means you can meet us in person, get an answer in your own language, and know who built your site.",
    ],
    valuesTitle: "How we work",
    values: [
      {
        title: "The price is agreed before the work",
        body: "You get a fixed price in writing before anything starts. If the scope changes mid-project it is agreed separately, never billed afterwards as a surprise.",
      },
      {
        title: "We do not sell what you do not need",
        body: "If a three-page site is enough, we say so. We will not sell an online store to a business that does not sell online, or monthly reporting to a business with nothing to report.",
      },
      {
        title: "Honest portfolio",
        body: "We only show real builds that are in production. There are no invented clients, no borrowed logos and no numbers we cannot evidence.",
      },
      {
        title: "The work stays yours",
        body: "The domain is registered in your name, the content is yours and the source code is handed over on request. The relationship should continue because it works, not because you are locked in.",
      },
    ],
    localTitle: "Turku and the rest of Finland",
    localBody:
      "Our team is based in Turku, so we are glad to meet in person anywhere in the Southwest Finland region. The work is done remotely, and we have clients across the country.",
    areasTitle: "Where we work",
    areas: [
      "Turku and Kaarina",
      "Raisio and Naantali",
      "Salo and Paimio",
      "Southwest Finland",
      "All of Finland remotely",
    ],
  },

  contact: {
    metaTitle: "Contact | Stellar Stack",
    metaDescription: `Get in touch: ${site.email}, ${site.phoneDisplay}. Based in ${site.address.street}, ${site.address.postalCode} ${site.address.city}.`,
    eyebrow: "Contact",
    title: "Tell us what you are building",
    lede: "We usually reply the same working day. The free consultation takes about half an hour and commits you to nothing.",
    formTitle: "Send a message",
    formNote: "We read every message and reply directly.",
    sending: "Sending...",
    successNote: "Thanks, your message has been received. We will reply soon.",
    errorNote:
      "Sending failed just now. Write directly to moi@stellarstack.fi.",
    fields: {
      name: "Name",
      company: "Company",
      email: "Email",
      phone: "Phone",
      service: "What is this about",
      servicePlaceholder: "Choose a topic",
      message: "Message",
      messagePlaceholder:
        "Briefly, what does your business do and what do you need the site to achieve?",
      submit: "Send message",
    },
    directTitle: "Direct contact",
    addressLabel: "Location",
    emailLabel: "Email",
    phoneLabel: "Phone",
    hoursLabel: "Reach us",
    hours: "Monday to Friday, 9 to 17",
    responseNote: "We usually reply within a few hours on working days.",
    mapCta: "Show map",
    mapNote: "The map loads from Google only once you click this.",
    mapExternal: "Open in Google Maps",
  },

  offer: {
    metaTitle: `Offer: a new website for ${site.offer.setup} EUR | Stellar Stack`,
    metaDescription: `A multilingual business website for ${site.offer.setup} euros and a care plan at ${site.offer.monthly} euros a month. Delivered in about a week, no lock-in.`,
    eyebrow: "Launch offer",
    headline: "A complete website, ready in a week",
    lede: "This is a fixed-price package for small businesses that need a working site quickly. The same technology and the same quality as our larger projects, scoped to what can genuinely be finished in a week.",
    priceLabel: "One-time fee",
    priceSuffix: "covers the entire build",
    regularLabel: "Normally",
    monthlyLabel: "Care plan",
    monthlySuffix: "per month, no fixed term",
    includedTitle: "What is included",
    included: [
      "Up to five pages: home, services, work, about and contact",
      "All three languages: Finnish, Swedish and English",
      "Copywriting from our call, so you do not write it yourself",
      "Mobile optimisation and an accessibility check",
      "A contact form that delivers to your inbox",
      "Google Business profile review and correction",
      "Search engine fundamentals and a sitemap",
      "Visitor measurement with no cookie banner required",
      "Domain and email set up",
      "SSL certificate and EU server location",
    ],
    notIncludedTitle: "Not included, priced separately",
    notIncluded: [
      "Online store and payment processing",
      "Booking system and calendar sync",
      "Photography and video production",
      "Ongoing advertising or search optimisation",
      "Anything beyond five pages",
    ],
    timelineTitle: "The week in practice",
    timeline: [
      {
        day: "Day 1",
        title: "Consultation",
        body: "A half-hour call covering the business, the customers and the goals. After that we need almost nothing from you.",
      },
      {
        day: "Day 2 to 3",
        title: "Content",
        body: "We write the copy in three languages and assemble the images. You get it back to comment on.",
      },
      {
        day: "Day 4 to 5",
        title: "Build",
        body: "We build the site and send a preview link. We fix anything you want changed.",
      },
      {
        day: "Day 6 to 7",
        title: "Launch",
        body: "Domain, email, measurement and search engine submission. The site goes public.",
      },
    ],
    guaranteeTitle: "If you are not happy",
    guaranteeBody:
      "You see the preview before anything is invoiced. If you decide not to continue after seeing it, the project ends there and no invoice follows.",
    cta: "Book a free consultation",
    faq: [
      {
        q: "Is the price genuinely fixed?",
        a: `Yes. ${site.offer.setup} euros covers the whole build at the scope described above. The only way the price changes is if you want something from the "not included" list, and that is agreed separately in writing beforehand.`,
      },
      {
        q: "What does the care plan cover?",
        a: `${site.offer.monthly} euros a month covers hosting, the SSL certificate, backups, security updates, monitoring and small content changes such as prices, opening hours or contact details. Notice period is one month.`,
      },
      {
        q: "Do I have to write the copy?",
        a: "No. We write it from our call and send it to you for review. Most clients spend under two hours of their own time on the entire project.",
      },
      {
        q: "What if I already have a site?",
        a: "That is fine. We migrate the content, keep the old addresses working with redirects so the Google visibility you have earned is not lost, and publish the new version on the same domain.",
      },
      {
        q: "Do I own the site?",
        a: "Yes. The domain is registered in your name, the content is yours and the source code is handed over on request. If you stop the care plan, you take the site with you.",
      },
      {
        q: "Why are Swedish and English included?",
        a: "Because in Finland it is rare and it pays for itself. We build the language layer into the foundation anyway, so adding two more languages does not double the work.",
      },
    ],
    smallPrint: `Prices exclude VAT ${site.vatRate}. The offer applies to new clients and the scope described above. The standard price for an equivalent build is ${site.offer.setupRegular} euros.`,
  },

  privacy: {
    metaTitle: "Privacy policy | Stellar Stack",
    metaDescription:
      "How Stellar Stack handles personal data on its website and in client relationships.",
    title: "Privacy policy",
    updated: "Updated 18 August 2026",
    creditsHeading: "Photo credits",
    creditsIntro:
      "Some photographs on this site are used under a Creative Commons licence and are credited below. The remaining images are our own or are used under the Unsplash Licence, which requires no attribution.",
    sections: [
      {
        heading: "Controller",
        body: [
          `${site.name}, ${site.address.street}, ${site.address.postalCode} ${site.address.city}. For any privacy matter contact ${site.email} or ${site.phoneDisplay}.`,
        ],
      },
      {
        heading: "What we collect",
        body: [
          "We collect only what you provide when you contact us: name, company, email address, phone number and the content of your message.",
          "We do not acquire data from third parties and we do not buy marketing lists.",
        ],
      },
      {
        heading: "How it is used",
        body: [
          "To answer your enquiry, prepare proposals and manage the client relationship. The legal basis is pre-contractual steps or the legitimate interest in replying to you.",
          "We do not use enquiry data for marketing without your separate consent, and we do not pass it on for marketing purposes.",
        ],
      },
      {
        heading: "Cookies and measurement",
        body: [
          "This site sets no tracking cookies and carries no advertising network trackers. Visitor measurement is implemented in a way that stores no cookies and does not identify individual visitors.",
          "That is why there is no cookie banner: none is required when no tracking cookies are set.",
          "The contact page offers an interactive map you can choose to open. It does not load automatically: it is fetched from Google only when you click the button provided for that, and only then can Google set its own cookies.",
        ],
      },
      {
        heading: "Retention",
        body: [
          "Enquiries are kept for at most two years from the last contact and then deleted. Data relating to a client relationship is retained for the period required by accounting law.",
        ],
      },
      {
        heading: "Location and transfers",
        body: [
          "The site and its associated data are located within the European Union. We do not transfer personal data outside the EU or EEA.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You have the right to access data concerning you, request correction or erasure, object to processing, and lodge a complaint with the Finnish Data Protection Ombudsman.",
          `Requests go to ${site.email}. We respond within one month.`,
        ],
      },
    ],
  },

  footer: {
    tagline:
      "Fast multilingual websites and digital growth for small businesses in Finland. From Turku, nationwide.",
    servicesTitle: "Services",
    companyTitle: "Company",
    contactTitle: "Contact",
    rights: "All rights reserved.",
    businessIdPending: "",
  },

  notFound: {
    title: "Page not found",
    body: "The page you are looking for does not exist or has moved. Head back to the homepage or get in touch and we will help.",
    cta: "Back to homepage",
  },

  serviceCopy: {
    verkkosivut: {
      name: "Websites",
      tagline:
        "A fast, multilingual business site that turns visitors into enquiries.",
      intro:
        "For most businesses the website is where a customer decides whether to call you or your competitor. We build a site that loads in under a second, works as well on a phone as on a desktop, and explains in three languages why you are the right choice.",
      priceHint: `from ${site.offer.setup} EUR`,
      deliverables: [
        "Sitemap and structure shaped around your business",
        "Copywriting in Finnish, Swedish and English",
        "Responsive build for every device",
        "Accessibility review against WCAG criteria",
        "Contact forms and one-tap phone links",
        "Search engine fundamentals and structured data",
        "Launch, domain and SSL certificate",
      ],
      sections: [
        {
          title: "Why a static build",
          body: "Most small business sites in Finland run on a content management system that reassembles the page on every request and needs constant security patching. We build the pages ahead of time as files. The server sends them as they are, which means faster loading, a smaller attack surface and cheaper hosting.",
        },
        {
          title: "Three languages is not an add-on",
          body: "Language support goes into the foundation from the start rather than being bolted on later. Every page gets its own address in each language, the correct language marking and proper signals to search engines. A Swedish-speaking customer finds you in Swedish.",
        },
        {
          title: "Measurable from day one",
          body: "The site ships with visitor measurement that tells you which pages produce enquiries and where visitors come from. It sets no tracking cookies, so no cookie banner is needed and the measurement does not disappear when visitors dismiss one.",
        },
      ],
      faq: [
        {
          q: "How long does it take?",
          a: "The offer package is finished in about a week. Larger sites take two to four weeks depending on page count and how quickly we get content and images.",
        },
        {
          q: "Can I update content myself?",
          a: "Small changes such as prices, opening hours and contact details are part of the care plan: you send a message and we make them. If you want to edit yourself, we build a lightweight admin view, priced separately.",
        },
        {
          q: "What happens to my old site?",
          a: "We migrate the content and set up redirects from the old addresses to the new ones, so the visibility you have already earned in Google is preserved. The old site can stay up until the new one is approved.",
        },
      ],
      metaTitle: "Business websites | Stellar Stack",
      metaDescription:
        "Fast multilingual business websites for small companies in Finland. Static build, accessibility and search optimisation as standard.",
    },

    verkkokauppa: {
      name: "E-commerce",
      tagline:
        "Sell online without a heavy platform and a swamp of monthly fees.",
      intro:
        "An online store does not have to be a complicated project. We build a store that is fast, whose payments work with the methods Finnish customers actually use, and whose products you can manage without training.",
      priceHint: "from 2 400 EUR",
      deliverables: [
        "Product catalogue and category structure",
        "Cart and checkout flow",
        "Finnish payment methods: bank transfer, cards and MobilePay",
        "Delivery options including parcel point selection",
        "Order confirmations and customer emails",
        "Stock levels and product management",
        "E-commerce measurement and sales reporting",
      ],
      sections: [
        {
          title: "The right size",
          body: "A thirty-product store does not need the same platform as a three-thousand-product one. We pick the solution that fits your catalogue and order volume, so you are not paying for features you will never use.",
        },
        {
          title: "A checkout that does not lose the sale",
          body: "Most lost e-commerce revenue is lost at checkout. We build a checkout that works on a phone, does not force registration and shows delivery costs before the final step.",
        },
        {
          title: "Products findable in Google too",
          body: "Every product page gets structured data, so price and availability can appear directly in search results. The product feed can be connected to Google Shopping if you want to advertise.",
        },
      ],
      faq: [
        {
          q: "Which payment methods are possible?",
          a: "Finnish online banking, payment cards, MobilePay and invoice or instalment services through Finnish payment intermediaries. The intermediary agreement is made in your name.",
        },
        {
          q: "Can the store connect to my point of sale system?",
          a: "Usually yes, if your system has an interface. We check that during the consultation before promising anything.",
        },
      ],
      metaTitle: "E-commerce for small businesses | Stellar Stack",
      metaDescription:
        "A fast online store with Finnish payment methods. Right-sized for your catalogue, without unnecessary monthly fees.",
    },

    hakukoneoptimointi: {
      name: "Search optimisation",
      tagline:
        "Be found when someone is looking for your service in your area.",
      intro:
        "Local search visibility is often the most profitable marketing channel a small business has, because the person searching is already close to buying. The work splits in two: the technical health of the site and the care of your Google Business profile.",
      priceHint: "from 390 EUR/month",
      deliverables: [
        "Keyword research for your field and area",
        "Google Business profile optimisation and upkeep",
        "Technical site audit and fixes",
        "Page-level titles and descriptions",
        "Content targeted at local search",
        "Review generation and management",
        "Monthly report on rankings and traffic",
      ],
      sections: [
        {
          title: "Local search is what matters",
          body: "When somebody searches for a garage in Turku, Google shows a map and three businesses first. Getting there depends on how complete your Google Business profile is, how many reviews you have, and whether your site carries the right information in the right format. This is the work that pays back fastest.",
        },
        {
          title: "Technical health is the foundation",
          body: "A slow site does not rank, and neither does a site Google cannot read properly. We go through load speed, mobile usability, heading structure and structured data, and fix what needs fixing.",
        },
        {
          title: "Honest reporting",
          body: "Each month you get a report on which searches you appear for, how many clicked and how many got in touch. We do not report numbers that have nothing to do with revenue.",
        },
      ],
      faq: [
        {
          q: "How quickly do results show?",
          a: "Google Business profile fixes can show within a few weeks. Organic ranking changes typically take three to six months. Nobody honest promises faster.",
        },
        {
          q: "Do you guarantee first place?",
          a: "No, and nobody can. Google does not sell rankings and does not publish its algorithm. We can promise work that is known to improve visibility, and reporting that shows whether it did.",
        },
      ],
      metaTitle: "Search optimisation and local visibility | Stellar Stack",
      metaDescription:
        "Local search optimisation for small businesses in Finland. Google Business profile, technical health and honest reporting.",
    },

    mainonta: {
      name: "Digital advertising",
      tagline: "Paid visibility for while the organic kind is still building.",
      intro:
        "Search optimisation pays back slowly but durably. Advertising pays back immediately but only while you keep paying. Most small businesses need both, and advertising is best started on the searches closest to a purchase decision.",
      priceHint: "from 290 EUR/month plus media budget",
      deliverables: [
        "Campaign structure in Google Ads or Meta",
        "Keyword and audience definition",
        "Ad copy and creative direction",
        "Landing pages built for the campaign",
        "Conversion tracking installation",
        "Budget monitoring and optimisation",
        "Monthly report on cost per enquiry",
      ],
      sections: [
        {
          title: "Start small",
          body: "We do not recommend a large budget before we know what works. The first month is measurement: which searches produce enquiries and which burn money. Only then is it worth scaling the budget.",
        },
        {
          title: "The ad and the page belong together",
          body: "The most expensive mistake in paid advertising is sending the click to the homepage. We build the campaign its own landing page that answers exactly what the ad promised.",
        },
        {
          title: "Measurement before money",
          body: "Conversion tracking is installed before the first euro is spent. Otherwise you do not know whether the advertising works, and optimisation is guesswork.",
        },
      ],
      faq: [
        {
          q: "How much media budget is needed?",
          a: "For a local service, 300 to 800 euros a month is often enough to start. More competitive fields need more. We give a realistic estimate during the consultation based on the actual cost levels in your field.",
        },
        {
          q: "Who owns the ad accounts?",
          a: "You do. Accounts are created in your name and we are granted access. If the engagement ends, the history and data stay with you.",
        },
      ],
      metaTitle:
        "Google and social advertising for small businesses | Stellar Stack",
      metaDescription:
        "Digital advertising for small businesses in Finland. Measured campaign structure, dedicated landing pages and honest cost reporting.",
    },

    sisalto: {
      name: "Content",
      tagline: "Copy, images and language versions that sell on your behalf.",
      intro:
        "Most small business sites fail on the writing, not the technology. The page says what the company does but never why a customer should pick it. We write copy that answers the questions customers actually have.",
      priceHint: "from 190 EUR per page",
      deliverables: [
        "Page-level sales copy",
        "Translation and localisation into Finnish, Swedish and English",
        "Titles and descriptions matched to search terms",
        "Blog and article content",
        "Product descriptions for e-commerce",
        "Image selection and processing",
        "Tone and terminology guidance for the future",
      ],
      sections: [
        {
          title: "Translation is not enough",
          body: "A Swedish page translated straight from Finnish reads like a translation. We localise so the text works in the target language, and Swedish versions are written in Finland Swedish rather than Sweden Swedish.",
        },
        {
          title: "Write from the customer's questions",
          body: "We start from what your customers actually ask on the phone. Those are also the things they type into Google. A page that answers them clearly both sells and ranks.",
        },
      ],
      faq: [
        {
          q: "Do I need a blog?",
          a: "Most small businesses do not. A blog is worth it only if your field has questions people genuinely search for and you can sustain it. Three good articles beat twenty weak ones.",
        },
        {
          q: "Can you use my existing copy?",
          a: "Yes, where it is usable. We review, tighten and sharpen it rather than rewriting from scratch. It is also cheaper.",
        },
      ],
      metaTitle: "Copywriting and translation | Stellar Stack",
      metaDescription:
        "Website copy that sells, in Finnish, Swedish and English. Localisation, search-matched headings and product descriptions.",
    },

    analytiikka: {
      name: "Analytics",
      tagline: "Know what brings customers and what only spends budget.",
      intro:
        "Without measurement, marketing is guesswork. We build measurement that tells you where enquiries come from, and we do it in a way that respects visitor privacy and needs no cookie banner.",
      priceHint: "from 490 EUR one-time",
      deliverables: [
        "Cookieless visitor measurement setup",
        "Conversion goals: calls, forms and emails",
        "Traffic source breakdown",
        "Campaign tagging conventions",
        "A clear monthly view without vanity metrics",
        "Privacy policy review against the measurement in use",
      ],
      sections: [
        {
          title: "Privacy without a cookie banner",
          body: "We use measurement that stores no cookies and does not identify the visitor. That means no cookie banner is required, which in turn means the measurement does not vanish when three quarters of visitors decline tracking.",
        },
        {
          title: "Three numbers are enough",
          body: "Most analytics dashboards drown the user in metrics. We build a view that answers three questions: how many visited, where they came from, and how many got in touch.",
        },
      ],
      faq: [
        {
          q: "Is this Google Analytics?",
          a: "Not by default. We recommend a cookieless alternative, which is cleaner from a Finnish data protection standpoint. If you need Google Analytics, for advertising for instance, we install that too and handle consent management properly.",
        },
      ],
      metaTitle: "Web analytics without a cookie banner | Stellar Stack",
      metaDescription:
        "Cookieless visitor measurement and conversion tracking for small businesses in Finland. Know where your enquiries come from.",
    },

    sovelluskehitys: {
      name: "Custom development",
      tagline:
        "Booking, calculators or integrations when off-the-shelf will not do.",
      intro:
        "Sometimes a business needs something that does not come off the shelf: a booking system that understands your field's rules, a calculator that gives the customer a price immediately, or a connection to a system you already run. This is where the engineering background genuinely shows.",
      priceHint: "priced by scope",
      deliverables: [
        "Booking with calendar sync and reminders",
        "Price and quotation calculators",
        "Forms and workflows routed to the right people",
        "Integrations with ERP or point of sale systems",
        "Customer messaging by email and SMS",
        "Maintenance and monitoring after launch",
      ],
      sections: [
        {
          title: "Built for actual production",
          body: "The booking system at Tikanmaan Huoltoasema locks a slot atomically so two bookings cannot land on the same time, syncs to Google Calendar, sends confirmations to both the customer and the owner, and lets the customer cancel themselves. It is in production and in daily use.",
        },
        {
          title: "Start from the smallest thing that works",
          body: "We do not build a system whose features never get used. We define the smallest version that solves the problem, ship it, and expand based on real usage.",
        },
      ],
      faq: [
        {
          q: "What does this cost?",
          a: "Entirely dependent on scope. A simple booking system is a different proposition from an ERP integration. We run a consultation and give a fixed price before any work starts.",
        },
        {
          q: "Who maintains it afterwards?",
          a: "We do, as part of the care plan. The source code is yours, though, so you can move maintenance elsewhere if you want to.",
        },
      ],
      metaTitle: "Custom development and integrations | Stellar Stack",
      metaDescription:
        "Booking systems, calculators and integrations for small businesses in Finland. Built for production, maintained, and owned by the client.",
    },

    yllapito: {
      name: "Care and hosting",
      tagline: "Your site stays fast, secure and up to date.",
      intro:
        "A website is not a project, it is an ongoing thing. The care plan covers the server, backups, security, monitoring and the small changes that keep coming up.",
      priceHint: `${site.offer.monthly} EUR/month`,
      deliverables: [
        "Hosting inside the EU and an SSL certificate",
        "Automatic backups and restore",
        "Security updates and monitoring",
        "Uptime monitoring and alerts",
        "Small content changes within the monthly fee",
        "Performance monitoring and optimisation",
        "Support by email and phone",
      ],
      sections: [
        {
          title: "What counts as a small change",
          body: "Updates to prices, opening hours, contact details, staff or service descriptions are covered by the monthly fee. A new page, a new language version or new functionality is separate work, quoted up front.",
        },
        {
          title: "No fixed term",
          body: "Notice period is one month. We do not tie clients into annual contracts, because good service does not need to be forced to continue.",
        },
      ],
      faq: [
        {
          q: "What if I stop the care plan?",
          a: "You take the site files and source code with you, and the domain is already registered in your name. We help with the handover to a new supplier.",
        },
        {
          q: "How fast are small changes made?",
          a: "Typically the same or next working day. Urgent fixes such as a wrong phone number or an incorrect price are handled immediately.",
        },
      ],
      metaTitle: "Website care and hosting | Stellar Stack",
      metaDescription: `Website care from ${site.offer.monthly} euros a month: EU hosting, backups, security and small content changes.`,
    },
  },

  industryCopy: {
    autoala: {
      name: "Automotive and service stations",
      tagline: "Garages, service stations, tyre shops and car washes.",
      intro:
        "In the automotive trade the customer is rarely looking for a brand. They are looking for the nearest place that can handle the job quickly at a price they know in advance. The site's job is to answer those three things before they call a competitor.",
      problems: [
        "No prices on the site, so the customer calls whoever publishes them",
        "Booking only by phone, which lands on whoever is working the counter",
        "Google Business profile incomplete or opening hours wrong",
        "Site does not work on a phone, where nearly all the searches happen",
      ],
      solutions: [
        {
          title: "A price list that is actually visible",
          body: "We build a service price list broken down by vehicle class, updated with a single message. The customer sees the price immediately instead of having to call and ask.",
        },
        {
          title: "Booking that reduces phone calls",
          body: "The customer picks the service, the vehicle and a free slot themselves. The booking goes straight into your calendar, both parties get a confirmation, and the customer can cancel without anyone picking up the phone.",
        },
        {
          title: "Local search sorted",
          body: "In this trade the Google Business profile, opening hours, photos and reviews often matter more than the site itself. We handle both and keep them consistent with each other.",
        },
      ],
      essentials: [
        "Service price list by vehicle class",
        "Online booking with calendar sync",
        "Opening hours including exceptions",
        "Directions and a map",
        "Seasonal tyre storage and pricing",
        "Inspection services and scheduled maintenance",
        "One-tap contact on mobile",
      ],
      metaTitle: "Websites for garages and service stations | Stellar Stack",
      metaDescription:
        "Websites for the automotive trade: price lists, online booking and local search visibility. Builds already in production.",
    },

    rakennus: {
      name: "Construction, plumbing and electrical",
      tagline:
        "Construction firms, plumbing, electrical contracting and renovation.",
      intro:
        "In construction, trust decides. The customer lets you into their home and pays a significant sum, so they want to see finished work, know you are a reliable contracting party, and get a quote without making three phone calls.",
      problems: [
        "No photographs of finished work, so quality cannot be judged",
        "Requesting a quote requires calling during the working day",
        "Nothing evidences reliability: no contractor obligation data, no references",
        "The site does not say which areas you cover",
      ],
      solutions: [
        {
          title: "Work samples that sell",
          body: "We build a reference gallery where each project says what was done, where and how long it took. Before and after photographs sell in this trade better than any amount of text.",
        },
        {
          title: "A quote request that asks the right things",
          body: "The form asks for the property type, the scope, the timeline and photographs, so you can give an estimate without first answering ten clarifying questions.",
        },
        {
          title: "Reliability evidenced",
          body: "Contractor obligation data, insurance, qualifications and guidance on the Finnish household deduction all appear on the site. These are things customers look for, and their absence rules you out.",
        },
      ],
      essentials: [
        "Reference gallery by project",
        "Quote request form with photo upload",
        "Service area on a map",
        "Contractor obligation and insurance details",
        "Household deduction calculator or guidance",
        "Qualifications and certifications",
        "Emergency number if you run one",
      ],
      metaTitle: "Websites for construction and plumbing firms | Stellar Stack",
      metaDescription:
        "Websites for construction, plumbing and electrical firms: reference gallery, quote requests and contractor obligation details.",
    },

    kiinteistohuolto: {
      name: "Cleaning and property maintenance",
      tagline:
        "Cleaning companies, property maintenance, grounds and landscaping.",
      intro:
        "Cleaning and property maintenance sell as contracts, not one-off purchases. The site's job is to state clearly what a contract includes, who it suits and what it costs, so the right customers get in touch and the wrong ones do not.",
      problems: [
        "Service packages are vague, so every quote is written from scratch",
        "Commercial and domestic cleaning are mixed on the same page",
        "The pricing model is not stated, which brings the wrong enquiries",
        "No way to stand out from ten identical-looking competitors",
      ],
      solutions: [
        {
          title: "Clear service packages",
          body: "We separate domestic and commercial customers into their own paths and describe what each package contains and how it is priced. That filters out enquiries that would never have become clients.",
        },
        {
          title: "An estimate without a phone call",
          body: "A calculator based on floor area or room count gives the customer an indicative price immediately. It increases enquiries and reduces pointless quote requests.",
        },
        {
          title: "Reliability made visible",
          body: "In this trade the customer hands over keys to their home or office. Staff introductions, background checks, insurance and contract terms build the trust before the first call.",
        },
      ],
      essentials: [
        "Separate paths for commercial and domestic customers",
        "Package contents and pricing basis",
        "Price estimate calculator",
        "Service area and response times",
        "Insurance and contract terms",
        "Household deduction guidance",
        "Seasonal services such as snow clearing and grounds care",
      ],
      metaTitle:
        "Websites for cleaning and property maintenance | Stellar Stack",
      metaDescription:
        "Websites for cleaning companies and property maintenance: clear service packages, price calculators and contract client acquisition.",
    },

    ravintolat: {
      name: "Restaurants and cafes",
      tagline: "Restaurants, cafes, lunch venues and catering.",
      intro:
        "In hospitality the customer decides quickly and on a phone. They want to know three things: are you open, what is on, and how do I get there. Everything else is secondary.",
      problems: [
        "The menu is a PDF that does not open properly on a phone",
        "The lunch menu changes weekly but the site still shows last month's",
        "Opening hours differ between the site and Google",
        "Booking a table requires calling during the rush",
      ],
      solutions: [
        {
          title: "A menu that works on a phone",
          body: "The menu is built as a page, not a PDF. It loads instantly, is readable on a phone, appears in Google and can be updated with one message.",
        },
        {
          title: "A lunch menu that stays current",
          body: "The weekly lunch menu is quick to update and can be published to the site and social media at once. An out-of-date menu turns customers away.",
        },
        {
          title: "Booking and ordering without a call",
          body: "Table booking, or an order system for catering, that goes straight into your calendar. Fewer calls at peak times and more bookings in the evening when nobody is answering the phone.",
        },
      ],
      essentials: [
        "Menu as a page, not a PDF",
        "Weekly lunch menu updates",
        "Opening hours including public holidays",
        "Table booking or order form",
        "Allergens and special diets",
        "Photographs of the food and the space",
        "Map, parking and accessibility",
      ],
      metaTitle: "Websites for restaurants and cafes | Stellar Stack",
      metaDescription:
        "Websites for restaurants and cafes: menu as a page, an always-current lunch menu and table booking.",
    },

    kauneus: {
      name: "Beauty and wellbeing",
      tagline: "Salons, barbers, beauty clinics, gyms and studios.",
      intro:
        "In beauty and wellbeing the sale happens at the booking. If a customer cannot book at the moment they think of it, they do not book at all. In the evening and at the weekend, nobody is answering the phone.",
      problems: [
        "Booking by phone only, so evening customers are lost",
        "Price list missing or unclear, which raises the barrier",
        "No work shown, even though the field is entirely visual",
        "New customers do not know who they are coming to see",
      ],
      solutions: [
        {
          title: "Booking that is always open",
          body: "The customer picks the service, the stylist and the time whenever it suits them. The booking syncs to your calendar and an automatic reminder goes out, which cuts no-shows.",
        },
        {
          title: "Prices without having to ask",
          body: "Services and prices are shown clearly, by duration and stylist level where relevant. A transparent price list lowers the barrier to booking somewhere new.",
        },
        {
          title: "Work and people up front",
          body: "A gallery of finished work and a short introduction to each stylist. Customers often choose a person rather than a salon, and this is a field where that shows directly in bookings.",
        },
      ],
      essentials: [
        "Online booking by stylist",
        "Price list by service and duration",
        "Gallery of finished work",
        "Staff introductions",
        "Gift cards and promotions",
        "Cancellation terms stated clearly",
        "Location, parking and directions",
      ],
      metaTitle: "Websites for salons and beauty clinics | Stellar Stack",
      metaDescription:
        "Websites for beauty and wellbeing: online booking, a clear price list and a gallery of finished work.",
    },

    kauppa: {
      name: "Retail and e-commerce",
      tagline: "Specialist shops, retail and businesses selling online.",
      intro:
        "A small specialist shop competes against online giants and will not win on price. It wins on range, expertise and the fact that the thing is available right now. The site's job is to make those three visible.",
      problems: [
        "The range is invisible online, so customers do not know if a visit is worth it",
        "Availability cannot be checked in advance",
        "Full e-commerce is too heavy and expensive for a small range",
        "Expertise does not come across at all",
      ],
      solutions: [
        {
          title: "Range visible without a full store",
          body: "A product catalogue showing products, prices and availability, where the purchase happens in the shop. It costs a fraction of an online store and brings people through the door.",
        },
        {
          title: "E-commerce when it makes sense",
          body: "If online selling is genuinely the goal, we build a store with Finnish payment methods and parcel point delivery. But we will say plainly if we think it is not worth it.",
        },
        {
          title: "Expertise as the differentiator",
          body: "Buying guides, comparisons and maintenance instructions are content the giants do not produce and people search for. It brings traffic and builds trust.",
        },
      ],
      essentials: [
        "Product catalogue with prices and availability",
        "Online store with Finnish payment methods",
        "Reserve and collect in store",
        "Buying guides and comparisons",
        "Opening hours and location",
        "Promotions and seasonal products",
        "Service and warranty information",
      ],
      metaTitle:
        "Websites and e-commerce for specialist retail | Stellar Stack",
      metaDescription:
        "Websites and online stores for retail: product catalogue, availability, click and collect and Finnish payment methods.",
    },

    asiantuntijat: {
      name: "Professional services",
      tagline: "Accounting firms, law firms, consultants and estate agents.",
      intro:
        "In professional services the customer is buying trust, not a product. They cannot assess the quality of the work in advance, so they assess everything else: who you are, who you have helped and whether you sound like you understand their situation.",
      problems: [
        "The site talks about services but never about people",
        "No way to assess competence before making contact",
        "Pricing entirely hidden, which raises the barrier",
        "The same generic copy every competitor has",
      ],
      solutions: [
        {
          title: "People first",
          body: "Introductions, backgrounds and specialisms for each professional. Customers choose a person. A faceless firm loses to a named expert almost every time.",
        },
        {
          title: "Competence evidenced by content",
          body: "Clear articles on the real questions in your field do two jobs: they bring search traffic and they demonstrate competence before the first meeting. One good article on something people actually search for beats ten service pages.",
        },
        {
          title: "Opening up the pricing",
          body: "Not everything can be priced in advance, but something can: an hourly range, fixed-price basic services, or a free initial consultation. Each of these lowers the barrier to making contact.",
        },
      ],
      essentials: [
        "Professional profiles and specialisms",
        "Service descriptions by customer situation",
        "Articles and guides",
        "Pricing principles or a price range",
        "Free initial consultation and booking",
        "Description of how an engagement runs",
        "Data security and confidentiality",
      ],
      metaTitle:
        "Websites for accounting and professional services firms | Stellar Stack",
      metaDescription:
        "Websites for professional services: expert profiles, content marketing and a structure that builds trust.",
    },

    terveys: {
      name: "Health and wellbeing",
      tagline: "Dentists, physiotherapy, clinics and veterinary practices.",
      intro:
        "In healthcare the customer is often worried and looking for help quickly. The site needs to be calm, clear and easy, and booking has to work without them having to explain their situation on hold.",
      problems: [
        "Booking only during phone hours, which loses the busy customer",
        "Prices and Kela reimbursements are unclear",
        "No information about what happens at the appointment, which raises the barrier",
        "Staff qualifications are not visible",
      ],
      solutions: [
        {
          title: "Booking without a phone queue",
          body: "The customer books by treatment type and practitioner at the moment they think of it. A reminder cuts no-shows, which is money straight back.",
        },
        {
          title: "Prices and reimbursements made clear",
          body: "The price list plus what Kela reimburses and what is left to pay. This is a field where an unclear price prevents contact more often than a high one.",
        },
        {
          title: "A predictable first visit",
          body: "A description of what happens at the first appointment, how long it takes and what to bring. It lowers the barrier to booking substantially, particularly in dentistry.",
        },
      ],
      essentials: [
        "Online booking by treatment type",
        "Price list with Kela reimbursements",
        "Practitioner qualifications and specialisms",
        "Description of the first visit",
        "Cancellation terms and emergency care",
        "Accessibility and parking",
        "Data protection and patient record handling",
      ],
      metaTitle: "Websites for dentists and clinics | Stellar Stack",
      metaDescription:
        "Websites for healthcare providers: online booking, a clear price list with Kela reimbursements and trust-building content.",
    },
  },

  projectCopy: {
    "tikanmaan-huoltoasema": {
      client: "Tikanmaan Huoltoasema",
      sector: "Automotive and service station",
      summary:
        "A trilingual site and online booking system for a traditional service station. Bookings sync to the calendar and confirmations go out automatically.",
      challenge:
        "The service station had no working web presence at all, and every booking was handled by phone in the middle of the work. Calls interrupted workshop work, bookings arriving in the evening or at weekends were lost entirely, and service prices had to be quoted individually to every caller.",
      approach:
        "We built a trilingual site with a complete service price list broken down by vehicle class, and an online booking system on top of it. The customer picks the service, the vehicle and a free slot. The booking is locked so two cannot land on the same time, it syncs to Google Calendar with a reminder, and a confirmation goes to both the customer and the owner. The customer can cancel themselves, which frees the slot automatically.",
      outcome:
        "The site is in production across 63 pages in three languages and loads in under a second. The booking system works end to end and takes bookings at times when nobody is available to answer the phone. The price list is public, so price enquiries by phone dropped.",
      metricLabels: {
        pages: "Pages in production",
        languages: "Language versions",
        loadTime: "Mobile load time",
      },
      metaTitle: "Tikanmaan Huoltoasema | Work | Stellar Stack",
      metaDescription:
        "A trilingual site and online booking system for a service station. Calendar sync, automatic confirmations and self-service cancellation.",
    },

    futuuri: {
      client: "Futuuri",
      sector: "Health technology",
      summary:
        "A company website for a health technology firm developing AI-assisted imaging analysis.",
      challenge:
        "Futuuri sells to healthcare organisations with an exceptionally high bar for credibility and data protection. The site had to explain a technically demanding product in a way that works for both a clinician and the executive approving the purchase, and do it in three languages.",
      approach:
        "We built a clear, calm site that separates the product's use cases into their own paths and states data protection and EU data residency prominently rather than in a footnote. The structure was designed so new product areas can be added without redesigning the site.",
      outcome:
        "The site is in production at futuuri.co and serves as the company's primary sales material. The structure has absorbed an expanding product range without needing a redesign.",
      metricLabels: {
        modalities: "Product areas",
        dataResidency: "Data residency",
        languages: "Language versions",
      },
      metaTitle: "Futuuri | Work | Stellar Stack",
      metaDescription:
        "A company website for a health technology firm. A clear structure for demanding B2B sales, three languages and visible data protection.",
    },

    techverxe: {
      client: "Techverxe",
      sector: "Software development",
      summary:
        "A company website for a software development studio placing senior engineers into client teams.",
      challenge:
        "Techverxe sells capability rather than a product, so the site had to make an abstract service concrete. The buyer is a technical leader who assesses credibility in seconds and spots a stock theme immediately.",
      approach:
        "We built a site that leads with technical capability and a practical process rather than generic promises. The structure makes visible what starting an engagement actually requires and how quickly an engineer becomes productive.",
      outcome:
        "The site serves as the studio's primary sales material and the starting point for outbound sales. It went through a server environment move during 2026 and is back in production on its own infrastructure.",
      metricLabels: {
        offices: "Offices",
        onboarding: "Engineer productive in",
        stacks: "Technology stacks",
      },
      metaTitle: "Techverxe | Work | Stellar Stack",
      metaDescription:
        "A company website for a software development studio. Technical credibility, a clear process and a concrete service promise.",
    },
  },

  articleCopy: {
    "kotisivun-hinta": {
      title: "What a website actually costs in Finland",
      excerpt:
        "Why quotes swing between 500 and 15,000 euros, and where the difference really comes from.",
      category: "Pricing",
      body: [
        { p: "The most common question in a first call is always the same: what does a website cost. The honest answer is that quotes in Finland run from a few hundred euros to well over ten thousand, and the number on its own tells you nothing until you know what sits behind it." },
        { h: "What the price bands actually buy" },
        { p: "At the cheapest end you are buying a ready-made theme with your logo and text swapped in. It is fast and it works. The site will look like a thousand others, the structure is whatever the theme author decided, and you almost always write the copy yourself." },
        { p: "In the middle you are paying for somebody to think through the structure around your business, write the copy, and build the site so it loads fast and can be found. Most of the work in this range is not code. It is the decisions about what goes on which page and in what order." },
        { p: "At the top there is usually something functional: an online store, a booking system, an integration with a system you already run. Here the price stops depending on page count and starts depending on how many special cases have to be solved." },
        { h: "The three questions that separate quotes" },
        { p: "Ask who writes the copy. This single question explains more price differences than any other. A cheap quote usually assumes you supply the text, which is a perfectly workable model right up to the moment you have no time to write it and the project stalls for three months." },
        { p: "Ask who owns the domain and the source code. The domain should be registered in your name, not the supplier's. If it is in theirs, moving away later means asking a company you have just left for a favour." },
        { p: "Ask what it costs per year after launch. That number is missing from most quotes and it is the one that decides the real cost of ownership." },
        { h: "The costs that appear in year two" },
        { p: "A .fi domain is a small annual fee. Hosting is an ongoing cost even when nothing changes. If the site runs on a content management system it needs security updates, because an unpatched plugin is the easiest route into your business for somebody who is not a customer." },
        { p: "A static site removes most of that: nothing to patch, no login page to attack, and hosting a handful of files costs a fraction of a database-backed platform. Whatever the answer, ask for it in writing before you sign, not after." },
        { h: "Fixed price or hourly" },
        { p: "An hourly quote can look cheaper on paper and end up costing more, because every extra request is a new line and nobody knows the total until the invoice arrives. A fixed price forces the supplier to think the scope through before starting, which is the conversation you want anyway." },
        { p: "The catch is that a fixed price only protects you if the scope was written down. A one-line quote, new website, 900 euros, protects nobody. Ask for a scope that names the number of pages, the languages, what counts as a revision, and what counts as new work." },
        { h: "What a fair quote looks like" },
        { p: "It names the pages. It says who writes the text and who supplies the photographs. It states the languages. It says how many rounds of changes are included and what happens after those. It gives the annual cost after launch. It says who owns the domain, the content and the code." },
        { p: "If a quote does that, you can compare it honestly against another one that does the same. If it does not, you are comparing two numbers that describe different things." },
        { h: "One thing worth paying for" },
        { p: "Whatever the band, pay for the structure conversation. The difference between a site that produces enquiries and one that merely exists is rarely the visual design. It is whether somebody worked out what a customer needs to see, in what order, before deciding to call you." },
      ],
      metaTitle: "What a website costs in Finland | Stellar Stack",
      metaDescription:
        "Why website quotes range from 500 to 15,000 euros and what to ask about a quote before you choose.",
    },
    "google-business-profiili": {
      title: "Your Google Business profile matters more than your homepage",
      excerpt:
        "For a local business it is usually seen before your website, and it is usually incomplete.",
      category: "Search visibility",
      body: [
        { p: "For a local business the Google Business profile is often worth more than the website, because it is what appears in the map results before anyone scrolls to the ordinary links. It is also free, which makes leaving it half-finished an expensive habit." },
        { h: "Google says what it ranks on" },
        { p: "Google states three factors for local results: relevance, distance and prominence. You cannot move your premises, so distance is fixed. Relevance is how well your profile matches what somebody searched for. Prominence is how well known the business appears to be, which includes reviews and mentions elsewhere." },
        { p: "That means almost all the work available to you is in relevance and prominence, and both are things you can fix in an afternoon and then maintain." },
        { h: "The primary category does the heavy lifting" },
        { p: "The single most consequential field is the primary category. A garage listed as Car repair and maintenance service behaves differently from one listed as Auto parts store, and picking the wrong one quietly excludes you from the searches you care about." },
        { p: "Pick the primary category that names what you mainly do, then add secondary categories for the rest. Look at what the top three businesses in your area use, because that list tells you which categories Google is actually matching to your search." },
        { h: "The fields most profiles leave empty" },
        { p: "Services, with a short description for each. Opening hours, including special hours for midsummer, Christmas and the weeks when you are closed, because a profile that says open when you are shut generates one angry review at a time." },
        { p: "Photographs of the real premises, the team and the work, not stock. The address exactly as it appears on your website and invoices. A phone number that reaches a person. A link to the specific page on your site that matches the service, not always the front page." },
        { h: "Reviews, without buying any" },
        { p: "Ask at the moment the customer is happiest, which is usually when they collect the work or pay. Ask in person or with a short link sent afterwards. Do not offer anything in return, do not buy them, and do not ask a whole list at once." },
        { p: "Reply to every review, including the bad ones, briefly and without arguing. The reply is not for the person who complained. It is for the next customer reading it, who is deciding whether you are the sort of business that handles a problem calmly." },
        { h: "Keep the name, address and phone identical everywhere" },
        { p: "The business name, address and phone number should be byte-identical on your profile, your website, your invoices and any directory that lists you. Not Katu 5 in one place and Katu 5 A in another. Inconsistency makes it harder for Google to be confident the listings are the same business." },
        { h: "What to check every month" },
        { p: "Four things, and it takes ten minutes. Are the opening hours still right, including exceptions. Have any new reviews gone unanswered. Has anybody suggested an edit to your listing, because members of the public can and Google sometimes accepts it. Are the photographs still current." },
        { h: "What it will not do" },
        { p: "A complete profile will not put you first if three competitors are closer to the person searching and have twice the reviews. It will get you into the running, which is the part you control. Anybody promising a guaranteed position in the map results is promising something they cannot deliver." },
      ],
      metaTitle: "Optimising your Google Business profile | Stellar Stack",
      metaDescription:
        "How a local business gets its Google Business profile right: basics, opening hours, photographs and reviews.",
    },
    "sivuston-nopeus": {
      title: "Why a slow website costs you customers",
      excerpt:
        "Load time is not a technical detail. It is your enquiry count.",
      category: "Technical",
      body: [
        { p: "Speed is not a technical detail. It is the number of people who wait for your page instead of going back to the search results, and the ones who leave are exactly the people who did not know your company before." },
        { h: "What Google actually measures" },
        { p: "Google publishes the thresholds it uses, so you do not have to guess. Largest Contentful Paint, the moment the main content appears, should be under 2.5 seconds. Interaction to Next Paint, the delay before the page responds to a tap, should be under 200 milliseconds. Cumulative Layout Shift, how much the page jumps around while loading, should be under 0.1." },
        { p: "Those three numbers are collected from real visits in Chrome, not from a laboratory test, which is why a site can score well on a developer's laptop and badly in the field. Field data is what counts." },
        { h: "How to check it yourself in five minutes" },
        { p: "Open pagespeed.web.dev, paste your address and read the mobile tab first, because that is where most of your visitors are. If the page shows field data at the top, that is real Chrome users on your site, and it is the section worth trusting. The laboratory score below it is a diagnostic, not a verdict." },
        { p: "Then do the manual version: open your site on a phone using mobile data rather than your own wifi, from a cold start. If you find yourself waiting, so does the customer, and no score changes that." },
        { h: "Images are almost always the problem" },
        { p: "The most common cause is not the server, it is photographs. A picture straight from a phone camera can be four or five megabytes, and a page can carry ten of them. Scaled to the size it is actually displayed at and saved as WebP, the same photograph is a small fraction of that and the difference is invisible to the eye." },
        { p: "Three fixes cover most of it. Export at the width the image is really shown at, no wider. Use WebP or AVIF rather than JPEG straight from the camera. Give every image a width and height in the markup so the browser reserves the space and the text does not jump when the picture arrives, which is what Cumulative Layout Shift measures." },
        { h: "Fonts, plugins and the things loading from elsewhere" },
        { p: "A page that pulls its font from an outside server makes an extra request to a company that has nothing to do with yours, and the text usually cannot render until that finishes. Serving the font from your own domain removes the request entirely." },
        { p: "The same goes for anything embedded: a chat bubble, a booking calendar, a social feed, a map. Each one is a small website loading inside yours, with its own budget that gets added to your total whether or not a visitor uses it. A map that loads only when someone clicks it costs nothing to the visitor who never does." },
        { h: "Why the platform decides the ceiling" },
        { p: "A page built as static files can be served in milliseconds, because no database query and no server-side rendering happens at the moment somebody visits. A content management system does that work on every request unless it has been deliberately cached, and most small business installations have not been." },
        { p: "This is not an argument against every platform. It is an argument for asking, before the build starts, what actually happens on the server when a visitor loads a page. That answer predicts your load time better than almost anything else in a quote." },
        { h: "What is not worth your time" },
        { p: "Chasing a score of 100 is not worth it. The difference between 92 and 100 is invisible to a customer, while the difference between 4 seconds and 1 second is the whole ballgame. Fix the images, remove the embeds you do not use, host the fonts yourself, and stop." },
        { p: "Speed also feeds search ranking directly, so the work pays back twice: more of the people who arrive stay, and more people arrive in the first place." },
      ],
      metaTitle: "Website speed and why it matters | Stellar Stack",
      metaDescription:
        "Why a slow website loses customers, what usually causes it, and how to check the problem yourself.",
    },
    monikielisyys: {
      title: "Is it worth building your site in Swedish and English too",
      excerpt:
        "Surprisingly few small businesses in Finland do, which is precisely why it is an opening.",
      category: "Growth",
      body: [
        { p: "Almost every Finnish small business publishes its site in Finnish only. It is an understandable default, and it leaves two groups unreached: Swedish speakers, and the English speakers who live in or visit Finland. Both are already searching for what you sell." },
        { h: "When Swedish is worth it, and when it is not" },
        { p: "Swedish is an official language of Finland, and the speakers are not spread evenly. They are concentrated on the coast: Ostrobothnia, the Turku archipelago and parts of Uusimaa. If you trade in those areas, a Swedish version pays back. If you run a workshop in inland Finland with no Swedish-speaking customers, it will not, and nobody should sell it to you." },
        { p: "The test is simple. Do people in your area conduct daily business in Swedish. If yes, the language is not decoration, it is the difference between being considered and not being found." },
        { h: "English is a different argument" },
        { p: "English rarely wins you a local customer who already speaks Finnish. It wins you the ones who cannot read the Finnish page at all: newcomers, students, seasonal workers, tourists, and the growing number of people working in Finland in English. For a restaurant, a garage, a clinic or an accountant in a university city, that group is not small." },
        { h: "Why one page with a translate widget does not work" },
        { p: "A browser translation button helps a visitor who has already found you. It does nothing for the visitor who never found you, because there is nothing in Swedish or English for a search engine to index in the first place." },
        { p: "Each language needs its own address. Not one page that swaps text, but stellarstack.fi slash sv slash and stellarstack.fi slash en slash, each with its own title, its own description and its own body. That is what makes the page eligible to appear at all when somebody searches in that language." },
        { h: "The technical part, briefly" },
        { p: "Three things matter. Each version has its own URL. Each page declares its language in the markup, so a screen reader and a search engine both know what they are reading. And the versions point at each other with hreflang links, which tells Google that these are the same page in different languages rather than duplicate content competing with itself." },
        { p: "Search engines treat each language version as a page found on its own terms. So the metadata has to be written for that language too, not only the body copy, rather than translated word for word from the Finnish." },
        { h: "Translation is not localisation" },
        { p: "A Swedish page translated straight from Finnish reads like a translation, and readers notice within a sentence. Terms have to be the ones actually used in Finland: FPA rather than Försäkringskassan, and the Finnish institutions named as Swedish speakers in Finland name them." },
        { p: "This matters more than it sounds. Getting it wrong signals that the page was produced for search engines rather than for the reader, which is the opposite of the impression you were paying for." },
        { h: "What to translate first" },
        { p: "Not everything. Start with the pages that decide a purchase: the front page, the services you actually want more of, and contact. Leave the blog in Finnish until there is a reason not to." },
        { p: "A five-page site in three languages beats a twenty-page site in one, if those five pages are the ones customers read before calling." },
        { h: "The cost question" },
        { p: "Two extra languages do not double the work when the language layer is built into the foundation from the start. They roughly double it when they are bolted on two years later, because by then the structure, the navigation and every internal link assume one language." },
        { p: "That is the real argument for deciding at the beginning even if you only publish Finnish on day one: build so the other two can be added later without rebuilding the site around them." },
      ],
      metaTitle: "Multilingual websites for Finnish businesses | Stellar Stack",
      metaDescription:
        "When Swedish and English versions are worth it, who they bring in, and what actually drives their cost.",
    },
    "evasteeton-analytiikka": {
      title: "Measuring visitors without a cookie banner",
      excerpt:
        "The banner annoys the visitor and breaks the measurement. Usually it is not needed at all.",
      category: "Measurement",
      body: [
        { p: "Most small business sites carry a cookie banner because somebody said they had to, and the banner then quietly destroys a large part of the measurement it was installed to protect. There is a way out, and it is simpler than the banner." },
        { h: "Where the banner requirement actually comes from" },
        { p: "The obligation is not really about privacy law in general. It comes from the rules on storing information on a visitor's device, which in Finland sit in the electronic communications legislation alongside the GDPR. Storing something that is not strictly necessary for the service, which is what an analytics cookie is, requires consent." },
        { p: "Read that the other way around and the answer appears. The requirement attaches to STORING something on the device. Measurement that stores nothing does not trigger it." },
        { h: "What you lose by asking" },
        { p: "Every visitor who declines disappears from your numbers, and the ones who decline are not a random sample. You end up with a report describing the subset of visitors most willing to accept tracking, then making decisions for all visitors based on it." },
        { p: "You also pay for the banner in conversions. It covers the page at the exact moment a first-time visitor is deciding whether to stay, on the small screen where it covers proportionally more." },
        { h: "What cookieless measurement gives you" },
        { p: "Page views by page. Where visitors came from: search, a link, an advertisement, or typed directly. Which device. Which country. How many people reached your contact page, and how many completed the form." },
        { p: "That is genuinely all a small business needs to decide anything. The three questions worth answering are how many visited, where they came from, and how many got in touch. Everything else on a typical dashboard is decoration." },
        { h: "What it does not give you" },
        { p: "No individual visitor journeys and no cross-session identity, so you cannot say this specific person came back three times before buying. No remarketing audiences, because those depend on the identifier you have chosen not to store." },
        { p: "If your business depends on retargeting advertising, you need the consent flow and the banner, and that is a legitimate trade. Make it deliberately rather than by default." },
        { h: "The options that exist" },
        { p: "Plausible, Fathom and Umami are hosted or self-hostable analytics built cookieless from the start. Matomo can be run self-hosted and configured without cookies. Each keeps data in Europe if you choose EU hosting, which removes a separate question about transfers outside the EU." },
        { p: "The practical differences are small for a small business. Pick one, keep it, and spend the attention on what you do with the numbers." },
        { h: "Measure the thing that is worth money" },
        { p: "Traffic is not the goal. Enquiries are. So the setup that matters is conversion goals: a completed contact form, a click on the phone number, a click on the email address. Those three tell you whether a page does its job." },
        { p: "Then tag your campaigns consistently, so an advertisement, a newsletter and a printed QR code do not all arrive as direct traffic. Without that, every channel comparison is guesswork." },
        { h: "One thing to do this week" },
        { p: "Open your analytics and try to answer one question: which page produced your last ten enquiries. If the answer is not visible in under a minute, the measurement is set up for reporting rather than for deciding, and that is worth fixing before you buy any more traffic." },
      ],
      metaTitle: "Cookieless visitor measurement | Stellar Stack",
      metaDescription:
        "Why a cookie banner is often unnecessary, how it breaks your measurement, and what to use instead.",
    },
  },
};
