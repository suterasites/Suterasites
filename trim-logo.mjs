import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

const input = 'images/logos/sutera-sites.avif';
const outputAvif = 'images/logos/sutera-sites-trimmed.avif';
const outputPng = 'images/logos/sutera-sites.png';

const buffer = await readFile(input);

// First, replace pure black with transparent so .trim() removes it.
// Threshold at 8/255 to catch near-black anti-aliased edges too.
const { data, info } = await sharp(buffer)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const pixels = Buffer.from(data);
const THRESHOLD = 12;

for (let i = 0; i < pixels.length; i += channels) {
  const r = pixels[i];
  const g = pixels[i + 1];
  const b = pixels[i + 2];
  if (r <= THRESHOLD && g <= THRESHOLD && b <= THRESHOLD) {
    pixels[i + 3] = 0; // set alpha to 0
  }
}

const trimmed = await sharp(pixels, { raw: { width, height, channels } })
  .trim({ threshold: 1 })
  .png()
  .toBuffer();

await writeFile(outputPng, trimmed);

const { width: w, height: h } = await sharp(trimmed).metadata();
console.log(`Original: ${width}x${height}`);
console.log(`Trimmed:  ${w}x${h}`);
console.log(`Saved:    ${outputPng}`);
