import React from 'react';
import * as css from '../../style';

import perspective from '../perspective';

const scaleX = 0.8; // The pythagoras distance (1/sqrt(2)) with a little tweaking for better looks

const yAxisWebSurface = {
	position: 'absolute',
	transform: 'skewY(-' + perspective.degrees + 'deg) scaleX(' + scaleX + ')',
	transformOrigin: 'top left'
};
const zAxisWebSurface = {
	// Only happens to "look right" when degrees = 30
	position: 'absolute',
	transform: 'rotate(-' + perspective.degrees + 'deg) skewX(' + perspective.degrees + 'deg) scaleX(' + Math.sqrt(scaleX) + ') scaleY(' +scaleX + ')',
	transformOrigin: 'top left'
};

const xAxisWebSurface = {
	position: 'absolute',
	transform: 'skewY(' + perspective.degrees + 'deg) scaleX(' + scaleX + ')',
	transformOrigin: 'top left'
};

export default function WebSurface ({ x = 0, y = 0, z = 0, axis = 'y', width, height, children }) {
	const [left, top] = perspective.toPixels(...[x, y, z]);
	const [pixelWidth] = perspective.toPixels(0, width, height);
	const style = css.merge(axis === 'y' ? yAxisWebSurface : axis === 'x' ? xAxisWebSurface : zAxisWebSurface,
		{
			left,
			top,
			width: pixelWidth / scaleX + 'px',
			height: height ? pixelWidth / scaleX + 'px' : null
		});
	return <div {...style} {...css.merge(css.steno.base)}>
		{ children }
	</div>
}
