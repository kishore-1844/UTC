#!/usr/bin/env python3
"""Download every remote image used by the site into assets/images and
rewrite the HTML to use the local copies.  Run once, on a computer with
internet access:   python3 download-images.py
Original links are kept in assets/images/manifest.json."""
import re, glob, os, json, urllib.request, mimetypes
here = os.path.dirname(os.path.abspath(__file__))
out = os.path.join(here, 'assets', 'images'); os.makedirs(out, exist_ok=True)
files = glob.glob(os.path.join(here, '*.html')) + glob.glob(os.path.join(here, 'js', '*.js'))
pat = re.compile(r'https://lh3\.googleusercontent\.com/[^"\')\s]+')
urls = []
for f in files:
    for u in pat.findall(open(f, encoding='utf-8').read()):
        if u not in urls: urls.append(u)
mapping = {}
for i, u in enumerate(urls, 1):
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=60) as r:
            data = r.read(); ctype = r.headers.get_content_type()
        ext = mimetypes.guess_extension(ctype) or '.jpg'
        if ext == '.jpe': ext = '.jpg'
        name = f'img-{i:02d}{ext}'
        open(os.path.join(out, name), 'wb').write(data)
        mapping[u] = 'assets/images/' + name
        print('ok  ', name)
    except Exception as e:
        print('FAIL', u[:70], e)
for f in files:
    t = open(f, encoding='utf-8').read(); o = t
    for u, p in mapping.items(): t = t.replace(u, p)
    if t != o: open(f, 'w', encoding='utf-8').write(t)
json.dump(mapping, open(os.path.join(out, 'manifest.json'), 'w'), indent=2)
print(f'{len(mapping)}/{len(urls)} images localised')
