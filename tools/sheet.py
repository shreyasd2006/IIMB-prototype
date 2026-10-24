"""Contact sheets from audit screenshots: python tools/sheet.py <dir> [cols] [thumbWidth] -> <dir>/sheet-<page>.jpg"""
import os, sys, glob, re
from PIL import Image

d = sys.argv[1]; cols = int(sys.argv[2]) if len(sys.argv) > 2 else 3; tw = int(sys.argv[3]) if len(sys.argv) > 3 else 640
groups = {}
for f in sorted(glob.glob(os.path.join(d, "*.jpg"))):
    b = os.path.basename(f)
    if b.startswith("sheet-"): continue
    m = re.match(r"(.+)-(\d+)\.jpg$", b)
    if m: groups.setdefault(m.group(1), []).append(f)
for name, files in groups.items():
    ims = [Image.open(f) for f in files]
    th = int(ims[0].height * tw / ims[0].width)
    rows = (len(ims) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * tw + (cols - 1) * 8, rows * th + (rows - 1) * 8), (90, 90, 90))
    for i, im in enumerate(ims):
        sheet.paste(im.resize((tw, th)), ((i % cols) * (tw + 8), (i // cols) * (th + 8)))
    out = os.path.join(d, f"sheet-{name}.jpg"); sheet.save(out, quality=80); print(out, len(ims))
