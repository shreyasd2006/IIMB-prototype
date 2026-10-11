/* ==========================================================================
   IIMB FACTS REGISTER (prototype stand-in)
   One owned, dated value per fact. Pages never retype a number; they read it
   from here. Every fact carries `src` (a key into IIMB.sources) and the date it
   was checked. Values that IIMB publishes inconsistently, or does not publish,
   are stored as `pending` with the reason. They render as visible placeholders.
   ========================================================================== */
window.IIMB = window.IIMB || {};

IIMB.meta = {
  today: "2026-10-11",           // date the register was compiled; live "now" is used for event expiry
  compiledBy: "Prototype build, from pages fetched 10–11 Oct 2026"
};

IIMB.sources = {
  pgp:        { title: "PGP programme page", url: "https://www.iimb.ac.in/programmes/pgp", checked: "2026-10-11" },
  pgpAdm:     { title: "PGP admissions page", url: "https://www.iimb.ac.in/admissions/pgp-admissions", checked: "2026-10-11" },
  pgpProcess: { title: "PGP 2027 admissions process (PDF)", url: "https://www.iimb.ac.in/sites/default/files/inline-files/PGP-admissions-process_2027.pdf", checked: "2026-10-11" },
  pgpIntl:    { title: "Important dates, PGP 2027-28 (International)", url: "https://www.iimb.ac.in/node/1861", checked: "2026-10-11" },
  pgpFees:    { title: "PGP financial aid and scholarships", url: "https://www.iimb.ac.in/programmes/pgp/financial-aid-scholarships", checked: "2026-10-11" },
  placement:  { title: "Placement Report 2026 (PDF)", url: "https://www.iimb.ac.in/sites/default/files/inline-files/Placement-Report-2026.pdf", checked: "2026-10-11" },
  pgpba:      { title: "PGPBA programme page", url: "https://www.iimb.ac.in/programmes/pgpba", checked: "2026-10-11" },
  epgp:       { title: "EPGP programme page", url: "https://www.iimb.ac.in/programmes/epgp", checked: "2026-10-11" },
  pgpem:      { title: "PGPEM programme page", url: "https://www.iimb.ac.in/programmes/pgpem", checked: "2026-10-11" },
  pgpemAdm:   { title: "PGPEM 2027 admissions page", url: "https://www.iimb.ac.in/admissions/pgpem-admissions", checked: "2026-10-11" },
  about:      { title: "About IIMB", url: "https://www.iimb.ac.in/about-institute", checked: "2026-10-11" },
  life:       { title: "Life @IIMB", url: "https://www.iimb.ac.in/about-institute/life-iimb", checked: "2026-10-11" },
  arch:       { title: "Architecture", url: "https://www.iimb.ac.in/about-institute/architecture", checked: "2026-10-11" },
  sust:       { title: "Sustainability @ IIMB", url: "https://www.iimb.ac.in/about-institute/sustainability-iimb", checked: "2026-10-11" },
  ft:         { title: "IIMB ranks 11th globally as FT assesses impact of teaching cases (9 Oct 2026)", url: "https://www.iimb.ac.in/iimb-ranks-11th-globally-financial-times", checked: "2026-10-11" },
  ftMim:      { title: "PGP #21 globally, FT Masters in Management 2026 (7 Sep 2026)", url: "https://www.iimb.ac.in/ft-b-school-rankings-mim-2026", checked: "2026-10-11" },
  qs2027:     { title: "QS MiM, BA and Global MBA rankings 2027 (17 Sep 2026)", url: "https://www.iimb.ac.in/qs-world-university-rankings-2027", checked: "2026-10-11" },
  bloomberg:  { title: "EPGP #2 APAC, Bloomberg Businessweek 2026 (15 Sep 2026)", url: "https://www.iimb.ac.in/epgp-2nd-rank-apac-bloomberg-b-school-rankings-2026", checked: "2026-10-11" },
  wp:         { title: "IIMB Working Papers", url: "https://www.iimb.ac.in/iimb-research/working-papers", checked: "2026-10-11" },
  recruiters: { title: "For Recruiters", url: "https://www.iimb.ac.in/recruiters", checked: "2026-10-11" },
  eep:        { title: "Executive Education (eep.iimb.ac.in)", url: "https://eep.iimb.ac.in/", checked: "2026-10-11" },
  econ:       { title: "Faculty – Economics", url: "https://www.iimb.ac.in/faculty-economics", checked: "2026-10-11" },
  cdpg:       { title: "Centre for Digital Public Goods", url: "https://www.iimb.ac.in/cdpg/", checked: "2026-10-11" },
  cpp:        { title: "Centre for Public Policy", url: "https://www.iimb.ac.in/centres-of-excellence/cpp", checked: "2026-10-11" },
  events:     { title: "IIMB conferences and events", url: "https://www.iimb.ac.in/iimb_conferences", checked: "2026-10-11" },
  media:      { title: "Media Room", url: "https://www.iimb.ac.in/media-room", checked: "2026-10-11" },
  contact:    { title: "Contact us", url: "https://www.iimb.ac.in/contactus", checked: "2026-10-11" },
  audit:      { title: "IIMB Website Redesign: Audit and Strategic Direction (10 Oct 2026)", url: "../IIMB Website Redesign Audit and Strategic Direction.md", checked: "2026-10-10" }
};

