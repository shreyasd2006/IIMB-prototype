/* Editorial content: profiles, explainers, photographs, Hindi strings.
   Facts stay in register.js; this file holds words around them. */
window.IIMB = window.IIMB || {};

/* Photographs: Wikimedia Commons, campus only, captioned with place. Licences in assets/photos/credits.json. */
IIMB.photos = {
  "corridor-pergola": { alt: "A long stone corridor under an open timber pergola, with plants growing between the columns and daylight falling in bars across the floor.", place: "Pergola corridor, academic block", credit: "Sanyam Bahga · CC BY-SA 2.0" },
  "corridor-academic": { alt: "Rough stone walls and tall columns frame a corridor open to the sky, with greenery on both sides.", place: "Corridor between classrooms, academic block", credit: "Sanyam Bahga · CC BY-SA 3.0" },
  "stone-columns": { alt: "Grey stone columns and a three-storey hall, with a palm in the foreground.", place: "Three-storey hallway, academic block", credit: "Magentic Manifestations · CC BY-SA 3.0" },
  "library": { alt: "A double-height library hall with skylights, reading tables and stacks along a mezzanine.", place: "The library", credit: "Sanyam Bahga · CC BY-SA 3.0" },
  "amphitheatre": { alt: "A grassed amphitheatre of curved terraces ringed by tall trees.", place: "The amphitheatre", credit: "Apb2693 · CC BY-SA 4.0" },
  "unmaad": { alt: "A band performs on an outdoor stage beside two motorcycles, with a creeper-covered building behind.", place: "Highway 69 on stage at Unmaad, the student festival, 2014", credit: "Tarun Paul Kachhap · CC BY-SA 4.0" }
};

/* Faculty profile detail. Public information only, from the IIMB profile page. */
IIMB.profiles = {
  "chetan-subramanian": {
    photoNote: "Portrait not reproduced. Faculty photographs need consent and a rights-cleared library.",
    email: "chetan.s@iimb.ac.in",
    summary: [
      "Professor Chetan Subramanian joined IIM Bangalore in the Economics area in May 2010, from the faculty of the University at Buffalo (SUNY). He was Dean (Faculty) from April 2020 to April 2023.",
      "His research covers monetary economics, financial markets and international macroeconomics. He teaches Macroeconomics and International Macroeconomics to MBA students and Advanced Macroeconomics to doctoral students."
    ],
    education: ["PhD, Economics, University of Southern California", "MA, Economics, Tufts University"],
    outputs: [
      { year: 2026, kind: "Working paper", title: "Anchored but Fragile: Long-Run Inflation Expectations under Learning", authors: "Biswas, A., & Subramanian, C.", venue: "IIMB Working Paper No. 745", link: "idea.html?id=wp745", explainer: true },
      { year: 2026, kind: "Journal article", title: "Asymmetric wage and employment dynamics in segmented labour markets", authors: "Murali, S., Naresh, A., Shin, J. K., & Subramanian, C.", venue: "Economic Modelling, 156, 107486" },
      { year: 2026, kind: "Journal article", title: "International spillovers of US monetary policy on inequality", authors: "Dash, P., Kumar, A., & Subramanian, C.", venue: "Economic Modelling, 155, 107439" },
      { year: 2025, kind: "Journal article", title: "Debt Contract Enforcement and Product Innovation: Evidence from a Legal Reform in India", authors: "Jain, T., Singh, R., & Subramanian, C.", venue: "The Journal of Law and Economics" },
      { year: 2024, kind: "Journal article", title: "Conventional vs. Unconventional Monetary Policy under Credit Regulation", authors: "Kumar, A., Rao, R., & Subramanian, C.", venue: "Macroeconomic Dynamics, 1–27" },
      { year: 2023, kind: "Journal article", title: "Misallocation of debt and aggregate productivity", authors: "Kim, H., Mathur, V., Shin, J. K., & Subramanian, C.", venue: "Journal of Corporate Finance, 83, 102493" }
    ],
    teaching: ["Macroeconomics (MBA)", "International Macroeconomics (MBA)", "Advanced Macroeconomics (PhD)"],
    src: "https://www.iimb.ac.in/user/147/chetan-subramanian"
  }
};

