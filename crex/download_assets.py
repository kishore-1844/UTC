#!/usr/bin/env python3
"""
OPTIONAL one-time script: makes the site fully offline.
Run it on a computer WITH internet:   python3 download_assets.py
It will
  1. download every remote image into assets/images/ and rewrite index.html to use them,
  2. download Geist, Space Grotesk and Material Symbols fonts into assets/fonts/
     and write css/fonts.css (linked from index.html, replacing the Google Fonts links).
A backup of the original is saved as index.remote.html. Nothing else changes.
"""
import re, os, urllib.request, shutil

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"}
def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read()

os.makedirs("assets/images", exist_ok=True)
os.makedirs("assets/fonts", exist_ok=True)
html = open("index.html", encoding="utf-8").read()
shutil.copy("index.html", "index.remote.html")

# ---- images
urls = list(dict.fromkeys(re.findall(r'https://lh3\.googleusercontent\.com/[^"\')\s]+', html)))
for i, u in enumerate(urls, 1):
    try:
        data = get(u)
        ext = ".png" if data[:4] == b"\x89PNG" else ".svg" if b"<svg" in data[:300] else ".webp" if data[8:12] == b"WEBP" else ".jpg"
        name = f"assets/images/img-{i:02d}{ext}"
        open(name, "wb").write(data)
        html = html.replace(u, name)
        print("image ok  ", name)
    except Exception as e:
        print("image FAIL", u[:70], e)

# ---- fonts
links = re.findall(r'<link href="(https://fonts\.googleapis\.com/[^"]+)" rel="stylesheet"/>', html)
css_out, n = [], 0
for l in links:
    css = get(l.replace("&amp;", "&")).decode()
    for fu in dict.fromkeys(re.findall(r'url\((https://fonts\.gstatic\.com/[^)]+)\)', css)):
        n += 1
        name = f"assets/fonts/font-{n:02d}.woff2"
        open(name, "wb").write(get(fu))
        css = css.replace(fu, "../" + name)
    css_out.append(css)
open("css/fonts.css", "w", encoding="utf-8").write("\n".join(css_out))
html = re.sub(r'<link href="https://fonts\.googleapis\.com/[^"]+" rel="stylesheet"/>\s*', "", html)
html = html.replace('<link href="css/style.css" rel="stylesheet"/>',
                    '<link href="css/fonts.css" rel="stylesheet"/><link href="css/style.css" rel="stylesheet"/>')
open("index.html", "w", encoding="utf-8").write(html)
print("Done. Open index.html - it now works offline.")