/* Institution-level facts. `pending` = do not publish a single value yet. */
IIMB.facts = {
  ftCases:     { value: "11th", label: "globally for the impact of teaching cases", note: "#1 in India", year: 2026, by: "Financial Times", src: "ft" },
  ftCasesUse:  { value: "680", label: "higher-education institutions used IIMB cases, across close to 50 countries", year: "2024–25", src: "ft",
                 hero: "Teaching cases used by 680 institutions in close to 50 countries (2024–25)" },
  programmesRange: { label: "Programmes", src: "about", hero: "Undergraduate degrees to a PhD, including four MBA programmes and executive education" },
  nationalImportance: { label: "Status and campus", src: "arch", hero: "An Institute of National Importance under the IIM Act 2017, on B.V. Doshi's 1983 stone campus in Bengaluru" },
  hbiSales:    { value: "184,879", label: "case sales through Harvard Business Impact in 2025, up from 140,457 in 2024", year: 2025, src: "ft" },
  ftMim:       { value: "#21", label: "globally, FT Masters in Management (PGP)", year: 2026, by: "Financial Times", src: "ftMim" },
  qsMim:       { value: "#31", label: "globally, QS Master's in Management (PGP)", year: 2027, by: "QS", src: "qs2027" },
  bloombergEpgp:{ value: "#2", label: "Asia-Pacific, Bloomberg Businessweek (EPGP)", year: 2026, by: "Bloomberg Businessweek", src: "bloomberg" },
  workingPapers:{ value: "748", label: "working papers in the IIMB series, latest WP 748 (2026)", src: "wp" },
  campusDone:  { value: "1983", label: "B.V. Doshi's stone campus completed", src: "arch" },
  campusArea:  { pending: true, label: "Campus area", reason: "100 acres (Architecture page) vs 105 acres (Sustainability page)", owner: "Estate Office", src: "arch" },
  trees:       { value: "~20,000", label: "trees, over 200 plant species, 62 acres under tree cover", src: "sust" },
  stp:         { value: "2.5 lakh", label: "litres of treated water a day for gardening, from the 2013 sewage treatment plant", src: "sust" },
  faculty:     { pending: true, label: "Full-time faculty", reason: "105 (About page) vs 140-plus (PGP page)", owner: "Dean, Faculty", src: "about" },
  students:    { pending: true, label: "Students in degree programmes", reason: "about 1,200 (About page) vs 1,400+ / 1,500+ elsewhere", owner: "Dean, Programmes", src: "about" },
  equis:       { pending: true, label: "EQUIS accreditation since", reason: "About page gives both 2010 and 2016", owner: "Accreditation office", src: "about" },
  execEdScale: { pending: true, label: "Executive Education participants a year", reason: "nearly 5,000 (About page) vs 5,300+ (homepage)", owner: "Executive Education", src: "about" },
  eepAlumni:   { value: "14,000+", label: "Executive Education alumni", src: "eep" },
  logoYear:    { value: "1994", label: "the sun symbol, designed by NID Ahmedabad, in use since", src: "about" }
};

/* Rankings: claim · source · year. They appear only in this list, never as a hero. */
IIMB.rankings = [
  { rank: "11th in the world, 1st in India", what: "Teaching-case impact", by: "Financial Times, 2026", src: "ft" },
  { rank: "21st in the world", what: "Masters in Management (PGP)", by: "Financial Times, 2026", src: "ftMim" },
  { rank: "31st in the world", what: "Master's in Management (PGP)", by: "QS, 2027 edition", src: "qs2027" },
  { rank: "2nd in Asia-Pacific", what: "Best Business Schools (EPGP)", by: "Bloomberg Businessweek, 2026", src: "bloomberg" }
];

