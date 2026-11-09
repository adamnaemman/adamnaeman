#!/usr/bin/env python
"""Generate the Open Graph card `public/og.png` (1200x630).

`public/og.png` is a committed static asset, so it needs a generator next to it:
change a line of copy here, re-run, and the card is rebuilt deterministically.
No network access and no downloaded fonts -- only font files that ship with
Windows (Arial, Consolas) are used, with a fallback list for other platforms.

Layout reproduced from the card shipped in 2e18648:
  acid canvas #aef324 + 60px grid #96d21e + 5px black frame inset 24px,
  wordmark + "PORTFOLIO" badge, name, positioning line, tech pills, domain.

Text blocks are placed by the top-left corner of their *ink* bounding box, so a
position cannot drift when a glyph's side bearing changes.

Usage:
    python tools/make-og.py             # writes public/og.png
    python tools/make-og.py out.png     # writes somewhere else
"""

from __future__ import annotations

import os
import sys

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# --- canvas -----------------------------------------------------------------

W, H = 1200, 630
ACID = (174, 243, 36)  # #aef324
GRID = (150, 210, 30)  # #96d21e
INK = (0, 0, 0)
PAPER = (255, 255, 255)
TAGLINE_INK = (27, 27, 27)  # the positioning line is printed a shade off-black

GRID_STEP = 60
FRAME_INSET = 24
FRAME_WIDTH = 5

# --- copy -------------------------------------------------------------------

WORDMARK = "ADAM NAEMAN"
BADGE = "PORTFOLIO"
NAME = "Adam Naeman"
TAGLINE = "Full stack web \u00b7 machine learning \u00b7 3D"
DOMAIN = "adamnaeman.vercel.app"

# Pill row: (label, left, right, label ink x). Measured off the shipped card.
PILL_TOP, PILL_BOTTOM = 470, 510
PILL_RADIUS = 6
PILL_STROKE = 3
PILL_LABEL_Y = 483
PILLS = [
    ("NEXT.JS", 72, 186, 87),
    ("TYPESCRIPT", 198, 356, 211),
    ("PYTORCH", 368, 496, 383),
    ("BLENDER", 508, 635, 523),
    ("GODOT", 647, 749, 661),
]

BADGE_BOX = (961, 66, 1128, 110)
BADGE_RADIUS = 18
BADGE_LABEL_Y = 80

# Ink-box anchors for the type blocks.
WORDMARK_POS = (72, 82)
NAME_POS = (72, 228)
TAGLINE_POS = (79, 338)
DOMAIN_POS = (856, 532)

SIZE_WORDMARK = 30
SIZE_BADGE = 22
SIZE_NAME = 96
SIZE_TAGLINE = 38
SIZE_PILL = 21
SIZE_DOMAIN = 23

# --- fonts ------------------------------------------------------------------

FONT_DIRS = [
    os.path.join(os.environ.get("WINDIR", r"C:\Windows"), "Fonts"),
    "/usr/share/fonts/truetype/msttcorefonts",
    "/usr/share/fonts/truetype/liberation",
    "/usr/share/fonts/truetype/dejavu",
]

FONT_FILES = {
    "sans_bold": [
        "arialbd.ttf",
        "Arial Bold.ttf",
        "LiberationSans-Bold.ttf",
        "DejaVuSans-Bold.ttf",
    ],
    "sans": [
        "arial.ttf",
        "Arial.ttf",
        "LiberationSans-Regular.ttf",
        "DejaVuSans.ttf",
    ],
    "mono_bold": [
        "consolab.ttf",
        "Consolas Bold.ttf",
        "CascadiaMono.ttf",
        "DejaVuSansMono-Bold.ttf",
        "courbd.ttf",
    ],
}


def load_font(kind: str, size: int) -> ImageFont.FreeTypeFont:
    for name in FONT_FILES[kind]:
        for directory in FONT_DIRS:
            path = os.path.join(directory, name)
            if os.path.exists(path):
                return ImageFont.truetype(path, size)
    raise SystemExit(
        "make-og: no %s font found; looked for %s in %s"
        % (kind, FONT_FILES[kind], FONT_DIRS)
    )


# --- text -------------------------------------------------------------------


def _solid(value: int) -> int:
    return 255 if value >= 128 else 0


