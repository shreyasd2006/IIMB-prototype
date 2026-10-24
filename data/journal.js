/* Content specific to "The Global Leadership Journal" concept.
   Every fact points at verified material in data/*.js or at an official source in IIMB.sources.
   Editorial groupings (audiences, sections, cover lines) are curation, not institutional claims, and are labelled so on the page. */
window.IIMB = window.IIMB || {};

Object.assign(IIMB.sources, {
  csitm: { t: "CSITM, IIMB (checked 18 Oct 2026)", u: "https://www.iimb.ac.in/centres-of-excellence/csitm" },
  csitmAbout: { t: "CSITM: About us (checked 18 Oct 2026)", u: "https://www.iimb.ac.in/centres-of-excellence/csitm/about-us" },
  csitmResearch: { t: "CSITM: Research themes (checked 18 Oct 2026)", u: "https://www.iimb.ac.in/centres-of-excellence/csitm/research" },
  csitmEvents: { t: "CSITM: Events (checked 18 Oct 2026)", u: "https://www.iimb.ac.in/centres-of-excellence/csitm/past-events" },
  csitmPeople: { t: "CSITM: Faculty support (checked 18 Oct 2026)", u: "https://www.iimb.ac.in/centres-of-excellence/csitm/faculty-support" },
  homeFilm: { t: "Campus film from the iimb.ac.in homepage", u: "https://www.iimb.ac.in/" },
  portraits: { t: "Faculty list, area-wise (portraits, checked 18 Oct 2026)", u: "https://www.iimb.ac.in/faculty-list-area-wise" }
});

/* Undergraduate school photographs supplied by IIMB (Fw__UG_students_pics.zip, 24 Oct 2026). */
Object.assign(IIMB.photos, {
  "ug-students-1": { src: { 800: "assets/img/ug-students-1-800.jpg", 1600: "assets/img/ug-students-1-1600.jpg" }, w: 1600, h: 1067, alt: "Five undergraduate students sit on the concrete steps of the new UG campus, books and laptops open.", caption: "Undergraduate students on the steps of the UG campus", credit: "IIM Bangalore, UG School", source: "https://ug.iimb.ac.in/" },
  "ug-students-2": { src: { 800: "assets/img/ug-students-2-800.jpg", 1600: "assets/img/ug-students-2-1600.jpg" }, w: 1600, h: 1067, alt: "Five students talk beneath the sign of the IIM Bangalore – Dorabji Tata School of Undergraduate Studies.", caption: "Outside the Dorabji Tata School of Undergraduate Studies", credit: "IIM Bangalore, UG School", source: "https://ug.iimb.ac.in/" },
  "ug-students-3": { src: { 800: "assets/img/ug-students-3-800.jpg", 1600: "assets/img/ug-students-3-1600.jpg" }, w: 1600, h: 1067, alt: "A group of undergraduate students walk along a path through the green UG campus.", caption: "Walking through the UG campus", credit: "IIM Bangalore, UG School", source: "https://ug.iimb.ac.in/" },
  "ug-students-4": { src: { 800: "assets/img/ug-students-4-800.jpg", 1600: "assets/img/ug-students-4-1600.jpg" }, w: 1600, h: 1067, alt: "Students walk past the stone and glass buildings of the undergraduate campus, hills behind.", caption: "The undergraduate campus", credit: "IIM Bangalore, UG School", source: "https://ug.iimb.ac.in/" },
  "ug-students-5": { src: { 800: "assets/img/ug-students-5-800.jpg", 1600: "assets/img/ug-students-5-1600.jpg" }, w: 1600, h: 1067, alt: "Six students sit and work on the wide stone steps between campus buildings.", caption: "Between classes at the UG campus", credit: "IIM Bangalore, UG School", source: "https://ug.iimb.ac.in/" }
});