/* ---------------- Programmes ---------------- */
IIMB.programmes = [
  {
    id: "pgp", short: "PGP", name: "Post Graduate Programme in Management",
    degree: "MBA", oneLine: "Two-year, full-time, residential MBA. Most students join through CAT, straight from a degree or with a few years of work.",
    stage: ["early", "fresh"], format: "Full-time, residential", formatKey: "fulltime", months: 24,
    duration: "2 years · six trimesters with a summer project", minExpYears: 0, expText: "Not required",
    test: "CAT 2026 (international applicants: see international process)",
    batch2026: { value: "540 students", src: "pgp" },
    fee: { value: "Rs 26,00,000", batch: "2026–28 batch (domestic)", note: "Covers tuition, library, internet, case royalty, course material, hostel rent, insurance and alumni activity. Excludes taxes; mess advance Rs 30,000 a term.", src: "pgpFees",
           next: { pending: true, label: "Fee for 2027–29", reason: "not yet published", owner: "Admissions" } },
    eligibility: { value: "A bachelor's degree in any discipline with at least 50% (45% for SC, ST and PwD), or CA / ICWA / CS after Class XII with the same minimum.", src: "pgpProcess" },
    howToApply: "Take CAT 2026, then submit the IIMB online application with two online references. Shortlisted candidates take a Written Ability Test and a Personal Interview on the same day.",
    applyUrl: "https://campus.iimb.ac.in/psp/cssisprd/?cmd=login&languageCd=ENG&",
    dates: [
      { label: "CAT 2026", value: null, pending: true, reason: "exam date is published by the CAT committee", link: "https://iimcat.ac.in/", owner: "Admissions" },
      { label: "Domestic application window", value: null, pending: true, reason: "domestic dates are not published as a page; the current site shows unlinked text", owner: "Admissions" },
      { label: "International: applications open", value: "2026-10-01", src: "pgpIntl" },
      { label: "International: applications close", value: "2027-01-14", src: "pgpIntl" },
      { label: "International: interviews", text: "February / March 2027", src: "pgpIntl" },
      { label: "International: offers", text: "April 2027, second week", src: "pgpIntl" }
    ],
    chair: "manaswini-bhalla",
    contacts: [
      { role: "Admissions Office", email: "pgpadm@iimb.ac.in", phone: "+91 80 2699 3013 / 3017" },
      { role: "PGP Programme Office", email: "pgpoffice@iimb.ac.in", phone: "+91 80 2699 3036" }
    ],
    src: "pgp"
  },
  {
    id: "pgpba", short: "PGPBA", name: "Post Graduate Programme in Business Analytics",
    degree: "MBA (Business Analytics)", oneLine: "Two-year, full-time, residential MBA for people who want to lead with analytics and AI.",
    stage: ["early", "fresh"], format: "Full-time, residential", formatKey: "fulltime", months: 24,
    duration: "2 years", minExpYears: 0, expText: "Not required",
    test: { pending: true, reason: "admission test route for 2027–29 is described only in the admissions PDF", owner: "Admissions" },
    batch2026: { value: "77 students", src: "pgpba" },
    fee: { pending: true, label: "Fee for 2027–29", reason: "not published on the programme page", owner: "Admissions" },
    applyUrl: "https://www.iimb.ac.in/admissions/pgpba-admissions", src: "pgpba"
  },
  {
    id: "epgp", short: "EPGP", name: "Executive Post Graduate Programme in Management",
    degree: "MBA", oneLine: "One-year, full-time, residential MBA for professionals with at least five years of work experience.",
    stage: ["mid"], format: "Full-time, residential", formatKey: "fulltime", months: 12,
    duration: "1 year, including a two-week international immersion", minExpYears: 5, expText: "At least 5 years",
    test: { pending: true, reason: "GMAT/GRE policy for 2027 to confirm; the page shows a GMAT profile only", owner: "EPGP Admissions" },
    batch2026: { pending: true, reason: "batch size not stated on the programme page" },
    fee: { pending: true, label: "Fee for 2027–28", reason: "not published on the programme page", owner: "EPGP Admissions" },
    applyUrl: "https://www.iimb.ac.in/admissions/epgp-admissions", src: "epgp"
  },
  {
    id: "pgpem", short: "PGPEM", name: "Post Graduate Programme in Enterprise Management",
    degree: "MBA", oneLine: "Weekend MBA for working professionals with at least six years of experience after graduation. Keep your job.",
    stage: ["mid", "senior"], format: "Weekends, on campus", formatKey: "weekend", months: 24,
    duration: "2 years minimum, up to 5 years", minExpYears: 6, expText: "At least 6 years after graduation",
    test: { value: "Online GMAT/GRE scores are not accepted for the 2027 batch", src: "pgpemAdm" },
    batch2026: { value: "79 students", src: "pgpem" },
    fee: { pending: true, label: "Fee for 2027–29", reason: "not published on the programme page", owner: "PGPEM Admissions" },
    applyUrl: "https://www.iimb.ac.in/admissions/pgpem-admissions", src: "pgpem"
  }
];

/* Other programmes for routing only (no comparison). */
IIMB.otherProgrammes = [
  { id: "pgppm", short: "PGPPM", name: "Master of Management Studies (Public Policy)", oneLine: "For people building careers in public service and policy. The 23rd cohort began in 2026.", url: "https://www.iimb.ac.in/programmes/pgppm", stage: ["public"] },
  { id: "phd", short: "PhD", name: "Doctor of Philosophy", oneLine: "Five-year, full-time research programme across 11 academic areas.", url: "https://www.iimb.ac.in/programmes/doctoral-programme", stage: ["research"] },
  { id: "nsr", short: "NSR Pre-doc", name: "N. S. Ramaswamy Pre-doctoral Fellowship", oneLine: "A route into research careers before a PhD.", url: "https://www.iimb.ac.in/programmes/nsrpredoc", stage: ["research"] },
  { id: "ug", short: "BSc (Hons)", name: "Data Sciences · Economics (Dorabji Tata School of Undergraduate Studies)", oneLine: "Four-year residential degrees, 40 seats each. Applications for 2027 close 15 Oct 2026.", url: "https://ug.iimb.ac.in/", stage: ["school"] },
  { id: "eep", short: "Executive Education", name: "Open and custom programmes", oneLine: "Three days to ten months, for managers and leaders who are not leaving work.", url: "executive-education.html", stage: ["senior"] }
];

/* Career stages drive the corridor router on home and the finder. */
IIMB.stages = [
  { id: "school",   label: "Finishing Class XII",            sub: "Undergraduate" },
  { id: "fresh",    label: "Graduating, or 0–4 years' work",   sub: "Two-year MBA" },
  { id: "mid",      label: "5+ years, ready for a year out",  sub: "One-year MBA" },
  { id: "senior",   label: "6+ years, staying in my job",      sub: "Weekend MBA · Exec Ed" },
  { id: "public",   label: "In public service",                 sub: "Public policy" },
  { id: "research", label: "Heading for research",              sub: "PhD · Pre-doc" }
];

/* PGP class profile, batch of 2026 (source: PGP page). */
IIMB.pgpProfile = {
  src: "pgp", total: 540, female: 229, male: 311, professional: "20 candidates (11 male, 9 female) hold CA, CS or ICWA",
  discipline: [["Engineering", 360], ["Commerce", 97], ["Science", 39], ["Arts / Humanities", 38], ["Law", 3], ["Others", 3]],
  experience: [["None", 82], ["1–12 months", 53], ["13–24 months", 133], ["25–36 months", 153], ["37–48 months", 140], ["Over 48 months", 45]],
  age: [["19–22", 62], ["23–25", 268], ["26–28", 209], ["Over 28", 22]],
  gmatIntl: { high: 770, low: 650, average: 713, median: 700 }
};

