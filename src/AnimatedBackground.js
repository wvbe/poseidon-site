import React from 'react';
import * as css from './style';
const rotateAnimation = css.keyframes({
	'100%': {
		'transform': 'rotate(360deg)'
	}
});

const size = 48;
const outlineStyle = css.merge(
	css.position.absolute,
	{
		opacity: '0.3',
		top: '50%',
		left: '50%',
		animation: rotateAnimation + ' 120s linear infinite',
		width: size * css.baseLength + 'px',
		height: size * css.baseLength + 'px',
		marginLeft: -size / 2 * css.baseLength + 'px',
		marginTop: -size / 2 * css.baseLength + 'px',
		// backgroundColor: 'rgba(255,0,0,0.3)'
	});

const inlineStyle = css.merge(
	css.border.harsh,
	{
		boxSizing: 'border-box',
		borderStyle: 'dashed',
		borderWidth: '1px',
		borderRadius: '50%',
		width: '100%',
		height: '100%'
	});
export default function Overlay () {
    return <div {...outlineStyle}>
		<div {...inlineStyle}></div>
	</div>;
}
