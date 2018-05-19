import React, {Component} from 'react';
import Anchor from "../lib/3d/Anchor";
import MonochromeBox from "../lib/objects/MonochromeBox";

export class Progress extends Component {
	lights = [];
	state = {
		progress: 0
	};

	_progress = () => {
		if (this.state.progress >= 1) {
			return;
		}
		this.timeOut = setTimeout(() => {
			this.setState({
				progress: this.state.progress + 1 / this.props.length
			});

			this._progress();
		}, 200);
	};

	componentDidMount () {
		for (let i = 0; i < this.props.length; i++) {
			this.lights.push({
				key: i,
				threshold: (i + 1) / this.props.length
			});
		}

		this._progress();
		// When the entry is logged, scroll the containing ConsoleOutputComponent to its bottom.
		// This is a dirty hack, and it assumes the container is el.parentNode.parentNode
		// But it works, for now
		if (!this.element) {
			return;
		}

		this.element.parentNode.scrollTop = this.element.parentNode.scrollHeight;
	}

	componentWillUnmount () {
		if (this.timeOut) {
			clearTimeout(this.timeOut);
		}
	}


	render() {
		return <ProgressBoxBar
			lights={this.lights}
			layers={this.props.layers}
			progress={this.state.progress}
		/>;
	}
}

export function ProgressBoxBar ({ lights, layers = Infinity, progress }) {
	return lights.map((light, i) => <Anchor key={i} y={ i % (layers || Infinity)} z={-Math.floor(i / (layers||Infinity))}>{
		progress < (i + 1) / lights.length ?
			null :
			<MonochromeBox/>
	}</Anchor>).reverse();
}

export function createOnEventProgressBar (setListeners) {
	return class OnEventProgressBar extends Component {
		lights = [];
		destroyers = [];
		state = {
			progress: 0
		};

		_setProgress = (progress) => {
			this.setState({
				progress
			});
		};

		componentDidMount () {
			for (let i = 0; i < this.props.length; i++) {
				this.lights.push({});
			}

			this.destroyers = setListeners(this._setProgress);
		}

		componentWillUnmount () {
			this.destroyers.forEach(destroy => destroy());
		}

		render() {
			return <ProgressBoxBar
				lights={this.lights}
				progress={this.state.progress}
				{...this.props}
			/>;
		}
	}
}