/* Selection weights from the PGP 2027 admissions process PDF. */
IIMB.pgpSelection = {
  src: "pgpProcess",
  prePI: [["CAT", 55], ["Class X", 10], ["Class XII", 10], ["Bachelor's", 10], ["Work experience / professional course", 10], ["Gender diversity", 5]],
  postPI: [["Personal interview", 40], ["CAT", 25], ["Written Ability Test", 10], ["Work experience / professional course", 10], ["Class X", 5], ["Class XII", 5], ["Bachelor's", 5]],
  cutoffs: { note: "Minimum CAT 2025 percentiles used for the first shortlist of the 2026–28 batch. Those called for interview scored higher.",
    cols: ["VARC", "DILR", "QA", "Overall"],
    rows: [["General", 80, 75, 75, 85], ["NC-OBC", 70, 65, 65, 75], ["EWS", 70, 65, 65, 75], ["SC", 65, 60, 60, 70], ["ST", 55, 55, 55, 65], ["PwD", 50, 50, 50, 60]] }
};

/* Outcomes (Placement Report 2026). */
IIMB.outcomes = {
  src: "placement",
  pgp: { cohort: "PGP + PGPBA 2024–26", students: 605, offers: 665, companies: 177, median: "34.75", average: "35.35", ppo: "283 made / 219 accepted",
    sectors: [["Consulting", 45], ["IT software, analytics, product", 14], ["Finance, banking, investments", 11], ["E-commerce, payments, telecom, logistics", 10], ["Manufacturing, energy, infrastructure", 6], ["FMCG, retail", 6], ["Conglomerates", 5], ["Healthcare, education", 3]] },
  summer: { cohort: "PGP + PGPBA 2025–27 summers", students: 605, offers: 601, companies: 137 },
  epgp: { cohort: "EPGP 2025–26", students: 73, accepted: 61, companies: 22, median: "36.50", average: "37.10" }
};

/* PGP FAQs: every answer comes from a cited page. */
IIMB.pgpFaq = [
  { q: "Is CAT the only way in?", a: "For domestic applicants, yes. You need a CAT 2026 score that is valid on the day you submit the IIMB application, with a positive raw score in every section. International applicants follow a separate process with its own dates.", src: "pgpProcess" },
  { q: "Can I apply without a bachelor's degree?", a: "Yes, if you completed CA, ICWA or CS after Class XII. The same minimum marks apply as for a bachelor's degree.", src: "pgpProcess" },
  { q: "Does work experience count?", a: "It carries 10 of 100 points before the interview. After the interview it is scaled to 5 points and multiplied by the panel's rating of its quality. 82 of the 540 students in the 2026 batch joined with no work experience.", src: "pgpProcess" },
  { q: "What does the fee cover?", a: "For the 2026–28 batch: Rs 26,00,000 for two years, covering tuition, library, internet, case royalties, course material, hostel rent, medical and accident insurance, and alumni activity. Taxes and a Rs 30,000 mess advance each term are extra.", src: "pgpFees" },
  { q: "Are there scholarships?", a: "Yes. Examples include the Aditya Birla Scholarship (INR 1.75 lakh) and the OPJEMS Scholarship (INR 1.50 lakh). The full list is on the financial aid page.", src: "pgpFees" },
  { q: "Can I do an exchange term?", a: "Yes. In the second year you choose from a range of electives and can opt for an exchange programme at select international business schools.", src: "pgp" }
];

/* ---------------- Research themes & centres ---------------- */
IIMB.themes = [
  { id: "dpi", name: "Digital public infrastructure", question: "What can the world learn from India's digital public infrastructure, and what can be replicated elsewhere?",
    lede: "IIMB documents, evaluates and teaches India's experience with digital public goods: their architecture, their governance and their effect on productivity and formalisation.", centres: ["cdpg"], url: "theme.html?id=dpi", live: true },
  { id: "policy", name: "Public policy and governance", question: "How does India deliver public programmes, from drinking water to minority welfare, and how can they be governed better?", centres: ["cpp"], url: "centre.html?id=cpp", live: false },
  { id: "venture", name: "Entrepreneurship and venture capital", question: "What makes Indian start-ups, and the capital behind them, succeed or stall?", centres: ["nsrcel"], url: "https://www.nsrcel.org/", live: false },
  { id: "sustainability", name: "Sustainability", question: "How do organisations, and this campus, cut carbon and water use without cutting what they do?", centres: ["ccgs"], url: "about.html#sustainability", live: false }
];

IIMB.centres = {
  cdpg: { id: "cdpg", name: "Centre for Digital Public Goods", short: "CDPG", accent: "indigo",
    lede: "A knowledge and research centre on digital public infrastructure and digital public goods. In partnership with iSPIRT, it documents, evaluates and advances what India has learnt from building DPGs.",
    agenda: ["Architecture: what can we learn from how these systems and their ecosystems are built?", "Governance: what governance models do they use?", "Globalisation: what can be copied, and what depends on context?", "Ecosystem: how is an ecosystem started, and what has grown on top of these platforms?", "Impact: how have DPGs changed productivity and the formalisation of the economy?"],
    chair: "r-srinivasan", team: ["r-srinivasan", "srivardhini-k-jha", "deepak-chandrashekar", "shankhadeep-banerjee", "mayank-kumar"],
    email: "cdpg@iimb.ac.in", partners: ["iSPIRT", "Product Nation"], site: "https://www.iimb.ac.in/cdpg/", src: "cdpg" },
  cpp: { id: "cpp", name: "Centre for Public Policy", short: "CPP", accent: "laterite",
    lede: "An independent, public-interest policy think tank at IIMB. It was established in 2000 through a partnership between the Department of Personnel and Training, the UNDP and IIMB.",
    agenda: ["Government innovation and administrative reform", "Regulation and policy-making", "Public-private partnerships", "IT in government", "Rural drinking water (Jal Jeevan Mission research programme)"],
    chair: null, team: ["ritwik-banerjee", "tirthatanmoy-das"], email: null, site: "https://www.iimb.ac.in/centres-of-excellence/cpp", src: "cpp" }
};

