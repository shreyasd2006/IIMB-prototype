"""One-off (26 Oct 2026, second pass): rankings as an editorial standings list; gradual ink reveal for the Home brief;
programme strip pinned and moved sideways by the scroll (as the About milestones); hover zoom fixed (entrance clears its transform)."""
import os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
p = os.path.join(ROOT, "assets", "js", "core.js")
s = open(p, encoding="utf-8").read()

# 1. rankings: standings list with one featured result
a = s.index("  J.rankGrid = (list, cls = \"\") =>"); b = s.index("\n", a)
s = s[:a] + '''  J.rankRow = (r) => {
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
  J.rankGrid = (list) => J.rankLedger(list);''' + s[b:]

# 2. ink reveal: words darken as the reader scrolls, complete before the paragraph leaves
a = "  /* ---------------------------------------------------------------- data graphics for batch profiles and placements */"
assert a in s
s = s.replace(a, '''  /* Gradual ink: each word goes from a faint trace to full ink, tied to the scroll, finished well before the next section. */
  J.inkReveal = (el) => {
    const g = G(); if (!g || !el) return;
    const text = el.textContent.trim();
    el.innerHTML = text.split(/(\\s+)/).map((w) => (/^\\s+$/.test(w) ? w : `<span class="ink-w">${J.esc(w)}</span>`)).join("");
    el.setAttribute("aria-label", text);
    const words = J.$$(".ink-w", el);
    words.forEach((w) => w.setAttribute("aria-hidden", "true"));
    g.fromTo(words, { opacity: 0.16 }, { opacity: 1, ease: "none", stagger: 0.12, scrollTrigger: { trigger: el, start: "top 88%", end: "bottom 62%", scrub: 0.5 } });
  };

''' + a, 1)

# 3. carousel: pinned sideways motion on wide screens, swipe rail on small ones; hover zoom no longer blocked
a = s.index("  J.carousel = (root) => {"); b = s.index("\n  };\n", a) + len("\n  };\n")
s = s[:a] + '''  J.carousel = (root) => {
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
''' + s[b:]

# drag only when the rail scrolls natively
s = s.replace('rail.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") return; down = true;',
              'rail.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse" || rail.closest(".pc-pinned")) return; down = true;')
open(p, "w", encoding="utf-8", newline="\n").write(s)
print("core motion patched")
