#!/usr/bin/env python
"""Regenerate public/og.png (1200x630 Open Graph card).

Run from anywhere:  python tools/make-og.py
Requires Pillow. Text is generated here instead of at request time because
next/og's ImageResponse fails to prerender on Windows + Next 14
(TypeError: Invalid URL in fileURLToPath).
"""
import glob
import os

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'og.png')

W, H = 1200, 630
ACID = (174, 243, 36)
GRID = (150, 210, 30)
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)

FONTS = glob.glob('C:/Windows/Fonts/**/*.ttf', recursive=True)
FONTS += glob.glob('/usr/share/fonts/**/*.ttf', recursive=True)


def pick(*names):
    for n in names:
        for f in FONTS:
            if os.path.basename(f).lower() == n.lower():
                return f
    return FONTS[0]


def main():
    im = Image.new('RGB', (W, H), ACID)
    d = ImageDraw.Draw(im)

    for x in range(0, W, 60):
        d.line([(x, 0), (x, H)], fill=GRID, width=1)
    for y in range(0, H, 60):
        d.line([(0, y), (W, y)], fill=GRID, width=1)
    d.rectangle([24, 24, W - 24, H - 24], outline=BLACK, width=5)

    f_name = ImageFont.truetype(pick('ARIALBD.TTF', 'calibrib.ttf'), 30)
    f_badge = ImageFont.truetype(pick('ARIALBD.TTF', 'calibrib.ttf'), 22)
    f_title = ImageFont.truetype(pick('ARIALBD.TTF', 'calibrib.ttf'), 96)
    f_sub = ImageFont.truetype(pick('ARIAL.TTF', 'calibri.ttf'), 38)
    f_pill = ImageFont.truetype(pick('ARIALBD.TTF', 'calibrib.ttf'), 21)
    f_url = ImageFont.truetype(pick('consola.ttf', 'cour.ttf'), 23)

    d.text((72, 76), 'ADAM NAEMAN', font=f_name, fill=BLACK)

    badge = 'PORTFOLIO'
    bw = d.textlength(badge, font=f_badge)
    bx2 = W - 72
    bx1 = bx2 - bw - 40
    d.rounded_rectangle([bx1, 66, bx2, 110], radius=22, outline=BLACK, width=3)
    d.text((bx1 + 20, 76), badge, font=f_badge, fill=BLACK)

    d.text((72, 210), 'Adam Naeman', font=f_title, fill=BLACK)
    d.text((76, 330), 'Full stack web \u00b7 machine learning \u00b7 3D', font=f_sub, fill=(27, 27, 27))

    x, y = 72, 470
    for p in ['NEXT.JS', 'TYPESCRIPT', 'PYTORCH', 'BLENDER', 'GODOT']:
        tw = d.textlength(p, font=f_pill)
        d.rounded_rectangle([x, y, x + tw + 26, y + 40], radius=8, fill=WHITE, outline=BLACK, width=3)
        d.text((x + 13, y + 8), p, font=f_pill, fill=BLACK)
        x += tw + 38

    url = 'adamnaeman.vercel.app'
    uw = d.textlength(url, font=f_url)
    d.text((W - 72 - uw, H - 100), url, font=f_url, fill=BLACK)

    im.save(OUT, 'PNG', optimize=True)
    print(f'wrote {OUT} ({os.path.getsize(OUT) // 1024} KB)')


if __name__ == '__main__':
    main()
