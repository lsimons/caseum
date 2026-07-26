// Generate the Caseum honeycomb favicon from the brand palette.
//
// Recreates the logo's 7-hexagon honeycomb (a grey centre ringed by the six
// view colours, see src/content/docs/design/colors/colors.md) without the
// "Caseum" wordmark, so it stays legible at favicon sizes. Flat-top hexagons
// on a hex grid.
//
//   cd docs && bun run scripts/gen-favicon.mjs
//
// Writes public/favicon.svg, public/apple-touch-icon.png, and refreshes the
// header logo at src/assets/logo.svg.
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const docsDir = join(dirname(fileURLToPath(import.meta.url)), '..');

const CENTRE = '#808080'; // Grey - "Caseum"
// (colour, edge-normal angle) pairs, matching the logo's ring layout.
const RING = [
	['#A1B28B', 90], // Actors     - light green (top)
	['#3C6320', 30], // Stories    - green (top-right)
	['#B29F8B', 330], // Events     - light brown (bottom-right)
	['#7F5529', 270], // UI         - brown (bottom)
	['#8B98B2', 210], // Models     - light blue (bottom-left)
	['#29467F', 150], // Components - blue (top-left)
];

const SIZE = 64;
const C = SIZE / 2;
const R = 9.6; // centre-to-vertex
const GAP = 0.6; // shrink each hex for a thin gap
const D = Math.sqrt(3) * R; // centre-to-centre for edge-sharing neighbours

const rad = (deg) => (deg * Math.PI) / 180;

function hexagon(cx, cy, r) {
	const pts = [];
	for (let k = 0; k < 6; k++) {
		const t = rad(k * 60); // flat-top: vertices at 0,60,...,300
		pts.push(`${(cx + r * Math.cos(t)).toFixed(2)},${(cy - r * Math.sin(t)).toFixed(2)}`);
	}
	return pts.join(' ');
}

const polys = [`  <polygon points="${hexagon(C, C, R - GAP)}" fill="${CENTRE}"/>`];
for (const [color, angle] of RING) {
	const nx = C + D * Math.cos(rad(angle));
	const ny = C - D * Math.sin(rad(angle));
	polys.push(`  <polygon points="${hexagon(nx, ny, R - GAP)}" fill="${color}"/>`);
}

const svg =
	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" ` +
	`width="${SIZE}" height="${SIZE}" role="img" aria-label="Caseum">\n` +
	polys.join('\n') +
	'\n</svg>\n';

writeFileSync(join(docsDir, 'public/favicon.svg'), svg);
writeFileSync(join(docsDir, 'src/assets/logo.svg'), svg);

// apple-touch-icon: the honeycomb on a white 180x180 tile with a little padding.
const inner = await sharp(Buffer.from(svg), { density: 400 })
	.resize(160, 160, { fit: 'contain', background: '#ffffff' })
	.png()
	.toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#ffffff' } })
	.composite([{ input: inner, gravity: 'center' }])
	.png()
	.toFile(join(docsDir, 'public/apple-touch-icon.png'));

console.log('wrote public/favicon.svg, public/apple-touch-icon.png, src/assets/logo.svg');
