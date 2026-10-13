"""Split an explicitly requested 4x4 vocabulary contact sheet into landscape cards."""

import argparse
from pathlib import Path
from PIL import Image

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('source', type=Path)
parser.add_argument('destination', type=Path)
parser.add_argument('--start', type=int, required=True)
parser.add_argument('--count', type=int, default=16)
parser.add_argument('--grid-name', required=True)
args = parser.parse_args()
if not 1 <= args.count <= 16:
    parser.error('--count must be between 1 and 16')
args.destination.mkdir(parents=True, exist_ok=True)
with Image.open(args.source) as image:
    image = image.convert('RGB')
    image.save(args.destination / args.grid_name, 'WEBP', quality=92)
    width, height = image.size
    def boundaries(vertical):
        length = width if vertical else height
        result = [0]
        for divider in range(1, 4):
            expected = round(divider * length / 4)
            candidates = []
            for position in range(expected - length // 80, expected + length // 80 + 1):
                box = (position, 0, position + 1, height) if vertical else (0, position, width, position + 1)
                strip = image.crop(box)
                pixels = [strip.getpixel((x, y)) for y in range(strip.height) for x in range(strip.width)]
                if sum(min(pixel) > 245 for pixel in pixels) / len(pixels) > .98:
                    candidates.append(position)
            result.append(round(sum(candidates) / len(candidates)) if candidates else expected)
        return result + [length]
    columns, rows = boundaries(True), boundaries(False)
    for index in range(args.count):
        column, row = index % 4, index // 4
        bounds = (columns[column] + (3 if column else 0), rows[row] + (3 if row else 0),
                  columns[column + 1] - (3 if column < 3 else 0), rows[row + 1] - (3 if row < 3 else 0))
        tile = image.crop(bounds).resize((640, 400), Image.Resampling.LANCZOS)
        target = args.destination / f'word-{args.start + index:02d}.webp'
        tile.save(target, 'WEBP', quality=90)
print(f'Saved {args.count} complete 640x400 tiles to {args.destination}')