/* ---------------- Newsroom: one stream ---------------- */
/* type: story | news | event | achievement | media | idea
   Events carry start/end; anything whose end is before "now" renders as past automatically. */
IIMB.stream = [
  { id: "ft-cases-2026", type: "news", date: "2026-10-09", title: "IIMB ranks 11th globally as the Financial Times assesses the impact of business-school teaching cases",
    dek: "Around 680 higher-education institutions used the Institute's cases across nearly 50 countries in 2024 and 2025.", url: "https://www.iimb.ac.in/iimb-ranks-11th-globally-financial-times",
    tags: { programme: [], centre: [], theme: [] }, people: ["u-dinesh-kumar", "shankhadeep-banerjee", "r-srinivasan", "sreelata-jonnalagedda"], minutes: 4 },
  { id: "water-case-2026", type: "story", date: "2026-10-07", title: "A new case study traces 25 years of India's water governance, from Gujarat to the national stage",
    dek: "It sets out four lessons for countries trying to deliver water security at scale.", url: "https://www.iimb.ac.in/new-case-study-gujarat-india-water-lessons-world",
    tags: { centre: ["cpp"], theme: ["policy"] }, minutes: 5 },
  { id: "bagchi-hdfc", type: "achievement", date: "2026-10-02", title: "Anup Bagchi (PGP 1992) appointed MD & CEO of HDFC Bank", dek: "He takes the post for a three-year term, following approval from the Reserve Bank of India.", url: "https://www.iimb.ac.in/alumnus-anup-bagchi-appointed-md-ceo-HDFC-Bank", tags: { programme: ["pgp"] }, minutes: 2 },
  { id: "iimbx-fintech", type: "news", date: "2026-10-01", title: "380 learners graduate from IIMBx's FinTech Certificate Programme for Young Professionals", dek: "Batch 1 enrolled 518 learners. The programme is linked to the Government of Karnataka's Centre of Excellence in FinTech.", url: "https://www.iimb.ac.in/iimbx-fintech-certificate-programme-2026", tags: {}, minutes: 3 },
  { id: "dpi-report-2026", type: "story", date: "2026-09-30", title: "The second 'State of DPI in India' report assesses digital public infrastructure across five sectors",
    dek: "CDPG's report, commissioned by Protean eGov Technologies, covers financial services, healthcare, agriculture, commerce and education.", url: "https://www.iimb.ac.in/cdpg-annual-policy-conclave-2026",
    tags: { centre: ["cdpg"], theme: ["dpi"] }, minutes: 4, img: "library" },
  { id: "cdpg-conclave-2026", type: "event", date: "2026-09-30", start: "2026-09-30", end: "2026-09-30", title: "CDPG Annual Conclave 2026: Envisioning the next generation of public services in India",
    dek: "Speakers from the commerce, education, agriculture, healthcare and financial-services sectors discussed how DPI, data and AI could shape public services.", url: "https://www.iimb.ac.in/node/9716", mode: "On campus", tags: { centre: ["cdpg"], theme: ["dpi"] } },
  { id: "cdpg-case-comp", type: "achievement", date: "2026-09-30", title: "IIMB's BBA (DBE) and PGP teams win two of three tracks at the National Student Case Competition", dek: "Nine finalist teams were chosen from 450 teams of 2,250 students.", url: "https://www.iimb.ac.in/cdpg-national-student-case-competition-2026", tags: { centre: ["cdpg"], theme: ["dpi"], programme: ["pgp"] }, people: ["deepak-chandrashekar"], minutes: 3 },
  { id: "moma-mous", type: "news", date: "2026-09-25", title: "IIMB and the Ministry of Minority Affairs sign MoUs on public programme delivery and innovation", dek: "CPP will provide independent oversight, and NSRCEL will support entrepreneurs.", url: "https://www.iimb.ac.in/iimb-ministry-minority-affairs-sign-mous-nmdfc", tags: { centre: ["cpp"], theme: ["policy", "venture"] }, minutes: 3 },
  { id: "media-ibc", type: "media", date: "2026-09-23", title: "Ten years on: How the IBC has changed India's insolvency landscape", outlet: "International Banker", url: "https://www.iimb.ac.in/sites/default/files/2026-09/Decade-India-Corporate-Bankruptcy-Law.pdf", people: ["m-jayadev"], tags: {} },
  { id: "qs-2027", type: "news", date: "2026-09-17", title: "PGP, PGPBA and EPGP ranked No. 1 in India in the QS 2027 MiM, Business Analytics and Global MBA rankings", dek: "Globally: PGP #31, PGPBA #60 and EPGP #64.", url: "https://www.iimb.ac.in/qs-world-university-rankings-2027", tags: { programme: ["pgp", "pgpba", "epgp"] }, minutes: 2 },
  { id: "media-gdp", type: "media", date: "2026-09-17", title: "The method behind India's new GDP numbers", outlet: "Business Standard", url: "https://www.iimb.ac.in/sites/default/files/2026-09/understanding-double-deflation.pdf", people: ["shubhabrata-das"], tags: {} },
  { id: "bloomberg-epgp", type: "news", date: "2026-09-15", title: "EPGP ranked #2 in Asia-Pacific in the Bloomberg Businessweek 2026 rankings", dek: "It is #1 in India for the fifth consecutive year.", url: "https://www.iimb.ac.in/epgp-2nd-rank-apac-bloomberg-b-school-rankings-2026", tags: { programme: ["epgp"] }, minutes: 2 },
  { id: "media-sriram", type: "media", date: "2026-09-09", title: "When profit and purpose pull in different directions", outlet: null, url: "https://www.iimb.ac.in/sites/default/files/2026-09/When-profit-purpose-pull-different-directions.pdf", people: ["m-s-sriram"], tags: { theme: ["policy"] } },
  { id: "ft-mim-2026", type: "news", date: "2026-09-07", title: "PGP moves to #21 globally and #1 in India in the FT Masters in Management 2026 ranking", dek: "Career Progress rank improved to 69 from 90. Careers Service rank moved to 8 from 11.", url: "https://www.iimb.ac.in/ft-b-school-rankings-mim-2026", tags: { programme: ["pgp"] }, minutes: 3 },
  { id: "media-derivatives", type: "media", date: "2026-09-07", title: "India's derivatives market has outgrown its cash market", outlet: "Financial Express", url: "https://www.iimb.ac.in/media-room", people: ["raja-reddy-bujunoori", "sumit-saurav", "venkatesh-panchapagesan"], tags: {} },
  { id: "cpp-conf-2026", type: "event", date: "2026-09-02", start: "2026-09-02", end: "2026-09-04", title: "XXI International Conference on Public Policy & Management", dek: "490 papers were submitted, and 64 were selected for full presentation. CPP has run the conference every year since 2005.", url: "https://www.iimb.ac.in/cpp-host-xxi-conference-2026", mode: "On campus", tags: { centre: ["cpp"], theme: ["policy"] } },
  { id: "ug-apps-2027", type: "news", date: "2026-08-18", title: "Applications open for the BSc (Hons) programmes in Data Sciences and Economics, 2027 entry", dek: "The window runs from 17 August to 15 October 2026. There are 40 seats in each programme.", url: "https://www.iimb.ac.in/iimb-ug-applications-opens-2027", tags: { programme: ["ug"] }, minutes: 2 },
  { id: "elcita-2026", type: "achievement", date: "2026-08-18", title: "IIMB wins the ELCITA Gold Award and three Excellence Awards for water, biodiversity and community service", dek: "Prof. Haritha Saranga chairs the IIMB Sustainability Taskforce.", url: "https://www.iimb.ac.in/iimb-wins-elcita-sustainability-awards-2025-26", tags: { theme: ["sustainability"] }, minutes: 2 },
  { id: "wp745", type: "idea", date: "2026-08-01", dateDisplay: "Aug 2026", title: "Calm inflation can hide fragile credibility", dek: "India's long-run inflation expectations sit near the 4% target. But almost all the belief mass sits just below the bound where learning stops self-correcting.", url: "idea.html?id=wp745", people: ["chetan-subramanian"], tags: { theme: [] }, minutes: 5, dateNote: "Working paper posted August 2026; exact day not stated" },

  /* Upcoming events (from /iimb_conferences, checked 11 Oct 2026) */
  { id: "seminar-agency", type: "event", start: "2026-10-14", end: "2026-10-14", title: "People prefer agency, but not always: evidence from G7 countries", dek: "Research seminar by Prof. Sanchayan Banerjee, King's College London. Office of Research & Publications.", url: "https://www.iimb.ac.in/node/11413", mode: "On campus", tags: { theme: ["policy"] } },
  { id: "csitm-climate", type: "event", start: "2026-10-15", end: "2026-10-15", title: "Dynamic affective–agentic positionings in climate engagement", dek: "Expert talk by Prof. Sutirtha Chatterjee, University of Nevada, Las Vegas. Hosted by CSITM; registration is open.", url: "https://www.iimb.ac.in/node/787", mode: "On campus", tags: { theme: ["sustainability"] } },
  { id: "nflp-7", type: "event", start: "2026-11-02", end: "2026-11-06", title: "Nurturing Future Leadership Programme, seventh cohort", dek: "A five-day residential programme for faculty of higher-education institutions, run by the Centre for Teaching & Learning.", url: "https://www.iimb.ac.in/node/683", mode: "Residential, on campus", tags: {} },
  { id: "ccgs-2026", type: "event", start: "2026-11-20", end: "2026-11-21", title: "International Corporate Governance & Sustainability Conference 2026", dek: "Hosted by CCGS.", url: "https://www.iimb.ac.in/node/10481", mode: "On campus", tags: { theme: ["sustainability"] } },
  { id: "india-lens", type: "event", start: "2026-12-01", end: "2026-12-02", title: "The India Lens: Building Theory from Indian Phenomena", dek: "A mentorship workshop with the AIS India Chapter, led by Prof. Abhay Mishra. CSITM is inviting paper submissions.", url: "https://www.iimb.ac.in/node/768", mode: "On campus", tags: {} },
  { id: "aib-sa", type: "event", start: "2026-12-12", end: "2026-12-12", title: "AIB South Asia paper development workshop: sustainability in international business", url: "https://www.iimb.ac.in/node/762", mode: "On campus", tags: { theme: ["sustainability"] } },
  { id: "isc-2026", type: "event", start: "2026-12-13", end: "2026-12-15", title: "India Strategy Conference 2026", dek: "Ecosystems and Strategy: Leveraging Entrepreneurship, Institutions & Technology. Jointly organised by IIM Ahmedabad, IIM Bangalore, IIM Calcutta and ISB.", url: "event.html?id=isc-2026", external: "https://indiastrategy.org/2026/", mode: "Hosted at IIM Bangalore", tags: { theme: ["dpi", "venture"] }, people: ["suresh-bhagavatula", "sai-chittaranjan-kalubandi"] },
  { id: "imr-doctoral-18", type: "event", start: "2027-01-11", end: "2027-01-12", title: "18th IMR Doctoral Conference", dek: "Delegate registration is open to faculty, doctoral scholars, researchers and policy practitioners.", url: "https://www.iimb.ac.in/node/833", mode: "On campus", tags: {} },
  { id: "ispma-9", type: "event", start: "2027-02-11", end: "2027-02-13", title: "9th India Software Product Management Summit", dek: "A three-day summit run by CSITM with the International Software Product Management Association.", url: "https://www.iimb.ac.in/ispma-2027", mode: "On campus", tags: {} }
];

