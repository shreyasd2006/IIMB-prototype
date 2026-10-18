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
  J.months = MONTHS;
  J.date = (iso, style = "long") => {
    if (!iso) return "";
    const [y, m, dd] = iso.split("-").map(Number);
    if (style === "short") return `${dd} ${MONTHS[m - 1].slice(0, 3)} ${y}`;
    if (style === "dm") return `${dd} ${MONTHS[m - 1].slice(0, 3)}`;
    return `${dd} ${MONTHS[m - 1]} ${y}`;
  };
  J.range = (a, b) => {
    if (!b || a === b) return J.date(a);
    const [y1, m1, d1] = a.split("-").map(Number), [y2, m2, d2] = b.split("-").map(Number);
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
    return g.fromTo(s.lines, { yPercent: 112, rotate: o.rotate ?? 1.5 }, { yPercent: 0, rotate: 0, duration: o.dur ?? 1.15, ease: J.ease, stagger: o.stagger ?? 0.085, delay: o.delay ?? 0, onComplete: () => { if (!o.keep) s.revert(); } });
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
  const autoRevealSel = "[data-split],[data-plate],[data-rule],[data-stagger],[data-fade],[data-count],[data-parallax]";
  J.reveals = (root = d) => {
    const g = G();
    const els = J.$$(autoRevealSel, root).filter((e) => !e.closest("[data-manual]") && !e._rev);
    if (!g) { els.forEach((e) => { e._rev = 1; e.style.visibility = "visible"; }); return; }
    els.forEach((el) => {
      el._rev = 1;
      const st = { trigger: el, start: "top 88%", once: true };
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
        g.fromTo(kids, { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: J.ease, stagger: Math.min(0.08, 0.7 / Math.max(kids.length, 1)), scrollTrigger: { ...st, start: "top 90%" } });
      } else if (el.hasAttribute("data-fade")) {
        g.fromTo(el, { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, ease: J.ease, delay: +(el.dataset.delay || 0), scrollTrigger: st });
      } else if (el.hasAttribute("data-count")) {
        const txt = el.textContent, m = txt.match(/[\d,.]+/);
        if (!m) return;
        const target = parseFloat(m[0].replace(/,/g, "")), dec = (m[0].split(".")[1] || "").length, obj = { v: 0 };
        el.textContent = txt.replace(m[0], "0");
        g.to(obj, { v: target, duration: 1.8, ease: "power3.out", scrollTrigger: st, onUpdate: () => { const n = obj.v.toFixed(dec); el.textContent = txt.replace(m[0], m[0].includes(",") ? Number(n).toLocaleString("en-IN") : n); }, onComplete: () => (el.textContent = txt) });
      } else if (el.hasAttribute("data-parallax")) {
        const amt = +(el.dataset.parallax || 12), media = el.querySelector("img, video") || el;
        g.fromTo(media, { yPercent: -amt, scale: 1 + amt / 50 }, { yPercent: amt, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      }
    });
  };

  /* Row-by-row reveal for long lists: only items below the fold start hidden. */
  J.batchIn = (sel, o = {}) => {
    const g = G(); if (!g || !window.ScrollTrigger) return;
    g.set(J.$$(sel).filter((e) => e.getBoundingClientRect().top > innerHeight), { autoAlpha: 0, y: 34 });
    ScrollTrigger.batch(sel, { start: "top 92%", once: true, onEnter: (els) => g.to(els, { autoAlpha: 1, y: 0, duration: o.dur || 0.9, stagger: 0.06, ease: J.ease, overwrite: true }) });
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
      if (!J.rm && !d.body.classList.contains("no-hide")) hd.classList.toggle("is-hidden", y > 420 && y > last + 2 && !hd.contains(d.activeElement));
      if (y < last - 2 || y < 200) hd.classList.remove("is-hidden");
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
      J.$(".ttl", leaf).textContent = t; J.$(".sub", leaf).textContent = s;
      try { sessionStorage.setItem("j-leaf", JSON.stringify([t, s])); } catch (_) {}
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
  /* Background films: play only on screen; pause control; reduced motion and save-data keep the poster. */
  J.bgFilm = (video, btn) => {
    if (!video) return;
    const saveData = navigator.connection && navigator.connection.saveData;
    let userPaused = J.rm || saveData;
    const set = (playing) => { if (!btn) return; btn.setAttribute("aria-pressed", playing ? "false" : "true"); btn.innerHTML = playing ? `${J.icon("pause")}<span class="sr">Pause the film</span>` : `${J.icon("play")}<span class="sr">Play the film</span>`; };
    const tryPlay = () => { const p = video.play(); if (p && p.catch) p.catch(() => set(false)); };
    if (!userPaused) { video.preload = "auto"; tryPlay(); }
    set(!userPaused);
    new IntersectionObserver(([en]) => { if (userPaused) return; en.isIntersecting ? tryPlay() : video.pause(); }, { threshold: 0.05 }).observe(video);
    d.addEventListener("visibilitychange", () => { if (d.hidden) video.pause(); else if (!userPaused) tryPlay(); });
    btn && btn.addEventListener("click", () => { userPaused = !video.paused; if (userPaused) video.pause(); else { video.preload = "auto"; tryPlay(); } set(!userPaused); });
    video.addEventListener("play", () => set(true)); video.addEventListener("pause", () => set(false));
  };

  /* Draggable horizontal rails (mouse drag + wheel-free, keyboard via native scroll). */
  J.dragRail = (rail) => {
    if (!rail) return;
    let down = false, sx = 0, sl = 0, moved = false;
    rail.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") return; down = true; moved = false; sx = e.clientX; sl = rail.scrollLeft; rail.classList.add("dragging"); });
    addEventListener("pointermove", (e) => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true; rail.scrollLeft = sl - dx; });
    addEventListener("pointerup", () => { down = false; rail.classList.remove("dragging"); });
    rail.addEventListener("click", (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
  };

  /* ---------------------------------------------------------------- boot */
  let pageRender = null, pageIntro = null;
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

  function boot() {
    setupScroll(); setupHeader(); setupContents(); setupFinder(); setupLeaf(); setupFilms();
    J.$$("[data-photo]").forEach((el) => { if (!el.innerHTML.trim()) el.innerHTML = J.img(el.dataset.photo, { lazy: !el.hasAttribute("data-eager"), sizes: el.dataset.sizes || "(min-width: 1000px) 60vw, 100vw" }); });
    try { pageRender && pageRender(); } catch (err) { console.error(err); const m = J.$("#main"); m && m.insertAdjacentHTML("afterbegin", `<div class="wrap"><p class="placeholder-note">This section could not be rendered: ${J.esc(err.message)}</p></div>`); }
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
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", boot); else setTimeout(boot, 0);
})();
