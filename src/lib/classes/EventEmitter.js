export default class EventEmitter {
	constructor () {
		this.listeners = {};
	}

	on (eventName, callback) {
		if(!this.listeners[eventName]) {
			this.listeners[eventName] = [];
		}
		this.listeners[eventName].push(callback);

		return () => this.listeners[eventName].splice(this.listeners[eventName].indexOf(callback));
	}

	emit (eventName, ...args) {
		if (!this.listeners[eventName]) {
			return;
		}
		this.listeners[eventName].forEach(callback => callback(...args));
	}

	clear () {
		this.listeners = {};
	}
}
