import React, { Component } from 'react';

export default function hasBlink (Comp, {
	interval = 500, // blink every x milliseconds
	delay = null, // wait ms before starting the interval (phase),
	decide = state => !state
} = {}) {
	return class BlinkHoc extends Component {
		state = {
			visible: false
		};

		interval = null;
		timeout = null;

		componentDidMount () {
			console.log('blink on');

			let i = 0;
			const switcheroo = () => {
				const visible = decide(this.state.visible, i++);

				if (visible !== this.state.visible) {
					this.setState({ visible });
				}
			};


			if (delay === null) {
				switcheroo();
				this.interval = setInterval(switcheroo, interval);
				return;
			}

			setTimeout(() => {
				switcheroo();
				this.timeout = null;
				this.interval = setInterval(switcheroo, interval);
			}, delay);
		}

		componentWillUnmount () {
			console.log('blink off');
			clearInterval(this.interval);
			clearTimeout(this.timeout);

			this.interval = null;
			this.timeout = null;
		}

		render () {
			if (!this.state.visible) {
				return null;
			}

			return <Comp {...this.props} />;
		}
	}
}
