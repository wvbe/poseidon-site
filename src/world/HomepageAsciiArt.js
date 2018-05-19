import React from 'react';
import * as css from '../style';
import fromAscii from '../world/generators/fromAscii';
import {
	Anchor,
	MonochromeBox,
} from '../lib/3d';

const ascii = {
	wybe: `
-            #   # # # ###  ###
-            # # # # # #  # #
-            # # #  #  ###  ###
-            # # #  #  #  # #
-             # #   #  ###  ###

#   # # #  # #  # ### ###   ##
## ## # ## # ## # #   #  # #  #
# # # # # ## # ## ### ###  #  #
# # # # #  # #  # #   #  # #  #
# # # # #  # #  # ### ###   ##
	`,
	js: `
####  ###
-  # #   #
-  # # 
-  #  ###
#  #     #
#  # #   #
 ##   ###
`,
	ux: `
#   # #   #
#   # #   #
#   #  # #
#   #   #
#   #  # #
#  ## #   #
 ## # #   #
`
};

export default function HomepageAsciiArt () {
	const lightBoxColor = css.color('#58E0C5');
	const darkBoxColor = css.color('#324D5C');
	return [
		// "js"
		<Anchor key={'js'} x={0} y={0} z={0} crosshairSize={9}>
			{ fromAscii(ascii.js, 'x').map(coord => <Anchor key={ coord.transform(0, 0, -1).toString() } { ...coord }>
				<MonochromeBox fill={lightBoxColor} stroke={lightBoxColor.darkenByRatio(0.5)} />
			</Anchor>) }
		</Anchor>,

		// "ux"
		<Anchor key={'title'} x={0} y={-24} z={0} crosshairSize={4}>
			{ fromAscii(ascii.ux, 'x').map(coord => <Anchor key={ coord.transform(0, 0, -1).toString() } { ...coord }>
				<MonochromeBox fill={lightBoxColor} stroke={lightBoxColor.darkenByRatio(0.5)} />
			</Anchor>) }
		</Anchor>,

		// "wybe minnebo"
		<Anchor key={'wybe'} x={-11} y={-31} z={0} crosshairSize={2}>
			{ fromAscii(ascii.wybe, 'z').map(coord => <Anchor key={ coord.toString() } { ...coord }>
				<MonochromeBox fill={darkBoxColor} />
			</Anchor>) }
		</Anchor>
	];
}