/* Stills taken from the official campus films (frames, not new photography). */
Object.assign(IIMB.photos, {
  "poster-campus": { src: { 800: "assets/img/poster-campus-800.jpg", 1600: "assets/img/poster-campus-1600.jpg" }, w: 1600, h: 900, alt: "Two students walk down the stone steps of a pergola corridor on the IIMB campus.", caption: "A corridor in the academic block, from the official campus film", credit: "IIM Bangalore, campus film", source: "https://www.iimb.ac.in/" },
  "film-logo-wall": { src: { 1600: "assets/img/film-logo-wall-1600.jpg" }, w: 1600, h: 900, alt: "A stone wall carrying the red IIMB sun symbol, the motto, and the institute's name in Hindi, Kannada and English.", caption: "The name in three scripts, from the official campus film", credit: "IIM Bangalore, campus film", source: "https://www.iimb.ac.in/" },
  "film-convocation": { src: { 1600: "assets/img/film-convocation-1600.jpg" }, w: 1600, h: 900, alt: "Graduating students seated in rows on the lawns during convocation, seen from above.", caption: "Convocation on the lawns, from the official campus film", credit: "IIM Bangalore, campus film", source: "https://www.iimb.ac.in/" },
  "film-classroom": { src: { 1600: "assets/img/film-classroom-1600.jpg" }, w: 1600, h: 900, alt: "Students at desks in a bright IIMB classroom, laptops open.", caption: "A classroom, from the official campus film", credit: "IIM Bangalore, campus film", source: "https://www.iimb.ac.in/" },
  "poster-library": { src: { 1600: "assets/img/poster-library-1600.jpg" }, w: 1600, h: 834, alt: "Yellow armchairs and bookshelves under the concrete beams of the IIMB library.", caption: "The library, from the official library film", credit: "IIM Bangalore, library film", source: "https://www.iimb.ac.in/" }
});

/* The sections of the "issue": the site's own table of contents (numbers index sections, they carry order). */
IIMB.sections = [
  { id: "about", t: "About IIMB", sub: "The institutional story", u: "about.html", img: "archive-inauguration" },
  { id: "programmes", t: "Programmes & Admissions", sub: "The decision journey", u: "programmes.html", img: "pgp-cohort" },
  { id: "research", t: "Research", sub: "Ideas in focus", u: "research.html", img: "library-commons" },
  { id: "faculty", t: "Faculty", sub: "People and ideas", u: "faculty.html", img: "film-classroom" },
  { id: "centres", t: "Centres", sub: "Research communities", u: "centres.html", img: "columns" },
  { id: "news", t: "News & Events", sub: "The living institution", u: "news.html", img: "film-convocation" },
  { id: "campus", t: "Campus & Student Life", sub: "The IIMB experience", u: "campus.html", img: "ug-students-1" },
  { id: "partnerships", t: "Business Engagement", sub: "Partnership studio", u: "partnerships.html", img: "exec-ed" },
  { id: "industry", t: "Recruiters & Alumni", sub: "Beyond the classroom", u: "industry.html", img: "lawn" }
];

/* From the live iimb.ac.in homepage, checked 24 Oct 2026. */
IIMB.sources.liveHome = { t: "iimb.ac.in homepage (checked 24 Oct 2026)", u: "https://www.iimb.ac.in/" };
IIMB.homeRank = { v: "52", pre: "Global", label: "QS World University Rankings 2026", note: "Only one of two Indian B-schools featured", src: "liveHome" };
IIMB.advantage = [
  { v: "1500+", l: "Students" }, { v: "150+", l: "Faculty" },
  { v: "5300+", l: "Executive education programme participants" }, { v: "46800+", l: "Executive education programme days" }
];

/* Homepage cover lines: four real stories (ids in IIMB.news). */
IIMB.cover = {
  lines: [
    "iimb-inaugurates-first-batch-undergraduate-studies-2026",
    "iimb-ranks-11th-globally-financial-times",
    "new-case-study-gujarat-india-water-lessons-world",
    "iitkanpur-iimb-nsrcel-have-signed-mou"
  ],
  essay: "new-case-study-gujarat-india-water-lessons-world",
  essayImg: "film-logo-wall"
};

/* Programme finder: who is asking. Editorial grouping of IIMB.programmes by eligibility and format. */
IIMB.audiences = [
  { id: "school", t: "finishing school", long: "I am finishing school (Class XII)", progs: ["bsc-data-sciences", "bsc-economics", "bba-dbe"] },
  { id: "graduate", t: "a graduate", long: "I have a bachelor’s degree", progs: ["pgp", "pgpba"] },
  { id: "professional", t: "a working professional", long: "I have five or more years of work experience", progs: ["epgp", "pgpem", "pgppm"] },
  { id: "public", t: "in public service", long: "I work in government or the social sector", progs: ["pgppm", "executive-education"] },
  { id: "researcher", t: "a future researcher", long: "I want a career in research", progs: ["phd", "nsr-predoc"] },
  { id: "organisation", t: "an organisation", long: "I want to develop my organisation’s leaders", progs: ["executive-education"] }
];

