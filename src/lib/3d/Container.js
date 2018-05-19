import React from 'react';

const svgAttributes = {
	// svg and viewbox
	width: '1px',
	height: '1px',
	viewBox: '0 0 1 1',
	overflow: 'visible',

	// svg rendering
	shapeRendering: 'geometricPrecision',

	// css
	style: {
		position: 'absolute',
		left: '50%',
		top: '50%'
	}
};

export default function SvgContainer ({ children }) {
	return <svg { ...svgAttributes }>{ children }</svg>;
};
