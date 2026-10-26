/* Programme pages in full (IIMB minutes, 26 Oct 2026): everything below is taken from the official programme pages
   on iimb.ac.in, ug.iimb.ac.in and eep.iimb.ac.in, fetched 26 Oct 2026. Each block names its source. */
window.IIMB = window.IIMB || {};

Object.assign(IIMB.sources, {
  pgpPage: { t: "PGP programme page", u: "https://www.iimb.ac.in/programmes/pgp" },
  pgpStructure: { t: "PGP programme structure", u: "https://www.iimb.ac.in/programmes/pgp/programme-structure" },
  pgpAid: { t: "PGP financial aid and scholarships", u: "https://www.iimb.ac.in/programmes/pgp/financial-aid-scholarships" },
  pgpExchange: { t: "Student Exchange Programme", u: "https://www.iimb.ac.in/programmes/pgp/student-exchange-programme" },
  pgpDD: { t: "Dual / Double Degree Programs", u: "https://www.iimb.ac.in/programmes/pgp/dd-programmes" },
  finals2026: { t: "PGP and PGPBA final placements 2026, 20 Mar 2026", u: "https://www.iimb.ac.in/iimb-pgp-pgpba-placements-2026" },
  summers2026: { t: "PGP and PGPBA summer placements, 18 Oct 2025", u: "https://www.iimb.ac.in/iimb-summer-placements-2026" },
  placementReport: { t: "Placement Report 2026 (PDF)", u: "https://www.iimb.ac.in/sites/default/files/inline-files/Placement-Report-2026.pdf" },
  pgpbaPage: { t: "PGPBA programme page", u: "https://www.iimb.ac.in/programmes/pgpba" },
  pgpbaStructure: { t: "PGPBA programme structure", u: "https://www.iimb.ac.in/programmes/pgpba/programme-structure" },
  pgpbaAid: { t: "PGPBA financial aid and scholarships", u: "https://www.iimb.ac.in/programmes/pgpba/financial-aid-scholarships" },
  epgpPage: { t: "EPGP programme page", u: "https://www.iimb.ac.in/programmes/epgp" },
  epgpStructure: { t: "EPGP course structure", u: "https://www.iimb.ac.in/programmes/epgp/programme-structure" },
  epgpPlacement: { t: "EPGP placements", u: "https://www.iimb.ac.in/programmes/epgp/placement" },
  epgpImmersion: { t: "EPGP international immersion", u: "https://www.iimb.ac.in/programmes/epgp/epgp-international-immersion" },
  epgpFees: { t: "EPGP fees and scholarships", u: "https://www.iimb.ac.in/programmes/epgp/financial-aid-scholarships" },
  epgpAdm: { t: "EPGP admissions", u: "https://www.iimb.ac.in/epgp-admissions" },
  epgpBatch: { t: "EPGP welcomes the 2026–27 batch, 25 Mar 2026", u: "https://www.iimb.ac.in/epgp-welcomes-batch-2026" },
  ftMba: { t: "FT MBA 2026, 16 Feb 2026", u: "https://www.iimb.ac.in/iimb-epgp-ft-mba-rankings-2026" },
  pgpemPage: { t: "PGPEM programme page", u: "https://www.iimb.ac.in/programmes/pgpem" },
  pgpemStructure: { t: "PGPEM structure and curriculum", u: "https://www.iimb.ac.in/programmes/pgpem/structure-curriculum" },
  pgpemAdm: { t: "PGPEM admissions", u: "https://www.iimb.ac.in/admissions/pgpem-admissions" },
  pgpemBatch: { t: "PGPEM welcomes the 2026–28 batch, 4 Apr 2026", u: "https://www.iimb.ac.in/pgpemm-welcomes-batch-2026-28" },
  pgppmPage: { t: "PGPPM programme page", u: "https://www.iimb.ac.in/programmes/pgppm" },
  pgppmStructure: { t: "PGPPM programme structure", u: "https://www.iimb.ac.in/programmes/pgppm/program-structure" },
  pgppmAdm: { t: "PGPPM admissions", u: "https://www.iimb.ac.in/admissions/pgppm-admissions" },
  phdPage: { t: "Doctoral programme page", u: "https://www.iimb.ac.in/programmes/doctoral-programme" },
  phdFaq: { t: "Doctoral programme FAQs", u: "https://www.iimb.ac.in/programmes/doctoral-programme/faqs" },
  phdAlumni: { t: "Doctoral programme alumni", u: "https://www.iimb.ac.in/programmes/doctoral-programme/alumni" },
  predocPage: { t: "NSR Pre-doc programme page", u: "https://www.iimb.ac.in/programmes/nsrpredoc" },
  predocBatch: { t: "NSR Pre-doc 2026 batch profile", u: "https://www.iimb.ac.in/programmes/nsrpredoc/batch-profile" },
  ugHome: { t: "IIMB – Dorabji Tata School of Undergraduate Studies", u: "https://ug.iimb.ac.in/" },
  ugDS: { t: "BSc Honours – Data Sciences", u: "https://ug.iimb.ac.in/programmes/bsc-honours-data-sciences/" },
  ugEcon: { t: "BSc Honours – Economics", u: "https://ug.iimb.ac.in/programmes/bsc-economics/" },
  ugAdm: { t: "UG Admissions 2027", u: "https://ug.iimb.ac.in/ug-admissions-2027" },
  eep: { t: "Executive Education, IIM Bangalore", u: "https://eep.iimb.ac.in/" },
  eepFaq: { t: "Executive Education FAQs", u: "https://eep.iimb.ac.in/faqs/" },
  dbe: { t: "BBA in Digital Business and Entrepreneurship", u: "https://dbe.iimb.ac.in/" },
  dbeAdm: { t: "BBA (DBE) admission process document 2026–29 (PDF)", u: "https://dbe.iimb.ac.in/wp-content/uploads/2026/04/Admission-Process-document-2026-29.pdf" },
  dbeFaq: { t: "BBA DBE FAQs", u: "https://dbe.iimb.ac.in/faqs/" },
});

/* Rankings, one record per published result. prog: which programme it describes (null = the Institute). */
IIMB.rankCards = [
  { id: "qs-wur", n: 52, pre: "Global", scope: "Only one of two Indian B-schools featured", what: "QS World University Rankings 2026", prog: null, by: "QS", year: 2026, src: "liveHome", feature: true },
  { id: "ft-mim", n: 21, scope: "in the world · #1 in India", what: "Masters in Management", prog: "pgp", by: "Financial Times", year: 2026, src: "ftMim" },
  { id: "qs-mim", n: 31, scope: "in the world · #1 in India", what: "Master’s in Management", prog: "pgp", by: "QS", year: 2027, src: "qs" },
  { id: "qs-mba-ba", n: 60, scope: "in the world · #1 in India", what: "Master’s in Business Analytics", prog: "pgpba", by: "QS", year: 2027, src: "qs" },
  { id: "ft-mba", n: 34, scope: "in the world · #3 in India", what: "Global MBA", prog: "epgp", by: "Financial Times", year: 2026, src: "ftMba" },
  { id: "qs-gmba", n: 64, scope: "in the world · #8 in Asia-Pacific · #1 in India", what: "Global MBA", prog: "epgp", by: "QS", year: 2027, src: "qs" },
  { id: "bloomberg", n: 2, scope: "in Asia-Pacific", what: "Best Business Schools", prog: "epgp", by: "Bloomberg Businessweek", year: 2026, src: "bloomberg" },
  { id: "ft-emba", n: 64, scope: "in the world · #2 in India · global top 10 for salary increase", what: "Executive MBA", prog: "pgpem", by: "Financial Times", year: 2026, src: "ftEmba" },
  { id: "ft-cases", n: 11, scope: "in the world · #1 in India", what: "Impact of teaching cases", prog: null, by: "Financial Times", year: 2026, src: "ftCases" },
  { id: "ft-ee-custom", n: 46, scope: "in the world · #2 in India", what: "Executive Education, Custom", prog: "executive-education", by: "Financial Times", year: 2025, src: "eep" },
  { id: "ft-ee-open", n: 51, scope: "in the world · #2 in India", what: "Executive Education, Open", prog: "executive-education", by: "Financial Times", year: 2025, src: "eep" },
];

