"""Trace a PNG logo into a clean monochrome (white) SVG via potrace.

Usage: python3 logo_to_svg.py <input.png> <output.svg>
"""

import sys
from pathlib import Path

import numpy as np
import potrace as potracer
from PIL import Image


def png_to_white_svg(src: Path, dst: Path) -> None:
    img = Image.open(src).convert("RGBA")
    rgba = np.array(img)

    # Build a binary mask: foreground = visible, non-white pixels.
    alpha = rgba[..., 3]
    rgb = rgba[..., :3].astype(np.int16)
    # "Whiteness" — pixels close to white are background.
    is_whiteish = (rgb.min(axis=-1) > 235)
    mask = (alpha > 32) & ~is_whiteish

    # potrace.Bitmap auto-inverts on construction (treats white=background).
    # Pre-invert so the logo silhouette is what actually gets traced.
    bitmap = potracer.Bitmap(~mask)
    path = bitmap.trace(
        turdsize=2,
        opttolerance=0.2,
        alphamax=1.0,
    )

    w, h = img.size
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
        f'fill="#ffffff" fill-rule="evenodd">'
    ]
    parts.append('<path d="')
    for curve in path:
        s = curve.start_point
        parts.append(f"M{s.x:.2f} {s.y:.2f}")
        for segment in curve:
            e = segment.end_point
            if segment.is_corner:
                c = segment.c
                parts.append(f"L{c.x:.2f} {c.y:.2f}L{e.x:.2f} {e.y:.2f}")
            else:
                c1, c2 = segment.c1, segment.c2
                parts.append(
                    f"C{c1.x:.2f} {c1.y:.2f} {c2.x:.2f} {c2.y:.2f} {e.x:.2f} {e.y:.2f}"
                )
        parts.append("Z")
    parts.append('"/></svg>')

    dst.write_text("".join(parts))
    print(f"Wrote {dst} ({dst.stat().st_size} bytes)")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: logo_to_svg.py <input.png> <output.svg>", file=sys.stderr)
        sys.exit(1)
    png_to_white_svg(Path(sys.argv[1]), Path(sys.argv[2]))
