import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Create public/icon.svg
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="foodoraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f97316" />
      <stop offset="50%" stop-color="#ea580c" />
      <stop offset="100%" stop-color="#c2410c" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="512" height="512" rx="128" fill="url(#foodoraGrad)" />
  <g filter="url(#shadow)">
    <!-- Food cloche / dome base arc -->
    <path d="M120 370 Q256 370 392 370" stroke="#ffffff" stroke-width="24" stroke-linecap="round" fill="none" opacity="0.9" />
    <!-- Stylized capital F for Foodora with culinary plate accent -->
    <path d="M176 150 L340 150 M176 150 L176 350 M176 245 L300 245" stroke="#ffffff" stroke-width="38" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <!-- Chef steam sparkles -->
    <circle cx="360" cy="180" r="16" fill="#fef08a" />
    <circle cx="330" cy="210" r="10" fill="#fef08a" opacity="0.8" />
  </g>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent, 'utf-8');

// Function to generate a PNG buffer with raw RGBA raster
function createPngBuffer(width, height, isMaskable = false) {
  // Build RGBA pixels
  // Each scanline in PNG starts with filter byte 0
  const bytesPerPixel = 4;
  const scanlineLength = 1 + width * bytesPerPixel;
  const rawData = Buffer.alloc(scanlineLength * height);

  const radius = width * (isMaskable ? 0.35 : 0.22);
  const centerX = width / 2;
  const centerY = height / 2;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * scanlineLength;
    rawData[rowOffset] = 0; // Filter type 0 (None)

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * bytesPerPixel;

      let r = 234; // #ea580c -> 234, 88, 12
      let g = 88;
      let b = 12;
      let a = 255;

      // Gradient from top-left to bottom-right
      const t = (x + y) / (width + height);
      r = Math.round(249 * (1 - t) + 194 * t); // #f97316 (249, 115, 22) to #c2410c (194, 65, 12)
      g = Math.round(115 * (1 - t) + 65 * t);
      b = Math.round(22 * (1 - t) + 12 * t);

      // Check distance for squircle if not maskable (maskable has edge-to-edge solid background)
      if (!isMaskable) {
        const dx = Math.max(Math.abs(x - centerX) - (width / 2 - radius), 0);
        const dy = Math.max(Math.abs(y - centerY) - (height / 2 - radius), 0);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > radius) {
          a = 0; // transparent corner
        } else if (dist > radius - 1.5) {
          a = Math.round(255 * (radius - dist) / 1.5);
        }
      }

      // Draw stylized white "F" in center
      // Normalize coords to [-1, 1]
      const nx = (x - centerX) / (width * 0.4);
      const ny = (y - centerY) / (height * 0.4);

      // Check if point belongs to letter 'F'
      const stemX = nx >= -0.55 && nx <= -0.25 && ny >= -0.65 && ny <= 0.65;
      const topBar = ny >= -0.65 && ny <= -0.38 && nx >= -0.55 && nx <= 0.55;
      const midBar = ny >= -0.15 && ny <= 0.12 && nx >= -0.55 && nx <= 0.35;
      const dotAccent = (nx - 0.5) * (nx - 0.5) + (ny + 0.1) * (ny + 0.1) <= 0.015;

      if (a > 0 && (stemX || topBar || midBar || dotAccent)) {
        r = 255;
        g = 255;
        b = dotAccent ? 138 : 255; // golden yellow dot
      }

      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  // PNG Specification Chunks
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR Chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth: 8
  ihdr[9] = 6; // Color type: 6 (RGBA)
  ihdr[10] = 0; // Compression method
  ihdr[11] = 0; // Filter method
  ihdr[12] = 0; // Interlace method (None)

  const ihdrChunk = createChunk('IHDR', ihdr);

  // IDAT Chunk (Compressed scanlines)
  const compressedData = zlib.deflateSync(rawData, { level: 9 });
  const idatChunk = createChunk('IDAT', compressedData);

  // IEND Chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Helper to calculate CRC32 for PNG chunks
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);

  chunk.writeUInt32BE(len, 0);
  typeBuf.copy(chunk, 4);
  data.copy(chunk, 8);

  const crcTarget = Buffer.concat([typeBuf, data]);
  const crcVal = crc32(crcTarget);
  chunk.writeUInt32BE(crcVal, 8 + len);

  return chunk;
}

// Generate all required icons
console.log('Generating PWA icons...');
const icon192 = createPngBuffer(192, 192, false);
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), icon192);

const icon512 = createPngBuffer(512, 512, false);
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), icon512);

const iconMaskable = createPngBuffer(512, 512, true);
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), iconMaskable);

const appleIcon = createPngBuffer(180, 180, false);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleIcon);

// Favicon ico
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), createPngBuffer(64, 64, false));

console.log('All icons generated successfully in /public');
