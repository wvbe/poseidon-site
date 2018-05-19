import React, { Component } from 'react';
import * as css from '../style';
import FillerSurface from '../ui/FillerSurface';

const circleStyle = css.merge(
	css.display.block,
	css.position.absoluteCenter,
	{
		transition: 'all 0.25s'
	});

function Circle ({ disabled = false}) {
	return <div {...css.merge(css.display.relative)}>
		<div {...css.merge(
			circleStyle,
			css.border.harsh,
			disabled ?
				{
					borderRadius: '0%',
					width: '90%',
					height: '0',
					opacity: 0
				} :
				{
					borderWidth: '2px',
					borderRadius: '50%',
					width: '66%',
					height: '66%',
					opacity: 1
				}
		)} />
		<div {...css.merge(
			circleStyle,
			{
				left: '60%',
				top: '30%',
				lineHeight: '32px',
				fontSize: '40px'
			},
			disabled ?
				{
					opacity: 0
				} :
				{
					opacity: 1
				}
		)}>{'✔'}</div>
	</div>
}

const FLAGS = [
	'initialized',
	'discovered',
	'failed',
	'revealed',
	'achieved'
];
export default class HomepageAchievementColumn extends Component {
	state = {
		statusCode: 0,
		label: null
	};
	destroyers = [];

	statusEmitter = FLAGS.reduce((obj, name, i) => {
		obj[name.toUpperCase()] = i;

		return obj;
	}, (newStatusCode, label = this.state.label) => {
		this.setState({
			statusCode: newStatusCode,
			label
		});
	});

	componentWillMount () {
		const {
			register
		} = this.props;

		this.destroyers.push(register(this.statusEmitter));
	}

	componentWillUnmount () {
		this.destroyers.forEach(destroy => destroy());
	}

	style = {
		wrapper: css.merge(
			css.flex.vertical,
			css.flex.justifyEnd,
			css.position.relative, css.connotation.immutable),
		label: css.merge(
			css.flex.vertical,
			css.flex.justifyEnd,
			css.position.absolute,
			css.steno.nowrap,
			{
				lineHeight: '32px',
				textAlign: 'left',
				bottom: '42px',
				left: '50%',
				// bottom: '32px',
				transformOrigin: 'bottom left',
				transform: ' rotate(-90deg) translate(-0%, 50%)'
				// transform: ''
				// transform: 'rotate(-90deg) translate(-50%, -50%)'
			}
		)
	};
	render () {
		const {
			boxSize,
			label: labelProp
		} = this.props;
		const {
			label: labelState,
			statusCode
		} = this.state;
		const statusEmitter = this.statusEmitter;

		if (statusCode < statusEmitter.DISCOVERED) {
			return null;
		}
		const {
			label: labelStyle,
			wrapper: wrapperStyle
		} = this.style;

		if (statusCode >= statusEmitter.DISCOVERED) {
			return <div {...wrapperStyle}>
				<div {...labelStyle}>
					{ statusCode >= statusEmitter.REVEALED ?
						labelState || labelProp :
						statusCode === statusEmitter.FAILED ? labelState || labelProp || '(failed)' : '(undiscovered)'
					}
				</div>
				{
					statusCode <= statusEmitter.FAILED ?
						<FillerSurface width={boxSize} height={boxSize} hasBackground={true} rgb={ (statusCode === statusEmitter.FAILED && '255,0,0') || undefined }>

						</FillerSurface> :
						<div {...css.merge(
							css.position.absolute,
							css.position.relative,
							css.border.harsh,
							{ width: boxSize, height: boxSize }
						)}>
							<Circle disabled={statusCode < statusEmitter.ACHIEVED}/>
						</div>
				}
			</div>;
		}

	}
};
