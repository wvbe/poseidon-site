import events from '../events';

const timeOuts = {};

function emitSomething (eventName, cb) {
	const takeABreak = Math.random() < 0.3;

	timeOuts[eventName] = setTimeout(() => {
		let roll = Math.ceil(1 + Math.random() * 7);
		roll = roll < 3 ? 1 : roll - 3;

		for (let i = 0; i < roll; i++) {
			cb();
		}

		emitSomething(eventName, cb);
	}, takeABreak ? 2000 + Math.random() * 10000 : 200 + Math.random() * 1000);
}

function generateRandomString (length) {
	const alphabet = '0123456789abcdef';
	let str = '';
	for (let i = 0; i < length; i++) {
		if (i && !(i % 2)) {
			str += ' ';
		}
		str += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
	}

	return str;
}

export default function startSystemLog (eventName) {
	if (timeOuts[eventName]) {
		throw new Error('ALREADY STARTED ' + eventName);
	}

	emitSomething(eventName, () => {
		events.emit(eventName, ['0x', generateRandomString(8 + Math.floor(Math.random()*2) * 2)])
	});

	return () => {
		clearTimeout(timeOuts[eventName]);
		timeOuts[eventName] = null;
	};
}