/* Event detail for the event template. */
IIMB.eventDetail = {
  "isc-2026": {
    theme: "Ecosystems and Strategy: Leveraging Entrepreneurship, Institutions & Technology",
    about: [
      "IIM Bangalore will host the India Strategy Conference (ISC) 2026 from 13 to 15 December 2026. ISC is described as South Asia's largest annual gathering of strategy scholars and doctoral researchers. It is jointly organised by IIM Ahmedabad, IIM Bangalore, IIM Calcutta and the Indian School of Business.",
      "The 2026 theme looks at how firms, entrepreneurs, institutions and technological systems are changing competitive advantage. Examples range from the rapid growth of digital public infrastructure to the rise of regional innovation hubs."
    ],
    tracks: ["Conference theme: Ecosystems and Strategy", "Business & corporate strategy", "Technology, innovation & digital transformation", "Internationalisation & global strategy"],
    chairs: ["Prof. Suresh Bhagavatula (IIMB)", "Prof. Sai Chittaranjan Kalubandi (IIMB)", "Prof. Anirvan Pant (IIM Calcutta)", "Prof. Ramya T. Venkateswaran (IIM Calcutta)"],
    registration: { status: "The call for proposals has closed. Registration details are on the conference website.", url: "https://indiastrategy.org/2026/" },
    venue: "IIM Bangalore, Bannerghatta Road, Bengaluru 560076",
    src: "https://www.iimb.ac.in/iimb-host-india-strategy-conference-2026", announced: "2026-08-25"
  }
};

