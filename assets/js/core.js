/* The Global Leadership Journal — shared runtime.
   Chrome (header, contents, search, page leaf), helpers for rendering verified data, and the motion system.
   Page scripts register with J.page(render, intro); core boots them on DOMContentLoaded. */
(() => {
  "use strict";
  const d = document, h = d.documentElement, I = window.IIMB || {};
  const J = (window.J = { I });
  const mq = (q) => matchMedia(q).matches;
  J.rm = mq("(prefers-reduced-motion: reduce)");
  J.touch = mq("(hover: none)");
  J.small = () => innerWidth < 760;
  J.gsap = window.gsap && !J.rm ? window.gsap : null;

  /* ---------------------------------------------------------------- language (English / हिन्दी) */
  try { J.lang = localStorage.getItem("j-lang") === "hi" ? "hi" : "en"; } catch (_) { J.lang = "en"; }
  const HI = (J.lang === "hi" && I.HI) || {};
  J.t = (s) => (J.lang === "hi" && HI[s]) || s;
  const HI_MONTHS = ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];
  /* Translate every text node and user-facing attribute under root using the Hindi dictionary.
     Exact matches first; composite strings ("12 October 2026 · Rankings") are translated part by part. */
  const SEP = /(\s+·\s+|\s+\|\s+|\s+–\s+|\s+—\s+|:\s+)/;
  const NUM = /\d[\d,.]*\d|\d/g;
  const norm = (s) => s.replace(/\s+/g, " ").trim();
  const tplKey = (s) => s.replace(NUM, "{n}");
  // exact match, then the same sentence with its numbers lifted out ("42 items" -> "{n} items")
  const one = (t) => {
    if (HI[t]) return HI[t];
    if (!/\d/.test(t)) return null;
    const k = tplKey(t);
    if (HI[k]) { const nums = t.match(NUM) || []; let i = 0; return HI[k].replace(/\{n\}/g, () => nums[i++] ?? ""); }
    return null;
  };
  // sentences that carry what the reader typed ("Nothing matches “xyz”.")
  const RX = (J.lang === "hi" && I.HI_RX || []).map(([r, out]) => [new RegExp(r), out]);
  const oneRx = (t) => { const h = one(t); if (h !== null) return h; for (const [r, out] of RX) if (r.test(t)) return t.replace(r, out); return null; };
  const trText = (raw) => {
    const t = norm(raw); if (!t || !/[A-Za-z]/.test(t)) return null;
    const lead = /^\s/.test(raw) ? " " : "", tail = /\s$/.test(raw) ? " " : "";
    const whole = oneRx(t); if (whole !== null) return lead + whole + tail;
    const parts = t.split(SEP); if (parts.length < 2) return null;
    let hit = false; const out = parts.map((p) => { const r = one(p); if (r !== null) { hit = true; return r; } return p; });
    return hit ? lead + out.join("") + tail : null;
  };
  J._i18n = { norm, tplKey, SEP };
  J.translate = (root = d.body) => {
    if (J.lang !== "hi" || !root) return;
    const w = d.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: (n) => (n.parentElement && n.parentElement.closest("script,style,[data-no-i18n],svg")) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    const nodes = []; let n; while ((n = w.nextNode())) nodes.push(n);
    nodes.forEach((x) => { const r = trText(x.nodeValue); if (r !== null) x.nodeValue = r; });
    const els = root.nodeType === 1 ? [root, ...root.querySelectorAll("[placeholder],[aria-label],[title],[alt]")] : [];
    els.forEach((el) => ["placeholder", "aria-label", "title", "alt"].forEach((a) => { const v = el.getAttribute && el.getAttribute(a); if (v) { const r = trText(v); if (r !== null) el.setAttribute(a, r); } }));
  };

  /* ---------------------------------------------------------------- helpers */
  J.$ = (s, r = d) => r.querySelector(s);
  J.$$ = (s, r = d) => [...r.querySelectorAll(s)];
  J.esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  J.param = (k) => new URLSearchParams(location.search).get(k);
  J.icon = (n, cls = "ico") => `<svg class="${cls}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
  J.slug = (s) => String(s).toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  J.byId = (arr, id) => (arr || []).find((x) => x.id === id);
  J.fac = (id) => J.byId(I.faculty, id);
  J.prog = (id) => J.byId(I.programmes, id);
  J.centre = (id) => J.byId(I.centres, id);
  J.story = (id) => J.byId(I.news, id) || J.byId(I.events, id);
  J.theme = (id) => J.byId(I.themes, id);
  J.srcLink = (key, label) => { const s = (I.sources || {})[key]; return s ? `<a class="ulink" href="${s.u}">${J.esc(label || s.t)}</a>` : ""; };
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  J.months = MONTHS; J.monthName = (i, short) => (J.lang === "hi" ? HI_MONTHS[i] : short ? MONTHS[i].slice(0, 3) : MONTHS[i]);
  J.date = (iso, style = "long") => {
    if (!iso) return "";
    const [y, m, dd] = iso.split("-").map(Number);
    if (J.lang === "hi") return style === "dm" ? `${dd} ${HI_MONTHS[m - 1]}` : `${dd} ${HI_MONTHS[m - 1]} ${y}`;
    if (style === "short") return `${dd} ${MONTHS[m - 1].slice(0, 3)} ${y}`;
    if (style === "dm") return `${dd} ${MONTHS[m - 1].slice(0, 3)}`;
    return `${dd} ${MONTHS[m - 1]} ${y}`;
  };
  J.range = (a, b) => {
    if (!b || a === b) return J.date(a);
    const [y1, m1, d1] = a.split("-").map(Number), [y2, m2, d2] = b.split("-").map(Number);
    const MM = J.lang === "hi" ? HI_MONTHS : MONTHS;
    if (J.lang === "hi") return y1 === y2 && m1 === m2 ? `${d1}–${d2} ${MM[m1 - 1]} ${y1}` : `${J.date(a)} – ${J.date(b)}`;
    if (y1 === y2 && m1 === m2) return `${d1}–${d2} ${MONTHS[m1 - 1]} ${y1}`;
    if (y1 === y2) return `${d1} ${MONTHS[m1 - 1].slice(0, 3)} – ${d2} ${MONTHS[m2 - 1].slice(0, 3)} ${y1}`;
    return `${J.date(a, "short")} – ${J.date(b, "short")}`;
  };
  J.today = "2026-10-18"; // the date the content was checked; keeps "upcoming" stable for the prototype

  /* Photographs: pick the closest stored size. */
  J.photo = (key) => (I.photos || {})[key];
  J.src = (key, want = 1600) => {
    const p = J.photo(key); if (!p) return "";
    const sizes = Object.keys(p.src).map(Number).sort((a, b) => a - b);
    const pick = sizes.find((s) => s >= want) || sizes[sizes.length - 1];
    return p.src[pick];
  };
  J.img = (key, { want = 1600, cls = "", alt, lazy = true, sizes = "100vw" } = {}) => {
    const p = J.photo(key); if (!p) return "";
    const set = Object.entries(p.src).map(([w, u]) => `${u} ${w}w`).join(", ");
    return `<img class="${cls}" src="${J.src(key, want)}" srcset="${set}" sizes="${sizes}" width="${p.w}" height="${p.h}" alt="${J.esc(alt ?? p.alt)}"${lazy ? ' loading="lazy" decoding="async"' : ' fetchpriority="high"'}>`;
  };
  J.credit = (key) => { const p = J.photo(key); return p ? `${J.esc(p.caption || "")}${p.caption ? ". " : ""}<span class="cr">Photo: <a class="ulink" href="${p.source}">${J.esc(p.credit)}</a></span>` : ""; };
  J.newsImg = (n, cls = "") => n && n.image ? `<img class="${cls}" src="${n.image.src[750]}" width="750" height="500" alt="${J.esc(n.alt || "Photograph accompanying the story: " + n.title)}" loading="lazy" decoding="async">` : "";

  /* Faculty portraits (official IIMB portraits) with a typographic fallback. */
  J.initials = (name) => name.replace(/^(Prof\.?|Dr\.?)\s+/i, "").split(/\s+/).filter((w) => /^[A-Z]/.test(w)).map((w) => w[0]).slice(0, 2).join("");
  J.face = (id, { cls = "", duo = true, lazy = true } = {}) => {
    const f = J.fac(id); const p = (I.portraits || {})[id];
    if (!f) return "";
    if (!p) return `<span class="mono ${cls}" aria-hidden="true">${J.initials(f.name)}</span>`;
    const img = `<img src="${p.src}" width="440" height="440" alt="Portrait of ${J.esc(f.name)}"${lazy ? ' loading="lazy" decoding="async"' : ""} onerror="this.parentNode.classList.add('noimg');this.remove()">`;
    return duo ? `<span class="duo ${cls}" data-initials="${J.initials(f.name)}">${img}</span>` : `<span class="plate ${cls}">${img}</span>`;
  };
  J.areaSlug = (a) => J.slug(a);

  /* Derived theme matching for papers and stories (keyword based; labelled "derived" wherever shown). */
  J.themesOf = (text) => {
    const t = " " + String(text).toLowerCase() + " ";
    return (I.themes || []).filter((th) => th.kw.some((k) => (k.length <= 3 ? new RegExp(`\\b${k}\\b`).test(t) : t.includes(k)))).map((th) => th.id);
  };
  J.facultyInTheme = (th) => (I.faculty || []).filter((f) => f.areas.some((a) => th.areas.includes(a)));

  /* URLs */
  J.u = {
    prog: (id) => `programme.html?id=${encodeURIComponent(id)}`,
    person: (id) => `person.html?id=${encodeURIComponent(id)}`,
    centre: (id) => `centre.html?id=${encodeURIComponent(id)}`,
    theme: (id) => `theme.html?id=${encodeURIComponent(id)}`,
    story: (id) => `story.html?id=${encodeURIComponent(id)}`,
  };

  /* ---------------------------------------------------------------- motion primitives */
  const G = () => J.gsap;
  J.ease = "expo.out";

  /* Split text into masked lines. Inline elements are kept by cloning them around each word. */
  J.split = (el) => {
    if (!el || el._split) return el && el._split;
    const original = el.innerHTML;
    const words = [];
    const walk = (node, wrapFns) => {
      [...node.childNodes].forEach((c) => {
        if (c.nodeType === 3) {
          c.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { words.push({ space: true }); return; }
            words.push({ text: part, wrap: wrapFns });
          });
        } else if (c.nodeType === 1) {
          if (c.tagName === "BR") { words.push({ br: true }); return; }
          const shallow = c.cloneNode(false);
          walk(c, [...wrapFns, shallow]);
        }
      });
    };
    walk(el, []);
    el.innerHTML = "";
    const spans = [];
    words.forEach((w) => {
      if (w.space) { el.appendChild(d.createTextNode(" ")); return; }
      if (w.br) { el.appendChild(d.createElement("br")); return; }
      const s = d.createElement("span"); s.className = "w"; s.style.display = "inline-block";
      let inner = d.createTextNode(w.text);
      for (let i = w.wrap.length - 1; i >= 0; i--) { const c = w.wrap[i].cloneNode(false); c.appendChild(inner); inner = c; }
      s.appendChild(inner); el.appendChild(s); spans.push(s);
    });
    const lines = []; let top = null, cur = null;
    spans.forEach((s) => { const t = s.offsetTop; if (top === null || Math.abs(t - top) > 4) { cur = []; lines.push(cur); top = t; } cur.push(s); });
    el.innerHTML = "";
    const inners = lines.map((ws) => {
      const line = d.createElement("span"); line.className = "line";
      const li = d.createElement("span"); li.className = "li";
      ws.forEach((w, i) => { li.appendChild(w); if (i < ws.length - 1) li.appendChild(d.createTextNode(" ")); });
      line.appendChild(li); el.appendChild(line); el.appendChild(d.createTextNode(" ")); return li;
    });
    el._split = { lines: inners, revert: () => { el.innerHTML = original; el._split = null; } };
    return el._split;
  };

  /* Tween factories return GSAP tweens (or null when motion is off). */
  J.linesIn = (el, o = {}) => {
    const g = G(); if (!g || !el) return null;
    const s = J.split(el);
    g.set(el, { visibility: "visible" });
    return g.fromTo(s.lines, { yPercent: 112, rotate: o.rotate ?? 1.2 }, { yPercent: 0, rotate: 0, duration: o.dur ?? 0.9, ease: J.ease, stagger: o.stagger ?? 0.06, delay: o.delay ?? 0, onComplete: () => { if (!o.keep) s.revert(); } });
  };
  J.plateIn = (el, o = {}) => {
    const g = G(); if (!g || !el) return null;
    const from = { up: "inset(100% 0% 0% 0%)", down: "inset(0% 0% 100% 0%)", left: "inset(0% 100% 0% 0%)", right: "inset(0% 0% 0% 100%)", aperture: "inset(18% 32% 18% 32%)" }[o.from || el.dataset.plate || "up"] || "inset(100% 0% 0% 0%)";
    const media = el.querySelector("img, video");
    g.set(el, { autoAlpha: 1 });
    const tl = g.timeline({ delay: o.delay || 0 });
    tl.fromTo(el, { clipPath: from }, { clipPath: "inset(0% 0% 0% 0%)", duration: o.dur ?? 1.35, ease: "expo.inOut" }, 0);
    if (media) tl.fromTo(media, { scale: 1.25 }, { scale: 1, duration: (o.dur ?? 1.35) + 0.4, ease: J.ease }, 0);
    return tl;
  };

  /* Scroll reveals: everything not inside [data-manual]. */
  const autoRevealSel = "[data-split],[data-plate],[data-rule],[data-stagger],[data-fade],[data-count],[data-parallax],[data-bars],[data-ring]";
  J.reveals = (root = d) => {
    const g = G();
    const els = J.$$(autoRevealSel, root).filter((e) => !e.closest("[data-manual]") && !e._rev);
    if (!g) { els.forEach((e) => { e._rev = 1; e.style.visibility = "visible"; }); return; }
    els.forEach((el) => {
      if (el._rev) return;
      el._rev = 1;
      const st = { trigger: el, start: "top 96%", once: true };
      if (el.hasAttribute("data-split")) {
        g.set(el, { visibility: "hidden" });
        ScrollTrigger.create({ ...st, onEnter: () => J.linesIn(el, { delay: +(el.dataset.delay || 0) }) });
      } else if (el.hasAttribute("data-plate")) {
        g.set(el, { clipPath: "inset(100% 0% 0% 0%)" });
        ScrollTrigger.create({ ...st, start: "top 92%", onEnter: () => J.plateIn(el, { delay: +(el.dataset.delay || 0) }) });
      } else if (el.hasAttribute("data-rule")) {
        g.fromTo(el, { scaleX: 0, transformOrigin: el.dataset.rule === "right" ? "100% 50%" : "0% 50%" }, { scaleX: 1, duration: 1.4, ease: "expo.inOut", scrollTrigger: st });
      } else if (el.hasAttribute("data-stagger")) {
        const kids = [...el.children];
        g.set(el, { visibility: "visible" });
        g.fromTo(kids, { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.75, ease: J.ease, stagger: Math.min(0.06, 0.45 / Math.max(kids.length, 1)), scrollTrigger: { ...st, start: "top 97%" } });
      } else if (el.hasAttribute("data-fade")) {
        g.fromTo(el, { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: J.ease, delay: +(el.dataset.delay || 0), scrollTrigger: st });
      } else if (el.hasAttribute("data-ring")) {
        const dial = J.$(".ring-dial", el);
        g.set(dial, { "--k": 0 }); g.set(J.$$(".ring-key li", el), { autoAlpha: 0 });
        ScrollTrigger.create({ ...st, start: "top 85%", onEnter: () => { g.to(dial, { "--k": 1, duration: 1.4, ease: "expo.inOut" }); g.fromTo(J.$$(".ring-key li", el), { autoAlpha: 0, x: 16 }, { autoAlpha: 1, x: 0, duration: 0.7, ease: J.ease, stagger: 0.06, delay: 0.3 }); } });
      } else if (el.hasAttribute("data-bars")) {
        const grow = J.$$("[data-grow]", el);
        g.set(grow.filter((x) => x.dataset.grow !== "y"), { scaleX: 0, transformOrigin: "0% 50%" });
        g.set(grow.filter((x) => x.dataset.grow === "y"), { scaleY: 0, transformOrigin: "50% 100%" });
        ScrollTrigger.create({ ...st, start: "top 88%", onEnter: () => g.to(grow, { scaleX: 1, scaleY: 1, duration: 1.1, ease: "expo.out", stagger: Math.min(0.06, 0.6 / Math.max(grow.length, 1)) }) });
        J.$$("[data-count]", el).forEach((c) => { c._rev = 1; J.countUp(c, st); });
        const rows = J.$$(".rkl-row", el);
        if (rows.length) g.fromTo(rows, { autoAlpha: 0, x: 36 }, { autoAlpha: 1, x: 0, duration: 0.9, ease: J.ease, stagger: 0.07, clearProps: "transform", scrollTrigger: { ...st, start: "top 86%" } });
        const feat = J.$(".rkl-feature", el);
        if (feat) g.fromTo(feat, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.inOut", scrollTrigger: { ...st, start: "top 86%" } });
      } else if (el.hasAttribute("data-count")) {
        J.countUp(el, st);
      } else if (el.hasAttribute("data-parallax")) {
        const amt = +(el.dataset.parallax || 12), media = el.querySelector("img, video") || el;
        g.fromTo(media, { yPercent: -amt, scale: 1 + amt / 50 }, { yPercent: amt, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      }
    });
  };

  /* Count from 1 up to the figure (years included, by request), fast, when it scrolls into view. */
  J.countUp = (el, st) => {
    const g = G(); if (!g) return;
    const txt = el.textContent, m = txt.match(/\d[\d,.]*/);
    if (!m) return;
    const target = parseFloat(m[0].replace(/,/g, "")), dec = (m[0].split(".")[1] || "").length, obj = { v: 1 };
    const fmt = (v) => { const n = Number(v.toFixed(dec)); return m[0].includes(",") ? n.toLocaleString("en-IN") : n.toFixed(dec); };
    el.textContent = txt.replace(m[0], "1");
    g.to(obj, { v: target, duration: target > 999 ? 1.5 : 1.2, ease: "power2.out", scrollTrigger: st || { trigger: el, start: "top 96%", once: true }, onUpdate: () => (el.textContent = txt.replace(m[0], fmt(obj.v))), onComplete: () => (el.textContent = txt) });
  };

  /* Row-by-row reveal for long lists: only items below the fold start hidden. */
  J.batchIn = (sel, o = {}) => {
    const g = G(); if (!g || !window.ScrollTrigger) return;
    g.set(J.$$(sel).filter((e) => e.getBoundingClientRect().top > innerHeight), { autoAlpha: 0, y: 28 });
    ScrollTrigger.batch(sel, { start: "top 97%", once: true, onEnter: (els) => g.to(els, { autoAlpha: 1, y: 0, duration: o.dur || 0.7, stagger: 0.05, ease: J.ease, overwrite: true }) });
  };

  /* FLIP for filtered lists: call with the container and a function that re-renders it. */
  J.flip = (container, mutate) => {
    const g = G();
    const before = new Map(J.$$("[data-key]", container).map((n) => [n.dataset.key, n.getBoundingClientRect()]));
    mutate();
    if (!g) return;
    J.$$("[data-key]", container).forEach((n, i) => {
      const r = n.getBoundingClientRect(), b = before.get(n.dataset.key);
      if (b) { const dx = b.left - r.left, dy = b.top - r.top; if (dx || dy) g.fromTo(n, { x: dx, y: dy }, { x: 0, y: 0, duration: 0.8, ease: J.ease, clearProps: "transform" }); }
      else g.fromTo(n, { autoAlpha: 0, y: 24, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: J.ease, delay: Math.min(i * 0.02, 0.4), clearProps: "transform,opacity,visibility" });
    });
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  };

  /* Cursor-following preview image for index rows. rows: elements with data-peek="<img src>". */
  J.peek = (root) => {
    if (J.touch || J.rm || !G()) return;
    let el = J.$(".peek"); if (!el) { el = d.createElement("div"); el.className = "peek"; el.setAttribute("aria-hidden", "true"); el.appendChild(new Image()); el.firstChild.alt = ""; d.body.appendChild(el); }
    const img = el.firstChild, g = G();
    const xTo = g.quickTo(el, "x", { duration: 0.6, ease: "power3" }), yTo = g.quickTo(el, "y", { duration: 0.6, ease: "power3" });
    root.addEventListener("pointermove", (e) => { xTo(e.clientX + 24); yTo(e.clientY - el.offsetHeight / 2); });
    J.$$("[data-peek]", root).forEach((row) => {
      row.addEventListener("pointerenter", () => { if (img.getAttribute("src") !== row.dataset.peek) img.src = row.dataset.peek; el.classList.add("on"); });
      row.addEventListener("pointerleave", () => el.classList.remove("on"));
    });
  };

  /* ---------------------------------------------------------------- smooth scroll */
  let lenis = null;
  function setupScroll() {
    const g = G();
    if (!g || !window.ScrollTrigger) return;
    g.registerPlugin(ScrollTrigger);
    if (window.Lenis && !J.touch) {
      lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      g.ticker.add((t) => lenis.raf(t * 1000));
      g.ticker.lagSmoothing(0);
      J.lenis = lenis;
    }
  }
  J.scrollTo = (target, offset = -90) => { if (lenis) lenis.scrollTo(target, { offset, duration: 1.2 }); else (typeof target === "string" ? J.$(target) : target)?.scrollIntoView({ behavior: J.rm ? "auto" : "smooth" }); };

  /* ---------------------------------------------------------------- header: hide on scroll down, progress rule */
  function setupHeader() {
    const hd = J.$(".site-header"), bar = J.$(".site-header .progress");
    let last = 0, ticking = false;
    const onScroll = () => {
      const y = scrollY, max = d.documentElement.scrollHeight - innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      hd.classList.toggle("scrolled", y > 40);
      last = y; ticking = false;
    };
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    hd.addEventListener("focusin", () => hd.classList.remove("is-hidden"));
  }

  /* ---------------------------------------------------------------- dialogs: focus trap helper */
  function trap(container, e) {
    if (e.key !== "Tab") return;
    const f = J.$$('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])', container).filter((x) => x.offsetParent !== null || x === d.activeElement);
    if (!f.length) return;
    const first = f[0], lastEl = f[f.length - 1];
    if (e.shiftKey && d.activeElement === first) { e.preventDefault(); lastEl.focus(); }
    else if (!e.shiftKey && d.activeElement === lastEl) { e.preventDefault(); first.focus(); }
  }

  /* ---------------------------------------------------------------- contents overlay */
  function setupContents() {
    const box = J.$("#contents"), list = J.$("[data-toc]"), prev = J.$("[data-toc-preview]"), cap = J.$("[data-toc-caption]");
    const btns = J.$$("[data-open-contents]");
    if (!box) return;
    const here = d.body.dataset.page;
    const navKey = { programme: "programmes", theme: "research", person: "faculty", story: "news", centre: "centres" }[here] || here;
    list.innerHTML = (I.sections || []).map((s, i) => `<li><a href="${s.u}"${s.id === navKey ? ' aria-current="page"' : ""} data-img="${s.img}"><span class="n">${String(i + 1).padStart(2, "0")}</span><span class="t">${J.esc(s.t)}</span><span class="s">${J.esc(s.sub)}</span></a></li>`).join("");
    const show = (key) => {
      if (!key || prev.dataset.key === key) return;
      prev.dataset.key = key;
      const wrap = d.createElement("div"); wrap.style.cssText = "position:absolute;inset:0"; wrap.innerHTML = J.img(key, { want: 800, lazy: false, alt: "" });
      prev.appendChild(wrap);
      cap.innerHTML = J.esc((J.photo(key) || {}).caption || "");
      const g = G();
      if (g) g.fromTo(wrap, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 0.8, ease: "expo.out", onComplete: () => { while (prev.children.length > 1) prev.firstChild.remove(); } });
      else while (prev.children.length > 1) prev.firstChild.remove();
    };
    J.$$("a", list).forEach((a) => { a.addEventListener("pointerenter", () => show(a.dataset.img)); a.addEventListener("focus", () => show(a.dataset.img)); });
    let opener = null, open = false;
    const openIt = () => {
      if (open) return; open = true; opener = d.activeElement;
      box.hidden = false; box.classList.add("is-open"); btns.forEach((b) => b.setAttribute("aria-expanded", "true"));
      lenis && lenis.stop(); d.body.style.overflow = "hidden";
      show((J.$("a[aria-current]", list) || J.$("a", list)).dataset.img);
      const g = G();
      if (g) {
        const tl = g.timeline();
        tl.fromTo(box, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" })
          .fromTo(J.$$(".toc .t, .toc .n, .toc .s", box), { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: J.ease, stagger: 0.025 }, 0.35)
          .fromTo(J.$$(".toc li", box), { "--r": 0 }, { "--r": 1, duration: 0.8 }, 0.35)
          .fromTo([prev, cap, J.$(".quick", box)], { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: J.ease, stagger: 0.08 }, 0.5);
      } else box.style.clipPath = "none";
      setTimeout(() => J.$("a[aria-current], a", list)?.focus({ preventScroll: true }), J.rm ? 0 : 450);
    };
    const closeIt = () => {
      if (!open) return; open = false;
      btns.forEach((b) => b.setAttribute("aria-expanded", "false"));
      const done = () => { box.hidden = true; box.classList.remove("is-open"); lenis && lenis.start(); d.body.style.overflow = ""; opener && opener.focus({ preventScroll: true }); };
      const g = G();
      if (g) g.to(box, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.6, ease: "expo.inOut", onComplete: done }); else done();
    };
    btns.forEach((b) => b.addEventListener("click", openIt));
    J.$$("[data-close-contents]").forEach((b) => b.addEventListener("click", closeIt));
    box.addEventListener("keydown", (e) => { if (e.key === "Escape") closeIt(); trap(box, e); });
    J.closeContents = closeIt;
  }

  /* ---------------------------------------------------------------- search index + overlay */
  J.searchIndex = () => {
    if (J._idx) return J._idx;
    const items = [];
    const add = (group, t, dsc, u, extra = "", thumb = "") => items.push({ group, t, d: dsc, u, hay: (t + " " + dsc + " " + extra).toLowerCase(), thumb });
    (I.sections || []).forEach((s) => add("Sections", s.t, s.sub, s.u));
    (I.programmes || []).forEach((p) => add("Programmes", `${p.name}`, `${p.short} · ${p.degree} · ${p.duration}`, J.u.prog(p.id), `${p.level} ${p.format} ${p.summary}`, ""));
    (I.faculty || []).forEach((f) => add("Faculty", f.name, `${f.title} · ${f.areas.join(", ")}`, J.u.person(f.id), `${f.roles.join(" ")} ${f.summary}`, (I.portraits || {})[f.id]?.src || ""));
    (I.centres || []).forEach((c) => add("Centres", c.name, `${c.abbr} · ${c.kind}`, J.u.centre(c.id), `${c.areas.join(" ")} ${c.about}`));
    (I.themes || []).forEach((t) => add("Research themes", t.t, t.d, J.u.theme(t.id)));
    (I.news || []).forEach((n) => add("Stories", n.title, `${n.category} · ${J.date(n.date)}`, J.u.story(n.id), n.standfirst || ""));
    (I.events || []).forEach((e) => add("Events", e.title, `${e.kind} · ${J.range(e.start, e.end)}`, J.u.story(e.id), `${e.host} ${e.standfirst || ""}`));
    ((I.publications || {}).workingPapers || []).forEach((p) => add("Working papers", p.title, `WP ${p.no} · ${p.authors} · ${p.year}`, p.url, p.authors));
    return (J._idx = items);
  };
  J.search = (q) => {
    const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return J.searchIndex().map((it) => {
      if (!terms.every((t) => it.hay.includes(t))) return null;
      const tl = it.t.toLowerCase(); let s = 0;
      terms.forEach((t) => { if (tl.startsWith(t)) s += 6; else if (new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(tl)) s += 4; else if (tl.includes(t)) s += 2; else s += 0.5; });
      return { ...it, s };
    }).filter(Boolean).sort((a, b) => b.s - a.s);
  };
  J.mark = (text, q) => {
    let out = J.esc(text);
    q.toLowerCase().trim().split(/\s+/).filter((t) => t.length > 1).forEach((t) => { out = out.replace(new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"), "<mark>$1</mark>"); });
    return out;
  };
  J.resultRow = (r, q, i) => `<a class="res-item" href="${r.u}" role="option" id="res-${i}" aria-selected="false">${r.thumb ? `<img class="thumb" src="${r.thumb}" alt="" loading="lazy">` : `<span class="thumb" aria-hidden="true">${J.esc(r.group[0])}</span>`}<span><span class="t">${J.mark(r.t, q)}</span><br><span class="d">${J.esc(r.d)}</span></span>${/^https?:/.test(r.u) ? '<span class="ext" aria-label="opens the official site"></span>' : ""}</a>`;

  function setupFinder() {
    const box = J.$("#finder"); if (!box) return;
    const panel = J.$(".panel", box), scrim = J.$(".scrim", box), input = J.$("#finder-q"), out = J.$("#finder-results"), full = J.$("[data-full-search]", box);
    let open = false, sel = -1, opener = null;
    const render = () => {
      const q = input.value; full.href = "search.html?q=" + encodeURIComponent(q);
      if (!q.trim()) {
        out.innerHTML = `<div class="res-group"><h3>Popular routes</h3>${[["Find a programme", "programmes.html", "Programmes & admissions"], ["CSITM", "centre.html?id=csitm", "Centre for Software and IT Management"], ["Faculty directory", "faculty.html", "109 people, 11 areas"], ["Upcoming events", "news.html#events", "Seminars, conferences, workshops"]].map((r, i) => J.resultRow({ t: r[0], d: r[2], u: r[1], group: "→" }, "", i)).join("")}</div>`;
      } else {
        const res = J.search(q); const groups = {};
        res.forEach((r) => { (groups[r.group] = groups[r.group] || []).push(r); });
        let i = 0;
        out.innerHTML = Object.keys(groups).length ? Object.entries(groups).map(([g, rs]) => `<div class="res-group"><h3>${g} <span class="mute">${rs.length}</span></h3>${rs.slice(0, 5).map((r) => J.resultRow(r, q, i++)).join("")}</div>`).join("") : `<p class="res-empty">Nothing matches “${J.esc(q)}”. Try a surname, a programme code such as PGP, or a topic such as “digital”.</p>`;
      }
      sel = -1;
    };
    const move = (dir) => {
      const items = J.$$(".res-item", out); if (!items.length) return;
      if (sel >= 0) items[sel].setAttribute("aria-selected", "false");
      sel = (sel + dir + items.length) % items.length;
      items[sel].setAttribute("aria-selected", "true"); items[sel].scrollIntoView({ block: "nearest" });
      input.setAttribute("aria-activedescendant", items[sel].id);
    };
    const openIt = () => {
      if (open) return; open = true; opener = d.activeElement;
      box.hidden = false; box.classList.add("is-open"); lenis && lenis.stop(); d.body.style.overflow = "hidden";
      render();
      const g = G();
      if (g) { g.fromTo(panel, { yPercent: -100 }, { yPercent: 0, duration: 0.75, ease: "expo.out" }); g.fromTo(scrim, { opacity: 0 }, { opacity: 1, duration: 0.5 }); }
      else { panel.style.transform = "none"; scrim.style.opacity = 1; }
      setTimeout(() => input.focus(), J.rm ? 0 : 120);
    };
    const closeIt = () => {
      if (!open) return; open = false;
      const done = () => { box.hidden = true; box.classList.remove("is-open"); lenis && lenis.start(); d.body.style.overflow = ""; opener && opener.focus({ preventScroll: true }); };
      const g = G();
      if (g) { g.to(panel, { yPercent: -100, duration: 0.45, ease: "expo.in" }); g.to(scrim, { opacity: 0, duration: 0.45, onComplete: done }); } else done();
    };
    J.$$("[data-open-search]").forEach((b) => b.addEventListener("click", openIt));
    J.$$("[data-close-search]").forEach((b) => b.addEventListener("click", closeIt));
    input.addEventListener("input", render);
    box.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeIt();
      else if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      else if (e.key === "Enter" && d.activeElement === input) { const it = J.$$(".res-item", out)[Math.max(sel, 0)]; if (it) { e.preventDefault(); it.click(); } else { location.href = full.href; } }
      trap(panel, e);
    });
    d.addEventListener("keydown", (e) => {
      if (e.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(d.activeElement.tagName) && !open) { e.preventDefault(); openIt(); }
    });
    J.openSearch = (q) => { openIt(); if (q) { input.value = q; render(); } };
  }

  /* ---------------------------------------------------------------- page leaf: route transition */
  const LEAF = { "index": ["The Global Leadership Journal", "IIM Bangalore"], "about": ["About IIMB", "The institutional story"], "programmes": ["Programmes & Admissions", "The decision journey"], "programme": ["Programmes & Admissions", "The decision journey"], "research": ["Research", "Ideas in focus"], "theme": ["Research", "Ideas in focus"], "faculty": ["Faculty", "People and ideas"], "person": ["Faculty", "People and ideas"], "partnerships": ["Business Engagement", "Partnership studio"], "news": ["News & Events", "The living institution"], "story": ["News & Events", "The living institution"], "centres": ["Centres", "Research communities"], "centre": ["Centres", "Research communities"], "campus": ["Campus & Student Life", "The IIMB experience"], "industry": ["Recruiters & Alumni", "Beyond the classroom"], "search": ["Search", "Find anything"], "credits": ["Sources & credits", "How this concept was made"] };
  function setupLeaf() {
    const leaf = J.$(".leaf");
    const g = G();
    d.addEventListener("click", (e) => {
      const a = e.target.closest("a[href]");
      if (!a || !g || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target || a.hasAttribute("download")) return;
      if (a.getAttribute("aria-disabled") === "true") { e.preventDefault(); return; }
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || !/\.html$|\/$/.test(url.pathname)) return;
      if (url.pathname === location.pathname && url.search === location.search) { // same page: smooth-scroll to the anchor
        const t = url.hash && d.getElementById(decodeURIComponent(url.hash.slice(1)));
        if (t) { e.preventDefault(); J.scrollTo(t); history.replaceState(null, "", url.hash); t.setAttribute("tabindex", t.getAttribute("tabindex") || "-1"); setTimeout(() => t.focus({ preventScroll: true }), 900); }
        return;
      }
      const page = (url.pathname.split("/").pop() || "index.html").replace(".html", "") || "index";
      const [t, s] = LEAF[page] || LEAF.index;
      e.preventDefault();
      J.$(".ttl", leaf).textContent = J.t(t); J.$(".sub", leaf).textContent = J.t(s);
      try { sessionStorage.setItem("j-leaf", JSON.stringify([J.t(t), J.t(s)])); } catch (_) {}
      J.closeContents && J.$("#contents.is-open") && (J.$("#contents").style.zIndex = 110);
      const tl = g.timeline({ onComplete: () => (location.href = url.href) });
      tl.fromTo(leaf, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "expo.inOut" })
        .fromTo(J.$$(".ttl, .sub", leaf), { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: J.ease, stagger: 0.06 }, 0.22)
        .fromTo(J.$(".rule", leaf), { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "expo.inOut" }, 0.28);
    });
    addEventListener("pageshow", (e) => { if (e.persisted) { h.classList.remove("leaf-in"); leaf.style.clipPath = "inset(100% 0 0 0)"; } });
  }
  function leafOut() {
    const leaf = J.$(".leaf");
    let data = null;
    try { data = JSON.parse(sessionStorage.getItem("j-leaf") || "null"); sessionStorage.removeItem("j-leaf"); } catch (_) {}
    if (!h.classList.contains("leaf-in") || !G()) { h.classList.remove("leaf-in"); return 0; }
    if (data) { J.$(".ttl", leaf).textContent = data[0]; J.$(".sub", leaf).textContent = data[1]; }
    const g = G();
    g.set(leaf, { clipPath: "inset(0% 0% 0% 0%)" }); g.set(J.$(".rule", leaf), { scaleX: 1 });
    h.classList.remove("leaf-in");
    g.to(J.$$(".ttl, .sub, .rule", leaf), { yPercent: -40, autoAlpha: 0, duration: 0.4, ease: "power2.in", stagger: 0.04 });
    g.to(leaf, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.85, ease: "expo.inOut", delay: 0.15, onComplete: () => g.set(J.$$(".ttl, .sub, .rule", leaf), { clearProps: "all" }) });
    return 0.55;
  }

  /* ---------------------------------------------------------------- media */
  J.filmTile = (id, title, { thumb } = {}) => `<button class="film" type="button" data-yt="${id}" aria-label="Play film: ${J.esc(title)} (loads YouTube)"><img src="${thumb || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`}" alt="" loading="lazy" width="480" height="360"><span class="play"><i>${J.icon("play")}</i><span>${J.esc(title)}</span></span></button>`;
  function setupFilms() {
    d.addEventListener("click", (e) => {
      const b = e.target.closest("[data-yt]"); if (!b) return;
      const f = d.createElement("iframe");
      f.src = `https://www.youtube-nocookie.com/embed/${b.dataset.yt}?autoplay=1&rel=0`;
      f.title = b.getAttribute("aria-label").replace("Play film: ", "").replace(" (loads YouTube)", "");
      f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen"; f.allowFullscreen = true;
      const wrap = d.createElement("div"); wrap.className = "film"; wrap.appendChild(f);
      b.replaceWith(wrap);
    });
  }
  /* Films play continuously, muted and looping, with no controls (IIMB decision, 24 Oct 2026).
     They pause only while off-screen or in a background tab, to save power; save-data keeps the poster. */
  J.bgFilm = (video) => {
    if (!video) return;
    const saveData = navigator.connection && navigator.connection.saveData;
    if (saveData) return;
    // reduced-motion visitors keep the still poster, with a play control if they want the film
    if (J.rm) { video.removeAttribute("autoplay"); video.pause(); if (!video.src && video.dataset.src) { video.preload = "none"; video.src = video.dataset.src; } video.controls = true; return; }
    video.muted = true; video.loop = true; video.playsInline = true; video.removeAttribute("controls");
    if (!video.src && video.dataset.src) video.src = video.dataset.src;
    const tryPlay = () => { const p = video.play(); if (p && p.catch) p.catch(() => {}); };
    video.preload = "auto"; tryPlay();
    new IntersectionObserver(([en]) => (en.isIntersecting ? tryPlay() : video.pause()), { threshold: 0.02 }).observe(video);
    d.addEventListener("visibilitychange", () => (d.hidden ? video.pause() : tryPlay()));
  };

  /* Draggable horizontal rails (mouse drag + wheel-free, keyboard via native scroll). */
  J.dragRail = (rail) => {
    if (!rail) return;
    let down = false, sx = 0, sl = 0, moved = false;
    rail.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse" || rail.closest(".pc-pinned")) return; down = true; moved = false; sx = e.clientX; sl = rail.scrollLeft; rail.classList.add("dragging"); });
    addEventListener("pointermove", (e) => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true; rail.scrollLeft = sl - dx; });
    addEventListener("pointerup", () => { down = false; rail.classList.remove("dragging"); });
    rail.addEventListener("click", (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
  };

  /* Card carousel shared by the homepage and Programmes (after the second design): programme cards, arrows, drag, dots. */
  J.progCard = (p) => { const first = String(p.summary).match(/^.*?[.!?](\s|$)/); return `<li class="pc-card"><a href="${J.u.prog(p.id)}">
      <span class="pc-img">${J.img(p.img, { want: 800, sizes: "(max-width: 760px) 80vw, 380px", alt: "" })}</span>
      <span class="pc-body"><span class="pc-level">${J.esc(p.level)}</span><span class="pc-name">${J.esc(p.name)}</span><span class="pc-rule" aria-hidden="true"></span>
      <span class="pc-desc">${J.esc((first ? first[0] : p.summary).trim())}</span><span class="pc-go"><span>Explore programme</span>${J.icon("arrow")}</span></span></a></li>`; };
  J.carousel = (root) => {
    const rail = J.$("[data-pc-rail]", root), track = J.$("[data-pc-track]", root), prev = J.$("[data-pc-prev]", root), next = J.$("[data-pc-next]", root), dotsBox = J.$("[data-pc-dots]", root);
    if (!rail || !track) return;
    J.dragRail(rail);
    const cards = J.$$(".pc-card", track);
    if (dotsBox) dotsBox.innerHTML = `<span class="pc-prog" aria-hidden="true"><i data-pc-fill></i></span><span class="pc-count num" data-pc-count>01 / ${String(cards.length).padStart(2, "0")}</span>`;
    const step = () => { const c = cards[0]; return c ? c.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 24) : 400; };
    let pin = null;
    const setProgress = (p) => {
      const fill = J.$("[data-pc-fill]", root); if (fill) fill.style.transform = `scaleX(${Math.max(0.04, p)})`;
      const cnt = J.$("[data-pc-count]", root); if (cnt) cnt.textContent = `${String(Math.min(cards.length, 1 + Math.round(p * (cards.length - 1)))).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
      if (prev) prev.disabled = p < 0.01; if (next) next.disabled = p > 0.99;
    };
    const go = (dir) => {
      if (pin && pin.isActive !== undefined && root.classList.contains("pc-pinned")) {
        const y = Math.min(pin.end, Math.max(pin.start, scrollY + dir * step()));
        J.lenis ? J.lenis.scrollTo(y, { duration: 0.9 }) : scrollTo({ top: y, behavior: J.rm ? "auto" : "smooth" });
      } else rail.scrollBy({ left: dir * step(), behavior: J.rm ? "auto" : "smooth" });
    };
    prev && prev.addEventListener("click", () => go(-1));
    next && next.addEventListener("click", () => go(1));
    rail.addEventListener("scroll", () => requestAnimationFrame(() => { if (!root.classList.contains("pc-pinned")) setProgress(rail.scrollLeft / Math.max(1, rail.scrollWidth - rail.clientWidth)); }), { passive: true });
    setProgress(0);
    const g = G();
    if (!g) return;
    g.fromTo(cards, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.85, ease: J.ease, stagger: 0.07, clearProps: "transform,opacity,visibility", scrollTrigger: { trigger: rail, start: "top 94%", once: true } });
    g.fromTo(J.$$(".pc-img", track), { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "expo.inOut", stagger: 0.07, clearProps: "clipPath", scrollTrigger: { trigger: rail, start: "top 94%", once: true } });
    const mm = g.matchMedia();
    mm.add("(min-width: 1000px) and (min-height: 700px)", () => {
      root.classList.add("pc-pinned");
      rail.scrollLeft = 0;
      const head = () => parseFloat(getComputedStyle(d.documentElement).getPropertyValue("--header-h")) || 76;
      const dist = () => Math.max(0, track.scrollWidth - rail.clientWidth + 8);
      const tw = g.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: root, start: () => "top " + head(), end: () => "+=" + dist(), pin: true, scrub: 0.7, invalidateOnRefresh: true, anticipatePin: 1, onUpdate: (st) => setProgress(st.progress) } });
      pin = tw.scrollTrigger;
      /* each card comes into focus as it crosses the middle of the screen */
      cards.forEach((c) => ScrollTrigger.create({ trigger: c, containerAnimation: tw, start: "left 70%", end: "right 30%", toggleClass: "in-focus" }));
      return () => { root.classList.remove("pc-pinned"); pin = null; g.set(track, { clearProps: "transform" }); };
    });
  };

  /* ---------------------------------------------------------------- boot */
  let pageRender = null, pageIntro = null;
  /* ---------------------------------------------------------------- rankings (IIMB minutes, 26 Oct 2026: more prominent, one card everywhere) */
  J.ord = (n) => { const s = ["th", "st", "nd", "rd"], v = n % 100; return s[(v - 20) % 10] || s[v] || s[0]; };
  J.rankCard = (r) => {
    const prog = r.prog && J.prog(r.prog);
    const world = /in the world/.test(r.scope) && r.n <= 100;
    return `<article class="rkc${r.feature ? " rkc-feature" : ""}">
      <p class="rkc-by">${J.esc(r.by)} <span>${r.year}</span></p>
      <p class="rkc-n">${r.pre ? `<span class="rkc-pre">${J.esc(r.pre)}</span>` : `<span class="rkc-hash" aria-hidden="true">#</span>`}<span class="num" data-count>${r.n}</span></p>
      <h3 class="rkc-what">${J.esc(r.what)}${prog ? ` <a class="rkc-prog" href="${J.u.prog(prog.id)}">${J.esc(prog.short)}</a>` : ""}</h3>
      <p class="rkc-scope">${J.esc(r.scope)}</p>
      ${world ? `<span class="rkc-scale" style="--p:${Math.max(r.n, 1)}" aria-hidden="true"><span class="rkc-track"><i data-grow></i><b></b></span><span class="rkc-ends"><span>1</span><span>Global top 100</span><span>100</span></span></span>` : ""}
      <p class="rkc-src">Source: ${J.srcLink(r.src, "iimb.ac.in")}</p>
    </article>`;
  };
  J.rankRow = (r) => {
    const prog = r.prog && J.prog(r.prog), src = (I.sources || {})[r.src];
    return `<li class="rkl-row"><span class="rkl-n"><span class="rkl-hash" aria-hidden="true">#</span><span class="num" data-count>${r.n}</span></span>
      <span class="rkl-body"><span class="rkl-what">${J.esc(r.what)}${prog ? ` <a class="rkl-prog" href="${J.u.prog(prog.id)}">${J.esc(prog.short)}</a>` : ""}</span><span class="rkl-scope">${J.esc(r.scope)}</span></span>
      <span class="rkl-by">${J.esc(r.by)}<b>${r.year}</b></span>
      ${src ? `<a class="rkl-src" href="${src.u}" aria-label="Official announcement: ${J.esc(src.t)}">${J.icon("arrow-up")}</a>` : "<span></span>"}
      <i class="rkl-rule" data-grow aria-hidden="true"></i></li>`;
  };
  J.rankLedger = (list, { feature = true } = {}) => {
    const f = feature && list.find((r) => r.feature), rest = list.filter((r) => r !== f);
    const fsrc = f && (I.sources || {})[f.src];
    return `<div class="rkl${f ? " has-feature" : ""}" data-bars>${f ? `<aside class="rkl-feature"><p class="rkl-f-by">${J.esc(f.by)} · ${f.year}</p><p class="rkl-f-n"><span class="rkl-f-pre">${J.esc(f.pre || "")}</span><span class="num" data-count>${f.n}</span></p><h3 class="rkl-f-what">${J.esc(f.what)}</h3><p class="rkl-f-note">${J.esc(f.scope)}</p>${fsrc ? `<p class="rkl-f-src">Source: <a href="${fsrc.u}">${J.esc(fsrc.t)}</a></p>` : ""}</aside>` : ""}<ol class="rkl-list">${rest.map(J.rankRow).join("")}</ol></div>`;
  };
  J.rankGrid = (list) => J.rankLedger(list);
  J.ranksFor = (progId) => (I.rankCards || []).filter((r) => (progId ? r.prog === progId : true));

  /* Gradual ink: each word goes from a faint trace to full ink, tied to the scroll, finished well before the next section. */
  J.inkReveal = (el) => {
    const g = G(); if (!g || !el) return;
    const text = el.textContent.trim();
    el.innerHTML = text.split(/(\s+)/).map((w) => (/^\s+$/.test(w) ? w : `<span class="ink-w">${J.esc(w)}</span>`)).join("");
    el.setAttribute("aria-label", text);
    const words = J.$$(".ink-w", el);
    words.forEach((w) => w.setAttribute("aria-hidden", "true"));
    g.fromTo(words, { opacity: 0.16 }, { opacity: 1, ease: "none", stagger: 0.12, scrollTrigger: { trigger: el, start: "top 88%", end: "bottom 62%", scrub: 0.5 } });
  };

  /* ---------------------------------------------------------------- data graphics for batch profiles and placements */
  J.tiles = (tiles, cls = "") => `<dl class="stat-tiles ${cls}" data-stagger>${tiles.map((t) => `<div><dt class="num" data-count>${J.esc(t.v)}</dt><dd>${J.esc(t.l)}</dd></div>`).join("")}</dl>`;
  J.genderSplit = (f, m) => {
    const t = f + m, pf = Math.round((f / t) * 100);
    return `<div class="gsplit" data-bars role="img" aria-label="Women ${f}, men ${m}"><div class="gs-bar"><i class="gs-f" style="--w:${pf}%" data-grow></i><i class="gs-m" data-grow></i></div><div class="gs-keys"><span><b class="num">${pf}%</b> women · ${f}</span><span><b class="num">${100 - pf}%</b> men · ${m}</span></div></div>`;
  };
  J.bars = (rows, { pct = true, unit = "" } = {}) => {
    const max = Math.max(...rows.map((r) => r[1])), sum = rows.reduce((a, r) => a + r[1], 0);
    return `<ol class="bx" data-bars>${rows.map(([l, v]) => `<li${v === max ? ' class="max"' : ""}><span class="bx-l">${J.esc(l)}</span><span class="bx-t"><i style="--w:${Math.max((v / max) * 100, 1.5)}%" data-grow></i></span><span class="bx-v"><b class="num">${v}${unit}</b>${pct && !unit ? `<small>${Math.round((v / sum) * 100)}%</small>` : ""}</span></li>`).join("")}</ol>`;
  };
  J.gmatRange = (g) => {
    const lo = 600, hi = 800, at = (v) => ((v - lo) / (hi - lo)) * 100;
    const ends = [["low", g.low], ["high", g.high]].map(([k, v]) => `<span class="rng-end rng-${k}" style="left:${at(v)}%"><b class="num">${v}</b><small>${k === "low" ? "Low" : "High"}</small></span>`).join("");
    return `<div class="rng" data-bars><p class="rng-t">${J.esc(g.label)}</p><div class="rng-track"><i class="rng-span" style="left:${at(g.low)}%;right:${100 - at(g.high)}%" data-grow></i>${ends}<span class="rng-mark" style="left:${at(g.avg)}%"><b class="num">${g.avg}</b><small>Average</small></span>${g.median ? `<span class="rng-mark rng-med" style="left:${at(g.median)}%"><b class="num">${g.median}</b><small>Median</small></span>` : ""}</div></div>`;
  };
  J.series = (years, series) => {
    const max = Math.max(...series.flatMap((s) => s.v));
    return `<div class="ser" data-bars><div class="ser-keys">${series.map((s, i) => `<span class="k${i}">${J.esc(s.t)}</span>`).join("")}</div><ol class="ser-cols">${years.map((y, yi) => `<li><span class="ser-bars">${series.map((s, i) => `<span class="ser-bar k${i}" style="--h:${(s.v[yi] / max) * 100}%" data-grow="y"><b class="num">${s.v[yi]}</b></span>`).join("")}</span><span class="ser-y">${y}</span></li>`).join("")}</ol></div>`;
  };

  /* Composition as a ring: segments sweep round on reveal; the legend carries the numbers */
  const RING = ["#631111", "#A92D2D", "#C9776F", "#E0B7AE", "#8A8A8A", "#BDBDBD", "#D9D3CA", "#4A4A4A"];
  J.ring = (rows, { centre, centreLabel, colors = RING } = {}) => {
    const sum = rows.reduce((a, r) => a + r[1], 0);
    let acc = 0;
    const stops = rows.map(([, v], i) => { const a0 = (acc / sum) * 360; acc += v; const a1 = (acc / sum) * 360; return `${colors[i % colors.length]} calc(var(--k) * ${a0.toFixed(2)}deg) calc(var(--k) * ${a1.toFixed(2)}deg)`; });
    const top = rows.reduce((m, r) => (r[1] > m[1] ? r : m), rows[0]);
    const c = centre ?? `${Math.round((top[1] / sum) * 100)}%`, cl = centreLabel ?? top[0];
    return `<div class="ring" data-ring><div class="ring-dial" style="--k:1;background:conic-gradient(${stops.join(", ")}, var(--rule) calc(var(--k) * 360deg) 360deg)" role="img" aria-label="${J.esc(rows.map(([l, v]) => `${l} ${v}`).join(", "))}"><div class="ring-hole"><b class="num">${J.esc(c)}</b><span>${J.esc(cl)}</span></div></div>
      <ul class="ring-key">${rows.map(([l, v], i) => `<li><i style="background:${colors[i % colors.length]}"></i><span class="rk-l">${J.esc(l)}</span><b class="num">${v}</b><small>${Math.round((v / sum) * 100)}%</small></li>`).join("")}</ul></div>`;
  };
  /* Ordered ranges (experience, age) as columns */
  J.columns = (rows, { unit = "" } = {}) => {
    const max = Math.max(...rows.map((r) => r[1])), sum = rows.reduce((a, r) => a + r[1], 0);
    return `<div class="cols" data-bars><ol>${rows.map(([l, v]) => `<li${v === max ? ' class="max"' : ""}><span class="col-v"><b class="num">${v}</b><small>${Math.round((v / sum) * 100)}%</small></span><span class="col-track"><i style="--h:${Math.max((v / max) * 100, 2)}%" data-grow="y"></i></span><span class="col-l">${J.esc(l)}</span></li>`).join("")}</ol>${unit ? `<p class="col-unit">${J.esc(unit)}</p>` : ""}</div>`;
  };

  /* ---------------------------------------------------------------- "On this page": an index that hangs from the corner once you scroll past the opening */
  J.hangIndex = (items, { label = "On this page", start, after } = {}) => {
    items = items.filter((it) => J.$("#" + it.id));
    if (items.length < 2) return null;
    const nav = d.createElement("nav");
    nav.className = "hang"; nav.setAttribute("aria-label", label);
    nav.innerHTML = `<div class="hang-panel" id="hang-list" hidden><p class="hang-h">${J.esc(label)}</p><ol>${items.map((it, i) => `<li><a href="#${it.id}" data-hang="${it.id}"><span class="num">${String(i + 1).padStart(2, "0")}</span><span>${J.esc(it.t)}</span></a></li>`).join("")}</ol></div>
      <button class="hang-btn" type="button" aria-expanded="false" aria-controls="hang-list"><span class="hang-k">${J.esc(label)}</span><span class="hang-cur" data-hang-cur>${J.esc(items[0].t)}</span><span class="hang-n num" data-hang-n>1/${items.length}</span><svg class="ico hang-ch" aria-hidden="true"><use href="#i-chev-r"/></svg><i class="hang-prog" data-hang-prog></i></button>`;
    d.body.appendChild(nav);
    const btn = J.$(".hang-btn", nav), panel = J.$(".hang-panel", nav);
    const set = (open) => { panel.hidden = !open; btn.setAttribute("aria-expanded", String(open)); nav.classList.toggle("open", open); };
    btn.addEventListener("click", () => set(panel.hidden));
    d.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden) { set(false); btn.focus(); } });
    d.addEventListener("click", (e) => { if (!nav.contains(e.target)) set(false); });
    J.$$("[data-hang]", nav).forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); set(false); J.scrollTo("#" + a.dataset.hang); history.replaceState(null, "", "#" + a.dataset.hang); }));
    const startEl = (start && J.$(start)) || J.$("#" + items[0].id), afterEl = after && J.$(after), foot = J.$(".site-footer");
    let cur = -1, raf = 0;
    const tick = () => {
      raf = 0;
      const shown = (afterEl ? afterEl.getBoundingClientRect().bottom < 0 : startEl.getBoundingClientRect().top < innerHeight * 0.6) && (!foot || foot.getBoundingClientRect().top > innerHeight * 0.85);
      nav.classList.toggle("show", shown);
      if (!shown && !panel.hidden) set(false);
      let i = 0;
      items.forEach((it, k) => { const el = J.$("#" + it.id); if (el && el.getBoundingClientRect().top < innerHeight * 0.35) i = k; });
      if (i !== cur) {
        cur = i;
        J.$("[data-hang-cur]", nav).textContent = J.t(items[i].t);
        J.$("[data-hang-n]", nav).textContent = `${i + 1}/${items.length}`;
        J.$$("[data-hang]", nav).forEach((a, k) => a.classList.toggle("on", k === i));
      }
      const first = J.$("#" + items[0].id).getBoundingClientRect().top + scrollY;
      const last = (foot ? foot.getBoundingClientRect().top + scrollY : d.documentElement.scrollHeight) - innerHeight;
      J.$("[data-hang-prog]", nav).style.transform = `scaleX(${Math.min(1, Math.max(0, (scrollY - first + innerHeight * 0.35) / Math.max(1, last - first)))})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    tick();
    return nav;
  };

  J.page = (render, intro) => { pageRender = render; pageIntro = intro; };
  J.defaultIntro = (delay) => {
    const g = G(); if (!g) return;
    const tl = g.timeline({ delay });
    tl.fromTo(".site-header", { y: -24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: J.ease }, 0);
    J.$$("[data-intro]:not(.site-header)").forEach((el, i) => {
      if (el.hasAttribute("data-split")) tl.add(J.linesIn(el), 0.1 + i * 0.08);
      else if (el.hasAttribute("data-plate")) tl.add(J.plateIn(el), 0.05 + i * 0.06);
      else tl.fromTo(el, { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: J.ease }, 0.2 + i * 0.07);
    });
    return tl;
  };

  /* White / cream rhythm: top-level sections alternate, page by page (IIMB decision, 24 Oct 2026). */
  function alternate() {
    const secs = J.$$("main > section, main > article > section, main > article > header, main > article > div > section, main > div > section, main > article > [data-cn-body] > section").filter((s) => !s.hasAttribute("data-keep-bg") && !s.hidden && (s.checkVisibility ? s.checkVisibility() : s.offsetHeight > 0));
    let i = 0;
    secs.forEach((s) => { s.classList.remove("bg-white", "bg-cream"); s.classList.add(i++ % 2 ? "bg-cream" : "bg-white"); });
  }
  J.alternate = alternate;
  function setupLang() {
    h.lang = J.lang === "hi" ? "hi" : "en-IN";
    h.classList.toggle("lang-hi", J.lang === "hi");
    J.$$("[data-lang-toggle]").forEach((b) => {
      b.textContent = J.lang === "hi" ? "English" : "हिन्दी";
      b.setAttribute("lang", J.lang === "hi" ? "en" : "hi");
      b.setAttribute("aria-label", J.lang === "hi" ? "Switch the site to English" : "साइट को हिन्दी में देखें (Switch the site to Hindi)");
      b.addEventListener("click", () => { try { localStorage.setItem("j-lang", J.lang === "hi" ? "en" : "hi"); } catch (_) {} location.reload(); });
    });
  }

  function boot() {
    setupLang();
    setupScroll(); setupHeader(); setupContents(); setupFinder(); setupLeaf(); setupFilms();
    J.$$("[data-photo]").forEach((el) => { if (!el.innerHTML.trim()) el.innerHTML = J.img(el.dataset.photo, { lazy: !el.hasAttribute("data-eager"), sizes: el.dataset.sizes || "(min-width: 1000px) 60vw, 100vw" }); });
    try { pageRender && pageRender(); } catch (err) { console.error(err); const m = J.$("#main"); m && m.insertAdjacentHTML("afterbegin", `<div class="wrap"><p class="placeholder-note">This section could not be rendered: ${J.esc(err.message)}</p></div>`); }
    alternate();
    J.$$("video[data-film]").forEach((v) => J.bgFilm(v));
    if (J.lang === "hi") {
      J.translate(d.body);
      new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach((n) => { if (n.nodeType === 1) J.translate(n); else if (n.nodeType === 3 && n.parentElement) J.translate(n.parentElement); }))).observe(d.body, { childList: true, subtree: true });
      d.title = trText(d.title) || d.title;
    }
    const g = G();
    if (g) {
      // hide intro items before the first frame; mp class kept them hidden until now
      J.$$("[data-intro]").forEach((el) => { if (!el.hasAttribute("data-split")) g.set(el, { autoAlpha: 0 }); });
    }
    h.classList.remove("mp");
    const delay = leafOut();
    if (g) {
      if (pageIntro) pageIntro(delay); else J.defaultIntro(delay);
      setTimeout(() => { J.reveals(); ScrollTrigger.refresh(); }, (delay + 0.1) * 1000);
      addEventListener("load", () => ScrollTrigger.refresh());
    } else {
      J.$$("[data-intro],[data-split]").forEach((el) => (el.style.visibility = "visible"));
      J.reveals();
    }
    if (location.hash) { const t = J.$(location.hash); if (t) setTimeout(() => J.scrollTo(t), 600); }
  }
  // scripts are deferred: they run while readyState is "interactive", before DOMContentLoaded, so wait for it
  if (d.readyState !== "complete") d.addEventListener("DOMContentLoaded", boot); else setTimeout(boot, 0);
})();