/* Visual identity per centre within the shared system (presentation only). */
IIMB.centreStyle = {
  cpp: "burgundy", cencomm: "blush", ccmrm: "ink", ccgs: "gold", cdpg: "red", csitm: "ink",
  scmc: "blush", ctl: "cream", mijsc: "burgundy", "israel-centre": "gold", "tony-james": "ink",
  nsrcel: "red", dcal: "burgundy", reri: "blush", "behavioural-lab": "cream", "consumer-insights": "gold"
};
/* Editorial mapping of centres to research themes (presentation, labelled as derived on the page). */
IIMB.centreThemes = {
  cpp: ["society"], cencomm: ["strategy"], ccmrm: ["markets"], ccgs: ["strategy", "markets"], cdpg: ["digital", "society"],
  csitm: ["digital", "strategy"], scmc: ["operations"], ctl: ["society"], mijsc: ["strategy"], "israel-centre": ["strategy"],
  "tony-james": ["markets"], nsrcel: ["strategy"], dcal: ["digital"], reri: ["markets", "society"], "behavioural-lab": ["strategy", "operations"],
  "consumer-insights": ["operations"]
};

/* CSITM in full, from the official centre pages fetched 18 Oct 2026 (research/pages/csitm*.json). */
IIMB.csitm = {
  founded: "1998",
  phone: "+91 80 2699 3353",
  overview: [
    "The Centre for Software and Information Technology Management (CSITM) is the IIMB’s centre of excellence on digital technology management. It fosters close links with the burgeoning IT sector in India, especially with the technology hub of Bengaluru. It is also connected globally with management researchers from top universities, practitioners from global tech companies, volunteer driven organizations and start-ups, reputed policymakers of India, and expert intellectuals from different parts of the world.",
    "For more than two decades, CSITM has been using its global network and resources to serve as a hub for open exchange of information among academia, government, and industry on the evolving nature and impact of contemporary technologies on business, government, and society."
  ],
  vision: "To be a global, renowned, academic centre of excellence enabling management researchers, practitioners, policymakers, bureaucrats and intellectuals to learn, contemplate on, and disseminate knowledge on the diverse effects of contemporary technologies on business, government, and society",
  history: "Bengaluru has been the epicentre of the Indian IT industry since the early 1990s. To build a platform for co-creation of knowledge with the Indian IT industry, IIM Bangalore launched the Centre for Software and Information Technology Management (CSITM) in 1998. Over the decades, CSITM has consolidated research, consulting, teaching, and training efforts on management issues concerning the evolving Indian and global technology industry, especially in areas related to internet governance, cybersecurity, cloud, managing innovation with IT, and so on.",
  focus: ["Artificial Intelligence", "Generative AI", "Digital Transformation", "Product Management", "Digital Governance & Policy", "Healthcare Technology", "IT Outsourcing", "Cloud Computing", "Agile Development", "Digital Platforms", "Digital Payments", "Techno-ethics and emerging technologies (blockchain, extended reality, IoT, RPA)"],
  activities: [
    "Talks and seminars by renowned scholars and experts at the intersection of technology, business and society",
    "Conferences and summits bringing together business students, management researchers and practitioners of the technology industry",
    "Workshops that help young faculty and research students publish in top-tier Information Systems journals",
    "Workshops for early-career information systems academics to design graduate-level courses",
    "Seminars that help central and state government policymakers implement digital transformation",
    "Panel discussions and roundtables providing inputs to lawmakers on technology and society",
    "Training and consulting that support the digital transformation of organisations"
  ],
  collaborators: [
    { t: "International Software Product Management Association", u: "https://ispma.org" },
    { t: "Software Freedom Law Centre (SFLC.in)", u: "https://sflc.in" },
    { t: "Association for Information Systems", u: "https://aisnet.org" },
    { t: "Wadhwani Institute of Technology and Policy", u: "https://witp.wfglobal.org" },
    { t: "Other IIMs, IITs and IIIT Bangalore", u: "" }
  ],
  researchThemes: ["Business strategies in Indian IT services and software product organisations", "Software engineering and project management in global IT organisations", "Outsourcing of knowledge-intensive services", "Globally distributed work", "Human resource management in IT and ITES organisations", "IT in economic development", "Innovation and competition in the IT industry", "E-governance"],
  outputs: [
    { t: "Idea Co-creation on Social Media Platforms: Towards a Theory of Social Ideation", by: "N.M. Agrawal, Pratyush Bharati, Kui Du, Abhijit Chaudhury", where: "The Data Base for Advances in Information Systems", y: "2021" },
    { t: "Managing growth: Human resource management challenges facing the Indian software industry", by: "N.M. Agrawal, Naresh Khatri, R. Srinivasan", where: "Journal of World Business 47(2)", y: "2012" },
    { t: "Strategy to usher in the next phase of growth in the Indian IT industry", by: "N.M. Agrawal, Rajesh Pandit, Divya Menon", where: "IIMB Management Review 24(3)", y: "2012" },
    { t: "Importance of development context in ICT4D projects: A study of computerization of land records in India", by: "Prakash and De’", where: "Information Technology & People 20(3)", y: "2007" },
    { t: "User-Level Security Issues in Mobile Payments", by: "Abhipsa Pal, Sai Dattathrani, R. De’", where: "Study report", y: "2017" }
  ],
  people: ["mayank-kumar", "shankhadeep-banerjee", "spurthy-dharanikota", "shankar-venkatagiri"],
  upcoming: [
    { t: "Expert talk: Dynamic Affective–Agentic Positionings in Climate Engagement", d: "Prof. Sutirtha Chatterjee, University of Nevada, Las Vegas, on how technology shapes climate engagement on social media", u: "https://www.iimb.ac.in/node/787", kind: "Talk" },
    { t: "The India Lens: Building Theory from Indian Phenomena", d: "Scholarly Advancement Mentorship Workshop with the AIS India Chapter, 1–2 December 2026", u: "https://www.iimb.ac.in/node/768", kind: "Workshop", eventId: "node-768" },
    { t: "9th India Software Product Management Summit", d: "With ISPMA, 11–13 February 2027: product management in the age of agentic AI", u: "https://www.iimb.ac.in/ispma-2027", kind: "Summit", eventId: "ispma-2027" },
    { t: "First Doctoral Consortium under InCIS 2027", d: "Pre-conference event at IIMB, 11 March 2027", u: "https://www.iimb.ac.in/node/757", kind: "Consortium", eventId: "node-757" }
  ],
  past: [
    { t: "21 student teams pitch products at the Student Innovation & Product Summit 2026", u: "https://www.iimb.ac.in/node/2990" },
    { t: "Panel: navigating India’s new cyber reality in the age of AI-driven threats", u: "https://www.iimb.ac.in/node/12751" },
    { t: "8th India Software Product Management Summit: ‘Building a Product Nation: Agile, AI-Driven and Accountable’, 20–22 February 2026", u: "https://www.iimb.ac.in/8th-india-software-product-management-summit-2026" },
    { t: "Workshop with the AIS India Chapter: ‘Scholarship in the AI Age’", u: "https://www.iimb.ac.in/node/14538" },
    { t: "Dr. Bhaskar Ghosh on the future of consulting in the age of AI", u: "https://www.iimb.ac.in/node/14461" },
    { t: "‘The Work We Keep: What Will Still Be Human in a Future Led by AI and Machines’", u: "https://www.iimb.ac.in/node/14372" },
    { t: "Panel on AI, crypto and social algorithms in the future of finance", u: "https://www.iimb.ac.in/node/14255" },
    { t: "Book launch: Prof. Rahul Dé’s ‘AI for Managers’", u: "https://www.iimb.ac.in/node/14022" },
    { t: "Dr. S Somanath: software is the silent power behind India’s space success", u: "https://www.iimb.ac.in/node/13891" },
    { t: "7th India Software Product Management Summit, with ISPMA", u: "https://www.iimb.ac.in/node/13890" }
  ],
  imgs: ["csitm-summit", "csitm-event-1", "csitm-event-2"]
};

Object.assign(IIMB.photos, {
  "csitm-summit": { src: { 1600: "assets/img/csitm-summit-1600.jpg" }, w: 1600, h: 667, alt: "Speakers stand beside a lit ceremonial lamp at the inauguration of the 8th India Software Product Management Summit.", caption: "Lamp lighting at the 8th India Software Product Management Summit, 20–22 February 2026", credit: "IIM Bangalore, CSITM", source: "https://www.iimb.ac.in/centres-of-excellence/csitm" },
  "csitm-event-1": { src: { 1500: "assets/img/csitm-event-1.jpg" }, w: 1500, h: 999, alt: "Five panellists seated on stage at a CSITM discussion, a ceremonial lamp in the foreground.", caption: "A CSITM panel discussion", credit: "IIM Bangalore, CSITM", source: "https://www.iimb.ac.in/centres-of-excellence/csitm" },
  "csitm-event-2": { src: { 1500: "assets/img/csitm-event-2.jpg" }, w: 1500, h: 999, alt: "Four speakers in armchairs on a wood-panelled stage; one speaks into a microphone.", caption: "A CSITM panel discussion", credit: "IIM Bangalore, CSITM", source: "https://www.iimb.ac.in/centres-of-excellence/csitm" }
});