/* ---------------- Executive Education (eep.iimb.ac.in, checked 11 Oct 2026) ---------------- */
/* Category is assigned by this prototype from the programme title, pending EEP's own taxonomy. */
IIMB.execEd = [
  { title: "Augmented Decisions: AI and Human Behavior", batch: "Batch 1", start: "2026-10-15", length: "3 days", lengthDays: 3, cat: "Data & analytics" },
  { title: "General Management Programme for Healthcare Executives", batch: "Batch 9 (GMHE9)", start: "2026-11-06", length: "10 months", lengthDays: 300, cat: "General management" },
  { title: "Digital Supply Chains: From Strategy to Execution", start: "2026-11-16", length: "5 days", lengthDays: 5, cat: "Technology & operations" },
  { title: "Executive Programme in Luxury Fashion & Lifestyle Leadership", batch: "Batch 1 (EPLFL1)", start: "2026-11-16", length: "5 months", lengthDays: 150, cat: "Strategy & leadership" },
  { title: "Finance for Non-Finance Managers: A Primer for Decision Making", batch: "Batch 6 (FNFM6)", start: "2026-11-18", length: "6 months", lengthDays: 180, cat: "Finance" },
  { title: "Business Storytelling for Leaders", start: "2026-11-19", length: "3 days", lengthDays: 3, cat: "Strategy & leadership" },
  { title: "CEO Excellence Programme", start: "2026-11-19", length: "3 days", lengthDays: 3, cat: "Strategy & leadership" },
  { title: "Independent Directors Certificate Programme", batch: "Batch 10 (IDCP10)", start: "2026-11-21", length: "6 months", lengthDays: 180, cat: "Strategy & leadership" },
  { title: "ESG, Climate Change, and Building Future Ready Organizations", batch: "Batch 3", start: "2026-11-25", length: "4 days", lengthDays: 4, cat: "Sustainability" },
  { title: "Executive Presence for Impactful Leadership", batch: "Batch 4", start: "2026-11-25", length: "3 days", lengthDays: 3, cat: "Strategy & leadership" }
];
IIMB.execEdMeta = { total: 43, shown: 10, email: "openpro@iimb.ac.in", phones: "+91 89519 74078 / 74080 / 74073", src: "eep" };

/* ---------------- Partner with IIMB ---------------- */
IIMB.partner = [
  { id: "recruit", name: "Recruit our students", lede: "PGP and PGPBA summer and final placements, lateral placements, and EPGP placements, run by Career Development Services.", inbox: "cds@iimb.ac.in", inboxNote: "Career Development Services", alt: "place@iimb.ac.in (student placement committee)", src: "recruiters" },
  { id: "custom", name: "Custom executive education", lede: "Programmes designed for one organisation, for corporates, government, international organisations and institutions.", inbox: null, pendingInbox: "a role inbox for custom programmes", src: "eep" },
  { id: "research", name: "Sponsor research", lede: "Fund a research project, a chair or a centre's work. External research projects are listed by the Office of Research & Publications.", inbox: null, pendingInbox: "the Research & Publications role inbox", src: "wp" },
  { id: "incubate", name: "Incubate with NSRCEL", lede: "IIMB's start-up hub: incubation and programmes for founders, including women entrepreneurs and non-profits.", link: "https://www.nsrcel.org/", linkLabel: "nsrcel.org", src: "audit" },
  { id: "give", name: "Give", lede: "Support scholarships, research and the campus through the IIMB Development Foundation.", inbox: "dean.ard@iimb.ac.in", inboxNote: "Dean, Alumni Relations & Development", src: "contact" }
];

IIMB.placementCalendar = {
  src: "recruiters",
  pgp: [
    ["Pre-placement talks, summer placements", "September – October 2026"],
    ["Summer placement interviews", "26 – 31 October 2026"],
    ["Summer internships", "April – May 2027"],
    ["Lateral placements: talks and interviews", "November 2026 – January 2027"],
    ["Pre-placement talks, final placements", null],
    ["Final placement interviews", "25 – 30 January 2027"]
  ],
  epgp: [["Pre-placement talks", "September – November 2026"], ["Interviews", "12 – 18 November 2026"]]
};

