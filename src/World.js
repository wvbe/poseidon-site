import React from 'react';
import * as css from './style';
import {
	Container as SvgContainer,
	WebSurface
} from './lib/3d';

import HomepageAsciiArt from './world/HomepageAsciiArt';
import Anchor from "./lib/3d/Anchor";
// import WireframeSea from "./lib/objects/WireframeSea";



function HtmlContainer ({ children }) {
	return <div {...css.merge({
		// svg and viewbox
		width: '1px',
		height: '1px',
		overflow: 'visible',
		position: 'absolute',
		left: '50%',
		top: '50%'
	})}>
		{ children }
	</div>;
}

export default function World ({
   renderSecondaryButtons,
   renderHeaderSection,
   renderLogSection,
   renderAchievementsSection
}) {
    return [
		<SvgContainer key={'crosshairs-underlay'}>
			<Anchor
				// Between main menu and achievements
				x={-13} y={0} z={0}
				crosshairSize={2}
			/>
			<Anchor
				// in the top right of secondary buttons
				x={0} y={1} z={-7}
				crosshairSize={2}
			/>
			<Anchor
				// In the bottom left of the fake news log
				x={0} y={1} z={1}
				crosshairSize={2}
			/>
			<Anchor
				// In the bottom left of the fake news log
				x={-12} y={0} z={0}
				crosshairSize={2}
			/>
		</SvgContainer>,

		<HtmlContainer key={'most-of-the-ui'}>
			<WebSurface x={0} y={-11} z={-1} width={10} axis={'y'}>
				{ renderSecondaryButtons() }
			</WebSurface>

			<WebSurface x={-13} y={-1} z={1} axis={'y'}>
				{ renderAchievementsSection() }
			</WebSurface>

			<WebSurface x={-11} y={0} z={2} width={10} axis={'x'}>
				<div style={{ position: 'absolute', bottom: 0, width: '100%', textAlign: 'right' }}>
					{ renderHeaderSection() }
				</div>
			</WebSurface>

			<WebSurface x={0} y={1} z={1} width={25}>
				<div style={{position: 'absolute', bottom: 0, width: '100%' }}>
					{ renderLogSection() }
				</div>
			</WebSurface>
			{/* <WebSurface x={1} y={-18} z={-7} width={25} axis={'z'}>
				<div style={{position: 'absolute', top: 0, width: '100%' }}>
					{ renderLogSection() }
				</div>
			</WebSurface> */}
		</HtmlContainer>,

        <SvgContainer key={'3d-text'}>
			<HomepageAsciiArt />
        </SvgContainer>,

		<SvgContainer key={'crosshairs-overlay'}>
			<Anchor
				// Bottom "ux", aligns with the "M" crosshair above it
				x={0} y={-31} z={-7}
				crosshairSize={2}
			/>
			<Anchor
				// Right through the "M" of "Minnebo"
				x={0} y={-31} z={0}
				crosshairSize={4}
			/>

		</SvgContainer>
	];
}
