/* Content specific to the Knowledge Observatory concept.
   Every item points at verified material already in data/*.js or at an official source in IIMB.sources.
   Nothing here is invented: where a journey stage has no genuine first-person material, it carries a labelled slot. */
window.IIMB = window.IIMB || {};

Object.assign(IIMB.sources, {
  oembed: { t: "YouTube oEmbed titles, checked 17 Oct 2026", u: "https://www.youtube.com/channel/UCZAWa1UvCXDqD9pBPDAqQ0Q" },
  nsrcel: { t: "NSRCEL", u: "https://www.nsrcel.org/" },
  library: { t: "IIMB Library", u: "https://library.iimb.ac.in/library" }
});

/* Films added for this concept. Titles verified via YouTube oEmbed on 17 Oct 2026 (author: IIM Bangalore unless noted). */
IIMB.voices = [
  { id: "pFaVf5QBjgo", t: "Testimonial by Mr. Taehong Kim, PGP 2021-23", who: "Taehong Kim", prog: "PGP 2021–23", about: "On the Centre for Management Communication", src: "student" },
  { id: "TCtOEbBVcWY", t: "Why PGPEM: Student View", who: "Anupama K R", prog: "PGPEM 2016–18", about: "On choosing the weekend MBA", src: "student" },
  { id: "aVNDCSc0g-4", t: "Meet the inaugural cohort of IIM Bangalore's BSc Honours programmes", who: "The first UG cohort", prog: "BSc (Hons), 2026", about: "80 students from 20 states", src: "youtube" },
  { id: "fwiY2G1ji3M", t: "Does the market undervalue breakthrough innovation? Prof. Sai Yayavaram weighs in", who: "Prof. Sai Yayavaram", prog: "Faculty, Strategy", about: "A faculty perspective", src: "youtube" }
];

/* The student journey: eight stations, each anchored in real material. */
IIMB.journey = [
  { id: "discover", t: "Discover", line: "Most journeys begin with a film and a long look at the programmes.",
    body: "The official campus films show the place and its people before any application form does.",
    film: { id: "peSFku6XZvE", t: "IIMB: The Place to Be" }, links: [["Campus life", "campus.html"], ["All programmes", "programmes.html"]], src: "tour" },
  { id: "apply", t: "Choose & apply", line: "Eleven programmes, each with its own door.",
    body: "Admissions run through official IIMB pages. Two dates on the current calendar:",
    dates: [ ["15 November 2026", "UG Admission Test (tentative)", "ugAdm"], ["14 January 2027", "PGP international applications close", "pgpIntl"] ],
    links: [["Compare programmes", "programmes.html#compare"], ["Official admissions", "https://www.iimb.ac.in/admissions"]] },
  { id: "arrive", t: "Arrive", line: "In August 2026 the first undergraduate cohort walked in: 80 students from 20 states.",
    story: "iimb-inaugurates-first-batch-undergraduate-studies-2026", film: { id: "aVNDCSc0g-4", t: "Meet the inaugural cohort of IIM Bangalore's BSc Honours programmes" } },
  { id: "learn", t: "Learn", line: "In their own words: two graduates on the classroom and the craft.",
    voices: ["pFaVf5QBjgo", "TCtOEbBVcWY"], slot: "A day in a PGP classroom, filmed with students. Story slot: awaiting a real student interview." },
  { id: "build", t: "Build together", line: "52+ clubs and student-led initiatives, from case competitions to social ventures.",
    stories: ["node-9255", "cdpg-national-student-case-competition-2026"], src: "student" },
  { id: "live", t: "Live on campus", line: "Residence, sport, music, Unmaad: life runs well past the timetable.",
    img: "unmaad", links: [["Campus life", "campus.html"]], src: "student" },
  { id: "research", t: "Research & industry", line: "Doctoral scholars publishing, winning fellowships and taking work to the UN.",
    stories: ["node-9860", "madhurya-pgppm-student-selected-unog", "doctoral-student-research-paper-award-2026"] },
  { id: "onward", t: "Careers & alumni", line: "Placement seasons, then a network that keeps showing up in the news.",
    dates: [ ["26–31 October 2026", "Summer placement interviews", "recruiters"], ["25–30 January 2027", "Final placement interviews", "recruiters"] ],
    stories: ["pgp-alumni-et-40-under-forty-2026", "alumnus-anup-bagchi-appointed-md-ceo-hdfc-bank"] }
];

