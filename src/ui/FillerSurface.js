import React from 'react';
import * as css from '../style';
export default function FillerSurface ({
   width = '100%',
   height = '100%',

   // Wether or not to show a diagonal cross lines in the background
	hasBackground = true,

	//the r,g,b portion of css color line for background
	rgb = '0,0,0',

   children
}) {
		const lineWidth = 1;

		const style = css.merge(
			css.border.harsh,
			css.position.relative,
			{
				width,
				height,
				background: hasBackground ?
					'       linear-gradient(to top left,\n' +
					'           rgba(' + rgb + ',0) 0%,\n' +
					'           rgba(' + rgb + ',0) calc(50% - ' + lineWidth + 'px),\n' +
					'           rgba(' + rgb + ',1) 50%,\n' +
					'           rgba(' + rgb + ',0) calc(50% + ' + lineWidth + 'px),\n' +
					'           rgba(' + rgb + ',0) 100%),\n' +
					'       linear-gradient(to top right,\n' +
					'           rgba(' + rgb + ',0) 0%,\n' +
					'           rgba(' + rgb + ',0) calc(50% - ' + lineWidth + 'px),\n' +
					'           rgba(' + rgb + ',1) 50%,\n' +
					'           rgba(' + rgb + ',0) calc(50% + ' + lineWidth + 'px),\n' +
					'           rgba(' + rgb + ',0) 100%)' :
					null
			});
		return <div {...style}>
			{children}
		</div>;
}