/* Ideas: finding-first explainers. */
IIMB.ideas = {
  wp745: {
    headline: "Calm inflation can hide fragile credibility",
    standfirst: "Ten years after India adopted inflation targeting, expectations sit close to the 4% target. A new IIMB working paper finds they are anchored in level but fragile in distance.",
    featuring: ["chetan-subramanian"],
    coAuthors: "Arnab Biswas",
    by: null, /* writer not assigned; drafted for the prototype */
    date: "2026-08", dateLabel: "August 2026",
    body: [
      { p: "In 2015 India adopted a formal inflation target: 4%, with a band of 2 to 6%. Inflation has since been calmer, and short-horizon forecasts less volatile. By that measure, the policy has worked." },
      { p: "Arnab Biswas and Chetan Subramanian ask a harder question. Suppose people work out the central bank's target from the inflation they actually see, not from what the central bank says. Then a run of calm outcomes could hide beliefs that are still unsettled. What matters, they argue, is not the level of long-run expectations but how close they sit to the point where learning stops correcting itself." },
      { h: "What they did" },
      { p: "They estimate a New Keynesian model with adaptive learning, fitted to realised inflation and to survey forecasts one to four quarters ahead. This lets them recover the whole distribution of long-run beliefs, not just its middle." },
      { figure: "anchoring" },
      { h: "What they found" },
      { p: "By 2024 the median ten-year expectation is near the 4% target, and the probability that expectations come unanchored is about 4%. But about 96% of the belief mass sits just below the upper rational bound. If inflation runs at 5.5 to 6% for three to four quarters, the probability of unanchoring rises to as much as 16%." },
      { quote: "Anchoring holds in level while remaining fragile in distance.", cite: "Biswas and Subramanian, IIMB Working Paper 745" },
      { h: "Why it matters" },
      { p: "A central bank that reads calm inflation as earned credibility may be reading the wrong number. On this evidence, the margin for error is thinner than the headline suggests, especially near the top of the band." }
    ],
    citation: { text: "Biswas, A., & Subramanian, C. (2026). Anchored but Fragile: Long-Run Inflation Expectations under Learning. IIMB Working Paper No. 745.", pdf: "https://www.iimb.ac.in/sites/default/files/2026-08/WP%20No.%20745.pdf", page: "https://www.iimb.ac.in/node/14796", keywords: "Long-run inflation expectations; fragile anchoring; adaptive learning; inflation targeting; survey expectations", doi: null },
    figures: { anchoring: { title: "Probability that long-run expectations come unanchored", note: "Estimates reported in the working paper abstract.", rows: [["Estimated, 2024", 4], ["After 3–4 quarters of 5.5–6% inflation (up to)", 16]], unit: "%" } }
  }
};

/* Hindi interface strings and translated content.
   Drafted for the prototype; must be reviewed by IIMB's Official Language cell before use. */