/* Who the programme finder serves. Programme ids from IIMB.programmes. */
IIMB.audiences = [
  { id: "school", t: "Finishing school", progs: ["bsc-data-sciences", "bsc-economics", "bba-dbe"] },
  { id: "graduate", t: "A graduate, early in my career", progs: ["pgp", "pgpba"] },
  { id: "professional", t: "A working professional", progs: ["epgp", "pgpem", "pgppm", "executive-education"] },
  { id: "researcher", t: "Heading into research", progs: ["phd", "nsr-predoc"] },
  { id: "organisation", t: "Here for my organisation", progs: ["executive-education"], route: "partnerships.html" }
];

/* Constellation figures for the five research themes, on a 1000 x 620 chart. Star offsets are relative to each figure's centre.
   The figures are drawn for this concept; which disciplines, faculty and centres light up is derived from the data. */
IIMB.pole = [520, 318];
IIMB.constellations = {
  markets:    { name: "Mercatus", c: [215, 175], s: [[-70, -55], [0, 0], [88, -26], [40, 82], [-78, 60]], l: [[0, 1], [1, 2], [1, 3], [3, 4]] },
  strategy:   { name: "Inceptum", c: [520, 120], s: [[-62, -40], [0, 0], [72, -48], [56, 58], [-60, 44]], l: [[0, 1], [1, 2], [1, 3], [1, 4]] },
  digital:    { name: "Machina",  c: [815, 180], s: [[-78, -52], [0, 0], [74, -40], [60, 70], [-52, 76]], l: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 1]] },
  society:    { name: "Civitas",  c: [300, 480], s: [[-80, -40], [0, 0], [86, -30], [46, 70], [-64, 62]], l: [[0, 1], [1, 2], [1, 3], [3, 4], [4, 0]] },
  operations: { name: "Catena",   c: [760, 485], s: [[-82, -46], [0, 0], [90, -34], [62, 66], [-44, 68]], l: [[0, 1], [1, 2], [2, 3], [3, 4]] }
};

/* Editorial mapping of programmes to themes, read from each programme's own description (shown as editorial). */
IIMB.programmeThemes = {
  markets: ["pgp", "epgp", "pgpem", "bsc-economics", "phd"],
  strategy: ["pgp", "epgp", "pgpem", "bba-dbe", "executive-education", "phd"],
  digital: ["pgpba", "bsc-data-sciences", "bba-dbe", "phd"],
  society: ["pgppm", "nsr-predoc", "bsc-economics", "phd"],
  operations: ["pgp", "pgpba", "executive-education", "phd"]
};

/* Editorial grouping of centres under themes, made for this concept (shown as such). */
IIMB.centreThemes = {
  markets: ["ccmrm", "tony-james", "reri", "ccgs"],
  society: ["cpp", "ctl", "behavioural-lab"],
  digital: ["cdpg", "csitm", "dcal"],
  strategy: ["nsrcel", "cencomm", "ccgs", "mijsc", "israel-centre"],
  operations: ["scmc", "consumer-insights"]
};

/* Routes for current students: official destinations only. */
IIMB.currentStudents = [
  ["IIMB Library", "https://library.iimb.ac.in/library"],
  ["Student life and activities", "https://www.iimb.ac.in/about-institute/life-iimb/student-life"],
  ["Upcoming conferences and events", "events"],
  ["Career Development Services (recruiters)", "https://www.iimb.ac.in/recruiters"],
  ["NSRCEL incubator", "https://www.nsrcel.org/"],
  ["Financial aid and scholarships (PGP)", "https://www.iimb.ac.in/programmes/pgp/financial-aid-scholarships"]
];
