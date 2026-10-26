"""One-off (26 Oct 2026, IIMB minutes): About keeps every original section; IIM Act and Rules and the International
Advisory Committee are redesigned with the full official content; rankings use the shared cards; hanging index."""
import os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def rw(rel, fn):
    p = os.path.join(ROOT, rel); s = open(p, encoding="utf-8").read(); s2 = fn(s)
    open(p, "w", encoding="utf-8", newline="\n").write(s2)

ACT_HTML = '''<section class="section ab-act" id="act" aria-labelledby="act-h">
  <div class="wrap act-in">
    <div class="act-intro">
      <p class="meta act-k">Governance</p>
      <h2 class="h1" id="act-h" data-split>IIM Act and Rules</h2>
      <p class="dek" data-fade>Under the Indian Institutes of Management Act of 2017, IIMB is an Institute of National Importance. The Act, the Rules made under it and their amendments, and the Institute’s own Regulations set out how IIMB is governed and the degrees it awards.</p>
      <p class="src">Documents as listed on <a class="ulink" href="https://www.iimb.ac.in/iim-act-rules">IIM Act and Rules, iimb.ac.in</a>.</p>
    </div>
    <ol class="act-docs" data-act data-stagger></ol>
  </div>
</section>'''

IAC_HTML = '''<section class="section ab-iac" id="iac" aria-labelledby="iac-h">
  <div class="wrap">
    <div class="iac-head">
      <div>
        <p class="meta act-k">Global counsel</p>
        <h2 class="h1" id="iac-h" data-split>International Advisory Committee</h2>
      </div>
      <p class="dek" data-fade>Leaders of business schools and universities on three continents who advise the Institute. Listed in alphabetical order of last names; last updated on 14 August 2026.</p>
    </div>
    <ol class="iac-grid" data-iac data-stagger></ol>
    <p class="src">Source: <a class="ulink" href="https://www.iimb.ac.in/about-institute">About IIMB, iimb.ac.in</a>.</p>
  </div>
</section>'''

def html(s):
    a = s.index('<section class="section ab-act" id="act"'); b = s.index("</section>", a) + len("</section>")
    s = s[:a] + ACT_HTML + s[b:]
    a = s.index('<section class="section ab-iac" id="iac"'); b = s.index("</section>", a) + len("</section>")
    s = s[:a] + IAC_HTML + s[b:]
    s = s.replace('<section class="section ab-vision" aria-labelledby="vis-h">', '<section class="section ab-vision" id="vision" aria-labelledby="vis-h">')
    s = s.replace('<section class="section ab-arch" aria-labelledby="arch-h">', '<section class="section ab-arch" id="architecture" aria-labelledby="arch-h">')
    s = s.replace('<section class="section ab-identity" aria-labelledby="id-h">', '<section class="section ab-identity" id="identity" aria-labelledby="id-h">')
    s = s.replace('<ol class="rk-list ab-ranks" data-ab-ranks></ol>', '<div class="ab-ranks" data-ab-ranks></div>')
    s = s.replace('      <p class="lede" data-intro data-ab-lede></p>', '      <p class="lede" data-intro data-ab-lede></p>\n      <dl class="ab-figs" data-intro data-ab-figs></dl>')
    return s
rw("src/pages/about.html", html)

