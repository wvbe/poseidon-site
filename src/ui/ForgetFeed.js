import React, {Component} from 'react';

import events from '../events';

// The wrapper for one unit in the console output history
class Log extends Component {
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
		return <div ref={(input) => { this.element = input; }}>
			{this.props.children}
		</div>;
	}
}

// The list of all logs, errors, etc.
export default class LogFeed extends Component {
	state = {
		historyId: 0,
		historyLength: 0
	};
	destroyers = [];

	// What has been logged
	history = [];
	historyIndex = 0;

	// What has yet to be logged
	internalQueue = [];
	internalTimeout = null;

	_showNextFromInternalQueue = () => {
		const now = Date.now();
		this.history = this.history.filter(item => item.expire > now);

		// Show one more queued item
		// Replace history, trim if necessary

		if (this.internalQueue.length) {
			const newItem = {
				expire: now + 1000,
				item: this.internalQueue.shift()
			};
			this.history = this.history.concat([newItem]);
		}

		this.setState({
			historyId: this.history.length ?
				this.history[this.history.length - 1].item.index :
				this.state.historyId,
			historyLength: this.history.length
		});

		// Go again
		let timeoutLength = Infinity;
		if (this.internalQueue.length) {
			// if there's more messages coming
			timeoutLength = 50;
		}
		else if (this.history.length) {
			// if nothing new is queued up, measure the timeout to the first expiring history item
			timeoutLength = this.history.reduce((soonest, item) => Math.min(soonest, item.expire), Infinity) - now;
		}
		else {
			// Reached the end of queue, clean up
			clearTimeout(this.internalTimeout);
			this.internalTimeout = null;
			return;
		}

		this.internalTimeout = setTimeout(
			this._showNextFromInternalQueue,
			timeoutLength
		);
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

		this.internalTimeout = setTimeout(this._showNextFromInternalQueue, 25);
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
			{this.history.map(log => (
				<Log key={log.item.index}>{log.item.component}</Log>
			))}
		</div>);
	}
}