IIMB.progDetail = {
  pgp: {
    hero: "hr-pgp-batch",
    facts: [{ v: "540", l: "students in the 2026 batch" }, { v: "6", l: "trimesters over two years" }, { v: "40%", l: "of the batch spends a term on exchange" }, { v: "664", l: "final and lateral offers, Class of 2026" }],
    overview: [
      "The Post Graduate Programme in Management (PGP) is a master’s level programme, leading to the grant of a degree of Master of Business Administration (MBA). The two-year full-time residential programme is designed to equip students to take on leadership roles in an increasingly complex and dynamic global scenario. It lasts six trimesters, spread over two years, with a summer project intermediary.",
      "IIMB benchmarks its curriculum against the best in the world. The course content and design are inspired by management practices backed by a strong fundamental framework, with an orientation towards contemporary and emerging management issues. The programme revolves around the principle that business leaders are not mass-produced; they are nurtured and developed with care.",
      "The PGP has nurtured some of the brightest young minds of India for more than 40 years. Alumni have distinguished themselves across the world in consulting, finance and investment banking, sales and marketing, and many run their own ventures.",
    ],
    highlights: [
      { t: "The IIMB Edge", d: "Curricula, teaching methods, exposure to industry practice and experiential learning built around the distinctive challenges of managing in a global context." },
      { t: "Faculty", d: "A 140-plus group of researchers, academicians and practitioners from universities and industries worldwide, generating knowledge through research and consulting." },
      { t: "Centres of Excellence", d: "Multi-disciplinary centres in capital markets, corporate governance, entrepreneurship, public policy, supply chain management and more." },
      { t: "Self-governance", d: "Clubs, social projects, action-oriented courses and student self-governance initiatives that develop critical thinking and leadership." },
    ],
    chair: { id: "manaswini-bhalla", msg: ["The Post Graduate Programme in Management (PGP) is one of our flagship programmes. It has a rigorous curriculum which is taught by world-class faculty. The programme provides you with global exposure and helps you develop an entrepreneurial mindset.", "At IIM Bangalore while we pursue the highest levels of academic rigour, integrity and ethical behaviour, we give equal importance to the virtues of empathy and collaboration."], src: "pgpPage" },
    profile: {
      title: "Current batch profile, 2026", src: "pgpPage",
      tiles: [{ v: "540", l: "students" }, { v: "42%", l: "women (229 of 540)" }, { v: "85%", l: "have work experience" }, { v: "20", l: "hold CA, CS or ICWA" }],
      gender: { f: 229, m: 311 },
      groups: [
        { t: "Bachelor’s discipline", rows: [["Engineering", 360], ["Commerce", 97], ["Science", 39], ["Arts / Humanities", 38], ["Law", 3], ["Others", 3]] },
        { t: "Work experience (months)", rows: [["None", 82], ["1–12", 53], ["13–24", 133], ["25–36", 153], ["37–48", 84], ["Above 48", 35]] },
        { t: "Age", rows: [["19–22", 41], ["23–25", 268], ["26–28", 209], ["Above 28", 22]] },
      ],
      gmat: { label: "GMAT, international candidates", low: 650, high: 770, avg: 713, median: 700 },
    },
    structure: {
      src: "pgpStructure",
      intro: ["The programme offers core and elective courses. In the first year a PGP student takes seventeen core courses and two electives, totalling 51 credits, across three terms. Courses are delivered through lectures, case analyses, industry interactions, projects, simulations, business games and experiential methods."],
      terms: [
        { t: "Term I", items: ["Accounting for Decisions", "Strategic Business Communication", "Marketing Management", "Managerial Economics", "Organization Design", "Decision Sciences I"] },
        { t: "Term II", items: ["Corporate Finance", "Managing People & Performance in Organizations", "Operations Management", "Decision Sciences II", "Competition & Strategy"] },
        { t: "Term III", items: ["Business, Government and Society: Ethics and Responsible Business", "Managing Digital Business", "Entrepreneurial Mindset and Action", "Macroeconomics", "Responsible Business and Sustainability", "Two electives"] },
      ],
      blocks: [
        { t: "Summer internship", d: "Between the first and second years. Optional for students with at least 34 months of work experience before joining." },
        { t: "Second year", d: "Between 45 and 51 credits of electives over three terms, chosen through a bidding system." },
        { t: "Beyond the classroom", d: "Language courses (German, French, Spanish, Japanese), international immersions such as Business Planning in International Markets (Switzerland, Japan, Dubai), and experiential courses such as the Himalayan Mountain Challenge." },
      ],
      electives: { intro: "IIMB offers the largest number of elective courses among B-schools in India, across:", areas: ["Decision Sciences", "Economics", "Entrepreneurship", "Finance and Accounting", "Information Systems", "Management Communication", "Marketing", "Organisational Behaviour & HRM", "Production and Operations Management", "Public Policy", "Strategy", "Interdisciplinary courses"] },
    },
    global: {
      img: "hr-exchange", src: "pgpExchange",
      intro: "IIMB has an extensive International Student Exchange Network. Nearly 40% of the batch spends a term at a partner institute, and students who stay benefit from the many overseas students who spend a term at IIMB.",
      items: [
        { t: "Exchange term", d: "Term V abroad, with at least 120 contact hours of post-graduate courses (12–15 credits)." },
        { t: "Dual degrees", d: "Bocconi University (Italy), ESCP Business School (France), KEDGE Business School (France) and Hitotsubashi University Business School (Japan). Selected students study the second year at the partner school." },
        { t: "GNAM", d: "IIMB is a member of the Global Network for Advanced Management." },
      ],
    },
    careers: {
      kind: "mba", img: "hr-recruiters",
      blocks: [
        { t: "Final & lateral placements, Class of 2026", src: "finals2026", tiles: [{ v: "664", l: "offers (a record)" }, { v: "596", l: "students in the process" }, { v: "177", l: "firms" }, { v: "35%", l: "new recruiters" }],
          bars: [["Management consulting", 45], ["Technology / product management", 15], ["Investment banking", 11]], barsNote: "Share of total offers, %",
          recruiters: ["Accenture (101)", "Boston Consulting Group (29)", "Bain & Company (23)", "EY-Parthenon (23)", "American Express (15)", "Kearney (13)", "Tata Consultancy Services (11)"] },
        { t: "Summer placements, 2025–27 cohort", src: "summers2026", tiles: [{ v: "601", l: "students, all with offers" }, { v: "137", l: "organisations" }, { v: "46%", l: "consulting offers, a record" }, { v: "30%", l: "first-time recruiters" }],
          bars: [["Consulting", 282], ["Finance, banking, investments", 86], ["E-commerce, payments, telecom", 55], ["IT, analytics, product management", 52], ["FMCG / retail", 45], ["Manufacturing, energy, infrastructure", 29]], barsNote: "Offers by sector" },
      ],
      note: "Figures for the PGP and PGPBA together, as published by IIMB.", report: "placementReport",
    },
    fees: {
      src: "pgpAid",
      rows: [["Fees for two years (PGP 2026–28, domestic)", "Rs 26,00,000"], ["Caution deposit, one time", "Rs 30,000"], ["Mess advance, each term", "Rs 30,000"]],
      notes: ["Fees cover tuition, library, internet, case permission royalty, course material, hostel room rent and service charge, medical and personal accident insurance, and alumni activity. Taxes, where applicable, are extra.", "On-campus accommodation is provided; students may live off campus in the second year."],
      aid: "IIMB’s financial aid policy aims to ensure no student is deprived of an education at the Institute for financial reasons. All PGP students with annual household income below INR 8,00,000 are eligible to apply; aid of 100%, 80%, 60%, 40% or 20% is awarded after a financial status score and a faculty interaction.",
      scholarships: [["Aditya Birla Scholarship", "Merit-based, INR 1.75 lakh per student, first and second year."], ["OPJEMS Scholarship", "Merit-based, INR 1.50 lakh, second year."], ["NTPC Scholarship Scheme", "INR 48,000 a year for SC/ST/PwD students in the second year."], ["Employment in Social Sector Scholarship", "Reimburses one-third of the fees for each of the first three years worked in the social sector."], ["Government of India scholarships", "National scholarships for ST and SC students (Ministry of Tribal Affairs; Ministry of Social Justice and Empowerment)."]],
    },
    contact: [["Admissions office", "pgpadm@iimb.ac.in", "+91-80-2699 3013 / 3017"], ["PGP programme office", "pgpoffice@iimb.ac.in", "+91-80-2699 3036"]],
  },

  pgpba: {
    hero: "hr-pgpba-class",
    facts: [{ v: "77", l: "students in the 2026 batch" }, { v: "51", l: "first-year credits, all core" }, { v: "#60", l: "QS Business Analytics 2027" }, { v: "6", l: "trimesters over two years" }],
    overview: [
      "The Post Graduate Programme in Business Analytics (PGPBA) is a masters level programme, leading to the grant of a degree of Master of Business Administration in Business Analytics. The two-year, full-time, residential programme is designed to equip students to take on leadership roles in using analytics and artificial intelligence to solve increasingly complex problems. It lasts six trimesters, spread over two years, with a summer project intermediary.",
      "The first year has intensive coursework with emphasis on analytical and mathematical skills, followed by an eight-week summer internship. In the second year students choose from a variety of electives, can opt for an exchange term at select international business schools, and are encouraged to take analytics electives across the domains of management.",
    ],
    chair: { id: "manaswini-bhalla", msg: ["The Post Graduate Programme in Business Analytics (PGPBA) is a programme built to develop future leaders with an analytical mindset and an understanding of the latest methodologies in analytics, allowing them to apply their learning across various functional areas of management."], src: "pgpbaPage" },
    profile: {
      title: "Current batch profile, 2026", src: "pgpbaPage",
      tiles: [{ v: "77", l: "students" }, { v: "34%", l: "women (26 of 77)" }, { v: "84%", l: "have work experience" }, { v: "78%", l: "engineering graduates" }],
      gender: { f: 26, m: 51 },
      groups: [
        { t: "Bachelor’s discipline", rows: [["Engineering", 60], ["Science", 8], ["Management", 5], ["Commerce", 3], ["Others", 1]] },
        { t: "Work experience (months)", rows: [["None", 12], ["Under 13", 5], ["13–24", 16], ["25–36", 27], ["37–48", 14], ["Above 48", 3]] },
        { t: "Age", rows: [["19–22", 14], ["23–25", 47], ["26–28", 16]] },
      ],
    },
    structure: {
      src: "pgpbaStructure",
      intro: ["In the first year a PGPBA student takes eighteen core courses (51 credits) over three terms. In the second year, four analytics cores in Term IV and at least four analytics field electives, with 45 to 51 credits in all."],
      terms: [
        { t: "Term I · 18 credits", items: ["Accounting for Decisions", "Strategic Business Communication", "Marketing Management", "Managerial Economics", "Organization Design", "Decision Sciences I"] },
        { t: "Term II · 15 credits", items: ["Corporate Finance", "Managing People and Performance in Organizations", "Operations Management", "Decision Sciences II", "Competition & Strategy"] },
        { t: "Term III · 18 credits", items: ["Business, Government and Society: Ethics and Responsible Business", "Introduction to Computing", "Time Series and Forecasting Techniques", "Introduction to Machine Learning", "Macroeconomics", "Entrepreneurial Mindset and Action", "Responsible Business and Sustainability"] },
        { t: "Term IV · analytics core", items: ["Optimization", "Predictive and Generative AI", "Multivariate Data Analysis", "Big Data Analytics and NLP", "Field or free electives"] },
      ],
      blocks: [
        { t: "Summer internship", d: "With a firm in the analytics domain, between the two years. Optional for students with at least 34 months of prior work experience." },
        { t: "Field electives", d: "At least four analytics electives (12 credits) across Terms IV to VI; the rest from analytics or general management." },
      ],
    },
    global: { img: "hr-exchange", src: "pgpExchange", intro: "PGPBA students can opt for an exchange term at select international business schools in the second year, through IIMB’s International Student Exchange Network.", items: [] },
    careers: { kind: "shared", note: "PGPBA students take part in the same placement process as the PGP; see the PGP page for the 2026 results.", link: "pgp", report: "placementReport" },
    fees: {
      src: "pgpbaAid",
      rows: [["Fees for two years (PGPBA 2026–28, domestic)", "Rs 26,00,000"], ["Caution deposit, one time", "Rs 30,000"]],
      aid: "All PGPBA students with annual household income below INR 6,00,000 are eligible to apply for financial aid; aid of 100%, 80%, 60%, 40% or 20% is awarded after a financial status score and a faculty interaction.",
    },
    contact: [["Admissions office", "pgpadm@iimb.ac.in", "+91-80-2699 3013 / 3017"]],
  },

  epgp: {
    hero: "hr-epgp-batch",
    facts: [{ v: "75", l: "students in the 2026–27 batch" }, { v: "6.8 yrs", l: "average work experience" }, { v: "100+", l: "electives" }, { v: "#34", l: "FT Global MBA 2026" }],
    overview: [
      "The full-time Executive Post Graduate Programme in Management (EPGP) is an intensive one-year residential MBA for professionals with a minimum of five years of work experience. It enhances the skills and capabilities of the participants, and prepares them for senior management roles. A diverse cohort, rich in experience, is a key strength of the programme.",
      "Now in its 15th year, the programme has over one thousand graduates, many of whom hold senior leadership positions worldwide in IT, banking, consulting, FMCG and retail.",
    ],
    highlights: [
      { t: "Global footprint", d: "An international immersion module equips you to excel in India and abroad." },
      { t: "Electives", d: "More than 100 electives for customised learning in emerging fields." },
      { t: "Location", d: "India’s tech and start-up hub, where Fortune 500 companies abound." },
      { t: "World-class faculty", d: "Academics who combine research rigour with industry experience." },
      { t: "Global networks", d: "Membership of GNAM, 32 leading business schools, opens classrooms across the world." },
      { t: "Peer cohort", d: "Professionals from diverse sectors who arrive with a spirit of inquiry." },
    ],
    chair: { id: "amar-sapra", msg: ["The programme’s strength lies in its rigorous and flexible curriculum, combining core courses with over 100 electives to choose from.", "Another distinguishing feature is the two-week international immersion. IIMB was a pioneer in India in including such a module; the immersion is ranked first in India and seventh worldwide, according to the Financial Times in 2024."], src: "epgpPage" },
    profile: {
      title: "Batch profile, 2026–27", src: "epgpBatch",
      tiles: [{ v: "75", l: "students" }, { v: "28%", l: "women" }, { v: "29", l: "average age" }, { v: "12%", l: "significant international work experience" }],
      gender: { f: 21, m: 53, note: "Gender split as published on the programme page (74 at the time)." },
      groups: [
        { t: "Industry", rows: [["Manufacturing", 13], ["IT products", 10], ["Banks / finance", 8], ["IT services", 8], ["Oil / energy", 8], ["FMCG", 4], ["Others", 23]] },
        { t: "Bachelor’s discipline", rows: [["Engineering", 56], ["Commerce", 12], ["Science & Arts", 3], ["Others", 3]] },
      ],
      gmat: { label: "GMAT, 2025", low: 650, high: 770, avg: 704 },
      extra: "Highest work experience 13 years; average 6.8 years (programme chair, March 2026).",
    },
    structure: {
      src: "epgpStructure",
      intro: ["An accelerated MBA: two years of learning in one, over five terms with an international immersion in Term III."],
      terms: [
        { t: "Term I", items: ["Financial Reporting and Analysis", "Competition and Strategy", "Designing Organizations", "Decision Sciences", "Managerial Economics", "Entrepreneurial Management"] },
        { t: "Term II", items: ["Managing People and Performance in Organizations", "Marketing Management", "Macroeconomics", "Operations Management", "Corporate Finance", "Corporate Governance and Ethics", "Business Law"] },
        { t: "Term III", items: ["International immersion, 17–29 August 2026"] },
        { t: "Terms IV and V", items: ["Electives from the largest elective portfolio among Indian B-schools", "Workshop courses, 30 Nov – 12 Dec 2026"] },
      ],
    },
    global: {
      img: "hr-epgp-paris", src: "epgpImmersion",
      intro: "Pioneered in India for the one-year MBA by IIM Bangalore, the International Immersion takes students to partner schools in Term III to learn about a globalised economic environment.",
      items: [
        { t: "Immersion 2026", d: "Cohorts travelled to ESCP Business School (Berlin and Madrid), Solvay Brussels School of Economics and Management, WHU – Otto Beisheim School of Management, and ESSEC Business School in Paris." },
        { t: "Ranked by the FT", d: "First in India and seventh worldwide for the immersion (Financial Times, 2024)." },
      ],
    },
    careers: {
      kind: "series", src: "epgpPlacement", img: "hr-epgp-group",
      intro: "Placements begin with pre-placement talks, then resume submission through the Career Development Services portal, shortlists and on- and off-campus interviews, typically from November over several months.",
      years: ["2026", "2025", "2024", "2023", "2022"],
      series: [{ t: "Mean salary, ₹ lakh", v: [36.5, 33.1, 34.33, 33.07, 31.63] }, { t: "Median salary, ₹ lakh", v: [37.1, 35.5, 33, 32.21, 30] }],
      people: { t: "Students in the process / with offers", v: [[66, 66], [72, 72], [72, 70], [70, 70], [72, 72]] },
      firms: { t: "Companies making offers", v: [25, 31, 29, 27, 26] },
      note: "Values as charted on the EPGP placements page.",
    },
    fees: {
      src: "epgpFees",
      rows: [["Tuition fee", "₹26,50,000"], ["Accommodation (hostel)", "₹80,000"], ["International immersion (indicative)", "₹5,50,000"], ["Refundable deposit", "₹25,000 / ₹20,000 without accommodation"], ["Hostel mess", "₹63,000"], ["Total, with accommodation", "₹33,68,000"], ["Total, without accommodation", "₹32,20,000"]],
      notes: ["2026–27 fees. Tuition covers tuition, course material, computing and networking, library, alumni association, student activities and career counselling. The immersion fee is restricted to actual expenditure."],
      scholarships: [["Merit Scholarship (admissions)", "₹8,00,000 tuition waiver to top rank holders in each round; 12 scholarships."], ["Merit-cum-Means Scholarship", "₹6,00,000 to select diversity group students (women, under-represented social groups, non-engineering backgrounds); 7 scholarships."], ["Merit Scholarship (during the programme)", "₹4,00,000 to the top five students by CGPA after Term II, if not already on a scholarship."]],
    },
    eligibility: ["A Bachelor’s degree in any discipline with at least 50% marks or equivalent CGPA (45% for SC, ST and PwD).", "At least five years of full-time work experience as of 31 March 2027, after the Bachelor’s degree. Sponsored candidates are welcome.", "A valid GMAT or GRE score; online (at-home) scores are not accepted for EPGP 2027."],
    eligibilitySrc: "epgpAdm",
    contact: [["Admissions", "epgpadm@iimb.ac.in", "+91-80-2658 1340 / 2699 3013 / 3017"]],
  },

  pgpem: {
    hero: "hr-pgpem-batch",
    facts: [{ v: "79", l: "students in the 2026–28 batch" }, { v: "750", l: "contact hours to complete" }, { v: "1998", l: "programme launched" }, { v: "102%", l: "alumni salary increase (FT EMBA 2026)" }],
    overview: [
      "The PGPEM is designed for working mid-level and senior executives with a minimum of six years of work experience after graduation. Launched in 1998, the programme is rigorous and scheduled on weekends to make it accessible to those who do not want to leave their jobs while pursuing a master’s degree.",
      "Students get a strong grounding in general management through the core courses in the first year and a rich choice of electives in the second, including electives from the other degree programmes at IIMB. The PGPEM also offers full-term exchanges with IIMB’s international partner institutions, and its graduates are part of the IIMB Alumni Association.",
    ],
    chair: { id: "ashis-mishra", msg: ["The Post Graduate Program in Enterprise Management (PGPEM) is a comprehensive and rigorous management program designed for working professionals to enhance their managerial skills and advance their careers without interrupting their work commitments.", "PGPEM programs usually span 2 years (minimum) to 5 years (maximum), depending on the flexibility desired by the students."], src: "pgpemPage" },
    profile: { title: "Batch of 2026–28", src: "pgpemBatch", tiles: [{ v: "79", l: "students inaugurated on 4 April 2026" }, { v: "6+ yrs", l: "minimum work experience after graduation" }] },
    structure: {
      src: "pgpemStructure",
      intro: ["Four terms of three months each in an academic year. PGPEM courses run on Fridays and Saturdays; in the second year, students with flexible schedules may also take electives from the other post graduate programmes, Monday to Saturday. Each student completes 750 contact hours within a maximum of five academic years."],
      terms: [
        { t: "Term 1", items: ["Managerial Economics", "Designing Organizations", "Decision Sciences"] },
        { t: "Term 2", items: ["Financial Reporting & Analysis", "Marketing Management", "Managing People & Performance in Organizations"] },
        { t: "Term 3", items: ["Microeconomics", "Business Law", "Corporate Finance"] },
        { t: "Term 4", items: ["Operations Management", "Competition and Strategy", "Cost Management", "Corporate Governance & Ethics"] },
      ],
      blocks: [
        { t: "Live projects", d: "A three-credit project on a conceptual problem or an industry analysis, to specialise where no formal elective is offered." },
        { t: "Action Learning Project", d: "A turnkey project from within the student’s own company, analysed with recommendations." },
      ],
    },
    eligibility: ["At least six years of work experience after graduation.", "Applicants who completed CA/ICWA/CS after Class XII, without a Bachelor’s degree, are also eligible for PGPEM 2027.", "Online (at-home) GMAT/GRE scores are not applicable for the PGPEM 2027 batch."],
    eligibilitySrc: "pgpemAdm",
    contact: [["Admissions", "pgpemadm@iimb.ac.in", "+91-80-2699 3013 / 3017"]],
  },

  pgppm: {
    hero: "hr-pgppm-class",
    facts: [{ v: "14", l: "months, hybrid" }, { v: "31", l: "participants, 2026 cohort" }, { v: "2002", l: "first launched" }, { v: "17 wks", l: "on campus (Modules 3 and 6)" }],
    overview: [
      "The Post Graduate Programme in Public Policy and Management (PGPPM), launched by IIMB, is a ‘one-of-its-kind’ programme aimed at improving efficiency and leadership skills among policymakers and administrators while exposing them to topical issues in management. It is a degree programme offered in a hybrid format with online and on-campus components.",
      "The redesigned PGPPM is a 14-month programme leading to a Master of Management Studies (Public Policy). Participants submit a capstone, the Integrative Policy Paper, applying classroom concepts to a policy-sensitive issue. They spend Module 3 (13 weeks) and Module 6 (4 weeks) on campus; Modules 1, 2, 4 and 5 use IIMB’s online platform so participants can learn while working.",
      "Entry is through the DoPT-sponsored route for government officers and, since 2025, through an Open route for public policy aspirants outside the DoPT ecosystem. Alumni hold senior roles in government ministries, SEBI, TRAI, the CBI, Namma Metro, Invest India, the IMF and the World Bank, and in the social sector.",
    ],
    chair: { id: "arnab-mukherji", msg: ["This programme is IIMB’s primary educational engagement in the public policy arena. Entering the third decade of operations, PGPPM brings together a unique multidisciplinary public policy exposure that blends IIMB’s rich management learning ecosystem with its strong experience in the public policy domain."], src: "pgppmPage" },
    profile: {
      title: "Current batch profile, 2026", src: "pgppmPage",
      tiles: [{ v: "31", l: "participants" }, { v: "42%", l: "women (13 of 31)" }, { v: "28", l: "from government services" }, { v: "3", l: "open-route candidates" }],
      gender: { f: 13, m: 18 },
      groups: [
        { t: "Service", rows: [["Indian Railways", 10], ["Indian Administrative Service", 4], ["Indian Revenue Service", 4], ["Indian Police Service", 2], ["Indian Statistical Service", 2], ["Indian Telecom Service", 2], ["Other central services", 4], ["Open (social sector, banking)", 3]] },
        { t: "Experience (years)", rows: [["5–10", 12], ["11–15", 12], ["16 and above", 7]] },
        { t: "Bachelor’s discipline", rows: [["Engineering", 17], ["Science", 9], ["Arts", 2], ["Others", 4]] },
      ],
    },
    structure: {
      src: "pgppmStructure",
      intro: ["Six terms moving from foundations to frameworks, colloquia and a capstone; online content is delivered through IIMBx or SWAYAM."],
      terms: [
        { t: "Term 1 · Foundations", items: ["Foundations of Data Science", "Introduction to Public Policy", "Macroeconomic Policy", "Services Marketing", "8 credits; 7 weeks online and 1 week on campus"] },
        { t: "Term 2 · Foundations", items: [] }, { t: "Term 3 · Policy frameworks", items: [] }, { t: "Terms 4–5 · Policy colloquia", items: [] }, { t: "Term 6 · Policy capstone", items: ["Integrative Policy Paper"] },
      ],
      blocks: [{ t: "Design", d: "Management of public policy, interdisciplinary and peer learning, self-study for policy specialisation, cross-learning between services and sectors, and a comprehensive policy project." }],
    },
    contact: [["Programme office", "pgppmoffice@iimb.ac.in", "080-2699 3326 / 3265"], ["Admissions", "pgppmadm@iimb.ac.in", ""]],
  },

  phd: {
    hero: "phd",
    facts: [{ v: "5", l: "years, full-time" }, { v: "PhD", l: "degree under the IIM Act, 2017" }, { v: "2", l: "years of coursework across disciplines" }],
    overview: [
      "The Doctoral Programme is a full-time PhD at IIMB, committed to training individuals who will excel in their area of research through high quality work that could lead to publications of international standard. It should not be confused with master’s level programmes such as the MBA.",
      "Students complete coursework, pass a comprehensive examination, and then do publication-quality research of an international standard. With the IIM Act, 2017, the programme leads to the degree of Doctor of Philosophy; the earlier Fellow Programme in Management was recognised as equivalent to a university PhD by the AIU and the AICTE.",
    ],
    highlights: [
      { t: "Who should apply", d: "Students and professionals who want a career in advanced research and academics, with high scholastic ability, aptitude for research and strong analytical skills." },
      { t: "No MBA required", d: "Coursework provides the grounding in management; areas welcome students from diverse backgrounds." },
      { t: "Where graduates go", d: "Mainly academic institutions; leading Indian companies, MNCs, investment banks and consulting firms also hire for research-intensive roles." },
      { t: "Research community", d: "A joint brown-bag seminar series with doctoral students of IIMA and IIMC, Institute research awards and industry scholarships." },
    ],
    chair: { id: "tarun-jain" },
    faq: [
      ["Can I complete the course part-time?", "No, it is a full-time programme."],
      ["Do I need an MBA?", "Not necessary. The coursework provides understanding of the relevant fields of management."],
      ["When can students take up outside employment?", "After a successful proposal presentation, when the final thesis defence is likely within six months; earlier employment needs a no-objection certificate from the Dissertation Advisory Committee chairperson."],
      ["Is there a placement process?", "Institutes and firms looking for researchers contact the students and the Doctoral Programme office; students can also use IIMB’s placement office."],
    ],
    faqSrc: "phdFaq",
    contact: [["Admissions", "phdadm@iimb.ac.in", ""]],
  },

  "nsr-predoc": {
    hero: "hr-predoc-steps",
    facts: [{ v: "9", l: "fellows in 2026" }, { v: "100%", l: "financial support" }, { v: "2018", l: "launched" }, { v: "10", l: "disciplinary areas" }],
    overview: [
      "The N. S. Ramaswamy Pre-doctoral Fellowship, launched in 2018, is a one-of-its-kind programme that helps participants prepare for a prestigious doctoral degree. With a focus on inclusion, it was instituted to increase the social diversity of management academia in India.",
      "Mentoring by internationally acclaimed faculty, engagement with current and former PhD scholars, guidance in writing research proposals, 100 percent financial support and student life on a Pritzker-prize winning campus. Fellows develop a research topic, learn data collection methods and plan a viable doctoral proposal.",
    ],
    highlights: [
      { t: "A faculty mentor", d: "Each fellow is assigned a full-time IIMB faculty mentor and works at least 40 hours a week under their supervision." },
      { t: "Coursework", d: "At least two doctoral or MBA-level three-credit courses approved by the mentor, plus the PhD preparatory programme." },
      { t: "Math and writing", d: "A math clinic and a writing workshop, 1.5 hours a week each, unless waived." },
      { t: "First cohort", d: "Seven fellows in 2018–19 received their certificates on 27 March 2019." },
    ],
    chair: { id: "anil-b-suraj" },
    profile: {
      title: "Batch profile, 2026", src: "predocBatch",
      tiles: [{ v: "9", l: "fellows" }, { v: "5", l: "women" }, { v: "8", l: "areas represented" }],
      gender: { f: 5, m: 4 },
      groups: [
        { t: "Area", rows: [["OB & HRM", 2], ["Economics", 1], ["Decision Sciences", 1], ["Information Systems", 1], ["Marketing", 1], ["Public Policy", 1], ["Finance & Accounting", 1], ["Strategy", 1]] },
        { t: "Bachelor’s discipline", rows: [["Commerce", 3], ["Economics", 2], ["Engineering", 1], ["Psychology", 1], ["Science", 1], ["Social science", 1]] },
        { t: "Master’s discipline", rows: [["Economics", 2], ["MBA", 2], ["Science", 2], ["Commerce", 1], ["Development studies", 1], ["Psychology", 1]] },
      ],
    },
    areas: ["Decision Sciences", "Economics", "Entrepreneurship", "Finance & Accounting", "Information Systems", "Marketing", "Organizational Behaviour & HRM", "Production & Operations Management", "Public Policy", "Strategy"],
    contact: [["Admissions", "predoc@iimb.ac.in", "+91-80-2699 3013 / 17"]],
  },

  "bsc-data-sciences": {
    hero: "ug-students-1",
    facts: [{ v: "4", l: "years, full-time residential" }, { v: "40", l: "seats in the programme" }, { v: "80", l: "students in the first UG cohort" }, { v: "12,000", l: "applications for the first cohort" }],
    overview: [
      "A full-time undergraduate Data Sciences programme (with an Economics minor), the degree blends rigorous training in stochastic processes, algorithms, data structures and psychology with applied business learning. The curriculum prioritises analytical depth, contextual thinking and professional readiness through internships, global exposure and life-skill development.",
      "It is offered at the IIMB – Dorabji Tata School of Undergraduate Studies, whose small batches enable focused learning, close faculty interaction and personalised academic engagement, with faculty-guided research, industry projects and access to IIM Bangalore’s alumni community.",
    ],
    structure: {
      src: "ugDS", intro: ["Eight semesters; the plan below is tentative and subject to revision."],
      terms: [
        { t: "Semesters I–II", items: ["Algorithmic Thinking & Programming 1 and 2", "Probability & Statistics 1 and 2", "Linear Algebra", "Calculus; Multivariable Calculus", "Data Structures, Numerical Methods and Algorithms", "Professional Communication; Technical Writing; Digital Literacy; Critical Thinking"] },
        { t: "Semesters III–IV", items: ["Foundations of Statistical Learning", "Machine Learning", "Optimization", "Modelling Dynamic Systems", "Econometrics 1 and 2", "Microeconomics 1", "Foundations of Management 1"] },
        { t: "Semesters V–VI", items: ["Time Series and Forecasting", "Reinforcement Learning, Deep Learning", "Gen AI and Agentic AI", "Quantitative / Corporate Finance", "Prescriptive Analytics", "Game Theory; Behavioural Economics", "Human Behaviour & Psychology"] },
        { t: "Semesters VII–VIII", items: ["Internship or thesis", "Sampling Design and Design of Experiments / Capstone", "Nonlinear and Dynamic Programming / Capstone", "Building New Ventures", "Managerial Decision Making", "International Relations / Geopolitics"] },
      ],
    },
    eligibility: ["A pass in Class XII or equivalent from a recognised board.", "Mathematics in Class X with a minimum of 60% marks.", "Qualifying the IIMB Undergraduate Admission Test and a personal interview."],
    eligibilitySrc: "ugDS",
    dates: [{ l: "Application window, domestic", v: "17 Aug – 17 Oct 2026 (closed)" }, { l: "UG Admission Test", v: "15 Nov 2026 (tentative)" }, { l: "International applications", v: "9 Oct – 10 Dec 2026, 5 pm IST" }, { l: "Interviews", v: "2nd and 3rd week of January 2027 (tentative)" }, { l: "Offers and waitlist", v: "3rd week of February 2027 (tentative)" }],
    datesSrc: "ugAdm",
    contact: [["UG admissions", "ugadmissions@iimb.ac.in", ""]],
  },

  "bsc-economics": {
    hero: "ug-students-2",
    facts: [{ v: "4", l: "years, full-time residential" }, { v: "40", l: "seats in the programme" }, { v: "80", l: "students in the first UG cohort" }, { v: "20", l: "states in the first cohort" }],
    overview: [
      "A full-time undergraduate Economics programme (with a Data Sciences minor), the degree combines economic theory with statistical inference, econometrics and behavioural insights, underpinned by data mining and applied business learning. The curriculum prioritises analytical depth, contextual thinking and professional readiness through internships, global exposure and life-skill development.",
      "It is offered at the IIMB – Dorabji Tata School of Undergraduate Studies, which integrates economics and data sciences with emerging fields such as artificial intelligence, algorithmic design and Indian Knowledge Systems.",
    ],
    structure: {
      src: "ugEcon", intro: ["Eight semesters, with a major in Economics and a minor in Data Sciences; the plan is tentative and subject to revision."],
      terms: [
        { t: "Semesters I–II", items: ["Algorithmic Thinking & Programming 1 and 2", "Probability and Statistics", "Linear Algebra", "Foundations in economics and quantitative methods"] },
        { t: "Semesters III–IV", items: ["Stochastic Processes", "Data Structures", "Machine Learning", "Econometrics and economic theory"] },
        { t: "Semesters V–VI", items: ["Time Series and Forecasting", "Foundations of AI", "Applied economics and policy"] },
        { t: "Semesters VII–VIII", items: ["Internship or thesis", "Advanced Econometrics", "Capstone and electives"] },
      ],
    },
    eligibility: ["A pass in Class XII or equivalent from a recognised board.", "Mathematics in Class X with a minimum of 60% marks.", "Qualifying the IIMB Undergraduate Admission Test and a personal interview."],
    eligibilitySrc: "ugEcon",
    dates: [{ l: "Application window, domestic", v: "17 Aug – 17 Oct 2026 (closed)" }, { l: "UG Admission Test", v: "15 Nov 2026 (tentative)" }, { l: "International applications", v: "9 Oct – 10 Dec 2026, 5 pm IST" }, { l: "Interviews", v: "2nd and 3rd week of January 2027 (tentative)" }, { l: "Offers and waitlist", v: "3rd week of February 2027 (tentative)" }],
    datesSrc: "ugAdm",
    contact: [["UG admissions", "ugadmissions@iimb.ac.in", ""]],
  },

  "bba-dbe": {
    hero: "main-block",
    facts: [{ v: "3", l: "years, fully online (up to 6 to complete)" }, { v: "135", l: "credits, 45 a year over three terms" }, { v: "₹4.5 lakh", l: "total tuition over three years" }, { v: "50%", l: "fee waiver for SC, ST and PwD students" }],
    overview: [
      "An online, innovative, market-aligned three-year degree programme to equip future leaders for the digital economy, leading to a Bachelor of Business Administration in Digital Business and Entrepreneurship.",
      "Each academic year carries 45 credits across three terms. Students who stop early leave with a Certificate after the first year or a Diploma after the second; the degree is awarded on completing 135 credits, within a minimum of three and a maximum of six years.",
    ],
    highlights: [
      { t: "Year 1 · Certificate", d: "45 credits across three terms." },
      { t: "Year 2 · Diploma", d: "A further 45 credits." },
      { t: "Year 3 · Degree", d: "The BBA (DBE) on completing 135 credits." },
    ],
    chair: { id: "suresh-bhagavatula" },
    fees: {
      src: "dbeAdm",
      rows: [["Tuition, Year 1", "₹1,25,000"], ["Tuition, Year 2", "₹1,50,000"], ["Tuition, Year 3", "₹1,75,000"], ["Total tuition", "₹4,50,000"], ["Application fee", "₹3,000 (₹1,500 for SC, ST, PwD)"]],
      notes: ["Fees are paid term-wise. SC, ST and PwD students receive a 50% fee waiver. The application fee is non-refundable."],
    },
    eligibility: ["Open to Indian nationals.", "Class 10 pass with Mathematics as a compulsory subject.", "At least 60% (or equivalent CGPA) in Class 12; 55% for SC, ST and PwD candidates.", "Admission through the IIMB DBE Entrance Test; the 2026 admission document also accepts CUET (UG) 2024–2026 General Test scores. Meeting the minimum criteria does not guarantee admission."],
    eligibilitySrc: "dbeAdm",
    dates: [{ l: "Applications, 2026 cycle", v: "13 April – 30 June 2026 (3 pm)" }, { l: "IIMB DBE Entrance Test", v: "26 July 2026" }, { l: "Results", v: "August 2026 (expected)" }],
    datesSrc: "dbeAdm",
    faqSrc: "dbeFaq",
  },

  "executive-education": {
    hero: "hr-ee-avenue",
    facts: [{ v: "#46", l: "FT Executive Education, Custom 2025" }, { v: "#51", l: "FT Executive Education, Open 2025" }, { v: "25,000+", l: "alumni across 16 chapters" }, { v: "43", l: "open programmes in the next four months" }],
    overview: [
      "IIM Bangalore’s executive education spans short-duration, long-duration and custom programmes for working professionals and organisations, taught on the Bannerghatta Road campus and online.",
    ],
    highlights: [
      { t: "Short-duration programmes", d: "Strategy, leadership, functional skills, HR, technology, analytics, operations and innovation, typically three to six days, for executives building skills in a specific area." },
      { t: "Long-duration programmes", d: "General management and sectoral programmes for IT, healthcare, aerospace and aviation, media and entertainment, public policy, digital transformation and business analytics, longer than 15 days." },
      { t: "Custom programmes", d: "Tailored for corporates, government, international organisations and institutions; short or long, on campus, MOOC-based or hybrid." },
    ],
    upcoming: { src: "eep", rows: [["Advanced Programme in Quantitative Finance (APQF1)", "2 Nov 2026", "11 months"], ["General Management Programme for Healthcare Executives, Batch 9", "6 Nov 2026", "10 months"], ["Digital Supply Chains: From Strategy to Execution", "16 Nov 2026", "5 days"], ["Executive Programme in Luxury Fashion & Lifestyle Leadership, Batch 1", "16 Nov 2026", "5 months"], ["Finance for Non-Finance Managers, Batch 6", "18 Nov 2026", "6 months"], ["CEO Excellence Programme", "19 Nov 2026", "3 days"], ["Independent Directors Certificate Programme, Batch 10", "21 Nov 2026", "6 months"], ["ESG, Climate Change, and Building Future Ready Organizations, Batch 3", "25 Nov 2026", "4 days"]] },
    chair: { id: "sushanta-kumar-mishra" },
  },
};
/* Each programme's own news, achievements and official films, from its iimb.ac.in page (26 Oct 2026) */
IIMB.progMedia = {
 "epgp": {
  "news": [
   {
    "t": "EPGP clinches #2 rank in APAC: Bloomberg B-School Rankings 2026",
    "u": "https://www.iimb.ac.in/epgp-2nd-rank-apac-bloomberg-b-school-rankings-2026",
    "img": "assets/img/news-prog/epgp-bloomberg2026.jpg"
   },
   {
    "t": "IIM Bangalore welcomes 75 students to the 2026-27 batch of Executive Post Graduate Programme in Management",
    "u": "https://www.iimb.ac.in/epgp-welcomes-batch-2026",
    "img": "assets/img/news-prog/epgp-batch2026.jpg"
   },
   {
    "t": "IIM Bangalore’s EPGP soars to #34 in FT MBA Rankings 2026",
    "u": "https://www.iimb.ac.in/iimb-epgp-ft-mba-rankings-2026",
    "img": "assets/img/news-prog/main-gate.jpg"
   },
   {
    "t": "IIM Bangalore continues to rank among Asia’s top 3 in Bloomberg B-school Rankings 2025–26",
    "u": "https://www.iimb.ac.in/iimb-bloomberg-b-school-rankings-2025",
    "img": "assets/img/news-prog/main-gate.jpg"
   },
   {
    "t": "“You adjusted and optimized; then something remarkable happened”: Navodaya 2026",
    "u": "https://www.iimb.ac.in/epgp-navodaya-2026",
    "img": "assets/img/news-prog/epgp-navodaya.jpg"
   },
   {
    "t": "Richard Rekhy reflects on the future of leadership at EPGP fireside chat",
    "u": "https://www.iimb.ac.in/node/5562",
    "img": null
   }
  ],
  "videos": [
   {
    "id": "k34OisV8s_4",
    "t": "First impressions: EPGP Batch of 2026–27"
   },
   {
    "id": "pvdaoQUai6s",
    "t": "Gold Medal for Best All-Round Performance EPGP 2026: Rajasilpi SP"
   },
   {
    "id": "fhfzz1fvnZw",
    "t": "I chose EPGP for its unique mix of global and local frameworks"
   },
   {
    "id": "vhtSDniuhr4",
    "t": "Work hard, play hard - The EPGP way"
   },
   {
    "id": "Hedbavui8_8",
    "t": "EPGP welcomed my unconventional story"
   },
   {
    "id": "vdgUeSnuNf8",
    "t": "What sets MBA-EPGP apart? Its cohort."
   },
   {
    "id": "QgIkof-AfWI",
    "t": "EPGP is teaching me how to think deeper and better"
   },
   {
    "id": "c3j8ulUAFyc",
    "t": "EPGP pushes you to think harder, move faster, and aim higher"
   },
   {
    "id": "mcxkX3S-VIc",
    "t": "“Unique global exposure was a key motivator to join EPGP”"
   },
   {
    "id": "-vEXMoSHOz0",
    "t": "“Network-building is our biggest asset at IIMB”"
   },
   {
    "id": "uXAPz6MlKgM",
    "t": "“Ready to challenge yourself? Then IIMB is the place to be”"
   },
   {
    "id": "aW4WrqxT2iQ",
    "t": "\"Case method pushed me to think beyond tech\""
   },
   {
    "id": "BZB5xcu_sFo",
    "t": "“Peer-learning powered my transition to corporate”"
   },
   {
    "id": "XxmZRsXgM-Q",
    "t": "“EPGP brings business acumen to technical expertise”"
   },
   {
    "id": "XR0powTbiWQ",
    "t": "Suresh Shetty, EPGP 2023-24"
   }
  ],
  "seek": [
   "Thrive in a rigorous academic environment",
   "Possess strong communication skills",
   "Have led teams and contributed to projects that impact the organisation’s bottom line"
  ]
 },
 "nsr-predoc": {
  "news": [
   {
    "t": "8th cohort of NSR Pre-doc successfully concludes one-year fellowship at IIM Bangalore",
    "u": "https://www.iimb.ac.in/node/13827",
    "img": null
   },
   {
    "t": "N.S. Ramaswamy Pre-doctoral Fellowship welcomes 12 fellows in the 8th cohort at IIMB",
    "u": "https://www.iimb.ac.in/welcome-nsrpre-doc-students-2025",
    "img": null
   },
   {
    "t": "NSR Pre-doc fellow Muhammed Sadiq becomes programme’s first PhD graduate",
    "u": "https://www.iimb.ac.in/nsrpredoc-sadiq-becomes-first-phd-graduate",
    "img": null
   },
   {
    "t": "7th cohort of NSR Pre-doc concludes fellowship at IIM Bangalore on 1 May 2025",
    "u": "https://www.iimb.ac.in/7th-cohort-nsr-pre-doc-fellowship-iimb",
    "img": null
   }
  ]
 },
 "pgp": {
  "news": [
   {
    "t": "PGP, PGPBA and EPGP sweep No. 1 positions in India in QS MiM, BA and Global MBA Rankings 2027",
    "u": "https://www.iimb.ac.in/qs-world-university-rankings-2027",
    "img": "assets/img/news-prog/qs2027.jpg"
   },
   {
    "t": "Pragya 2026: IIM Bangalore faculty share their perspective on transition and new beginnings with PGP and PGPBA students nearing graduation",
    "u": "https://www.iimb.ac.in/pragya-2026",
    "img": "assets/img/news-prog/pragya2026.jpg"
   },
   {
    "t": "Three IIM Bangalore MBAs reign #1 in India across QS World University Rankings 2026 portfolio",
    "u": "https://www.iimb.ac.in/qs-world-university-rankings-2026",
    "img": "assets/img/news-prog/qs2026.jpg"
   },
   {
    "t": "IIM Bangalore rises to #28 globally, #1 in India in FT Masters in Management ranking 2025",
    "u": "https://www.iimb.ac.in/iimb-ft-mim-global-ranking-2025",
    "img": "assets/img/news-prog/ftmim2025.jpg"
   },
   {
    "t": "IIMB alumna Anuradha Aggarwal appointed Director of Marketing and Growth at Amazon India",
    "u": "https://www.iimb.ac.in/anuradha-appointed-director-marketing-amazon-india",
    "img": "assets/img/news-prog/anuradha.jpg"
   }
  ],
  "videos": [
   {
    "id": "cbl5G-jPXA0",
    "t": "Gold Medal for Best All-Round Performance 2026: Mayur Dattatray Khule, PGP & PGPBA"
   },
   {
    "id": "O9_HiBZ3FuU",
    "t": "Gold Medal for First Rank 2026: Manasi Anju Mertia, PGP"
   },
   {
    "id": "StV7byH_udo",
    "t": "Aditya Nishith Shah, PGP 2022-24"
   },
   {
    "id": "umESBV81QB4",
    "t": "Anant Ashutosh Sharma, PGP 2022-24"
   },
   {
    "id": "9NhplDsJ8To",
    "t": "Sanya Monga, PGP 2022-24"
   },
   {
    "id": "46hJ4vwX9Ew",
    "t": "Stuti Jain, PGP 2022-24"
   },
   {
    "id": "ebYYwpnapwY",
    "t": "Vansh Lakhina, PGP 2022-24"
   },
   {
    "id": "EVu-uJTWCfA",
    "t": "Aditya Bhat, PGP 2020-22"
   },
   {
    "id": "hMijVHSYk-0",
    "t": "Mythili K, PGP 2020-22"
   },
   {
    "id": "URYxgzblzDI",
    "t": "Vinit Kumar, PGP 2020-22"
   },
   {
    "id": "0uDB4kRRvIg",
    "t": "Viriezo Vizo, PGP 2020-22"
   },
   {
    "id": "C918P-_gUfc",
    "t": "Adithya Kantharaj, PGP 2021-23"
   },
   {
    "id": "d4idjQW4BLw",
    "t": "Anurag Rathi, PGP 2021-23"
   },
   {
    "id": "WPIZxPB54KI",
    "t": "Bhargavi Prajapati, PGP 2021-23"
   },
   {
    "id": "ch8OGQhddOU",
    "t": "Bhavana Gaddam, PGP 2021-23"
   },
   {
    "id": "icMSZ00vlfE",
    "t": "Krishna Wadhwa, PGP 2021-23"
   },
   {
    "id": "eOviGRr7vL4",
    "t": "Nuhad Bardai, PGP 2021-23"
   },
   {
    "id": "tDTCtgtjsf8",
    "t": "Shreyas S, PGP 2021-23"
   },
   {
    "id": "JolLsaCOHQk",
    "t": "Siddhartha, PGP 2021-23"
   }
  ],
  "achievements": [
   {
    "t": "SnackWise startup by PGP ’25 students selected for NSRCEL incubation"
   },
   {
    "t": "PGP ’25 students crowned pan-India winners at Rajasthan Royals Case Competition"
   },
   {
    "t": "PGP ’25 students clinch second runner-up at HDFC Life Case Competition"
   }
  ],
  "disability": [
   "The Indian Institute of Management Bangalore (IIMB) endeavours to remove all barriers that prevent students with disabilities from realizing their potential. The objective of this policy is to provide “equal opportunity” for all students. IIMB commits to a time-bound programme to remove all barriers to access faced by students with disabilities: physical access to all parts of the campus used by students; access to teaching and reference material using appropriate technology; and access to e-resources through the adoption of WCAG and other relevant standards.",
   "IIMB will assess the needs of each enrolled student with disability individually. An Office of Disability Services will arrange such an assessment and be the nodal point to ensure that the needs of the student are communicated to every relevant office and fulfilled appropriately. IIMB will take proactive steps to identify career opportunities for students with disabilities and has set up a Committee on Disability at the institute level.",
   "Adopted by the IIMB faculty on 15 July 2009."
  ]
 },
 "pgpba": {
  "news": [
   {
    "t": "PGP, PGPBA and EPGP sweep No. 1 positions in India in QS MiM, BA and Global MBA Rankings 2027",
    "u": "https://www.iimb.ac.in/qs-world-university-rankings-2027",
    "img": "assets/img/news-prog/qs2027.jpg"
   },
   {
    "t": "Pragya 2026: IIM Bangalore faculty share their perspective on transition and new beginnings with PGP and PGPBA students nearing graduation",
    "u": "https://www.iimb.ac.in/pragya-2026",
    "img": "assets/img/news-prog/pragya2026.jpg"
   },
   {
    "t": "Three IIM Bangalore MBAs reign #1 in India across QS World University Rankings 2026 portfolio",
    "u": "https://www.iimb.ac.in/qs-world-university-rankings-2026",
    "img": "assets/img/news-prog/qs2026.jpg"
   }
  ],
  "videos": [
   {
    "id": "7qXQjj-deKo",
    "t": "Anusha S, PGPBA 2020-22"
   },
   {
    "id": "AcLtS71oM8s",
    "t": "Bhanavi Luthra, PGPBA 2021-23"
   },
   {
    "id": "MM-H14MMHtk",
    "t": "Srinath Vigneshwar, PGPBA 2021-23"
   }
  ],
  "achievements": [
   {
    "t": "SnackWise startup by PGP ’25 students selected for NSRCEL incubation"
   },
   {
    "t": "PGP ’25 students crowned pan-India winners at Rajasthan Royals Case Competition"
   },
   {
    "t": "PGP ’25 students clinch second runner-up at HDFC Life Case Competition"
   }
  ],
  "disability": [
   "The Indian Institute of Management Bangalore (IIMB) endeavours to remove all barriers that prevent students with disabilities from realizing their potential. The objective of this policy is to provide “equal opportunity” for all students. IIMB commits to a time-bound programme to remove all barriers to access faced by students with disabilities: physical access to all parts of the campus used by students; access to teaching and reference material using appropriate technology; and access to e-resources through the adoption of WCAG and other relevant standards.",
   "IIMB will assess the needs of each enrolled student with disability individually. An Office of Disability Services will arrange such an assessment and be the nodal point to ensure that the needs of the student are communicated to every relevant office and fulfilled appropriately. IIMB will take proactive steps to identify career opportunities for students with disabilities and has set up a Committee on Disability at the institute level.",
   "Adopted by the IIMB faculty on 15 July 2009."
  ]
 },
 "pgpem": {
  "news": [
   {
    "t": "Prajwalan 2026: PGPEM’s annual sports extravaganza concludes in full swing",
    "u": "https://www.iimb.ac.in/prajwalan-2026",
    "img": null
   },
   {
    "t": "PGPEM students celebrate culture and community at Pehel 2026",
    "u": "https://www.iimb.ac.in/node/12682",
    "img": null
   },
   {
    "t": "PGPEM welcomes 79 students to the batch of 2026–28 on 4 April 2026",
    "u": "https://www.iimb.ac.in/pgpemm-welcomes-batch-2026-28",
    "img": null
   },
   {
    "t": "IIM Bangalore’s PGPEM propels into global top 100: FT EMBA Ranking 2025",
    "u": "https://www.iimb.ac.in/iimb-pgpem-ft-emba-ranking-2025",
    "img": null
   },
   {
    "t": "Innoventure 2025 bets big on start-ups as the next global growth engine",
    "u": "https://www.iimb.ac.in/node/14397",
    "img": null
   },
   {
    "t": "Read more...",
    "u": "https://www.iimb.ac.in/pgpem-drishti-2025",
    "img": null
   }
  ],
  "videos": [
   {
    "id": "cpho3xNfy0Y",
    "t": "IIM Bangalore welcomes PGPEM batch of 2026-28"
   },
   {
    "id": "ve5yLCprvi4",
    "t": "Gold Medal for First Rank 2026: Lakshmi R, PGPEM"
   },
   {
    "id": "gqfsnkZ9BGo",
    "t": "Redefining Learning Beyond the Classroom - Siny J Fernandes’ Journey through PGPEM at IIMB"
   },
   {
    "id": "9rWoaO-GcBo",
    "t": "Rakesh's Journey at IIMB - Merging Aerospace Expertise with Strategic Leadership through PGPEM"
   },
   {
    "id": "i6izLr7hiqk",
    "t": "Unsettle to Settle for More: Priya Agrawal on Finding Her Dream Again with PGPEM at IIMB"
   },
   {
    "id": "3PDnSaf-Pc4",
    "t": "From Experience to Expertise: Dhaval Trivedi on Expanding His Leadership Vision with PGPEM"
   }
  ],
  "achievements": [
   {
    "t": "PGPEM students advance to top 10 at Harvard Global Case Competition"
   },
   {
    "t": "Campus win for PGPEM team at Hult Prize 2025 at IIM Bangalore",
    "u": "https://www.iimb.ac.in/pgpem-team-hult-prize-2025"
   },
   {
    "t": "National win for PGPEM team at IIM Kozhikode’s PowerUp strategy challenge",
    "u": "https://www.iimb.ac.in/pgpem-iimk-winners-powerup-strategy-challenge"
   }
  ]
 },
 "pgppm": {
  "news": [
   {
    "t": "Day two of PGPPM Policy Talk Series features session on educational mobility and public policy",
    "u": "https://www.iimb.ac.in/node/9446",
    "img": null
   },
   {
    "t": "PGPPM Policy Talk Series brings practitioner perspectives on governance and public policy",
    "u": "https://www.iimb.ac.in/node/5166",
    "img": null
   },
   {
    "t": "IIM Bangalore inaugurates 23rd cohort of the Post Graduate Programme in Public Policy and Management (PGPPM)",
    "u": "https://www.iimb.ac.in/iimb-inaugurated-23rd-cohort-pgppm-2026",
    "img": null
   },
   {
    "t": "IIM Bangalore welcomes 22nd batch of the Post Graduate Programme in Public Policy & Management",
    "u": "https://www.iimb.ac.in/iimb-welcomes-22-batch-pgppm",
    "img": null
   }
  ],
  "videos": [
   {
    "id": "lTUbH4BMDdE",
    "t": "PGPPM empowered me to tackle complex policy challenges with confidence"
   },
   {
    "id": "7Non_v_IFME",
    "t": "PGPPM continues to evolve with the changing needs of public policy"
   },
   {
    "id": "cxt_Z4DzyAo",
    "t": "Avais Patwegar: First Rank holder (PGPPM)"
   },
   {
    "id": "w7UPAjFCm-4",
    "t": "Post Graduate Programme in Public Policy & Management"
   },
   {
    "id": "FuOQqUjP8XU",
    "t": "PGPPM: A 40-week modular and hybrid PG Diploma programme"
   },
   {
    "id": "ybp8GRLjmY0",
    "t": "PGPPM: 2018 Admission"
   },
   {
    "id": "DTnYkQy2o8w",
    "t": "Senthil R, PGPPM 2023-24"
   },
   {
    "id": "JCoXHVB582U",
    "t": "Harish Jayanna, PGPPM 2023-24"
   }
  ],
  "achievements": [
   {
    "t": "PGPPM student selected for 64th UN Graduate Study Programme in Geneva",
    "u": "https://www.iimb.ac.in/madhurya-pgppm-student-selected-unog"
   }
  ]
 },
 "executive-education": {
  "videos": [
   {
    "id": "9EN3LpZniL0",
    "t": "IIMB Anthem"
   },
   {
    "id": "uBBPOmFtAyM",
    "t": "IIM Bangalore Campus Tour"
   },
   {
    "id": "PU9GfVeiDSY",
    "t": "My IIMB: A Tale of Gratitude - Part 2"
   },
   {
    "id": "kKiaZGfB02Q",
    "t": "My IIMB: A Tale of Gratitude - Part 1"
   }
  ]
 },
 "phd": {
  "videos": [
   {
    "id": "RW8QvIRDFWE",
    "t": "2026 Institute Research Award: Divya Dwivedi, PhD"
   },
   {
    "id": "mi-U9umMGdo",
    "t": "PhD Programme at IIMB: PhD scholar Satyajit Roy, Production and Operations Management area"
   },
   {
    "id": "9xZB1qH1BRA",
    "t": "PhD Programme at IIMB: PhD scholar Sabhya Rai, Economics area"
   },
   {
    "id": "9oS3okpy8Rw",
    "t": "PhD Programme at IIMB: PhD scholar Sonal Nayak, Strategy area"
   }
  ]
 }
};
