import React, {Component} from 'react';
import events from "../events";
import * as css from "../style";

// The wrapper for one unit in the console output history
let allLogKeys = 0;
const logStyle = css.merge(
	css.steno.nowrap
);
class Log extends Component {
	log = {
		time: new Date(),
		key: ++allLogKeys
	};
	element = null;

	componentDidMount () {
		// When the entry is logged, scroll the containing ConsoleOutputComponent to its bottom.
		// This is a dirty hack, and it assumes the container is el.parentNode.parentNode
		// But it works, for now
		if (!this.element) {
			return;
		}

		this.element.parentNode.scrollTop = this.element.parentNode.scrollHeight;
	}

	shouldComponentUpdate () {
		return false;
	}

	render() {
		return <div ref={(input) => { this.element = input; }} {...logStyle}>
			{this.props.children}
		</div>;
	}
}

// The list of all logs, errors, etc.
export default class LogFeed extends Component {
	state = {
		historyStart: 0,
		historyEnd: 0
	};

	// What has been logged
	history = [];
	historyIndex = 0;

	// What has yet to be logged
	internalQueue = [];
	internalTimeout = null;

	destroyers = [];
	_logFromInternalQueue = () => {
		if(!this.internalQueue.length) {
			// Reached the end of queue, clean up
			clearTimeout(this.internalTimeout);
			this.internalTimeout = null;
			return;
		}

		// Show one more queued item
		// Replace history, trim if necessary
		this.history.push(this.internalQueue.shift());
		const historyStart = Math.max(0, this.history.length - this.props.maxHistory);
		this.setState({
			historyStart,
			historyEnd: this.history.length
		});

		// Go again
		this.internalTimeout = setTimeout(this._logFromInternalQueue, 25);
	};

	log = (out) => {
		if(out) {
			this.internalQueue.push({
				index: ++this.historyIndex,
				component: out
			});
		}

		if(this.internalTimeout) {
			// An animation is already in progress, best let that go
			return;
		}

		this.internalTimeout = setTimeout(this._logFromInternalQueue, 25);
	};

	// shouldComponentUpdate (nextProps, nextState) {
	// 	return !!this.internalQueue.length;
	// }

	componentDidMount () {
		if (Array.isArray(this.props.initial)) {
			this.props.initial.forEach(init => this.log(init));
		}
		if (this.props.eventName) {
			this.destroyers.push(events.on(this.props.eventName, this.log));
		}
	}

	componentWillUnmount () {
		// Stop listening to logger calls
		this.destroyers.forEach(callback => callback());
	}

	render() {
		return (<div>
			{this.history.slice(this.state.historyStart, this.state.historyEnd).map(log => (
				<Log key={log.index}>{log.component}</Log>
			))}
		</div>);
	}
}