def js(s):
    a = s.index('    $("[data-iac]").innerHTML'); b = s.index("\n", a)
    s = s[:a] + '''    $("[data-iac]").innerHTML = IAC.map(([n, t, org]) => `<li class="iac-card"><span class="iac-mono" aria-hidden="true">${esc(n.split(" ").map((w) => w[0]).join(""))}</span><p class="iac-org">${esc(org)}</p><h3 class="iac-n">Professor ${esc(n)}</h3><p class="iac-t">${esc(t)}</p></li>`).join("");''' + s[b:]
    a = s.index('    $("[data-ab-ranks]").innerHTML'); b = s.index("\n", a)
    s = s[:a] + '    $("[data-ab-ranks]").innerHTML = J.rankGrid(I.rankCards || [], "rkg-home");' + s[b:]
    a = s.index('    $("[data-act]").innerHTML'); b = s.index("\n", a)
    s = s[:a] + '''    $("[data-act]").innerHTML = ACT.map(([y, kind, t, h, note]) => `<li><a class="act-doc" href="${h}"><span class="act-y num">${y}</span><span class="act-kind">${esc(kind)}</span><span class="act-t">${esc(t)}</span>${note ? `<span class="act-note">${esc(note)}</span>` : ""}<span class="act-pdf">PDF · iimb.ac.in ${icon("arrow-up")}</span></a></li>`).join("");
    $("[data-ab-figs]").innerHTML = [["105", "full-time faculty members"], ["1,200", "students across degree programmes (about)"], ["5,000", "Executive Education participants a year (nearly)"]].map(([v, l]) => `<div><dt class="num" data-count>${v}</dt><dd>${l}</dd></div>`).join("") + `<p class="src">From ${J.srcLink("about", "About IIMB")}.</p>`;''' + s[b:]
    consts = '''  /* Official About and IIM Act pages, 26 Oct 2026 */
  const F = "https://www.iimb.ac.in/sites/default/files/";
  const ACT = [
    ["2017", "Act", "Indian Institutes of Management Act, 2017", F + "inline-files/IIM-ACT.pdf", "Makes IIMB an Institute of National Importance"],
    ["2018", "Rules", "Indian Institutes of Management Rules, 2018", F + "inline-files/IIM-Rules-Gazette-Notification.pdf", ""],
    ["2022", "Amendment", "Indian Institutes of Management Rules Amendment 2022", F + "inline-files/IIM-Rules-Amendment-2022.pdf", ""],
    ["2023", "Amendment", "Indian Institutes of Management Act Amendment 2023", F + "inline-files/IIM-Act-Amendment%202023_16th%20August%202023-GazetteNotification.pdf", "Gazette notification, 16 August 2023"],
    ["2023", "Amendment", "Indian Institutes of Management Rules Amendment 2023", F + "inline-files/IIMB-Rules_Amendment-2023.pdf", ""],
    ["2023", "Regulations", "IIMB Regulations", F + "2023-09/IIMB-Regulations-Gazetted_31.08.2023.pdf", "Gazetted 31 August 2023"],
  ];
  const IAC = [
    ["Ruth Aguilera", "Darla and Frederick Brodsky Trustee Professor in Global Business; Distinguished Professor, International Business and Strategy", "Northeastern University"],
    ["Bharat Anand", "Richard R. West Dean of NYU Stern and Professor of Business Administration", "NYU Stern"],
    ["David Bach", "President of IMD and Nestlé Professor of Strategy and Political Economy", "IMD"],
    ["Gerry George", "Tamsen and Michael Brown Family Professor of Entrepreneurship and Innovation; Academic Advisor to the Georgetown Entrepreneurship Initiative", "Georgetown University"],
    ["Krishna Rajagopal", "William A. M. Burden Professor of Physics; Margaret MacVicar Faculty Fellow", "MIT"],
    ["Raghu Sundaram", "Senior Vice Chancellor and Chief Global Officer, New York University; Dean Emeritus, NYU Stern; Edward I. Altman Professor of Credit and Debt Markets; Professor of Finance", "New York University"],
    ["Lin Zhou", "Dean of The Chinese University of Hong Kong (CUHK) Business School and Choh-Ming Li Professor of Economics", "CUHK Business School"],
  ];
'''
    a = s.index("  function render() {")
    s = s[:a] + consts + "\n" + s[a:]
    s = s.replace("  J.page(render, intro);", """  J.page(() => {
    render();
    J.hangIndex([["vision", "Vision and mission"], ["timeline", "Milestones"], ["architecture", "Architecture"], ["identity", "The sun symbol"], ["sustainability", "Sustainability"], ["accreditation", "Accreditation and rankings"], ["leadership", "Board"], ["act", "IIM Act and Rules"], ["structure", "Organisational structure"], ["iac", "Advisory committee"]].map(([id, t]) => ({ id, t })), { label: "About · on this page", after: ".ab-hero" });
  }, intro);""")
    return s
rw("assets/js/pages/about.js", js)
print("about updated")
