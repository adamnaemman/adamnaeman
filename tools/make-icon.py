#!/usr/bin/env python
"""Regenerate app/icon.png (512x512 tab icon / favicon).

Run from anywhere:  python tools/make-icon.py
Requires Pillow. Next.js serves app/icon.png as the favicon automatically.
"""
import glob
import os

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'app', 'icon.png')

SIZE = 512
ACID = (174, 243, 36)
BLACK = (0, 0, 0)

FONTS = glob.glob('C:/Windows/Fonts/**/*.ttf', recursive=True)
FONTS += glob.glob('/usr/share/fonts/**/*.ttf', recursive=True)


def pick(*names):
    for n in names:
        for f in FONTS:
            if os.path.basename(f).lower() == n.lower():
                return f
    return FONTS[0]


def main():
    im = Image.new('RGB', (SIZE, SIZE), ACID)
    d = ImageDraw.Draw(im)

    # thick border so the mark still reads at 16 px in a tab
    d.rectangle([8, 8, SIZE - 9, SIZE - 9], outline=BLACK, width=26)

    f = ImageFont.truetype(pick('ARIALBD.TTF', 'calibrib.ttf'), 330)
    bbox = d.textbbox((0, 0), 'A', font=f)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text(((SIZE - tw) / 2 - bbox[0], (SIZE - th) / 2 - bbox[1]), 'A', font=f, fill=BLACK)

    im.save(OUT, 'PNG', optimize=True)
    print(f'wrote {OUT} ({os.path.getsize(OUT) // 1024} KB)')


if __name__ == '__main__':
    main()