IIMB.hi = {
  prototype: "प्रोटोटाइप — यह IIMB की आधिकारिक वेबसाइट नहीं है।",
  prototypeMore: "इस प्रोटोटाइप के बारे में",
  review: "हिन्दी पाठ प्रोटोटाइप के लिए तैयार किया गया है; राजभाषा प्रकोष्ठ द्वारा समीक्षा आवश्यक है।",
  skip: "मुख्य सामग्री पर जाएँ",
  util: { apply: "आवेदन · प्रवेश 2027", news: "समाचार और कार्यक्रम", alumni: "पूर्व छात्र", give: "सहयोग करें", search: "खोजें", lang: "English", login: "लॉगिन" },
  nav: { programmes: "कार्यक्रम", execed: "कार्यकारी शिक्षा", research: "शोध और विचार", faculty: "संकाय और विशेषज्ञ", partner: "IIMB के साथ साझेदारी", about: "परिचय और परिसर" },
  instituteName: "भारतीय प्रबंध संस्थान बेंगलूर",
  home: {
    lead: "शांत मुद्रास्फीति कमज़ोर विश्वसनीयता को छिपा सकती है।",
    leadMeta: "भारत में दीर्घकालिक मुद्रास्फीति अपेक्षाएँ 4% लक्ष्य के निकट हैं, पर लगभग सारा विश्वास उस सीमा के ठीक नीचे है जहाँ अपेक्षाएँ स्वयं को सुधारना बंद कर देती हैं।",
    leadBy: "प्रो. चेतन सुब्रमण्यम और अर्णब बिस्वास · IIMB वर्किंग पेपर 745 · अगस्त 2026",
    leadLink: "निष्कर्ष पढ़ें (अंग्रेज़ी)",
    positioning: "कठोर प्रबंधन चिंतन, उन प्रश्नों पर परखा गया जिन पर भारत काम कर रहा है: डिजिटल सार्वजनिक वस्तुएँ, सार्वजनिक नीति, जल, स्टार्ट-अप और पूँजी बाज़ार।",
    facts: ["स्नातक से पीएचडी तक के कार्यक्रम, जिनमें चार एमबीए कार्यक्रम और कार्यकारी शिक्षा शामिल हैं", "IIMB के टीचिंग केस 2024–25 में लगभग 50 देशों के 680 संस्थानों में उपयोग किए गए", "राष्ट्रीय महत्व का संस्थान, बेंगलूरु में बी.वी. दोशी द्वारा 1983 में बनाए गए पत्थर के परिसर पर"],
    research: "हमारे शोध से",
    routerTitle: "आप कहाँ से शुरू कर रहे हैं?",
    routerHint: "अपना करियर चरण चुनें; हम आपके लिए उपयुक्त कार्यक्रम दिखाएँगे।",
    stories: "हाल की कहानियाँ",
    events: "आगामी कार्यक्रम",
    themes: "चार प्रश्न जिन पर IIMB का शोध लौटता रहता है",
    campus: "परिसर",
    campusText: "बी.वी. दोशी द्वारा डिज़ाइन किया गया पत्थर का परिसर 1983 में पूरा हुआ। यह फ़तेहपुर सीकरी के नगर-विन्यास पर आधारित है: गलियारे, आँगन और पर्गोला, जिनसे होकर कक्षा के बाहर भी चर्चा चलती रहती है।",
    proof: "रैंकिंग, स्रोत सहित"
  },
  stages: { school: "बारहवीं पूरी कर रहे हैं", fresh: "स्नातक, या 0–4 वर्ष का अनुभव", mid: "5+ वर्ष, एक वर्ष का अवकाश संभव", senior: "6+ वर्ष, नौकरी जारी रखते हुए", public: "लोक सेवा में", research: "शोध की ओर" },
  pgp: {
    name: "प्रबंध में स्नातकोत्तर कार्यक्रम (पीजीपी)",
    degree: "एमबीए",
    oneLine: "दो वर्षीय पूर्णकालिक आवासीय एमबीए। अधिकांश विद्यार्थी CAT के माध्यम से प्रवेश लेते हैं।",
    facts: "मुख्य तथ्य",
    duration: "अवधि", durationV: "2 वर्ष · छह त्रैमासिक और ग्रीष्मकालीन परियोजना",
    format: "स्वरूप", formatV: "पूर्णकालिक, आवासीय",
    eligibility: "पात्रता", eligibilityV: "किसी भी विषय में स्नातक, न्यूनतम 50% अंक (अनुसूचित जाति, अनुसूचित जनजाति और दिव्यांग अभ्यर्थियों के लिए 45%), या बारहवीं के बाद CA / ICWA / CS",
    fee: "शुल्क", feeV: "26,00,000 रुपये", feeBatch: "2026–28 बैच (घरेलू)", feeNext: "[2027–29 का शुल्क: प्रवेश कार्यालय से पुष्टि करें]",
    route: "प्रवेश मार्ग", routeV: "CAT 2026, फिर IIMB ऑनलाइन आवेदन; चयनित अभ्यर्थियों के लिए लिखित क्षमता परीक्षा (WAT) और व्यक्तिगत साक्षात्कार",
    dates: "महत्वपूर्ण तिथियाँ", intlOpen: "अंतरराष्ट्रीय आवेदन शुरू", intlClose: "अंतरराष्ट्रीय आवेदन बंद", domestic: "घरेलू आवेदन अवधि", domesticV: "[प्रवेश कार्यालय से पुष्टि करें]",
    apply: "आवेदन करें", applyNote: "CAT 2026 अंक आवश्यक",
    profile: "बैच प्रोफ़ाइल 2026", profileV: "540 विद्यार्थी · 229 महिलाएँ · 311 पुरुष",
    outcomes: "प्लेसमेंट 2024–26 (पीजीपी + पीजीपीबीए)", outcomesV: "माध्य वार्षिक वेतन 34.75 लाख रुपये · 177 कंपनियाँ · 665 प्रस्ताव",
    contact: "प्रवेश कार्यालय",
    english: "पूरा विवरण अंग्रेज़ी पृष्ठ पर"
  },
  footer: { info: "संस्थान संबंधी जानकारी", infoFor: "जानकारी", contact: "संपर्क" }
};