def ink_mask(text: str, font: ImageFont.FreeTypeFont) -> tuple[Image.Image, tuple[int, int]]:
    """Render `text` to a mask, cropped to its ink bounds.

    Returns the mask plus the offset from the crop origin to the first *solid*
    (>50% coverage) pixel, so callers can anchor on solid ink instead of on a
    nearly-transparent antialiasing column.
    """
    pad = 24
    layer = Image.new(
        "L",
        (int(font.getlength(text)) + pad * 2 + 8, int(font.size * 2.2) + pad * 2),
        0,
    )
    ImageDraw.Draw(layer).text((pad, pad), text, font=font, fill=255)
    bbox = layer.getbbox()
    if bbox is None:
        raise SystemExit("make-og: no ink for %r" % text)
    solid = layer.point(_solid).getbbox()
    if solid is None:
        raise SystemExit("make-og: no solid ink for %r" % text)
    return layer.crop(bbox), (solid[0] - bbox[0], solid[1] - bbox[1])


def stamp(
    canvas: Image.Image,
    text: str,
    font: ImageFont.FreeTypeFont,
    xy: tuple[int, int],
    fill: tuple[int, int, int] = INK,
) -> None:
    """Paste `text` so the top-left of its solid ink lands exactly on `xy`."""
    mask, (dx, dy) = ink_mask(text, font)
    canvas.paste(fill, (int(xy[0]) - dx, int(xy[1]) - dy), mask)


# --- build ------------------------------------------------------------------


def build() -> Image.Image:
    canvas = Image.new("RGB", (W, H), ACID)
    draw = ImageDraw.Draw(canvas)

    # 60px grid over the whole canvas, underneath everything else.
    for x in range(0, W, GRID_STEP):
        draw.line([(x, 0), (x, H - 1)], fill=GRID)
    for y in range(0, H, GRID_STEP):
        draw.line([(0, y), (W - 1, y)], fill=GRID)

    draw.rectangle(
        [FRAME_INSET, FRAME_INSET, W - 1 - FRAME_INSET, H - 1 - FRAME_INSET],
        outline=INK,
        width=FRAME_WIDTH,
    )

    # Top row: wordmark, then the outlined "PORTFOLIO" badge.
    stamp(canvas, WORDMARK, load_font("sans_bold", SIZE_WORDMARK), WORDMARK_POS)

    bx0, by0, bx1, by1 = BADGE_BOX
    draw.rounded_rectangle(
        [bx0, by0, bx1, by1], radius=BADGE_RADIUS, outline=INK, width=PILL_STROKE
    )
    badge, (bdx, _) = ink_mask(BADGE, load_font("sans_bold", SIZE_BADGE))
    inner_left = bx0 + PILL_STROKE
    inner_width = bx1 + 1 - PILL_STROKE - inner_left
    badge_x = inner_left + (inner_width - badge.width) // 2 - bdx
    canvas.paste(INK, (badge_x, BADGE_LABEL_Y), badge)

    # Headline block.
    stamp(canvas, NAME, load_font("sans_bold", SIZE_NAME), NAME_POS)
    stamp(canvas, TAGLINE, load_font("sans", SIZE_TAGLINE), TAGLINE_POS, TAGLINE_INK)

    # Tech pills.
    pill_font = load_font("sans_bold", SIZE_PILL)
    for label, left, right, label_x in PILLS:
        draw.rounded_rectangle(
            [left, PILL_TOP, right, PILL_BOTTOM],
            radius=PILL_RADIUS,
            fill=PAPER,
            outline=INK,
            width=PILL_STROKE,
        )
        stamp(canvas, label, pill_font, (label_x, PILL_LABEL_Y))

    # Domain, bottom right.
    stamp(canvas, DOMAIN, load_font("mono_bold", SIZE_DOMAIN), DOMAIN_POS)

    return canvas


def main() -> None:
    out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "public", "og.png")
    build().save(out, "PNG", optimize=True)

    with open(out, "rb") as fh:
        head = fh.read(24)
    print(
        "wrote %s: %dx%d, %d bytes"
        % (
            out,
            int.from_bytes(head[16:20], "big"),
            int.from_bytes(head[20:24], "big"),
            os.path.getsize(out),
        )
    )


if __name__ == "__main__":
    main()
