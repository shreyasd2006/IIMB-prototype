"""One-off (24 Oct 2026): two-tier header with the official logo, About-first navigation, white-logo menu,
original IIMB footer with social links, Hindi dictionary loader. Rewrites the template inside build_pages.py."""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
p = os.path.join(ROOT, "tools", "build_pages.py")
s = open(p, encoding="utf-8").read()

a = s.index("NAV = ["); b = s.index("]\n", a) + 2
s = s[:a] + '''NAV = [
    ("about", "About", "about.html"),
    ("programmes", "Programmes", "programmes.html"),
    ("research", "Research", "research.html"),
    ("faculty", "Faculty", "faculty.html"),
    ("centres", "Centres", "centres.html"),
    ("news", "News & Events", "news.html"),
    ("campus", "Campus Life", "campus.html"),
    ("partnerships", "Partnerships", "partnerships.html"),
]
''' + s[b:]

ICON_ANCHOR = '<symbol id="i-drag" viewBox="0 0 24 24"><path d="M8 12h8M5 9l-3 3 3 3M19 9l3 3-3 3"/></symbol>'
EXTRA_ICONS = ICON_ANCHOR + '''
<symbol id="i-chev-l" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></symbol>
<symbol id="i-chev-r" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></symbol>
<symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.6 2.6 2.6 14.4 0 17M12 3.5c-2.6 2.6-2.6 14.4 0 17"/></symbol>
<symbol id="s-facebook" viewBox="0 0 24 24"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4A21 21 0 0 0 14.4 4C12 4 10.5 5.4 10.5 8v2.5H8v3h2.5V21z" fill="currentColor" stroke="none"/></symbol>
<symbol id="s-x" viewBox="0 0 24 24"><path d="M4 4l6.6 8.8L4.3 20h1.5l5.5-6.3 4.7 6.3H20l-6.9-9.3L19 4h-1.5l-5 5.8L8.1 4z" fill="currentColor" stroke="none"/></symbol>
<symbol id="s-linkedin" viewBox="0 0 24 24"><path d="M5 9h3v10H5zM6.5 4.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5zM10.5 9h2.9v1.4c.4-.8 1.4-1.6 3-1.6 3.1 0 3.6 2 3.6 4.6V19h-3v-4.9c0-1.2 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5v5h-3z" fill="currentColor" stroke="none"/></symbol>
<symbol id="s-youtube" viewBox="0 0 24 24"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z" fill="currentColor" stroke="none"/></symbol>
<symbol id="s-instagram" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.8" cy="7.2" r=".9" fill="currentColor" stroke="none"/></symbol>
<symbol id="s-whatsapp" viewBox="0 0 24 24"><path d="M4.5 19.5l1.1-3.9A8 8 0 1 1 8.6 18.5z"/><path d="M9.2 8.6c.2-.5.6-.5.9-.5h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.6l-.5.6c.6 1.2 1.6 2.1 2.8 2.7l.6-.6c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.6v.5c0 .6-.6 1.3-1.4 1.4-1 .1-2.6-.3-4.3-1.8S9 11.1 9 10.1c0-.6.1-1.1.2-1.5z" fill="currentColor" stroke="none"/></symbol>'''
if "s-facebook" not in s:
    s = s.replace(ICON_ANCHOR, EXTRA_ICONS)

TEMPLATE = open(os.path.join(ROOT, "tools", "chrome_template.txt"), encoding="utf-8").read()
a = s.index('    return f"""<!doctype html>')
b = s.index('</html>\n"""', a) + len('</html>\n"""')
s = s[:a] + TEMPLATE.rstrip("\n") + s[b:]
open(p, "w", encoding="utf-8", newline="\n").write(s)
print("template replaced")
