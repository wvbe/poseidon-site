import { Space } from "../../lib/3d";

// axis x spreads out over the yz surface
// axis y spreads out over the xz surface
// axis z spreads out over the xy surface
export default function fromAscii (ascii, axis) {
	const tiles = ascii
		.trim()
		.split('\n')
		.map(line => line.split('').map(char => char === '#'));

	// const maxHeight = tiles.length;
	// const maxWidth = tiles.reduce((max, line) => Math.max(max, line.length), 0);

	const coords = tiles.reduce((coords, line, top) => coords.concat(line.map((tile, left) => tile ? [left, top] : null)), [])
		.filter(c => c)
		.map(([left, top]) => {
			if (axis === 'z') {
				return [top, left, 0];
			}

			if (axis === 'y') {
				return [left, 0, -top];
			}

			if (axis === 'x') {
				return [0, left, -top]
			}

			throw new Error ('No axis "' + axis + '"');
		});

	return Space.fromJson(coords).getTilesInRenderingOrder();

}
