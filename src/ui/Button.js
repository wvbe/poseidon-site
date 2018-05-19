import React, {Component} from 'react';
import * as css from '../style';
export default class Button extends Component {
	state = {
		clicked: false
	};
	render () {
		const {
			url,
			children,
			small = false,
			title = null,
			onClick = null
		} = this.props;
		const {
			clicked
		} = this.state;
		const style = css.merge(
			css.border.harsh,
			css.steno.clickable,
			css.connotation.immutable,
			small ?
				css.steno.smallHeader :
				css.steno.header,
			{
				textAlign: 'center',
				textTransform: 'uppercase',
				display: 'block',
				margin: '5px 0 0 0',
				padding: small ? '5px 0' : 'none',
				transition: 'background-color 0.5s',
				backgroundColor: clicked ? 'rgba(0,0,0,0.1)' : 'transparent',
				':visited': {
					backgroundColor: 'rgba(0,0,0,0.1)',
				},
				':hover': {
					transition: 'background-color 0s',
					backgroundColor: 'rgba(0,0,0,0.75)',
					border: '1px solid rgba(0,0,0,0.5)',
					color: 'white'
				},
				':first-child': {
					marginTop: 0
				}
			});
		return <a
			{...style}
			href={url}
		  	target={'_blank'}
			title={title}
			onClick={(...args) => {
				if (typeof onClick === 'function') {
					onClick(...args);
				}

				this.setState({clicked: true})
			}}
		>
			{children}
		</a>;
	}
}
