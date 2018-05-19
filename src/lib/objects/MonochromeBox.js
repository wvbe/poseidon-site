import React from 'react';
import color from 'color-js';

import perspective from '../perspective';

const BORDER_WIDTH = 0;

function coordsToPixels (coords, borderWidth = BORDER_WIDTH) {
	return coords.map(coordinate => perspective.toPixels(...coordinate))
        .map(cc => cc.map(c => c + borderWidth));
}
const COORDINATE_CLOSEST_TO_CAMERA = perspective
    .toPixels(1, 0, 1)
    .map(c => c + BORDER_WIDTH);

let BORDER_NODES = coordsToPixels([
    [1,1,0], // 0
    [1,1,1],
    [0,1,1], // 2
    [0,0,1],
    [0,0,0], // 4
    [1,0,0]
]);

// facing to the bottom left, aka -y
let XZ_NODES = coordsToPixels([
	[0,0,0],
	[0,0,1],
	[1,0,1],
	[1,0,0]
]);

// facing to the bottom right, aka +x
let YZ_NODES = coordsToPixels([
	[1,0,0],
	[1,1,0],
	[1,1,1],
	[1,0,1]
]);

// facing top, aka +z
let XY_NODES = coordsToPixels([
	[0,0,1],
	[1,0,1],
	[1,1,1],
	[0,1,1]
]);

export default function MonochromeBox ({
   fill = color('gray'),

   strokeLinecap = 'round',

   stroke = fill.darkenByRatio(0.3).saturateByRatio(0.3),
   strokeWidth = 1,

   innerStroke = fill.lightenByRatio(0.4).desaturateByRatio(0.8),
   innerStrokeWidth = strokeWidth,
}) {
	const innerStrokeCss = innerStroke && innerStroke.toCSS();
	const strokeCss = stroke && stroke.toCSS();

	return [
		fill && <polygon
			key={'xz'}
			points={XZ_NODES.map(c => c.join(',')).join(' ')}
			fill={fill.toCSS()}
			strokeWidth={0}
		/>,
		fill && <polygon
			key={'xy'}
			points={XY_NODES.map(c => c.join(',')).join(' ')}
			fill={fill.lightenByRatio(0.2).toCSS()}
			strokeWidth={0}
		/>,
		fill && <polygon
			key={'yz'}
			points={YZ_NODES.map(c => c.join(',')).join(' ')}
			fill={fill.darkenByRatio(0.2).toCSS()}
			strokeWidth={0}
		/>,
		innerStroke && <line
			key={'x-bar'}
			x1={COORDINATE_CLOSEST_TO_CAMERA[0]}
			y1={COORDINATE_CLOSEST_TO_CAMERA[1]}
			x2={BORDER_NODES[3][0]}
			y2={BORDER_NODES[3][1]}
			stroke={innerStrokeCss}
			strokeWidth={innerStrokeWidth}
			strokeLinecap={strokeLinecap}
		/>,
		innerStroke && <line
			key={'y-bar'}
			x1={COORDINATE_CLOSEST_TO_CAMERA[0]}
			y1={COORDINATE_CLOSEST_TO_CAMERA[1]}
			x2={BORDER_NODES[1][0]}
			y2={BORDER_NODES[1][1]}
			stroke={innerStrokeCss}
			strokeWidth={innerStrokeWidth}
			strokeLinecap={strokeLinecap}
		/>,
		innerStroke && <line
			key={'z-bar'}
			x1={COORDINATE_CLOSEST_TO_CAMERA[0]}
			y1={COORDINATE_CLOSEST_TO_CAMERA[1]}
			x2={BORDER_NODES[5][0]}
			y2={BORDER_NODES[5][1]}
			stroke={innerStrokeCss}
			strokeWidth={innerStrokeWidth}
			strokeLinecap={strokeLinecap}
		/>,
		// Rendering lines separately so that the ouline doesn't look funky. strokeLinecap appears to have no effect
		<polygon
			key={'outline'}
			points={BORDER_NODES.map(c => c.join(',')).join(' ')}
			stroke={strokeCss}
			fill={'transparent'}
			strokeWidth={strokeWidth}
			strokeLinecap={strokeLinecap}
		/>
	];
}
