"""One-off (24 Oct 2026): About page follows the original iimb.ac.in About order and gains the missing sections."""
import os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

p = os.path.join(ROOT, "src", "pages", "about.html")
s = open(p, encoding="utf-8").read()
a = s.index('<dl class="id-colours" data-stagger>'); b = s.index("</dl>", a) + 5
s = s[:a] + '''<dl class="id-colours" data-stagger>
        <div><dt><span class="sw" style="background:#A92D2D"></span>Red</dt><dd>#A92D2D, primary colour in the IIMB Color Guide</dd></div>
        <div><dt><span class="sw" style="background:#631111"></span>Maroon</dt><dd>#631111, primary colour in the IIMB Color Guide</dd></div>
        <div><dt><span class="sw" style="background:#E8E3DB"></span>Cream</dt><dd>#E8E3DB, primary colour in the IIMB Color Guide</dd></div>
      </dl>''' + s[b:]
a = s.index('<section class="section ab-lead" id="leadership"')
s = s[:a] + open(os.path.join(ROOT, "tools", "about_tail.html"), encoding="utf-8").read()
open(p, "w", encoding="utf-8", newline="\n").write(s)

p = os.path.join(ROOT, "assets", "js", "pages", "about.js")
s = open(p, encoding="utf-8").read()
old = '''    $("[data-accred]").textContent = A.accreditation;
    $("[data-gnam]").textContent = A.gnam;'''
assert old in s
s = s.replace(old, open(os.path.join(ROOT, "tools", "about_js_insert.txt"), encoding="utf-8").read().rstrip("\n"))
s = s.replace('$("[data-docs]").innerHTML = L.governanceDocs.map(', '$("[data-docs]").innerHTML = L.governanceDocs.filter((d) => !/IIM Act|IIM Rules/.test(d.t)).map(')
open(p, "w", encoding="utf-8", newline="\n").write(s)
print("about updated")
