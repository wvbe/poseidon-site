import EventEmitter from '../lib/classes/EventEmitter';

const explorationEmitter = new EventEmitter();
const explored = [];
const discovered = [];

export function totalProgress (update) {
	update(update.DISCOVERED);

	const destroyer = explorationEmitter.on('change', () => {
		update(
			explored.length >= discovered.length ? update.ACHIEVED : update.REVEALED,
			`Exploration (${explored.length}/${discovered.length})`);
	});

	return destroyer;
}

export function firstOpened (update) {
	update(update.DISCOVERED);

	const destroyer = explorationEmitter.on('change', () => {
		if (explored.length !== 1) {
			return;
		}

		const registeredFeedback = feedback[explored[0]];
		if (!registeredFeedback)
			update(update.FAILED, '(forfeited)');
			else

		update(update.ACHIEVED, registeredFeedback);
	});

	return destroyer;
}

const feedback = {};

export function createFirstExplorationTrigger (href = Symbol('unnamed exploration goal'), str) {
	feedback[href] = str;

	return createExplorationGoal(href);
}

export function createExplorationGoal (href = Symbol('unnamed exploration goal')) {
	if (!discovered.includes(href)) {
		discovered.push(href);
	}

	return () => {
		if (explored.includes(href)) {
			return;
		}

		if (!explored.length) {

		}

		explored.push(href);

		explorationEmitter.emit('change');
	}
}