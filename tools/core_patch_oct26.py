"""One-off (26 Oct 2026): insert ranking cards, data graphics and the hanging index into core.js; bars grow on reveal."""
import os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
p = os.path.join(ROOT, "assets", "js", "core.js")
s = open(p, encoding="utf-8").read()
add = open(os.path.join(ROOT, "tools", "core_add_oct26.js"), encoding="utf-8").read()
a = "  J.page = (render, intro) =>"
assert a in s and "J.hangIndex" not in s
s = s.replace(a, add + a, 1)
old = 'const autoRevealSel = "[data-split],[data-plate],[data-rule],[data-stagger],[data-fade],[data-count],[data-parallax]";'
assert old in s
s = s.replace(old, old[:-2] + ',[data-bars]";')
a = """      } else if (el.hasAttribute("data-count")) {
        J.countUp(el, st);"""
b = """      } else if (el.hasAttribute("data-bars")) {
        const grow = J.$$("[data-grow]", el);
        g.set(grow.filter((x) => x.dataset.grow !== "y"), { scaleX: 0, transformOrigin: "0% 50%" });
        g.set(grow.filter((x) => x.dataset.grow === "y"), { scaleY: 0, transformOrigin: "50% 100%" });
        ScrollTrigger.create({ ...st, start: "top 88%", onEnter: () => g.to(grow, { scaleX: 1, scaleY: 1, duration: 1.1, ease: "expo.out", stagger: Math.min(0.06, 0.6 / Math.max(grow.length, 1)) }) });
        J.$$("[data-count]", el).forEach((c) => { c._rev = 1; J.countUp(c, st); });
      } else if (el.hasAttribute("data-count")) {
        J.countUp(el, st);"""
assert a in s
s = s.replace(a, b, 1)
open(p, "w", encoding="utf-8", newline="\n").write(s)
print("core patched")
