/* Hindi variants: same templates, translated strings. Loaded on /hi/ pages only. */
(function () {
  "use strict";
  const P = (window.IIMBPages = window.IIMBPages || {});
  const O = () => window.OC;

  /* Home: the shared renderer reads Hindi strings when <html lang="hi">; add the review notice and untranslated-page notice. */
  const baseHome = P.home;
  P.home = function (main) {
    baseHome(main);
    const { D, esc, params, R } = O();
    const from = params.get("untranslated");
    const note = document.createElement("div");
    note.className = "band band--stone";
    note.style.paddingBlock = "18px";
    note.innerHTML = `<div class="wrap">${from ? `<p class="notice" style="margin-bottom:10px"><b>यह पृष्ठ अभी हिन्दी में उपलब्ध नहीं है।</b> <a href="${esc(R(from))}" lang="en">अंग्रेज़ी पृष्ठ पर लौटें</a> · इस प्रोटोटाइप में मुखपृष्ठ और पीजीपी पृष्ठ हिन्दी में हैं।</p>` : ""}<p class="small muted">${esc(D.hi.review)} कुछ समाचार शीर्षक और कार्यक्रम विवरण अभी केवल अंग्रेज़ी में हैं।</p></div>`;
    const first = main.querySelector(".lead");
    if (from) main.prepend(note); else first.after(note);
  };

  P.programmeHi = function (main, p) {
    const { D, esc, R, link, beams, fmtDate } = O();
    const T = D.hi.pgp;
    if (p.id !== "pgp") {
      main.innerHTML = `<section class="band band--shade pagehead">${beams()}<div class="wrap"><div class="bays"><h1>${esc(p.short)}</h1><p class="lede">यह कार्यक्रम पृष्ठ अभी हिन्दी में उपलब्ध नहीं है। <a href="${R("programme.html?id=" + p.id)}" lang="en">English page</a></p></div></div></section>`;
      return;
    }
    document.title = `${T.name} | IIMB प्रोटोटाइप`;
    const kf = [
      [T.degree, `<strong>${esc(T.degree)}</strong>`],
      [T.duration, `<strong>2 वर्ष</strong>${esc(T.durationV)}`],
      [T.format, `<strong>${esc(T.formatV)}</strong>`],
      ["बैच 2026", `<strong>540</strong>विद्यार्थी`],
      [T.fee, `<strong>${esc(T.feeV)}</strong>${esc(T.feeBatch)} <span class="pending">${esc(T.feeNext)}</span>`],
      [T.route, esc(T.routeV)],
      [T.eligibility, esc(T.eligibilityV), "wide"],
      [T.dates, `${esc(T.intlOpen)}: <b>1 अक्टूबर 2026</b><br>${esc(T.intlClose)}: <b>14 जनवरी 2027</b><br>${esc(T.domestic)}: <span class="pending">${esc(T.domesticV)}</span>`, "wide"]
    ];
    main.innerHTML = `
    <section class="band band--shade pagehead">${beams()}<div class="wrap"><div class="bays">
      <nav class="crumbs" aria-label="ब्रेडक्रंब"><a href="${R("hi/index.html")}">मुखपृष्ठ</a><span aria-hidden="true">/</span><span>कार्यक्रम</span><span aria-hidden="true">/</span><span>पीजीपी</span></nav>
      <h1>${esc(T.name)}</h1>
      <p class="lede">${esc(T.oneLine)}</p>
      <div class="aside"><a class="btn btn--light" href="${esc(p.applyUrl)}" rel="noopener">${esc(T.apply)}</a><p class="micro muted" style="margin-top:8px">${esc(T.applyNote)}</p></div>
    </div></div></section>
    <div class="jumpbar"><div class="wrap"><nav aria-label="इस पृष्ठ पर"><ul><li><a href="#key-facts" aria-current="true">${esc(T.facts)}</a></li><li><a href="#profile">${esc(T.profile)}</a></li><li><a href="#outcomes">प्लेसमेंट</a></li><li><a href="#contact">${esc(T.contact)}</a></li></ul></nav>
      <div class="apply"><a class="btn btn--light" href="${esc(p.applyUrl)}" rel="noopener">${esc(T.apply)}</a></div></div></div>
    <section class="keyfacts" id="key-facts" aria-labelledby="kf-h"><div class="wrap">
      <h2 id="kf-h" class="visually-hidden">${esc(T.facts)}</h2>
      <dl class="kf-grid">${kf.map(([t, v, w]) => `<div class="kf${w ? " kf--wide" : ""}"><dt>${esc(t)}</dt><dd>${v}</dd></div>`).join("")}</dl>
      <div class="kf-foot"><span>स्रोत: IIMB के पीजीपी, प्रवेश और वित्तीय सहायता पृष्ठ, 11 अक्टूबर 2026 को जाँचे गए। आँकड़े अंग्रेज़ी पृष्ठ वाले उसी तथ्य-रजिस्टर से आते हैं।</span></div>
    </div></section>
    <div class="wrap">
      <section class="section" id="profile"><div class="cols"><div class="c-12"><h2 class="h3" style="font-size:var(--t-h2)">${esc(T.profile)}</h2><p class="lede" style="margin-top:12px">${esc(T.profileV)}</p></div>
        <div class="c-6">${O().barChart({ title: "प्रथम डिग्री (स्नातक विषय)", rows: [["इंजीनियरिंग", 360], ["वाणिज्य", 97], ["विज्ञान", 39], ["कला / मानविकी", 38], ["विधि", 3], ["अन्य", 3]], total: 540, srcKey: "pgp" })}</div></div></section>
      <section class="section" id="outcomes"><div class="cols"><div class="c-12"><h2 class="h3" style="font-size:var(--t-h2)">${esc(T.outcomes)}</h2><p class="lede" style="margin-top:12px">${esc(T.outcomesV)}</p>${O().srcLine("placement")}</div></div></section>
      <section class="section" id="contact"><div class="cols"><div class="c-6 sidebox"><h2>${esc(T.contact)}</h2><p><a href="mailto:pgpadm@iimb.ac.in">pgpadm@iimb.ac.in</a></p><p class="muted">+91 80 2699 3013 / 3017</p></div>
        <div class="c-6"><p class="notice">${esc(D.hi.review)}</p><p style="margin-top:14px"><a class="textlink" href="${R("programme.html?id=pgp")}">${esc(T.english)}</a></p></div></div></section>
    </div>
    <div class="actionbar"><p><b>पीजीपी 2027–29</b>${esc(T.applyNote)}</p><a class="btn btn--light" href="${esc(p.applyUrl)}" rel="noopener">${esc(T.apply)}</a></div>`;
    document.body.classList.add("has-actionbar");
  };
})();