/* ---------------- About & Campus ---------------- */
IIMB.leadership = [
  { name: "Dr. Devi Prasad Shetty", role: "Chairperson, Board of Governors", note: "Chairman and Founder, Narayana Health", email: "chair@iimb.ac.in" },
  { name: "Prof. U Dinesh Kumar", role: "Director-in-charge", id: "u-dinesh-kumar", email: "director@iimb.ac.in" },
  { name: "Prof. Mukta Kulkarni", role: "Dean, Programmes", id: "mukta-kulkarni" },
  { name: "Prof. Sourav Mukherji", role: "Dean, Faculty", id: "sourav-mukherji" },
  { name: "Prof. Venkatesh Panchapagesan", role: "Dean, Administration", id: "venkatesh-panchapagesan" },
  { name: "Prof. Vasanthi Srinivasan", role: "Dean, Alumni Relations & Development", id: "vasanthi-srinivasan" }
];

/* Timeline of firsts: only years an IIMB page states. */
IIMB.timeline = [
  { year: "1973", text: "Institute founded.", basis: "Implied by the Golden Jubilee celebrations in 2023; founding date to confirm with IIMB Archives", pending: true },
  { year: "1976", text: "The first PGP batch. A scholarship is still named for it.", src: "pgpFees" },
  { year: "1983", text: "B.V. Doshi's stone campus is completed: corridors, courtyards and pergolas modelled on Fatehpur Sikri.", src: "arch" },
  { year: "1994", text: "The sun symbol, designed by the National Institute of Design, Ahmedabad, comes into use.", src: "about" },
  { year: "1998", text: "PGPEM launches, a weekend MBA for people who keep their jobs.", src: "pgpem" },
  { year: "2000", text: "The Centre for Public Policy is established with DoPT and UNDP.", src: "cpp" },
  { year: "2005", text: "CPP holds its first international conference on public policy and management. It has run every year since.", src: "cpp" },
  { year: "2017", text: "The IIM Act makes IIMB an Institute of National Importance.", src: "about" },
  { year: "2026", text: "The first undergraduate batch joins the Dorabji Tata School of Undergraduate Studies, and the FT ranks IIMB 11th in the world for teaching-case impact.", src: "ft" }
];

/* ---------------- Institute information (statutory index) ---------------- */
IIMB.statutory = [
  { group: "Right to information and transparency", items: [
    ["Right to Information (RTI)", "https://www.iimb.ac.in/rti"], ["Tender notices", "https://www.iimb.ac.in/tender_notices"], ["NIRF data", "https://www.iimb.ac.in/nirf-india-rankings"], ["Student verification", "https://www.iimb.ac.in/student_verification"]] },
  { group: "Acts, rules and regulations", items: [
    ["IIM Act and Rules", "https://www.iimb.ac.in/iim-act-rules"], ["IIMB Regulations (Gazette, 31 Aug 2023, PDF)", "https://www.iimb.ac.in/sites/default/files/2023-09/IIMB-Regulations-Gazetted_31.08.2023.pdf"], ["Board of Governors", "https://www.iimb.ac.in/about-institute/board"]] },
  { group: "Reports", items: [
    ["Annual reports", "https://www.iimb.ac.in/annual-reports"], ["IIMB Impact Report 2025", "https://www.iimb.ac.in/sites/default/files/IIMB-Impact-Report%202025/"], ["Sustainability Report 2025 (PDF)", "https://www.iimb.ac.in/sites/default/files/inline-files/iimb-sustainability-report-2025.pdf"], ["Carbon Footprint Report 2025 (PDF)", "https://www.iimb.ac.in/sites/default/files/inline-files/IIMB-Carbon-Footprint-Report_2025.pdf"], ["IIMB Review Committee Report 2022 (PDF)", "https://www.iimb.ac.in/sites/default/files/2022-09/IIMB-Review-Committee-Report-2022.pdf"], ["Alumni Relations and Development Report", "https://www.iimb.ac.in/publications/alumni-relations-development-report"], ["Golden Jubilee Week Report (PDF)", "https://www.iimb.ac.in/sites/default/files/inline-files/Golden-Jubilee-Week_Report.pdf"], ["History Project", "https://www.iimb.ac.in/publications/history-project"]] },
  { group: "Policies", items: [
    ["Anti-ragging policy (PDF)", "https://www.iimb.ac.in/sites/default/files/inline-files/Anti-ragging-IIMB_1.pdf"], ["Policy for a sexual-harassment-free campus (PDF)", "https://www.iimb.ac.in/sites/default/files/inline-files/Policy-Sexual-Harassment-Free-Campus-IIMB.pdf"], ["Office of Diversity and Inclusion", "https://www.iimb.ac.in/about-institute/equal-opportunity"], ["Accessibility statement", "https://www.iimb.ac.in/accessibility-statement"], ["Copyright policy", "https://www.iimb.ac.in/copyright-policy"], ["Hyperlinking policy", "https://www.iimb.ac.in/hyperlinking-policy"]] },
  { group: "Working at IIMB", items: [
    ["Faculty recruitment", "https://www.iimb.ac.in/faculty-recruitments"], ["Job opportunities", "https://www.iimb.ac.in/job-opportunities"], ["Holiday calendar 2026", "https://www.iimb.ac.in/calendar-2026/"]] },
  { group: "Contact and feedback", items: [
    ["Contact directory", "https://www.iimb.ac.in/contactus"], ["Feedback", "https://www.iimb.ac.in/feedback"], ["Media Room", "https://www.iimb.ac.in/media-room"]] }
];

/* Media office: role inbox from the Contact page. */
IIMB.mediaContact = { email: "communications@iimb.ac.in", role: "Communications Office", src: "contact" };
