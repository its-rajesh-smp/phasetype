"""
Draws the DMG installer background (build/background.png and build/background@2x.png).

The window, icon size and icon positions live in electron-builder.yml (`dmg:`); keep them in sync with
the constants below. Run with: python3 scripts/dmg-background.py  (needs Pillow)
"""

import io
import struct
import zlib
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / 'build'
SERIF_WOFF = ROOT / 'node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff'
SANS_TTF = '/System/Library/Fonts/SFNS.ttf'

# Same as electron-builder.yml → dmg.window and dmg.contents (points, i.e. 1x).
WIDTH, HEIGHT = 600, 400
APP_ICON = (170, 220)
APPLICATIONS_ICON = (430, 220)

# Design tokens from src/renderer/src/styles/globals.css.
CANVAS = (244, 238, 226)
SURFACE = (251, 248, 242)
INK = (22, 19, 15)
MUTED = (110, 103, 91)
SUBTLE = (163, 155, 140)
LINE = (229, 220, 204)
LIME = (227, 245, 66)
LIME_DEEP = (211, 231, 43)
EMBER = (207, 116, 40)


def woff_to_ttf(path: Path) -> bytes:
    """Unpacks a WOFF 1.0 font (zlib-compressed tables) into plain TrueType bytes Pillow can load."""
    data = path.read_bytes()
    flavor, _length, num_tables = struct.unpack('>4xIIH', data[:14])
    tables = []
    for i in range(num_tables):
        tag, offset, comp_len, orig_len, checksum = struct.unpack('>4sIIII', data[44 + i * 20 : 64 + i * 20])
        raw = data[offset : offset + comp_len]
        tables.append((tag, checksum, zlib.decompress(raw) if comp_len < orig_len else raw))

    entry_selector = num_tables.bit_length() - 1
    search_range = (1 << entry_selector) * 16
    header = struct.pack('>IHHHH', flavor, num_tables, search_range, entry_selector, num_tables * 16 - search_range)
    offset = 12 + 16 * num_tables
    records, body = b'', b''
    for tag, checksum, table in tables:
        records += struct.pack('>4sIII', tag, checksum, offset + len(body), len(table))
        body += table + b'\0' * (-len(table) % 4)
    return header + records + body


def sans(size: float, weight: int, scale: int) -> ImageFont.FreeTypeFont:
    """San Francisco at `size` points. Axes: width, optical size (in points), grade, weight."""
    font = ImageFont.truetype(SANS_TTF, round(size * scale))
    font.set_variation_by_axes([100, max(17, size), 400, weight])
    return font


def glow(size: tuple[int, int], center: tuple[float, float], radius: float, color: tuple[int, int, int], alpha: int) -> Image.Image:
    """A soft radial blob, like the radial-gradient glows on the settings window."""
    layer = Image.new('RGBA', size, (*color, 0))
    cx, cy = center
    ImageDraw.Draw(layer).ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=(*color, alpha))
    return layer.filter(ImageFilter.GaussianBlur(radius * 0.55))


def draw(scale: int) -> Image.Image:
    s = lambda value: round(value * scale)  # noqa: E731 - points → pixels
    size = (s(WIDTH), s(HEIGHT))
    image = Image.new('RGBA', size, (*CANVAS, 255))
    image.alpha_composite(glow(size, (s(560), s(-20)), s(230), LIME, 120))
    image.alpha_composite(glow(size, (s(0), s(420)), s(200), (232, 168, 112), 70))
    d = ImageDraw.Draw(image)

    # Eyebrow: a short rule, then letter-spaced caps.
    eyebrow_font = sans(10, 600, scale)
    eyebrow = 'INSTALL PHASETYPE'
    tracking = s(1.6)
    eyebrow_width = sum(d.textlength(ch, font=eyebrow_font) for ch in eyebrow) + tracking * (len(eyebrow) - 1)
    rule = s(18)
    x = (size[0] - (rule + s(10) + eyebrow_width)) / 2
    y = s(40)
    d.line((x, y + s(6), x + rule, y + s(6)), fill=SUBTLE, width=max(1, s(1)))
    x += rule + s(10)
    for ch in eyebrow:
        d.text((x, y), ch, font=eyebrow_font, fill=MUTED)
        x += d.textlength(ch, font=eyebrow_font) + tracking

    # Heading, with the lime → ember marker under the key word (as in the app).
    serif = ImageFont.truetype(io.BytesIO(woff_to_ttf(SERIF_WOFF)), s(38))
    lead, key = 'Drag it into ', 'Applications.'
    lead_w, key_w = d.textlength(lead, font=serif), d.textlength(key, font=serif)
    x = (size[0] - lead_w - key_w) / 2
    y = s(62)
    marker = Image.new('RGBA', (round(key_w), s(13)))
    for px in range(marker.width):
        t = px / max(1, marker.width - 1)
        a, b, u = (LIME, LIME_DEEP, t / 0.45) if t < 0.45 else (LIME_DEEP, EMBER, (t - 0.45) / 0.55)
        ImageDraw.Draw(marker).line((px, 0, px, marker.height), fill=tuple(round(a[i] + (b[i] - a[i]) * u) for i in range(3)))
    image.alpha_composite(marker, (round(x + lead_w), y + s(28)))
    d.text((x, y), lead, font=serif, fill=INK)
    d.text((x + lead_w, y), key, font=serif, fill=INK)

    # Soft cards behind the two icons and their labels (Finder draws both on top).
    for cx, cy in (APP_ICON, APPLICATIONS_ICON):
        card = (s(cx - 74), s(cy - 72), s(cx + 74), s(cy + 86))
        shadow = Image.new('RGBA', size)
        ImageDraw.Draw(shadow).rounded_rectangle((card[0], card[1] + s(10), card[2], card[3] + s(8)), s(30), fill=(*INK, 26))
        image.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(s(14))))
        d.rounded_rectangle(card, s(30), fill=SURFACE, outline=LINE, width=max(1, s(1)))

    # Dashed arrow from the app to Applications.
    y = s(APP_ICON[1])
    start, end = s(APP_ICON[0] + 92), s(APPLICATIONS_ICON[0] - 92)
    dash, gap = s(7), s(6)
    x = start
    while x < end - s(8):
        d.line((x, y, min(x + dash, end - s(8)), y), fill=EMBER, width=s(2))
        x += dash + gap
    head = s(8)
    d.line((end - head, y - head, end, y, end - head, y + head), fill=EMBER, width=s(2), joint='curve')

    # Footer hint.
    footer_font = sans(12, 400, scale)
    footer = 'Then open PhaseType from Applications. It lives in your menu bar.'
    d.text(((size[0] - d.textlength(footer, font=footer_font)) / 2, s(352)), footer, font=footer_font, fill=MUTED)

    return image.convert('RGB')


if __name__ == '__main__':
    OUT_DIR.mkdir(exist_ok=True)
    draw(1).save(OUT_DIR / 'background.png', dpi=(72, 72))
    draw(2).save(OUT_DIR / 'background@2x.png', dpi=(144, 144))
    print('Wrote build/background.png and build/background@2x.png')
