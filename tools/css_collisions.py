"""List CSS classes styled in more than one stylesheet (journal.css + src/css/*.css).
All page styles ship in one file, so a class name reused for two meanings collides site-wide.
Usage: python tools/css_collisions.py"""
import collections, glob, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
owners = collections.defaultdict(set)
files = glob.glob(os.path.join(ROOT, "src", "css", "*.css")) + [os.path.join(ROOT, "assets", "css", "journal.css")]
for f in files:
    text = re.sub(r"/\*.*?\*/", "", open(f, encoding="utf-8").read(), flags=re.S)
    for selector in re.findall(r"([^{}@;]+)\{", text):
        for cls in re.findall(r"\.([a-zA-Z][\w-]*)", selector):
            owners[cls].add(os.path.basename(f))
for cls, fs in sorted(owners.items()):
    if len(fs) > 1:
        print(f"{cls:28} {', '.join(sorted(fs))}")
