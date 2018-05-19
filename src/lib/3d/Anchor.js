import React from 'react';

import perspective from '../perspective';

import LinePath from '../objects/LinePath';

function Crosshair ({ size = 4, ...lineProps }) {
	const lines =[
		[ // over the x axis
			[-1 * size, 0, 0],
			[ size, 0, 0]
		],
		[ // over the y axis
			[0, -1 * size, 0],
			[0, size, 0]
		],
		[ // over the z axis
			[0, 0, -1 * size],
			[0, 0, size]
		],
	];

	return lines.map((points, i) => <LinePath
			key={i}
			path={points}
			{...lineProps}
		/>);
}

export default function Anchor ({ x = 0, y = 0, z = 0, children, crosshairSize = 0 }) {
	const pixels = perspective.toPixels(...[x, y, z]);

	return (
		<svg { ...{
			x: pixels[0],
			y: pixels[1],
			overflow: 'visible'
		}}>
			{ crosshairSize ? <Crosshair size={crosshairSize} stroke={'rgba(0,0,0)'} strokeWidth={0.5}/> : null }
			{ children }
		</svg>
	);
}
